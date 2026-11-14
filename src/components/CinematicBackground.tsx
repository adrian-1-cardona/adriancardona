import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function CinematicBackground() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return

    // Scroll-synchronized background color transition:
    // From pearlescent light (Opening/Experience/Projects) into deep midnight charcoal (Contact)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "70% bottom",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress
          // Interpolate background color
          if (bg) {
            bg.style.setProperty("--contact-progress", `${p}`)
          }
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500"
      style={{
        background: `linear-gradient(to bottom, #fdfbfd 0%, #f6f7fc 40%, #eef3fc 70%, #0d1017 100%)`,
      }}
    >
      {/* Top Ethereal Silk Wave 1 (Lavender) */}
      <svg
        className="absolute top-0 left-0 w-full h-[120vh] opacity-65 mix-blend-multiply"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M-100 200 C300 450 700 100 1200 350 C1350 420 1500 380 1600 300 L1600 -100 L-100 -100 Z"
          fill="url(#lavenderSilk)"
        />
        <defs>
          <linearGradient id="lavenderSilk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8e2fa" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#dce4fc" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c5daf9" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Top Ethereal Silk Wave 2 (Sky Blue Ribbon) */}
      <svg
        className="absolute top-[10vh] -left-20 w-[120vw] h-[100vh] opacity-55 mix-blend-multiply"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 450 C400 200 800 550 1440 180 L1440 0 L0 0 Z"
          fill="url(#skyBlueRibbon)"
        />
        <defs>
          <linearGradient id="skyBlueRibbon" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dbe8fc" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#c6dcfc" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#e3dffc" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Contact Deep Charcoal & Cobalt Wave (Emerges at bottom) */}
      <div className="absolute inset-x-0 bottom-0 h-[65vh] bg-gradient-to-t from-[#090b10] via-[#0d121c]/90 to-transparent pointer-events-none" />

      {/* Subtle Luminous Cobalt Flare at bottom center */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[85vw] max-w-4xl h-[350px] bg-gradient-to-t from-blue-600/25 via-indigo-600/15 to-transparent blur-3xl rounded-full pointer-events-none" />
    </div>
  )
}
