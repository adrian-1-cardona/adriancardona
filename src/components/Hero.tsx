import {
  ArrowRight,
  Terminal,
  Cpu,
  Play,
  CheckCircle2,
  Database,
  Code,
  Sparkles,
  Wifi,
  Battery,
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
      className="hero-cluely relative pt-32 sm:pt-36 md:pt-44 pb-20 px-4 sm:px-6 overflow-hidden text-center"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* EB Garamond Headline in Crisp White (Matches Cluely Display Typography - 80px, leading-[96%], tracking-[-1px]) */}
        <h1 className="font-display text-[46px] sm:text-[68px] lg:text-[80px] font-medium text-white tracking-[-1px] leading-[96%] mb-6 drop-shadow-sm">
          Software Engineering
          <br />
          <span className="italic font-light opacity-95">
            &amp; Systems Research
          </span>
        </h1>

        {/* Subhead text (Exact Cluely scale: 19px, leading-[140%], tracking-[-0.02em]) */}
        <p className="text-[16px] sm:text-[19px] leading-[140%] text-white/95 max-w-[560px] mx-auto mb-9 font-normal tracking-[-0.02em] drop-shadow-xs">
          Undergraduate researcher at Cal Poly CSSE. Building high-performance
          compilers in Rust, deterministic research engines, and
          zero-hallucination AI pipelines.
        </p>

        {/* Single Focal Action Button (Exact Cluely gradient button with radial depth & inset highlight) */}
        <div className="flex items-center justify-center mb-14">
          <button
            onClick={onGetInTouch}
            className="btn-cluely-cta cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scenic macOS Desktop Display Mockup (Identical Architecture to Cluely Hero) */}
      <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-4">
        {/* Ambient Under-Glow from Wallpaper */}
        <div
          className="absolute inset-0 max-w-5xl mx-auto rounded-[24px] sm:rounded-[32px] blur-2xl opacity-60 pointer-events-none"
          style={{
            backgroundImage: "url(/images/cluely/wallpaper.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* macOS Display Container with Monterey Dune Wallpaper */}
        <div
          className="relative rounded-[20px] sm:rounded-[28px] overflow-hidden border border-white/40 shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
          style={{
            backgroundImage: "url(/images/cluely/wallpaper.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* macOS Top Status Bar */}
          <div className="h-8 sm:h-9 bg-black/25 backdrop-blur-md border-b border-white/10 px-4 flex items-center justify-between text-white text-[11px] sm:text-xs">
            {/* Left: Brand / Sparkle */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-white/90" />
              <span className="font-semibold tracking-tight hidden sm:inline">
                Adrian Cardona
              </span>
            </div>

            {/* Center: Dynamic Island / Notch Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-white text-[11px] backdrop-blur-md shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] tracking-wide">
                guppty-vm: running
              </span>
            </div>

            {/* Right: Status Icons */}
            <div className="flex items-center gap-3 text-white/80">
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Display Stage with Floating App Window & Overlaid Assistant Card */}
          <div className="p-4 sm:p-8 md:p-12 relative flex flex-col items-center justify-center min-h-[460px]">
            {/* The Main App Window */}
            <div className="w-full max-w-3xl rounded-2xl bg-[#1e2024]/95 text-slate-200 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden text-left relative z-10">
              {/* macOS Window Chrome */}
              <div className="px-4 py-3 bg-[#26282d] border-b border-[#37383c] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    guppty-vm // compiler/vm.rs
                  </span>
                </div>

                <button
                  onClick={handleRunSimulation}
                  disabled={isRunning}
                  className="btn-cluely-cta !text-xs !py-1 !px-3.5 cursor-pointer"
                >
                  <Play
                    className={`w-3 h-3 ${isRunning ? "animate-spin" : ""}`}
                  />
                  <span>{isRunning ? "Verifying..." : "Run Bytecode VM"}</span>
                </button>
              </div>

              {/* Code & Telemetry Grid */}
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 font-mono text-xs sm:text-[13px] leading-relaxed">
                {/* Left Code Inspection */}
                <div className="md:col-span-7 space-y-1.5 text-slate-300 overflow-x-auto">
                  <div className="text-slate-500">
                    // Guppty Stack Virtual Machine in pure Rust
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
                  <div className="pl-8 text-slate-400">
                    self.stack.push(val);
                  </div>
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

                {/* Right Telemetry */}
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
                        <span className="text-slate-400">
                          Memory Allocation:
                        </span>
                        <span className="text-emerald-400 font-bold">
                          0 heap pauses
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#37383c]">
                        <span className="text-slate-400">Pratt Parser:</span>
                        <span className="text-slate-200">
                          Zero syntax errors
                        </span>
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

            {/* Overlaid Assistant Card (Matches Cluely floating glassmorphism prompt) */}
            <div className="mt-4 sm:-mt-6 z-20 w-full max-w-xl rounded-2xl bg-black/60 border border-white/25 p-4 text-left backdrop-blur-xl shadow-2xl text-white">
              <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#4e95ff]" />
                  <span>Interactive Systems Inspector</span>
                </span>
                <span className="font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/80">
                  Cmd + Enter
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-mono">
                &quot;Guppty Pratt bytecode compiled: zero GC overhead, 100%
                deterministic reproducibility.&quot;
              </p>
            </div>

            {/* macOS Centered Floating Dock */}
            <div className="mt-6 z-10 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md shadow-xl">
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
        </div>
      </div>
    </section>
  )
}
