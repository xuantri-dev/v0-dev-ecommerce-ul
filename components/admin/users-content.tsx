"use client"

import { mockUsers } from "@/lib/admin-data"
import { Eye, Trash2, Plus, X, ChevronLeft, ChevronRight, RefreshCw, ArrowUpDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const ITEMS_PER_PAGE = 4

export function UsersContent() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortByRole, setSortByRole] = useState(false)

  const totalUsers = users.length
  const totalAdmins = users.filter(u => u.role === "Admin").length
  const totalCustomers = users.filter(u => u.role === "Customer").length
  const verifiedUsers = users.filter(u => u.role === "Customer" && u.emailVerified).length

  const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
  
  const sortedUsers = sortByRole
    ? filteredUsers.sort((a, b) => a.role.localeCompare(b.role))
    : filteredUsers

  const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const handleRefresh = () => {
    setCurrentPage(1)
    setSortByRole(false)
    setSearchTerm("")
  }

  const getRoleStyles = (role: string) => {
    if (role === "Admin") {
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
    }
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2">Users</h1>
          <p className="text-muted-foreground">Manage customer accounts</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground mb-1">Total Users</p>
          <p className="font-serif text-3xl font-bold">{totalUsers}</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground mb-1">Administrators</p>
          <p className="font-serif text-3xl font-bold">{totalAdmins}</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground mb-1">Customers</p>
          <p className="font-serif text-3xl font-bold">{totalCustomers}</p>
        </div>
        <div className="bg-card border border-border p-4 rounded">
          <p className="text-sm text-muted-foreground mb-1">Verified Users</p>
          <p className="font-serif text-3xl font-bold">{verifiedUsers}</p>
        </div>
      </div>

      <div className="mb-6 flex gap-4 items-end">
        <div className="flex-1">
          <Input
            placeholder="Search users by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="max-w-sm"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortByRole ? "default" : "outline"}
            size="sm"
            onClick={() => setSortByRole(!sortByRole)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ArrowUpDown className="h-4 w-4" />
            Sort by Role
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-semibold">User Info</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Join Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Orders</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-3 text-sm">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getRoleStyles(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">{user.joinDate}</td>
                  <td className="px-6 py-3 text-sm">{user.orders}</td>
                  <td className="px-6 py-3 text-sm">
                    <div className="space-y-1">
                      <span
                        className={`px-3 py-1 rounded text-xs font-semibold block w-fit ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                        }`}
                      >
                        {user.status}
                      </span>
                      <span className={`px-3 py-1 rounded text-xs font-semibold block w-fit ${
                        user.emailVerified
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      }`}>
                        {user.emailVerified ? "Verified" : "Unverified"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-muted rounded transition-colors cursor-pointer"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-muted rounded transition-colors text-destructive cursor-pointer"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, sortedUsers.length)} of{" "}
          {sortedUsers.length} users
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="cursor-pointer min-w-10"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1 hover:bg-muted rounded transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                  <p className="font-semibold">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Role</p>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold inline-block ${getRoleStyles(selectedUser.role)}`}
                  >
                    {selectedUser.role}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-semibold">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="font-semibold">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Registration Date</p>
                  <p className="font-semibold">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Account Status</p>
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      selectedUser.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                    }`}
                  >
                    {selectedUser.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email Verification</p>
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      selectedUser.emailVerified
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                    }`}
                  >
                    {selectedUser.emailVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                  <p className="font-semibold">{selectedUser.orders}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Saved Addresses</h3>
                <div className="space-y-2 bg-muted/30 p-4 rounded">
                  <p className="text-sm">
                    <span className="font-medium">Primary:</span> 123 Fashion Street, New York, NY 10001
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Shipping:</span> 456 Style Avenue, Los Angeles, CA 90001
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Purchased Orders</h3>
                <div className="space-y-2 bg-muted/30 p-4 rounded max-h-48 overflow-y-auto">
                  <p className="text-sm">ORD-001 - $1,850 - Delivered</p>
                  <p className="text-sm">ORD-002 - $520 - Shipped</p>
                  <p className="text-sm">ORD-003 - $2,100 - Processing</p>
                </div>
              </div>
            </div>

            <Button onClick={() => setSelectedUser(null)} className="w-full mt-6 cursor-pointer">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
