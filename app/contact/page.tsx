"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react" // Add Loader2
import { useState, useRef } from "react" // Import useState
// import { ChatbotModal } from "@/components/chatbot-modal" // Add this import

export default function Contact() {
  const [submissionMessage, setSubmissionMessage] = useState<{ success: boolean; message: string } | null>(null)
  const [isSending, setIsSending] = useState(false)
  const formRef = useRef<HTMLFormElement>(null) // Create a ref for the form
  // const [isChatbotOpen, setIsChatbotOpen] = useState(false) // Add this line

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent default form submission
    setIsSending(true)
    setSubmissionMessage(null)

    const formData = new FormData(event.currentTarget)
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Basic client-side validation
    if (!firstName || !lastName || !email || !subject || !message) {
      setSubmissionMessage({ success: false, message: "Please fill in all required fields." })
      setIsSending(false)
      return
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formData, // Send FormData directly
      })

      const data = await response.json()

      if (response.ok) {
        setSubmissionMessage({ success: true, message: data.message })
        formRef.current?.reset() // Use the ref to reset the form
      } else {
        setSubmissionMessage({ success: false, message: data.message || "Failed to send message." })
      }
    } catch (error) {
      console.error("Network or unexpected error:", error)
      setSubmissionMessage({ success: false, message: "An unexpected error occurred. Please try again later." })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-4 md:mb-6 tracking-wider">CONTACT US</h1>
          <p className="text-base md:text-lg text-gray-600">We're here to assist you with any inquiries</p>
        </div>
      </section>
      {/* Contact Form & Info */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-light mb-6 md:mb-8 tracking-wide">GET IN TOUCH</h2>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {" "}
                {/* Attach the ref here */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1 md:mb-2">
                      FIRST NAME
                    </label>
                    <Input id="firstName" name="firstName" className="border-gray-300 focus:border-black" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1 md:mb-2">
                      LAST NAME
                    </label>
                    <Input id="lastName" name="lastName" className="border-gray-300 focus:border-black" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 md:mb-2">
                    EMAIL
                  </label>
                  <Input id="email" name="email" type="email" className="border-gray-300 focus:border-black" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1 md:mb-2">
                    PHONE
                  </label>
                  <Input id="phone" name="phone" type="tel" className="border-gray-300 focus:border-black" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1 md:mb-2">
                    SUBJECT
                  </label>
                  <Input id="subject" name="subject" className="border-gray-300 focus:border-black" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1 md:mb-2">
                    MESSAGE
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="border-gray-300 focus:border-black resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSending}
                  className="bg-[#7e8f6c] text-white hover:bg-white hover:text-black px-6 py-3 w-full flex items-center justify-center gap-2 text-base md:px-8 md:py-3" // Added flex, items-center, justify-center, gap-2
                >
                  {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {/* Spinner */}
                  {isSending ? "SENDING..." : "SEND MESSAGE"}
                </Button>
                {submissionMessage && (
                  <p className={`text-center text-sm ${submissionMessage.success ? "text-green-600" : "text-red-600"}`}>
                    {submissionMessage.message}
                  </p>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-light mb-6 md:mb-8 tracking-wide">CONTACT INFORMATION</h2>
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <MapPin className="w-5 h-5 mt-1 text-gray-600 md:w-6 md:h-6" />
                  <div>
                    <h3 className="font-medium mb-1 md:mb-2 text-base md:text-lg">JORDAN BROOKES, LAGOS, NIGERIA. </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      4 Dada Fayemi Close
                      <br />
                      Osapa, London.
                    </p>
                    <br />
                    <h3 className="font-medium mb-1 md:mb-2 text-base md:text-lg">PENNY LANE, GEORGIA. </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Penny Lane South-east City
                      <br />
                      State, Georgia.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 md:space-x-4">
                  <Phone className="w-5 h-5 mt-1 text-gray-600 md:w-6 md:h-6" />
                  <div>
                    <h3 className="font-medium mb-1 md:mb-2 text-base md:text-lg">PHONE</h3>
                    <p className="text-gray-600 text-sm md:text-base">+2348061789132</p>
                    <p className="text-gray-600 text-sm md:text-base">+14706219649</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 md:space-x-4">
                  <Mail className="w-5 h-5 mt-1 text-gray-600 md:w-6 md:h-6" />
                  <div>
                    <h3 className="font-medium mb-1 md:mb-2 text-base md:text-lg">EMAIL</h3>
                    <p className="text-gray-600 text-sm md:text-base">biscenic@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 md:space-x-4">
                  <Clock className="w-5 h-5 mt-1 text-gray-600 md:w-6 md:h-6" />
                  <div>
                    <h3 className="font-medium mb-1 md:mb-2 text-base md:text-lg">HOURS</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Monday - Saturday: 07:00 AM - 08:00 PM
                      <br />
                      Sunday: 11:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 md:mt-12">
                <h3 className="font-medium mb-3 md:mb-4 text-base md:text-lg">CLIENT SERVICES</h3>
                <Button
                  variant="outline"
                  className="border-black bg-[#7e8f6c] text-white hover:bg-white hover:text-black mt-4 px-6 py-3 text-base md:px-8 md:py-3" // Added mt-4 for spacing
                  onClick={() => {
                    const whatsappNumber = "+14706219649"
                    const message = "Hello, I'd like to inquire about BISCENIC products/services."
                    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
                    window.open(whatsappUrl, "_blank")
                  }}
                >
                  MESSAGE US ON WHATSAPP
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} /> Add this line */}
    </div>
  )
}
