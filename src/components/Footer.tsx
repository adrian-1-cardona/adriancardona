import { PROFILE } from "@/data/portfolioData"

export default function Footer() {
  return (
    <footer className="pt-16 pb-12 border-t border-[#2a2725] text-xs text-[#6a6b6e] flex flex-col sm:flex-row items-center justify-between gap-4">
      <span>Adrian Cardona © 2026</span>
      <a
        href={`mailto:${PROFILE.email}`}
        className="text-[#998f8f] hover:text-white transition"
      >
        {PROFILE.email}
      </a>
    </footer>
  )
}
