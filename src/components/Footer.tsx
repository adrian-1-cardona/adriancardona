import { ArrowUp, ArrowUpRight } from "lucide-react"
import { PROFILE } from "@/data/portfolioData"

export default function Footer({ onScrollTop }: { onScrollTop: () => void }) {
  return (
    <footer className="border-t border-white/[0.08] bg-black/90 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
        {/* Left */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="text-neutral-300 font-medium">{PROFILE.name}</span>
          <span className="hidden sm:inline">·</span>
          <span>Computer Science @ Cal Poly SLO</span>
          <span className="hidden sm:inline">·</span>
          <span>© 2026</span>
        </div>

        {/* Middle Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-neutral-400">
          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition inline-flex items-center gap-1"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition inline-flex items-center gap-1"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
          <a
            href={PROFILE.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition inline-flex items-center gap-1"
          >
            <span>Resume (PDF)</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
        </div>

        {/* Right Scroll Top */}
        <button
          onClick={onScrollTop}
          className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition focus:outline-none"
          title="Back to top"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  )
}
