interface ProjectsSectionProps {
  onSelectProject: (project: "gitex" | "guppty") => void
  activeProject: "gitex" | "guppty"
}

export default function ProjectsSection({
  onSelectProject,
  activeProject,
}: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col justify-center py-28 sm:py-36 px-6 sm:px-12 max-w-6xl mx-auto z-20 pointer-events-auto"
    >
      {/* Centered Top Space reserved for the 3D MacBook when it closes and reopens facing forward */}
      <div className="h-64 sm:h-[420px] pointer-events-none mb-6" />

      {/* Projects Cards Layout matching user's reference mockup */}
      <div className="text-left max-w-5xl mx-auto w-full">
        <div className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-6">
          Projects
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Gitex (Lavender Wave Card) */}
          <div
            onClick={() => onSelectProject("gitex")}
            className={`rounded-3xl p-6 sm:p-7 bg-white/80 backdrop-blur-md border transition-all cursor-pointer shadow-sm hover:shadow-md ${
              activeProject === "gitex"
                ? "border-black ring-1 ring-black"
                : "border-neutral-200/90 hover:border-neutral-400"
            }`}
          >
            {/* Visual Preview: Lavender Silk Wave */}
            <div className="w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-6 relative bg-gradient-to-br from-[#ebe6f8] via-[#e2ebfc] to-[#d4e4fc]">
              <svg
                className="w-full h-full object-cover"
                viewBox="0 0 400 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-50 160 C100 80 250 200 450 100 L450 250 L-50 250 Z"
                  fill="url(#cardLavenderGrad)"
                />
                <defs>
                  <linearGradient
                    id="cardLavenderGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#c5aef8" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#a8c8fc" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#8ebbf9" stopOpacity="0.85" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute bottom-3 left-4 text-xs font-mono font-medium text-neutral-800 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
                Interactive Display on Screen
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                Gitex
              </h3>
              <div className="flex items-center gap-3 text-xs font-medium">
                <a
                  href="https://gitex.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-600 hover:text-black hover:underline"
                >
                  Live App
                </a>
                <a
                  href="https://github.com/adrian-1-cardona"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-500 hover:text-black hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-3">
              Codebase Q&amp;A platform. Grounded retrieval with exact source-span citations, Convex vector search, and Gemini API embeddings.
            </p>
          </div>

          {/* Card 2: Guppty (Sky Blue Wave Card) */}
          <div
            onClick={() => onSelectProject("guppty")}
            className={`rounded-3xl p-6 sm:p-7 bg-white/80 backdrop-blur-md border transition-all cursor-pointer shadow-sm hover:shadow-md ${
              activeProject === "guppty"
                ? "border-black ring-1 ring-black"
                : "border-neutral-200/90 hover:border-neutral-400"
            }`}
          >
            {/* Visual Preview: Sky Blue Wave */}
            <div className="w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-6 relative bg-gradient-to-br from-[#e0ecfc] via-[#d6e6fc] to-[#e4e0fb]">
              <svg
                className="w-full h-full object-cover"
                viewBox="0 0 400 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-50 200 C150 120 280 40 450 140 L450 250 L-50 250 Z"
                  fill="url(#cardSkyBlueGrad)"
                />
                <defs>
                  <linearGradient
                    id="cardSkyBlueGrad"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#7cb4f8" stopOpacity="0.85" />
                    <stop offset="60%" stopColor="#a0c8fc" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#bfa8f8" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute bottom-3 left-4 text-xs font-mono font-medium text-neutral-800 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
                Interactive Display on Screen
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                Guppty
              </h3>
              <div className="flex items-center gap-3 text-xs font-medium">
                <a
                  href="https://adrian-1-cardona.github.io/Guppty/#installation"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-600 hover:text-black hover:underline"
                >
                  Docs
                </a>
                <a
                  href="https://github.com/adrian-1-cardona"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-500 hover:text-black hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-3">
              Programming language engineered in Rust with Pratt parser, bytecode compiler, and stack virtual machine backed by 38+ differential tests.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
