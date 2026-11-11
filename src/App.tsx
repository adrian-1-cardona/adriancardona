import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import ProjectsSection from "@/components/ProjectsSection"
import ExperienceSection from "@/components/ExperienceSection"
import BlogSection from "@/components/BlogSection"
import ArchitectureSection from "@/components/ArchitectureSection"
import PrinciplesSection from "@/components/PrinciplesSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("overview")
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null)

  // Handle URL hash on initial load and popstate
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash.startsWith("blog/")) {
        const slug = hash.replace("blog/", "")
        setSelectedPostSlug(slug)
        setActiveSection("blog")
      } else if (hash) {
        setActiveSection(hash)
      }
    }

    handleHash()
    window.addEventListener("popstate", handleHash)
    return () => window.removeEventListener("popstate", handleHash)
  }, [])

  // IntersectionObserver to spy on active section during scroll
  useEffect(() => {
    const sections = [
      "overview",
      "work",
      "experience",
      "blog",
      "architecture",
      "principles",
      "contact",
    ]
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
      window.history.pushState(null, "", `#${id}`)
    }
  }

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    window.history.pushState(null, "", "#overview")
    setActiveSection("overview")
  }

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] selection:bg-blue-500/30 selection:text-white font-sans antialiased relative">
      {/* Floating Apple Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenBlog={() => scrollToSection("blog")}
      />

      <main className="relative z-10">
        {/* Apple Flagship Hero */}
        <Hero
          onExploreWork={() => scrollToSection("work")}
          onReadBlog={() => scrollToSection("blog")}
        />

        {/* Selected Projects */}
        <ProjectsSection />

        {/* Professional Experience */}
        <ExperienceSection />

        {/* Engineering Blog (Apple Newsroom / Longform Reader) */}
        <BlogSection
          selectedPostSlug={selectedPostSlug}
          onPostOpened={(slug) => setSelectedPostSlug(slug)}
        />

        {/* Technical Architecture & Specs */}
        <ArchitectureSection />

        {/* Engineering Principles */}
        <PrinciplesSection />

        {/* Contact & Connect */}
        <ContactSection />
      </main>

      {/* Global Apple Minimalist Footer */}
      <Footer onScrollTop={handleScrollTop} />
    </div>
  )
}
