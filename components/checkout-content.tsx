"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Truck, User } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

const mockCheckoutData = {
  firstName: "Alexander",
  lastName: "Sterling",
  email: "alexander.sterling@example.com",
  phone: "+1 (555) 123-4567",
  address: "142 Madison Avenue",
  city: "New York",
  state: "NY",
  zip: "10016",
  country: "United States",
}

export function CheckoutContent() {
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cod")

  const [formData, setFormData] = useState(mockCheckoutData)

  const mockCartItems = [
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
  ]

  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 200 ? 0 : 15
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Order placed successfully!",
      description: "You will receive a confirmation email shortly.",
    })

    setIsProcessing(false)
    router.push("/payment-success")
  }

  return (
    <div className="py-16 px-4 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Checkout</h1>
          <p className="text-muted-foreground text-lg">Complete your purchase</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>How should we contact you about your order?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
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
                  <CardDescription>Where should we deliver your order?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State / Province</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP / Postal Code</Label>
                      <Input
                        id="zip"
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                  <CardDescription>Choose your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex-1 cursor-pointer">
                          <div className="font-medium">Cash on Delivery (COD)</div>
                          <div className="text-sm text-muted-foreground">Pay when you receive your order</div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                        <RadioGroupItem value="momo" id="momo" />
                        <Label htmlFor="momo" className="flex-1 cursor-pointer">
                          <div className="font-medium">MoMo</div>
                          <div className="text-sm text-muted-foreground">Mobile payment via MoMo wallet</div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                        <RadioGroupItem value="zalopay" id="zalopay" />
                        <Label htmlFor="zalopay" className="flex-1 cursor-pointer">
                          <div className="font-medium">ZaloPay</div>
                          <div className="text-sm text-muted-foreground">Payment via ZaloPay app</div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                        <RadioGroupItem value="visa" id="visa" />
                        <Label htmlFor="visa" className="flex-1 cursor-pointer">
                          <div className="font-medium">Visa / Credit Card</div>
                          <div className="text-sm text-muted-foreground">Secure credit card payment</div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>{mockCartItems.length} items</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    {mockCartItems.map((item) => (
                      <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                        <div className="relative w-20 h-20 bg-secondary flex-shrink-0">
                          <Image
                            src={item.images[0] || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
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

                  <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By placing your order, you agree to our terms and conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
