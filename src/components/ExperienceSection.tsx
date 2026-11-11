import { EXPERIENCES } from "@/data/portfolioData"

export default function ExperienceSection() {
  return (
    <section id="experience" className="pt-4">
      <h2 className="section-heading">
        4 ROLES OF <span>EXPERIENCE</span>
      </h2>

      <div className="space-y-4">
        {EXPERIENCES.map((exp, index) => (
          <article
            key={exp.id}
            className="solid-card p-6 flex flex-col md:flex-row md:items-start justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <span className="text-sm font-mono font-bold text-[#6a6b6e] shrink-0 mt-0.5">
                0{index + 1}
              </span>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1">
                  {exp.company}
                </h3>
                <p className="text-xs sm:text-sm text-[#998f8f] leading-relaxed max-w-xl">
                  {exp.description}
                </p>
              </div>
            </div>

            <div className="md:text-right shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-[#2a2725]">
              <strong className="text-sm font-semibold text-white block">
                {exp.role}
              </strong>
              <time className="text-xs text-[#6a6b6e] font-mono mt-0.5 block">
                {exp.period}
              </time>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
