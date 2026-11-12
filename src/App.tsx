import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import SelectedWorkSection from "@/components/SelectedWorkSection"
import TenetsSection from "@/components/TenetsSection"
import TrackRecordSection from "@/components/TrackRecordSection"
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
        {/* Hero Section with Live Code Execution Mockup */}
        <Hero onGetInTouch={() => scrollToSection("contact")} />

        {/* Experience & Track Record (#1 Priority with Company Logos) */}
        <TrackRecordSection />

        {/* Interactive Flagship Projects: Guppty (Rust VM) & Gitex (Codebase AI) */}
        <SelectedWorkSection />

        {/* Architectural Tenets & Engineering Philosophy */}
        <TenetsSection />

        {/* Engineering Blog (Editorial Cards & Longform Reader) */}
        <BlogSection
          selectedPostSlug={selectedPostSlug}
          onPostOpened={(slug) => setSelectedPostSlug(slug)}
        />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Bottom Call to Action Banner */}
        <CtaBanner />
      </main>

      {/* 4-Column Modern Footer */}
      <Footer onScrollTop={handleScrollTop} />
    </div>
  )
}
