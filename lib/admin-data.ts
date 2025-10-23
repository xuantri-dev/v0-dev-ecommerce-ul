export const mockProducts = [
  {
    id: 1,
    name: "Cashmere Overcoat",
    category: "Outerwear",
    price: 1200,
    stock: 15,
    status: "In Stock",
    description: "Premium cashmere overcoat",
    images: ["/cashmere-overcoat-1.jpg", "/cashmere-overcoat-2.jpg"],
  },
  {
    id: 2,
    name: "Merino Wool Sweater",
    category: "Knitwear",
    price: 350,
    stock: 8,
    status: "Low Stock",
    description: "Fine merino wool sweater",
    images: ["/merino-sweater-1.jpg", "/merino-sweater-2.jpg"],
  },
  {
    id: 3,
    name: "Tailored Trousers",
    category: "Trousers",
    price: 280,
    stock: 22,
    status: "In Stock",
    description: "Perfectly tailored trousers",
    images: ["/tailored-trousers-1.jpg", "/tailored-trousers-2.jpg"],
  },
  {
    id: 4,
    name: "Oxford Shirt",
    category: "Shirts",
    price: 180,
    stock: 0,
    status: "Out of Stock",
    description: "Classic oxford shirt",
    images: ["/oxford-shirt-1.jpg", "/oxford-shirt-2.jpg"],
  },
  {
    id: 5,
    name: "Leather Loafers",
    category: "Footwear",
    price: 420,
    stock: 12,
    status: "In Stock",
    description: "Premium leather loafers",
    images: ["/leather-loafers-1.jpg", "/leather-loafers-2.jpg"],
  },
]

export const mockCategories = [
  { id: 1, name: "Outerwear", productCount: 12, status: "Active" },
  { id: 2, name: "Knitwear", productCount: 8, status: "Active" },
  { id: 3, name: "Trousers", productCount: 15, status: "Active" },
  { id: 4, name: "Shirts", productCount: 20, status: "Active" },
  { id: 5, name: "Footwear", productCount: 10, status: "Active" },
]

export const mockUsers = [
  { id: 1, name: "James Morrison", email: "james@example.com", joinDate: "2024-01-15", orders: 5, status: "Active" },
  {
    id: 2,
    name: "Alexander Chen",
    email: "alexander@example.com",
    joinDate: "2024-02-20",
    orders: 3,
    status: "Active",
  },
  { id: 3, name: "Thomas Blackwell", email: "thomas@example.com", joinDate: "2024-03-10", orders: 8, status: "Active" },
  {
    id: 4,
    name: "Michael Sterling",
    email: "michael@example.com",
    joinDate: "2024-01-05",
    orders: 2,
    status: "Inactive",
  },
  { id: 5, name: "David Harrison", email: "david@example.com", joinDate: "2024-04-01", orders: 6, status: "Active" },
]

export const mockOrders = [
  { id: "ORD-001", customer: "James Morrison", date: "2024-04-15", total: 1850, status: "Delivered" },
  { id: "ORD-002", customer: "Alexander Chen", date: "2024-04-14", total: 520, status: "Shipped" },
  { id: "ORD-003", customer: "Thomas Blackwell", date: "2024-04-13", total: 2100, status: "Processing" },
  { id: "ORD-004", customer: "Michael Sterling", date: "2024-04-12", total: 680, status: "Delivered" },
  { id: "ORD-005", customer: "David Harrison", date: "2024-04-11", total: 1200, status: "Pending" },
]

export const dashboardStats = {
  totalRevenue: "$45,230",
  totalOrders: 1240,
  totalCustomers: 856,
  averageOrderValue: "$36.50",
}
