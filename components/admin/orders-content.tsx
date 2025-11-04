"use client"

import { mockOrders } from "@/lib/admin-data"
import { Eye, Trash2, X } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function OrdersContent() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null)
  const { toast } = useToast()

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((o) => o.id !== id))
    toast({ title: "Success", description: "Order deleted successfully" })
  }

  return (
    <div className="p-8">
      <div>
        <h1 className="font-serif text-4xl font-bold mb-2">Orders</h1>
        <p className="text-muted-foreground mb-6">Manage and track customer orders</p>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search orders by ID or customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
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
              {filteredOrders.map((order) => (
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
                      <button
                        className="p-2 hover:bg-muted rounded transition-colors cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
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

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 hover:bg-muted rounded transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="font-semibold font-mono">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold inline-block ${
                      selectedOrder.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : selectedOrder.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : selectedOrder.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Customer</p>
                  <p className="font-semibold">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                  <p className="font-semibold">{selectedOrder.date}</p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-4">Order Items</h3>
                <div className="space-y-2 bg-muted/30 p-4 rounded">
                  <p className="text-sm font-medium">Cashmere Overcoat x1 - $1,200</p>
                  <p className="text-sm font-medium">Merino Wool Sweater x1 - $350</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Subtotal</p>
                  <p className="font-semibold">${selectedOrder.total}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total</p>
                  <p className="font-semibold text-lg">${selectedOrder.total}</p>
                </div>
              </div>
            </div>

            <Button onClick={() => setSelectedOrder(null)} className="w-full mt-6 cursor-pointer">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
