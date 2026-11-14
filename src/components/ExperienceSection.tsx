import { EXPERIENCES } from "@/data/portfolioData"

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
      className="relative min-h-screen flex items-center py-24 sm:py-36 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto z-20 pointer-events-auto"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left Column (5 cols): Identical layout to user's reference mockup */}
        <div className="lg:col-span-5 max-w-md text-left">
          <div className="text-xs uppercase tracking-[0.28em] text-neutral-400 font-semibold mb-6">
            EXPERIENCE
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-black tracking-tight leading-[1.08] mb-3">
            {activeExp.role.includes("Software") ? (
              <>
                Software
                <br />
                Engineering Intern
              </>
            ) : (
              activeExp.role
            )}
          </h2>

          <div className="text-xl sm:text-2xl text-neutral-500 font-normal mb-5">
            {activeExp.company.includes("Bailey College")
              ? "Cal Poly"
              : activeExp.company}
          </div>

          {/* Minimal accent line from user's image */}
          <div className="w-10 h-0.5 bg-neutral-300 mb-8" />

          {/* Minimal Role Tabs (Zero clutter, smooth Apple interaction) */}
          <div className="flex items-center gap-2 pt-2">
            {EXPERIENCES.map((exp, idx) => {
              const isSelected = idx === activeRoleIndex
              return (
                <button
                  key={exp.id}
                  onClick={() => onSelectRole(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    isSelected ? "w-8 bg-black" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                  aria-label={exp.company}
                  title={`${exp.role} - ${exp.company}`}
                />
              )
            })}
          </div>
        </div>

        {/* Right Column (7 cols): Reserved for the 3D MacBook extreme close-up side-profile */}
        <div className="lg:col-span-7 h-72 sm:h-[460px] lg:h-[540px] pointer-events-none" />
      </div>
    </section>
  )
}
