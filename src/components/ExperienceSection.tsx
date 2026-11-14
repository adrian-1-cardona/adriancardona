import { useState } from "react"
import { EXPERIENCES, PROFILE } from "@/data/portfolioData"

export default function ExperienceSection() {
  const [selectedId, setSelectedId] = useState<string>(EXPERIENCES[0].id)
  const activeExp = EXPERIENCES.find((e) => e.id === selectedId) || EXPERIENCES[0]

  return (
    <section id="experience" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto text-left">
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black tracking-tight leading-tight mb-2">
          Work Experience &amp; Appointments
        </h2>
        <p className="text-sm sm:text-base text-neutral-700 max-w-2xl leading-relaxed">
          Engineering roles and academic research across Cal Poly Bailey College, Cal Poly CSSE, Foundation for California Community Colleges, and Extern.
        </p>
      </div>

      {/* Main Experience Layout: Interactive Selector + Focused Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-12">
        {/* Left Column (5 cols): Interactive Selector List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-1 px-1">
            Select Organization
          </div>

          {EXPERIENCES.map((exp) => {
            const isSelected = exp.id === activeExp.id
            return (
              <button
                key={exp.id}
                onClick={() => setSelectedId(exp.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  isSelected
                    ? "bg-neutral-50 border-black shadow-xs ring-1 ring-black"
                    : "bg-white border-neutral-200 hover:border-neutral-400"
                }`}
              >
                {/* Official Company Logo */}
                <div className="w-11 h-11 rounded-lg bg-white border border-neutral-200 p-1.5 shrink-0 flex items-center justify-center shadow-xs">
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Company & Role Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h3 className="text-sm font-bold text-black truncate">
                      {exp.company}
                    </h3>
                  </div>
                  <div className="text-xs text-neutral-700 truncate font-medium">
                    {exp.role}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500 mt-0.5">
                    {exp.period}
                  </div>
                </div>

                {/* Status Dot / Active Indicator */}
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                )}
              </button>
            )
          })}
        </div>

        {/* Right Column (7 cols): In-Depth Experience Detail View */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
          {/* Header with Official Logo, Company, Role, Dates & Location */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-neutral-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-white border border-neutral-200 p-2 shrink-0 flex items-center justify-center shadow-xs">
                <img
                  src={activeExp.logo}
                  alt={activeExp.company}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-black tracking-tight leading-snug">
                  {activeExp.company}
                </h3>
                <div className="text-sm font-semibold text-neutral-800 mt-0.5">
                  {activeExp.role}
                </div>
                <div className="text-xs text-neutral-500 mt-1 font-mono">
                  {activeExp.location} · {activeExp.type}
                </div>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="inline-block px-2.5 py-1 rounded-full bg-neutral-100 text-black text-xs font-mono font-semibold">
                {activeExp.period}
              </span>
            </div>
          </div>

          {/* Key Deliverables & Responsibilities: 100% Authentic to Resume */}
          <div className="py-6">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-3">
              Key Contributions &amp; Scope
            </div>
            <ul className="space-y-3.5">
              {activeExp.achievements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-800 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clean Tech Stack (No Grey Pill Badges) */}
          {activeExp.skills && activeExp.skills.length > 0 && (
            <div className="pt-5 border-t border-neutral-100 text-xs sm:text-[13px] font-mono text-black">
              <span className="font-bold text-black">Technologies: </span>
              <span className="text-neutral-700 font-normal">
                {activeExp.skills.join(" · ")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Companion Cards: Education & Career Verification */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Education (7 cols) */}
        <div className="md:col-span-7 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 p-1.5 shrink-0 flex items-center justify-center shadow-xs">
                <img
                  src={PROFILE.education.logo}
                  alt="Cal Poly SLO Seal"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-0.5">
                  Education &amp; Degree
                </div>
                <h4 className="text-base sm:text-lg font-bold text-black leading-snug">
                  California Polytechnic State University, San Luis Obispo
                </h4>
                <div className="text-sm font-semibold text-neutral-800">
                  {PROFILE.education.degree}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-200 text-xs font-mono text-black mb-4">
              <div>
                <span className="text-neutral-500 block">GPA</span>
                <span className="font-bold text-sm">{PROFILE.education.gpa}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Graduation</span>
                <span className="font-bold text-sm">{PROFILE.education.graduation}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Campus</span>
                <span className="font-bold text-sm">San Luis Obispo</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono font-bold text-black uppercase tracking-wider mb-1.5">
                Core Coursework
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed font-mono">
                {PROFILE.education.coursework.join(" · ")}
              </p>
            </div>
          </div>
        </div>

        {/* Career Links & Resume (5 cols) */}
        <div className="md:col-span-5 p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-3">
              Verified Links &amp; Resume
            </div>
            <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
              Official documents and open-source project repositories corresponding to all listed appointments.
            </p>
          </div>

          <div className="space-y-2 text-xs font-semibold">
            <a
              href="/ADRIAN_CARDONA_RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-black text-white hover:bg-neutral-800 transition"
            >
              <span>Download Official Resume (PDF)</span>
              <span className="text-neutral-300 font-mono text-[11px]">PDF</span>
            </a>
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-black hover:border-black transition"
            >
              <span>GitHub (adrian-1-cardona)</span>
              <span className="text-neutral-500 font-mono text-[11px]">Code</span>
            </a>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-black hover:border-black transition"
            >
              <span>LinkedIn (/in/adrian-cardona)</span>
              <span className="text-neutral-500 font-mono text-[11px]">Profile</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
