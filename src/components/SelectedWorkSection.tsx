import { useState, useEffect } from "react"

// Cluely signature audio waveform distribution: tall ends, quiet center
const CLUELY_WAVEFORM = [
  65, 80, 55, 40, 25, 20, 15, 12, 10, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
  8, 8, 8, 8, 8, 10, 12, 15, 20, 25, 30, 45, 60, 85, 70,
]

export default function SelectedWorkSection() {
  const [seconds, setSeconds] = useState(12)
  const [leftActiveChip, setActiveLeftChip] = useState("Media")
  const [rightActiveChip, setActiveRightChip] = useState("Agents")
  const [isWindowHidden, setIsWindowHidden] = useState(false)

  // Live timer tick matching Cluely's 00:12 counter
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev >= 59 ? 0 : prev + 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedTimer = `00:${seconds < 10 ? `0${seconds}` : seconds}`

  // Dynamic prompts based on active chip
  const leftPromptMap: Record<string, string> = {
    Media: "Finding and organizing media assets across SharePoint and OneDrive",
    Automate:
      "Dispatching automated cataloging task to Power Automate workflow...",
    OneDrive: "Syncing photo metadata and folder structures across OneDrive...",
    Codex:
      "Running Codex-assisted automated tests, debugging, and feature updates...",
  }

  const rightPromptMap: Record<string, string> = {
    Agents:
      "Querying cooperative AI agent evaluation metrics across training runs",
    Backend: "Automating training and evaluation runs across Python backend...",
    Pytest:
      "Running pytest test suite and GitHub Actions CI/CD to catch bugs...",
    Telemetry:
      "Visualizing live AI agent activity and telemetry on Python desktop app...",
  }

  return (
    <section
      id="systems"
      className="py-24 px-4 sm:px-6 max-w-6xl mx-auto text-left"
    >
      {/* Section Heading (Clean, bold, no extra clutter) */}
      <div className="mb-10 text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#19191d] tracking-tight leading-tight">
          How Adrian delivers reliable engineering
        </h2>
      </div>

      {/* Two Large Cards (Left Blue + Right Pale Glass Container) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left Card: Cal Poly Bailey College (Vibrant Blue Card) */}
        <div
          className="relative flex flex-col justify-between gap-6 rounded-[28px] p-7 sm:p-9 lg:p-10 text-white overflow-hidden shadow-xl"
          style={{
            background:
              "radial-gradient(135% 120% at 10% 90%, #3e78f0 0%, #5b94ff 60%, #689dff 100%)",
            boxShadow:
              "inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 20px 40px -15px rgba(68, 122, 235, 0.35)",
          }}
        >
          {/* Card Top: Appointment Metadata & Title with Inline Pill */}
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-100 mb-3">
              Cal Poly Bailey College // Software Engineering Intern
            </div>

            <h3 className="text-2xl sm:text-[28px] lg:text-[30px] leading-tight font-medium tracking-[-0.5px] text-white flex items-center flex-wrap gap-2 mb-3">
              <span>Bailey College</span>
              <span className="-mx-0.5 inline-flex -translate-y-0.5 items-center rounded-full bg-white/20 px-3 py-1 align-middle shadow-[inset_1px_1px_4px_rgba(255,255,255,0.4)] backdrop-blur-md text-xs sm:text-sm font-medium text-white">
                listens
              </span>
              <span>to campus workflows</span>
            </h3>
            <p className="text-white/85 text-sm sm:text-[15px] leading-relaxed font-normal max-w-lg">
              It picks up department media requirements in real time, so staff
              can organize and retrieve photos across OneDrive when they need
              them.
            </p>
          </div>

          {/* Running Timer & Live Recording Dot (00:12 above • Recording) */}
          <div className="flex flex-col items-center justify-center my-2 select-none">
            <span className="text-4xl sm:text-5xl lg:text-[56px] leading-none font-semibold tracking-[-0.5px] text-white font-mono tabular-nums">
              {formattedTimer}
            </span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-white/80 font-medium tracking-wide">
                Recording
              </span>
            </div>
          </div>

          {/* Centered Symmetrical Audio Waveform */}
          <div className="flex items-center justify-center gap-1.5 h-12 my-2 overflow-hidden px-4">
            {CLUELY_WAVEFORM.map((h, i) => (
              <div
                key={`cluely-wave-${i}`}
                className="w-1 sm:w-1.5 rounded-full transition-all duration-300"
                style={{
                  height: `${h}%`,
                  backgroundColor: `rgba(255, 255, 255, ${0.45 + (h / 100) * 0.5})`,
                }}
              />
            ))}
          </div>

          {/* Floating Dark Glassy HUD */}
          <div className="rounded-2xl bg-[#1e2024]/75 border border-white/20 p-4 backdrop-blur-md shadow-2xl text-left">
            {/* Chip Action Row (Clean Text - No Icons) */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-3 text-xs">
              <button
                onClick={() => setActiveLeftChip("Media")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Media"
                    ? "bg-white/25 text-white shadow-xs"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Assist
              </button>
              <span className="w-1 h-1 rounded-full bg-white/30" />

              <button
                onClick={() => setActiveLeftChip("Automate")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Automate"
                    ? "bg-white/25 text-white shadow-xs"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                What should I say?
              </button>
              <span className="w-1 h-1 rounded-full bg-white/30" />

              <button
                onClick={() => setActiveLeftChip("OneDrive")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "OneDrive"
                    ? "bg-white/25 text-white shadow-xs"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Follow-up questions
              </button>
              <span className="w-1 h-1 rounded-full bg-white/30" />

              <button
                onClick={() => setActiveLeftChip("Codex")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Codex"
                    ? "bg-white/25 text-white shadow-xs"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Recap
              </button>
            </div>

            {/* 2-Line Input Box */}
            <div className="rounded-xl bg-black/45 border border-white/15 p-3 text-xs flex flex-col gap-2.5">
              <div className="text-white/75 font-mono text-[11px] flex items-center justify-between">
                <span className="truncate">
                  {leftPromptMap[leftActiveChip]}
                </span>
                <span className="inline-flex items-center gap-1 shrink-0 ml-2">
                  <span className="text-[10px] text-white/50 mr-0.5">or</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white font-mono border border-white/20">
                    ⌘
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white font-mono border border-white/20">
                    ↵
                  </kbd>
                  <span className="text-[10px] text-white/60 ml-0.5">
                    for Assist
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/80 font-mono font-medium">
                    Smart
                  </span>
                  <span className="text-white/40 text-xs tracking-widest font-mono">
                    ···
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#4e95ff] text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-[#3d83ee] transition text-[11px] font-bold">
                  ▶
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Cal Poly Department of CSSE (Silvery Pale Card) */}
        <div
          className="relative flex flex-col justify-between gap-6 rounded-[28px] p-7 sm:p-9 lg:p-10 overflow-hidden shadow-lg border border-[#36393F]/10"
          style={{
            background:
              "radial-gradient(92.09% 124.47% at 50% 99.24%, rgba(221, 226, 238, 0.45) 58.91%, rgba(187, 197, 221, 0.45) 100%)",
          }}
        >
          {/* Card Top: Appointment Metadata & Title with Inline Pill */}
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#4e95ff] mb-3">
              Cal Poly Department of CSSE // Undergraduate Researcher
            </div>

            <h3 className="text-2xl sm:text-[28px] lg:text-[30px] leading-tight font-medium tracking-[-0.5px] text-[#19191d] flex items-center flex-wrap gap-2 mb-3">
              <span>When you need help, CSSE</span>
              <span className="-mx-0.5 inline-flex -translate-y-0.5 items-center rounded-full bg-white px-3 py-1 align-middle shadow-xs border border-slate-200/80 text-xs sm:text-sm font-medium text-[#19191d]">
                assists
              </span>
              <span>you instantly</span>
            </h3>
            <p className="text-[#686a71] text-sm sm:text-[15px] leading-relaxed font-normal max-w-lg">
              Hit Cmd/Ctrl + Enter and Adrian helps you with AI in the moment,
              automating training and evaluation pipelines for cooperative
              agents.
            </p>
          </div>

          {/* Floating Dynamic Island Notch Pill */}
          <div className="mx-auto flex w-fit items-center gap-2.5 rounded-full px-3.5 py-1.5 bg-[#1e2024] text-white text-xs shadow-lg border border-white/15 my-1">
            <button
              onClick={() => setIsWindowHidden(!isWindowHidden)}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-medium text-white hover:bg-white/25 transition cursor-pointer"
            >
              <span>{isWindowHidden ? "⌃ Show" : "⌄ Hide"}</span>
            </button>
            <div className="w-2.5 h-2.5 rounded-xs bg-white/80 inline-block" />
          </div>

          {/* Floating Dark HUD Window */}
          <div
            className={`rounded-2xl bg-[#1e2024] text-white p-5 border border-white/15 shadow-2xl flex flex-col justify-between transition-all duration-300 ${
              isWindowHidden
                ? "opacity-40 max-h-16 overflow-hidden scale-95"
                : "opacity-100 max-h-[500px] scale-100"
            }`}
            style={{
              background:
                "linear-gradient(180deg, rgba(30, 32, 36, 0.95) 0%, rgba(24, 26, 30, 0.98) 100%)",
            }}
          >
            {/* Top Right Speech Bubble */}
            <div className="flex justify-end mb-2">
              <div className="w-fit rounded-xl rounded-br-xs px-3.5 py-1 text-xs font-semibold text-white bg-[#0b63e5] shadow-[inset_0_1px_0_rgba(129,182,255,0.4)]">
                Assist
              </div>
            </div>

            {/* Viewed screen & Response Output */}
            <div className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal mb-4 space-y-1.5">
              <div className="text-[#8a8d98] text-[11px] font-sans">
                Viewed screen
              </div>
              <p>
                Cal Poly CSSE is an undergraduate research appointment
                engineered by Adrian Cardona to automate training and evaluation
                pipelines for cooperative AI agents, catching bugs automatically
                via pytest &amp; CI/CD while telemetry streams to an interactive
                desktop app.
              </p>
            </div>

            {/* Action Chips Row (Clean Text - No Icons) */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3 text-xs">
              <button
                onClick={() => setActiveRightChip("Agents")}
                className={`text-[11px] px-2.5 py-0.5 rounded-full transition cursor-pointer ${
                  rightActiveChip === "Agents"
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Assist
              </button>
              <span className="w-1 h-1 rounded-full bg-white/20" />

              <button
                onClick={() => setActiveRightChip("Backend")}
                className={`text-[11px] px-2.5 py-0.5 rounded-full transition cursor-pointer ${
                  rightActiveChip === "Backend"
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                What should I say?
              </button>
              <span className="w-1 h-1 rounded-full bg-white/20" />

              <button
                onClick={() => setActiveRightChip("Pytest")}
                className={`text-[11px] px-2.5 py-0.5 rounded-full transition cursor-pointer ${
                  rightActiveChip === "Pytest"
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Follow-up questions
              </button>
              <span className="w-1 h-1 rounded-full bg-white/20" />

              <button
                onClick={() => setActiveRightChip("Telemetry")}
                className={`text-[11px] px-2.5 py-0.5 rounded-full transition cursor-pointer ${
                  rightActiveChip === "Telemetry"
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Recap
              </button>
            </div>

            {/* 2-Line Input Box */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-xs flex flex-col gap-2.5">
              <div className="text-white/75 font-mono text-[11px] flex items-center justify-between">
                <span className="truncate">
                  {rightPromptMap[rightActiveChip]}
                </span>
                <span className="inline-flex items-center gap-1 shrink-0 ml-2">
                  <span className="text-[10px] text-white/50 mr-0.5">or</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white font-mono border border-white/20">
                    ⌘
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white font-mono border border-white/20">
                    ↵
                  </kbd>
                  <span className="text-[10px] text-white/60 ml-0.5">
                    for Assist
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/80 font-mono font-medium">
                    Smart
                  </span>
                  <span className="text-white/40 text-xs tracking-widest font-mono">
                    ···
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#4e95ff] text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-[#3d83ee] transition text-[11px] font-bold">
                  ▶
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
