import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "@/components/Navbar"
import CinematicBackground from "@/components/CinematicBackground"
import MacBookCanvas, { ScreenState } from "@/components/MacBookCanvas"
import Hero from "@/components/Hero"
import ExperienceSection from "@/components/ExperienceSection"
import ProjectsSection from "@/components/ProjectsSection"
import ContactSection from "@/components/ContactSection"

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [screenState, setScreenState] = useState<ScreenState>("wallpaper")
  const [activeRoleIndex, setActiveRoleIndex] = useState(0)
  const [activeProject, setActiveProject] = useState<"gitex" | "guppty">("gitex")

  // Synchronize screen state with current section in view
  useEffect(() => {
    // 1. Hero / Top -> "wallpaper"
    const stHero = ScrollTrigger.create({
      trigger: "#top",
      start: "top top",
      end: "bottom center",
      onEnter: () => setScreenState("wallpaper"),
      onEnterBack: () => setScreenState("wallpaper"),
    })

    // 2. Experience -> "experience"
    const stExp = ScrollTrigger.create({
      trigger: "#experience",
      start: "top center",
      end: "bottom center",
      onEnter: () => setScreenState("experience"),
      onEnterBack: () => setScreenState("experience"),
    })

    // 3. Projects -> activeProject ("gitex" or "guppty")
    const stProj = ScrollTrigger.create({
      trigger: "#projects",
      start: "top center",
      end: "bottom center",
      onEnter: () => setScreenState(activeProject),
      onEnterBack: () => setScreenState(activeProject),
    })

    // 4. Contact -> "contact"
    const stContact = ScrollTrigger.create({
      trigger: "#contact",
      start: "top center",
      end: "bottom bottom",
      onEnter: () => setScreenState("contact"),
      onEnterBack: () => setScreenState("contact"),
    })

    return () => {
      stHero.kill()
      stExp.kill()
      stProj.kill()
      stContact.kill()
    }
  }, [activeProject])

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
        onRoleChange={handleSelectRole}
      />

      {/* 3. Minimal Apple-Inspired Navigation */}
      <Navbar onNavigate={scrollToSection} />

      {/* 4. Scroll-Synchronized Content Story */}
      <main className="relative z-20">
        {/* Opening: "Hey, I'm Adrian." */}
        <Hero />

        {/* Experience: The 360° Reveal (Scrolls through all 4 roles) */}
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
