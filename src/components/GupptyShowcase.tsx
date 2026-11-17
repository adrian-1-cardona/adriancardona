import { useState } from "react"

const CODE_TABS = [
  {
    id: "source",
    filename: "main.gup",
    language: "guppty",
    code: `// Guppty Language: Recursive Fibonacci & High-Order Functions
fn fib(n) {
    if (n <= 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

fn main() {
    let result = fib(10);
    print("Fibonacci(10) =", result);
    return result;
}`,
  },
  {
    id: "bytecode",
    filename: "compiler::chunk",
    language: "bytecode",
    code: `// Disassembly of main() bytecode chunk:
0000  OP_CONSTANT      10       ; push literal 10
0002  OP_GET_GLOBAL    'fib'    ; lookup function ptr
0004  OP_CALL          1        ; invoke with 1 arg
0006  OP_SET_LOCAL     0        ; bind to 'result'
0008  OP_GET_LOCAL     0        ; load 'result'
0010  OP_PRINT                  ; stdout dispatch
0011  OP_GET_LOCAL     0        ; return operand
0013  OP_RETURN                 ; pop frame & yield`,
  },
  {
    id: "ast",
    filename: "ast::expr",
    language: "json",
    code: `{
  "type": "FunctionDeclaration",
  "name": "fib",
  "params": ["n"],
  "body": {
    "type": "IfStatement",
    "condition": {
      "type": "BinaryExpr",
      "op": "<=",
      "left": { "type": "Identifier", "name": "n" },
      "right": { "type": "Literal", "value": 1 }
    },
    "consequent": { "type": "ReturnStatement", "arg": "n" }
  }
}`,
  },
]

export default function GupptyShowcase() {
  const [activeTabId, setActiveTabId] = useState("source")
  const [vmCycles, setVmCycles] = useState(1420)
  const [isStepping, setIsStepping] = useState(false)

  const activeTab = CODE_TABS.find((t) => t.id === activeTabId) || CODE_TABS[0]

  const handleStepVm = () => {
    setIsStepping(true)
    setVmCycles((prev) => prev + 128)
    setTimeout(() => {
      setIsStepping(false)
    }, 300)
  }

  return (
    <section id="guppty" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (5 cols): Concise Architecture & Purpose */}
        <div className="lg:col-span-5">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-2">
            Systems &amp; Compilers
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black tracking-tight leading-tight mb-4">
            Guppty Programming Language
          </h2>

          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal mb-6">
            Engineered in Rust from scratch. Features a custom lexer, Pratt parser, bytecode compiler, and a stack-based virtual machine, backed by differential testing in GitHub Actions CI/CD.
          </p>

          <div className="space-y-4 mb-8">
            <div className="border-l-2 border-black pl-3.5">
              <h3 className="text-xs font-bold text-black font-mono uppercase tracking-wider mb-0.5">
                Pratt Parser &amp; AST
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Recursive-descent precedence climbing producing typed Abstract Syntax Trees with detailed span diagnostics.
              </p>
            </div>

            <div className="border-l-2 border-black pl-3.5">
              <h3 className="text-xs font-bold text-black font-mono uppercase tracking-wider mb-0.5">
                Stack VM &amp; Opcode Dispatch
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Flat bytecode compiler emitting compact opcodes executed in a contiguous loop with zero dynamic allocations for local slots.
              </p>
            </div>

            <div className="border-l-2 border-black pl-3.5">
              <h3 className="text-xs font-bold text-black font-mono uppercase tracking-wider mb-0.5">
                38+ Differential Tests
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                CI test suite continuously verifies that tree-walk AST interpretation and stack VM execution produce identical outcomes.
              </p>
            </div>
          </div>

          {/* Clean Action Links (Zero Arrows) */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://adrian-1-cardona.github.io/Guppty/#installation"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition"
            >
              Language Documentation
            </a>
            <a
              href="https://github.com/adrian-1-cardona"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full border border-neutral-300 text-black text-xs font-semibold hover:border-black transition"
            >
              Inspect Source on GitHub
            </a>
          </div>
        </div>

        {/* Right Column (7 cols): Sleek Dark IDE Environment */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0d1117] border border-neutral-800 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] overflow-hidden">
          {/* macOS Top Bar with Tabs */}
          <div className="px-4 py-2.5 bg-[#161b22] border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
            </div>

            {/* File Tabs */}
            <div className="flex items-center gap-1">
              {CODE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition cursor-pointer ${
                    activeTabId === tab.id
                      ? "bg-[#0d1117] text-white border border-neutral-700 font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {tab.filename}
                </button>
              ))}
            </div>

            <div className="text-[11px] font-mono text-neutral-500 hidden sm:block">
              Rust 1.78+
            </div>
          </div>

          {/* Code Viewer */}
          <div className="p-4 sm:p-5 font-mono text-xs text-neutral-300 leading-relaxed overflow-x-auto min-h-[220px]">
            <pre>
              <code>{activeTab.code}</code>
            </pre>
          </div>

          {/* Interactive VM Runtime Telemetry */}
          <div className="p-4 bg-[#161b22] border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <button
                onClick={handleStepVm}
                disabled={isStepping}
                className="px-3 py-1 rounded bg-neutral-800 text-white hover:bg-neutral-700 transition cursor-pointer border border-neutral-700 active:scale-95"
              >
                {isStepping ? "Executing..." : "Execute VM Step"}
              </button>

              <span className="text-neutral-400">
                Cycles: <span className="text-emerald-400 font-semibold">{vmCycles}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>38/38 Differential Tests Passing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
