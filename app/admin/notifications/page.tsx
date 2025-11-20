"use client"

import { Bell, X, ShoppingBag, AlertCircle, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const allNotifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order ORD-011 from James Morrison - $1,850",
    time: "5 mins ago",
  },
  {
    id: 2,
    type: "promotion",
    title: "Low Stock Alert",
    message: "Merino Wool Sweater has only 3 items left",
    time: "15 mins ago",
  },
  {
    id: 3,
    type: "update",
    title: "Order Shipped",
    message: "Order ORD-009 has been shipped to Benjamin Scott",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "promotion",
    title: "Voucher Expiring",
    message: "SPRING30 voucher expires in 2 days",
    time: "2 hours ago",
  },
  {
    id: 5,
    type: "order",
    title: "New Customer Registered",
    message: "New user: Christopher Lee joined the platform",
    time: "3 hours ago",
  },
  {
    id: 6,
    type: "update",
    title: "Payment Received",
    message: "Payment of $2,450 received for Order ORD-008",
    time: "5 hours ago",
  },
  {
    id: 7,
    type: "promotion",
    title: "Stock Added",
    message: "100 units of Cashmere Overcoat added to inventory",
    time: "1 day ago",
  },
  {
    id: 8,
    type: "order",
    title: "Return Requested",
    message: "Customer requested return for Order ORD-007",
    time: "1 day ago",
  },
]

export default function AdminNotificationsPage() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "order" | "promotion" | "update">("all")

  const filteredNotifications =
    selectedFilter === "all" ? allNotifications : allNotifications.filter((n) => n.type === selectedFilter)

  const getIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-5 w-5 text-blue-600" />
      case "promotion":
        return <AlertCircle className="h-5 w-5 text-amber-600" />
      case "update":
        return <TrendingUp className="h-5 w-5 text-green-600" />
      default:
        return <Bell className="h-5 w-5" />
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
              <h1 className="font-serif text-4xl">Admin Notifications</h1>
            </div>
            <p className="text-muted-foreground">Manage all system alerts and updates</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {["all", "order", "promotion", "update"].map((filter) => (
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
                  <div className="flex-shrink-0 flex items-center">{getIcon(notification.type)}</div>
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
            <Link href="/admin" className="text-sm text-primary hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
