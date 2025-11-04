"use client"

import { mockOrders } from "@/lib/admin-data"
import { Eye, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ITEMS_PER_PAGE = 4

export function OrdersContent() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null)
  const [newStatus, setNewStatus] = useState<string>("")
  const { toast } = useToast()

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((o) => o.id !== id))
    toast({ title: "Success", description: "Order deleted successfully" })
  }

  const handleStatusChange = (orderId: string) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o)))
    toast({ title: "Success", description: "Order status updated successfully" })
    setEditingOrderId(null)
    setNewStatus("")
    setSelectedOrder(null)
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
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
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
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-3 text-sm font-mono">{order.id}</td>
                  <td className="px-6 py-3 text-sm">{order.customer}</td>
                  <td className="px-6 py-3 text-sm">{order.date}</td>
                  <td className="px-6 py-3 text-sm font-semibold">${order.total}</td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                      onClick={() => {
                        setEditingOrderId(order.id)
                        setNewStatus(order.status)
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-muted rounded transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedOrder(order)
                          setEditingOrderId(null)
                        }}
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

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredOrders.length)} of{" "}
          {filteredOrders.length} orders
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="cursor-pointer min-w-10"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {editingOrderId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-8 max-w-sm w-full mx-4">
            <h2 className="font-serif text-2xl mb-4">Update Order Status</h2>
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Select Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded bg-background"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingOrderId(null)
                  setNewStatus("")
                }}
                className="flex-1 cursor-pointer"
              >
                Cancel
              </Button>
              <Button onClick={() => handleStatusChange(editingOrderId)} className="flex-1 cursor-pointer">
                Update
              </Button>
            </div>
          </div>
        </div>
      )}

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
