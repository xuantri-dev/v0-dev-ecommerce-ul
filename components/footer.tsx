import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand & Store Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl tracking-tight">ATELIER</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Curated collection of premium menswear and accessories for the modern gentleman.
            </p>
            <div className="space-y-3 mt-6 pt-6 border-t border-border">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  123 Fashion Avenue
                  <br />
                  New York, NY 10001
                  <br />
                  USA
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+12125551234"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  +1 (212) 555-1234
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@atelier.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  info@atelier.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p>Mon - Fri: 10:00 AM - 8:00 PM</p>
                  <p>Sat - Sun: 11:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium tracking-wide">SHOP</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=clothing"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=accessories"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium tracking-wide">COMPANY</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Store Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium tracking-wide">SUPPORT</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shipping"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/care" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Care Guide
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium tracking-wide">ACCEPTED PAYMENTS</h4>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 bg-muted rounded text-xs font-semibold">
                VISA
              </span>
              <span className="inline-flex items-center justify-center w-10 h-10 bg-muted rounded text-xs font-semibold">
                PP
              </span>
              <span className="inline-flex items-center justify-center w-10 h-10 bg-muted rounded text-xs font-semibold">
                MOMO
              </span>
              <span className="inline-flex items-center justify-center w-10 h-10 bg-muted rounded text-xs font-semibold">
                ZALO
              </span>
            </div>

            <h4 className="text-sm font-medium tracking-wide mt-6">FOLLOW US</h4>
            <div className="flex gap-4">
              <a href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 ATELIER. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
