import { EXPERIENCES } from "@/data/portfolioData"

export default function TrackRecordSection() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Clean Experience Summary Card (Matches Cluely Document Preview) */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-50 border border-slate-200/90 p-6 sm:p-8 text-left shadow-xs">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 mb-2">
            Chronological Experience
          </div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
            Engineering &amp; Academic Record
          </h3>

          <div className="space-y-4">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <div className="font-bold text-slate-900 text-sm">
                    {exp.role}
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    {exp.period}
                  </div>
                </div>

                <div className="text-xs text-blue-600 font-semibold mb-2">
                  {exp.company}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Key Stats Matrix (Matches Cluely Stat Stack) */}
        <div className="lg:col-span-5 text-left space-y-8 pl-0 lg:pl-6">
          <div>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">
              Verifiable track record
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Consistently translating engineering rigor into reliable software
              and empirical academic findings.
            </p>
          </div>

          <div className="space-y-6 pt-2">
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                4
              </div>
              <div className="font-semibold text-slate-800 text-sm mt-0.5">
                Engineering &amp; Research Roles
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Cal Poly Bailey College, Cal Poly CSSE, FoundationCCC, Extern AI
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                3.5
              </div>
              <div className="font-semibold text-slate-800 text-sm mt-0.5">
                Cal Poly San Luis Obispo GPA
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Computer Science major with high academic standing
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                100%
              </div>
              <div className="font-semibold text-slate-800 text-sm mt-0.5">
                Deterministic Test Pass Rate
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Verified across automated GitHub Actions CI &amp; Pytest suites
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
