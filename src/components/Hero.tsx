import GitexShowcase from "@/components/GitexShowcase"

interface HeroProps {
  onExploreWork: () => void
}

export default function Hero({ onExploreWork }: HeroProps) {
  return (
    <section id="top" className="pt-20 sm:pt-24 lg:pt-28 pb-14 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Clean, Personal Introduction */}
      <div className="max-w-3xl mb-8 sm:mb-10 text-left">
        <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-semibold text-black tracking-tight leading-[1.12] mb-4">
          Hi, I&apos;m Adrian.
          <br />
          <span className="text-neutral-700 font-normal">
            I build software that makes things easier.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal mb-6 max-w-2xl">
          I&apos;m a software engineer at Cal Poly, building applications, developer tools, and AI-powered software.
        </p>

        {/* Actions: One Primary Button & One Understated Secondary Link */}
        <div className="flex items-center gap-6">
          <button
            onClick={onExploreWork}
            className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition cursor-pointer shadow-xs"
          >
            Explore my work
          </button>

          <a
            href="/ADRIAN_CARDONA_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-neutral-600 hover:text-black transition"
          >
            Resume
          </a>
        </div>
      </div>

      {/* The Product as Centerpiece: Gitex Demonstration */}
      <div id="work" className="w-full scroll-mt-24">
        <GitexShowcase />
      </div>
    </section>
  )
}
