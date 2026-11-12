import { useState, useEffect } from "react"

// Cluely audio waveform: tall on outer ends, quiet 4px dots in the center
const WAVEFORM_BARS = [
  16, 26, 38, 30, 20, 14, 10, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 4, 4, 4, 4, 6, 10, 16, 24, 38, 28, 18, 10,
]

export default function SelectedWorkSection() {
  const [seconds, setSeconds] = useState(12)
  const [leftActiveChip, setLeftActiveChip] = useState("Assist")
  const [rightActiveChip, setRightActiveChip] = useState("Assist")
  const [isWindowHidden, setIsWindowHidden] = useState(false)

  // Live timer tick matching Cluely's 00:12 counter
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev >= 59 ? 0 : prev + 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedTimer = `00:${seconds < 10 ? `0${seconds}` : seconds}`

  // Interactive prompts matching Cluely meeting queries
  const promptMap: Record<string, string> = {
    Assist: "Ask about your screen or conversation, or",
    "What should I say?":
      "Suggesting strategic talking points for the current agenda...",
    "Follow-up questions":
      "Generating insightful follow-up questions for the speaker...",
    Recap: "Summarizing executive action items and decisions made so far...",
  }

  return (
    <section
      id="systems"
      className="py-24 px-4 sm:px-6 max-w-6xl mx-auto text-left"
    >
      {/* Section Heading: Exact Cluely Typography */}
      <div className="mb-10 text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#19191d] tracking-tight leading-tight">
          How Cluely helps during a meeting
        </h2>
      </div>

      {/* Two Large Side-by-Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* ========================================================
            LEFT CARD: Cluely listens in to the conversation
           ======================================================== */}
        <div
          className="relative flex flex-col justify-between gap-6 rounded-[32px] sm:rounded-[36px] p-7 sm:p-9 lg:p-10 text-white overflow-hidden shadow-xl"
          style={{
            background:
              "linear-gradient(180deg, #649aff 0%, #4f87f6 60%, #457ef4 100%)",
            boxShadow:
              "inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 20px 40px -15px rgba(68, 122, 235, 0.35)",
          }}
        >
          {/* Card Top: Title with Inline Waveform Pill */}
          <div>
            <h3 className="text-2xl sm:text-[28px] lg:text-[31px] leading-tight font-medium tracking-[-0.5px] text-white flex items-center flex-wrap gap-2 mb-3">
              <span>Cluely</span>
              <span className="-mx-0.5 inline-flex -translate-y-0.5 items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 align-middle shadow-[inset_1px_1px_4px_rgba(255,255,255,0.4)] backdrop-blur-md text-xs sm:text-sm font-medium text-white">
                <span className="inline-flex items-center gap-[2.5px] h-3.5">
                  <span className="w-[2.5px] h-2 bg-white rounded-full animate-pulse" />
                  <span className="w-[2.5px] h-3.5 bg-white rounded-full" />
                  <span className="w-[2.5px] h-2 bg-white rounded-full animate-pulse" />
                </span>
                <span>listens</span>
              </span>
              <span>in to the conversation</span>
            </h3>
            <p className="text-white/85 text-sm sm:text-[15px] leading-relaxed font-normal max-w-lg">
              It picks up the context of your meeting in real time, so it can
              help when you need it.
            </p>
          </div>

          {/* Running Timer & Live Recording Dot (00:12 above • Recording) */}
          <div className="flex flex-col items-center justify-center my-3 select-none">
            <span className="text-4xl sm:text-5xl lg:text-[56px] leading-none font-semibold tracking-[-0.5px] text-white font-mono tabular-nums">
              {formattedTimer}
            </span>
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <span className="text-xs text-white/85 font-medium tracking-wide">
                Recording
              </span>
            </div>
          </div>

          {/* Symmetrical Audio Waveform Visualizer (Tall on sides, quiet in center) */}
          <div className="flex items-center justify-center gap-1.5 h-12 my-2 overflow-hidden px-2">
            {WAVEFORM_BARS.map((h, i) => (
              <div
                key={`cluely-wave-${i}`}
                className="w-1 sm:w-1.5 rounded-full transition-all duration-300"
                style={{
                  height: `${h}px`,
                  backgroundColor: `rgba(255, 255, 255, ${h > 6 ? 0.95 : 0.5})`,
                }}
              />
            ))}
          </div>

          {/* Floating Dark Frosted Glass HUD */}
          <div className="rounded-2xl bg-[#1e2025]/75 border border-white/20 p-4 backdrop-blur-xl shadow-2xl text-left">
            {/* Quick Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3 text-xs text-white/70">
              <button
                onClick={() => setLeftActiveChip("Assist")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Assist"
                    ? "bg-white/25 text-white shadow-xs"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>🪄</span>
                <span>Assist</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => setLeftActiveChip("What should I say?")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "What should I say?"
                    ? "bg-white/25 text-white shadow-xs"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>🪄</span>
                <span>What should I say?</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => setLeftActiveChip("Follow-up questions")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Follow-up questions"
                    ? "bg-white/25 text-white shadow-xs"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>💬</span>
                <span>Follow-up questions</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => setLeftActiveChip("Recap")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  leftActiveChip === "Recap"
                    ? "bg-white/25 text-white shadow-xs"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>🔄</span>
                <span>Recap</span>
              </button>
            </div>

            {/* Input Box Container */}
            <div className="rounded-xl bg-black/40 border border-white/15 p-3 text-xs flex flex-col gap-2.5">
              <div className="text-white/75 text-[11px] sm:text-xs flex items-center justify-between">
                <span className="truncate">{promptMap[leftActiveChip]}</span>
                <span className="inline-flex items-center gap-1 shrink-0 ml-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white font-mono border border-white/20">
                    ⌘
                  </kbd>
                  <span className="text-[10px] text-white/60">for Assist</span>
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/90 font-medium flex items-center gap-1">
                    <span className="text-xs">✦</span> Smart
                  </span>
                  <span className="text-white/40 text-xs tracking-widest font-mono">
                    ···
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#1b64f2] text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-[#1554d1] transition text-[11px] font-bold">
                  ▶
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT CARD: When you need help, Cluely assists you instantly
           ======================================================== */}
        <div
          className="relative flex flex-col justify-between gap-6 rounded-[32px] sm:rounded-[36px] p-7 sm:p-9 lg:p-10 overflow-hidden shadow-lg border border-[#e2e5eb]"
          style={{
            background: "linear-gradient(180deg, #f7f8fb 0%, #edf0f6 100%)",
          }}
        >
          {/* Card Top: Title with Inline Assist Star Pill */}
          <div>
            <h3 className="text-2xl sm:text-[28px] lg:text-[31px] leading-tight font-medium tracking-[-0.5px] text-[#19191d] flex items-center flex-wrap gap-2 mb-3">
              <span>When you need help, Cluely</span>
              <span className="-mx-0.5 inline-flex -translate-y-0.5 items-center gap-1.5 rounded-full bg-white px-3 py-1 align-middle shadow-xs border border-gray-200/90 text-xs sm:text-sm font-medium text-[#19191d]">
                <span className="text-[#4e95ff] text-xs">✦</span>
                <span>assists</span>
              </span>
              <span>you instantly</span>
            </h3>
            <p className="text-[#686a71] text-sm sm:text-[15px] leading-relaxed font-normal max-w-lg">
              Hit Cmd/Ctrl + Enter and Cluely helps you with AI in the moment.
            </p>
          </div>

          {/* Dynamic Island Notch Pill */}
          <div className="mx-auto flex w-fit items-center gap-3 rounded-full px-3.5 py-1.5 bg-[#1e2025] text-white text-xs shadow-xl border border-white/15 my-1 select-none">
            <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
            </div>
            <button
              onClick={() => setIsWindowHidden(!isWindowHidden)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-medium text-white hover:bg-white/20 transition cursor-pointer"
            >
              <span>{isWindowHidden ? "⌃ Show" : "⌄ Hide"}</span>
            </button>
            <div className="w-2.5 h-2.5 rounded-xs bg-white/90 inline-block" />
          </div>

          {/* Floating Dark HUD Window */}
          <div
            className={`rounded-2xl bg-[#1e2025] text-white p-5 border border-white/15 shadow-2xl flex flex-col justify-between transition-all duration-300 ${
              isWindowHidden
                ? "opacity-40 max-h-16 overflow-hidden scale-95"
                : "opacity-100 max-h-[520px] scale-100"
            }`}
            style={{
              background:
                "linear-gradient(180deg, rgba(30, 32, 37, 0.98) 0%, rgba(24, 26, 30, 0.99) 100%)",
            }}
          >
            {/* Top Right Speech Badge */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8a8d98] text-[11px] font-normal">
                Viewed screen
              </span>
              <div className="w-fit rounded-lg px-3 py-1 text-xs font-semibold text-white bg-[#0b63e5] shadow-xs">
                Assist
              </div>
            </div>

            {/* Response Output Body Text */}
            <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal mb-4">
              Cluely is an AI meeting assistant that listens in real time,
              understands what&apos;s being said, and gives you instant answers,
              notes, and next steps, all while staying completely undetectable
              on your screen.
            </p>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3 text-xs text-white/70">
              <button
                onClick={() => setRightActiveChip("Assist")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  rightActiveChip === "Assist"
                    ? "bg-white/20 text-white"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>🪄</span>
                <span>Assist</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => setRightActiveChip("What should I say?")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  rightActiveChip === "What should I say?"
                    ? "bg-white/20 text-white"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>🪄</span>
                <span>What should I say?</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => setRightActiveChip("Follow-up questions")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  rightActiveChip === "Follow-up questions"
                    ? "bg-white/20 text-white"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>💬</span>
                <span>Follow-up questions</span>
              </button>
              <span className="text-white/30">·</span>

              <button
                onClick={() => setRightActiveChip("Recap")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  rightActiveChip === "Recap"
                    ? "bg-white/20 text-white"
                    : "hover:text-white hover:bg-white/10"
                }`}
              >
                <span>🔄</span>
                <span>Recap</span>
              </button>
            </div>

            {/* Input Box Container */}
            <div className="rounded-xl bg-black/40 border border-white/15 p-3 text-xs flex flex-col gap-2.5">
              <div className="text-white/75 text-[11px] sm:text-xs flex items-center justify-between">
                <span className="truncate">{promptMap[rightActiveChip]}</span>
                <span className="inline-flex items-center gap-1 shrink-0 ml-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] text-white font-mono border border-white/20">
                    ⌘
                  </kbd>
                  <span className="text-[10px] text-white/60">for Assist</span>
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/90 font-medium flex items-center gap-1">
                    <span className="text-xs">✦</span> Smart
                  </span>
                  <span className="text-white/40 text-xs tracking-widest font-mono">
                    ···
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#1b64f2] text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-[#1554d1] transition text-[11px] font-bold">
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
