"use client"

import { Bell, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const allNotifications = [
  {
    id: 1,
    type: "promotion",
    title: "New Collection Available",
    message: "New collection: Winter Essentials - 20% off all items",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "order",
    title: "Order Shipped",
    message: "Your order #12345 has been shipped and is on the way",
    time: "1 day ago",
  },
  {
    id: 3,
    type: "alert",
    title: "Restock Alert",
    message: "Restock alert: Cashmere Coat is back in stock",
    time: "3 days ago",
  },
  {
    id: 4,
    type: "promotion",
    title: "VIP Access",
    message: "VIP members: Exclusive early access to new arrivals",
    time: "1 week ago",
  },
  {
    id: 5,
    type: "order",
    title: "Order Confirmed",
    message: "Your order has been confirmed and is being prepared",
    time: "1 week ago",
  },
  {
    id: 6,
    type: "alert",
    title: "Price Drop",
    message: "Leather Chelsea Boots price reduced by 15%",
    time: "2 weeks ago",
  },
  {
    id: 7,
    type: "promotion",
    title: "Birthday Offer",
    message: "Happy Birthday! Get 20% off your next purchase",
    time: "3 weeks ago",
  },
  {
    id: 8,
    type: "order",
    title: "Delivery Confirmed",
    message: "Your order has been delivered successfully",
    time: "1 month ago",
  },
]

export default function NotificationsPage() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "promotion" | "order" | "alert">("all")

  const filteredNotifications =
    selectedFilter === "all" ? allNotifications : allNotifications.filter((n) => n.type === selectedFilter)

  const getIcon = (type: string) => {
    switch (type) {
      case "promotion":
        return "🎉"
      case "order":
        return "📦"
      case "alert":
        return "⚠️"
      default:
        return "🔔"
    }
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-8 w-8" />
              <h1 className="font-serif text-4xl">Notifications</h1>
            </div>
            <p className="text-muted-foreground">Stay updated with all your recent notifications and alerts</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {["all", "promotion", "order", "alert"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter as any)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  selectedFilter === filter ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex gap-4 p-4 bg-card border border-border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="text-2xl flex-shrink-0">{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                  <button className="flex-shrink-0 p-1 hover:bg-muted rounded cursor-pointer">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No notifications in this category</p>
              </div>
            )}
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
