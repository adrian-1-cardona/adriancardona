import { useState } from "react"

export default function SelectedWorkSection() {
  const [leftActiveChip, setLeftActiveChip] = useState("Differential Tests")
  const [rightActiveChip, setRightActiveChip] = useState("Grounded Retrieval")
  const [isVmRunning, setIsVmRunning] = useState(false)
  const [vmCycleCount, setVmCycleCount] = useState(1420)
  const [queryInput, setQueryInput] = useState("")

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
      className="scroll-mt-24 py-20 px-4 sm:px-6 max-w-6xl mx-auto text-left"
    >
      {/* Section Heading: Direct & Clean */}
      <div className="mb-10 text-left">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[38px] font-medium text-[#111827] tracking-tight leading-tight">
          Featured Projects
        </h2>
        <p className="text-sm sm:text-base text-[#4b5563] mt-2 max-w-2xl font-normal">
          Interactive runtimes and verification environments for Guppty (Rust VM)
          and Gitex (GitHub codebase Q&amp;A platform).
        </p>
      </div>

      {/* Two Large Side-by-Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* ========================================================
            LEFT CARD: Guppty Programming Language & Bytecode VM (Rust)
           ======================================================== */}
        <div
          className="relative flex flex-col justify-between gap-6 rounded-3xl p-7 sm:p-9 text-white overflow-hidden shadow-xl"
          style={{
            background:
              "linear-gradient(180deg, #3b74e6 0%, #295ec7 60%, #1f4ea8 100%)",
            boxShadow:
              "inset 0 1px 1px rgba(255, 255, 255, 0.3), 0 20px 40px -15px rgba(31, 78, 168, 0.3)",
          }}
        >
          {/* Card Top: Title */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-blue-100 mb-2">
              <span className="uppercase tracking-wider font-semibold">
                Guppty · Pure Rust Language &amp; VM
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

            <h3 className="text-2xl sm:text-[28px] lg:text-[30px] leading-tight font-medium tracking-tight text-white mb-3">
              Guppty: Bytecode VM &amp; Compiler in Rust
            </h3>
            <p className="text-white/85 text-sm sm:text-[14px] leading-relaxed font-normal">
              Built a programming language in Rust with a lexer, parser,
              bytecode compiler, and stack VM, supporting closures, functions,
              control flow, and span-aware runtime errors.
            </p>
          </div>

          {/* Clean Functional Status Bar (No Floating Counter Gimmick) */}
          <div className="p-3 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between font-mono text-xs">
            <span className="text-white/90">
              {isVmRunning
                ? `Executing Instruction #${vmCycleCount}...`
                : "Differential Testing: 38+ Tests Passing"}
            </span>
            <span
              className={`font-semibold ${
                isVmRunning ? "text-emerald-300 animate-pulse" : "text-emerald-400"
              }`}
            >
              Dual Backends Active
            </span>
          </div>

          {/* Clean HUD Terminal (No Bubbly Pills) */}
          <div className="rounded-2xl bg-[#13161c]/90 border border-white/15 p-4 shadow-2xl text-left">
            {/* Segmented Control Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-lg bg-black/40 border border-white/10 mb-3 text-[11px] font-mono">
              {[
                "Lexer & Parser",
                "Bytecode Compiler",
                "Stack VM",
                "Differential Tests",
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => {
                    setLeftActiveChip(chip)
                    handleExecuteVm()
                  }}
                  className={`py-1.5 px-1 rounded text-center transition cursor-pointer truncate ${
                    leftActiveChip === chip
                      ? "bg-white/20 text-white font-semibold"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {chip === "Differential Tests" ? "38+ Tests" : chip}
                </button>
              ))}
            </div>

            {/* Prompt Output Box */}
            <div className="rounded-xl bg-black/50 border border-white/10 p-3 text-xs flex flex-col gap-2.5">
              <div className="text-white/90 font-mono text-[11px] sm:text-xs">
                {leftPromptMap[leftActiveChip]}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono text-white/60">
                <span>Runtime: Pure Rust</span>
                <button
                  onClick={handleExecuteVm}
                  className="px-3 py-1 rounded bg-[#1b64f2] text-white font-sans text-xs font-semibold hover:bg-[#1554d1] transition cursor-pointer flex items-center gap-1"
                >
                  <span>▶</span>
                  <span>Run Instruction</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT CARD: Gitex Codebase Q&A (TypeScript + React + Convex)
           ======================================================== */}
        <div
          className="relative flex flex-col justify-between gap-6 rounded-3xl p-7 sm:p-9 text-[#111827] overflow-hidden shadow-lg border border-[#e2e5eb]"
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #f4f5f8 100%)",
          }}
        >
          {/* Card Top: Title */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#4b5563] mb-2">
              <span className="uppercase tracking-wider font-semibold">
                Gitex · GitHub Codebase Q&amp;A
              </span>
              <a
                href="https://gitex.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#111827] transition font-medium"
              >
                Live Demo ↗
              </a>
            </div>

            <h3 className="text-2xl sm:text-[28px] lg:text-[30px] leading-tight font-medium tracking-tight text-[#111827] mb-3">
              Gitex: Grounded Codebase Vector Search
            </h3>
            <p className="text-[#4b5563] text-sm sm:text-[14px] leading-relaxed font-normal">
              Built a GitHub codebase Q&amp;A platform with Gemini embeddings and
              Convex vector search, achieving 100% groundedness and refusal
              accuracy across 31 retrieval evaluations.
            </p>
          </div>

          {/* Clean Functional Status Bar (No Dynamic Island Notch Bubble) */}
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between font-mono text-xs">
            <span className="text-[#374151]">
              Convex Vector DB · adrian-1-cardona/Guppty
            </span>
            <span className="text-emerald-700 font-semibold">
              31 Evals Passing
            </span>
          </div>

          {/* Clean HUD Terminal (No Bubbly Pills) */}
          <div className="rounded-2xl bg-[#13161c] text-white p-4 shadow-2xl text-left border border-white/10">
            {/* Segmented Control Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-lg bg-black/40 border border-white/10 mb-3 text-[11px] font-mono">
              {[
                "Grounded Retrieval",
                "Refusal Accuracy",
                "Auth & Billing",
                "160+ Tests",
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setRightActiveChip(chip)}
                  className={`py-1.5 px-1 rounded text-center transition cursor-pointer truncate ${
                    rightActiveChip === chip
                      ? "bg-white/20 text-white font-semibold"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Response Output Body Text */}
            <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal mb-4 font-sans min-h-[56px]">
              {gitexAnswers[rightActiveChip]?.body}
            </p>

            {/* Input & Evaluation Switcher */}
            <div className="rounded-xl bg-black/50 border border-white/10 p-3 text-xs flex flex-col gap-2.5">
              <div className="text-white/75 text-[11px] sm:text-xs flex items-center justify-between">
                <input
                  type="text"
                  value={
                    queryInput || gitexAnswers[rightActiveChip]?.prompt || ""
                  }
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="Query codebase citations, AST scopes, or retrieval evals..."
                  className="bg-transparent border-none outline-none text-white/90 placeholder:text-white/50 w-full text-xs font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono text-white/60">
                <span>Gemini Embeddings</span>
                <button
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
                  className="px-3 py-1 rounded bg-[#1b64f2] text-white font-sans text-xs font-semibold hover:bg-[#1554d1] transition cursor-pointer flex items-center gap-1"
                >
                  <span>▶</span>
                  <span>Next Eval</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
