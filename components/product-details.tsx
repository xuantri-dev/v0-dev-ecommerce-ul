"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/products"
import { Check, Minus, Plus, Star } from "lucide-react"
import Link from "next/link"
import { products } from "@/lib/products"

interface ProductDetailsProps {
  product: Product
}

const mockReviews = [
  {
    id: 1,
    author: "Michael Johnson",
    rating: 5,
    date: "2025-01-10",
    title: "Exceptional Quality",
    comment:
      "The craftsmanship is outstanding. This piece is worth every penny. Highly recommend to anyone looking for premium menswear.",
  },
  {
    id: 2,
    author: "David Chen",
    rating: 5,
    date: "2025-01-08",
    title: "Perfect Fit",
    comment:
      "Ordered in my usual size and it fits perfectly. The material feels luxurious and the attention to detail is impressive.",
  },
  {
    id: 3,
    author: "James Wilson",
    rating: 4,
    date: "2025-01-05",
    title: "Great Product",
    comment: "Very satisfied with my purchase. The only minor issue was the shipping took a bit longer than expected.",
  },
]

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!selectedSize) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: quantity,
      image: product.images[0],
    })

    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} (${selectedSize}) has been added to your cart.`,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => Math.min(prev + 1, 99))
    } else {
      toast({
        title: "Stock limit reached",
        description: `Only ${product.stock} items available in stock.`,
        variant: "destructive",
      })
    }
  }
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1))

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const averageRating = (mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length).toFixed(1)

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-secondary">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-[3/4] bg-secondary cursor-pointer ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase mb-2">{product.category}</p>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">{product.name}</h1>
            <p className="text-2xl">${product.price.toLocaleString()}</p>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Color Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium tracking-wide">COLOR: {selectedColor}</label>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border transition-colors cursor-pointer ${
                    selectedColor === color
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium tracking-wide">SIZE: {selectedSize || "SELECT SIZE"}</label>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border transition-colors cursor-pointer ${
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {selectedSize && selectedColor && (
            <div className="text-sm font-medium text-muted-foreground">
              Quantity: <span className="text-foreground font-semibold">{product.stock}</span>
            </div>
          )}
          {!selectedSize && (
            <div className="text-sm font-medium text-muted-foreground">
              Quantity: <span className="text-foreground"></span>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium tracking-wide">QUANTITY</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-12 w-12 rounded-none hover:bg-muted cursor-pointer"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-16 h-12 flex items-center justify-center border-x border-border">
                  <span className="text-base font-medium">{quantity}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="h-12 w-12 rounded-none hover:bg-muted cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            size="lg"
            className="w-full text-base h-14 cursor-pointer"
            onClick={handleAddToCart}
            disabled={!selectedSize || added}
          >
            {added ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                Added to Cart
              </>
            ) : (
              "Add to Cart"
            )}
          </Button>

          {/* Product Details */}
          <div className="pt-8 border-t border-border space-y-4">
            <h3 className="text-sm font-medium tracking-wide">DETAILS</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Premium materials sourced from renowned mills</li>
              <li>• Expert craftsmanship and attention to detail</li>
              <li>• Made in Italy</li>
              <li>• Free shipping on orders over $500</li>
              <li>• 30-day returns and exchanges</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-24 pt-16 border-t border-border">
        <div className="max-w-4xl">
          <div className="mb-12">
            <h2 className="font-serif text-3xl mb-4">Customer Reviews</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(Number.parseFloat(averageRating))
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium">{averageRating} out of 5</span>
              <span className="text-sm text-muted-foreground">({mockReviews.length} reviews)</span>
            </div>
          </div>

          <div className="space-y-8">
            {mockReviews.map((review) => (
              <div key={review.id} className="pb-8 border-b border-border last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-lg">{review.title}</h3>
                    <p className="text-sm text-muted-foreground">{review.author}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-16 border-t border-border">
          <h2 className="font-serif text-3xl mb-12">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`} className="group">
                <div className="relative aspect-[3/4] bg-secondary mb-4 overflow-hidden">
                  <Image
                    src={relatedProduct.images[0] || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-sm tracking-wide mb-2 group-hover:text-muted-foreground transition-colors">
                  {relatedProduct.name}
                </h3>
                <p className="text-lg font-medium">${relatedProduct.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
