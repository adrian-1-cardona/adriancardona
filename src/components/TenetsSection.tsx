import { Cpu, ShieldCheck, Repeat } from "lucide-react"

export default function TenetsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto text-center">
      {/* Centered Heading (Matches Cluely 'Undetectable in every way') */}
      <h2 className="text-3xl sm:text-4xl font-bold text-[#37383c] tracking-tight mb-3">
        Dependable in every way
      </h2>
      <p className="text-[#686a71] text-base sm:text-lg max-w-2xl mx-auto mb-12">
        Core engineering principles that guide architecture, automated testing,
        and systems implementation.
      </p>

      {/* 3-Column Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
        <div className="rounded-3xl bg-white border border-[#e5e7eb] p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#edf4ff] border border-[#d4e4fc] flex items-center justify-center text-[#4e95ff] mb-6">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#37383c] mb-2">
              Zero GC Overhead
            </h3>
            <p className="text-sm text-[#686a71] leading-relaxed">
              Guppty achieves deterministic memory bounds by compiling to stack
              bytecode and managing closure upvalues explicitly in pure Rust,
              avoiding periodic garbage collection latency pauses.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-[#e5e7eb] p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#37383c] mb-2">
              100% Citation Grounding
            </h3>
            <p className="text-sm text-[#686a71] leading-relaxed">
              Every LLM output generated in Gitex and document intelligence
              pipelines must provide verifiable AST-linked bracketed citations,
              with automated validation suites rejecting hallucinations.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-[#e5e7eb] p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#f5f3ff] border border-[#ede9fe] flex items-center justify-center text-purple-600 mb-6">
              <Repeat className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#37383c] mb-2">
              Bit-for-Bit Determinism
            </h3>
            <p className="text-sm text-[#686a71] leading-relaxed">
              Cal Poly CSSE research runners isolate subprocess memory, lock
              pseudo-random seeds, and execute continuous integration checks to
              ensure scientific experiments replicate identically.
            </p>
          </div>
        </div>
      </div>

      {/* Integration Technology Strip (Matches Cluely platform row) */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono font-medium text-[#9ca3af] pt-6 border-t border-[#e5e7eb]">
        <span>// RUST</span>
        <span>// PYTHON</span>
        <span>// TYPESCRIPT</span>
        <span>// DOCKER</span>
        <span>// LINUX</span>
        <span>// GITHUB ACTIONS</span>
      </div>
    </section>
  )
}
