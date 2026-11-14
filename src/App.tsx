import { useState } from "react"
import Navbar from "@/components/Navbar"
import CinematicBackground from "@/components/CinematicBackground"
import MacBookCanvas, { ScreenState } from "@/components/MacBookCanvas"
import Hero from "@/components/Hero"
import ExperienceSection from "@/components/ExperienceSection"
import ProjectsSection from "@/components/ProjectsSection"
import ContactSection from "@/components/ContactSection"

export default function App() {
  const [screenState, setScreenState] = useState<ScreenState>("wallpaper")
  const [activeRoleIndex, setActiveRoleIndex] = useState(0)
  const [activeProject, setActiveProject] = useState<"gitex" | "guppty">("gitex")

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      if (id === "top") setScreenState("wallpaper")
      else if (id === "experience") setScreenState("experience")
      else if (id === "projects") setScreenState(activeProject)
      else if (id === "contact") setScreenState("contact")
    }
  }

  const handleSelectRole = (idx: number) => {
    setActiveRoleIndex(idx)
    setScreenState("experience")
  }

  const handleSelectProject = (project: "gitex" | "guppty") => {
    setActiveProject(project)
    setScreenState(project)
  }

  return (
    <div className="relative min-h-screen text-black font-sans antialiased selection:bg-blue-500/20 selection:text-black">
      {/* 1. Ethereal Luminous Silk & Charcoal Wave Background */}
      <CinematicBackground />

      {/* 2. One Continuous 3D MacBook Model (Three.js + GSAP ScrollTrigger) */}
      <MacBookCanvas
        screenState={screenState}
        activeRoleIndex={activeRoleIndex}
      />

      {/* 3. Minimal Apple-Inspired Navigation */}
      <Navbar onNavigate={scrollToSection} />

      {/* 4. Scroll-Synchronized Content Story */}
      <main className="relative z-20">
        {/* Opening: "Hey, I'm Adrian." */}
        <Hero />

        {/* Experience: The 360° Reveal */}
        <ExperienceSection
          activeRoleIndex={activeRoleIndex}
          onSelectRole={handleSelectRole}
        />

        {/* Projects: Close and Reopen (Gitex & Guppty) */}
        <ProjectsSection
          activeProject={activeProject}
          onSelectProject={handleSelectProject}
        />

        {/* Contact: Cinematic Finale ("Let's connect.") */}
        <ContactSection />
      </main>
    </div>
  )
}
