import { useState } from "react"

export default function TenetsSection() {
  // Slider state for Card 2 split-view: Source Code vs Compiled Bytecode
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  // Position state for Card 3 pipeline status
  const [pipelineState, setPipelineState] = useState<
    "DIFF" | "EVALS" | "SECURITY"
  >("DIFF")

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const pct = Math.round((x / rect.width) * 100)
    setSliderPos(pct)
  }

  return (
    <section
      id="tenets"
      className="scroll-mt-24 py-20 px-4 sm:px-6 max-w-6xl mx-auto text-center"
    >
      {/* Centered Heading: All Black Text */}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-[38px] font-bold tracking-tight mb-3 text-black">
        Performance, Rigor &amp; Reproducibility
      </h2>
      <p className="text-black text-base sm:text-lg max-w-2xl mx-auto mb-14 font-normal">
        Architectural principles guiding compiler construction, fault-tolerant
        media pipelines, and grounded codebase intelligence.
      </p>

      {/* 3-Column Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-14">
        {/* Card 1: Deterministic Single-Pass Execution */}
        <div className="card-cluely-frame flex flex-col justify-between">
          <div className="rounded-2xl bg-white p-6 sm:p-7 border border-neutral-200 shadow-xs h-full flex flex-col justify-between">
            {/* Visual: Pratt Parser & VM Process Monitor */}
            <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4 mb-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200 text-xs">
                <span className="font-bold text-black">
                  Compiler Pipeline (3)
                </span>
                <span className="text-xs font-mono text-black font-bold">
                  Zero GC Pauses
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-neutral-200 text-black font-mono text-[10px] font-bold flex items-center justify-center border border-neutral-300">
                      VM
                    </span>
                    <div>
                      <div className="font-bold text-black">
                        guppty_vm (Rust)
                      </div>
                      <div className="text-[10px] text-black">
                        0.42 μs dispatch
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-black font-mono font-bold">
                    O(1)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-neutral-200 text-black font-mono text-[10px] font-bold flex items-center justify-center border border-neutral-300">
                      AST
                    </span>
                    <div>
                      <div className="font-bold text-black">
                        pratt_parser
                      </div>
                      <div className="text-[10px] text-black">
                        Precedence climbing
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-black font-mono font-bold">
                    Linear
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-neutral-200 text-black font-mono text-[10px] font-bold flex items-center justify-center border border-neutral-300">
                      MEM
                    </span>
                    <div>
                      <div className="font-bold text-black">
                        constant_pool
                      </div>
                      <div className="text-[10px] text-black">
                        Arena-allocated
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-black font-mono font-bold">
                    Static
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-black mb-1.5">
                Deterministic Execution
              </h3>
              <p className="text-xs text-black leading-relaxed">
                Stack-based bytecode runtimes compile and evaluate instructions
                without garbage collection pauses, producing sub-microsecond
                dispatch latency and predictable memory layouts.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Interactive Source vs Bytecode Split-View Slider */}
        <div className="card-cluely-frame flex flex-col justify-between">
          <div className="rounded-2xl bg-white p-6 sm:p-7 border border-neutral-200 shadow-xs h-full flex flex-col justify-between">
            {/* Interactive Split View Slider: Source vs Bytecode */}
            <div
              className="relative h-44 rounded-xl overflow-hidden mb-6 border border-neutral-200 select-none cursor-ew-resize"
              onPointerDown={() => setIsDragging(true)}
              onPointerUp={() => setIsDragging(false)}
              onPointerLeave={() => setIsDragging(false)}
              onPointerMove={handlePointerMove}
            >
              {/* Layer 1: High-Level Source Code (Guppty Syntax) */}
              <div className="absolute inset-0 bg-neutral-50 p-3 text-xs font-mono flex flex-col justify-between">
                <div className="flex justify-between items-center text-[10px] text-black border-b border-neutral-200 pb-1 font-bold">
                  <span>source · main.gup</span>
                  <span className="text-black">
                    High-Level AST
                  </span>
                </div>
                <div className="space-y-1 text-black text-[11px] pt-1">
                  <div>
                    <span className="font-bold">fn</span>{" "}
                    calculate(x, y) {"{"}
                  </div>
                  <div className="pl-3 text-black">// pure computation</div>
                  <div className="pl-3">
                    <span className="font-bold">return</span> (x * 2) + y;
                  </div>
                  <div>{"}"}</div>
                </div>
                <div className="text-[10px] text-black pt-1 border-t border-neutral-200 flex items-center justify-between font-bold">
                  <span>Status: Validated</span>
                  <span className="text-black font-bold">
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
                  <span>disasm · vm.rs</span>
                  <span className="font-semibold text-emerald-400">
                    Bytecode
                  </span>
                </div>
                <div className="space-y-1 text-[11px] pt-1 text-slate-300">
                  <div>
                    <span className="text-slate-400">0x00</span> OP_GET_LOCAL 0
                  </div>
                  <div>
                    <span className="text-slate-400">0x02</span> OP_PUSH_CONST 2
                  </div>
                  <div>
                    <span className="text-slate-400">0x04</span> OP_MULTIPLY
                  </div>
                  <div>
                    <span className="text-slate-400">0x05</span> OP_RETURN
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
                <div className="w-5 h-5 rounded-full bg-white shadow-md border border-slate-300 flex items-center justify-center text-[9px] text-black font-bold">
                  ↔
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-black mb-1.5">
                Grounded AST Mapping
              </h3>
              <p className="text-xs text-black leading-relaxed">
                Drag slider to inspect how high-level syntax maps into compact,
                deterministic opcode instructions with span-aware source maps.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Automated Quality & CI/CD Pipeline */}
        <div className="card-cluely-frame flex flex-col justify-between">
          <div className="rounded-2xl bg-white p-6 sm:p-7 border border-neutral-200 shadow-xs h-full flex flex-col justify-between">
            {/* Visual: Interactive CI/CD Stage Monitor */}
            <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4 mb-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200 text-xs">
                <span className="font-bold text-black">
                  CI/CD Testing Suites
                </span>
                <span className="text-black font-mono text-[10px] font-bold">
                  PASSING
                </span>
              </div>

              {/* 3 Step Interactive Buttons */}
              <div className="space-y-2 text-xs">
                <div
                  onClick={() => setPipelineState("DIFF")}
                  className={`p-2 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                    pipelineState === "DIFF"
                      ? "bg-black text-white font-bold border-black"
                      : "bg-white border-neutral-200 text-black hover:bg-neutral-100 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">✓</span>
                    <span className="font-mono text-[11px]">
                      differential_testing
                    </span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80">
                    38+ tests
                  </span>
                </div>

                <div
                  onClick={() => setPipelineState("EVALS")}
                  className={`p-2 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                    pipelineState === "EVALS"
                      ? "bg-black text-white font-bold border-black"
                      : "bg-white border-neutral-200 text-black hover:bg-neutral-100 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">✓</span>
                    <span className="font-mono text-[11px]">
                      retrieval_evaluations
                    </span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80">
                    31 evals
                  </span>
                </div>

                <div
                  onClick={() => setPipelineState("SECURITY")}
                  className={`p-2 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                    pipelineState === "SECURITY"
                      ? "bg-black text-white font-bold border-black"
                      : "bg-white border-neutral-200 text-black hover:bg-neutral-100 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">✓</span>
                    <span className="font-mono text-[11px]">
                      automated_test_suite
                    </span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80">
                    160+ tests
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-black mb-1.5">
                CI-Enforced Testing &amp; Verification
              </h3>
              <p className="text-xs text-black leading-relaxed">
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
