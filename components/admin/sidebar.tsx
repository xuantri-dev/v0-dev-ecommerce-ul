"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Layers, Users, ShoppingCart } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <aside className="w-64 bg-secondary border-r border-border min-h-screen p-6">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold">ATELIER Admin</h1>
        <p className="text-sm text-muted-foreground mt-1">Management Panel</p>
      </div>

      <nav className="space-y-2">
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
            isActive("/admin") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
          }`}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/admin/products"
          className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
            isActive("/admin/products") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
          }`}
        >
          <Package className="h-5 w-5" />
          <span>Products</span>
        </Link>

        <Link
          href="/admin/categories"
          className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
            isActive("/admin/categories") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
          }`}
        >
          <Layers className="h-5 w-5" />
          <span>Categories</span>
        </Link>

        <Link
          href="/admin/users"
          className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
            isActive("/admin/users") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
          }`}
        >
          <Users className="h-5 w-5" />
          <span>Users</span>
        </Link>

        <Link
          href="/admin/orders"
          className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
            isActive("/admin/orders") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Orders</span>
        </Link>
      </nav>

      <div className="mt-12 pt-6 border-t border-border">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Back to Store
        </Link>
      </div>
    </aside>
  )
}
