"use client"

import { mockVouchers } from "@/lib/admin-data"
import { Edit2, Trash2, Plus, X, Copy, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const ITEMS_PER_PAGE = 4

export function VouchersContent() {
  const [vouchers, setVouchers] = useState(mockVouchers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingVoucher, setEditingVoucher] = useState<(typeof mockVouchers)[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discount: "",
    discountType: "percentage",
    minPurchase: "",
    maxUses: "",
    quantity: "",
    expiryDate: "",
    hasExpiration: true,
    status: "Active" as "Active" | "Inactive",
  })
  const { toast } = useToast()

  const filteredVouchers = vouchers.filter(
    (v) =>
      v.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const totalPages = Math.ceil(filteredVouchers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedVouchers = filteredVouchers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const validateForm = () => {
    if (!formData.code.trim()) {
      toast({ title: "Error", description: "Voucher code is required", variant: "destructive" })
      return false
    }
    if (!formData.description.trim()) {
      toast({ title: "Error", description: "Description is required", variant: "destructive" })
      return false
    }
    if (!formData.discount.trim()) {
      toast({ title: "Error", description: "Discount amount is required", variant: "destructive" })
      return false
    }
    if (!formData.maxUses.trim()) {
      toast({ title: "Error", description: "Max uses is required", variant: "destructive" })
      return false
    }
    if (!formData.quantity.trim()) {
      toast({ title: "Error", description: "Quantity is required", variant: "destructive" })
      return false
    }
    if (formData.hasExpiration && !formData.expiryDate.trim()) {
      toast({ title: "Error", description: "Expiry date is required", variant: "destructive" })
      return false
    }
    return true
  }

  const handleAddVoucher = () => {
    if (!validateForm()) return

    const newVoucher = {
      id: Math.max(...vouchers.map((v) => v.id)) + 1,
      code: formData.code.toUpperCase(),
      description: formData.description,
      discount: Number.parseInt(formData.discount),
      discountType: formData.discountType as "percentage" | "fixed",
      minPurchase: Number.parseInt(formData.minPurchase) || 0,
      maxUses: Number.parseInt(formData.maxUses),
      usedCount: 0,
      quantity: Number.parseInt(formData.quantity),
      expiryDate: formData.hasExpiration ? formData.expiryDate : "No Expiration",
      status: formData.status,
      hasExpiration: formData.hasExpiration,
    }

    setVouchers([...vouchers, newVoucher])
    setFormData({
      code: "",
      description: "",
      discount: "",
      discountType: "percentage",
      minPurchase: "",
      maxUses: "",
      quantity: "",
      expiryDate: "",
      hasExpiration: true,
      status: "Active",
    })
    setIsAddModalOpen(false)
    setCurrentPage(1)
    toast({ title: "Success", description: "Voucher created successfully" })
  }

  const handleEditVoucher = () => {
    if (!validateForm()) return

    const updatedVouchers = vouchers.map((v) =>
      v.id === editingVoucher?.id
        ? {
            ...v,
            code: formData.code.toUpperCase(),
            description: formData.description,
            discount: Number.parseInt(formData.discount),
            discountType: formData.discountType as "percentage" | "fixed",
            minPurchase: Number.parseInt(formData.minPurchase) || 0,
            maxUses: Number.parseInt(formData.maxUses),
            quantity: Number.parseInt(formData.quantity),
            expiryDate: formData.hasExpiration ? formData.expiryDate : "No Expiration",
            status: formData.quantity === "0" ? "Inactive" : formData.status,
            hasExpiration: formData.hasExpiration,
          }
        : v,
    )

    setVouchers(updatedVouchers)
    setFormData({
      code: "",
      description: "",
      discount: "",
      discountType: "percentage",
      minPurchase: "",
      maxUses: "",
      quantity: "",
      expiryDate: "",
      hasExpiration: true,
      status: "Active",
    })
    setIsEditModalOpen(false)
    setEditingVoucher(null)
    toast({ title: "Success", description: "Voucher updated successfully" })
  }

  const openEditModal = (voucher: (typeof mockVouchers)[0]) => {
    setEditingVoucher(voucher)
    setFormData({
      code: voucher.code,
      description: voucher.description,
      discount: voucher.discount.toString(),
      discountType: voucher.discountType,
      minPurchase: voucher.minPurchase.toString(),
      maxUses: voucher.maxUses.toString(),
      quantity: voucher.quantity.toString(),
      expiryDate: voucher.hasExpiration ? voucher.expiryDate : "",
      hasExpiration: voucher.hasExpiration,
      status: voucher.status,
    })
    setIsEditModalOpen(true)
  }

  const handleDeleteVoucher = (id: number) => {
    setVouchers(vouchers.filter((v) => v.id !== id))
    toast({ title: "Success", description: "Voucher deleted successfully" })
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({ title: "Copied", description: `Code "${code}" copied to clipboard` })
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2">Vouchers</h1>
          <p className="text-muted-foreground">Manage discount vouchers and promotional codes</p>
        </div>
        <Button className="flex items-center gap-2 cursor-pointer" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Voucher
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search vouchers by code or description..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="max-w-sm"
        />
      </div>

      <div className="bg-card border border-border rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-semibold">Code</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Discount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Min Purchase</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Expiry</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVouchers.map((voucher) => (
                <tr key={voucher.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-3 text-sm font-mono font-semibold">{voucher.code}</td>
                  <td className="px-6 py-3 text-sm">{voucher.description}</td>
                  <td className="px-6 py-3 text-sm font-semibold">
                    {voucher.discountType === "percentage" ? `${voucher.discount}%` : `$${voucher.discount}`}
                  </td>
                  <td className="px-6 py-3 text-sm font-semibold">{voucher.quantity}</td>
                  <td className="px-6 py-3 text-sm">${voucher.minPurchase}</td>
                  <td className="px-6 py-3 text-sm">{voucher.expiryDate}</td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        voucher.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {voucher.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-muted rounded transition-colors cursor-pointer"
                        onClick={() => copyToClipboard(voucher.code)}
                        title="Copy code"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-muted rounded transition-colors cursor-pointer"
                        onClick={() => openEditModal(voucher)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-muted rounded transition-colors text-destructive cursor-pointer"
                        onClick={() => handleDeleteVoucher(voucher.id)}
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
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredVouchers.length)} of{" "}
          {filteredVouchers.length} vouchers
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

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl">Create Voucher</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 hover:bg-muted rounded transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Voucher Code</label>
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., SAVE20"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., 20% off on sale items"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Discount</label>
                  <Input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    placeholder="20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded bg-background"
                  >
                    <option value="percentage">Percentage %</option>
                    <option value="fixed">Fixed $</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Minimum Purchase</label>
                  <Input
                    type="number"
                    value={formData.minPurchase}
                    onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <Input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="100"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Max Uses</label>
                <Input
                  type="number"
                  value={formData.maxUses}
                  onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                  placeholder="100"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "Inactive" })}
                  className="w-full px-3 py-2 border border-border rounded bg-background"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <input
                    type="checkbox"
                    checked={formData.hasExpiration}
                    onChange={(e) => setFormData({ ...formData, hasExpiration: e.target.checked })}
                    className="w-4 h-4 cursor-pointer"
                  />
                  Set Expiration Date
                </label>
                {formData.hasExpiration && (
                  <Input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="flex-1 cursor-pointer">
                Cancel
              </Button>
              <Button onClick={handleAddVoucher} className="flex-1 cursor-pointer">
                Create
              </Button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl">Edit Voucher</h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false)
                  setEditingVoucher(null)
                  setFormData({
                    code: "",
                    description: "",
                    discount: "",
                    discountType: "percentage",
                    minPurchase: "",
                    maxUses: "",
                    quantity: "",
                    expiryDate: "",
                    hasExpiration: true,
                    status: "Active",
                  })
                }}
                className="p-1 hover:bg-muted rounded transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Voucher Code</label>
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., SAVE20"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., 20% off on sale items"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Discount</label>
                  <Input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    placeholder="20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded bg-background"
                  >
                    <option value="percentage">Percentage %</option>
                    <option value="fixed">Fixed $</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Minimum Purchase</label>
                  <Input
                    type="number"
                    value={formData.minPurchase}
                    onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <Input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="100"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Max Uses</label>
                <Input
                  type="number"
                  value={formData.maxUses}
                  onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                  placeholder="100"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "Inactive" })}
                  className="w-full px-3 py-2 border border-border rounded bg-background"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <input
                    type="checkbox"
                    checked={formData.hasExpiration}
                    onChange={(e) => setFormData({ ...formData, hasExpiration: e.target.checked })}
                    className="w-4 h-4 cursor-pointer"
                  />
                  Set Expiration Date
                </label>
                {formData.hasExpiration && (
                  <Input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false)
                  setEditingVoucher(null)
                  setFormData({
                    code: "",
                    description: "",
                    discount: "",
                    discountType: "percentage",
                    minPurchase: "",
                    maxUses: "",
                    quantity: "",
                    expiryDate: "",
                    hasExpiration: true,
                    status: "Active",
                  })
                }}
                className="flex-1 cursor-pointer"
              >
                Cancel
              </Button>
              <Button onClick={handleEditVoucher} className="flex-1 cursor-pointer">
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
