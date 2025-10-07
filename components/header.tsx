"use client"

import Link from "next/link"
import { ShoppingBag, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useState } from "react"

export function Header() {
  const { totalItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="font-serif text-2xl tracking-tight">
            ATELIER
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/shop" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
              SHOP
            </Link>
            <Link href="/collections" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
              COLLECTIONS
            </Link>
            <Link href="/about" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
              ABOUT
            </Link>
          </nav>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/shop"
                className="text-sm tracking-wide hover:text-muted-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link
                href="/collections"
                className="text-sm tracking-wide hover:text-muted-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                COLLECTIONS
              </Link>
              <Link
                href="/about"
                className="text-sm tracking-wide hover:text-muted-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ABOUT
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
