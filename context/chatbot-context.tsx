"use client"

import type React from "react"
import { createContext, useState, useContext, useCallback, useRef, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  id: string
  role: "user" | "assistant" | "tool" | "function"
  content: string
  createdAt?: Date
}

interface ChatbotContextType {
  messages: Message[]
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  isLoading: boolean
  isChatbotOpen: boolean
  setIsChatbotOpen: (isOpen: boolean) => void
  clearChat: () => void
  submitUserMessage: (message: string) => Promise<void>
  feedback: { messageId: string; rating: "good" | "bad" } | null
  sendFeedback: (messageId: string, rating: "good" | "bad") => Promise<void>
  characterLimit: number
  remainingCharacters: number
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<{ messageId: string; rating: "good" | "bad" } | null>(null)
  const { toast } = useToast()

  const characterLimit = 500
  const remainingCharacters = characterLimit - input.length

  // Ref for the chat container to scroll to bottom
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Load messages from localStorage on initial mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatbotMessages")
    if (savedMessages) {
      setMessages(
        JSON.parse(savedMessages).map((msg: Message) => ({
          ...msg,
          createdAt: msg.createdAt ? new Date(msg.createdAt) : undefined,
        })),
      )
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages))
    // Scroll to bottom when messages update
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.length <= characterLimit) {
        setInput(e.target.value)
      } else {
        toast({
          title: "Character Limit Reached",
          description: `Your message cannot exceed ${characterLimit} characters.`,
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const addMessage = useCallback((message: Message) => {
    setMessages((prevMessages) => [...prevMessages, { ...message, createdAt: new Date() }])
  }, [])

  const submitUserMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim()) return

      setIsLoading(true)
      const newUserMessage: Message = { id: Date.now().toString(), role: "user", content: userMessage }
      addMessage(newUserMessage)
      setInput("") // Clear input immediately

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: [...messages, newUserMessage] }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch from API")
        }

        const reader = response.body?.getReader()
        if (!reader) throw new Error("Failed to get reader from response body")

        let assistantResponse = ""
        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          assistantResponse += decoder.decode(value, { stream: true })
          // Update the last message or add a new one as chunks arrive
          setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1]
            if (lastMessage && lastMessage.role === "assistant" && lastMessage.id === "streaming-assistant-message") {
              return prevMessages.map((msg) =>
                msg.id === "streaming-assistant-message" ? { ...msg, content: assistantResponse } : msg,
              )
            } else {
              return [
                ...prevMessages,
                {
                  id: "streaming-assistant-message",
                  role: "assistant",
                  content: assistantResponse,
                  createdAt: new Date(),
                },
              ]
            }
          })
        }
        // Replace the streaming message with a permanent one
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === "streaming-assistant-message" ? { ...msg, id: Date.now().toString() } : msg,
          ),
        )
      } catch (error: any) {
        console.error("Chat API error:", error)
        addMessage({
          id: Date.now().toString(),
          role: "assistant",
          content: `Error: ${error.message}. Please try again.`,
        })
        toast({
          title: "Chat Error",
          description: "There was an issue processing your request. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    },
    [messages, addMessage, toast],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      await submitUserMessage(input)
    },
    [input, submitUserMessage],
  )

  const clearChat = useCallback(() => {
    setMessages([])
    localStorage.removeItem("chatbotMessages")
    toast({
      title: "Chat Cleared",
      description: "Your conversation history has been removed.",
    })
  }, [toast])

  const sendFeedback = useCallback(
    async (messageId: string, rating: "good" | "bad") => {
      setFeedback({ messageId, rating })
      try {
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messageId, rating }),
        })

        if (!response.ok) {
          throw new Error("Failed to send feedback")
        }
        toast({
          title: "Feedback Sent",
          description: `Thank you for your feedback!`,
        })
      } catch (error) {
        console.error("Error sending feedback:", error)
        toast({
          title: "Feedback Error",
          description: "Could not send feedback. Please try again.",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        isChatbotOpen,
        setIsChatbotOpen,
        clearChat,
        submitUserMessage,
        feedback,
        sendFeedback,
        characterLimit,
        remainingCharacters,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  )
}

export const useChatbot = () => {
  const context = useContext(ChatbotContext)
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider")
  }
  return context
}
