import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderManagementContent } from "@/components/order-management-content"

export default function OrderManagementPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <OrderManagementContent />
      </main>
      <Footer />
    </div>
  )
}
