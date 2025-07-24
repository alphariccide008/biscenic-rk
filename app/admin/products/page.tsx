"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Edit, Trash2, Loader2 } from "lucide-react"
import Image from "next/image"
import { type Product, allProducts as initialAllProducts } from "@/lib/products" // Import initial products
import { useToast } from "@/components/ui/use-toast"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialAllProducts) // Use initial products
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<
    Omit<Product, "id" | "images" | "video"> & { image: string; video?: string }
  >({
    name: "",
    price: "",
    image: "",
    category: "",
    path: "",
    description: "",
    video: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Effect to update products when initialAllProducts changes (e.g., from a backend fetch)
  useEffect(() => {
    setProducts(initialAllProducts)
  }, [initialAllProducts])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setFormData({
      name: "",
      price: "",
      image: "",
      category: "",
      path: "",
      description: "",
      video: "",
    })
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "", // Assuming first image is the main one
      category: product.category,
      path: product.path,
      description: product.description || "",
      video: product.video || "",
    })
    setIsModalOpen(true)
  }

  const handleDeleteProduct = async (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return
    }

    setLoading(true)
    try {
      // Simulate API call for deletion
      await new Promise((resolve) => setTimeout(resolve, 500))
      const updatedProducts = products.filter((p) => p.id !== id)
      setProducts(updatedProducts)
      // In a real app, you'd call an API here:
      // await fetch(`/api/products/${id}`, { method: 'DELETE' });
      toast({
        title: "Product Deleted",
        description: `Product with ID ${id} has been removed.`,
      })
    } catch (error) {
      console.error("Failed to delete product:", error)
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Date.now(), // Use existing ID or generate new
      name: formData.name,
      price: formData.price,
      image: formData.image,
      category: formData.category,
      path: formData.path,
      description: formData.description,
      images: formData.image ? [formData.image] : [], // Convert single image back to array
      video: formData.video || undefined,
    }

    try {
      // Simulate API call for saving/updating
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (editingProduct) {
        // Update existing product
        setProducts(products.map((p) => (p.id === newProduct.id ? newProduct : p)))
        // In a real app, you'd call an API here:
        // await fetch(`/api/products/${newProduct.id}`, { method: 'PUT', body: JSON.stringify(newProduct) });
        toast({
          title: "Product Updated",
          description: `${newProduct.name} has been updated.`,
        })
      } else {
        // Add new product
        setProducts([...products, newProduct])
        // In a real app, you'd call an API here:
        // await fetch('/api/products', { method: 'POST', body: JSON.stringify(newProduct) });
        toast({
          title: "Product Added",
          description: `${newProduct.name} has been added.`,
        })
      }
      setIsModalOpen(false)
    } catch (error) {
      console.error("Failed to save product:", error)
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Products</h1>
        <Button onClick={handleAddProduct}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEditProduct(product)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteProduct(product.id)}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={formData.name} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input id="price" value={formData.price} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input id="image" value={formData.image} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="video" className="text-right">
                Video URL (Optional)
              </Label>
              <Input id="video" value={formData.video} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="path" className="text-right">
                Path
              </Label>
              <Input id="path" value={formData.path} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {editingProduct ? "Save Changes" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
