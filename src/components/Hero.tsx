import GitexShowcase from "@/components/GitexShowcase"

interface HeroProps {
  onExploreWork: () => void
  onViewExperience: () => void
}

export default function Hero({ onExploreWork, onViewExperience }: HeroProps) {
  return (
    <section id="top" className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Authentic Personal Introduction */}
      <div className="max-w-3xl mb-12 sm:mb-14 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-mono font-medium mb-5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Adrian Cardona · Software Engineer</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-[1.08] mb-5">
          Building intelligent systems, compiler runtimes, and developer tooling.
        </h1>

        <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal mb-8 max-w-2xl">
          Computer Science undergraduate at Cal Poly San Luis Obispo (Expected May 2027, GPA 3.5/4.0). Software Engineering Intern at Cal Poly Bailey College of Science and Mathematics, with research in cooperative AI systems and Rust compiler development.
        </p>

        {/* Action Buttons: Clean Typography & Zero Arrows */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onViewExperience}
            className="px-5 py-2.5 rounded-full bg-black text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition cursor-pointer"
          >
            View Experience
          </button>

          <button
            onClick={onExploreWork}
            className="px-5 py-2.5 rounded-full bg-neutral-100 text-black text-xs sm:text-sm font-semibold hover:bg-neutral-200 transition cursor-pointer"
          >
            Explore Projects
          </button>

          <a
            href="/ADRIAN_CARDONA_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-neutral-200 text-black text-xs sm:text-sm font-semibold hover:border-black transition"
          >
            Resume (PDF)
          </a>
        </div>
      </div>

      {/* Featured Flagship Product Demonstration: Gitex */}
      <div id="gitex" className="mt-8">
        <div className="flex items-center justify-between mb-3 px-1 text-xs font-mono">
          <span className="text-neutral-500 uppercase tracking-wider font-semibold">
            Featured Product · Interactive Demonstration
          </span>
          <span className="text-neutral-400">
            Real Codebase Q&amp;A Architecture
          </span>
        </div>

        <GitexShowcase />
      </div>
    </section>
  )
}
