import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import { PROJECTS } from "@/data/portfolioData"

export default function SelectedWorkSection() {
  const guppty = PROJECTS.find((p) => p.id === "guppty") || PROJECTS[0]
  const gitex = PROJECTS.find((p) => p.id === "gitex") || PROJECTS[1]

  return (
    <section id="systems" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Centered Heading (Matches Cluely 'How Cluely helps during a meeting') */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3">
          How Adrian builds reliable software
        </h2>
        <p className="text-[#8c929d] text-base sm:text-lg">
          Purpose-built engineering from low-level compiler virtual machines to
          enterprise AI pipelines.
        </p>
      </div>

      {/* Two Large Cards (Matches Cluely Left Blue + Right Pale Gray) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Card: Vibrant Blue Card (Guppty - Matches Cluely Blue Waveform Card) */}
        <div className="rounded-3xl bg-gradient-to-br from-[#4e95ff] to-[#2f7bf2] text-white p-8 flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-100 mb-2">
              Systems &amp; Compilers
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
              {guppty.name}: Bytecode Virtual Machine
            </h3>
            <p className="text-blue-50/90 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {guppty.description}
            </p>

            {/* Audio Waveform / Bytecode Stream Mock (Matches Cluely) */}
            <div className="rounded-2xl bg-white/15 border border-white/20 p-5 shadow-xs mb-6 text-left backdrop-blur-xs">
              <div className="flex items-center justify-between text-xs text-blue-100 mb-3 font-mono">
                <span className="font-semibold text-white">
                  VM Execution Stream
                </span>
                <span>00:02 · 1.2M cycles/sec</span>
              </div>

              {/* Simulated Waveform bars in Crisp White */}
              <div className="flex items-center gap-1.5 h-12 py-2">
                {[
                  40, 65, 30, 85, 95, 55, 75, 45, 90, 100, 60, 40, 80, 50, 70,
                  35, 90, 60, 45, 75, 50, 65,
                ].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-white rounded-full transition-all duration-300 opacity-90 hover:opacity-100"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-blue-100">
                <span>Pratt AST → Bytecode Chunk</span>
                <span className="font-semibold text-white">Zero Panic</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/20 text-xs">
            <span className="font-mono text-blue-100">
              Rust · VM · Pratt Parser
            </span>
            <a
              href="https://adrian-1-cardona.github.io/Guppty/#installation"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:underline inline-flex items-center gap-1"
            >
              <span>Documentation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Card: Pale Cool-Gray Card (Gitex - Matches Cluely Right Card) */}
        <div className="rounded-3xl bg-[#f0f3f8] border border-slate-200/70 p-8 flex flex-col justify-between shadow-xs">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#9ca3af] mb-2">
              Full-Stack AI Platform
            </div>
            <h3 className="text-2xl font-bold text-[#37383c] tracking-tight mb-3">
              {gitex.name}: Grounded Codebase Intelligence
            </h3>
            <p className="text-[#686a71] text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {gitex.description}
            </p>

            {/* Visual: Grounding & Citation Panel */}
            <div className="rounded-2xl bg-[#1e2024] text-slate-200 p-5 shadow-sm mb-6 text-left font-mono text-xs border border-[#37383c]">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 mb-3 border-b border-[#37383c]">
                <span>query_stream: &quot;trace closure resolution&quot;</span>
                <span className="text-emerald-400">Score: 0.942</span>
              </div>
              <div className="space-y-1.5 text-slate-300 text-[11px]">
                <div className="text-[#4e95ff]">
                  &gt; Vector embedding matched chunk:
                </div>
                <div className="bg-[#26282d] p-2 rounded border border-[#37383c] text-slate-300">
                  compiler/vm.rs:L142-168 (Upvalue capture)
                </div>
                <div className="text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Grounding verification: 100% verified against AST</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
            <span className="font-mono text-[#686a71]">
              TypeScript · Convex · Gemini API
            </span>
            <a
              href="https://gitex.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#4e95ff] hover:text-[#3a85f5] inline-flex items-center gap-1"
            >
              <span>Visit Gitex.dev</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
