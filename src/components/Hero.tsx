import { useState } from "react"
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Download,
  Terminal,
  Play,
  CheckCircle2,
  Cpu,
  Layers,
} from "lucide-react"
import { PROFILE } from "@/data/portfolioData"

interface HeroProps {
  onExploreWork: () => void
  onReadBlog: () => void
}

type TabType = "guppty" | "gitex" | "runner"

export default function Hero({ onExploreWork, onReadBlog }: HeroProps) {
  const [activeTab, setActiveTab] = useState<TabType>("guppty")
  const [isRunning, setIsRunning] = useState(false)
  const [runSuccess, setRunSuccess] = useState(false)

  const handleSimulateRun = () => {
    setIsRunning(true)
    setRunSuccess(false)
    setTimeout(() => {
      setIsRunning(false)
      setRunSuccess(true)
      setTimeout(() => setRunSuccess(false), 3000)
    }, 600)
  }

  return (
    <section
      id="overview"
      className="relative min-h-[96vh] pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Subtle Apple Ambient Lighting */}
      <div className="ambient-glow bg-blue-500/15 top-12 left-1/2 -translate-x-1/2 w-[700px] h-[500px]" />
      <div className="ambient-glow bg-purple-500/10 top-36 left-1/3 -translate-x-1/2 w-[450px] h-[450px]" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Apple Pill Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-md mb-6 animate-in fade-in duration-700">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
          <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-300">
            Systems & Infrastructure · Cal Poly SLO
          </span>
        </div>

        {/* Apple Display Headline */}
        <h1 className="apple-headline apple-gradient-text text-4xl sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl tracking-[-0.04em] font-bold mb-6">
          Architected for speed.
          <br />
          <span className="text-neutral-400">Engineered for truth.</span>
        </h1>

        {/* Subtitle */}
        <p className="apple-subhead text-neutral-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          Undergraduate researcher at Cal Poly CSSE and software engineer
          building compilers in Rust, deterministic research engines, and
          zero-hallucination AI pipelines.
        </p>

        {/* Apple Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
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
            <span>Resume (PDF)</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </a>
        </div>

        {/* Flagship Interactive Developer Console (No Images, Pure Systems Craft) */}
        <div className="w-full max-w-4xl relative">
          <div className="rounded-3xl overflow-hidden border border-white/12 bg-neutral-950/80 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-2 sm:p-3 relative">
            {/* Top Specular Hairline */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Console Bar */}
            <div className="px-4 py-3 bg-neutral-900/90 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Interactive Tabs */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setActiveTab("guppty")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
                    activeTab === "guppty"
                      ? "bg-white/15 text-white shadow-sm border border-white/15"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>Guppty VM (Rust)</span>
                </button>

                <button
                  onClick={() => setActiveTab("gitex")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
                    activeTab === "gitex"
                      ? "bg-white/15 text-white shadow-sm border border-white/15"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>Gitex AI (TS)</span>
                </button>

                <button
                  onClick={() => setActiveTab("runner")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
                    activeTab === "runner"
                      ? "bg-white/15 text-white shadow-sm border border-white/15"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Experiment Runner (Python)</span>
                </button>
              </div>

              {/* Action: Run Verification Pass */}
              <button
                onClick={handleSimulateRun}
                disabled={isRunning}
                className="apple-btn-secondary !py-1 !px-3 !text-xs group focus:outline-none"
                title="Execute benchmark verification"
              >
                <Play
                  className={`w-3 h-3 text-blue-400 ${
                    isRunning
                      ? "animate-spin"
                      : "group-hover:scale-110 transition"
                  }`}
                />
                <span>{isRunning ? "Running..." : "Execute Test"}</span>
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-6 bg-black/90 rounded-2xl mt-2 text-left font-mono text-xs sm:text-[13px] leading-relaxed border border-white/5 overflow-x-auto min-h-[220px] flex flex-col justify-between">
              {activeTab === "guppty" && (
                <div>
                  <div className="text-neutral-500 mb-2">
                    // Guppty Bytecode VM · Instruction Dispatch Loop in Rust
                  </div>
                  <div className="text-neutral-400">
                    <span className="text-blue-400">[0000]</span>{" "}
                    <span className="text-emerald-400">OP_GET_LOCAL</span>{" "}
                    <span className="text-neutral-300">offset: 1</span>{" "}
                    <span className="text-neutral-600">
                      // load &apos;x&apos;
                    </span>
                  </div>
                  <div className="text-neutral-400">
                    <span className="text-blue-400">[0002]</span>{" "}
                    <span className="text-emerald-400">OP_CONSTANT</span>{" "}
                    <span className="text-neutral-300">
                      idx: 0 [Value::Integer(10)]
                    </span>
                  </div>
                  <div className="text-neutral-400">
                    <span className="text-blue-400">[0004]</span>{" "}
                    <span className="text-emerald-400">OP_BINARY_ADD</span>
                  </div>
                  <div className="text-neutral-400">
                    <span className="text-blue-400">[0005]</span>{" "}
                    <span className="text-purple-400">OP_CLOSURE</span>{" "}
                    <span className="text-neutral-300">
                      fn: &quot;compute_delta&quot;, upvalues: [Open(1)]
                    </span>
                  </div>
                  <div className="text-neutral-400">
                    <span className="text-blue-400">[0008]</span>{" "}
                    <span className="text-emerald-400">OP_RETURN</span>
                  </div>
                  <div className="mt-3 text-emerald-400/90 text-xs">
                    ✓ VM State: 0 runtime panics · Stack depth: 1 frame ·
                    Allocations: 0
                  </div>
                </div>
              )}

              {activeTab === "gitex" && (
                <div>
                  <div className="text-neutral-500 mb-2">
                    // Gitex Semantic Indexer & Citation Verifier
                  </div>
                  <div className="text-neutral-300">
                    &gt; Indexing repository:{" "}
                    <span className="text-purple-400">
                      adrian-1-cardona/adriancardona
                    </span>
                  </div>
                  <div className="text-neutral-400">
                    &gt; Embedding chunks with Convex Vector DB:{" "}
                    <span className="text-emerald-400">
                      128 nodes committed
                    </span>
                  </div>
                  <div className="text-neutral-400">
                    &gt; Prompt grounding contract:{" "}
                    <span className="text-blue-400">
                      STRICT_FACTUAL (temperature: 0.1)
                    </span>
                  </div>
                  <div className="text-neutral-400">
                    &gt; Citation validator:{" "}
                    <span className="text-emerald-400">
                      4 of 4 citations cross-checked
                    </span>{" "}
                    against source AST
                  </div>
                  <div className="mt-3 text-purple-400/90 text-xs">
                    ✓ Retrieval verified in 38ms · Hallucination probability:
                    0.00%
                  </div>
                </div>
              )}

              {activeTab === "runner" && (
                <div>
                  <div className="text-neutral-500 mb-2">
                    // Cal Poly CSSE Automated Experiment Orchestrator
                  </div>
                  <div className="text-neutral-400">
                    [ORCHESTRATOR] Seed 42 locked (torch.manual_seed, random,
                    numpy)
                  </div>
                  <div className="text-neutral-400">
                    [WORKER 01] Trial 1/10 spawned in isolated subprocess (PID:
                    38291)
                  </div>
                  <div className="text-neutral-400">
                    [TELEMETRY] Memory: 1.42 GB · Worker state: HEALTHY ·
                    Real-time event streaming active
                  </div>
                  <div className="text-neutral-400">
                    [CHECKPOINT] Epoch 50 completed · Snapshot saved to
                    .benchmarks/run_2026.json
                  </div>
                  <div className="mt-3 text-emerald-400/90 text-xs">
                    ✓ Pytest suite: 14 passing, 0 failing (100% deterministic
                    reproducibility)
                  </div>
                </div>
              )}

              {/* Execution feedback toast */}
              {runSuccess && (
                <div className="mt-3 pt-2 border-t border-white/10 text-xs text-emerald-400 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    Execution verified with zero errors. All assertions passed.
                  </span>
                </div>
              )}

              {/* Console Footer Status */}
              <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Interactive Systems Sandbox</span>
                </span>
                <span>
                  Active Target:{" "}
                  {activeTab === "guppty"
                    ? "x86_64-apple-darwin"
                    : activeTab === "gitex"
                      ? "production-edge"
                      : "calpoly-csse-harness"}
                </span>
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
