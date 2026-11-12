import { EXPERIENCES, PROFILE } from "@/data/portfolioData"

export default function TrackRecordSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 py-20 px-4 sm:px-6 max-w-6xl mx-auto text-left"
    >
      {/* Section Header: Direct, Authoritative, All Black Text */}
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight leading-tight mb-3">
          Work Experience &amp; Appointments
        </h2>
        <p className="text-base sm:text-lg text-black max-w-3xl leading-relaxed">
          Software engineering internships, enterprise data automation pipelines,
          and cooperative AI research. Proven track record across Cal Poly Bailey
          College, Cal Poly CSSE, Foundation for California Community Colleges,
          and Extern.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Primary Work Experience Stack with Official Company Logos */}
        <div className="lg:col-span-8 space-y-6">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="p-7 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs hover:border-black transition text-left"
            >
              {/* Header: Official Company Logo, Company Name, Role & Dates */}
              <div className="flex items-start gap-4 mb-4">
                {exp.logo && (
                  <div className="w-14 h-14 rounded-xl bg-white border border-neutral-200 p-2 shrink-0 flex items-center justify-center shadow-xs">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight leading-snug">
                      {exp.company}
                    </h3>
                    <div className="text-xs sm:text-sm font-mono font-bold text-black shrink-0">
                      {exp.period}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-black">
                        {exp.role}
                      </span>
                      {exp.current && (
                        <span className="text-xs font-mono font-bold text-black bg-neutral-100 px-2 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-black font-medium">
                      {exp.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Achievements & Responsibilities: Pure Black High-Contrast Text */}
              <ul className="space-y-3 text-sm sm:text-[15px] text-black leading-relaxed my-5 pl-1">
                {exp.achievements?.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-black font-bold text-base leading-none shrink-0 mt-1">
                      •
                    </span>
                    <span className="font-normal text-black">{ach}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack: Clean Typographic Line (No Grey Bubbles) */}
              {exp.skills && exp.skills.length > 0 && (
                <div className="pt-4 border-t border-neutral-100 text-xs sm:text-[13px] font-mono text-black">
                  <span className="font-bold text-black">Tech Stack: </span>
                  <span className="font-normal text-black">
                    {exp.skills.join(" · ")}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column (4 cols): Education, Quantified Impact & Technical Arsenal */}
        <div className="lg:col-span-4 space-y-6">
          {/* Education Card with Official Cal Poly Seal */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200 shadow-xs text-left">
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 p-1.5 shrink-0 flex items-center justify-center shadow-xs">
                <img
                  src={PROFILE.education.logo}
                  alt="Cal Poly SLO Seal"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-mono font-bold text-black uppercase tracking-wider mb-0.5">
                  Education
                </div>
                <h4 className="text-lg font-bold text-black leading-snug">
                  Cal Poly San Luis Obispo
                </h4>
              </div>
            </div>

            <div className="text-sm font-semibold text-black mb-3">
              {PROFILE.education.degree}
            </div>

            <div className="space-y-1.5 text-xs font-mono text-black py-3 border-y border-neutral-100">
              <div className="flex justify-between">
                <span className="font-bold">GPA:</span>
                <span>{PROFILE.education.gpa}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Graduation:</span>
                <span>{PROFILE.education.graduation}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Location:</span>
                <span>{PROFILE.education.location}</span>
              </div>
            </div>

            <div className="mt-3.5">
              <div className="text-xs font-mono font-bold text-black uppercase tracking-wider mb-1.5">
                Core Coursework
              </div>
              <p className="text-xs text-black leading-relaxed">
                {PROFILE.education.coursework.join(", ")}
              </p>
            </div>
          </div>

          {/* Quantified Career Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs text-left">
              <div className="text-3xl font-extrabold text-black font-mono tracking-tight">
                58.5k
              </div>
              <div className="text-xs font-bold text-black mt-1">
                Media Records
              </div>
              <div className="text-[11px] text-black">
                Bailey migration pipeline
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs text-left">
              <div className="text-3xl font-extrabold text-black font-mono tracking-tight">
                4
              </div>
              <div className="text-xs font-bold text-black mt-1">
                Roles Held
              </div>
              <div className="text-[11px] text-black">
                Engineering &amp; research
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs text-left">
              <div className="text-3xl font-extrabold text-black font-mono tracking-tight">
                10+
              </div>
              <div className="text-xs font-bold text-black mt-1">
                Visualizations
              </div>
              <div className="text-[11px] text-black">
                Statewide education data
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs text-left">
              <div className="text-3xl font-extrabold text-black font-mono tracking-tight">
                3.5
              </div>
              <div className="text-xs font-bold text-black mt-1">
                Cal Poly GPA
              </div>
              <div className="text-[11px] text-black">
                Computer Science B.S.
              </div>
            </div>
          </div>

          {/* Technical Arsenal: All Black Typography */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs text-left">
            <h4 className="text-xs font-mono font-bold text-black uppercase tracking-wider mb-3">
              Technical Arsenal
            </h4>

            <div className="space-y-3 text-xs leading-relaxed text-black">
              <div>
                <span className="font-bold text-black">Languages: </span>
                <span className="text-black">
                  Python, TypeScript, JavaScript, Rust, SQL, Java, C, C++, HTML, CSS
                </span>
              </div>
              <div>
                <span className="font-bold text-black">Frameworks &amp; Infra: </span>
                <span className="text-black">
                  React, Next.js, Node.js, FastAPI, PostgreSQL, Redis, Convex,
                  Docker, Tailwind CSS, SharePoint, Power Automate
                </span>
              </div>
              <div>
                <span className="font-bold text-black">Developer Tools: </span>
                <span className="text-black">
                  Git, GitHub Actions CI/CD, Unix/Linux, Jira, VS Code, pytest,
                  LlamaIndex, Ollama
                </span>
              </div>
            </div>
          </div>

          {/* Direct Verified Links */}
          <div className="space-y-2.5">
            <a
              href="/ADRIAN_CARDONA_RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-bold transition shadow-xs"
            >
              <span>Download Full Resume (PDF)</span>
              <span className="font-mono text-sm">↗</span>
            </a>
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-neutral-200 text-black hover:border-black text-xs font-bold transition shadow-xs"
            >
              <span>GitHub (adrian-1-cardona)</span>
              <span className="font-mono text-sm">↗</span>
            </a>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-neutral-200 text-black hover:border-black text-xs font-bold transition shadow-xs"
            >
              <span>LinkedIn (/in/adrian-cardona)</span>
              <span className="font-mono text-sm">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
