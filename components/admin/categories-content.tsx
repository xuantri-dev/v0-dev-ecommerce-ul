"use client"

import { mockCategories } from "@/lib/admin-data"
import { Edit2, Trash2, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface CategoryForm {
  name: string
}

export function CategoriesContent() {
  const [categories, setCategories] = useState(mockCategories)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<(typeof mockCategories)[0] | null>(null)
  const [formData, setFormData] = useState<CategoryForm>({ name: "" })
  const { toast } = useToast()

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({ title: "Error", description: "Category name is required", variant: "destructive" })
      return false
    }
    return true
  }

  const handleAddCategory = () => {
    if (!validateForm()) return

    const newCategory = {
      id: Math.max(...categories.map((c) => c.id)) + 1,
      name: formData.name,
      productCount: 0,
      status: "Active",
    }

    setCategories([...categories, newCategory])
    setFormData({ name: "" })
    setIsAddModalOpen(false)
    toast({ title: "Success", description: "Category added successfully" })
  }

  const handleEditCategory = () => {
    if (!validateForm()) return

    const updatedCategories = categories.map((c) => (c.id === editingCategory?.id ? { ...c, name: formData.name } : c))

    setCategories(updatedCategories)
    setFormData({ name: "" })
    setIsEditModalOpen(false)
    setEditingCategory(null)
    toast({ title: "Success", description: "Category updated successfully" })
  }

  const openEditModal = (category: (typeof mockCategories)[0]) => {
    setEditingCategory(category)
    setFormData({ name: category.name })
    setIsEditModalOpen(true)
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((c) => c.id !== id))
    toast({ title: "Success", description: "Category deleted successfully" })
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">Manage product categories</p>
        </div>
        <Button className="flex items-center gap-2 cursor-pointer" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="bg-card border border-border rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-semibold">Category Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Product Count</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-3 text-sm font-medium">{category.name}</td>
                  <td className="px-6 py-3 text-sm">{category.productCount} products</td>
                  <td className="px-6 py-3 text-sm">
                    <span className="px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                      {category.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-muted rounded transition-colors cursor-pointer"
                        onClick={() => openEditModal(category)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-muted rounded transition-colors text-destructive cursor-pointer"
                        onClick={() => handleDeleteCategory(category.id)}
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
          <div className="bg-background border border-border rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl">Add New Category</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 hover:bg-muted rounded transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="flex-1 cursor-pointer">
                Cancel
              </Button>
              <Button onClick={handleAddCategory} className="flex-1 cursor-pointer">
                Add Category
              </Button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl">Edit Category</h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false)
                  setEditingCategory(null)
                  setFormData({ name: "" })
                }}
                className="p-1 hover:bg-muted rounded transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false)
                  setEditingCategory(null)
                  setFormData({ name: "" })
                }}
                className="flex-1 cursor-pointer"
              >
                Cancel
              </Button>
              <Button onClick={handleEditCategory} className="flex-1 cursor-pointer">
                Update Category
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
