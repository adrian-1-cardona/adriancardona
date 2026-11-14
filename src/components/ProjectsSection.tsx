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
      className="relative min-h-screen flex flex-col justify-center py-24 sm:py-36 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto z-20 pointer-events-auto"
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
            className="group relative aspect-[2.1/1] w-full rounded-2xl sm:rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            <svg
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              viewBox="0 0 600 286"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Card 1 Background Gradient */}
              <rect width="600" height="286" fill="url(#card1Bg)" />
              {/* Lavender Silk Wave Path */}
              <path
                d="M-40 220 C140 160 260 260 400 140 C460 90 530 110 640 140 L640 320 L-40 320 Z"
                fill="url(#card1Wave1)"
              />
              <path
                d="M-20 260 C180 190 320 290 620 120 L620 320 L-20 320 Z"
                fill="url(#card1Wave2)"
                opacity="0.9"
              />
              {/* Specular White Gleam */}
              <path
                d="M-40 220 C140 160 260 260 400 140 C460 90 530 110 640 140"
                stroke="rgba(255, 255, 255, 0.75)"
                strokeWidth="3.5"
                fill="none"
              />
              <defs>
                <linearGradient id="card1Bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ede5fc" />
                  <stop offset="50%" stopColor="#e3d6fb" />
                  <stop offset="100%" stopColor="#d6c6f8" />
                </linearGradient>
                <linearGradient id="card1Wave1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c5aef8" />
                  <stop offset="50%" stopColor="#ab8eee" />
                  <stop offset="100%" stopColor="#8d6fe3" />
                </linearGradient>
                <linearGradient id="card1Wave2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8668df" />
                  <stop offset="60%" stopColor="#9e84ec" />
                  <stop offset="100%" stopColor="#cfbefa" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Card 2: Sky Blue Silk Wave (Guppty) */}
          <div
            onClick={() => onSelectProject("guppty")}
            className="group relative aspect-[2.1/1] w-full rounded-2xl sm:rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            <svg
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              viewBox="0 0 600 286"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Card 2 Background Gradient */}
              <rect width="600" height="286" fill="url(#card2Bg)" />
              {/* Sky Blue Silk Wave Path */}
              <path
                d="M-30 250 C160 170 300 240 440 90 C500 30 550 40 640 50 L640 320 L-30 320 Z"
                fill="url(#card2Wave1)"
              />
              <path
                d="M-30 290 C180 200 340 260 640 110 L640 320 L-30 320 Z"
                fill="url(#card2Wave2)"
                opacity="0.85"
              />
              {/* Specular White Gleam */}
              <path
                d="M-30 250 C160 170 300 240 440 90 C500 30 550 40 640 50"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="3.5"
                fill="none"
              />
              <defs>
                <linearGradient id="card2Bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e5f0fc" />
                  <stop offset="50%" stopColor="#d9eafc" />
                  <stop offset="100%" stopColor="#c5e0fa" />
                </linearGradient>
                <linearGradient id="card2Wave1" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#62a9f8" />
                  <stop offset="50%" stopColor="#438ef0" />
                  <stop offset="100%" stopColor="#2c77de" />
                </linearGradient>
                <linearGradient id="card2Wave2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2d73dc" />
                  <stop offset="70%" stopColor="#539bf5" />
                  <stop offset="100%" stopColor="#8cc1fc" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
