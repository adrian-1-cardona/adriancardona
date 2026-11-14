import { useState } from "react"
import { PROFILE } from "@/data/portfolioData"

export default function ContactSection() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-end pb-16 px-6 sm:px-12 z-20 pointer-events-auto text-center overflow-hidden"
    >
      {/* 3D MacBook finale silhouette position */}
      <div className="h-64 sm:h-[380px] pointer-events-none" />

      {/* The Stunning Curved Deep Blue & Midnight Ocean Wave Horizon (Identical to mockup bottom) */}
      <div className="absolute inset-x-0 bottom-0 top-[28vh] pointer-events-none z-0">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 240 C350 40 1050 40 1540 240 L1540 900 L-100 900 Z"
            fill="url(#contactCurvedWave)"
          />
          <path
            d="M-50 290 C400 120 1000 120 1500 290"
            stroke="rgba(196, 218, 255, 0.4)"
            strokeWidth="3"
            fill="none"
          />
          <defs>
            <linearGradient id="contactCurvedWave" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#4f7de8" />
              <stop offset="25%" stopColor="#2c51b5" />
              <stop offset="65%" stopColor="#14214f" />
              <stop offset="100%" stopColor="#0b0f24" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content matching user reference image exactly: "CONTACT" & "Let's connect." */}
      <div className="relative z-30 flex flex-col items-center max-w-4xl mx-auto mb-8">
        <div className="text-xs uppercase tracking-[0.28em] text-white/70 font-semibold mb-4">
          CONTACT
        </div>

        <h2 className="text-5xl sm:text-7xl lg:text-[76px] font-bold text-white tracking-tight leading-[1.05] mb-8">
          Let&apos;s connect.
        </h2>

        {/* Clean, Understated Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 text-xs sm:text-sm font-medium">
          <a
            href={`mailto:${PROFILE.email}?subject=Hello%20Adrian`}
            className="px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-neutral-100 transition shadow-xs"
          >
            Email Adrian
          </a>

          <button
            onClick={handleCopyEmail}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition cursor-pointer font-mono text-xs"
          >
            {copied ? "✓ Copied" : PROFILE.email}
          </button>

          <a
            href={PROFILE.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
          >
            Resume
          </a>

          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
          >
            LinkedIn
          </a>

          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="relative z-10 pt-10 border-t border-white/15 text-xs text-white/50 font-mono flex flex-col sm:flex-row items-center justify-between gap-3 max-w-5xl mx-auto w-full">
        <span>© 2026 Adrian Cardona</span>
        <span>Cal Poly SLO · Computer Science</span>
      </footer>
    </section>
  )
}
