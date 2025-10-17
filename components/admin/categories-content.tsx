import { mockCategories } from "@/lib/admin-data"
import { Edit2, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CategoriesContent() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">Manage product categories</p>
        </div>
        <Button className="flex items-center gap-2">
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
              {mockCategories.map((category) => (
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
                      <button className="p-2 hover:bg-muted rounded transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded transition-colors text-destructive">
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
    </div>
  )
}
