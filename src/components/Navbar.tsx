interface NavbarProps {
  onNavigate: (sectionId: string) => void
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const handleLinkClick = (id: string) => {
    onNavigate(id)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-5 sm:py-6 px-6 pointer-events-auto">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Invisible spacer for balance */}
        <div className="w-16 hidden sm:block" />

        {/* Centered Minimal Navigation matching the user's mockup */}
        <nav className="flex items-center gap-7 sm:gap-9 text-xs sm:text-[13px] font-medium text-neutral-800 tracking-tight mx-auto">
          <button
            onClick={() => handleLinkClick("experience")}
            className="hover:text-black transition-colors focus:outline-none cursor-pointer"
          >
            Experience
          </button>
          <button
            onClick={() => handleLinkClick("projects")}
            className="hover:text-black transition-colors focus:outline-none cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={() => handleLinkClick("contact")}
            className="hover:text-black transition-colors focus:outline-none cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Understated Resume Link */}
        <div className="w-16 text-right">
          <a
            href="/ADRIAN_CARDONA_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-[13px] font-medium text-neutral-600 hover:text-black transition"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  )
}
