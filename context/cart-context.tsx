"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"

interface Product {
  id: number | string
  name: string
  price: string
  image?: string
  category?: string
  path?: string
}

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number | string) => void
  updateQuantity: (productId: number | string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()

  // Load cart from localStorage on initial mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback(
    (product: Product) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id)
        if (existingItem) {
          toast({
            title: "Item already in cart",
            description: `${product.name} quantity updated.`,
          })
          return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        } else {
          toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
          })
          return [...prevCart, { ...product, quantity: 1 }]
        }
      })
    },
    [toast],
  )

  const removeFromCart = useCallback(
    (productId: number | string) => {
      setCart((prevCart) => {
        const removedItem = prevCart.find((item) => item.id === productId)
        if (removedItem) {
          toast({
            title: "Item removed",
            description: `${removedItem.name} has been removed from your cart.`,
          })
        }
        return prevCart.filter((item) => item.id !== productId)
      })
    },
    [toast],
  )

  const updateQuantity = useCallback((productId: number | string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => item.id !== productId)
      }
      return prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    toast({
      title: "Cart cleared",
      description: "Your shopping cart is now empty.",
    })
  }, [toast])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
