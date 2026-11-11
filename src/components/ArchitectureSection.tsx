import { TOOL_CATEGORIES } from "@/data/portfolioData"
import { Cpu, Layers, Database, ShieldCheck } from "lucide-react"

export default function ArchitectureSection() {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Cpu className="w-4 h-4 text-blue-400" />
      case 1:
        return <Layers className="w-4 h-4 text-purple-400" />
      case 2:
        return <Database className="w-4 h-4 text-emerald-400" />
      default:
        return <ShieldCheck className="w-4 h-4 text-amber-400" />
    }
  }

  return (
    <section id="architecture" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="apple-eyebrow mb-2">Technical Specifications</div>
        <h2 className="apple-headline apple-gradient-text text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          The architectural toolkit.
        </h2>
        <p className="text-neutral-400 text-base sm:text-lg">
          Selected for memory safety, deterministic execution, and end-to-end
          type soundness.
        </p>
      </div>

      {/* 4-Category Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {TOOL_CATEGORIES.map((category, index) => (
          <div
            key={category.title}
            className="apple-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300"
          >
            {/* Top hairline */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div>
              <div className="flex items-center gap-2.5 mb-2">
                {getCategoryIcon(index)}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {category.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mb-6">
                {category.description}
              </p>

              {/* Items List */}
              <div className="divide-y divide-white/[0.06]">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="py-3 flex items-baseline justify-between gap-4 group"
                  >
                    <span className="font-semibold text-sm text-white group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </span>
                    <span className="text-xs text-neutral-400 text-right font-normal">
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
