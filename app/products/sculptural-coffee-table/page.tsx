"use client"

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Share2, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"

export default function SculpturalCoffeeTablePage() {
  const [selectedImage, setSelectedImage] = useState("/images/IMG_8312.PNG")
  const { addToCart } = useCart()

  const product = {
    id: "sculptural-coffee-table",
    name: "Sculptural Coffee Table",
    price: "$1,950",
    description:
      "A true statement piece, our Sculptural Coffee Table combines artistic form with functional design. Crafted from a unique blend of polished concrete and reclaimed wood, its organic curves and robust presence make it the focal point of any living space. Perfect for those who appreciate art in everyday objects.",
    images: ["/images/IMG_8312.PNG", "/images/212DC255-CF3B-4665-AF90-01E876129C0D.PNG", "/images/IMG_8437.jpg"],
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    })
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Product Detail Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden rounded-lg border shadow-sm">
              <Image
                src={selectedImage || "/placeholder.svg?height=600&width=450&query=sculptural coffee table main"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 ease-in-out"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 w-full max-w-lg">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg border ${
                    selectedImage === img ? "border-black" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img || "/placeholder.svg?height=96&width=96&query=sculptural coffee table thumbnail"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-start lg:pl-8">
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wider">{product.name}</h1>
            <p className="text-3xl font-medium mb-6">{product.price}</p>
            <p className="text-gray-700 mb-8 leading-relaxed text-sm md:text-base">{product.description}</p>

            <div className="flex items-center space-x-4 mb-8">
              <Button
                className="flex-1 bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg tracking-wide"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                ADD TO CART
              </Button>
              <Button variant="outline" className="p-3 rounded-full border-gray-300 hover:bg-gray-100 bg-transparent">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="p-3 rounded-full border-gray-300 hover:bg-gray-100 bg-transparent">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-light mb-4">Details</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm md:text-base">
                <li>Material: Polished concrete and reclaimed wood</li>
                <li>Dimensions: 48" L x 28" W x 16" H</li>
                <li>Finish: Natural, hand-waxed</li>
                <li>Care: Wipe clean with a damp cloth, avoid harsh chemicals</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products/Call to Action */}
      <section className="bg-gray-100 py-16 text-center">
        <h2 className="text-4xl font-light mb-4">Explore Our Collections</h2>
        <p className="text-lg text-gray-700 mb-8">Discover more unique pieces for your home.</p>
        <Button
          variant="outline"
          className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg tracking-wide"
          asChild
        >
          <Link href="/shop">VIEW ALL PRODUCTS</Link>
        </Button>
      </section>
    </div>
  )
}
