import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrdersContent } from "@/components/orders-content"

export const metadata: Metadata = {
  title: "Orders | ATELIER",
  description: "Manage your orders and track shipments",
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <OrdersContent />
      </main>
      <Footer />
    </div>
  )
}
