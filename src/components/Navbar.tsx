import { useState } from "react"
import { FileText, Menu, X, ArrowUpRight } from "lucide-react"

interface NavbarProps {
  onNavigate: (sectionId: string) => void
}

const NAV_ITEMS = [
  { id: "systems", label: "Systems" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "blog", label: "Blog" },
  { id: "faq", label: "FAQ" },
]

export default function Navbar({ onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false)
    onNavigate(id)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e5e7eb] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleLinkClick("top")}
          className="text-left font-bold text-[#37383c] tracking-tight text-base sm:text-lg flex items-center gap-2 focus:outline-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#4e95ff]" />
          <span>Adrian Cardona</span>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#686a71]">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="hover:text-[#37383c] transition focus:outline-none"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="/ADRIAN_CARDONA_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#686a71] hover:text-[#37383c] px-3 py-1.5 rounded-full hover:bg-slate-100 transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          <button
            onClick={() => handleLinkClick("contact")}
            className="btn-primary !text-xs !py-1.5 !px-4"
          >
            <span>Get in Touch</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#686a71] hover:text-[#37383c] p-1"
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
        <div className="md:hidden bg-white border-b border-[#e5e7eb] px-4 py-4 flex flex-col gap-2 shadow-lg animate-in fade-in duration-150">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="text-left px-3 py-2 rounded-lg text-sm text-[#37383c] hover:text-[#4e95ff] hover:bg-slate-50 font-medium"
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
            <ArrowUpRight className="w-4 h-4 opacity-50" />
          </a>
        </div>
      )}
    </header>
  )
}
