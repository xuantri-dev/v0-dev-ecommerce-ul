import { dashboardStats, mockOrders, bestSellingProducts } from "@/lib/admin-data"
import { TrendingUp, ShoppingBag, Users, DollarSign, AlertCircle, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DashboardContent() {
  const formatChange = (value: number) => {
    return value > 0 ? `+${value.toFixed(1)}%` : `${value.toFixed(1)}%`
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your admin panel</p>
      </div>

      <div className="mb-8 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-6 flex items-start gap-4">
        <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">Pending Orders</h3>
          <p className="text-sm text-amber-800 dark:text-amber-200 mb-4">
            You currently have {dashboardStats.pendingOrders} pending orders that need attention.
          </p>
          <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 text-white cursor-pointer">
            <Link href="/admin/orders">View Orders</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-card p-6 border border-border rounded">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <p className="font-serif text-3xl font-bold">{dashboardStats.totalRevenue}</p>
            </div>
            <DollarSign className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            {dashboardStats.revenueChange >= 0 ? (
              <ArrowUp className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-600" />
            )}
            <span className={dashboardStats.revenueChange >= 0 ? "text-green-600" : "text-red-600"}>
              {formatChange(dashboardStats.revenueChange)}
            </span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-card p-6 border border-border rounded">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
              <p className="font-serif text-3xl font-bold">{dashboardStats.totalOrders}</p>
            </div>
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            {dashboardStats.ordersChange >= 0 ? (
              <ArrowUp className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-600" />
            )}
            <span className={dashboardStats.ordersChange >= 0 ? "text-green-600" : "text-red-600"}>
              {formatChange(dashboardStats.ordersChange)}
            </span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-card p-6 border border-border rounded">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Customers</p>
              <p className="font-serif text-3xl font-bold">{dashboardStats.totalCustomers}</p>
            </div>
            <Users className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            {dashboardStats.customersChange >= 0 ? (
              <ArrowUp className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-600" />
            )}
            <span className={dashboardStats.customersChange >= 0 ? "text-green-600" : "text-red-600"}>
              {formatChange(dashboardStats.customersChange)}
            </span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </div>

        {/* Avg Order Value */}
        <div className="bg-card p-6 border border-border rounded">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Order Value</p>
              <p className="font-serif text-3xl font-bold">{dashboardStats.averageOrderValue}</p>
            </div>
            <TrendingUp className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Recent Orders and Best-Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded">
          <div className="p-6 border-b border-border">
            <h2 className="font-serif text-xl font-bold">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold">Order ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold">Total</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-3 font-mono text-xs">{order.id}</td>
                    <td className="px-4 py-3 text-xs">{order.customer}</td>
                    <td className="px-4 py-3 font-semibold text-xs">{order.total}</td>
                    <td className="px-4 py-3 text-xs">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold inline-block ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                              : order.status === "Processing"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card border border-border rounded">
          <div className="p-6 border-b border-border">
            <h2 className="font-serif text-xl font-bold">Best-Selling Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold">Product</th>
                  <th className="px-4 py-3 text-left font-semibold">Sales</th>
                  <th className="px-4 py-3 text-left font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {bestSellingProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-3 text-xs">{product.name}</td>
                    <td className="px-4 py-3 font-semibold text-xs">{product.sales}</td>
                    <td className="px-4 py-3 font-semibold text-xs">${product.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
