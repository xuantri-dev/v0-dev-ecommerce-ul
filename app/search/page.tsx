import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchContent } from "@/components/search-content"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SearchContent query={searchParams.q || ""} />
      </main>
      <Footer />
    </div>
  )
}
