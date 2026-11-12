import { EXPERIENCES, PROFILE } from "@/data/portfolioData"

export default function TrackRecordSection() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Work Experience (Pure Typographic Ouckah Style - No Icons) */}
        <div
          className="lg:col-span-7 rounded-3xl p-6 sm:p-8 text-left shadow-lg border border-[#36393F]/10 relative overflow-hidden"
          style={{
            background:
              "radial-gradient(92.09% 124.47% at 50% 99.24%, rgba(221, 226, 238, 0.5) 58.91%, rgba(187, 197, 221, 0.5) 100%)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4e95ff]">
              // Work Experience
            </span>
            <span className="text-[11px] font-mono text-[#686a71] bg-white/80 px-2.5 py-0.5 rounded-full border border-slate-200">
              4 Roles
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-[#19191d] tracking-tight mb-2">
            Work Experience
          </h3>
          <p className="text-xs sm:text-sm text-[#686a71] leading-relaxed mb-6 font-normal">
            Software engineering internships and university research
            appointments.
          </p>

          {/* Experience Stack */}
          <div className="space-y-4">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="p-6 rounded-2xl bg-white border border-[#e5e7eb] shadow-xs text-left"
              >
                {/* Company Name & Dates */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h4 className="font-bold text-[#19191d] text-base sm:text-lg tracking-tight">
                    {exp.company}
                  </h4>
                  <div className="text-xs font-mono text-[#9ca3af] shrink-0">
                    {exp.period}
                  </div>
                </div>

                {/* Role Title, Status Badge & Location */}
                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#4e95ff]">
                      {exp.role}
                    </span>
                    {exp.current && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 text-[10px] font-mono font-medium">
                        Present
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[#9ca3af]">
                    {exp.location}
                  </span>
                </div>

                {/* Direct Resume Bullet Points */}
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#4b4b5c] leading-relaxed mb-4">
                  {exp.achievements?.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#4e95ff] font-bold text-sm leading-none shrink-0 mt-0.5">
                        •
                      </span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills Badges */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#f1f5f9]">
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
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Exact Resume Profile & Education (No Icons) */}
        <div className="lg:col-span-5 text-left space-y-7 pl-0 lg:pl-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#4e95ff] mb-2">
              // Education &amp; Profile
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#19191d] tracking-tight mb-2">
              Adrian Cardona
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#686a71] font-mono mb-4">
              <span>310-489-6795</span>
              <span className="text-slate-300">·</span>
              <span>cardonaadrian101@gmail.com</span>
              <span className="text-slate-300">·</span>
              <span>adriancardona.tech</span>
            </div>

            {/* Education Card */}
            <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] shadow-xs">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#19191d] mb-1">
                Cal Poly San Luis Obispo
              </div>
              <div className="text-base font-semibold text-[#19191d]">
                B.S. in Computer Science
              </div>
              <div className="flex items-center justify-between text-xs text-[#686a71] font-mono mt-2 pt-2 border-t border-slate-100">
                <span className="text-[#4e95ff] font-bold">GPA: 3.5 / 4.0</span>
                <span>Expected May 2027</span>
              </div>
              <div className="text-[11px] text-[#9ca3af] mt-1 font-mono">
                San Luis Obispo, California
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e5e7eb]">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#19191d] tracking-tight font-mono">
                4
              </div>
              <div className="font-semibold text-[#19191d] text-xs mt-1">
                Roles &amp; Appointments
              </div>
              <div className="text-[11px] text-[#686a71] mt-0.5">
                Bailey College, CSSE, FoundationCCC, Extern
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e5e7eb]">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#19191d] tracking-tight font-mono">
                3.5
              </div>
              <div className="font-semibold text-[#19191d] text-xs mt-1">
                Cal Poly GPA
              </div>
              <div className="text-[11px] text-[#686a71] mt-0.5">
                Out of 4.0 Scale
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e5e7eb]">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#19191d] tracking-tight font-mono pt-1">
                May &apos;27
              </div>
              <div className="font-semibold text-[#19191d] text-xs mt-1">
                Graduation
              </div>
              <div className="text-[11px] text-[#686a71] mt-0.5">
                San Luis Obispo, CA
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e5e7eb]">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#19191d] tracking-tight font-mono">
                2
              </div>
              <div className="font-semibold text-[#19191d] text-xs mt-1">
                Featured Projects
              </div>
              <div className="text-[11px] text-[#686a71] mt-0.5">
                Guppty (Rust) &amp; Gitex (TS/React)
              </div>
            </div>
          </div>

          {/* Quick Action Links (Text-only arrows) */}
          <div className="border-t border-[#e5e7eb] pt-5 flex flex-wrap items-center gap-3">
            <a
              href="/ADRIAN_CARDONA_RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cluely-cta !text-xs !py-2.5 !px-5"
            >
              <span>Download Resume ↗</span>
            </a>

            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !text-xs !py-2.5 !px-4 !bg-white"
            >
              <span>GitHub ↗</span>
            </a>

            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !text-xs !py-2.5 !px-4 !bg-white"
            >
              <span>LinkedIn ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
