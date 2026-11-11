import { ArrowRight, Download, Cpu, Play, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { PROFILE } from "@/data/portfolioData"

export default function Hero({ onGetInTouch }: { onGetInTouch: () => void }) {
  const [isRunning, setIsRunning] = useState(false)
  const [ranSuccessfully, setRanSuccessfully] = useState(false)

  const handleRunSimulation = () => {
    setIsRunning(true)
    setRanSuccessfully(false)
    setTimeout(() => {
      setIsRunning(false)
      setRanSuccessfully(true)
      setTimeout(() => setRanSuccessfully(false), 3000)
    }, 500)
  }

  return (
    <section
      id="top"
      className="relative pt-16 pb-20 px-4 sm:px-6 bg-gradient-to-b from-[#edf4ff] via-[#f7faff] to-white overflow-hidden text-center"
    >
      <div className="max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edf4ff] border border-[#d4e4fc] text-[#4e95ff] text-xs font-semibold mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4e95ff]" />
          <span>Cal Poly San Luis Obispo · Systems &amp; Compilers</span>
        </div>

        {/* EB Garamond Headline (Matching Cluely's exact font and color #37383c) */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-normal text-[#37383c] tracking-tight leading-[1.08] mb-6">
          Software Engineering
          <br />
          <span className="italic font-light text-[#595a5f]">
            &amp; Systems Research
          </span>
        </h1>

        {/* Subhead text */}
        <p className="text-base sm:text-lg text-[#686a71] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Undergraduate researcher at Cal Poly CSSE. Building high-performance
          compilers in Rust, deterministic research engines, and
          zero-hallucination AI pipelines.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <button onClick={onGetInTouch} className="btn-primary">
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={PROFILE.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Download className="w-4 h-4 text-[#686a71]" />
            <span>Resume (PDF)</span>
          </a>
        </div>
      </div>

      {/* Scenic Hero Window Presentation (Matches Cluely hero window) */}
      <div className="max-w-5xl mx-auto relative">
        {/* Soft Scenic Landscape Backdrop Container */}
        <div className="rounded-3xl p-3 sm:p-6 bg-gradient-to-br from-[#c8defe] via-[#e2edfe] to-[#feddc7] shadow-[0_20px_60px_-15px_rgba(78,149,255,0.18)] border border-[#d4e4fc] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none" />

          {/* Floating Application Window */}
          <div className="relative rounded-2xl bg-[#1e2024] text-slate-200 border border-[#37383c] shadow-2xl overflow-hidden text-left">
            {/* Window Chrome Header */}
            <div className="px-4 py-3 bg-[#26282d] border-b border-[#37383c] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs font-mono text-slate-400 ml-2">
                  guppty-runtime // compiler/vm.rs
                </span>
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={isRunning}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#4e95ff] hover:bg-[#3a85f5] text-white text-xs font-medium transition focus:outline-none shadow-xs"
              >
                <Play
                  className={`w-3 h-3 ${isRunning ? "animate-spin" : ""}`}
                />
                <span>{isRunning ? "Verifying..." : "Run Bytecode VM"}</span>
              </button>
            </div>

            {/* Split Window Content */}
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 font-mono text-xs sm:text-[13px] leading-relaxed">
              {/* Left Code Inspection */}
              <div className="md:col-span-7 space-y-1.5 text-slate-300 overflow-x-auto">
                <div className="text-slate-500">
                  // Guppty Stack Virtual Machine (Rust)
                </div>
                <div>
                  <span className="text-[#4e95ff]">match</span> instruction{" "}
                  {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-amber-300">OpCode::PushConstant</span>
                  (idx) =&gt; {"{"}
                </div>
                <div className="pl-8 text-slate-400">
                  let val = self.chunk.read_constant(idx);
                </div>
                <div className="pl-8 text-slate-400">self.stack.push(val);</div>
                <div className="pl-4">{"}"}</div>
                <div className="pl-4">
                  <span className="text-amber-300">OpCode::BinaryAdd</span>{" "}
                  =&gt; {"{"}
                </div>
                <div className="pl-8 text-slate-400">
                  let b = self.stack.pop()?;
                </div>
                <div className="pl-8 text-slate-400">
                  let a = self.stack.pop()?;
                </div>
                <div className="pl-8 text-slate-400">
                  self.stack.push(a.add(b)?);
                </div>
                <div className="pl-4">{"}"}</div>
                <div>{"}"}</div>
              </div>

              {/* Right Telemetry / Execution Output */}
              <div className="md:col-span-5 bg-[#26282d]/80 rounded-xl p-4 border border-[#37383c] flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#4e95ff]" />
                    <span>Real-time Telemetry</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#37383c]">
                      <span className="text-slate-400">VM Execution:</span>
                      <span className="text-emerald-400 font-bold">
                        0.82 ms
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#37383c]">
                      <span className="text-slate-400">Memory Allocation:</span>
                      <span className="text-emerald-400 font-bold">
                        0 heap pauses
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#37383c]">
                      <span className="text-slate-400">Pratt Parser:</span>
                      <span className="text-slate-200">Zero syntax errors</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Test Harness:</span>
                      <span className="text-[#4e95ff]">CI verified</span>
                    </div>
                  </div>
                </div>

                {ranSuccessfully && (
                  <div className="mt-3 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Bytecode execution verified without error.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
