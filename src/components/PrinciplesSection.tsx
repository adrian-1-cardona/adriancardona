import { PRINCIPLES } from "@/data/portfolioData"

export default function PrinciplesSection() {
  return (
    <section id="principles" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="apple-eyebrow mb-2">Engineering Philosophy</div>
        <h2 className="apple-headline apple-gradient-text text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          How I build software.
        </h2>
        <p className="text-neutral-400 text-base sm:text-lg">
          Core values guiding architecture, code review, and systems
          engineering.
        </p>
      </div>

      {/* 3 Principles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {PRINCIPLES.map((principle) => (
          <article
            key={principle.number}
            className="apple-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300"
          >
            {/* Top hairline */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div>
              <span className="text-3xl sm:text-4xl font-mono font-bold text-neutral-600 block mb-4">
                {principle.number}
              </span>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                {principle.title}
              </h3>

              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                {principle.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
