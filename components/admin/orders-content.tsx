"use client"

import { mockOrders } from "@/lib/admin-data"
import { Eye, Trash2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function OrdersContent() {
  const [orders, setOrders] = useState(mockOrders)
  const { toast } = useToast()

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((o) => o.id !== id))
    toast({ title: "Success", description: "Order deleted successfully" })
  }

  return (
    <div className="p-8">
      <div>
        <h1 className="font-serif text-4xl font-bold mb-2">Orders</h1>
        <p className="text-muted-foreground mb-8">Manage and track customer orders</p>
      </div>

      <div className="bg-card border border-border rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-3 text-sm font-mono">{order.id}</td>
                  <td className="px-6 py-3 text-sm">{order.customer}</td>
                  <td className="px-6 py-3 text-sm">{order.date}</td>
                  <td className="px-6 py-3 text-sm font-semibold">${order.total}</td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted rounded transition-colors cursor-pointer">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-muted rounded transition-colors text-destructive cursor-pointer"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
