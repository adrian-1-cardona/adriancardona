import { CheckCircle2, Terminal } from "lucide-react"

export default function FlagshipShowcase() {
  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center"
    >
      {/* Centered Heading (Matches Cluely 'Instant meeting notes') */}
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
        Deterministic Research Infrastructure
      </h2>
      <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-12">
        Automated experiment orchestration and live telemetry built for Cal Poly
        CSSE researchers to eliminate non-determinism in empirical computer
        science.
      </p>

      {/* Large Paper Document Card (Matches Cluely Document Preview) */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.06)] p-6 sm:p-12 text-left relative overflow-hidden">
        {/* Document Header */}
        <div className="border-b border-slate-100 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 mb-1">
              Cal Poly CSSE // Research Software
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Experiment Runner: Repeatable AI Benchmarking
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/60 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Deterministic Reproducibility</span>
          </div>
        </div>

        {/* Document Body */}
        <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-normal">
          <p>
            When AI researchers execute long-running model evaluations across
            distributed environments, subtle variations in GPU execution order,
            CPU thread scheduling, and PRNG seeds corrupt experimental fidelity.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1">
                Subprocess Worker Isolation
              </div>
              <p className="text-xs text-slate-600">
                Each evaluation trial runs in an isolated ephemeral subprocess
                to prevent tensor memory leaks and state contamination between
                trials.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1">
                Live Desktop Telemetry
              </div>
              <p className="text-xs text-slate-600">
                A cross-platform desktop monitor streams trial progress,
                accuracy, loss, and hardware memory without burdening the
                compute loop.
              </p>
            </div>
          </div>

          {/* Test Harness Terminal Block */}
          <div className="rounded-xl bg-slate-900 text-slate-300 p-4 font-mono text-xs overflow-x-auto shadow-inner">
            <div className="text-slate-500 pb-2 mb-2 border-b border-slate-800 flex items-center justify-between">
              <span>pytest --deterministic --seed=42 tests/</span>
              <span className="text-emerald-400">PASSED [100%]</span>
            </div>
            <div className="text-emerald-400">
              tests/test_determinism.py::test_reproducibility PASSED
            </div>
            <div className="text-emerald-400">
              tests/test_harness.py::test_subprocess_isolation PASSED
            </div>
            <div className="text-slate-400">
              ======================== 14 passed in 3.42s
              ========================
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
