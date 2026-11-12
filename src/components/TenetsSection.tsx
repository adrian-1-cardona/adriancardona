import { useState } from "react"

export default function TenetsSection() {
  // Slider state for Card 2 split-view: Source Code vs Compiled Bytecode
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  // Position state for Card 3 pipeline status
  const [pipelineState, setPipelineState] =
    useState<"DIFF" | "EVALS" | "SECURITY">("DIFF")

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    setSliderPos(Math.round((x / rect.width) * 100))
  }

  return (
    <section
      id="tenets"
      className="scroll-mt-24 py-24 px-4 sm:px-6 max-w-6xl mx-auto text-center"
    >
      {/* Centered Heading */}
      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#4e95ff] mb-2">
        // Engineering Philosophy
      </div>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight mb-3 text-[#19191d]">
        Performance, Rigor &amp; Reproducibility
      </h2>
      <p className="text-[#686a71] text-base sm:text-lg max-w-2xl mx-auto mb-14 font-normal">
        Architectural principles guiding compiler construction, fault-tolerant
        media pipelines, and grounded codebase intelligence.
      </p>

      {/* 3-Column Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-14">
        {/* Card 1: Deterministic Single-Pass Execution */}
        <div className="card-cluely-frame flex flex-col justify-between">
          <div className="rounded-2xl bg-white p-6 sm:p-7 border border-white/60 shadow-xs h-full flex flex-col justify-between">
            {/* Visual: Pratt Parser & VM Process Monitor */}
            <div className="rounded-xl bg-[#f8fafc] border border-[#e5e7eb] p-4 mb-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e5e7eb] text-xs">
                <span className="font-semibold text-[#19191d]">
                  Compiler Pipeline (3)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 font-medium text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Zero GC Pauses</span>
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-50 text-[#4e95ff] font-mono text-[10px] font-bold flex items-center justify-center border border-blue-200/60">
                      VM
                    </span>
                    <div>
                      <div className="font-medium text-[#19191d]">
                        guppty_vm (Rust)
                      </div>
                      <div className="text-[10px] text-[#9ca3af]">
                        0.42 μs dispatch
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#9ca3af] font-mono">
                    O(1)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 font-mono text-[10px] font-bold flex items-center justify-center border border-emerald-200/60">
                      AST
                    </span>
                    <div>
                      <div className="font-medium text-[#19191d]">
                        pratt_parser
                      </div>
                      <div className="text-[10px] text-[#9ca3af]">
                        Precedence climbing
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#9ca3af] font-mono">
                    Linear
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 font-mono text-[10px] font-bold flex items-center justify-center border border-purple-200/60">
                      MEM
                    </span>
                    <div>
                      <div className="font-medium text-[#19191d]">
                        constant_pool
                      </div>
                      <div className="text-[10px] text-[#9ca3af]">
                        Arena-allocated
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#9ca3af] font-mono">
                    Static
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#19191d] mb-1.5">
                Deterministic Execution
              </h3>
              <p className="text-xs text-[#686a71] leading-relaxed">
                Stack-based bytecode runtimes compile and evaluate instructions
                without garbage collection pauses, producing sub-microsecond
                dispatch latency and predictable memory layouts.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Interactive Source vs Bytecode Split-View Slider */}
        <div className="card-cluely-frame flex flex-col justify-between">
          <div className="rounded-2xl bg-white p-6 sm:p-7 border border-white/60 shadow-xs h-full flex flex-col justify-between">
            {/* Interactive Split View Slider: Source vs Bytecode */}
            <div
              className="relative h-44 rounded-xl overflow-hidden mb-6 border border-[#e5e7eb] select-none cursor-ew-resize"
              onPointerDown={() => setIsDragging(true)}
              onPointerUp={() => setIsDragging(false)}
              onPointerLeave={() => setIsDragging(false)}
              onPointerMove={handlePointerMove}
            >
              {/* Layer 1: High-Level Source Code (Guppty Syntax) */}
              <div className="absolute inset-0 bg-[#f8fafc] p-3 text-xs font-mono flex flex-col justify-between">
                <div className="flex justify-between items-center text-[10px] text-[#9ca3af] border-b border-[#e5e7eb] pb-1">
                  <span>source // main.gup</span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-semibold">
                    High-Level AST
                  </span>
                </div>
                <div className="space-y-1 text-slate-700 text-[11px] pt-1">
                  <div>
                    <span className="text-purple-600 font-semibold">fn</span>{" "}
                    calculate(x, y) {"{"}
                  </div>
                  <div className="pl-3 text-slate-500">// pure computation</div>
                  <div className="pl-3">
                    <span className="text-blue-600">return</span> (x * 2) + y;
                  </div>
                  <div>{"}"}</div>
                </div>
                <div className="text-[10px] text-[#9ca3af] pt-1 border-t border-[#e5e7eb] flex items-center justify-between">
                  <span>Status: Validated</span>
                  <span className="text-emerald-600 font-semibold">
                    ✓ Parsed
                  </span>
                </div>
              </div>

              {/* Layer 2: Compiled OpCode Bytecode (Revealed via Slider) */}
              <div
                className="absolute inset-y-0 right-0 bg-[#1e2024] p-3 text-xs font-mono flex flex-col justify-between text-slate-200 overflow-hidden"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-white/10 pb-1">
                  <span>disasm // vm.rs</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-semibold">
                    Bytecode
                  </span>
                </div>
                <div className="space-y-1 text-[11px] pt-1 text-slate-300">
                  <div>
                    <span className="text-[#4e95ff]">0x00</span> OP_GET_LOCAL 0
                  </div>
                  <div>
                    <span className="text-[#4e95ff]">0x02</span> OP_PUSH_CONST 2
                  </div>
                  <div>
                    <span className="text-[#4e95ff]">0x04</span> OP_MULTIPLY
                  </div>
                  <div>
                    <span className="text-[#4e95ff]">0x05</span> OP_RETURN
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-white/10 flex items-center justify-between">
                  <span>Dispatched</span>
                  <span className="text-emerald-400">Zero-alloc</span>
                </div>
              </div>

              {/* Slider Divider Line */}
              <div
                className="absolute inset-y-0 w-0.5 bg-white shadow-lg pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-md border border-slate-300 flex items-center justify-center text-[9px] text-slate-600">
                  ↔
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#19191d] mb-1.5">
                Grounded AST Mapping
              </h3>
              <p className="text-xs text-[#686a71] leading-relaxed">
                Drag slider to inspect how high-level syntax maps into compact,
                deterministic opcode instructions with span-aware source maps.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Automated Quality & CI/CD Pipeline */}
        <div className="card-cluely-frame flex flex-col justify-between">
          <div className="rounded-2xl bg-white p-6 sm:p-7 border border-white/60 shadow-xs h-full flex flex-col justify-between">
            {/* Visual: Interactive CI/CD Stage Monitor */}
            <div className="rounded-xl bg-[#f8fafc] border border-[#e5e7eb] p-4 mb-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e5e7eb] text-xs">
                <span className="font-semibold text-[#19191d]">
                  CI/CD Testing Suites
                </span>
                <span className="text-emerald-600 font-mono text-[10px] font-bold">
                  PASSING
                </span>
              </div>

              {/* 3 Step Interactive Buttons */}
              <div className="space-y-2 text-xs">
                <div
                  onClick={() => setPipelineState("DIFF")}
                  className={`p-2 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                    pipelineState === "DIFF"
                      ? "bg-blue-50 border-blue-200 text-[#4e95ff]"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold text-xs">✓</span>
                    <span className="font-mono text-[11px] font-medium">
                      differential_testing
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    38+ tests
                  </span>
                </div>

                <div
                  onClick={() => setPipelineState("EVALS")}
                  className={`p-2 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                    pipelineState === "EVALS"
                      ? "bg-blue-50 border-blue-200 text-[#4e95ff]"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold text-xs">✓</span>
                    <span className="font-mono text-[11px] font-medium">
                      retrieval_evaluations
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    31 evals
                  </span>
                </div>

                <div
                  onClick={() => setPipelineState("SECURITY")}
                  className={`p-2 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                    pipelineState === "SECURITY"
                      ? "bg-blue-50 border-blue-200 text-[#4e95ff]"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold text-xs">✓</span>
                    <span className="font-mono text-[11px] font-medium">
                      automated_test_suite
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    160+ tests
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#19191d] mb-1.5">
                CI-Enforced Testing &amp; Verification
              </h3>
              <p className="text-xs text-[#686a71] leading-relaxed">
                Dual execution backends tested with 38+ differential tests, and
                160+ automated tests enforcing retrieval evaluations through
                GitHub Actions CI to guarantee identical runtime behavior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
