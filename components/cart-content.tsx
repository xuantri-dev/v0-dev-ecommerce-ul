"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { Minus, Plus, X } from "lucide-react"

export function CartContent() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-24">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h1 className="font-serif text-4xl md:text-5xl">Your cart is empty</h1>
          <p className="text-lg text-muted-foreground">Discover our curated collection of premium menswear</p>
          <Button asChild size="lg">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <h1 className="font-serif text-4xl md:text-5xl mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-6 pb-6 border-b border-border">
              <div className="relative w-32 h-40 flex-shrink-0 bg-secondary">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-serif text-xl mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="p-2 border border-border hover:border-primary transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="p-2 border border-border hover:border-primary transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-lg">${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-border p-8 space-y-6 sticky top-24">
            <h2 className="font-serif text-2xl">Order Summary</h2>

            <div className="space-y-3 py-6 border-y border-border">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{totalPrice >= 500 ? "Free" : "$25"}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-medium">
              <span>Total</span>
              <span>${(totalPrice + (totalPrice >= 500 ? 0 : 25)).toLocaleString()}</span>
            </div>

            <Button size="lg" className="w-full text-base h-14">
              Proceed to Checkout
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
