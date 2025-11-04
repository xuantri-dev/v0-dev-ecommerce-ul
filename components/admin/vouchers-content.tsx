"use client"

import { mockVouchers } from "@/lib/admin-data"
import { Edit2, Trash2, Plus, X, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function VouchersContent() {
  const [vouchers, setVouchers] = useState(mockVouchers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingVoucher, setEditingVoucher] = useState<(typeof mockVouchers)[0] | null>(null)
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discount: "",
    discountType: "percentage",
    minPurchase: "",
    maxUses: "",
    expiryDate: "",
  })
  const { toast } = useToast()

  const filteredVouchers = vouchers.filter(
    (v) =>
      v.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
      expiryDate: formData.expiryDate || "2024-12-31",
      status: "Active",
    }

    setVouchers([...vouchers, newVoucher])
    setFormData({
      code: "",
      description: "",
      discount: "",
      discountType: "percentage",
      minPurchase: "",
      maxUses: "",
      expiryDate: "",
    })
    setIsAddModalOpen(false)
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
            expiryDate: formData.expiryDate || v.expiryDate,
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
      expiryDate: "",
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
      expiryDate: voucher.expiryDate,
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
          onChange={(e) => setSearchTerm(e.target.value)}
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
                <th className="px-6 py-3 text-left text-sm font-semibold">Min Purchase</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Uses</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Expiry</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.map((voucher) => (
                <tr key={voucher.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-3 text-sm font-mono font-semibold">{voucher.code}</td>
                  <td className="px-6 py-3 text-sm">{voucher.description}</td>
                  <td className="px-6 py-3 text-sm font-semibold">
                    {voucher.discountType === "percentage" ? `${voucher.discount}%` : `$${voucher.discount}`}
                  </td>
                  <td className="px-6 py-3 text-sm">${voucher.minPurchase}</td>
                  <td className="px-6 py-3 text-sm">
                    {voucher.usedCount}/{voucher.maxUses}
                  </td>
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
                <label className="text-sm font-medium mb-2 block">Max Uses</label>
                <Input
                  type="number"
                  value={formData.maxUses}
                  onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                  placeholder="100"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Expiry Date</label>
                <Input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
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
                    expiryDate: "",
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
                <label className="text-sm font-medium mb-2 block">Max Uses</label>
                <Input
                  type="number"
                  value={formData.maxUses}
                  onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                  placeholder="100"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Expiry Date</label>
                <Input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
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
                    expiryDate: "",
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
