import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TeamSection } from "@/components/team-section"
import { ServicesSection } from "@/components/services-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TeamSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  )
}
