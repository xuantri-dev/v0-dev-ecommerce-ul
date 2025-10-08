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

        {/* Categories Showcase */}
        <section className="py-24 px-4 lg:px-8 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">Shop by Category</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Explore our carefully curated collections
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Outerwear", image: "/luxury-coat.jpg", href: "/shop?category=outerwear" },
                { name: "Knitwear", image: "/soft-cashmere-sweater.png", href: "/shop?category=knitwear" },
                { name: "Tailoring", image: "/tailored-suit.jpg", href: "/shop?category=trousers" },
                { name: "Accessories", image: "/leather-accessories.jpg", href: "/shop?category=accessories" },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative aspect-[3/4] overflow-hidden bg-secondary"
                >
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-2xl text-background mb-2">{category.name}</h3>
                    <span className="text-background/90 text-sm flex items-center gap-2">
                      Explore <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
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

        {/* Seasonal Collection */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <Image src="/winter-fashion-collection.png" alt="Winter Collection" fill className="object-cover" />
          <div className="absolute inset-0 bg-foreground/30" />
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            <p className="text-background/90 text-sm tracking-widest uppercase mb-4">Winter 2025</p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-balance mb-6 text-background">
              The Art of Layering
            </h2>
            <p className="text-lg md:text-xl text-background/90 mb-8 text-pretty max-w-xl mx-auto">
              Discover our winter essentials, from heavyweight cashmere to refined outerwear
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link href="/shop">Shop Winter Collection</Link>
            </Button>
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

        {/* Brand Values */}
        <section className="py-24 px-4 lg:px-8 border-y border-border">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-border">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl mb-3">Quality Guaranteed</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every piece is crafted from premium materials and built to last a lifetime
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-border">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl mb-3">Secure Payment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Shop with confidence using our secure and encrypted payment system
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-border">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl mb-3">Complimentary Shipping</h3>
                <p className="text-muted-foreground leading-relaxed">Free worldwide shipping on all orders over $200</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-4 lg:px-8 bg-secondary">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">What Our Clients Say</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Trusted by discerning gentlemen worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "The quality is exceptional. Every piece I've purchased has exceeded my expectations. ATELIER has become my go-to for timeless menswear.",
                  author: "James Morrison",
                  title: "Creative Director",
                },
                {
                  quote:
                    "Impeccable craftsmanship and attention to detail. The cashmere overcoat I purchased is the finest piece in my wardrobe.",
                  author: "Alexander Chen",
                  title: "Entrepreneur",
                },
                {
                  quote:
                    "ATELIER understands the modern gentleman. Their curation is sophisticated, and the service is outstanding.",
                  author: "Thomas Blackwell",
                  title: "Architect",
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-background p-8 space-y-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lifestyle Editorial */}
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">The ATELIER Lifestyle</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Style inspiration and stories from our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary group">
                <Image
                  src="/luxury-menswear-lifestyle.jpg"
                  alt="Editorial 1"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-background/80 text-sm uppercase tracking-wider mb-2">Style Guide</p>
                  <h3 className="font-serif text-3xl text-background mb-3 text-balance">The Art of Dressing Well</h3>
                  <Link href="#" className="text-background text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary group">
                  <Image
                    src="/luxury-watch-accessories.jpg"
                    alt="Editorial 2"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-background/80 text-sm uppercase tracking-wider mb-2">Accessories</p>
                    <h3 className="font-serif text-2xl text-background mb-2 text-balance">Essential Details</h3>
                    <Link
                      href="#"
                      className="text-background text-sm flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Read More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden bg-secondary group">
                  <Image
                    src="/luxury-knitwear-cashmere.jpg"
                    alt="Editorial 3"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-background/80 text-sm uppercase tracking-wider mb-2">Craftsmanship</p>
                    <h3 className="font-serif text-2xl text-background mb-2 text-balance">The Cashmere Story</h3>
                    <Link
                      href="#"
                      className="text-background text-sm flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Read More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
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
