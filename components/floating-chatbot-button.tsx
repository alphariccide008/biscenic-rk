"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { useChatbot } from "@/context/chatbot-context"

export function FloatingChatbotButton() {
  const { setIsChatbotOpen } = useChatbot()

  return (
    <Button
      className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg bg-black text-white hover:bg-gray-800 transition-colors z-50"
      onClick={() => setIsChatbotOpen(true)}
      aria-label="Open Chatbot"
    >
      <MessageSquare className="h-6 w-6" />
    </Button>
  )
}
