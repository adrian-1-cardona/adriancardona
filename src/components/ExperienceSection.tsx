import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { EXPERIENCES } from "@/data/portfolioData"

gsap.registerPlugin(ScrollTrigger)

interface ExperienceSectionProps {
  activeRoleIndex: number
  onSelectRole: (index: number) => void
}

export default function ExperienceSection({
  activeRoleIndex,
  onSelectRole,
}: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const activeRoleIndexRef = useRef<number>(activeRoleIndex)

  useEffect(() => {
    activeRoleIndexRef.current = activeRoleIndex
  }, [activeRoleIndex])

  // ScrollTrigger to smoothly advance through all 4 experiences as the user scrolls
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress
        let idx = 0
        if (p < 0.25) idx = 0
        else if (p < 0.5) idx = 1
        else if (p < 0.75) idx = 2
        else idx = 3

        if (idx !== activeRoleIndexRef.current) {
          activeRoleIndexRef.current = idx
          onSelectRole(idx)
        }
      },
    })

    return () => {
      st.kill()
    }
  }, [onSelectRole])

  const activeExp = EXPERIENCES[activeRoleIndex] || EXPERIENCES[0]

  // Format headline to match reference mockup typography
  const renderRoleHeading = () => {
    switch (activeRoleIndex) {
      case 0:
        return (
          <>
            Software
            <br />
            Engineering Intern
          </>
        )
      case 1:
        return (
          <>
            Undergraduate
            <br />
            Researcher
          </>
        )
      case 2:
        return (
          <>
            Technology Solutions
            <br />
            Research Intern
          </>
        )
      case 3:
        return (
          <>
            AI Document
            <br />
            Insights Extern
          </>
        )
      default:
        return activeExp.role
    }
  }

  const renderCompanySub = () => {
    switch (activeRoleIndex) {
      case 0:
        return "Cal Poly"
      case 1:
        return "Cal Poly CSSE"
      case 2:
        return "Foundation for CCC"
      case 3:
        return "Extern"
      default:
        return activeExp.company
    }
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-[380vh] z-20 pointer-events-auto"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen flex items-center px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Identical typography & layout to user's reference mockup */}
          <div className="lg:col-span-5 max-w-[460px] xl:max-w-[500px] text-left z-30">
            {/* Header label */}
            <div className="text-xs uppercase tracking-[0.28em] text-neutral-400 font-semibold mb-6">
              EXPERIENCE
            </div>

            {/* Role Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-[44px] xl:text-[50px] font-bold text-black tracking-tight leading-[1.08] mb-3 transition-all duration-300">
              {renderRoleHeading()}
            </h2>

            {/* Company Subtitle */}
            <div className="text-xl sm:text-2xl text-neutral-500 font-normal mb-6 transition-all duration-300">
              {renderCompanySub()}
            </div>

            {/* Minimal accent line matching reference image */}
            <div className="w-10 h-0.5 bg-neutral-300" />
          </div>

          {/* Right Column (7 cols): Reserved for the 3D MacBook extreme close-up side-profile */}
          <div className="lg:col-span-7 h-72 sm:h-[460px] lg:h-[540px] pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
