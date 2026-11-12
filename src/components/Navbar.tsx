import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  onNavigate: (sectionId: string) => void
}

const NAV_ITEMS = [
  { id: "experience", label: "Experience" },
  { id: "systems", label: "Projects" },
  { id: "tenets", label: "Architecture" },
  { id: "blog", label: "Blog" },
  { id: "faq", label: "FAQ" },
]

export default function Navbar({ onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false)
    onNavigate(id)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] shadow-xs text-[#37383c]"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand & Nav items clustered on left (Matches Cluely nav) */}
        <div className="flex items-center gap-7 md:gap-9">
          <button
            onClick={() => handleLinkClick("top")}
            className="text-left font-bold tracking-tight text-base sm:text-lg flex items-center gap-2 focus:outline-none cursor-pointer"
          >
            <span className="font-semibold tracking-tight">Adrian Cardona</span>
          </button>

          {/* Desktop & Tablet Links (visible from sm breakpoint upwards) */}
          <nav
            className={`hidden sm:flex items-center gap-5 md:gap-7 text-xs sm:text-sm font-medium transition-colors ${
              scrolled ? "text-[#686a71]" : "text-white/85"
            }`}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`transition focus:outline-none cursor-pointer ${
                  scrolled ? "hover:text-[#37383c]" : "hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="/ADRIAN_CARDONA_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full transition ${
              scrolled
                ? "text-[#686a71] hover:text-[#37383c] hover:bg-slate-100"
                : "text-white/80 hover:text-white"
            }`}
          >
            <span>Resume ↗</span>
          </a>

          {scrolled && (
            <button
              onClick={() => handleLinkClick("contact")}
              className="btn-cluely-cta !text-xs !py-1.5 !px-4 animate-in fade-in cursor-pointer"
            >
              <span>Get in Touch</span>
            </button>
          )}

          {/* Mobile menu toggle (visible strictly on mobile screens < sm) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`sm:hidden p-1.5 rounded-md ${
              scrolled
                ? "text-[#686a71] hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white text-[#37383c] border-b border-[#e5e7eb] px-4 py-4 flex flex-col gap-2 shadow-lg animate-in fade-in duration-150">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="text-left px-3 py-2 rounded-lg text-sm text-[#37383c] hover:text-[#4e95ff] hover:bg-slate-50 font-medium cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <a
            href="/ADRIAN_CARDONA_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-sm font-medium text-[#37383c] hover:text-[#4e95ff]"
          >
            <span>View Resume (PDF)</span>
            <span className="text-xs opacity-60">↗</span>
          </a>
        </div>
      )}
    </header>
  )
}
