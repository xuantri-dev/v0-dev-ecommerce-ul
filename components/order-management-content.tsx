"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, AlertCircle, CheckCircle, X, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const mockOrdersForManagement = [
  {
    id: "ORD-2024-001",
    date: "March 15, 2024",
    status: "delivered",
    total: 1245.0,
    canCancel: false,
    canReturn: true,
    returnDeadline: "April 15, 2024",
  },
  {
    id: "ORD-2024-002",
    date: "February 8, 2024",
    status: "shipped",
    total: 890.0,
    canCancel: true,
    canReturn: false,
    returnDeadline: null,
  },
  {
    id: "ORD-2023-045",
    date: "December 20, 2023",
    status: "delivered",
    total: 2150.0,
    canCancel: false,
    canReturn: false,
    returnDeadline: null,
  },
]

export function OrderManagementContent() {
  const { toast } = useToast()
  const [orders, setOrders] = useState(mockOrdersForManagement)

  const handleCancelOrder = (orderId: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "cancelled" } : order)))
    toast({
      title: "Order Cancelled",
      description: `Order ${orderId} has been cancelled successfully.`,
    })
  }

  const handleReturnRequest = (orderId: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "return_requested" } : order)))
    toast({
      title: "Return Requested",
      description: `Return request for ${orderId} has been submitted. We'll contact you shortly.`,
    })
  }

  return (
    <div className="py-16 px-4 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Order Management</h1>
          <p className="text-muted-foreground text-lg">Manage, cancel, or return your orders</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      {order.id}
                    </CardTitle>
                    <CardDescription className="mt-1">Placed on {order.date}</CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      order.status === "delivered"
                        ? "bg-green-500 text-white"
                        : order.status === "shipped"
                          ? "bg-blue-500 text-white"
                          : order.status === "cancelled"
                            ? "bg-red-500 text-white"
                            : "bg-yellow-500 text-white"
                    }
                  >
                    {order.status === "return_requested"
                      ? "Return Requested"
                      : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Order Total: ${order.total.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  {order.canCancel && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-yellow-900">This order can still be cancelled</p>
                          <p className="text-sm text-yellow-800 mt-1">
                            You can cancel this order before it ships. Once shipped, you'll need to request a return
                            instead.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {order.canReturn && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-blue-900">Return window available</p>
                          <p className="text-sm text-blue-800 mt-1">
                            You can return this order until {order.returnDeadline}. Items must be in original condition.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {!order.canCancel && !order.canReturn && order.status === "delivered" && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Return window closed</p>
                          <p className="text-sm text-gray-800 mt-1">
                            The return window for this order has expired. Contact support if you have any issues.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/orders/${order.id}`}>View Details</Link>
                  </Button>

                  {order.canCancel && (
                    <Button
                      variant="destructive"
                      onClick={() => handleCancelOrder(order.id)}
                      className="flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancel Order
                    </Button>
                  )}

                  {order.canReturn && (
                    <Button
                      variant="outline"
                      onClick={() => handleReturnRequest(order.id)}
                      className="flex items-center gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Request Return
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-serif text-2xl mb-2">No orders to manage</h3>
              <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
              <Button asChild>
                <Link href="/shop">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
