import { useState } from "react"
import { FileText, Menu, X } from "lucide-react"

interface NavbarProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

const NAV_ITEMS = [
  { id: "top", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "tools", label: "Tools" },
  { id: "blog", label: "Blog" },
  { id: "thoughts", label: "Thoughts" },
  { id: "contact", label: "Contact" },
]

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false)
    onNavigate(id)
  }

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <nav className="solid-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={isActive ? "is-active font-semibold" : ""}
            >
              {item.label}
            </button>
          )
        })}

        <a
          href="/ADRIAN_CARDONA_RESUME.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 text-[#f46c38] font-medium"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Resume</span>
        </a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden text-neutral-400 hover:text-white p-1"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 bg-[#1c1a19] border border-[#2e2b29] rounded-xl p-3 shadow-2xl flex flex-col gap-1 w-64 mx-auto animate-in fade-in duration-150">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="text-left px-3 py-2 rounded-lg text-sm text-[#998f8f] hover:text-white hover:bg-[#252220] transition"
            >
              {item.label}
            </button>
          ))}
          <a
            href="/ADRIAN_CARDONA_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm text-[#f46c38] border-t border-[#2e2b29] mt-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume (PDF)</span>
          </a>
        </div>
      )}
    </header>
  )
}
