"use client"

import { useState } from "react"
import type { MouseEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Heart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()
  const inWishlist = isInWishlist(product.id)

  const handleQuickAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    // Add with first available size
    const defaultSize = product.sizes[0]
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: defaultSize,
      quantity: 1,
      image: product.images[0],
    })

    toast({
      title: "Added to cart",
      description: `${product.name} (${defaultSize}) has been added to your cart.`,
    })
  }

  const handleWishlist = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (inWishlist) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-secondary">
        {/* First Image */}
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"}`}
        />
        {/* Second Image - shows on hover */}
        {product.images[1] && (
          <Image
            src={product.images[1] || "/placeholder.svg"}
            alt={`${product.name} alternate view`}
            fill
            className={`object-cover transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
          />
        )}

        {/* Action Buttons - appear on hover */}
        <div
          className={`absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            onClick={handleQuickAdd}
            className="flex-1 h-12 bg-background text-foreground hover:bg-background/90 border border-border"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button
            onClick={handleWishlist}
            size="icon"
            className={`h-12 w-12 border border-border ${
              inWishlist
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-background text-foreground hover:bg-background/90"
            }`}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">{product.category}</p>
        <h3 className="font-serif text-xl group-hover:text-muted-foreground transition-colors">{product.name}</h3>
        <p className="text-lg">${product.price.toLocaleString()}</p>
      </div>
    </Link>
  )
}
