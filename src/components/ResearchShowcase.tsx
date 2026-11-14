import { useState } from "react"

const RESEARCH_VIEWS = [
  {
    id: "pipeline",
    label: "Pipeline Architecture",
    description: "Automated Python backend orchestrating training loops and agent state serialization",
  },
  {
    id: "telemetry",
    label: "Desktop Telemetry App",
    description: "Interactive Python desktop application monitoring multi-agent coordination metrics",
  },
  {
    id: "ci-evals",
    label: "Pytest & CI Harness",
    description: "Automated regression testing and benchmark verification in GitHub Actions",
  },
]

export default function ResearchShowcase() {
  const [activeViewId, setActiveViewId] = useState("pipeline")

  return (
    <section id="research" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto text-left">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-2">
            Academic Research · Cal Poly CSSE
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black tracking-tight leading-tight">
            Cooperative AI Systems &amp; Telemetry
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 max-w-md leading-relaxed">
          Engineering the Python infrastructure for automated multi-agent training pipelines and desktop telemetry visualization.
        </p>
      </div>

      {/* View Switcher Chips (Zero Arrows, Apple-Style Segmented Control) */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {RESEARCH_VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveViewId(v.id)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
              activeViewId === v.id
                ? "bg-black text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Main Visualization Stage */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
        {activeViewId === "pipeline" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="text-base font-bold text-black">
                  Python Training &amp; Evaluation Pipeline Architecture
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Decoupled execution loop with deterministic seed generation and state serialization.
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-500">
                Python 3.11 · PyTorch · NumPy
              </span>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="text-[10px] text-neutral-400 uppercase font-bold mb-1">
                  01 · Environment
                </div>
                <div className="font-bold text-black mb-1">Gym Wrapper</div>
                <p className="text-neutral-600 text-[11px] font-sans leading-normal">
                  Vectorized step execution, observation space normalization, and collision boundaries.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="text-[10px] text-neutral-400 uppercase font-bold mb-1">
                  02 · Agents
                </div>
                <div className="font-bold text-black mb-1">Policy Stepper</div>
                <p className="text-neutral-600 text-[11px] font-sans leading-normal">
                  Cooperative multi-agent action selection with shared communication channels.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="text-[10px] text-neutral-400 uppercase font-bold mb-1">
                  03 · Telemetry
                </div>
                <div className="font-bold text-black mb-1">Event Dispatch</div>
                <p className="text-neutral-600 text-[11px] font-sans leading-normal">
                  Non-blocking telemetry buffer streaming agent states to disk and socket visualizer.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="text-[10px] text-neutral-400 uppercase font-bold mb-1">
                  04 · Storage
                </div>
                <div className="font-bold text-black mb-1">HDF5 / Parquet</div>
                <p className="text-neutral-600 text-[11px] font-sans leading-normal">
                  Compressed trajectory dumps for offline analysis and coordination metrics.
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs text-neutral-700 leading-relaxed font-sans">
              <span className="font-bold text-black">Implementation Note: </span>
              The backend automates hyperparameter sweeps and headless evaluation rounds, allowing research colleagues to run parallel agent trials without manual environment setup.
            </div>
          </div>
        )}

        {activeViewId === "telemetry" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="text-base font-bold text-black">
                  Interactive Python Desktop Telemetry Application
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Custom desktop UI built to visualize live agent trajectories, reward signals, and team coordination.
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-500">
                Tkinter / PyQt · Matplotlib
              </span>
            </div>

            {/* Desktop Mockup */}
            <div className="rounded-xl bg-[#0f1115] p-5 text-neutral-200 font-mono text-xs border border-neutral-800">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-[11px] text-neutral-400">
                <span className="text-white font-bold">telemetry_visualizer.py</span>
                <span>Active Episode #412 · Step 1,024</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-[10px] text-neutral-400">Coordination Metric</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1">0.942</div>
                  <div className="text-[10px] text-neutral-400 mt-1">+0.08 vs baseline</div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-[10px] text-neutral-400">Step Latency</div>
                  <div className="text-lg font-bold text-white mt-1">1.84 ms</div>
                  <div className="text-[10px] text-neutral-400 mt-1">60 FPS rendering</div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-[10px] text-neutral-400">Active Agents</div>
                  <div className="text-lg font-bold text-white mt-1">4 Entities</div>
                  <div className="text-[10px] text-neutral-400 mt-1">Synchronous step</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Rendering: Hardware-accelerated Matplotlib canvas</span>
                <span className="text-emerald-400">Telemetry Stream Active</span>
              </div>
            </div>

            <div className="text-xs text-neutral-700 leading-relaxed font-sans">
              <span className="font-bold text-black">Research Impact: </span>
              Provides real-time inspection of agent policy regressions, enabling immediate visual detection of deadlocks or suboptimal coordination strategies during training.
            </div>
          </div>
        )}

        {activeViewId === "ci-evals" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="text-base font-bold text-black">
                  GitHub Actions CI/CD &amp; Pytest Regression Harness
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Automated test execution preventing breaking changes and ensuring repeatable experimental runs.
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-500">
                pytest · GitHub Actions
              </span>
            </div>

            {/* Terminal View */}
            <div className="rounded-xl bg-[#0f1115] p-5 text-neutral-200 font-mono text-xs border border-neutral-800">
              <div className="text-emerald-400 mb-2">$ pytest tests/evals/ -v --tb=short</div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div className="flex justify-between">
                  <span>tests/evals/test_env_vectorization.py::test_step_bounds</span>
                  <span className="text-emerald-400">PASSED</span>
                </div>
                <div className="flex justify-between">
                  <span>tests/evals/test_coordination.py::test_agent_rendezvous</span>
                  <span className="text-emerald-400">PASSED</span>
                </div>
                <div className="flex justify-between">
                  <span>tests/evals/test_telemetry.py::test_buffer_serialization</span>
                  <span className="text-emerald-400">PASSED</span>
                </div>
                <div className="flex justify-between">
                  <span>tests/evals/test_reproducibility.py::test_seed_determinism</span>
                  <span className="text-emerald-400">PASSED</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-emerald-400 text-[11px] font-bold">
                ✓ 24 passed in 3.18s (100% pass rate across all seeds)
              </div>
            </div>

            <div className="text-xs text-neutral-700 leading-relaxed font-sans">
              <span className="font-bold text-black">Reliability Standard: </span>
              Every PR must pass seed determinism tests, ensuring that published experimental figures can be reproduced exactly from checkpoint archives.
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
