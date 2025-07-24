"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { useState, useEffect } from "react"

interface ImagePreviewModalProps {
  src: string | null
  alt: string
  isOpen: boolean
  onClose: () => void
}

export function ImagePreviewModal({ src, alt, isOpen, onClose }: ImagePreviewModalProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || !src) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 flex items-center justify-center bg-transparent border-none shadow-none">
        <div className="relative w-full h-full">
          <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
