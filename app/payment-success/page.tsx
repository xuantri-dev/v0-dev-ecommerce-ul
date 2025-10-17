import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PaymentSuccessContent } from "@/components/payment-success-content"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PaymentSuccessContent />
      </main>
      <Footer />
    </div>
  )
}
