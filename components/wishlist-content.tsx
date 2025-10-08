"use client"

import { useWishlist } from "@/components/wishlist-provider"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const ITEMS_PER_PAGE = 8

export function WishlistContent() {
  const { wishlist } = useWishlist()
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(wishlist.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentItems = wishlist.slice(startIndex, endIndex)

  if (wishlist.length === 0) {
    return (
      <section className="py-24 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Your Wishlist</h1>
          <p className="text-lg text-muted-foreground mb-8">You haven't added any items to your wishlist yet.</p>
          <Button asChild size="lg">
            <a href="/shop">Start Shopping</a>
          </Button>
        </div>
      </section>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <section className="py-16 px-4 lg:px-8 border-b border-border">
        <div className="container mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl mb-4 text-balance">Your Wishlist</h1>
          <p className="text-lg text-muted-foreground">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
          </p>
        </div>
      </section>

      {/* Wishlist Grid */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex gap-2">
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
