import { useState, useEffect } from "react"

// Dynamic execution waveform distribution: tall ends, quiet center
const BASE_WAVEFORM = [
  16, 26, 38, 30, 20, 14, 10, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 4, 4, 4, 4, 6, 10, 16, 24, 38, 28, 18, 10,
]

export default function SelectedWorkSection() {
  const [seconds, setSeconds] = useState(12)
  const [leftActiveChip, setLeftActiveChip] = useState("Differential Tests")
  const [rightActiveChip, setRightActiveChip] = useState("Grounded Retrieval")
  const [isWindowHidden, setIsWindowHidden] = useState(false)
  const [isVmRunning, setIsVmRunning] = useState(false)
  const [vmCycleCount, setVmCycleCount] = useState(1420)
  const [queryInput, setQueryInput] = useState("")

  // Live timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev >= 59 ? 0 : prev + 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedTimer = `00:${seconds < 10 ? `0${seconds}` : seconds}`

  // Guppty Rust VM interactive prompts & state (Resume verified)
  const leftPromptMap: Record<string, string> = {
    "Lexer & Parser":
      'guppty::parse("fn main() { return (x * 2) + y; }") => AST(Ok)',
    "Bytecode Compiler":
      "emit_bytecodes() => [OP_GET_LOCAL, OP_PUSH_CONST, OP_MULTIPLY, OP_RETURN]",
    "Stack VM":
      "Stack[0]: 42 (i64) · Stack[1]: 108 (i64) · SP: 0x7FFF · 0.42 μs dispatch",
    "Differential Tests":
      "cargo test: 38+ tests verify VM and AST interpreter produce identical behavior",
  }

  // Gitex Codebase AI answers matching the active chip (Resume verified)
  const gitexAnswers: Record<string, { prompt: string; body: string }> = {
    "Grounded Retrieval": {
      prompt: "Query: \"Explain lexer closure handling and span-aware error syntax\"",
      body: "Retrieved 4 grounded code chunks via Convex vector search. Citation from src/compiler/lexer.rs: Single-pass recursive descent compiler emitting compact opcodes with span-aware syntax errors.",
    },
    "Refusal Accuracy": {
      prompt: "Query: \"Query missing database migration schema in foreign scope\"",
      body: "Evaluation result: 100% refusal accuracy across 31 benchmark queries. Correctly refused answer due to missing symbol scope in repository index without hallucinating.",
    },
    "Auth & Billing": {
      prompt: "Query: \"Verify Clerk JWT auth middleware and Stripe webhook lifecycle\"",
      body: "Engineered production-grade authentication with Clerk, tier-based rate limiting, and Stripe webhook subscription verification with zero unhandled exceptions.",
    },
    "160+ Tests": {
      prompt: "Query: \"Run CI retrieval evaluation and security test suite\"",
      body: "CI run complete: 160+ automated tests passing in GitHub Actions. Retrieval accuracy threshold (100% groundedness) verified prior to merge.",
    },
  }

  // Interactive VM execution trigger
  const handleExecuteVm = () => {
    setIsVmRunning(true)
    setVmCycleCount((prev) => prev + 64)
    setTimeout(() => {
      setIsVmRunning(false)
    }, 600)
  }

  return (
    <section
      id="systems"
      className="scroll-mt-24 py-24 px-4 sm:px-6 max-w-6xl mx-auto text-left"
    >
      {/* Section Heading: Authentic Engineering Focus */}
      <div className="mb-10 text-left">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#4e95ff] mb-2">
          // Featured Technical Projects
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#19191d] tracking-[-0.5px] leading-tight">
          Systems programming and grounded code retrieval
        </h2>
        <p className="text-sm sm:text-base text-[#686a71] mt-2 max-w-2xl font-normal">
          Interactive execution environments for Guppty (Rust VM) and Gitex
          (GitHub codebase Q&amp;A platform).
        </p>
      </div>

      {/* Two Large Side-by-Side Cards (md:grid-cols-2 for desktop/laptop parity) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* ========================================================
            LEFT CARD: Guppty Programming Language & Bytecode VM (Rust)
           ======================================================== */}
        <div
          className="relative flex flex-col justify-between gap-6 rounded-[32px] sm:rounded-[36px] p-7 sm:p-9 lg:p-10 text-white overflow-hidden shadow-xl"
          style={{
            background:
              "linear-gradient(180deg, #649aff 0%, #4f87f6 60%, #457ef4 100%)",
            boxShadow:
              "inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 20px 40px -15px rgba(68, 122, 235, 0.35)",
          }}
        >
          {/* Card Top: Title with Inline Waveform Pill */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-blue-100 mb-2">
              <span className="uppercase tracking-wider font-semibold">
                Guppty // Rust Compiler &amp; VM
              </span>
              <a
                href="https://adrian-1-cardona.github.io/Guppty/#installation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition font-medium"
              >
                Documentation ↗
              </a>
            </div>

            <h3 className="text-2xl sm:text-[28px] lg:text-[31px] leading-tight font-medium tracking-[-0.5px] text-white flex items-center flex-wrap gap-2 mb-3">
              <span>Guppty</span>
              <span className="-mx-0.5 inline-flex -translate-y-0.5 items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 align-middle shadow-[inset_1px_1px_4px_rgba(255,255,255,0.4)] backdrop-blur-md text-xs sm:text-sm font-medium text-white">
                <span className="inline-flex items-center gap-[2.5px] h-3.5">
                  <span
                    className={`w-[2.5px] bg-white rounded-full transition-all duration-200 ${
                      isVmRunning ? "h-4" : "h-2 animate-pulse"
                    }`}
                  />
                  <span
                    className={`w-[2.5px] bg-white rounded-full transition-all duration-200 ${
                      isVmRunning ? "h-2" : "h-3.5"
                    }`}
                  />
                  <span
                    className={`w-[2.5px] bg-white rounded-full transition-all duration-200 ${
                      isVmRunning ? "h-4" : "h-2 animate-pulse"
                    }`}
                  />
                </span>
                <span>compiles</span>
              </span>
              <span>and executes Rust bytecode</span>
            </h3>
            <p className="text-white/85 text-sm sm:text-[14px] leading-relaxed font-normal max-w-lg">
              Built a programming language in Rust with a lexer, parser,
              bytecode compiler, and stack VM, supporting closures, functions,
              control flow, and span-aware runtime errors.
            </p>
          </div>

          {/* Running Telemetry & Active Status */}
          <div className="flex flex-col items-center justify-center my-3 select-none">
            <span className="text-4xl sm:text-5xl lg:text-[56px] leading-none font-semibold tracking-[-0.5px] text-white font-mono tabular-nums">
              {formattedTimer}
            </span>
            <div className="flex items-center gap-1.5 mt-2.5">
              <span
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  isVmRunning
                    ? "bg-emerald-300 animate-ping shadow-[0_0_8px_rgba(110,231,183,0.9)]"
                    : "bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                }`}
              />
              <span className="text-xs text-white/90 font-medium tracking-wide font-mono">
                {isVmRunning
                  ? `Executing Instruction #${vmCycleCount}`
                  : "38+ Tests · CI Differential Testing Active"}
              </span>
            </div>
          </div>

          {/* Symmetrical Audio / Memory Cycle Waveform Visualizer */}
          <div className="flex items-center justify-center gap-1.5 h-12 my-2 overflow-hidden px-2">
            {BASE_WAVEFORM.map((h, i) => {
              const dynamicHeight = isVmRunning
                ? Math.min(48, Math.max(6, (h * ((i % 3) + 1.2)) % 46))
                : h
              return (
                <div
                  key={`guppty-wave-${i}`}
                  className="w-1 sm:w-1.5 rounded-full transition-all duration-300"
                  style={{
                    height: `${dynamicHeight}px`,
                    backgroundColor: `rgba(255, 255, 255, ${
                      dynamicHeight > 6 ? 0.95 : 0.45
                    })`,
                  }}
                />
              )
            })}
          </div>

          {/* Floating Dark Frosted Glass HUD */}
          <div className="rounded-2xl bg-[#1e2025]/85 border border-white/20 p-4 backdrop-blur-xl shadow-2xl text-left">
            {/* Quick Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3 text-xs text-white/70">
              <button
                onClick={() => {
                  setLeftActiveChip("Lexer & Parser")
                  handleExecuteVm()
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Lexer & Parser"
                    ? "bg-white/25 text-white shadow-xs"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>Lexer &amp; Parser</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => {
                  setLeftActiveChip("Bytecode Compiler")
                  handleExecuteVm()
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Bytecode Compiler"
                    ? "bg-white/25 text-white shadow-xs"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>Bytecode Compiler</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => {
                  setLeftActiveChip("Stack VM")
                  handleExecuteVm()
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Stack VM"
                    ? "bg-white/25 text-white shadow-xs"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>Stack VM</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => {
                  setLeftActiveChip("Differential Tests")
                  handleExecuteVm()
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Differential Tests"
                    ? "bg-white/25 text-white shadow-xs"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>38+ Tests</span>
              </button>
            </div>

            {/* Input Box Container */}
            <div className="rounded-xl bg-black/40 border border-white/15 p-3 text-xs flex flex-col gap-2.5">
              <div className="text-white/80 font-mono text-[11px] sm:text-xs flex items-center justify-between">
                <span className="truncate">
                  {leftPromptMap[leftActiveChip]}
                </span>
                <span className="inline-flex items-center gap-1 shrink-0 ml-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white font-mono border border-white/20">
                    cargo
                  </kbd>
                  <span className="text-[10px] text-white/60">test</span>
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/90 font-mono flex items-center gap-1">
                    <span>Rust VM</span>
                  </span>
                  <span className="text-white/40 text-xs tracking-widest font-mono">
                    ···
                  </span>
                </div>
                <button
                  onClick={handleExecuteVm}
                  className="w-6 h-6 rounded-full bg-[#1b64f2] text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-[#1554d1] transition text-[11px] font-bold"
                  title="Run VM Instruction"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT CARD: Gitex Codebase Q&A (TypeScript + React + Convex)
           ======================================================== */}
        <div
          className="relative flex flex-col justify-between gap-6 rounded-[32px] sm:rounded-[36px] p-7 sm:p-9 lg:p-10 overflow-hidden shadow-lg border border-[#e2e5eb]"
          style={{
            background: "linear-gradient(180deg, #f7f8fb 0%, #edf0f6 100%)",
          }}
        >
          {/* Card Top: Title with Inline Assist Star Pill */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#4e95ff] mb-2">
              <span className="uppercase tracking-wider font-semibold">
                Gitex // GitHub Codebase Q&amp;A
              </span>
              <a
                href="https://gitex.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#19191d] transition font-medium"
              >
                Live Demo ↗
              </a>
            </div>

            <h3 className="text-2xl sm:text-[28px] lg:text-[31px] leading-tight font-medium tracking-[-0.5px] text-[#19191d] flex items-center flex-wrap gap-2 mb-3">
              <span>Gitex</span>
              <span className="-mx-0.5 inline-flex -translate-y-0.5 items-center gap-1.5 rounded-full bg-white px-3 py-1 align-middle shadow-xs border border-gray-200/90 text-xs sm:text-sm font-medium text-[#19191d]">
                <span className="text-[#4e95ff] text-xs">●</span>
                <span>indexes</span>
              </span>
              <span>codebases with vector search</span>
            </h3>
            <p className="text-[#686a71] text-sm sm:text-[14px] leading-relaxed font-normal max-w-lg">
              Built a GitHub codebase Q&amp;A platform with Gemini embeddings and
              Convex vector search, achieving 100% groundedness and refusal
              accuracy across 31 retrieval evaluations.
            </p>
          </div>

          {/* Status Bar Pill */}
          <div className="mx-auto flex w-fit items-center gap-3 rounded-full px-3.5 py-1.5 bg-[#1e2025] text-white text-xs shadow-xl border border-white/15 my-1 select-none">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] text-white/90">
              Convex Vector DB · 31 Evals Passing
            </span>
            <button
              onClick={() => setIsWindowHidden(!isWindowHidden)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-mono text-white/80 hover:bg-white/20 transition cursor-pointer"
            >
              <span>{isWindowHidden ? "Show" : "Hide"}</span>
            </button>
          </div>

          {/* Floating Dark HUD Window */}
          <div
            className={`rounded-2xl bg-[#1e2025] text-white p-5 border border-white/15 shadow-2xl flex flex-col justify-between transition-all duration-300 ${
              isWindowHidden
                ? "opacity-40 max-h-16 overflow-hidden scale-95"
                : "opacity-100 max-h-[520px] scale-100"
            }`}
            style={{
              background:
                "linear-gradient(180deg, rgba(30, 32, 37, 0.98) 0%, rgba(24, 26, 30, 0.99) 100%)",
            }}
          >
            {/* Top Right Speech Badge */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8a8d98] text-[11px] font-normal font-mono">
                Convex Vector Index // adrian-1-cardona/Guppty
              </span>
              <div className="w-fit rounded-lg px-2.5 py-0.5 text-xs font-mono font-semibold text-white bg-[#0b63e5] shadow-xs">
                Gitex Engine
              </div>
            </div>

            {/* Response Output Body Text */}
            <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal mb-4 font-sans">
              {gitexAnswers[rightActiveChip]?.body}
            </p>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3 text-xs text-white/70">
              <button
                onClick={() => setRightActiveChip("Grounded Retrieval")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  rightActiveChip === "Grounded Retrieval"
                    ? "bg-white/20 text-white"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>Grounded Retrieval</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => setRightActiveChip("Refusal Accuracy")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  rightActiveChip === "Refusal Accuracy"
                    ? "bg-white/20 text-white"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>Refusal Accuracy</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => setRightActiveChip("Auth & Billing")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  rightActiveChip === "Auth & Billing"
                    ? "bg-white/20 text-white"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>Auth &amp; Billing</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => setRightActiveChip("160+ Tests")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  rightActiveChip === "160+ Tests"
                    ? "bg-white/20 text-white"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>160+ Tests</span>
              </button>
            </div>

            {/* Input Box Container */}
            <div className="rounded-xl bg-black/40 border border-white/15 p-3 text-xs flex flex-col gap-2.5">
              <div className="text-white/75 text-[11px] sm:text-xs flex items-center justify-between">
                <input
                  type="text"
                  value={
                    queryInput || gitexAnswers[rightActiveChip]?.prompt || ""
                  }
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="Ask about repository citations, AST scopes, or retrieval evals..."
                  className="bg-transparent border-none outline-none text-white/90 placeholder:text-white/50 w-full text-xs font-mono"
                />
                <span className="inline-flex items-center gap-1 shrink-0 ml-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white font-mono border border-white/20">
                    ↵
                  </kbd>
                  <span className="text-[10px] text-white/60">Query</span>
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/90 font-mono flex items-center gap-1">
                    <span>Gemini Embeddings</span>
                  </span>
                  <span className="text-white/40 text-xs tracking-widest font-mono">
                    ···
                  </span>
                </div>
                <div
                  onClick={() => {
                    const chips = [
                      "Grounded Retrieval",
                      "Refusal Accuracy",
                      "Auth & Billing",
                      "160+ Tests",
                    ]
                    const next =
                      chips[(chips.indexOf(rightActiveChip) + 1) % chips.length]
                    setRightActiveChip(next)
                    setQueryInput("")
                  }}
                  className="w-6 h-6 rounded-full bg-[#1b64f2] text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-[#1554d1] transition text-[11px] font-bold"
                  title="Query Next Evaluation"
                >
                  ▶
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
