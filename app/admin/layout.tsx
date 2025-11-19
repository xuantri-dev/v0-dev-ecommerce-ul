import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { ChatBox } from "@/components/chat-box"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1">{children}</main>
      
      <ChatBox userType="admin" />
    </div>
  )
}
