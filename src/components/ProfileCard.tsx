import { PROFILE } from "@/data/portfolioData"
import { ArrowUpRight } from "lucide-react"

export default function ProfileCard() {
  return (
    <aside className="w-full lg:w-[320px] lg:sticky lg:top-24 shrink-0">
      <div className="solid-card p-6 flex flex-col items-center text-center">
        {/* Monogram Art Box (Clean, Geometric, NO photo) */}
        <div className="w-full h-56 rounded-xl bg-[#f46c38] flex items-center justify-center relative overflow-hidden mb-6 shadow-inner select-none">
          {/* Subtle orbital geometric lines */}
          <div className="absolute w-48 h-48 rounded-full border border-black/20 pointer-events-none" />
          <div className="absolute w-64 h-32 rounded-full border border-black/20 rotate-45 pointer-events-none" />
          <span className="text-6xl font-black tracking-tighter text-[#151312] relative z-10">
            AC
          </span>
          <span className="absolute top-3 right-3 text-xs font-mono font-bold text-black/50">
            +
          </span>
        </div>

        {/* Name */}
        <h2 className="text-xl font-bold tracking-tight text-white mb-2 uppercase">
          {PROFILE.name}
        </h2>

        {/* Bio Description */}
        <p className="text-sm text-[#998f8f] leading-relaxed mb-4">
          A software engineer who builds reliable systems and useful products.
        </p>

        {/* Education & Status */}
        <div className="w-full py-3 border-y border-[#2a2725] mb-5 text-xs text-[#998f8f]">
          <div>Cal Poly San Luis Obispo</div>
          <div className="font-semibold text-white mt-0.5">
            B.S. Computer Science · 3.5 GPA
          </div>
        </div>

        {/* Social / Action Links */}
        <div className="w-full flex items-center justify-center gap-4 text-xs font-medium text-[#998f8f]">
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center gap-0.5"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
          <span>·</span>
          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center gap-0.5"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
          <span>·</span>
          <a
            href={PROFILE.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center gap-0.5"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>
    </aside>
  )
}
