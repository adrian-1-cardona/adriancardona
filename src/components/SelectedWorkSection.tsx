import { useState, useEffect } from "react"

// Dynamic audio/execution waveform distribution: tall ends, quiet center
const BASE_WAVEFORM = [
  16, 26, 38, 30, 20, 14, 10, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 4, 4, 4, 4, 6, 10, 16, 24, 38, 28, 18, 10,
]

export default function SelectedWorkSection() {
  const [seconds, setSeconds] = useState(12)
  const [leftActiveChip, setLeftActiveChip] = useState("Run VM")
  const [rightActiveChip, setRightActiveChip] = useState("Architecture")
  const [isWindowHidden, setIsWindowHidden] = useState(false)
  const [isVmRunning, setIsVmRunning] = useState(false)
  const [vmCycleCount, setVmCycleCount] = useState(1420)
  const [queryInput, setQueryInput] = useState("")

  // Live timer tick matching Cluely's 00:12 counter
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev >= 59 ? 0 : prev + 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedTimer = `00:${seconds < 10 ? `0${seconds}` : seconds}`

  // Guppty Rust VM interactive prompts & state
  const leftPromptMap: Record<string, string> = {
    "Run VM": "fn main() -> OpCode::BinaryAdd(0x1A, 0x2C) => 0x46",
    "Stack Frame": "Stack[0]: 42 (i64) · Stack[1]: 108 (i64) · SP: 0x7FFF",
    Benchmark: "1,000,000 opcode dispatches executed in 8.42ms (Rust)",
    "Reset IP": "Instruction pointer reset to 0x0000. Stack frame cleared.",
  }

  // Gitex Codebase AI answers matching the active chip
  const gitexAnswers: Record<string, { prompt: string body: string }> = {
    Architecture: {
      prompt: "Analyzing 14 source files across compiler/ and vm/...",
      body: "Gitex analyzed 14 source files across compiler/ and vm/. The execution model uses a single-pass bytecode compiler with a flat instruction vector, passing evaluated expressions directly through the stack pointer for O(1) instruction dispatch.",
    },
    "Verify Safety": {
      prompt: "Auditing memory allocations and call frame boundaries...",
      body: "AST traversal verified memory safety. Rust ownership semantics prevent dangling pointers in the call frame, and all constant pool allocations are arena-allocated at VM startup.",
    },
    "Refactor VM": {
      prompt: "Benchmarking match dispatch against jump table pattern...",
      body: "Suggested refactor for vm.rs: dispatch opcode loop via computed goto pattern or jump table to eliminate match branching overhead by ~14%.",
    },
    "Call Graph": {
      prompt: "Tracing token pipeline to virtual machine execution...",
      body: "Call hierarchy: main() -> Compiler::compile_tokens() -> VM::interpret(bytecode) -> Evaluator::run_stack_frame() with zero dynamic heap allocations.",
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
      className="py-24 px-4 sm:px-6 max-w-6xl mx-auto text-left"
    >
      {/* Section Heading: Exact Cluely Editorial Style */}
      <div className="mb-10 text-left">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#4e95ff] mb-2">
          // Interactive Systems &amp; Projects
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#19191d] tracking-tight leading-tight">
          How Adrian&apos;s projects run under the hood
        </h2>
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
                Project // Rust Compiler &amp; VM
              </span>
              <a
                href="https://github.com/adrian-1-cardona"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition font-medium"
              >
                GitHub ↗
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
                <span>executes</span>
              </span>
              <span>bytecodes at native speed</span>
            </h3>
            <p className="text-white/85 text-sm sm:text-[15px] leading-relaxed font-normal max-w-lg">
              A stack-based virtual machine written in Rust that compiles and
              interprets bytecode instructions with zero-overhead dispatch.
            </p>
          </div>

          {/* Running Telemetry & Active Status (00:12 above • Status) */}
          <div className="flex flex-col items-center justify-center my-3 select-none">
            <span className="text-4xl sm:text-5xl lg:text-[56px] leading-none font-semibold tracking-[-0.5px] text-white font-mono tabular-nums">
              {formattedTimer}
            </span>
            <div className="flex items-center gap-1.5 mt-2.5">
              <span
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  isVmRunning
                    ? "bg-emerald-300 animate-ping shadow-[0_0_8px_rgba(110,231,183,0.9)]"
                    : "bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                }`}
              />
              <span className="text-xs text-white/85 font-medium tracking-wide">
                {isVmRunning
                  ? `Executing Cycle #${vmCycleCount}`
                  : "Bytecode Engine Active"}
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
          <div className="rounded-2xl bg-[#1e2025]/75 border border-white/20 p-4 backdrop-blur-xl shadow-2xl text-left">
            {/* Quick Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3 text-xs text-white/70">
              <button
                onClick={() => {
                  setLeftActiveChip("Run VM")
                  handleExecuteVm()
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Run VM"
                    ? "bg-white/25 text-white shadow-xs"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>⚡</span>
                <span>Run VM</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => setLeftActiveChip("Stack Frame")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Stack Frame"
                    ? "bg-white/25 text-white shadow-xs"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>📦</span>
                <span>Stack Frame</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => {
                  setLeftActiveChip("Benchmark")
                  handleExecuteVm()
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Benchmark"
                    ? "bg-white/25 text-white shadow-xs"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>🧪</span>
                <span>Benchmark</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => setLeftActiveChip("Reset IP")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Reset IP"
                    ? "bg-white/25 text-white shadow-xs"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>🔄</span>
                <span>Reset IP</span>
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
                    ⌘
                  </kbd>
                  <span className="text-[10px] text-white/60">for Assist</span>
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/90 font-medium flex items-center gap-1">
                    <span className="text-xs">✦</span> Rust VM
                  </span>
                  <span className="text-white/40 text-xs tracking-widest font-mono">
                    ···
                  </span>
                </div>
                <button
                  onClick={handleExecuteVm}
                  className="w-6 h-6 rounded-full bg-[#1b64f2] text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-[#1554d1] transition text-[11px] font-bold"
                  title="Execute Bytecode Step"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT CARD: Gitex Codebase AI (TypeScript + React + Gemini)
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
                Project // Codebase Intelligence
              </span>
              <a
                href="https://gitex.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#19191d] transition font-medium"
              >
                Live App ↗
              </a>
            </div>

            <h3 className="text-2xl sm:text-[28px] lg:text-[31px] leading-tight font-medium tracking-[-0.5px] text-[#19191d] flex items-center flex-wrap gap-2 mb-3">
              <span>When you query code, Gitex</span>
              <span className="-mx-0.5 inline-flex -translate-y-0.5 items-center gap-1.5 rounded-full bg-white px-3 py-1 align-middle shadow-xs border border-gray-200/90 text-xs sm:text-sm font-medium text-[#19191d]">
                <span className="text-[#4e95ff] text-xs">✦</span>
                <span>assists</span>
              </span>
              <span>you instantly</span>
            </h3>
            <p className="text-[#686a71] text-sm sm:text-[15px] leading-relaxed font-normal max-w-lg">
              Hit Cmd/Ctrl + Enter and Gitex explains complex repositories with
              grounded AST citations.
            </p>
          </div>

          {/* Dynamic Island Notch Pill */}
          <div className="mx-auto flex w-fit items-center gap-3 rounded-full px-3.5 py-1.5 bg-[#1e2025] text-white text-xs shadow-xl border border-white/15 my-1 select-none">
            <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
            </div>
            <button
              onClick={() => setIsWindowHidden(!isWindowHidden)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-medium text-white hover:bg-white/20 transition cursor-pointer"
            >
              <span>{isWindowHidden ? "⌃ Show" : "⌄ Hide"}</span>
            </button>
            <div className="w-2.5 h-2.5 rounded-xs bg-white/90 inline-block" />
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
                Indexed AST // guppty-vm
              </span>
              <div className="w-fit rounded-lg px-3 py-1 text-xs font-semibold text-white bg-[#0b63e5] shadow-xs">
                Gitex AI
              </div>
            </div>

            {/* Response Output Body Text */}
            <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal mb-4">
              {gitexAnswers[rightActiveChip]?.body}
            </p>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3 text-xs text-white/70">
              <button
                onClick={() => setRightActiveChip("Architecture")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  rightActiveChip === "Architecture"
                    ? "bg-white/20 text-white"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>🪄</span>
                <span>Architecture</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => setRightActiveChip("Verify Safety")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  rightActiveChip === "Verify Safety"
                    ? "bg-white/20 text-white"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>🪄</span>
                <span>Verify Safety</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => setRightActiveChip("Refactor VM")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  rightActiveChip === "Refactor VM"
                    ? "bg-white/20 text-white"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>💬</span>
                <span>Refactor VM</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => setRightActiveChip("Call Graph")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  rightActiveChip === "Call Graph"
                    ? "bg-white/20 text-white"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>🔄</span>
                <span>Call Graph</span>
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
                  placeholder="Ask about your repository, AST, or Git diff..."
                  className="bg-transparent border-none outline-none text-white/90 placeholder:text-white/50 w-full text-xs font-mono"
                />
                <span className="inline-flex items-center gap-1 shrink-0 ml-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white font-mono border border-white/20">
                    ⌘
                  </kbd>
                  <span className="text-[10px] text-white/60">for Assist</span>
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/90 font-medium flex items-center gap-1">
                    <span className="text-xs">✦</span> Gemini AI
                  </span>
                  <span className="text-white/40 text-xs tracking-widest font-mono">
                    ···
                  </span>
                </div>
                <div
                  onClick={() => {
                    const chips = [
                      "Architecture",
                      "Verify Safety",
                      "Refactor VM",
                      "Call Graph",
                    ]
                    const next =
                      chips[(chips.indexOf(rightActiveChip) + 1) % chips.length]
                    setRightActiveChip(next)
                    setQueryInput("")
                  }}
                  className="w-6 h-6 rounded-full bg-[#1b64f2] text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-[#1554d1] transition text-[11px] font-bold"
                  title="Query Codebase"
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
