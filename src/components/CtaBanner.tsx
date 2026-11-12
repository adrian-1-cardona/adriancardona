import { useState } from "react"
import { PROFILE } from "@/data/portfolioData"

export default function CtaBanner() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-20 px-4 sm:px-6 max-w-5xl mx-auto"
    >
      {/* Clean Bottom Contact Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#edf4ff] via-[#f5f9ff] to-[#e8f1ff] border border-[#d4e4fc] p-8 sm:p-14 relative overflow-hidden shadow-xs flex flex-col md:flex-row md:items-center md:justify-between text-left gap-8">
        <div className="max-w-xl relative z-10">
          <h2 className="font-display text-3xl sm:text-5xl font-medium text-[#111827] tracking-tight leading-tight mb-3">
            Let&apos;s build reliable software together.
          </h2>
          <p className="text-base sm:text-lg mb-8 leading-relaxed font-normal text-[#4b5563]">
            Available for Software Engineering internships and full-time roles
            (Expected May 2027). Open to systems programming, web
            infrastructure, and AI engineering opportunities.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PROFILE.email}?subject=Portfolio%20Inquiry%20for%20Adrian`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111827] text-white text-xs font-semibold hover:bg-black transition shadow-sm"
            >
              <span>Get in Touch</span>
              <span className="text-sm font-mono">→</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="btn-secondary !text-xs !py-2.5 !px-4 !bg-white cursor-pointer font-mono"
            >
              {copied ? (
                <span className="text-emerald-600 font-semibold">
                  ✓ Email Copied!
                </span>
              ) : (
                <span className="text-[#37383c]">
                  {PROFILE.email} <span className="text-[#9ca3af]">⎘</span>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Decorative Floating 3D Keycaps (Authentic Cluely 3D Rendered Assets) */}
        <div className="hidden md:flex relative w-56 h-40 items-center justify-center shrink-0 pointer-events-none select-none">
          <img
            src="/images/cluely/command-btn.png"
            alt="Command Key"
            className="absolute top-0 right-14 w-20 h-auto drop-shadow-xl animate-float-slow"
          />
          <img
            src="/images/cluely/return-btn.png"
            alt="Return Key"
            className="absolute bottom-1 right-2 w-20 h-auto drop-shadow-2xl animate-float-reverse"
          />
        </div>
      </div>
    </section>
  )
}
