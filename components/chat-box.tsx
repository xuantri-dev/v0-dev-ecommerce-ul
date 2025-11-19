"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, X, MessageCircle } from 'lucide-react'

interface Message {
  id: number
  sender: "user" | "admin"
  text: string
  timestamp: string
}

interface ChatBoxProps {
  userType?: "customer" | "admin"
}

const mockMessages: Message[] = [
  { id: 1, sender: "admin", text: "Hello! How can I help you today?", timestamp: "2:30 PM" },
  { id: 2, sender: "user", text: "Hi, I have a question about my order", timestamp: "2:31 PM" },
  { id: 3, sender: "admin", text: "Of course! What's the order number?", timestamp: "2:32 PM" },
  { id: 4, sender: "user", text: "It's ORD-001", timestamp: "2:33 PM" },
  { id: 5, sender: "admin", text: "I found it! Your order is on the way and will arrive tomorrow.", timestamp: "2:34 PM" },
]

export function ChatBox({ userType = "customer" }: ChatBoxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(mockMessages)
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      sender: userType === "customer" ? "user" : "admin",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setInputValue("")

    // Simulate admin response
    if (userType === "customer") {
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          sender: "admin",
          text: "Thank you for your message! We'll get back to you shortly.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, response])
      }, 1000)
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer z-40"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-96 bg-background border border-border rounded-lg shadow-lg z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Support Chat</h3>
              <p className="text-xs text-white/80">
                {userType === "customer" ? "Chat with our support team" : "Chat with customers"}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-card border border-border rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/60" : "text-muted-foreground"}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 bg-card">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
