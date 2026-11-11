import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import ProfileCard from "@/components/ProfileCard"
import Hero from "@/components/Hero"
import ProjectsSection from "@/components/ProjectsSection"
import ExperienceSection from "@/components/ExperienceSection"
import ToolsSection from "@/components/ToolsSection"
import BlogSection from "@/components/BlogSection"
import ThoughtsSection from "@/components/ThoughtsSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("top")
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null)

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

  // IntersectionObserver for section scroll tracking
  useEffect(() => {
    const sections = [
      "top",
      "projects",
      "experience",
      "tools",
      "blog",
      "thoughts",
      "contact",
    ]
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
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
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      window.history.pushState(null, "", `#${id}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#151312] text-white selection:bg-[#f46c38] selection:text-white font-sans antialiased">
      {/* Top Floating Navigation Bar */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Two-Column Site Layout */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-24 pb-20 flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
        {/* Left Column: Sticky Profile Card */}
        <ProfileCard />

        {/* Right Column: Main Content Stream */}
        <main className="flex-1 min-w-0 w-full space-y-20">
          <Hero />
          <ProjectsSection />
          <ExperienceSection />
          <ToolsSection />
          <BlogSection
            selectedPostSlug={selectedPostSlug}
            onPostOpened={(slug) => setSelectedPostSlug(slug)}
          />
          <ThoughtsSection />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </div>
  )
}
