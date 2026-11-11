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
      {/* Soft Gradient Banner (Matches Cluely bottom banner) */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border border-blue-100 p-8 sm:p-14 text-center relative overflow-hidden shadow-xs">
        <h2 className="font-display text-3xl sm:text-5xl font-normal text-slate-900 tracking-tight leading-tight mb-4">
          Engineering that delivers clarity, not noise.
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed font-normal">
          Available for software engineering roles, compiler engineering, and
          research collaborations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${PROFILE.email}?subject=Portfolio%20Inquiry%20for%20Adrian`}
            className="btn-primary"
          >
            <Mail className="w-4 h-4" />
            <span>Send an Email</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={handleCopyEmail}
            className="btn-secondary !text-xs !py-2"
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
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>{PROFILE.email}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
