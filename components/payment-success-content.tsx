"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export function PaymentSuccessContent() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-24">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <CheckCircle className="h-20 w-20 text-green-600" />
        </div>

        <div className="space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl">Payment Successful</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button asChild size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/orders">View My Orders</Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground pt-8">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  )
}
