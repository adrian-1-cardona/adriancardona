import { Cpu, ShieldCheck, Repeat } from "lucide-react"

export default function TenetsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto text-center">
      {/* Centered Heading (Matches Cluely 'Undetectable in every way') */}
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
        Dependable in every way
      </h2>
      <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-12">
        Core engineering principles that guide architecture, automated testing,
        and systems implementation.
      </p>

      {/* 3-Column Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-6">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Zero GC Overhead
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Guppty achieves deterministic memory bounds by compiling to stack
              bytecode and managing closure upvalues explicitly in pure Rust,
              avoiding periodic garbage collection latency pauses.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              100% Citation Grounding
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every LLM output generated in Gitex and document intelligence
              pipelines must provide verifiable AST-linked bracketed citations,
              with automated validation suites rejecting hallucinations.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-6">
              <Repeat className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Bit-for-Bit Determinism
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Cal Poly CSSE research runners isolate subprocess memory, lock
              pseudo-random seeds, and execute continuous integration checks to
              ensure scientific experiments replicate identically.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
