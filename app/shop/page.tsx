import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products"

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-16 px-4 lg:px-8 border-b border-border">
          <div className="container mx-auto">
            <h1 className="font-serif text-5xl md:text-6xl mb-4 text-balance">All Products</h1>
            <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
              Explore our complete collection of premium menswear and accessories
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group">
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-secondary">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs tracking-widest text-muted-foreground uppercase">{product.category}</p>
                    <h3 className="font-serif text-xl group-hover:text-muted-foreground transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-lg">${product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
