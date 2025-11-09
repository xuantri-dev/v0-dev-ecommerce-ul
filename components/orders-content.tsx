"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const allMockOrders = [
  {
    id: "ORD-2024-001",
    date: "March 15, 2024",
    status: "confirmed",
    total: 1245.0,
    subtotal: 1145.0,
    discount: 100.0,
    discountCode: "SPRING20",
    shippingFee: 0,
    shippingAddress: {
      name: "Alexander Sterling",
      street: "123 Fashion Avenue",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: "1",
        name: "Cashmere Overcoat",
        price: 895.0,
        quantity: 1,
        size: "L",
        color: "Charcoal",
        image: "/luxury-cashmere-overcoat.jpg",
      },
      {
        id: "2",
        name: "Merino Wool Sweater",
        price: 245.0,
        quantity: 1,
        size: "M",
        color: "Navy",
        image: "/merino-wool-sweater-navy.jpg",
      },
      {
        id: "3",
        name: "Leather Belt",
        price: 105.0,
        quantity: 1,
        size: "34",
        color: "Black",
        image: "/leather-belt-black.jpg",
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "February 8, 2024",
    status: "shipping",
    total: 890.0,
    subtotal: 890.0,
    discount: 0,
    discountCode: null,
    shippingFee: 0,
    shippingAddress: {
      name: "Alexander Sterling",
      street: "123 Fashion Avenue",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    paymentMethod: "MoMo",
    items: [
      {
        id: "4",
        name: "Oxford Dress Shirt",
        price: 185.0,
        quantity: 2,
        size: "M",
        color: "White",
        image: "/oxford-dress-shirt-white.jpg",
      },
      {
        id: "5",
        name: "Silk Tie",
        price: 95.0,
        quantity: 1,
        size: "One Size",
        color: "Burgundy",
        image: "/silk-tie-burgundy.jpg",
      },
    ],
  },
  {
    id: "ORD-2023-045",
    date: "December 20, 2023",
    status: "delivered",
    total: 2150.0,
    subtotal: 2150.0,
    discount: 0,
    discountCode: null,
    shippingFee: 0,
    shippingAddress: {
      name: "Alexander Sterling",
      street: "123 Fashion Avenue",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: "6",
        name: "Wool Suit",
        price: 1450.0,
        quantity: 1,
        size: "42R",
        color: "Navy",
        image: "/wool-suit-navy.jpg",
      },
      {
        id: "7",
        name: "Dress Shoes",
        price: 450.0,
        quantity: 1,
        size: "10",
        color: "Black",
        image: "/dress-shoes-black-leather.jpg",
      },
      {
        id: "8",
        name: "Pocket Square",
        price: 45.0,
        quantity: 2,
        size: "One Size",
        color: "Assorted",
        image: "/pocket-square-silk.jpg",
      },
    ],
  },
  {
    id: "ORD-2023-044",
    date: "November 10, 2023",
    status: "cancelled",
    total: 675.0,
    subtotal: 675.0,
    discount: 0,
    discountCode: null,
    shippingFee: 0,
    shippingAddress: {
      name: "Alexander Sterling",
      street: "123 Fashion Avenue",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    paymentMethod: "ZaloPay",
    items: [
      {
        id: "9",
        name: "Cashmere Scarf",
        price: 225.0,
        quantity: 1,
        size: "One Size",
        color: "Charcoal",
        image: "/luxury-cashmere-overcoat.jpg",
      },
      {
        id: "10",
        name: "Leather Gloves",
        price: 150.0,
        quantity: 1,
        size: "M",
        color: "Black",
        image: "/leather-belt-black.jpg",
      },
      {
        id: "11",
        name: "Wool Socks",
        price: 45.0,
        quantity: 3,
        size: "One Size",
        color: "Navy",
        image: "/merino-wool-sweater-navy.jpg",
      },
    ],
  },
  {
    id: "ORD-2023-043",
    date: "October 5, 2023",
    status: "delivered",
    total: 1520.0,
    subtotal: 1520.0,
    discount: 0,
    discountCode: null,
    shippingFee: 0,
    shippingAddress: {
      name: "Alexander Sterling",
      street: "123 Fashion Avenue",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: "12",
        name: "Linen Shirt",
        price: 195.0,
        quantity: 2,
        size: "L",
        color: "Cream",
        image: "/oxford-dress-shirt-white.jpg",
      },
      {
        id: "13",
        name: "Chinos",
        price: 165.0,
        quantity: 2,
        size: "34",
        color: "Khaki",
        image: "/leather-belt-black.jpg",
      },
      {
        id: "14",
        name: "Blazer",
        price: 795.0,
        quantity: 1,
        size: "42R",
        color: "Charcoal",
        image: "/wool-suit-navy.jpg",
      },
    ],
  },
  {
    id: "ORD-2023-042",
    date: "September 18, 2023",
    status: "delivered",
    total: 445.0,
    subtotal: 445.0,
    discount: 0,
    discountCode: null,
    shippingFee: 0,
    shippingAddress: {
      name: "Alexander Sterling",
      street: "123 Fashion Avenue",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: "15",
        name: "Polo Shirt",
        price: 125.0,
        quantity: 2,
        size: "M",
        color: "Navy",
        image: "/oxford-dress-shirt-white.jpg",
      },
      {
        id: "16",
        name: "Leather Wallet",
        price: 195.0,
        quantity: 1,
        size: "One Size",
        color: "Black",
        image: "/leather-belt-black.jpg",
      },
    ],
  },
  {
    id: "ORD-2023-041",
    date: "August 30, 2023",
    status: "delivered",
    total: 890.0,
    subtotal: 890.0,
    discount: 0,
    discountCode: null,
    shippingFee: 0,
    shippingAddress: {
      name: "Alexander Sterling",
      street: "123 Fashion Avenue",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: "17",
        name: "Summer Shorts",
        price: 95.0,
        quantity: 2,
        size: "M",
        color: "Beige",
        image: "/leather-belt-black.jpg",
      },
      {
        id: "18",
        name: "T-Shirt",
        price: 65.0,
        quantity: 3,
        size: "M",
        color: "White",
        image: "/oxford-dress-shirt-white.jpg",
      },
      {
        id: "19",
        name: "Sunglasses",
        price: 450.0,
        quantity: 1,
        size: "One Size",
        color: "Black",
        image: "/dress-shoes-black-leather.jpg",
      },
    ],
  },
  {
    id: "ORD-2023-040",
    date: "July 12, 2023",
    status: "delivered",
    total: 1125.0,
    subtotal: 1125.0,
    discount: 0,
    discountCode: null,
    shippingFee: 0,
    shippingAddress: {
      name: "Alexander Sterling",
      street: "123 Fashion Avenue",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: "20",
        name: "Linen Blazer",
        price: 595.0,
        quantity: 1,
        size: "42R",
        color: "Cream",
        image: "/wool-suit-navy.jpg",
      },
      {
        id: "21",
        name: "Linen Trousers",
        price: 245.0,
        quantity: 1,
        size: "34",
        color: "Cream",
        image: "/leather-belt-black.jpg",
      },
      {
        id: "22",
        name: "Loafers",
        price: 285.0,
        quantity: 1,
        size: "10",
        color: "Brown",
        image: "/dress-shoes-black-leather.jpg",
      },
    ],
  },
]

const statusConfig = {
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    color: "bg-blue-500",
    description: "Your order has been confirmed",
  },
  shipping: {
    label: "Shipping",
    icon: Truck,
    color: "bg-purple-500",
    description: "Your order is on its way",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    color: "bg-green-500",
    description: "Your order has been delivered",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "bg-red-500",
    description: "Your order has been cancelled",
  },
}

const ORDERS_PER_PAGE = 4

export function OrdersContent() {
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [cancelConfirmation, setCancelConfirmation] = useState<{ isOpen: boolean; orderId: string | null }>({
    isOpen: false,
    orderId: null,
  })
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  const handleCancelOrder = (orderId: string) => {
    setCancelConfirmation({ isOpen: true, orderId })
  }

  const handleConfirmCancel = () => {
    if (cancelConfirmation.orderId) {
      toast({
        title: "Order Cancelled",
        description: `Order ${cancelConfirmation.orderId} has been cancelled successfully.`,
      })
      setCancelConfirmation({ isOpen: false, orderId: null })
    }
  }

  const totalPages = Math.ceil(allMockOrders.length / ORDERS_PER_PAGE)
  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE
  const endIndex = startIndex + ORDERS_PER_PAGE
  const mockOrders = allMockOrders.slice(startIndex, endIndex)

  return (
    <div className="py-16 px-4 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">My Orders</h1>
          <p className="text-muted-foreground text-lg">Track and manage your orders</p>
        </div>

        <div className="space-y-6">
          {mockOrders.map((order) => {
            const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
            const isExpanded = expandedOrderId === order.id

            return (
              <Card key={order.id} className="overflow-hidden transition-all duration-300">
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-3">
                        <Package className="h-5 w-5" />
                        {order.id}
                      </CardTitle>
                      <CardDescription className="mt-1">Placed on {order.date}</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className={`${statusConfig[order.status as keyof typeof statusConfig].color} text-white`}
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[order.status as keyof typeof statusConfig].label}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                        className="cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            Hide Details
                            <ChevronUp className="ml-2 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            View Details
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} {order.items.length === 1 ? "item" : "items"}
                    </p>
                    <p className="text-xl font-semibold">${order.total.toFixed(2)}</p>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="space-y-6 border-t border-border pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Order Items */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Order Items</h4>
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative w-20 h-20 bg-secondary flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Size: {item.size} | Color: {item.color}
                            </p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                            <p className="text-sm font-medium mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Shipping Address */}
                      <div>
                        <h4 className="font-semibold mb-2">Shipping Address</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>{order.shippingAddress.name}</p>
                          <p>{order.shippingAddress.street}</p>
                          <p>
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                          </p>
                          <p>{order.shippingAddress.country}</p>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h4 className="font-semibold mb-2">Payment Method</h4>
                        <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Order Summary Details */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${order.subtotal.toFixed(2)}</span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Discount {order.discountCode && `(${order.discountCode})`}
                          </span>
                          <span className="text-green-600">-${order.discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Shipping {order.shippingFee === 0 ? "(Free Shipping)" : ""}
                        </span>
                        <span>{order.shippingFee === 0 ? "Free" : `$${order.shippingFee.toFixed(2)}`}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {order.status === "confirmed" && (
                      <Button
                        variant="destructive"
                        className="w-full cursor-pointer"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancel Order
                      </Button>
                    )}
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="cursor-pointer"
            >
              Previous
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="w-10 cursor-pointer"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="cursor-pointer"
            >
              Next
            </Button>
          </div>
        )}

        {allMockOrders.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-serif text-2xl mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
              <Button asChild className="cursor-pointer">
                <Link href="/shop">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <Dialog
          open={cancelConfirmation.isOpen}
          onOpenChange={(open) => setCancelConfirmation({ ...cancelConfirmation, isOpen: open })}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Order</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel order {cancelConfirmation.orderId}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setCancelConfirmation({ isOpen: false, orderId: null })}
                className="cursor-pointer"
              >
                Keep Order
              </Button>
              <Button variant="destructive" onClick={handleConfirmCancel} className="cursor-pointer">
                Cancel Order
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
