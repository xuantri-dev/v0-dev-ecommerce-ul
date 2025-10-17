import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogContent } from "@/components/blog-content"

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <BlogContent />
      </main>
      <Footer />
    </div>
  )
}
