import { EXPERIENCES, PROFILE } from "@/data/portfolioData"

export default function TrackRecordSection() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Work Experience with Company Logos */}
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
                      <h4 className="font-bold text-[#19191d] text-base sm:text-lg tracking-tight leading-snug">
                        {exp.company}
                      </h4>
                      <div className="text-xs font-mono text-[#9ca3af] shrink-0">
                        {exp.period}
                      </div>
                    </div>

                    {/* Role Title, Status Badge & Location */}
                    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
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
                  </div>
                </div>

                {/* Direct Resume Bullet Points */}
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#4b4b5c] leading-relaxed my-4 pl-0 sm:pl-1">
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

        {/* Right Column: Exact Resume Profile & Education */}
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

            {/* Education Card with Cal Poly Logo */}
            <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] shadow-xs">
              <div className="flex items-start gap-3.5 mb-2">
                <img
                  src={PROFILE.education.logo}
                  alt="Cal Poly SLO"
                  className="w-10 h-10 rounded-xl object-contain shadow-xs shrink-0 bg-slate-50 border border-slate-100 p-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#19191d] mb-0.5">
                    Cal Poly San Luis Obispo
                  </div>
                  <div className="text-base font-semibold text-[#19191d]">
                    B.S. in Computer Science
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#686a71] mt-2 pt-2 border-t border-slate-100">
                <span>GPA: 3.5 / 4.0</span>
                <span>Expected May 2027</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="space-y-2.5">
            <a
              href="/ADRIAN_CARDONA_RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#e5e7eb] text-sm font-semibold text-[#19191d] hover:border-[#4e95ff] hover:text-[#4e95ff] shadow-xs transition"
            >
              <span>Download Resume (PDF)</span>
              <span className="text-xs font-mono text-[#4e95ff]">↗</span>
            </a>
            <a
              href="https://github.com/adrian-1-cardona"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#e5e7eb] text-sm font-semibold text-[#19191d] hover:border-[#4e95ff] hover:text-[#4e95ff] shadow-xs transition"
            >
              <span>GitHub (adrian-1-cardona)</span>
              <span className="text-xs font-mono text-[#4e95ff]">↗</span>
            </a>
            <a
              href="https://linkedin.com/in/adrian-cardona"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#e5e7eb] text-sm font-semibold text-[#19191d] hover:border-[#4e95ff] hover:text-[#4e95ff] shadow-xs transition"
            >
              <span>LinkedIn (/in/adrian-cardona)</span>
              <span className="text-xs font-mono text-[#4e95ff]">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
