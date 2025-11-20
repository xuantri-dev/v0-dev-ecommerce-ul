"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, X, MessageCircle, ChevronLeft } from "lucide-react"

interface Message {
  id: number
  sender: "user" | "admin"
  text: string
  timestamp: string
}

interface Conversation {
  id: string
  customerId: string
  customerName: string
  lastMessage: string
  unread: boolean
  messages: Message[]
}

interface ChatBoxProps {
  userType?: "customer" | "admin"
}

const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    customerId: "cust-1",
    customerName: "Michael Johnson",
    lastMessage: "Thank you for the help!",
    unread: true,
    messages: [
      { id: 1, sender: "admin", text: "Hello! How can I help you today?", timestamp: "2:30 PM" },
      { id: 2, sender: "user", text: "Hi, I have a question about my order", timestamp: "2:31 PM" },
      { id: 3, sender: "admin", text: "Of course! What's the order number?", timestamp: "2:32 PM" },
      { id: 4, sender: "user", text: "It's ORD-001", timestamp: "2:33 PM" },
      {
        id: 5,
        sender: "admin",
        text: "I found it! Your order is on the way and will arrive tomorrow.",
        timestamp: "2:34 PM",
      },
      { id: 6, sender: "user", text: "Thank you for the help!", timestamp: "2:35 PM" },
    ],
  },
  {
    id: "conv-2",
    customerId: "cust-2",
    customerName: "David Chen",
    lastMessage: "Will check with my team",
    unread: true,
    messages: [
      { id: 1, sender: "user", text: "Hi, about the return policy?", timestamp: "3:00 PM" },
      { id: 2, sender: "admin", text: "We have a 30-day return policy", timestamp: "3:05 PM" },
      { id: 3, sender: "user", text: "Can I return items without tags?", timestamp: "3:10 PM" },
      { id: 4, sender: "admin", text: "Will check with my team", timestamp: "3:15 PM" },
    ],
  },
  {
    id: "conv-3",
    customerId: "cust-3",
    customerName: "James Wilson",
    lastMessage: "Perfect, thanks!",
    unread: false,
    messages: [
      { id: 1, sender: "user", text: "When will my order ship?", timestamp: "1:00 PM" },
      { id: 2, sender: "admin", text: "It will ship tomorrow", timestamp: "1:05 PM" },
      { id: 3, sender: "user", text: "Perfect, thanks!", timestamp: "1:10 PM" },
    ],
  },
]

const mockCustomerMessages: Message[] = [
  { id: 1, sender: "admin", text: "Hello! How can I help you today?", timestamp: "2:30 PM" },
  { id: 2, sender: "user", text: "Hi, I have a question about my order", timestamp: "2:31 PM" },
  { id: 3, sender: "admin", text: "Of course! What's the order number?", timestamp: "2:32 PM" },
  { id: 4, sender: "user", text: "It's ORD-001", timestamp: "2:33 PM" },
  {
    id: 5,
    sender: "admin",
    text: "I found it! Your order is on the way and will arrive tomorrow.",
    timestamp: "2:34 PM",
  },
]

export function ChatBox({ userType = "customer" }: ChatBoxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [conversations, setConversations] = useState(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState(mockCustomerMessages)
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

    // Simulate admin/customer response
    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        sender: userType === "customer" ? "admin" : "user",
        text: "Thank you for your message! We'll get back to you shortly.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, response])
    }, 1000)

    // Update conversation if admin
    if (userType === "admin" && selectedConversation) {
      setConversations(
        conversations.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: inputValue, messages: [...conv.messages, newMessage] }
            : conv,
        ),
      )
      setSelectedConversation({
        ...selectedConversation,
        messages: [...selectedConversation.messages, newMessage],
      })
    }
  }

  // For admin view - show conversation list
  if (userType === "admin" && isOpen) {
    return (
      <div className="fixed bottom-6 right-6 w-96 h-96 bg-background border border-border rounded-lg shadow-lg z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Customer Support</h3>
            <p className="text-xs text-white/80">{conversations.length} conversations</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {selectedConversation ? (
          <>
            {/* Selected Conversation Header */}
            <div className="bg-muted px-4 py-3 flex items-center gap-2 border-b border-border">
              <button
                onClick={() => setSelectedConversation(null)}
                className="p-1 hover:bg-background rounded cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex-1">
                <p className="text-sm font-medium">{selectedConversation.customerName}</p>
                <p className="text-xs text-muted-foreground">ID: {selectedConversation.customerId}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
              {selectedConversation.messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-card border border-border rounded-bl-none"
                        : "bg-primary text-white rounded-br-none"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${message.sender === "user" ? "text-muted-foreground" : "text-white/60"}`}
                    >
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
                <Button size="icon" onClick={handleSendMessage} className="cursor-pointer">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className="w-full p-4 text-left hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{conversation.customerName}</p>
                      <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread && <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  // Customer view - single conversation
  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer z-40"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-96 bg-background border border-border rounded-lg shadow-lg z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Support Chat</h3>
              <p className="text-xs text-white/80">Chat with our support team</p>
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
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-card border border-border rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${message.sender === "user" ? "text-white/60" : "text-muted-foreground"}`}
                  >
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
              <Button size="icon" onClick={handleSendMessage} className="cursor-pointer">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
