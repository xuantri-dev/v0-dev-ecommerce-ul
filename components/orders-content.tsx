"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, Clock, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const allMockOrders = [
  {
    id: "ORD-2024-001",
    date: "March 15, 2024",
    status: "delivered",
    total: 1245.0,
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
    tracking: "1Z999AA10123456784",
    estimatedDelivery: "March 18, 2024",
  },
  {
    id: "ORD-2024-002",
    date: "February 8, 2024",
    status: "shipped",
    total: 890.0,
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
    tracking: "1Z999AA10123456785",
    estimatedDelivery: "February 12, 2024",
  },
  {
    id: "ORD-2023-045",
    date: "December 20, 2023",
    status: "delivered",
    total: 2150.0,
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
    tracking: "1Z999AA10123456786",
    estimatedDelivery: "December 28, 2023",
  },
  {
    id: "ORD-2023-044",
    date: "November 10, 2023",
    status: "delivered",
    total: 675.0,
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
    tracking: "1Z999AA10123456787",
    estimatedDelivery: "November 15, 2023",
  },
  {
    id: "ORD-2023-043",
    date: "October 5, 2023",
    status: "delivered",
    total: 1520.0,
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
    tracking: "1Z999AA10123456788",
    estimatedDelivery: "October 10, 2023",
  },
  {
    id: "ORD-2023-042",
    date: "September 18, 2023",
    status: "delivered",
    total: 445.0,
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
    tracking: "1Z999AA10123456789",
    estimatedDelivery: "September 22, 2023",
  },
  {
    id: "ORD-2023-041",
    date: "August 30, 2023",
    status: "delivered",
    total: 890.0,
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
    tracking: "1Z999AA10123456790",
    estimatedDelivery: "September 5, 2023",
  },
  {
    id: "ORD-2023-040",
    date: "July 12, 2023",
    status: "delivered",
    total: 1125.0,
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
    tracking: "1Z999AA10123456791",
    estimatedDelivery: "July 18, 2023",
  },
]

const statusConfig = {
  processing: {
    label: "Processing",
    icon: Clock,
    color: "bg-yellow-500",
    description: "Your order is being prepared",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    color: "bg-blue-500",
    description: "Your order is on its way",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    color: "bg-green-500",
    description: "Your order has been delivered",
  },
}

const ORDERS_PER_PAGE = 4

export function OrdersContent() {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const toggleOrder = (orderId: string) => {
    setExpandedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
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
            const isExpanded = expandedOrders.includes(order.id)
            const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon

            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
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
                      <Button variant="ghost" size="sm" onClick={() => toggleOrder(order.id)}>
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Order Summary */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {statusConfig[order.status as keyof typeof statusConfig].description}
                        </p>
                      </div>
                      <p className="text-xl font-semibold">${order.total.toFixed(2)}</p>
                    </div>

                    {/* Tracking Info */}
                    {order.tracking && (
                      <div className="bg-secondary/50 p-4 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">Tracking Number</p>
                            <p className="text-sm text-muted-foreground font-mono">{order.tracking}</p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                              Track Package
                            </a>
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Estimated delivery: {order.estimatedDelivery}
                        </p>
                      </div>
                    )}

                    {/* Expanded Order Details */}
                    {isExpanded && (
                      <>
                        <Separator />
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

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/orders/${order.id}`}>View Details</Link>
                          </Button>
                          {order.status === "delivered" && (
                            <Button variant="outline" size="sm">
                              Reorder
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
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
            >
              Previous
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
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
