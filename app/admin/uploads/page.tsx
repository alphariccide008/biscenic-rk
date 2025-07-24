"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Loader2, XCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface UploadedFile {
  url: string
  pathname: string
  contentType?: string
  contentDisposition?: string
}

export default function UploadsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const { toast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      setUploadedFile(null) // Clear previous upload
    } else {
      setFile(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please choose a file to upload.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const newBlob = (await response.json()) as UploadedFile
      setUploadedFile(newBlob)
      setFile(null) // Clear the selected file from input
      toast({
        title: "Upload Successful",
        description: `File "${newBlob.pathname}" uploaded.`,
      })
    } catch (error: any) {
      console.error("Upload error:", error)
      toast({
        title: "Upload Failed",
        description: error.message || "An unexpected error occurred during upload.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setUploadedFile(null)
    toast({
      title: "File Removed",
      description: "The uploaded file has been cleared from preview.",
    })
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Upload New Assets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">File</Label>
            <Input id="picture" type="file" onChange={handleFileChange} disabled={uploading} />
          </div>
          <Button onClick={handleUpload} disabled={!file || uploading}>
            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {uploading ? "Uploading..." : "Upload File"}
          </Button>
        </CardContent>
      </Card>

      {uploadedFile && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Uploaded File Preview</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleRemove} aria-label="Remove uploaded file">
              <XCircle className="h-5 w-5 text-red-500" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative w-full h-64 border rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
              {uploadedFile.contentType?.startsWith("image/") ? (
                <Image
                  src={uploadedFile.url || "/placeholder.svg"}
                  alt="Uploaded preview"
                  fill
                  className="object-contain"
                  unoptimized // Vercel Blob URLs are already optimized
                />
              ) : uploadedFile.contentType?.startsWith("video/") ? (
                <video src={uploadedFile.url} controls className="object-contain w-full h-full" />
              ) : (
                <div className="text-gray-500">No visual preview available for this file type.</div>
              )}
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <strong>URL:</strong>{" "}
                <a
                  href={uploadedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {uploadedFile.url}
                </a>
              </p>
              <p>
                <strong>Pathname:</strong> <span className="break-all">{uploadedFile.pathname}</span>
              </p>
              <p>
                <strong>Type:</strong> {uploadedFile.contentType || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
