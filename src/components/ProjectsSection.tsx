import { useState } from "react"
import {
  ArrowUpRight,
  Code2,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react"
import { PROJECTS, type Project } from "@/data/portfolioData"

export default function ProjectsSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <section id="work" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="apple-eyebrow mb-2">Selected Systems & Software</div>
        <h2 className="apple-headline apple-gradient-text text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          Engineered from first principles.
        </h2>
        <p className="text-neutral-400 text-base sm:text-lg">
          Compilers, developer infrastructure, and grounded AI systems. Built
          with explicit invariants, rigorous testing, and zero superficial
          fluff.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="flex flex-col gap-10">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            copiedId={copiedId}
            onCopyCode={copyCode}
          />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  copiedId,
  onCopyCode,
}: {
  project: Project
  index: number
  copiedId: string | null
  onCopyCode: (code: string, id: string) => void
}) {
  const isFeatured = index === 0

  return (
    <article
      className={`apple-card rounded-3xl p-6 sm:p-10 relative overflow-hidden transition-all duration-300 ${
        isFeatured ? "apple-card-featured" : ""
      }`}
    >
      {/* Top subtle highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Project Details (Left side) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-xs text-neutral-600">/</span>
              <span className="text-xs text-neutral-400">{project.year}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              {project.name}
            </h3>

            <p className="text-base sm:text-lg text-neutral-300 font-medium mb-4 leading-relaxed">
              {project.tagline}
            </p>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2.5 mb-8">
              {project.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400/90 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Tech Stack List - Clean Apple specs */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-medium text-neutral-300"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-4">
              {project.links.map((link, lIdx) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    lIdx === 0 ? "apple-btn-primary" : "apple-btn-secondary"
                  }
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-75" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Code Preview / Architecture Inspector (Right side) */}
        {project.codeSnippet && (
          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl bg-black/80 border border-white/10 overflow-hidden shadow-2xl">
              {/* Terminal Window Header */}
              <div className="px-4 py-3 bg-neutral-900/80 border-b border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-mono text-[11px] text-neutral-300">
                    {project.codeSnippet.title}
                  </span>
                </div>

                <button
                  onClick={() =>
                    onCopyCode(project.codeSnippet!.code, project.id)
                  }
                  className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition focus:outline-none"
                  title="Copy code snippet"
                >
                  {copiedId === project.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code block */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-neutral-300 max-h-[360px]">
                <pre>
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>

              <div className="px-4 py-2.5 bg-neutral-950/60 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
                <span>Production Implementation</span>
                <span className="uppercase text-[10px] text-neutral-400 font-medium">
                  {project.codeSnippet.language}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
