"use client"

import { getBlogPostById, blogPosts } from "@/lib/blog"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar, User, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"

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
        {/* Hero Section */}
        <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 lg:px-8 py-16">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-12">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground text-xs font-semibold tracking-widest rounded-full mb-6">
                  {post.category.toUpperCase()}
                </span>
              </div>

              <h1 className="font-serif text-5xl md:text-6xl mb-8 text-balance leading-tight">{post.title}</h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground border-t border-b border-border py-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{post.author}</p>
                    <p className="text-xs">Author</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
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
            <div className="prose prose-lg max-w-none mb-16">
              <p className="text-xl text-muted-foreground leading-relaxed mb-12 font-light">{post.excerpt}</p>
              <div className="space-y-8 text-base leading-relaxed">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-foreground/90">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Share Section */}
            <div className="border-t border-border pt-8 mb-16">
              <p className="text-sm font-semibold mb-4">Share this article</p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
                  Share on Twitter
                </Button>
                <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
                  Share on Facebook
                </Button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="max-w-6xl mx-auto pt-16 border-t border-border">
              <h2 className="font-serif text-4xl mb-12">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group">
                    <div className="relative aspect-video mb-6 rounded-lg overflow-hidden bg-secondary">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="inline-block text-xs font-semibold text-muted-foreground mb-3 tracking-widest">
                      {relatedPost.category.toUpperCase()}
                    </span>
                    <h3 className="font-serif text-xl mb-3 group-hover:text-muted-foreground transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{relatedPost.excerpt}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all cursor-pointer">
                      Read More <ArrowRight className="h-4 w-4" />
                    </div>
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
