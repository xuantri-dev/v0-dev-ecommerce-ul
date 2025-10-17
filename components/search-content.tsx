"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS_PER_PAGE = 8

export function SearchContent({ query }: { query: string }) {
  const [currentPage, setCurrentPage] = useState(1)

  const searchResults = useMemo(() => {
    if (!query.trim()) return []
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    )
  }, [query])

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedResults = searchResults.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <section className="py-24 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-4 text-balance">Search Results</h1>
          <p className="text-lg text-muted-foreground">
            {searchResults.length === 0
              ? `No products found for "${query}"`
              : `Found ${searchResults.length} product${searchResults.length !== 1 ? "s" : ""} matching "${query}"`}
          </p>
        </div>

        {searchResults.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {paginatedResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-6">
              Try adjusting your search terms or browse our collections
            </p>
            <Button asChild>
              <Link href="/shop">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
