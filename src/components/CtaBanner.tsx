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
          <h2 className="font-display text-3xl sm:text-5xl font-medium text-[#19191d] tracking-tight leading-tight mb-3">
            Engineering that delivers clarity, not noise.
          </h2>
          <p className="banner-gradient-text text-base sm:text-lg mb-8 leading-relaxed font-normal">
            Available for software engineering roles, compiler engineering, and
            systems research collaborations.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PROFILE.email}?subject=Portfolio%20Inquiry%20for%20Adrian`}
              className="btn-cluely-cta"
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
