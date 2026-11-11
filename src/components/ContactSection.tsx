import { useState, type FormEvent } from "react"
import { Copy, Check, Send } from "lucide-react"
import { PROFILE } from "@/data/portfolioData"

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") || "")
    const email = String(data.get("email") || "")
    const message = String(data.get("message") || "")
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(
      `${message}\n\nFrom: ${name}\nEmail: ${email}`,
    )
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="pt-4">
      <h2 className="section-heading">
        LET&apos;S WORK <span>TOGETHER</span>
      </h2>

      <div className="solid-card p-6 sm:p-8">
        <form onSubmit={sendMessage} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#998f8f]">
              Name
              <input
                name="name"
                required
                className="w-full mt-2 px-4 py-3 rounded-lg bg-[#151312] border border-[#2e2b29] text-white placeholder-[#6a6b6e] text-sm focus:outline-none focus:border-[#f46c38] transition"
                placeholder="Steve Jobs"
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-wider text-[#998f8f]">
              Email
              <input
                name="email"
                type="email"
                required
                className="w-full mt-2 px-4 py-3 rounded-lg bg-[#151312] border border-[#2e2b29] text-white placeholder-[#6a6b6e] text-sm focus:outline-none focus:border-[#f46c38] transition"
                placeholder="name@apple.com"
              />
            </label>
          </div>

          <label className="block text-xs font-semibold uppercase tracking-wider text-[#998f8f]">
            Message
            <textarea
              name="message"
              rows={4}
              required
              className="w-full mt-2 px-4 py-3 rounded-lg bg-[#151312] border border-[#2e2b29] text-white placeholder-[#6a6b6e] text-sm focus:outline-none focus:border-[#f46c38] transition resize-none"
              placeholder="Your message..."
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button type="submit" className="solid-btn-primary">
              <span>Submit Message</span>
              <Send className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="solid-btn-secondary !text-xs !py-2"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{PROFILE.email}</span>
                </>
              )}
            </button>
          </div>

          {sent && (
            <div className="text-xs text-emerald-400 mt-2">
              ✓ Email client launched with pre-filled details.
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
