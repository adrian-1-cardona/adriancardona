export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (5 cols): Authentic High-Res Portrait */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-neutral-200/80 shadow-md bg-neutral-100">
            <img
              src="/adrian-portrait-color.webp"
              alt="Adrian Cardona"
              className="w-full h-full object-cover object-center filter grayscale-0 contrast-[1.02] hover:scale-102 transition duration-500"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-3 border border-black/5 text-xs">
              <div className="font-bold text-black">Adrian Cardona</div>
              <div className="text-neutral-600 font-mono text-[11px]">
                Computer Science · Cal Poly San Luis Obispo
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Background, Vision & Core Standards */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-2">
              Background &amp; Craft
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black tracking-tight leading-tight mb-4">
              Building at the intersection of systems, compilers, and intelligent software.
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
              I am a third-year Computer Science student at California Polytechnic State University, San Luis Obispo (3.5 GPA). My work centers on building reliable software from first principles—whether designing custom bytecode interpreters in Rust, orchestrating multi-agent reinforcement learning pipelines, or developing TypeScript media infrastructure for university staff.
            </p>
          </div>

          {/* Three Core Standards (Clean Typography, No Badges) */}
          <div className="space-y-4 pt-2">
            <div className="border-l-2 border-black pl-3.5">
              <h3 className="text-xs font-bold text-black font-mono uppercase tracking-wider mb-0.5">
                Rigor &amp; Verifiability
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Every system I build is paired with rigorous automated testing—from differential tests verifying AST and VM execution in Guppty to synthetic retrieval benchmarks verifying zero hallucinations in Gitex.
              </p>
            </div>

            <div className="border-l-2 border-black pl-3.5">
              <h3 className="text-xs font-bold text-black font-mono uppercase tracking-wider mb-0.5">
                Real-World Empathy
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                At Cal Poly Bailey College, I interface directly with department staff to iterate on media ingestion tooling, using feedback and Codex-assisted workflows to resolve real workflow friction.
              </p>
            </div>

            <div className="border-l-2 border-black pl-3.5">
              <h3 className="text-xs font-bold text-black font-mono uppercase tracking-wider mb-0.5">
                Clean Architecture Over Decoration
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Prioritizing clean abstractions, fast compilation, and responsive user experiences without relying on unnecessary visual clutter or marketing fluff.
              </p>
            </div>
          </div>

          <div className="pt-2 text-xs font-mono text-neutral-500">
            Based in San Luis Obispo, CA · Available for Summer 2026 Software Engineering Roles
          </div>
        </div>
      </div>
    </section>
  )
}
