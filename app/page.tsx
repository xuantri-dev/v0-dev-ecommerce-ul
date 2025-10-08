import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getFeaturedProducts } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center justify-center bg-secondary">
          <Image src="/placeholder.svg?height=1200&width=1920" alt="Hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-foreground/20" />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-balance mb-6 text-background">
              Timeless elegance meets modern refinement
            </h1>
            <p className="text-lg md:text-xl text-background/90 mb-8 text-pretty max-w-2xl mx-auto">
              Discover our curated collection of premium menswear and accessories, crafted for the discerning gentleman.
            </p>
            <Button asChild size="lg" className="text-base">
              <Link href="/shop">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">Featured Collection</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Handpicked pieces that embody sophistication and quality craftsmanship
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-16">
              <Button asChild variant="outline" size="lg">
                <Link href="/shop">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 px-4 lg:px-8 bg-secondary">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-square">
                <Image src="/placeholder.svg?height=800&width=800" alt="Craftsmanship" fill className="object-cover" />
              </div>
              <div className="space-y-6">
                <h2 className="font-serif text-4xl md:text-5xl text-balance">Crafted for the modern gentleman</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At ATELIER, we believe in the power of exceptional quality and timeless design. Each piece in our
                  collection is carefully selected from the world's finest craftsmen and ateliers.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From Italian cashmere to Scottish knitwear, we source only the finest materials and work with artisans
                  who share our commitment to excellence.
                </p>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">Join our community</h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Subscribe to receive exclusive access to new arrivals, private sales, and style inspiration.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="submit" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
