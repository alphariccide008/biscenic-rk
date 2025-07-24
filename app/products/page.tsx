import { allProducts } from "@/lib/products"
import Image from "next/image"
import Link from "next/link"

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <div
            key={product.id}
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
          >
            <Link className="absolute inset-0 z-10" href={`/products/${product.id}`}>
              <span className="sr-only">View Product</span>
            </Link>
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={600}
              className="object-cover w-full h-64"
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-bold text-xl">{product.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold">{product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
