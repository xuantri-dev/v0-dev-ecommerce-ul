import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderConfirmationContent } from "@/components/order-confirmation-content"

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <OrderConfirmationContent />
      </main>
      <Footer />
    </div>
  )
}
