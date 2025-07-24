"use client"

import Image from "next/image"
import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import Link from "next/link"
import { type Product, allProducts } from "@/lib/products"

// ProductSkeleton component for loading state
const ProductSkeleton = () => (
  <div className="group cursor-pointer animate-pulse">
    <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-200 rounded-lg border shadow-sm"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
  </div>
)

export default function ShopPage() {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [productsToShow, setProductsToShow] = useState(6) // Number of products to show initially
  const [filterCategory, setFilterCategory] = useState("all")
  const [isMounted, setIsMounted] = useState(false) // New state for client-side mounting
  const { addToCart } = useCart() // Ensure useCart is called at the top level

  useEffect(() => {
    setIsMounted(true) // Set to true once component mounts on client
  }, [])

  useEffect(() => {
    // Simulate fetching data
    setIsLoading(true)
    const timer = setTimeout(() => {
      setDisplayedProducts(allProducts.slice(0, productsToShow))
      setIsLoading(false)
    }, 500) // Simulate network delay
    return () => clearTimeout(timer)
  }, [productsToShow])

  const handleLoadMore = () => {
    setProductsToShow((prev) => prev + 6) // Load 6 more products
  }

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (filterCategory === "all") {
        return true
      }
      return product.category === filterCategory
    })
  }, [filterCategory])

  const handleAddToCartClick = useCallback(
    (product: Product) => {
      if (isMounted) {
        // Ensure addToCart is only called if mounted
        addToCart(product)
      }
    },
    [addToCart, isMounted],
  )

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Shop Our Collections Background"
          fill
          className="absolute top-0 left-0 w-full h-full object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-widest uppercase text-center">
            Shop Our Collections
          </h1>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 md:py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-2 md:gap-4">
          <Button
            variant={filterCategory === "all" ? "default" : "outline"}
            onClick={() => setFilterCategory("all")}
            className="px-4 py-2 text-sm md:px-6 md:py-2 md:text-lg"
          >
            All
          </Button>
          <Button
            variant={filterCategory === "vases" ? "default" : "outline"}
            onClick={() => setFilterCategory("vases")}
            className="px-4 py-2 text-sm md:px-6 md:py-2 md:text-lg"
          >
            Vases
          </Button>
          <Button
            variant={filterCategory === "beds" ? "default" : "outline"}
            onClick={() => setFilterCategory("beds")}
            className="px-4 py-2 text-sm md:px-6 md:py-2 md:text-lg"
          >
            Beds
          </Button>
          <Button
            variant={filterCategory === "tables" ? "default" : "outline"}
            onClick={() => setFilterCategory("tables")}
            className="px-4 py-2 text-sm md:px-6 md:py-2 md:text-lg"
          >
            Tables
          </Button>
          <Button
            variant={filterCategory === "sculptures" ? "default" : "outline"}
            onClick={() => setFilterCategory("sculptures")}
            className="px-4 py-2 text-sm md:px-6 md:py-2 md:text-lg"
          >
            Sculptures
          </Button>
          {/* Add more categories as needed */}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {isLoading
              ? // Show skeleton loaders while loading
                Array.from({ length: 6 }).map((_, index) => <ProductSkeleton key={index} />)
              : filteredProducts.map((product) => (
                  <div key={product.id} className="group cursor-pointer">
                    <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-100 rounded-lg border shadow-sm transition-all duration-300 group-hover:shadow-lg">
                      <Image
                        src={product.image || "/placeholder.svg?height=400&width=300&query=shop product fallback"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          variant="outline"
                          className="bg-transparent border-white text-white hover:bg-white hover:text-black px-6 py-3 text-sm md:px-8 md:py-3 md:text-base tracking-wide"
                          asChild
                        >
                          <Link href={product.path}>EXPLORE MORE</Link>
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        className="absolute top-2 right-2 p-1.5 md:top-4 md:right-4 md:p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
                      >
                        <Heart className="w-4 h-4 md:w-5 md:h-5" />
                      </Button>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <h3 className="font-medium tracking-wide text-base md:text-lg">{product.name}</h3>
                      <p className="text-gray-600 text-sm md:text-base">{product.price}</p>
                      <Button
                        variant="outline"
                        className="w-full border-black text-black bg-transparent hover:bg-[#7e8f6c] hover:text-white transition-colors duration-300 group-hover:animate-glow hover:brightness-125 text-sm md:text-base"
                        onClick={() => handleAddToCartClick(product)}
                      >
                        ADD TO CART
                      </Button>
                    </div>
                  </div>
                ))}
          </div>
          {filteredProducts.length > displayedProducts.length && (
            <div className="text-center mt-8 md:mt-12">
              <Button
                variant="outline"
                className="bg-black text-white hover:bg-gray-800 px-6 py-3 text-base md:px-8 md:py-3 md:text-lg tracking-wide"
                onClick={handleLoadMore}
              >
                LOAD MORE
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
