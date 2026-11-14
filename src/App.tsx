import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import ExperienceSection from "@/components/ExperienceSection"
import GupptyShowcase from "@/components/GupptyShowcase"
import ResearchShowcase from "@/components/ResearchShowcase"
import AboutSection from "@/components/AboutSection"
import BlogSection from "@/components/BlogSection"
import FaqSection from "@/components/FaqSection"
import CtaBanner from "@/components/CtaBanner"
import Footer from "@/components/Footer"

export default function App() {
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null)

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash.startsWith("blog/")) {
        const slug = hash.replace("blog/", "")
        setSelectedPostSlug(slug)
      }
    }

    handleHash()
    window.addEventListener("popstate", handleHash)
    return () => window.removeEventListener("popstate", handleHash)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      window.history.pushState(null, "", `#${id}`)
    }
  }

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    window.history.pushState(null, "", "#top")
  }

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black/10 selection:text-black font-sans antialiased">
      {/* Sticky Header Navigation */}
      <Navbar onNavigate={scrollToSection} />

      <main>
        {/* Hero Section with Integrated Gitex Codebase Intelligence Showcase */}
        <Hero
          onExploreWork={() => scrollToSection("work")}
        />

        {/* Work Experience: Interactive Selector with Official Company Logos */}
        <ExperienceSection />

        {/* Flagship Systems: Guppty (Rust Bytecode VM & Pratt Parser) */}
        <GupptyShowcase />

        {/* Academic Research: Cal Poly CSSE Cooperative AI & Telemetry Engine */}
        <ResearchShowcase />

        {/* About Adrian: Authentic High-Res Portrait, Story & Engineering Standards */}
        <AboutSection />

        {/* Engineering Writing: Deep-Dive Articles with Full Modal Reader */}
        <BlogSection
          selectedPostSlug={selectedPostSlug}
          onPostOpened={(slug) => setSelectedPostSlug(slug)}
        />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Contact Banner */}
        <CtaBanner />
      </main>

      {/* Modern Footer with Verified Links */}
      <Footer onScrollTop={handleScrollTop} />
    </div>
  )
}
