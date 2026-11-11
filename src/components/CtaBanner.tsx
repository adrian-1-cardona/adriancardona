import { useState } from "react"
import { Mail, Copy, Check, ArrowRight } from "lucide-react"
import { PROFILE } from "@/data/portfolioData"

export default function CtaBanner() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Soft Gradient Banner (Matches Cluely bottom banner with Cluely blue #4e95ff) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#edf4ff] via-[#f5f9ff] to-[#e8f1ff] border border-[#d4e4fc] p-8 sm:p-14 relative overflow-hidden shadow-xs flex flex-col md:flex-row md:items-center md:justify-between text-left gap-8">
        <div className="max-w-xl relative z-10">
          <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#37383c] tracking-tight leading-tight mb-3">
            Engineering that delivers clarity, not noise.
          </h2>
          <p className="text-[#686a71] text-sm sm:text-base mb-8 leading-relaxed font-normal">
            Available for software engineering roles, compiler engineering, and
            systems research collaborations.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PROFILE.email}?subject=Portfolio%20Inquiry%20for%20Adrian`}
              className="btn-primary !px-6 !py-2.5"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="btn-secondary !text-xs !py-2.5 !px-4 !bg-white cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">
                    Email Copied!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#686a71]" />
                  <span>{PROFILE.email}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Decorative Floating 3D Keycaps (Matches Cluely bottom banner aesthetic) */}
        <div className="hidden md:flex relative w-48 h-36 items-center justify-center shrink-0 pointer-events-none select-none">
          {/* Keycap 1: Command */}
          <div
            className="absolute top-2 right-12 w-16 h-16 rounded-2xl bg-white/90 border border-white/60 shadow-[0_12px_28px_rgba(78,149,255,0.18)] flex items-center justify-center transform -rotate-12 backdrop-blur-xs"
            style={{
              boxShadow:
                "0 10px 25px -3px rgba(78, 149, 255, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.9)",
            }}
          >
            <span className="font-mono text-xl font-bold text-[#4e95ff]">
              ⌘
            </span>
          </div>

          {/* Keycap 2: K */}
          <div
            className="absolute bottom-2 right-4 w-16 h-16 rounded-2xl bg-white/95 border border-white/80 shadow-[0_16px_32px_rgba(78,149,255,0.22)] flex items-center justify-center transform rotate-6 backdrop-blur-xs"
            style={{
              boxShadow:
                "0 14px 30px -4px rgba(78, 149, 255, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.95)",
            }}
          >
            <span className="font-mono text-xl font-bold text-[#37383c]">
              K
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
