"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/lib/blog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react"

const POSTS_PER_PAGE = 6

export function BlogContent() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = blogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section className="py-24 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl mb-4 text-balance">ATELIER Journal</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Style insights, care guides, and stories from the world of luxury menswear
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col h-full border border-border hover:border-foreground/50 transition-colors"
            >
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex-1 p-6 flex flex-col">
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <span className="uppercase tracking-wide text-xs">{post.category}</span>
                </div>

                <h3 className="font-serif text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground mb-4 flex-1 line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </div>
                </div>

                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href={`/blog/${post.id}`}>Read More</Link>
                </Button>
              </div>
            </article>
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
      </div>
    </section>
  )
}
