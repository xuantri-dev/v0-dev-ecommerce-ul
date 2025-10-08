export interface Product {
  id: string
  name: string
  category: string
  price: number
  description: string
  images: string[]
  sizes: string[]
  colors: string[]
  featured?: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Cashmere Overcoat",
    category: "Outerwear",
    price: 1850,
    description:
      "Luxurious Italian cashmere overcoat with a timeless silhouette. Features peak lapels, double-breasted closure, and interior pockets. Perfect for elevating any formal ensemble.",
    images: ["/luxury-black-cashmere-overcoat-on-model.jpg", "/black-cashmere-coat-detail-texture.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Navy", "Camel"],
    featured: true,
  },
  {
    id: "2",
    name: "Merino Wool Sweater",
    category: "Knitwear",
    price: 425,
    description:
      "Premium merino wool crewneck sweater with ribbed detailing. Lightweight yet warm, perfect for layering or wearing alone. Crafted in Scotland.",
    images: ["/luxury-grey-merino-wool-sweater.jpg", "/merino-wool-knit-texture-detail.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Grey", "Navy", "Burgundy", "Forest Green"],
    featured: true,
  },
  {
    id: "3",
    name: "Tailored Wool Trousers",
    category: "Trousers",
    price: 595,
    description:
      "Impeccably tailored wool trousers with a modern slim fit. Features Italian wool fabric, side adjusters, and hand-finished details throughout.",
    images: ["/luxury-charcoal-wool-trousers.jpg", "/tailored-trousers-detail.png"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    colors: ["Charcoal", "Navy", "Grey"],
    featured: true,
  },
  {
    id: "4",
    name: "Oxford Dress Shirt",
    category: "Shirts",
    price: 285,
    description:
      "Classic oxford dress shirt in premium Egyptian cotton. Features mother-of-pearl buttons, split yoke, and a refined collar. Made in Italy.",
    images: ["/white-oxford-dress-shirt-luxury.jpg", "/dress-shirt-collar.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Pink"],
    featured: false,
  },
  {
    id: "5",
    name: "Leather Chelsea Boots",
    category: "Footwear",
    price: 725,
    description:
      "Handcrafted Chelsea boots in premium Italian leather. Features Goodyear welt construction, leather sole, and elastic side panels. Built to last a lifetime.",
    images: ["/luxury-black-leather-chelsea-boots.jpg", "/chelsea-boots-leather-detail.jpg"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "Brown", "Tan"],
    featured: true,
  },
  {
    id: "6",
    name: "Silk Pocket Square",
    category: "Accessories",
    price: 95,
    description:
      "Hand-rolled silk pocket square with timeless pattern. Made in Como, Italy from the finest silk. Adds a refined finishing touch to any jacket.",
    images: ["/luxury-silk-pocket-square-navy.jpg", "/silk-pocket-square-folded.jpg"],
    sizes: ["One Size"],
    colors: ["Navy", "Burgundy", "Forest Green", "Charcoal"],
    featured: false,
  },
  {
    id: "7",
    name: "Leather Briefcase",
    category: "Accessories",
    price: 1250,
    description:
      "Full-grain leather briefcase with brass hardware. Features multiple compartments, padded laptop sleeve, and adjustable shoulder strap. Handmade in Florence.",
    images: ["/luxury-brown-leather-briefcase.jpg", "/leather-briefcase-interior-detail.jpg"],
    sizes: ["One Size"],
    colors: ["Cognac", "Black", "Dark Brown"],
    featured: true,
  },
  {
    id: "8",
    name: "Cashmere Scarf",
    category: "Accessories",
    price: 385,
    description:
      "Luxuriously soft cashmere scarf from Scotland. Lightweight yet incredibly warm, with hand-finished edges. An essential cold-weather accessory.",
    images: ["/luxury-grey-cashmere-scarf.jpg", "/cashmere-scarf-texture-detail.jpg"],
    sizes: ["One Size"],
    colors: ["Grey", "Navy", "Camel", "Charcoal"],
    featured: false,
  },
  {
    id: "9",
    name: "Suede Bomber Jacket",
    category: "Outerwear",
    price: 1450,
    description:
      "Contemporary suede bomber jacket with ribbed collar and cuffs. Features Italian suede, interior pockets, and a relaxed fit. Perfect for smart-casual occasions.",
    images: ["/luxury-navy-suede-bomber-jacket.jpg", "/placeholder.svg?height=800&width=600"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Olive", "Tan"],
    featured: true,
  },
]

export function getFeaturedProducts() {
  return products.filter((p) => p.featured)
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category)
}

export function getCategories() {
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)))

  // Map categories to their display information
  const categoryMap: Record<string, { name: string; image: string; href: string }> = {
    Outerwear: { name: "Outerwear", image: "/luxury-coat.jpg", href: "/shop?category=Outerwear" },
    Knitwear: { name: "Knitwear", image: "/soft-cashmere-sweater.png", href: "/shop?category=Knitwear" },
    Trousers: { name: "Trousers", image: "/tailored-suit.jpg", href: "/shop?category=Trousers" },
    Shirts: { name: "Shirts", image: "/white-oxford-dress-shirt-luxury.jpg", href: "/shop?category=Shirts" },
    Footwear: { name: "Footwear", image: "/luxury-black-leather-chelsea-boots.jpg", href: "/shop?category=Footwear" },
    Accessories: { name: "Accessories", image: "/leather-accessories.jpg", href: "/shop?category=Accessories" },
  }

  return uniqueCategories.map(
    (category) =>
      categoryMap[category] || {
        name: category,
        image: "/placeholder.svg?height=800&width=600",
        href: `/shop?category=${category}`,
      },
  )
}
