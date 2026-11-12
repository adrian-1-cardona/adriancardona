export default function FlagshipShowcase() {
  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 max-w-6xl mx-auto text-left"
    >
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4e95ff] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 inline-block mb-3">
          Projects
        </span>
        <h2 className="section-heading text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight mb-3">
          Featured Projects
        </h2>
        <p className="text-[#686a71] text-sm sm:text-base leading-relaxed font-normal">
          Software engineering projects in Rust, TypeScript, React, and Gemini
          API.
        </p>
      </div>

      {/* 2-Column Projects Grid (Exact Resume Titles & Bullets - No Icons) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Project 1: Guppty */}
        <div className="rounded-3xl p-7 bg-[#f8fafc] border border-[#e5e7eb] flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md bg-white text-xs font-mono font-semibold text-[#4e95ff] border border-slate-200">
                Rust
              </span>
              <a
                href="https://github.com/adrian-1-cardona"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#686a71] hover:text-[#19191d] transition"
              >
                Project Site ↗
              </a>
            </div>

            <h3 className="text-2xl font-bold text-[#19191d] tracking-tight mb-2">
              Guppty Programming Language | Project Site
            </h3>
            <p className="text-xs text-[#686a71] mb-5 font-mono">
              Rust · Compiler &amp; Interpreter
            </p>

            <ul className="space-y-3 text-xs sm:text-[13px] text-[#4b4b5c] leading-relaxed mb-6">
              <li className="flex items-start gap-2">
                <span className="text-[#4e95ff] font-bold text-sm leading-none shrink-0 mt-0.5">
                  •
                </span>
                <span>
                  Built a programming language in Rust with a compiler and
                  interpreter, using GitHub Actions CI/CD to automatically test
                  changes.
                </span>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb] text-xs">
            <span className="text-[#9ca3af] font-mono">Rust Runtime</span>
            <a
              href="https://github.com/adrian-1-cardona"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#4e95ff] hover:text-[#1e82e0] transition"
            >
              View Project Site ↗
            </a>
          </div>
        </div>

        {/* Project 2: Gitex */}
        <div className="rounded-3xl p-7 bg-[#f8fafc] border border-[#e5e7eb] flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md bg-white text-xs font-mono font-semibold text-[#4e95ff] border border-slate-200">
                TypeScript, React, JavaScript
              </span>
              <a
                href="https://gitex.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#686a71] hover:text-[#19191d] transition"
              >
                Live App ↗
              </a>
            </div>

            <h3 className="text-2xl font-bold text-[#19191d] tracking-tight mb-2">
              Gitex | Live App
            </h3>
            <p className="text-xs text-[#686a71] mb-5 font-mono">
              TypeScript · React · JavaScript · Gemini API
            </p>

            <ul className="space-y-3 text-xs sm:text-[13px] text-[#4b4b5c] leading-relaxed mb-6">
              <li className="flex items-start gap-2">
                <span className="text-[#4e95ff] font-bold text-sm leading-none shrink-0 mt-0.5">
                  •
                </span>
                <span>
                  Built a TypeScript and React codebase Q&amp;A app with Gemini
                  API, while CI/CD and Sentry catch issues before and after
                  release.
                </span>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb] text-xs">
            <span className="text-[#9ca3af] font-mono">
              Sentry &amp; CI/CD Monitored
            </span>
            <a
              href="https://gitex.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#4e95ff] hover:text-[#1e82e0] transition"
            >
              Open Live App ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
