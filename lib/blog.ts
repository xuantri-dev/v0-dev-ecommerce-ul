export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Layering: Master Winter Style",
    excerpt: "Discover how to layer clothing effectively for both warmth and style this winter season.",
    content: "Layering is an essential skill for any gentleman looking to maintain style through the colder months...",
    author: "James Mitchell",
    date: "2025-01-15",
    category: "Style Guide",
    image: "/winter-layering-fashion.jpg",
    featured: true,
  },
  {
    id: "2",
    title: "Cashmere Care: Keeping Your Investment Fresh",
    excerpt: "Learn the proper techniques for caring for and maintaining your premium cashmere pieces.",
    content: "Cashmere is a luxury investment that requires proper care to maintain its softness and longevity...",
    author: "Alexander Chen",
    date: "2025-01-10",
    category: "Care Guide",
    image: "/cashmere-care-maintenance.jpg",
    featured: true,
  },
  {
    id: "3",
    title: "Tailoring Essentials: Finding Your Perfect Fit",
    excerpt: "A comprehensive guide to understanding tailoring and achieving the perfect fit for your wardrobe.",
    content: "The difference between a good suit and a great suit often comes down to proper tailoring...",
    author: "Thomas Blackwell",
    date: "2025-01-05",
    category: "Style Guide",
    image: "/tailoring-fit-guide.jpg",
    featured: true,
  },
  {
    id: "4",
    title: "Leather Goods: Investment Pieces That Last",
    excerpt: "Explore why quality leather accessories are worth the investment for any discerning gentleman.",
    content: "Quality leather goods are more than just accessories; they are investments in timeless style...",
    author: "James Morrison",
    date: "2024-12-28",
    category: "Accessories",
    image: "/leather-accessories-quality.jpg",
    featured: false,
  },
  {
    id: "5",
    title: "Color Theory for Men: Building a Cohesive Wardrobe",
    excerpt: "Master the basics of color coordination to create versatile and sophisticated outfits.",
    content: "Understanding color theory can transform your wardrobe from ordinary to extraordinary...",
    author: "Alexander Chen",
    date: "2024-12-20",
    category: "Style Guide",
    image: "/color-theory-menswear.jpg",
    featured: false,
  },
  {
    id: "6",
    title: "The Modern Gentleman: Redefining Classic Style",
    excerpt: "How contemporary fashion is reshaping traditional menswear for the modern era.",
    content: "The modern gentleman balances classic elegance with contemporary sensibilities...",
    author: "Thomas Blackwell",
    date: "2024-12-15",
    category: "Trends",
    image: "/modern-gentleman-style.jpg",
    featured: false,
  },
  {
    id: "7",
    title: "Footwear Fundamentals: Shoes for Every Occasion",
    excerpt: "A guide to building a versatile shoe collection that covers all your lifestyle needs.",
    content: "Every gentleman should have a curated selection of shoes for different occasions...",
    author: "James Mitchell",
    date: "2024-12-10",
    category: "Accessories",
    image: "/mens-footwear-collection.jpg",
    featured: false,
  },
  {
    id: "8",
    title: "Sustainable Fashion: Luxury with Conscience",
    excerpt: "Discover how sustainable practices are shaping the future of luxury menswear.",
    content: "Sustainability and luxury are no longer mutually exclusive in modern fashion...",
    author: "Alexander Chen",
    date: "2024-12-05",
    category: "Sustainability",
    image: "/sustainable-luxury-fashion.jpg",
    featured: false,
  },
  {
    id: "9",
    title: "Accessory Styling: The Finishing Touches",
    excerpt: "Learn how to use accessories to elevate your everyday outfits with sophistication.",
    content: "Accessories are the punctuation marks of fashion, adding personality and polish...",
    author: "James Morrison",
    date: "2024-11-28",
    category: "Accessories",
    image: "/mens-accessories-styling.jpg",
    featured: false,
  },
  {
    id: "10",
    title: "Fabric Knowledge: Understanding Quality Materials",
    excerpt: "An in-depth look at the fabrics that define luxury menswear and how to identify quality.",
    content: "Understanding fabrics is essential for making informed purchasing decisions...",
    author: "Thomas Blackwell",
    date: "2024-11-20",
    category: "Education",
    image: "/luxury-fabric-materials.jpg",
    featured: false,
  },
  {
    id: "11",
    title: "Seasonal Transitions: Updating Your Wardrobe",
    excerpt: "Tips for transitioning your wardrobe between seasons while maintaining style.",
    content: "Seasonal transitions offer the perfect opportunity to refresh your wardrobe...",
    author: "James Mitchell",
    date: "2024-11-15",
    category: "Style Guide",
    image: "/seasonal-wardrobe-transition.jpg",
    featured: false,
  },
  {
    id: "12",
    title: "Investment Pieces: Building a Timeless Collection",
    excerpt: "Identify the key investment pieces every gentleman should own for a timeless wardrobe.",
    content: "Building a timeless wardrobe starts with investing in quality foundational pieces...",
    author: "Alexander Chen",
    date: "2024-11-10",
    category: "Style Guide",
    image: "/investment-wardrobe-pieces.jpg",
    featured: false,
  },
]

export function getFeaturedBlogPosts() {
  return blogPosts.filter((p) => p.featured)
}

export function getBlogPostById(id: string) {
  return blogPosts.find((p) => p.id === id)
}

export function getBlogPostsByCategory(category: string) {
  return blogPosts.filter((p) => p.category === category)
}
