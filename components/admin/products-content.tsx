"use client"

import type React from "react"

import { mockProducts } from "@/lib/admin-data"
import { Edit2, Trash2, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface ProductForm {
  name: string
  category: string
  price: string
  stock: string
  description: string
  images: (string | null)[]
}

export function ProductsContent() {
  const [products, setProducts] = useState(mockProducts)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null)
  const [editingProduct, setEditingProduct] = useState<(typeof mockProducts)[0] | null>(null)
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    images: [null, null],
  })
  const { toast } = useToast()

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({ title: "Error", description: "Product name is required", variant: "destructive" })
      return false
    }
    if (!formData.category.trim()) {
      toast({ title: "Error", description: "Category is required", variant: "destructive" })
      return false
    }
    if (!formData.price.trim()) {
      toast({ title: "Error", description: "Price is required", variant: "destructive" })
      return false
    }
    if (!formData.stock.trim()) {
      toast({ title: "Error", description: "Stock quantity is required", variant: "destructive" })
      return false
    }
    if (!formData.description.trim()) {
      toast({ title: "Error", description: "Description is required", variant: "destructive" })
      return false
    }
    return true
  }

  const handleAddProduct = () => {
    if (!validateForm()) return

    const newProduct = {
      id: Math.max(...products.map((p) => Number.parseInt(p.id.toString()))) + 1,
      name: formData.name,
      category: formData.category,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      status:
        Number.parseInt(formData.stock) > 20
          ? "In Stock"
          : Number.parseInt(formData.stock) > 0
            ? "Low Stock"
            : "Out of Stock",
      description: formData.description,
      images: formData.images.filter((img) => img !== null) as string[],
    }

    setProducts([...products, newProduct])
    setFormData({ name: "", category: "", price: "", stock: "", description: "", images: [null, null] })
    setIsAddModalOpen(false)
    toast({ title: "Success", description: "Product added successfully" })
  }

  const handleEditProduct = () => {
    if (!validateForm()) return

    const updatedProducts = products.map((p) =>
      p.id === editingProduct?.id
        ? {
            ...p,
            name: formData.name,
            category: formData.category,
            price: Number.parseFloat(formData.price),
            stock: Number.parseInt(formData.stock),
            status:
              Number.parseInt(formData.stock) > 20
                ? "In Stock"
                : Number.parseInt(formData.stock) > 0
                  ? "Low Stock"
                  : "Out of Stock",
            description: formData.description,
            images: formData.images.filter((img) => img !== null) as string[],
          }
        : p,
    )

    setProducts(updatedProducts)
    setFormData({ name: "", category: "", price: "", stock: "", description: "", images: [null, null] })
    setIsEditModalOpen(false)
    setEditingProduct(null)
    toast({ title: "Success", description: "Product updated successfully" })
  }

  const openEditModal = (product: (typeof mockProducts)[0]) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description || "",
      images: [...product.images, null].slice(0, 2),
    })
    setIsEditModalOpen(true)
  }

  const handleDeleteImage = (index: number) => {
    const newImages = [...formData.images]
    newImages[index] = null
    setFormData({ ...formData, images: newImages })
  }

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const newImages = [...formData.images]
      newImages[index] = `/uploaded-${Date.now()}-${file.name}`
      setFormData({ ...formData, images: newImages })
    }
  }

  const confirmDeleteProduct = () => {
    if (deleteProductId !== null) {
      setProducts(products.filter((p) => p.id !== deleteProductId))
      toast({ title: "Success", description: "Product deleted successfully" })
    }
    setIsDeleteConfirmOpen(false)
    setDeleteProductId(null)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button className="flex items-center gap-2 cursor-pointer" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="bg-card border border-border rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-semibold">Product Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-3 text-sm font-medium">{product.name}</td>
                  <td className="px-6 py-3 text-sm">{product.category}</td>
                  <td className="px-6 py-3 text-sm font-semibold">${product.price}</td>
                  <td className="px-6 py-3 text-sm">{product.stock} units</td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        product.status === "In Stock"
                          ? "bg-green-100 text-green-800"
                          : product.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-muted rounded transition-colors cursor-pointer"
                        onClick={() => openEditModal(product)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-muted rounded transition-colors text-destructive cursor-pointer"
                        onClick={() => {
                          setDeleteProductId(product.id)
                          setIsDeleteConfirmOpen(true)
                        }}
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
              <h2 className="font-serif text-2xl">Add New Product</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 hover:bg-muted rounded transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Product Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Enter category"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Price</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Stock Quantity</label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="Enter stock quantity"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Product Image 1</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(0, e)}
                  className="w-full text-sm cursor-pointer"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Product Image 2</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(1, e)}
                  className="w-full text-sm cursor-pointer"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="flex-1 cursor-pointer">
                Cancel
              </Button>
              <Button onClick={handleAddProduct} className="flex-1 cursor-pointer">
                Add Product
              </Button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl">Edit Product</h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false)
                  setEditingProduct(null)
                  setFormData({ name: "", category: "", price: "", stock: "", description: "", images: [null, null] })
                }}
                className="p-1 hover:bg-muted rounded transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Product Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Enter category"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Price</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Stock Quantity</label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="Enter stock quantity"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                />
              </div>
              {formData.images.map((image, index) => (
                <div key={index}>
                  <label className="text-sm font-medium mb-2 block">Product Image {index + 1}</label>
                  {image ? (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground flex-1 truncate">{image}</span>
                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="p-1 hover:bg-destructive/10 rounded transition-colors cursor-pointer text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e)}
                      className="w-full text-sm cursor-pointer"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false)
                  setEditingProduct(null)
                  setFormData({ name: "", category: "", price: "", stock: "", description: "", images: [null, null] })
                }}
                className="flex-1 cursor-pointer"
              >
                Cancel
              </Button>
              <Button onClick={handleEditProduct} className="flex-1 cursor-pointer">
                Update Product
              </Button>
            </div>
          </div>
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-8 max-w-sm w-full mx-4">
            <h2 className="font-serif text-2xl mb-4">Delete Product?</h2>
            <p className="text-muted-foreground mb-8">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDeleteConfirmOpen(false)
                  setDeleteProductId(null)
                }}
                className="flex-1 cursor-pointer"
              >
                Cancel
              </Button>
              <Button onClick={confirmDeleteProduct} variant="destructive" className="flex-1 cursor-pointer">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
