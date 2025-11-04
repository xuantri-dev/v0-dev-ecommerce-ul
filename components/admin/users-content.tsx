"use client"

import { mockUsers } from "@/lib/admin-data"
import { Eye, Trash2, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function UsersContent() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)

  const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id))
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

      <div className="mb-6">
        <Input
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="bg-card border border-border rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Join Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Orders</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-3 text-sm font-medium">{user.name}</td>
                  <td className="px-6 py-3 text-sm">{user.email}</td>
                  <td className="px-6 py-3 text-sm">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">{user.joinDate}</td>
                  <td className="px-6 py-3 text-sm">{user.orders}</td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status}
                    </span>
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
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                    {selectedUser.role}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-semibold">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Registration Date</p>
                  <p className="font-semibold">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Account Status</p>
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      selectedUser.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedUser.status}
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
