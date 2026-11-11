import {
  ArrowRight,
  Terminal,
  Cpu,
  Play,
  CheckCircle2,
  Database,
  Code,
  Sparkles,
} from "lucide-react"
import { useState } from "react"

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
      className="relative pt-32 pb-24 px-4 sm:px-6 overflow-hidden text-center"
      style={{
        background:
          "linear-gradient(180deg, #2b7ee9 0%, #4ea2f8 30%, #7db8fa 55%, #c5e1fd 80%, #ffffff 100%)",
      }}
    >
      {/* Background Horizon Scenery: Alpine Mountains + Glowing Rising Sun + Warm Dawn Dunes (Matches Cluely) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Luminous Rising Sun on Horizon */}
        <div
          className="absolute top-[280px] sm:top-[260px] md:top-[240px] left-[65%] -translate-x-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white opacity-95 pointer-events-none"
          style={{
            boxShadow:
              "0 0 50px 25px rgba(255, 255, 255, 0.8), 0 0 100px 50px rgba(254, 215, 170, 0.6), 0 0 160px 80px rgba(253, 186, 116, 0.35)",
          }}
        />

        {/* Alpine Mountain Peaks on Left Horizon */}
        <div className="absolute top-[210px] sm:top-[200px] left-0 w-full sm:w-[60%] h-48 opacity-85 pointer-events-none">
          <svg
            viewBox="0 0 800 240"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Distant soft peaks */}
            <polygon
              points="0,240 0,160 70,110 140,145 220,80 310,140 400,95 490,160 580,120 670,180 750,150 800,180 800,240"
              fill="#3a6da3"
              opacity="0.5"
            />
            {/* Sharp foreground alpine silhouette */}
            <polygon
              points="0,240 0,180 50,135 110,165 180,95 250,150 330,110 420,175 510,130 600,195 680,240"
              fill="#1e3f68"
              opacity="0.9"
            />
            {/* Snowcap highlights on peaks */}
            <polygon
              points="180,95 168,115 192,115"
              fill="#ffffff"
              opacity="0.6"
            />
            <polygon
              points="330,110 320,125 340,125"
              fill="#ffffff"
              opacity="0.5"
            />
            <polygon
              points="50,135 42,148 58,148"
              fill="#ffffff"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Warm Sunrise Landscape Dunes Behind App Window */}
        <div className="absolute top-[340px] sm:top-[320px] left-0 right-0 h-[480px] pointer-events-none opacity-90">
          <svg
            viewBox="0 0 1440 400"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient
                id="warmDuneLeft"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                <stop offset="40%" stopColor="#fb923c" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#fed7aa" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient
                id="warmDuneRight"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ea580c" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ffedd5" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path
              d="M0,180 C320,110 680,240 1440,90 L1440,400 L0,400 Z"
              fill="url(#warmDuneLeft)"
            />
            <path
              d="M0,230 C450,150 900,280 1440,140 L1440,400 L0,400 Z"
              fill="url(#warmDuneRight)"
            />
          </svg>
        </div>

        {/* Bottom smooth fade to pure white */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* EB Garamond Headline in Crisp White (Matches Cluely Display Typography - Zero Badges) */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-normal text-white tracking-tight leading-[1.05] mb-5 drop-shadow-xs">
          Software Engineering
          <br />
          <span className="italic font-light text-blue-50/95">
            &amp; Systems Research
          </span>
        </h1>

        {/* Subhead text */}
        <p className="text-base sm:text-lg text-blue-50/95 max-w-xl mx-auto mb-8 font-normal leading-relaxed drop-shadow-xs">
          Undergraduate researcher at Cal Poly CSSE. Building high-performance
          compilers in Rust, deterministic research engines, and
          zero-hallucination AI pipelines.
        </p>

        {/* Single Focal Action Button (Matches Cluely single 'Get the App' button) */}
        <div className="flex items-center justify-center mb-14">
          <button
            onClick={onGetInTouch}
            className="btn-primary !px-7 !py-2.5 !text-sm !font-medium !rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scenic Hero Window Container & macOS Dock (Matches Cluely Window & Dock) */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Floating App Window */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#1e2024] text-slate-200 border border-white/30 shadow-[0_25px_70px_rgba(0,0,0,0.35)] overflow-hidden text-left relative">
          {/* macOS Chrome Header */}
          <div className="px-4 py-3 bg-[#26282d] border-b border-[#37383c] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2">
                guppty-vm // compiler/vm.rs
              </span>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4e95ff] hover:bg-[#3a85f5] text-white text-xs font-medium transition focus:outline-none shadow-xs"
            >
              <Play className={`w-3 h-3 ${isRunning ? "animate-spin" : ""}`} />
              <span>{isRunning ? "Verifying..." : "Run Bytecode VM"}</span>
            </button>
          </div>

          {/* Window Body */}
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 font-mono text-xs sm:text-[13px] leading-relaxed relative">
            {/* Left Code Inspection */}
            <div className="md:col-span-7 space-y-1.5 text-slate-300 overflow-x-auto">
              <div className="text-slate-500">
                // Guppty Stack Virtual Machine in pure Rust
              </div>
              <div>
                <span className="text-[#4e95ff]">match</span> instruction {"{"}
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
                <span className="text-amber-300">OpCode::BinaryAdd</span> =&gt;{" "}
                {"{"}
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
                    <span className="text-emerald-400 font-bold">0.82 ms</span>
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

        {/* Centered Floating macOS Dock (Matches Cluely screenshot dock) */}
        <div className="inline-flex items-center gap-3 px-4 py-2 mt-4 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md shadow-lg">
          <div
            className="w-8 h-8 rounded-lg bg-[#26282d] text-white flex items-center justify-center shadow-xs"
            title="Terminal"
          >
            <Terminal className="w-4 h-4 text-[#4e95ff]" />
          </div>
          <div
            className="w-8 h-8 rounded-lg bg-[#26282d] text-white flex items-center justify-center shadow-xs"
            title="Rust Compiler"
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div
            className="w-8 h-8 rounded-lg bg-[#26282d] text-white flex items-center justify-center shadow-xs"
            title="Convex DB"
          >
            <Database className="w-4 h-4 text-purple-400" />
          </div>
          <div
            className="w-8 h-8 rounded-lg bg-[#26282d] text-white flex items-center justify-center shadow-xs"
            title="React / TypeScript"
          >
            <Code className="w-4 h-4 text-amber-400" />
          </div>
          <div
            className="w-8 h-8 rounded-lg bg-[#26282d] text-white flex items-center justify-center shadow-xs"
            title="Grounded AI"
          >
            <Sparkles className="w-4 h-4 text-blue-300" />
          </div>
        </div>
      </div>
    </section>
  )
}
