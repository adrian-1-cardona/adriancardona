import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  onNavigate: (sectionId: string) => void
}

const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
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
          ? "bg-white/90 backdrop-blur-md border-b border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          : "bg-white/70 backdrop-blur-xs border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand: Adrian Cardona */}
        <button
          onClick={() => handleLinkClick("top")}
          className="text-left focus:outline-none cursor-pointer"
        >
          <span className="font-semibold text-black text-sm sm:text-base tracking-tight hover:opacity-80 transition">
            Adrian Cardona
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-7 md:gap-9 text-xs sm:text-sm font-medium text-neutral-600">
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

        {/* Right Action: Understated Resume Link */}
        <div className="flex items-center gap-3">
          <a
            href="/ADRIAN_CARDONA_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-medium text-neutral-600 hover:text-black transition px-2 py-1"
          >
            Resume
          </a>

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
              className="text-left py-2 text-sm font-medium text-neutral-700 hover:text-black transition"
            >
              {item.label}
            </button>
          ))}
          <a
            href="/ADRIAN_CARDONA_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-left py-2 text-sm font-medium text-neutral-700 hover:text-black transition"
          >
            Resume (PDF)
          </a>
        </div>
      )}
    </header>
  )
}
