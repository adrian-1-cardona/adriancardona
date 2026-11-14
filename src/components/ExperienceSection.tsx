import { EXPERIENCES } from "@/data/portfolioData"

interface ExperienceSectionProps {
  activeRoleIndex: number
  onSelectRole: (index: number) => void
}

export default function ExperienceSection({
  activeRoleIndex,
}: ExperienceSectionProps) {
  const activeExp = EXPERIENCES[activeRoleIndex] || EXPERIENCES[0]

  return (
    <section
      id="experience"
      className="relative min-h-screen flex items-center py-24 sm:py-36 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto z-20 pointer-events-auto"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left Column (5 cols): Identical typography to user's reference mockup */}
        <div className="lg:col-span-5 max-w-md text-left">
          <div className="text-xs uppercase tracking-[0.28em] text-neutral-400 font-semibold mb-6">
            EXPERIENCE
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-black tracking-tight leading-[1.08] mb-3">
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

          {/* Minimal accent line matching reference image */}
          <div className="w-10 h-0.5 bg-neutral-300" />
        </div>

        {/* Right Column (7 cols): Reserved for the 3D MacBook extreme close-up side-profile */}
        <div className="lg:col-span-7 h-72 sm:h-[460px] lg:h-[540px] pointer-events-none" />
      </div>
    </section>
  )
}
