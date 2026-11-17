interface NavbarProps {
  onNavigate: (sectionId: string) => void
}

export default function Navbar({ onNavigate }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 pb-2 px-6 pointer-events-auto bg-transparent border-none">
      <nav className="flex items-center justify-center gap-10 sm:gap-14 text-xs sm:text-[13px] font-medium text-black tracking-tight mx-auto border-none">
        <button
          onClick={() => onNavigate("experience")}
          className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none border-none bg-transparent"
        >
          Experience
        </button>
        <button
          onClick={() => onNavigate("projects")}
          className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none border-none bg-transparent"
        >
          Projects
        </button>
        <button
          onClick={() => onNavigate("contact")}
          className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none border-none bg-transparent"
        >
          Contact
        </button>
      </nav>
    </header>
  )
}
