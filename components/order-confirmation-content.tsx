"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle, CreditCard, Truck, User } from "lucide-react"
import Image from "next/image"

const mockOrderData = {
  orderNumber: "ORD-2024-001234",
  date: "December 18, 2024",
  firstName: "Alexander",
  lastName: "Sterling",
  email: "alexander.sterling@example.com",
  phone: "+1 (555) 123-4567",
  address: "142 Madison Avenue",
  city: "New York",
  state: "NY",
  zip: "10016",
  country: "United States",
  paymentMethod: "Visa",
  items: [
    {
      id: "1",
      name: "Cashmere Overcoat",
      price: 895.0,
      quantity: 1,
      selectedSize: "L",
      selectedColor: "Charcoal",
      images: ["/luxury-cashmere-overcoat.jpg"],
    },
    {
      id: "2",
      name: "Merino Wool Sweater",
      price: 245.0,
      quantity: 1,
      selectedSize: "M",
      selectedColor: "Navy",
      images: ["/merino-wool-sweater-navy.jpg"],
    },
  ],
}

export function OrderConfirmationContent() {
  const router = useRouter()

  const subtotal = mockOrderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 200 ? 0 : 15
  const total = subtotal + shipping

  return (
    <div className="py-16 px-4 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Success Message */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Order Confirmed</h1>
          <p className="text-muted-foreground text-lg mb-2">Thank you for your purchase!</p>
          <p className="text-muted-foreground">
            Order Number: <span className="font-semibold text-foreground">{mockOrderData.orderNumber}</span>
          </p>
        </div>

        {/* Important Note */}
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 mb-2">Please Review Your Order</p>
                <p className="text-sm text-amber-800">
                  Please carefully review all order information below. If you notice any mistakes, click "Go Back to
                  Checkout" to make corrections. Once you confirm payment, your order will be finalized.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 mb-8">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">First Name</p>
                  <p className="font-medium">{mockOrderData.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Name</p>
                  <p className="font-medium">{mockOrderData.lastName}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{mockOrderData.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{mockOrderData.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Street Address</p>
                <p className="font-medium">{mockOrderData.address}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium">{mockOrderData.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-medium">{mockOrderData.state}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ZIP Code</p>
                  <p className="font-medium">{mockOrderData.zip}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p className="font-medium">{mockOrderData.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">{mockOrderData.paymentMethod}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>{mockOrderData.items.length} items</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {mockOrderData.items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-secondary flex-shrink-0">
                      <Image src={item.images[0] || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.selectedSize} / {item.selectedColor}
                      </p>
                      <p className="text-sm">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" size="lg" onClick={() => router.push("/checkout")} className="bg-transparent">
            Go Back to Checkout
          </Button>
          <Button size="lg" onClick={() => router.push("/orders")}>
            Confirm Payment
          </Button>
        </div>
      </div>
    </div>
  )
}
