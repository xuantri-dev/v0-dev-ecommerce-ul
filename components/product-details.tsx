"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/products"
import { Check } from "lucide-react"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      image: product.images[0],
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

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
                  className={`relative aspect-[3/4] bg-secondary ${
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
                  className={`px-4 py-2 border transition-colors ${
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
                  className={`py-3 border transition-colors ${
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

          {/* Add to Cart */}
          <Button
            size="lg"
            className="w-full text-base h-14"
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
    </div>
  )
}
