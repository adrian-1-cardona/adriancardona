export default function Hero() {
  return (
    <section id="top" className="pt-8">
      {/* Title */}
      <h1 className="section-heading mb-6">
        SOFTWARE <span>ENGINEER</span>
      </h1>

      {/* Subhead text */}
      <p className="text-base sm:text-xl text-[#998f8f] leading-relaxed max-w-2xl mb-10 font-normal">
        I turn ambitious ideas into reliable software—from programming languages
        and data pipelines to full-stack AI products.
      </p>

      {/* Hero Stats */}
      <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#2a2725] mb-8">
        <div>
          <strong className="text-3xl sm:text-5xl font-extrabold text-white block tracking-tight">
            +4
          </strong>
          <span className="text-[11px] sm:text-xs font-semibold text-[#6a6b6e] uppercase tracking-wider block mt-1 leading-snug">
            Engineering
            <br />
            Roles
          </span>
        </div>

        <div>
          <strong className="text-3xl sm:text-5xl font-extrabold text-white block tracking-tight">
            +3
          </strong>
          <span className="text-[11px] sm:text-xs font-semibold text-[#6a6b6e] uppercase tracking-wider block mt-1 leading-snug">
            Featured
            <br />
            Projects
          </span>
        </div>

        <div>
          <strong className="text-3xl sm:text-5xl font-extrabold text-white block tracking-tight">
            3.5
          </strong>
          <span className="text-[11px] sm:text-xs font-semibold text-[#6a6b6e] uppercase tracking-wider block mt-1 leading-snug">
            Cal Poly
            <br />
            GPA
          </span>
        </div>
      </div>

      {/* Capability Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[#262321] border border-[#35312e] text-xs font-semibold tracking-wider uppercase text-neutral-300">
          Systems Engineering, Data Pipelines
        </div>
        <div className="p-4 rounded-xl bg-[#20251c] border border-[#2e3828] text-xs font-semibold tracking-wider uppercase text-[#c5ff41]">
          TypeScript, Python, Rust, React, FastAPI
        </div>
      </div>
    </section>
  )
}
