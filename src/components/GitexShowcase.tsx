import { useState } from "react"
import { Search, ExternalLink } from "lucide-react"

interface QueryScenario {
  id: string
  label: string
  query: string
  file: string
  lines: string
  codeSnippet: string
  explanation: string
}

const SCENARIOS: QueryScenario[] = [
  {
    id: "lexer",
    label: "Syntax error handling",
    query: "How are syntax errors handled in the lexer?",
    file: "src/compiler/lexer.rs",
    lines: "Lines 42–58",
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
      "The lexer tracks line and column byte positions for every token. When an invalid syntax character is encountered, it constructs an error holding the exact source span, allowing the compiler to highlight the precise line and character in the terminal.",
  },
  {
    id: "vm-dispatch",
    label: "Virtual machine execution loop",
    query: "Where is the virtual machine execution loop?",
    file: "src/vm/core.rs",
    lines: "Lines 112–135",
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
      "The stack virtual machine runs a flat opcode evaluation loop. Local variables are read directly from stack slots relative to the current frame pointer, keeping execution fast without dynamic heap allocations.",
  },
  {
    id: "ci-eval",
    label: "Continuous integration tests",
    query: "How do continuous integration tests run?",
    file: ".github/workflows/evals.yml",
    lines: "Lines 18–34",
    codeSnippet: `- name: Run Grounded Retrieval Evals
  run: |
    pnpm exec tsx test/evals/groundedness.eval.ts
    # Verify differential test suite
    cargo test --all-targets`,
    explanation:
      "GitHub Actions runs automated test suites on every pull request. This includes differential tests comparing the AST interpreter against the bytecode virtual machine to verify that both produce identical outputs.",
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
    <div className="w-full rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden text-left">
      {/* Product Top Bar */}
      <div className="px-5 sm:px-8 py-4 border-b border-neutral-100 flex items-center justify-between gap-4">
        {/* Left: Product Name & Codebase Scope */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-black text-sm tracking-tight">
            Gitex
          </span>
          <span className="text-neutral-300">/</span>
          <span className="text-xs text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-full font-medium">
            adrian-1-cardona/Guppty
          </span>
        </div>

        {/* Right: Direct Product Links */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <a
            href="https://gitex.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-700 hover:text-black transition"
          >
            Live App
          </a>
          <a
            href="https://github.com/adrian-1-cardona"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-black transition"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Interactive Search Bar */}
      <div className="p-5 sm:p-8 bg-neutral-50/50 border-b border-neutral-100">
        <div className="relative mb-3.5">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={customQuery || activeScenario.query}
            onChange={(e) => setCustomQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-neutral-200 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition font-normal shadow-2xs"
            placeholder="Ask anything about this codebase..."
          />
        </div>

        {/* Suggested Queries */}
        <div className="flex flex-wrap items-center gap-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelect(s)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                activeScenario.id === s.id && !customQuery
                  ? "bg-black text-white"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:text-black"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Output: Natural Explanation & Grounded Code */}
      <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white items-start">
        {/* Left (5 cols): Clear Explanation */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
              Explanation
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-black leading-snug mb-3">
              {activeScenario.query}
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed font-normal">
              {activeScenario.explanation}
            </p>
          </div>

          <div className="pt-3 border-t border-neutral-100">
            <div className="text-xs text-neutral-500 font-medium">
              Source file:{" "}
              <span className="text-black font-semibold">
                {activeScenario.file}
              </span>
            </div>
          </div>
        </div>

        {/* Right (7 cols): Clean Code Citation View */}
        <div className="lg:col-span-7 rounded-xl bg-[#111318] text-neutral-200 p-4 sm:p-5 overflow-hidden border border-neutral-800 shadow-inner">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs text-neutral-400">
            <span className="font-mono text-neutral-200 font-medium">
              {activeScenario.file}
            </span>
            <span className="text-neutral-400 text-[11px]">
              {activeScenario.lines}
            </span>
          </div>

          <pre className="overflow-x-auto text-xs leading-relaxed text-neutral-300 font-mono">
            <code>{activeScenario.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
