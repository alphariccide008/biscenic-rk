"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/products"

export function ModernPlatformBedCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  const handleAddToCartClick = () => {
    addToCart(product)
  }

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-100 rounded-lg border shadow-sm transition-all duration-300 group-hover:shadow-lg">
        <Image
          src={product.image || "/placeholder.svg?height=400&width=300&query=shop product fallback"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-black px-8 py-3 text-sm tracking-wide"
            asChild
          >
            <Link href={`/products/${product.id}`}>EXPLORE MORE</Link>
          </Button>
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2">
        <h3 className="font-medium tracking-wide">{product.name}</h3>
        <p className="text-gray-600">{product.price}</p>
        <Button
          variant="outline"
          className="w-full border-black text-black bg-transparent hover:bg-[#7e8f6c] hover:text-white transition-colors duration-300 group-hover:animate-glow hover:brightness-125"
          onClick={handleAddToCartClick}
        >
          ADD TO CART
        </Button>
      </div>
    </div>
  )
}
