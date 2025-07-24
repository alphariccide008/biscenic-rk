"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, ThumbsUp, ThumbsDown, X, Loader2, Sparkles } from "lucide-react"
import { useChatbot } from "@/context/chatbot-context"
import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function ChatbotModal() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isChatbotOpen,
    setIsChatbotOpen,
    clearChat,
    sendFeedback,
    feedback,
    remainingCharacters,
    characterLimit,
  } = useChatbot()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <Dialog open={isChatbotOpen} onOpenChange={setIsChatbotOpen}>
      <DialogContent className="flex flex-col h-[90vh] max-h-[700px] w-[95vw] max-w-[600px] p-0">
        <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            BISCENIC AI Assistant
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsChatbotOpen(false)} aria-label="Close chatbot">
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center py-10">
                <Sparkles className="h-12 w-12 mb-4 text-purple-400" />
                <p className="text-lg font-medium">How can I help you today?</p>
                <p className="text-sm">Ask me anything about Biscenic products, services, or exhibitions.</p>
              </div>
            )}
            {messages.map((m, index) => (
              <div key={m.id} className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[75%] rounded-lg p-3 text-sm",
                    m.role === "user"
                      ? "bg-black text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none",
                  )}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                  {m.createdAt && (
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {m.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  )}
                  {m.role === "assistant" && (
                    <div className="flex justify-end gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-7 w-7",
                          feedback?.messageId === m.id && feedback?.rating === "good" && "bg-green-200",
                        )}
                        onClick={() => sendFeedback(m.id, "good")}
                        disabled={!!feedback?.messageId}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-7 w-7",
                          feedback?.messageId === m.id && feedback?.rating === "bad" && "bg-red-200",
                        )}
                        onClick={() => sendFeedback(m.id, "bad")}
                        disabled={!!feedback?.messageId}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex w-full justify-start">
                <div className="max-w-[75%] rounded-lg p-3 text-sm bg-gray-100 text-gray-900 rounded-bl-none">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="p-4 border-t flex items-center gap-2">
          <Input
            className="flex-1"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            maxLength={characterLimit}
          />
          <Button type="submit" size="icon" disabled={isLoading || input.trim().length === 0}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
          <div className="absolute bottom-4 right-16 text-xs text-gray-500">
            {remainingCharacters}/{characterLimit}
          </div>
        </form>
        <div className="p-2 border-t flex justify-between items-center text-sm text-gray-600">
          <Button variant="ghost" onClick={clearChat} className="text-red-500 hover:bg-red-50 hover:text-red-600">
            Clear Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
