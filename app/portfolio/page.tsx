import { Header } from "@/components/header"
import { PortfolioSection } from "@/components/portfolio-section"
import { Footer } from "@/components/footer"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <PortfolioSection />
      </main>
      <Footer />
    </div>
  )
}
