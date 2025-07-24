"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Share2, ShoppingCart, Play } from "lucide-react" // Added Play icon
import { useCart } from "@/context/cart-context"
import Link from "next/link"

export default function LumiVaseClassicPage() {
  // Renamed selectedImage to selectedMedia to accommodate videos
  const [selectedMedia, setSelectedMedia] = useState("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-output-DF448FC2-FE95-461D-B54A-00501B3A3DAF-gERXyDwuxlvEvfxKU1i6V2kkYWWbYm.MOV")
  const { addToCart } = useCart()

  const product = {
    id: "lumivase-classic",
    name: "Lumivase", // Updated product name
    price: "$1,600",
    description:
      "Lumivase is more than an object. it is a meditation in form, light, and stillness. Encased in a minimal glass frame, a sculptural bonsai rises from black and white stones, capturing nature’s balance in suspended time.\n\nCreated with intention and restraint, Lumivase preserves calm within structure, where every shadow, curve, and material choice echoes the quiet logic of nature.",
    // Changed images to media to include video
    media: [
      { type: "video", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-output-DF448FC2-FE95-461D-B54A-00501B3A3DAF-gERXyDwuxlvEvfxKU1i6V2kkYWWbYm.MOV" },
      { type: "image", src: "/images/bonsai-in-case.jpeg" },
      { type: "image", src: "/images/lumivase-bonsai.png" },
      { type: "image", src: "/images/living-room-bonsai.png" },
      { type: "image", src: "/images/living-room-bonsai-sofa.png" },
    ],
  }

  const handleAddToCart = () => {
    // Use a specific image for the cart item, not the video
    const cartImage = product.media.find((item) => item.type === "image")?.src || "/placeholder.svg?height=96&width=96"
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: cartImage,
      quantity: 1,
    })
  }

  // Helper to determine if the current media is a video
  const isVideo = (src: string) => src.endsWith(".mov") || src.endsWith(".mp4")

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Product Detail Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Media Gallery */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden rounded-lg border shadow-sm">
              {isVideo(selectedMedia) ? (
                <video
                  src={selectedMedia}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-contain w-full h-full transition-transform duration-300 ease-in-out"
                  aria-label={`${product.name} video`}
                />
              ) : (
                <Image
                  src={selectedMedia || "/placeholder.svg?height=600&width=450&query=lumivase classic main"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                />
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 w-full max-w-lg">
              {product.media.map((item, index) => (
                <div
                  key={index}
                  className={`relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg border ${
                    selectedMedia === item.src ? "border-black" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedMedia(item.src)}
                >
                  {item.type === "video" ? (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200">
                      <Play className="h-8 w-8 text-gray-600" />
                      <span className="sr-only">Play video thumbnail</span>
                    </div>
                  ) : (
                    <Image
                      src={item.src || "/placeholder.svg?height=96&width=96&query=lumivase classic thumbnail"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  )}
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
                <li>Material: Hand-blown glass, integrated LED lighting</li>
                <li>Dimensions: 16" H x 8" Dia</li>
                <li>Light Source: Dimmable LED, warm white</li>
                <li>Power: USB-C rechargeable battery (up to 10 hours)</li>
                <li>Care: Wipe clean with a soft, dry cloth</li>
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
