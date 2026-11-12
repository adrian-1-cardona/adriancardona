import { useState, useEffect } from "react"
import { Sparkles, Play, Briefcase, GraduationCap } from "lucide-react"

// Continuous waveform sequence with realistic voice / data frequencies
const WAVE_BARS = [
  35, 60, 45, 80, 95, 70, 50, 40, 65, 85, 90, 75, 55, 45, 30, 25, 35, 50, 40,
  60, 45, 35, 25, 20, 30, 45, 60, 50, 40, 30, 45, 65, 85, 95, 80, 60, 40, 55,
  75, 90, 85, 70, 50, 35, 25, 40, 60, 80,
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
    Media:
      "Finding and organizing media assets across SharePoint and OneDrive, or ⌘ ↵ for status",
    Automate:
      "Dispatching automated cataloging task to Power Automate workflow...",
    OneDrive: "Syncing photo metadata and folder structures across OneDrive...",
    Codex:
      "Running Codex-assisted automated tests, debugging, and feature updates...",
  }

  const rightPromptMap: Record<string, string> = {
    Agents:
      "Querying cooperative AI agent evaluation metrics or ⌘ ↵ for status",
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
      {/* Section Heading (Left-aligned matching Cluely screenshot) */}
      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#19191d] tracking-tight">
          How Adrian delivers reliable engineering
        </h2>
        <p className="text-[#686a71] text-sm sm:text-base mt-2 max-w-2xl">
          Core technical systems built across Cal Poly Bailey College and the
          Department of Computer Science and Software Engineering.
        </p>
      </div>

      {/* Two Large Cards (Matches Cluely Left Blue + Right Pale Glass Container) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left Card: Cal Poly Bailey College */}
        <div
          className="relative flex flex-col justify-between gap-6 rounded-3xl p-7 sm:p-9 lg:p-10 text-white overflow-hidden shadow-xl"
          style={{
            background:
              "radial-gradient(167.08% 140.48% at 79.5% 0%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(120.74% 124.92% at 7.26% 100%, rgb(68, 122, 235) 0%, rgb(105, 149, 255) 100%)",
            backgroundBlendMode: "overlay, normal",
            boxShadow:
              "inset 1.899px 1.77px 8.174px 0px rgba(255, 255, 255, 0.15), inset 1.007px 0.939px 4.087px 0px rgba(255, 255, 255, 0.15), 0 20px 40px -15px rgba(68, 122, 235, 0.35)",
          }}
        >
          {/* Card Title & Description */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-blue-100 mb-2.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>
                Cal Poly Bailey College // Software Engineering Intern
              </span>
            </div>

            <h3 className="text-2xl sm:text-[28px] leading-tight font-medium tracking-[-0.5px] text-white flex items-center flex-wrap gap-2 mb-3">
              <span>Bailey College</span>
              <span className="-mx-0.5 inline-flex -translate-y-0.5 items-center gap-1.5 rounded-[110px] bg-white/20 px-2.5 py-0.5 align-middle shadow-[inset_2px_2px_9px_rgba(255,255,255,0.5),inset_1px_1px_4.5px_rgba(255,255,255,0.5)] backdrop-blur-3xl text-xs sm:text-sm font-medium text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="16"
                  viewBox="0 0 14 19"
                  fill="none"
                  className="animate-pulse"
                >
                  <line
                    x1="1"
                    y1="6.07"
                    x2="1"
                    y2="12.93"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="5"
                    y1="1"
                    x2="5"
                    y2="18"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="9"
                    y1="4.8"
                    x2="9"
                    y2="14.2"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="13"
                    y1="8.6"
                    x2="13"
                    y2="11.67"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>listens</span>
              </span>
              <span>to campus workflows</span>
            </h3>
            <p className="text-white/85 text-sm sm:text-[15px] leading-relaxed font-normal max-w-lg">
              Built a TypeScript media system with SharePoint and Power Automate
              so staff can quickly find and organize photos across OneDrive,
              using Codex-assisted testing for continuous updates.
            </p>
          </div>

          {/* Running Timer & Live Status */}
          <div className="flex flex-col items-center justify-center my-3">
            <span className="text-4xl sm:text-5xl lg:text-[52px] leading-none font-semibold tracking-[-0.5px] text-white/95 font-mono tabular-nums select-none">
              {formattedTimer}
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs tracking-wide text-white/80 font-medium">
                Media System Active · SharePoint Sync
              </span>
            </div>
          </div>

          {/* Continuous Audio/Data Waveform Conveyor Belt Stream */}
          <div className="w-full overflow-hidden my-3 py-1">
            <div className="animate-waveform-scroll gap-1 items-center h-14">
              {/* First Track Segment */}
              {WAVE_BARS.map((h, i) => (
                <div
                  key={`wave-seg1-${i}`}
                  className="w-1 sm:w-1.5 rounded-full shrink-0 transition-all duration-300"
                  style={{
                    height: `${h}%`,
                    backgroundColor: `rgba(255, 255, 255, ${0.4 + (h / 100) * 0.55})`,
                  }}
                />
              ))}
              {/* Seamless Loop Segment */}
              {WAVE_BARS.map((h, i) => (
                <div
                  key={`wave-seg2-${i}`}
                  className="w-1 sm:w-1.5 rounded-full shrink-0 transition-all duration-300"
                  style={{
                    height: `${h}%`,
                    backgroundColor: `rgba(255, 255, 255, ${0.4 + (h / 100) * 0.55})`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating Dark Translucent HUD Card (Matches Cluely prompt suggestion HUD) */}
          <div className="rounded-2xl bg-[#1e2024]/75 border border-white/20 p-4 backdrop-blur-md shadow-2xl text-left">
            {/* Chip Buttons Row */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-3 text-xs">
              <button
                onClick={() => setActiveLeftChip("Media")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Media"
                    ? "bg-white/25 text-white shadow-xs"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>✦</span>
                <span>TypeScript Media</span>
              </button>
              <span className="w-1 h-1 rounded-full bg-white/30" />

              <button
                onClick={() => setActiveLeftChip("Automate")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Automate"
                    ? "bg-white/25 text-white shadow-xs"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>🪄</span>
                <span>Power Automate</span>
              </button>
              <span className="w-1 h-1 rounded-full bg-white/30" />

              <button
                onClick={() => setActiveLeftChip("OneDrive")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "OneDrive"
                    ? "bg-white/25 text-white shadow-xs"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>💬</span>
                <span>SharePoint &amp; OneDrive</span>
              </button>
              <span className="w-1 h-1 rounded-full bg-white/30" />

              <button
                onClick={() => setActiveLeftChip("Codex")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Codex"
                    ? "bg-white/25 text-white shadow-xs"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>🔄</span>
                <span>Codex Updates</span>
              </button>
            </div>

            {/* Input Bar with Authentic Keycaps */}
            <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-black/45 border border-white/15 text-xs">
              <div className="text-white/75 truncate font-mono text-[11px] flex items-center gap-1.5">
                <span>{leftPromptMap[leftActiveChip]}</span>
                {leftActiveChip === "Media" && (
                  <span className="inline-flex items-center gap-1 ml-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white font-mono border border-white/20">
                      ⌘
                    </kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white font-mono border border-white/20">
                      ↵
                    </kbd>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/80 font-mono">
                  ✦ Smart
                </span>
                <div className="w-6 h-6 rounded-full bg-[#4e95ff] text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-[#3d83ee] transition">
                  <Play className="w-2.5 h-2.5 fill-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Cal Poly Department of CSSE */}
        <div
          className="relative flex flex-col justify-between gap-6 rounded-3xl p-7 sm:p-9 lg:p-10 overflow-hidden shadow-lg border border-[#36393F]/10"
          style={{
            background:
              "radial-gradient(92.09% 124.47% at 50% 99.24%, rgba(221, 226, 238, 0.45) 58.91%, rgba(187, 197, 221, 0.45) 100%)",
          }}
        >
          {/* Card Title & Description */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#4e95ff] mb-2.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>
                Cal Poly Department of CSSE // Undergraduate Researcher
              </span>
            </div>

            <h3 className="text-2xl sm:text-[28px] leading-tight font-medium tracking-[-0.5px] text-[#19191d] flex items-center flex-wrap gap-2 mb-3">
              <span>When researchers need rigor, CSSE</span>
              <span className="-mx-0.5 inline-flex -translate-y-0.5 items-center gap-1.5 rounded-[110px] bg-white px-2.5 py-0.5 align-middle shadow-xs border border-slate-200/80 text-xs sm:text-sm font-medium text-[#19191d]">
                <Sparkles className="w-3.5 h-3.5 text-[#4e95ff]" />
                <span>assists</span>
              </span>
              <span>instantly</span>
            </h3>
            <p className="text-[#686a71] text-sm sm:text-[15px] leading-relaxed font-normal max-w-lg">
              Hit Cmd/Ctrl + Enter to automate training and evaluation pipelines
              for cooperative AI agents with live desktop telemetry.
            </p>
          </div>

          {/* Floating Dynamic Island Notch Pill */}
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 bg-[#1e2024] text-white text-xs shadow-lg border border-white/15 my-2">
            <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#4e95ff]" />
            </div>
            <button
              onClick={() => setIsWindowHidden(!isWindowHidden)}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-medium text-white hover:bg-white/25 transition cursor-pointer"
            >
              <span>{isWindowHidden ? "⌃" : "⌄"}</span>
              <span>{isWindowHidden ? "Show" : "Hide"}</span>
            </button>
            <button className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition cursor-pointer">
              <span className="w-2 h-2 rounded-xs bg-white inline-block" />
            </button>
          </div>

          {/* Floating Dark HUD Window (Matches Cluely right card assistant window) */}
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
            {/* Top Prompt Pill */}
            <div className="flex justify-end mb-3">
              <div className="w-fit rounded-xl rounded-br-xs px-3 py-1.5 text-xs font-semibold text-white bg-[#0544a9] shadow-[inset_0_1px_0_rgba(129,182,255,0.4)]">
                Cooperative AI
              </div>
            </div>

            {/* Response Output */}
            <div className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal mb-5 space-y-2">
              <div className="text-emerald-400 text-[11px] font-mono">
                Python Backend · GitHub Actions CI/CD &amp; pytest
              </div>
              <p>
                Engineered a Python backend to automate training and evaluation
                pipelines for cooperative AI agents. Set up GitHub Actions CI/CD
                and pytest to catch bugs automatically and developed an
                interactive desktop application for live agent telemetry.
              </p>
            </div>

            {/* Action Chips Row */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4 text-xs">
              <button
                onClick={() => setActiveRightChip("Agents")}
                className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full transition cursor-pointer ${
                  rightActiveChip === "Agents"
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-[#b2b3ba]">✦</span>
                <span>Cooperative AI</span>
              </button>
              <span className="w-1 h-1 rounded-full bg-white/20" />

              <button
                onClick={() => setActiveRightChip("Backend")}
                className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full transition cursor-pointer ${
                  rightActiveChip === "Backend"
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-[#b2b3ba]">🪄</span>
                <span>Python Backend</span>
              </button>
              <span className="w-1 h-1 rounded-full bg-white/20" />

              <button
                onClick={() => setActiveRightChip("Pytest")}
                className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full transition cursor-pointer ${
                  rightActiveChip === "Pytest"
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-[#b2b3ba]">💬</span>
                <span>Pytest &amp; CI/CD</span>
              </button>
              <span className="w-1 h-1 rounded-full bg-white/20" />

              <button
                onClick={() => setActiveRightChip("Telemetry")}
                className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full transition cursor-pointer ${
                  rightActiveChip === "Telemetry"
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-[#b2b3ba]">🔄</span>
                <span>Desktop Telemetry</span>
              </button>
            </div>

            {/* Input Bar with Authentic Keycaps */}
            <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <div className="text-white/75 truncate font-mono text-[11px] flex items-center gap-1.5">
                <span>{rightPromptMap[rightActiveChip]}</span>
                {rightActiveChip === "Agents" && (
                  <span className="inline-flex items-center gap-1 ml-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white font-mono border border-white/20">
                      ⌘
                    </kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white font-mono border border-white/20">
                      ↵
                    </kbd>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/80 font-mono">
                  ✦ Smart
                </span>
                <div className="w-6 h-6 rounded-full bg-[#4e95ff] text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-[#3d83ee] transition">
                  <Play className="w-2.5 h-2.5 fill-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
