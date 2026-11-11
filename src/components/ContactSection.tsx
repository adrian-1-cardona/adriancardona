import { useState, type FormEvent } from "react"
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  CheckCircle2,
} from "lucide-react"
import { PROFILE } from "@/data/portfolioData"

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") || "")
    const email = String(data.get("email") || "")
    const role = String(data.get("role") || "General Inquiry")
    const message = String(data.get("message") || "")

    const subject = encodeURIComponent(`[Portfolio] ${role} - from ${name}`)
    const body = encodeURIComponent(
      `${message}\n\n---\nSender: ${name}\nEmail: ${email}\nRole / Topic: ${role}`,
    )

    // Open user's email client
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`

    setSubmitted(true)
    form.reset()
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="apple-eyebrow mb-2">Connect & Collaborate</div>
        <h2 className="apple-headline apple-gradient-text text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          Start a conversation.
        </h2>
        <p className="text-neutral-400 text-base sm:text-lg">
          Currently open to software engineering internships and full-time
          opportunities for 2026.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Contact Info & Quick Actions */}
        <div className="lg:col-span-5 apple-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div>
            <div className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2">
              Direct Contact
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight mb-4">
              Get in touch
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Whether discussing systems architecture, compilers in Rust, AI
              research, or engineering opportunities, my inbox is always open.
            </p>

            {/* Email Box */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-6">
              <div className="text-[11px] text-neutral-400 font-medium mb-1">
                Email address
              </div>
              <div className="text-sm sm:text-base font-semibold text-white break-all mb-3">
                {PROFILE.email}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="apple-btn-secondary !py-1 !px-3 !text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${PROFILE.email}`}
                  className="apple-btn-secondary !py-1 !px-3 !text-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Mail</span>
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-white/[0.06] space-y-2">
            <div className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider mb-2">
              Profiles & Documents
            </div>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-sm text-neutral-300 hover:text-white py-1.5 transition group"
            >
              <span>LinkedIn / in / adrian-cardona</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </a>
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-sm text-neutral-300 hover:text-white py-1.5 transition group"
            >
              <span>GitHub / adrian-1-cardona</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </a>
            <a
              href={PROFILE.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-sm text-neutral-300 hover:text-white py-1.5 transition group"
            >
              <span>Curriculum Vitae (PDF)</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </a>
          </div>
        </div>

        {/* Right: Clean Inquiry Form */}
        <div className="lg:col-span-7 apple-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Send a direct message
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mb-6">
            Fill out the form below to launch your email client with
            pre-formatted details.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Your Name *
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Steve Wozniak"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/[0.07] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Your Email *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/[0.07] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                Subject / Topic
              </label>
              <input
                name="role"
                type="text"
                placeholder="Software Engineering Role / Project Inquiry"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/[0.07] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                Message *
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Hello Adrian, we saw your work on Guppty and Gitex..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500 focus:bg-white/[0.07] transition resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button type="submit" className="apple-btn-primary group">
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {submitted && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Draft generated in mail client</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
