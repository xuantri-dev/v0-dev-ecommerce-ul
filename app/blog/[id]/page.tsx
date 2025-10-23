"use client"

import { getBlogPostById, blogPosts } from "@/lib/blog"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar, User } from "lucide-react"
import { notFound } from "next/navigation"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPostById(params.id)

  if (!post) {
    notFound()
  }

  // Get related posts from same category
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="container mx-auto px-4 lg:px-8 py-16">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Hero Image */}
          <div className="relative aspect-video mb-12 rounded-lg overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>

          {/* Article Header */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium tracking-wide rounded mb-4">
                {post.category}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl mb-6 text-balance">{post.title}</h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{post.excerpt}</p>
              <div className="space-y-6 text-base leading-relaxed">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="max-w-3xl mx-auto pt-12 border-t border-border">
              <h2 className="font-serif text-2xl mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group">
                    <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-secondary">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-serif text-lg mb-2 group-hover:text-muted-foreground transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{relatedPost.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  )
}
