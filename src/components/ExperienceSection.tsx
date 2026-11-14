import { EXPERIENCES, PROFILE } from "@/data/portfolioData"

interface ExperienceSectionProps {
  activeRoleIndex: number
  onSelectRole: (index: number) => void
}

export default function ExperienceSection({
  activeRoleIndex,
  onSelectRole,
}: ExperienceSectionProps) {
  const activeExp = EXPERIENCES[activeRoleIndex] || EXPERIENCES[0]

  return (
    <section
      id="experience"
      className="relative min-h-screen flex items-center py-24 sm:py-32 px-6 sm:px-12 max-w-6xl mx-auto z-20 pointer-events-auto"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column (5 cols): Typography matching the user's mockup exactly */}
        <div className="lg:col-span-5 max-w-md text-left">
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-3">
            Experience
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-black tracking-tight leading-[1.15] mb-2">
            {activeExp.role}
          </h2>

          <div className="text-lg sm:text-xl text-neutral-600 font-normal mb-4">
            {activeExp.company.includes("Bailey College")
              ? "Cal Poly"
              : activeExp.company}
          </div>

          {/* Minimal accent line from user's image */}
          <div className="w-8 h-0.5 bg-neutral-300 mb-6" />

          {/* Description & Impact (100% Authentic to Resume) */}
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal mb-8">
            {activeExp.description}
          </p>

          {/* Clean 4-Role Selector (Zero decorative arrows, pure typography) */}
          <div className="space-y-2 pt-2 border-t border-neutral-200/80">
            <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-2">
              Select Role
            </div>
            {EXPERIENCES.map((exp, idx) => {
              const isSelected = idx === activeRoleIndex
              return (
                <button
                  key={exp.id}
                  onClick={() => onSelectRole(idx)}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-black text-white"
                      : "text-neutral-600 hover:text-black hover:bg-neutral-100/70"
                  }`}
                >
                  <span className="truncate">{exp.company}</span>
                  <span className="font-mono text-[10px] opacity-75 shrink-0 ml-2">
                    {exp.period.split("–")[0].trim()}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Education Mention */}
          <div className="mt-8 pt-4 border-t border-neutral-200/80 text-xs text-neutral-500 font-mono">
            Cal Poly SLO · B.S. Computer Science (GPA: {PROFILE.education.gpa})
          </div>
        </div>

        {/* Right Column (7 cols): Reserved for the 3D MacBook side-profile reveal! */}
        <div className="lg:col-span-7 h-64 lg:h-[500px] pointer-events-none" />
      </div>
    </section>
  )
}
