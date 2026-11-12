import { useState } from "react"
import {
  CheckCircle2,
  Sliders,
  Eye,
  Sparkles,
  Cpu,
  Code,
  Database,
} from "lucide-react"

export default function TenetsSection() {
  // Slider state for Card 2 split-view
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  // Position state for Card 3 floating window (0: top-left, 1: top-right, 2: bottom-left, 3: bottom-right)
  const [windowPos, setWindowPos] =
    useState<"top-left" | "top-right" | "bottom-left" | "bottom-right">(
      "top-left",
    )

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    setSliderPos(Math.round((x / rect.width) * 100))
  }

  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto text-center">
      {/* Centered Heading (Matches Cluely 'Undetectable in every way') */}
      <h2 className="section-heading text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight mb-3">
        Undetectable in every way
      </h2>
      <p className="text-[#8c929d] text-base sm:text-lg max-w-xl mx-auto mb-14">
        Suite of engineering features built into compilers, benchmarks, and
        runtimes without a trace.
      </p>

      {/* 3-Column Card Grid (Matches Cluely card-styles) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-14">
        {/* Card 1: Doesn't join meetings / Process isolation */}
        <div className="card-cluely-frame flex flex-col justify-between">
          <div className="rounded-2xl bg-white p-6 sm:p-7 border border-white/60 shadow-xs h-full flex flex-col justify-between">
            {/* Visual: Participants & Status Mock */}
            <div className="rounded-xl bg-[#f8fafc] border border-[#e5e7eb] p-4 mb-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e5e7eb] text-xs">
                <span className="font-semibold text-[#19191d]">
                  System processes (3)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 font-medium text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>No bots detected</span>
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-[#4e95ff] flex items-center justify-center">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-medium text-[#19191d]">
                        vm_core (Runtime)
                      </div>
                      <div className="text-[10px] text-[#9ca3af]">
                        0.82 ms latency
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#9ca3af] font-mono">
                    Owner
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Code className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-medium text-[#19191d]">
                        pratt_parser
                      </div>
                      <div className="text-[10px] text-[#9ca3af]">
                        Zero GC pauses
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#9ca3af] font-mono">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Database className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-medium text-[#19191d]">
                        closure_upvalues
                      </div>
                      <div className="text-[10px] text-[#9ca3af]">
                        Deterministic
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#9ca3af] font-mono">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#19191d] mb-1.5">
                Doesn&apos;t join meetings.
              </h3>
              <p className="text-xs text-[#686a71] leading-relaxed">
                Background services never join calls or halt execution for
                garbage collection pauses, keeping runtime overhead
                undetectable.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Interactive Before/After Split-View Slider */}
        <div className="card-cluely-frame flex flex-col justify-between">
          <div className="rounded-2xl bg-white p-6 sm:p-7 border border-white/60 shadow-xs h-full flex flex-col justify-between">
            {/* Interactive Split View Slider Container */}
            <div
              className="relative h-44 rounded-xl overflow-hidden mb-6 border border-[#e5e7eb] select-none cursor-ew-resize"
              onPointerDown={() => setIsDragging(true)}
              onPointerUp={() => setIsDragging(false)}
              onPointerLeave={() => setIsDragging(false)}
              onPointerMove={handlePointerMove}
            >
              {/* Layer 1: Production (Invisible to others) */}
              <div className="absolute inset-0 bg-[#f8fafc] p-3 text-xs font-mono flex flex-col justify-between">
                <div className="flex justify-between items-center text-[10px] text-[#9ca3af] border-b border-[#e5e7eb] pb-1">
                  <span>output_stream.ts</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                    Invisible to others
                  </span>
                </div>
                <div className="space-y-1 text-slate-600 text-[11px]">
                  <div>const runner = new VMRunner();</div>
                  <div>const res = await runner.execute();</div>
                  <div className="text-emerald-600">
                    &gt; Status: 200 OK (0 pauses)
                  </div>
                </div>
                <div className="text-[10px] text-[#9ca3af]">
                  Production clean output
                </div>
              </div>

              {/* Layer 2: Telemetry overlay (Visible to you) clipped by slider */}
              <div
                className="absolute inset-0 bg-[#1e2024] text-white p-3 text-xs font-mono flex flex-col justify-between border-2 border-emerald-400"
                style={{
                  clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                }}
              >
                <div className="flex justify-between items-center text-[10px] text-emerald-400 border-b border-white/10 pb-1">
                  <span>compiler_diagnostics</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    Visible to you
                  </span>
                </div>
                <div className="space-y-1 text-slate-300 text-[11px]">
                  <div>✦ AST Node: BinaryAdd(x, y)</div>
                  <div>⚡ Telemetry: 0.82ms latency</div>
                  <div className="text-emerald-400">
                    &gt; 100% Citation Grounded
                  </div>
                </div>
                <div className="text-[10px] text-white/50">
                  Live debug overlay
                </div>
              </div>

              {/* Slider Handle Divider */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-md border border-[#e5e7eb] flex items-center justify-center text-[10px] text-slate-700">
                  <Sliders className="w-3 h-3 text-[#4e95ff]" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#19191d] mb-1.5">
                Invisible to screen share.
              </h3>
              <p className="text-xs text-[#686a71] leading-relaxed">
                Clean AST validation and live telemetry stream quietly to your
                screen without showing up in host captures or logs.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Interactive Window Directional Keycaps ("Follows your eyes") */}
        <div className="card-cluely-frame flex flex-col justify-between">
          <div className="rounded-2xl bg-white p-6 sm:p-7 border border-white/60 shadow-xs h-full flex flex-col justify-between">
            {/* Visual: Stage with floating moveable window */}
            <div className="relative h-44 rounded-xl bg-gradient-to-br from-[#edf4ff] to-[#f5f9ff] border border-[#d4e4fc] p-3 overflow-hidden mb-6 flex flex-col justify-between">
              {/* Dynamic Floating HUD Window */}
              <div
                className={`w-36 rounded-lg bg-[#1e2024] text-white p-2 shadow-lg border border-white/20 transition-all duration-300 ${
                  windowPos === "top-left"
                    ? "self-start"
                    : windowPos === "top-right"
                      ? "self-end"
                      : windowPos === "bottom-left"
                        ? "self-start mt-auto"
                        : "self-end mt-auto"
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[9px] text-white/50 ml-1 font-mono">
                    AST HUD
                  </span>
                </div>
                <div className="text-[10px] text-white/80 font-mono">
                  &gt; Upvalues: 2
                </div>
              </div>

              {/* Directional Keypad Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-[#d4e4fc]/60">
                <span className="text-[11px] text-[#686a71] font-medium">
                  Reposition window:
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setWindowPos("top-left")}
                    className={`w-6 h-6 rounded-md text-[10px] font-bold border transition ${
                      windowPos === "top-left"
                        ? "bg-[#4e95ff] text-white border-[#4e95ff]"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    ↖
                  </button>
                  <button
                    onClick={() => setWindowPos("top-right")}
                    className={`w-6 h-6 rounded-md text-[10px] font-bold border transition ${
                      windowPos === "top-right"
                        ? "bg-[#4e95ff] text-white border-[#4e95ff]"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    ↗
                  </button>
                  <button
                    onClick={() => setWindowPos("bottom-left")}
                    className={`w-6 h-6 rounded-md text-[10px] font-bold border transition ${
                      windowPos === "bottom-left"
                        ? "bg-[#4e95ff] text-white border-[#4e95ff]"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    ↙
                  </button>
                  <button
                    onClick={() => setWindowPos("bottom-right")}
                    className={`w-6 h-6 rounded-md text-[10px] font-bold border transition ${
                      windowPos === "bottom-right"
                        ? "bg-[#4e95ff] text-white border-[#4e95ff]"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    ↘
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#19191d] mb-1.5">
                Follows your focus.
              </h3>
              <p className="text-xs text-[#686a71] leading-relaxed">
                Reposition telemetry windows across screen quadrants using
                intuitive keyboard shortcuts without interrupting workflow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ouckah-style 4-Bucket Technical Skills Taxonomy */}
      <div className="pt-10 border-t border-[#e5e7eb] text-left">
        <div className="mb-6 text-center">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#4e95ff] mb-1">
            // Technical Skills &amp; Tooling
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#19191d] tracking-tight">
            Languages, Frameworks &amp; Infrastructure
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e5e7eb]">
            <div className="text-xs font-mono font-bold text-[#19191d] uppercase tracking-wider mb-2.5">
              Languages
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs text-[#4b4b5c]">
              {[
                "Python",
                "TypeScript",
                "JavaScript",
                "Rust",
                "Java",
                "C++",
                "SQL",
                "HTML/CSS",
              ].map((l) => (
                <span
                  key={l}
                  className="px-2 py-0.5 rounded bg-white border border-slate-200/80 font-mono text-[11px]"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e5e7eb]">
            <div className="text-xs font-mono font-bold text-[#19191d] uppercase tracking-wider mb-2.5">
              Frameworks
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs text-[#4b4b5c]">
              {["React", "Next.js", "Node.js", "FastAPI"].map((f) => (
                <span
                  key={f}
                  className="px-2 py-0.5 rounded bg-white border border-slate-200/80 font-mono text-[11px]"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e5e7eb]">
            <div className="text-xs font-mono font-bold text-[#19191d] uppercase tracking-wider mb-2.5">
              Tools
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs text-[#4b4b5c]">
              {[
                "Git",
                "GitHub Actions",
                "Docker",
                "Sentry",
                "Power Automate",
              ].map((d) => (
                <span
                  key={d}
                  className="px-2 py-0.5 rounded bg-white border border-slate-200/80 font-mono text-[11px]"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e5e7eb]">
            <div className="text-xs font-mono font-bold text-[#19191d] uppercase tracking-wider mb-2.5">
              AI &amp; Developer Tools
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs text-[#4b4b5c]">
              {[
                "Cursor",
                "Codex",
                "Antigravity",
                "Claude Code",
                "GitHub Copilot",
                "Gemini",
                "LlamaIndex",
                "RAG",
              ].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-white border border-slate-200/80 font-mono text-[11px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
