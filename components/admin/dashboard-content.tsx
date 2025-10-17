import { dashboardStats, mockOrders } from "@/lib/admin-data"
import { TrendingUp, ShoppingBag, Users, DollarSign } from "lucide-react"

export function DashboardContent() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card p-6 border border-border rounded">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <p className="font-serif text-3xl font-bold">{dashboardStats.totalRevenue}</p>
            </div>
            <DollarSign className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>

        <div className="bg-card p-6 border border-border rounded">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
              <p className="font-serif text-3xl font-bold">{dashboardStats.totalOrders}</p>
            </div>
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>

        <div className="bg-card p-6 border border-border rounded">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Customers</p>
              <p className="font-serif text-3xl font-bold">{dashboardStats.totalCustomers}</p>
            </div>
            <Users className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>

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

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded">
        <div className="p-6 border-b border-border">
          <h2 className="font-serif text-2xl font-bold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-3 text-sm font-mono">{order.id}</td>
                  <td className="px-6 py-3 text-sm">{order.customer}</td>
                  <td className="px-6 py-3 text-sm">{order.date}</td>
                  <td className="px-6 py-3 text-sm font-semibold">{order.total}</td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
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
    </div>
  )
}
