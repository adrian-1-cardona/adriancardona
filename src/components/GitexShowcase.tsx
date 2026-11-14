import { useState } from "react"

interface QueryScenario {
  id: string
  label: string
  query: string
  file: string
  lines: string
  codeSnippet: string
  explanation: string
  evalStatus: string
}

const SCENARIOS: QueryScenario[] = [
  {
    id: "lexer",
    label: "Lexer Error Handling",
    query: "How does the lexer track span-aware source coordinates for syntax errors?",
    file: "src/compiler/lexer.rs",
    lines: "L42-L58",
    codeSnippet: `pub struct Span {
    pub start: usize,
    pub end: usize,
    pub line: u32,
    pub col: u32,
}

impl<'a> Lexer<'a> {
    pub fn error(&self, msg: &str) -> CompileError {
        CompileError::Syntax {
            span: self.current_span(),
            message: msg.to_string(),
        }
    }
}`,
    explanation:
      "Gitex retrieved 3 citations from src/compiler/lexer.rs. The lexer tracks line and column byte offsets on every token emit, producing zero-allocation span slices that bubble up through recursive-descent parse stages.",
    evalStatus: "100% Grounded · 0 Hallucinations",
  },
  {
    id: "vm-dispatch",
    label: "VM Opcode Dispatch",
    query: "Where is the stack machine execution loop implemented?",
    file: "src/vm/core.rs",
    lines: "L112-L135",
    codeSnippet: `match self.read_byte() {
    OP_GET_LOCAL => {
        let slot = self.read_byte() as usize;
        self.push(self.stack[self.frame_bp + slot]);
    }
    OP_MULTIPLY => {
        let b = self.pop().as_i64()?;
        let a = self.pop().as_i64()?;
        self.push(Value::Int(a * b));
    }
    OP_RETURN => return Ok(self.pop()),
}`,
    explanation:
      "Grounded citation from src/vm/core.rs: Opcode dispatch evaluates in a contiguous flat bytecode loop with fixed stack frames, eliminating dynamic heap allocations for local variables.",
    evalStatus: "Verified against Git diff",
  },
  {
    id: "ci-eval",
    label: "CI Retrieval Evals",
    query: "How does CI prevent hallucinations and verify retrieval accuracy?",
    file: ".github/workflows/evals.yml",
    lines: "L18-L34",
    codeSnippet: `- name: Run Grounded Retrieval Evals
  run: |
    pnpm exec tsx test/evals/groundedness.eval.ts
    # Enforces 100% refusal on out-of-repo queries
    pnpm exec tsx test/evals/refusal.eval.ts --threshold 1.0`,
    explanation:
      "Gitex executes 31 synthetic and developer-curated retrieval benchmarks on every pull request. PRs fail automatically if retrieval citation accuracy or out-of-scope refusal rates dip below 100%.",
    evalStatus: "31/31 Benchmarks Passing",
  },
]

export default function GitexShowcase() {
  const [activeScenario, setActiveScenario] = useState<QueryScenario>(
    SCENARIOS[0]
  )
  const [customQuery, setCustomQuery] = useState("")

  const handleSelect = (scenario: QueryScenario) => {
    setActiveScenario(scenario)
    setCustomQuery("")
  }

  return (
    <div className="w-full rounded-2xl bg-white border border-neutral-200/90 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] overflow-hidden text-left">
      {/* Product App Header */}
      <div className="px-4 sm:px-6 py-3.5 bg-neutral-50/80 border-b border-neutral-200/80 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Product Identity & Selected Repository */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
          </div>
          <span className="h-4 w-px bg-neutral-200 mx-1 hidden sm:inline" />
          <div className="flex items-center gap-2 text-xs font-mono text-black">
            <span className="font-bold">Gitex</span>
            <span className="text-neutral-400">/</span>
            <span className="px-2 py-0.5 rounded bg-neutral-200/60 text-neutral-800 font-medium">
              adrian-1-cardona/Guppty
            </span>
          </div>
        </div>

        {/* Right: Live Links & Telemetry Status */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-medium">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-neutral-500 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Convex Index Synced
          </span>
          <a
            href="https://gitex.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-md bg-black text-white hover:bg-neutral-800 transition"
          >
            Live App
          </a>
          <a
            href="https://github.com/adrian-1-cardona"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-md border border-neutral-200 text-black hover:border-black transition"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Query Bar with Quick Questions */}
      <div className="p-4 sm:p-6 bg-white border-b border-neutral-100">
        <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 mb-3">
          <span className="text-xs font-mono font-bold text-neutral-400">
            Q:
          </span>
          <input
            type="text"
            value={customQuery || activeScenario.query}
            onChange={(e) => setCustomQuery(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm text-black placeholder:text-neutral-400 outline-none font-medium"
            placeholder="Ask anything about the codebase..."
          />
        </div>

        {/* Quick Question Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-neutral-400 font-mono text-[11px]">
            Try asking:
          </span>
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelect(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                activeScenario.id === s.id && !customQuery
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Stage: Grounded Source Citation + Synthesized Answer */}
      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white">
        {/* Left (7 cols): Verified Source Code Citation */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl bg-[#0f1115] text-slate-200 p-4 font-mono text-xs overflow-hidden border border-neutral-800">
          <div>
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10 text-[11px] text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">Grounded Citation</span>
                <span>·</span>
                <span className="text-white">{activeScenario.file}</span>
              </div>
              <span className="text-neutral-500 font-mono">
                {activeScenario.lines}
              </span>
            </div>

            <pre className="overflow-x-auto text-[11px] sm:text-xs leading-relaxed text-slate-300 font-mono">
              <code>{activeScenario.codeSnippet}</code>
            </pre>
          </div>

          <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
            <span>AST Node Scope: Validated</span>
            <span className="text-emerald-400 font-mono font-medium">
              {activeScenario.evalStatus}
            </span>
          </div>
        </div>

        {/* Right (5 cols): Natural Language Synthesis */}
        <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 text-left">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-2">
              Synthesized Explanation
            </div>
            <p className="text-xs sm:text-sm text-black leading-relaxed font-normal mb-4">
              {activeScenario.explanation}
            </p>

            <div className="space-y-2 pt-3 border-t border-neutral-200 text-xs font-mono text-black">
              <div className="flex justify-between">
                <span className="text-neutral-500">Vector Search:</span>
                <span className="font-semibold">Convex 1536-dim</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Embeddings:</span>
                <span className="font-semibold">Gemini API</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">CI Verification:</span>
                <span className="font-semibold">GitHub Actions</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Monitoring:</span>
                <span className="font-semibold">Sentry Tracing</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-neutral-200 text-[11px] text-neutral-500 font-mono">
            Full-stack TypeScript · React · Convex · Gemini API · Sentry
          </div>
        </div>
      </div>
    </div>
  )
}
