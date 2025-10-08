import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WishlistContent } from "@/components/wishlist-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wishlist | ATELIER",
  description: "Your favorite products",
}

export default function WishlistPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <WishlistContent />
      </main>
      <Footer />
    </div>
  )
}
