import { useEffect, useState } from "react"
import { FileText, Menu, X, ArrowUpRight } from "lucide-react"

interface NavbarProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
  onOpenBlog?: () => void
}

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "blog", label: "Blog" },
  { id: "architecture", label: "Stack" },
  { id: "principles", label: "Principles" },
  { id: "contact", label: "Contact" },
]

export default function Navbar({
  activeSection,
  onNavigate,
  onOpenBlog,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false)
    if (id === "blog" && onOpenBlog) {
      onOpenBlog()
    }
    onNavigate(id)
  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl transition-all duration-300">
      <nav
        className={`apple-nav-blur rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled
            ? "shadow-[0_12px_40px_rgba(0,0,0,0.8)] border-white/15"
            : "shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
        }`}
      >
        {/* Brand / Name */}
        <button
          onClick={() => handleLinkClick("overview")}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
          <span className="font-semibold text-sm tracking-tight text-white group-hover:text-neutral-300 transition">
            Adrian Cardona
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 focus:outline-none ${
                  isActive
                    ? "text-white bg-white/10 shadow-sm"
                    : "text-[#86868b] hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/ADRIAN_CARDONA_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-neutral-300 hover:text-white rounded-full hover:bg-white/10 transition"
            title="Download Adrian Cardona's Resume"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          <button
            onClick={() => handleLinkClick("contact")}
            className="apple-btn-primary !py-1 !px-3.5 !text-xs"
          >
            Contact
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-neutral-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 apple-nav-blur rounded-2xl p-4 shadow-2xl border border-white/10 flex flex-col gap-1 backdrop-blur-3xl animate-in fade-in slide-in-from-top-2 duration-200">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition text-left ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-neutral-500">→</span>
              </button>
            )
          })}
          <div className="pt-2 mt-1 border-t border-white/10 flex items-center justify-between px-2">
            <a
              href="/ADRIAN_CARDONA_RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white py-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Resume (PDF)</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
            <span className="text-[11px] text-neutral-500">Cal Poly SLO</span>
          </div>
        </div>
      )}
    </header>
  )
}
