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
      className="relative min-h-[90vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 px-6 sm:px-12 max-w-5xl mx-auto z-20 pointer-events-auto text-center"
    >
      {/* Top Space for the 3D MacBook's cinematic finale pose */}
      <div className="h-48 sm:h-[320px] pointer-events-none" />

      {/* Main Content matching user reference image exactly: "Let's connect." */}
      <div className="flex flex-col items-center">
        <div className="text-xs uppercase tracking-[0.25em] text-white/60 font-semibold mb-3">
          Contact
        </div>

        <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
          Let&apos;s connect.
        </h2>

        <p className="text-sm sm:text-base text-neutral-300 max-w-md mx-auto mb-8 font-normal leading-relaxed">
          Open to software engineering internships and full-time opportunities. Based in San Luis Obispo, CA.
        </p>

        {/* Clean Contact Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-medium">
          <a
            href={`mailto:${PROFILE.email}?subject=Hello%20Adrian`}
            className="px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition shadow-xs"
          >
            Email Adrian
          </a>

          <button
            onClick={handleCopyEmail}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition cursor-pointer font-mono text-xs"
          >
            {copied ? "✓ Copied to clipboard" : PROFILE.email}
          </button>

          <a
            href={PROFILE.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
          >
            Resume (PDF)
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
      <footer className="pt-16 mt-16 border-t border-white/10 text-xs text-neutral-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>© 2026 Adrian Cardona. All rights reserved.</span>
        <span>Cal Poly San Luis Obispo · Computer Science</span>
      </footer>
    </section>
  )
}
