import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import SelectedWorkSection from "@/components/SelectedWorkSection"
import FlagshipShowcase from "@/components/FlagshipShowcase"
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
    <div className="min-h-screen bg-white text-[#37383c] selection:bg-[#4e95ff]/20 selection:text-[#37383c] font-sans antialiased">
      {/* Sticky Header Navigation */}
      <Navbar onNavigate={scrollToSection} />

      <main>
        {/* Hero Section with Scenic App Window Mockup */}
        <Hero onGetInTouch={() => scrollToSection("contact")} />

        {/* Experience & Track Record (Starts with Adrian's Experience) */}
        <TrackRecordSection />

        {/* Selected Systems & Architecture (2 Large Feature Cards) */}
        <SelectedWorkSection />

        {/* Flagship Research Showcase (Large Paper Document Card) */}
        <FlagshipShowcase />

        {/* Architectural Tenets (3-Column Bento Cards) */}
        <TenetsSection />

        {/* Engineering Blog (Editorial Cards & Longform Reader) */}
        <BlogSection
          selectedPostSlug={selectedPostSlug}
          onPostOpened={(slug) => setSelectedPostSlug(slug)}
        />

        {/* Frequently Asked Questions (Accordion for Recruiters & Visitors) */}
        <FaqSection />

        {/* Bottom Call to Action Banner */}
        <CtaBanner />
      </main>

      {/* 4-Column Modern Footer */}
      <Footer onScrollTop={handleScrollTop} />
    </div>
  )
}
