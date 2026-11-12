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
      className="hero-cluely relative pt-20 sm:pt-24 lg:pt-28 pb-16 px-3 sm:px-6 overflow-hidden text-center flex flex-col items-center gap-6 lg:gap-8"
    >
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* EB Garamond Headline in Crisp White (Matches Cluely Display Typography - 80px, leading-[96%], tracking-[-1px]) */}
        <h1 className="font-display text-[44px] sm:text-[64px] lg:text-[76px] font-medium text-white tracking-[-1px] leading-[96%] mb-4 drop-shadow-sm">
          Software Engineering
          <br />
          <span className="italic font-light opacity-95">
            &amp; Systems Research
          </span>
        </h1>

        {/* Subhead text (Exact Cluely scale: 19px, leading-[140%], tracking-[-0.02em]) */}
        <p className="text-[16px] sm:text-[18px] leading-[140%] text-white/95 max-w-[580px] mx-auto mb-6 font-normal tracking-[-0.02em] drop-shadow-xs">
          Computer Science undergraduate at Cal Poly San Luis Obispo (Expected
          May 2027). Building media workflow automation at Bailey College,
          cooperative AI agent systems at CSSE, and compiler tooling.
        </p>

        {/* Single Focal Action Button (Exact Cluely gradient button with radial depth & inset highlight) */}
        <div className="flex items-center justify-center">
          <button
            onClick={onGetInTouch}
            className="btn-cluely-cta cursor-pointer group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
            {/* Shimmer light reflection effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shimmer" />
            </div>
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
                cal-poly-bailey: running
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
                    cal-poly-bailey // pipeline/ingest.ts
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
                  <span>
                    {isRunning ? "Dispatching..." : "Execute Pipeline"}
                  </span>
                </button>
              </div>

              {/* Code & Telemetry Grid */}
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 font-mono text-xs sm:text-[13px] leading-relaxed">
                {/* Left Code Inspection */}
                <div className="md:col-span-7 space-y-1.5 text-slate-300 overflow-x-auto">
                  <div className="text-slate-500">
                    // Fault-tolerant media ingestion at Cal Poly Bailey College
                  </div>
                  <div>
                    <span className="text-[#4e95ff]">
                      export async function
                    </span>{" "}
                    ingestMedia(item: MediaItem) {"{"}
                  </div>
                  <div className="pl-4 text-slate-400">
                    const token = await getSharePointAuth();
                  </div>
                  <div className="pl-4 text-slate-400">
                    const retry = new ExponentialBackoff();
                  </div>
                  <div className="pl-4">
                    <span className="text-[#4e95ff]">return</span>{" "}
                    retry.execute( async () =&gt; {"{"}
                  </div>
                  <div className="pl-8 text-slate-400">
                    const res = await powerAutomate.sync({"{"}
                  </div>
                  <div className="pl-12 text-slate-400">
                    action: &quot;PROCESS_MEDIA&quot;,
                  </div>
                  <div className="pl-12 text-slate-400">catalogId: item.id</div>
                  <div className="pl-8 text-slate-400">{"});"}</div>
                  <div className="pl-8 text-emerald-400">
                    return {"{ status: 'SYNCED', ref: res.id };"}
                  </div>
                  <div className="pl-4">{"});"}</div>
                  <div>{"}"}</div>
                </div>

                {/* Right Telemetry */}
                <div className="md:col-span-5 bg-[#26282d]/80 rounded-xl p-4 border border-[#37383c] flex flex-col justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#4e95ff]" />
                      <span>Production Telemetry</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-[#37383c]">
                        <span className="text-slate-400">Media System:</span>
                        <span className="text-emerald-400 font-bold">
                          TypeScript / Active
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#37383c]">
                        <span className="text-slate-400">Power Automate:</span>
                        <span className="text-emerald-400 font-bold">
                          Workflow Synced
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#37383c]">
                        <span className="text-slate-400">Photo Storage:</span>
                        <span className="text-slate-200">
                          SharePoint &amp; OneDrive
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">Code Quality:</span>
                        <span className="text-[#4e95ff]">
                          Codex-Assisted Tests
                        </span>
                      </div>
                    </div>
                  </div>

                  {ranSuccessfully && (
                    <div className="mt-3 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>
                        Media system organized photos across OneDrive
                        successfully.
                      </span>
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
                &quot;Cal Poly Bailey College media system active: SharePoint
                &amp; OneDrive photo indexing with Power Automate.&quot;
              </p>
            </div>

            {/* macOS Centered Floating Dock (Exact Cluely Dock with Authentic Icons) */}
            <div className="mt-5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/10 backdrop-blur-lg shadow-xl">
              <img
                src="/images/cluely/launchpad.png"
                alt="Launchpad"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shadow-xs transition-transform duration-200 hover:scale-125 hover:-translate-y-1 cursor-pointer"
              />
              <img
                src="/images/cluely/safari.png"
                alt="Safari"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shadow-xs transition-transform duration-200 hover:scale-125 hover:-translate-y-1 cursor-pointer"
              />
              <img
                src="/images/cluely/settings.png"
                alt="Settings"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shadow-xs transition-transform duration-200 hover:scale-125 hover:-translate-y-1 cursor-pointer"
              />
              <img
                src="/images/cluely/zoom.png"
                alt="Zoom"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shadow-xs transition-transform duration-200 hover:scale-125 hover:-translate-y-1 cursor-pointer"
              />
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#26282d] text-white flex items-center justify-center shadow-xs transition-transform duration-200 hover:scale-125 hover:-translate-y-1 cursor-pointer">
                <Terminal className="w-3.5 h-3.5 text-[#4e95ff]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
