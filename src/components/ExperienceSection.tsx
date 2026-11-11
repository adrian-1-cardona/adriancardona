import { Briefcase, Calendar, MapPin, CheckCircle } from "lucide-react"
import { EXPERIENCES } from "@/data/portfolioData"

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="apple-eyebrow mb-2">Track Record</div>
        <h2 className="apple-headline apple-gradient-text text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          Engineering in the field.
        </h2>
        <p className="text-neutral-400 text-base sm:text-lg">
          Four software engineering and academic research roles across Cal Poly
          and California state initiatives.
        </p>
      </div>

      {/* Experience Chronology Cards */}
      <div className="space-y-6">
        {EXPERIENCES.map((exp, index) => (
          <article
            key={exp.id}
            className="apple-card rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300"
          >
            {/* Top hairline */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    {exp.type}
                  </span>
                  {exp.current && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Role
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {exp.role}
                </h3>
                <div className="text-base font-medium text-neutral-300 mt-0.5">
                  {exp.company}
                </div>
              </div>

              {/* Meta: Period & Location */}
              <div className="flex flex-col md:items-end gap-1 text-xs text-neutral-400 shrink-0">
                <div className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{exp.period}</span>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{exp.location}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-5">
              {exp.description}
            </p>

            {/* Bulleted Achievements */}
            <div className="space-y-2 mb-6">
              {exp.achievements.map((item, aIdx) => (
                <div
                  key={aIdx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400/80 mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* Skills & Technologies */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-medium text-neutral-500 mr-1 uppercase tracking-wider">
                Technologies:
              </span>
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-neutral-300 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
