import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/context/cart-context"
import { ChatbotProvider } from "@/context/chatbot-context"
import { ChatbotModal } from "@/components/chatbot-modal"
import { FloatingChatbotButton } from "@/components/floating-chatbot-button"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "BISCENIC - Luxury Fashion House",
  description:
    "Discover luxury fashion and home decor at BISCENIC. Premium collections including LumiVase and exclusive designs.",
  keywords: "luxury fashion, home decor, LumiVase, premium collections",
  openGraph: {
    title: "BISCENIC - Luxury Fashion House",
    description: "Discover luxury fashion and home decor at BISCENIC",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//blob.v0.dev" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <ChatbotProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <ChatbotModal />
            <FloatingChatbotButton />
          </ChatbotProvider>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
