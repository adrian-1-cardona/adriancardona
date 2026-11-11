import { ArrowUpRight } from "lucide-react"
import { PROJECTS } from "@/data/portfolioData"

export default function ProjectsSection() {
  return (
    <section id="projects" className="pt-4">
      <h2 className="section-heading">
        RECENT <span>PROJECTS</span>
      </h2>

      <div className="space-y-6">
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className="solid-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#6a6b6e] block mb-1">
                  0{index + 1}
                </span>
                <span className="text-xs font-semibold text-[#f46c38] uppercase tracking-wider block mb-1">
                  {project.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {project.name}
                </h3>
              </div>

              {project.links[0] && (
                <a
                  href={project.links[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#242220] hover:bg-[#2c2927] border border-[#35312e] text-white transition shrink-0"
                  aria-label={`Open ${project.name}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>

            <p className="text-sm sm:text-base text-[#998f8f] leading-relaxed mb-6 font-normal">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#2a2725] text-xs">
              <div className="flex flex-wrap items-center gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded bg-[#242220] text-[#998f8f] font-mono text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.links[0] && (
                <a
                  href={project.links[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#f46c38] hover:underline inline-flex items-center gap-1"
                >
                  <span>{project.links[0].label}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
