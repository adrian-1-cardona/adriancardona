import { EXPERIENCES } from "@/data/portfolioData"
import { Briefcase, CheckCircle2, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function TrackRecordSection() {
  const [expandedId, setExpandedId] = useState<string>(EXPERIENCES[0].id)

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Cluely Periwinkle Frame with Experience Cards */}
        <div
          className="lg:col-span-7 rounded-3xl p-6 sm:p-8 text-left shadow-lg border border-[#36393F]/10 relative overflow-hidden"
          style={{
            background:
              "radial-gradient(92.09% 124.47% at 50% 99.24%, rgba(221, 226, 238, 0.5) 58.91%, rgba(187, 197, 221, 0.5) 100%)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#4e95ff]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4e95ff]">
                Experience &amp; Appointments
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#686a71] bg-white/70 px-2.5 py-0.5 rounded-full border border-slate-200">
              2024 — 2026
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#19191d] tracking-tight mb-5">
            Engineering &amp; Research Appointments
          </h3>

          {/* Interactive Stacked Experience Cards */}
          <div className="space-y-3.5">
            {EXPERIENCES.map((exp) => {
              const isExpanded = expandedId === exp.id
              return (
                <div
                  key={exp.id}
                  onClick={() => setExpandedId(isExpanded ? "" : exp.id)}
                  className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-200 cursor-pointer shadow-xs ${
                    isExpanded
                      ? "border-[#4e95ff]/50 shadow-md ring-1 ring-[#4e95ff]/20"
                      : "border-[#e5e7eb] hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <div className="font-bold text-[#19191d] text-sm sm:text-base flex items-center gap-2">
                      <span>{exp.role}</span>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 text-[10px] font-medium font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Current</span>
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-[#9ca3af]">
                      {exp.period}
                    </div>
                  </div>

                  <div className="text-xs text-[#4e95ff] font-semibold mb-2">
                    {exp.company}
                  </div>

                  <p className="text-xs text-[#686a71] leading-relaxed font-normal mb-3">
                    {exp.description}
                  </p>

                  {/* Skills Pills */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#f1f5f9]">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#f8fafc] text-[10px] text-[#4b4b5c] font-mono border border-slate-200/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Expanded Achievements */}
                  {isExpanded && exp.achievements && (
                    <div className="mt-3 pt-3 border-t border-[#f1f5f9] space-y-1.5 animate-in fade-in duration-200">
                      {exp.achievements.map((ach, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-[#4b4b5c] leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Key Stats Matrix (Matches Cluely Section 5 Right Column) */}
        <div className="lg:col-span-5 text-left space-y-8 pl-0 lg:pl-4">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#19191d] tracking-tight mb-3">
              Verifiable track record
            </h2>
            <p className="text-[#686a71] text-sm sm:text-[15px] leading-relaxed font-normal">
              Consistently translating engineering rigor into reliable software,
              compiler runtimes, and empirical academic research.
            </p>
          </div>

          <div className="space-y-6 pt-2">
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-[#19191d] tracking-tight font-mono">
                4
              </div>
              <div className="font-semibold text-[#19191d] text-sm mt-1">
                Engineering &amp; Research Roles
              </div>
              <div className="text-xs text-[#686a71] mt-0.5">
                Cal Poly Bailey College, Cal Poly CSSE, FoundationCCC, Extern AI
              </div>
            </div>

            <div className="border-t border-[#e5e7eb] pt-6">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#19191d] tracking-tight font-mono">
                3.5
              </div>
              <div className="font-semibold text-[#19191d] text-sm mt-1">
                Cal Poly San Luis Obispo GPA
              </div>
              <div className="text-xs text-[#686a71] mt-0.5">
                Computer Science B.S. with continuous academic honors
              </div>
            </div>

            <div className="border-t border-[#e5e7eb] pt-6">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#19191d] tracking-tight font-mono">
                100%
              </div>
              <div className="font-semibold text-[#19191d] text-sm mt-1">
                Deterministic Pass Rate
              </div>
              <div className="text-xs text-[#686a71] mt-0.5">
                Verified across automated GitHub Actions CI &amp; Pytest suites
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
