import { useState } from "react"

export default function SelectedWorkSection() {
  const [leftActiveChip, setLeftActiveChip] = useState("Differential Tests")
  const [rightActiveChip, setRightActiveChip] = useState("Grounded Retrieval")
  const [isVmRunning, setIsVmRunning] = useState(false)
  const [vmCycleCount, setVmCycleCount] = useState(1420)

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
      body: "Retrieved 4 grounded code chunks via Convex vector search. Single-pass recursive descent compiler emitting compact opcodes with span-aware syntax errors.",
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

  const handleExecuteVm = () => {
    setIsVmRunning(true)
    setVmCycleCount((prev) => prev + 64)
    setTimeout(() => {
      setIsVmRunning(false)
    }, 500)
  }

  return (
    <section
      id="systems"
      className="scroll-mt-24 py-16 px-4 sm:px-6 max-w-6xl mx-auto text-left"
    >
      {/* Section Header: Compact, Secondary to Experience, All Black Text */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight leading-tight mb-2">
          Featured Technical Projects
        </h2>
        <p className="text-sm sm:text-base text-black max-w-2xl leading-relaxed">
          Open-source compiler runtimes and codebase intelligence platforms
          engineered outside of academic appointments.
        </p>
      </div>

      {/* Two Clean, High-Contrast Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* ========================================================
            CARD 1: Guppty (Rust VM & Compiler)
           ======================================================== */}
        <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200 shadow-xs hover:border-black transition text-left">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-black mb-2">
              <span className="uppercase tracking-wider">
                Rust · Bytecode VM &amp; Compiler
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://adrian-1-cardona.github.io/Guppty/#installation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-black"
                >
                  Docs ↗
                </a>
                <a
                  href="https://github.com/adrian-1-cardona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-black"
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-2">
              Guppty Programming Language
            </h3>
            <p className="text-sm text-black leading-relaxed mb-4">
              Built a programming language in Rust with a lexer, parser,
              bytecode compiler, and stack VM, supporting closures, functions,
              control flow, and span-aware runtime errors.
            </p>

            <ul className="space-y-1.5 text-xs text-black leading-relaxed mb-4 pl-1">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>
                  Engineered dual interpreter and VM backends with 38+ tests
                  and CI-enforced differential testing.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>
                  Stack machine runtime with compact opcode dispatch and zero
                  garbage collection overhead.
                </span>
              </li>
            </ul>
          </div>

          <div>
            {/* Interactive Inspector */}
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="grid grid-cols-4 gap-1 p-1 rounded-lg bg-neutral-200 text-[10px] font-mono mb-2.5">
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
                    className={`py-1 px-1 rounded text-center transition cursor-pointer truncate ${
                      leftActiveChip === chip
                        ? "bg-black text-white font-bold"
                        : "text-black hover:bg-neutral-300"
                    }`}
                  >
                    {chip === "Differential Tests" ? "38+ Tests" : chip}
                  </button>
                ))}
              </div>

              <div className="font-mono text-xs text-black leading-relaxed min-h-[38px]">
                {leftPromptMap[leftActiveChip]}
              </div>

              <div className="flex items-center justify-between pt-2 mt-2 border-t border-neutral-200 text-[11px] font-mono text-black">
                <span>
                  {isVmRunning
                    ? `VM dispatching cycle #${vmCycleCount}...`
                    : "Status: 38+ Tests Passing"}
                </span>
                <button
                  onClick={handleExecuteVm}
                  className="px-2.5 py-0.5 rounded bg-black text-white font-sans text-xs font-semibold hover:bg-neutral-800 transition cursor-pointer"
                >
                  ▶ Dispatch
                </button>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-neutral-100 text-xs font-mono text-black">
              <span className="font-bold">Stack: </span>
              <span>
                Rust · Lexer &amp; Parser · Bytecode VM · Differential Testing
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            CARD 2: Gitex (Codebase Q&A Platform)
           ======================================================== */}
        <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200 shadow-xs hover:border-black transition text-left">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-black mb-2">
              <span className="uppercase tracking-wider">
                Full-Stack · Vector Search Platform
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://gitex.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-black"
                >
                  Demo ↗
                </a>
                <a
                  href="https://github.com/adrian-1-cardona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-black"
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-2">
              Gitex: Grounded Codebase Vector Search
            </h3>
            <p className="text-sm text-black leading-relaxed mb-4">
              Built a GitHub codebase Q&amp;A platform with Gemini embeddings
              and Convex vector search, achieving 100% groundedness and refusal
              accuracy across 31 retrieval evaluations.
            </p>

            <ul className="space-y-1.5 text-xs text-black leading-relaxed mb-4 pl-1">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>
                  Engineered production-grade auth with Clerk, tier-based rate
                  limiting, and Stripe webhook subscription verification.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>
                  160+ automated tests enforcing retrieval evaluation thresholds
                  prior to production merge.
                </span>
              </li>
            </ul>
          </div>

          <div>
            {/* Interactive Inspector */}
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="grid grid-cols-4 gap-1 p-1 rounded-lg bg-neutral-200 text-[10px] font-mono mb-2.5">
                {[
                  "Grounded Retrieval",
                  "Refusal Accuracy",
                  "Auth & Billing",
                  "160+ Tests",
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setRightActiveChip(chip)}
                    className={`py-1 px-1 rounded text-center transition cursor-pointer truncate ${
                      rightActiveChip === chip
                        ? "bg-black text-white font-bold"
                        : "text-black hover:bg-neutral-300"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <div className="font-mono text-xs text-black leading-relaxed min-h-[38px]">
                {gitexAnswers[rightActiveChip]?.body}
              </div>

              <div className="flex items-center justify-between pt-2 mt-2 border-t border-neutral-200 text-[11px] font-mono text-black">
                <span>Convex Vector DB · Gemini</span>
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
                  }}
                  className="px-2.5 py-0.5 rounded bg-black text-white font-sans text-xs font-semibold hover:bg-neutral-800 transition cursor-pointer"
                >
                  ▶ Next Eval
                </button>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-neutral-100 text-xs font-mono text-black">
              <span className="font-bold">Stack: </span>
              <span>
                TypeScript · React · Convex · Gemini · Clerk · Stripe · 160+ Tests
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
