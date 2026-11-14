import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  onNavigate: (sectionId: string) => void
}

const NAV_ITEMS = [
  { id: "experience", label: "Experience" },
  { id: "gitex", label: "Gitex" },
  { id: "guppty", label: "Guppty" },
  { id: "research", label: "Research" },
  { id: "about", label: "About" },
  { id: "blog", label: "Writing" },
]

export default function Navbar({ onNavigate }: NavbarProps) {
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
    onNavigate(id)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          : "bg-white/60 backdrop-blur-xs border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleLinkClick("top")}
          className="text-left flex items-baseline gap-2 focus:outline-none cursor-pointer group"
        >
          <span className="font-semibold text-black text-sm sm:text-base tracking-tight">
            Adrian Cardona
          </span>
          <span className="hidden md:inline text-xs text-neutral-400 font-mono">
            Cal Poly SLO
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6 md:gap-8 text-xs sm:text-sm font-medium text-neutral-600">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="hover:text-black transition-colors focus:outline-none cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA: Resume & Get in Touch (Zero Arrows) */}
        <div className="flex items-center gap-3">
          <a
            href="/ADRIAN_CARDONA_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-3 py-1.5 rounded-full text-black hover:bg-neutral-100 transition"
          >
            Resume
          </a>

          <button
            onClick={() => handleLinkClick("contact")}
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full bg-black text-white text-xs font-medium hover:bg-neutral-800 transition cursor-pointer"
          >
            Get in touch
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-1.5 rounded-md text-black hover:bg-neutral-100 transition"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-md border-b border-neutral-200 px-4 py-4 flex flex-col gap-2 shadow-lg animate-in fade-in duration-150">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="text-left px-3 py-2 rounded-lg text-sm text-black hover:bg-neutral-100 font-medium cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between px-3">
            <a
              href="/ADRIAN_CARDONA_RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-black"
            >
              Resume (PDF)
            </a>
            <button
              onClick={() => handleLinkClick("contact")}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-black text-white"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
