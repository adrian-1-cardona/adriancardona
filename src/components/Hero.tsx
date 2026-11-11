import { ArrowDown, ArrowUpRight, BookOpen, Download } from "lucide-react"
import { PROFILE } from "@/data/portfolioData"

interface HeroProps {
  onExploreWork: () => void
  onReadBlog: () => void
}

export default function Hero({ onExploreWork, onReadBlog }: HeroProps) {
  return (
    <section
      id="overview"
      className="relative min-h-[92vh] pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Subtle Apple Ambient Glows */}
      <div className="ambient-glow bg-blue-500/15 top-12 left-1/2 -translate-x-1/2 w-[700px] h-[500px]" />
      <div className="ambient-glow bg-purple-500/10 top-40 left-1/3 -translate-x-1/2 w-[400px] h-[400px]" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-md mb-6 animate-in fade-in duration-700">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-300">
            {PROFILE.eyebrow} · Cal Poly SLO
          </span>
        </div>

        {/* Apple Display Headline */}
        <h1 className="apple-headline apple-gradient-text text-4xl sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl tracking-[-0.04em] font-bold mb-6">
          Engineering systems.
          <br />
          <span className="text-neutral-400">Building for what’s next.</span>
        </h1>

        {/* Subtitle */}
        <p className="apple-subhead text-neutral-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          {PROFILE.bio}
        </p>

        {/* Apple Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
          <button onClick={onExploreWork} className="apple-btn-primary group">
            <span>Explore Work</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button onClick={onReadBlog} className="apple-btn-secondary group">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Read Engineering Blog</span>
          </button>

          <a
            href={PROFILE.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-btn-secondary group"
          >
            <Download className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </a>
        </div>

        {/* Flagship Profile Presentation Card */}
        <div className="w-full max-w-3xl relative">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/60 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] p-2 sm:p-3">
            {/* Top Specular Line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="relative rounded-2xl overflow-hidden bg-black aspect-[16/9] sm:aspect-[21/10] max-h-[440px]">
              <img
                src="/adrian-portrait-desktop.webp"
                alt="Adrian Cardona"
                className="w-full h-full object-cover object-[center_32%] filter contrast-[1.03] brightness-[0.96]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Inset Badge Info */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-left">
                <div>
                  <div className="text-white font-semibold text-lg sm:text-xl tracking-tight">
                    Adrian Cardona
                  </div>
                  <div className="text-neutral-400 text-xs sm:text-sm">
                    Software Engineering Intern & Undergraduate Researcher
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl text-xs text-neutral-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Available for 2026 Opportunities</span>
                </div>
              </div>
            </div>

            {/* Apple Spec Sheet Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-5 pb-2 px-2 border-t border-white/[0.08] mt-2">
              <div className="text-left px-2">
                <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                  Experience
                </div>
                <div className="text-base sm:text-xl font-semibold text-white tracking-tight mt-0.5">
                  4 Roles
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-400 hidden sm:block">
                  Industry & Academic Research
                </div>
              </div>
              <div className="text-left px-2 border-l border-white/[0.08]">
                <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                  Core Stack
                </div>
                <div className="text-base sm:text-xl font-semibold text-white tracking-tight mt-0.5">
                  Rust · TS · Py
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-400 hidden sm:block">
                  Compilers, Web & Pipelines
                </div>
              </div>
              <div className="text-left px-2 border-l border-white/[0.08]">
                <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                  Education
                </div>
                <div className="text-base sm:text-xl font-semibold text-white tracking-tight mt-0.5">
                  3.5 GPA
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-400 hidden sm:block">
                  Cal Poly San Luis Obispo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
