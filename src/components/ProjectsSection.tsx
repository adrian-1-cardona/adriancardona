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
      className="relative min-h-screen flex flex-col justify-center py-24 sm:py-36 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto z-20 pointer-events-auto"
    >
      {/* Space reserved for 3D MacBook choreography */}
      <div className="h-64 sm:h-[380px] pointer-events-none mb-8" />

      {/* Projects Section matching user reference image exactly */}
      <div className="text-left w-full">
        <div className="text-xs uppercase tracking-[0.28em] text-neutral-400 font-semibold mb-6">
          PROJECTS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Lavender Silk Wave (Gitex) */}
          <div
            onClick={() => onSelectProject("gitex")}
            className={`group relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg ${
              activeProject === "gitex" ? "ring-2 ring-black/80" : "hover:ring-1 hover:ring-black/20"
            }`}
          >
            <svg
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              viewBox="0 0 600 375"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Card 1 Background Gradient */}
              <rect width="600" height="375" fill="url(#card1Bg)" />
              {/* Lavender Silk Wave Path */}
              <path
                d="M-50 250 C120 180 260 320 420 180 C480 130 550 160 650 200 L650 400 L-50 400 Z"
                fill="url(#card1Wave1)"
              />
              <path
                d="M-30 310 C180 220 320 360 630 140 L630 400 L-30 400 Z"
                fill="url(#card1Wave2)"
                opacity="0.85"
              />
              {/* Highlight ribbon */}
              <path
                d="M-50 250 C120 180 260 320 420 180 C480 130 550 160 650 200"
                stroke="rgba(255, 255, 255, 0.7)"
                strokeWidth="4"
                fill="none"
              />
              <defs>
                <linearGradient id="card1Bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5efff" />
                  <stop offset="50%" stopColor="#ece2fd" />
                  <stop offset="100%" stopColor="#d8d4fa" />
                </linearGradient>
                <linearGradient id="card1Wave1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#cbbaf8" />
                  <stop offset="50%" stopColor="#b49cf5" />
                  <stop offset="100%" stopColor="#9381ea" />
                </linearGradient>
                <linearGradient id="card1Wave2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8d7ce8" />
                  <stop offset="60%" stopColor="#a392f3" />
                  <stop offset="100%" stopColor="#d3c7fc" />
                </linearGradient>
              </defs>
            </svg>

            {/* Subtle overlay metadata appearing on hover */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white text-lg font-bold">Gitex</div>
              <div className="text-white/80 text-xs">Codebase Q&amp;A platform · Convex · Gemini API</div>
            </div>
          </div>

          {/* Card 2: Sky Blue Silk Wave (Guppty) */}
          <div
            onClick={() => onSelectProject("guppty")}
            className={`group relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg ${
              activeProject === "guppty" ? "ring-2 ring-black/80" : "hover:ring-1 hover:ring-black/20"
            }`}
          >
            <svg
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              viewBox="0 0 600 375"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Card 2 Background Gradient */}
              <rect width="600" height="375" fill="url(#card2Bg)" />
              {/* Sky Blue Silk Wave Path */}
              <path
                d="M-40 320 C180 200 340 300 480 120 C540 40 600 60 650 80 L650 400 L-40 400 Z"
                fill="url(#card2Wave1)"
              />
              <path
                d="M-40 380 C200 240 380 320 650 160 L650 400 L-40 400 Z"
                fill="url(#card2Wave2)"
                opacity="0.8"
              />
              {/* Highlight ribbon */}
              <path
                d="M-40 320 C180 200 340 300 480 120 C540 40 600 60 650 80"
                stroke="rgba(255, 255, 255, 0.75)"
                strokeWidth="4"
                fill="none"
              />
              <defs>
                <linearGradient id="card2Bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#eaf4ff" />
                  <stop offset="50%" stopColor="#dcecfd" />
                  <stop offset="100%" stopColor="#c5e0fc" />
                </linearGradient>
                <linearGradient id="card2Wave1" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5fa8f8" />
                  <stop offset="50%" stopColor="#7cbcf9" />
                  <stop offset="100%" stopColor="#a3d2fa" />
                </linearGradient>
                <linearGradient id="card2Wave2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="70%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#93c5fd" />
                </linearGradient>
              </defs>
            </svg>

            {/* Subtle overlay metadata appearing on hover */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white text-lg font-bold">Guppty</div>
              <div className="text-white/80 text-xs">Rust programming language · Bytecode compiler · VM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
