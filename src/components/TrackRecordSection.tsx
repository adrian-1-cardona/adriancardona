import { EXPERIENCES, PROFILE } from "@/data/portfolioData"

export default function TrackRecordSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 py-20 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left Column: Work Experience with Official Company Logos */}
        <div
          className="lg:col-span-7 rounded-3xl p-6 sm:p-8 text-left shadow-lg border border-[#36393F]/10 relative overflow-hidden flex flex-col justify-between"
          style={{
            background:
              "radial-gradient(92.09% 124.47% at 50% 99.24%, rgba(221, 226, 238, 0.5) 58.91%, rgba(187, 197, 221, 0.5) 100%)",
          }}
        >
          {/* Header */}
          <div>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#111827] tracking-tight mb-2">
              Work Experience
            </h3>
            <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed mb-6 font-normal">
              Software engineering appointments, media automation pipelines, and
              research.
            </p>
          </div>

          {/* Experience Stack */}
          <div className="space-y-4">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="p-6 rounded-2xl bg-white border border-[#e5e7eb] shadow-xs text-left"
              >
                {/* Company Logo, Name & Dates */}
                <div className="flex items-start gap-3.5 mb-2">
                  {exp.logo && (
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-10 h-10 rounded-xl object-contain shadow-xs shrink-0 bg-slate-50 border border-slate-100 p-1"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <h4 className="font-bold text-[#111827] text-base sm:text-lg tracking-tight leading-snug">
                        {exp.company}
                      </h4>
                      <div className="text-xs font-mono text-[#6b7280] shrink-0">
                        {exp.period}
                      </div>
                    </div>

                    {/* Role Title & Location */}
                    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-[#111827]">
                          {exp.role}
                        </span>
                        {exp.current && (
                          <span className="text-xs font-mono text-emerald-700 font-medium">
                            · Present
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-[#6b7280]">
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Resume Bullet Points */}
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#374151] leading-relaxed my-4 pl-0 sm:pl-1">
                  {exp.achievements?.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold text-sm leading-none shrink-0 mt-0.5">
                        •
                      </span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Clean Stack Text (No Grey Bubbles) */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="pt-3 border-t border-[#f1f5f9] text-xs font-mono text-[#6b7280]">
                    <span className="font-semibold text-[#111827]">Stack: </span>
                    <span>{exp.skills.join(" · ")}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Matched Container with Education, Metrics, Stack & Action Links */}
        <div
          className="lg:col-span-5 rounded-3xl p-6 sm:p-8 text-left shadow-lg border border-[#36393F]/10 relative overflow-hidden flex flex-col justify-between"
          style={{
            background:
              "radial-gradient(92.09% 124.47% at 50% 99.24%, rgba(221, 226, 238, 0.5) 58.91%, rgba(187, 197, 221, 0.5) 100%)",
          }}
        >
          {/* Top Section: Header & Education */}
          <div>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#111827] tracking-tight mb-2">
              Adrian Cardona
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#4b5563] font-mono mb-5">
              <span>{PROFILE.phone}</span>
              <span className="text-slate-300">·</span>
              <span>{PROFILE.email}</span>
              <span className="text-slate-300">·</span>
              <span>San Luis Obispo, CA</span>
            </div>

            {/* Education Card with Official Cal Poly SLO Seal */}
            <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] shadow-xs mb-5">
              <div className="flex items-start gap-3.5 mb-2">
                <img
                  src={PROFILE.education.logo}
                  alt="Cal Poly SLO"
                  className="w-10 h-10 rounded-xl object-contain shadow-xs shrink-0 bg-slate-50 border border-slate-100 p-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-0.5">
                    Cal Poly San Luis Obispo
                  </div>
                  <div className="text-base font-semibold text-[#111827]">
                    B.S. in Computer Science
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#4b5563] mt-2 pt-2 border-t border-slate-100">
                <span>GPA: 3.5 / 4.0</span>
                <span>Expected May 2027</span>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100">
                <div className="text-[10px] font-mono text-[#6b7280] uppercase tracking-wider mb-1">
                  Relevant Coursework
                </div>
                <div className="text-xs text-[#374151] leading-relaxed">
                  Data Structures &amp; Algorithms, Systems Programming,
                  Databases, Computer Security
                </div>
              </div>
            </div>

            {/* Key Metrics 4-Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3.5 rounded-xl bg-white border border-[#e5e7eb] shadow-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-mono">
                  4
                </div>
                <div className="font-semibold text-[#111827] text-[11px] mt-0.5">
                  Roles &amp; Appointments
                </div>
                <div className="text-[10px] text-[#6b7280]">
                  Bailey, CSSE, FCCC, Extern
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#e5e7eb] shadow-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-mono">
                  3.5
                </div>
                <div className="font-semibold text-[#111827] text-[11px] mt-0.5">
                  Cal Poly GPA
                </div>
                <div className="text-[10px] text-[#6b7280]">
                  Out of 4.0 scale
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#e5e7eb] shadow-xs">
                <div className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight font-mono pt-0.5">
                  May &apos;27
                </div>
                <div className="font-semibold text-[#111827] text-[11px] mt-0.5">
                  Graduation
                </div>
                <div className="text-[10px] text-[#6b7280]">
                  San Luis Obispo, CA
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#e5e7eb] shadow-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-mono">
                  2
                </div>
                <div className="font-semibold text-[#111827] text-[11px] mt-0.5">
                  Flagship Projects
                </div>
                <div className="text-[10px] text-[#6b7280]">
                  Guppty &amp; Gitex
                </div>
              </div>
            </div>

            {/* Technical Arsenal Card (Clean Typographic Text - No Grey Bubbles) */}
            <div className="p-4 rounded-xl bg-white border border-[#e5e7eb] shadow-xs mb-5">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#111827] mb-3">
                Technical Arsenal
              </div>

              <div className="space-y-2.5 text-xs text-[#4b5563] leading-relaxed">
                <div>
                  <span className="font-semibold text-[#111827]">Languages: </span>
                  <span>
                    Python, TypeScript, JavaScript, Rust, SQL, Java, C, C++, HTML, CSS
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-[#111827]">
                    Frameworks &amp; Infra:{" "}
                  </span>
                  <span>
                    React, Next.js, Node.js, FastAPI, PostgreSQL, Redis, Convex,
                    Docker, Tailwind CSS
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-[#111827]">
                    Developer Tools:{" "}
                  </span>
                  <span>
                    Git, GitHub Actions CI/CD, Unix/Linux, Jira, VS Code,
                    pytest, Codex
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="space-y-2 pt-1">
            <a
              href="/ADRIAN_CARDONA_RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e5e7eb] text-xs font-semibold text-[#111827] hover:border-[#111827] shadow-xs transition group"
            >
              <span>Download Resume (PDF)</span>
              <span className="text-xs font-mono text-[#6b7280] group-hover:text-[#111827] transition">
                ↗
              </span>
            </a>
            <a
              href="https://github.com/adrian-1-cardona"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e5e7eb] text-xs font-semibold text-[#111827] hover:border-[#111827] shadow-xs transition group"
            >
              <span>GitHub (adrian-1-cardona)</span>
              <span className="text-xs font-mono text-[#6b7280] group-hover:text-[#111827] transition">
                ↗
              </span>
            </a>
            <a
              href="https://linkedin.com/in/adrian-cardona"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e5e7eb] text-xs font-semibold text-[#111827] hover:border-[#111827] shadow-xs transition group"
            >
              <span>LinkedIn (/in/adrian-cardona)</span>
              <span className="text-xs font-mono text-[#6b7280] group-hover:text-[#111827] transition">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
