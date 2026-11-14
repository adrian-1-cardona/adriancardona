export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-start pt-24 sm:pt-32 px-4 sm:px-6 text-center z-20 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Headline matching user reference image exactly: "Hey, I'm Adrian." */}
        <h1 className="text-5xl sm:text-7xl lg:text-[84px] font-bold text-black tracking-tight leading-[1.05] pointer-events-auto">
          Hey, I&apos;m Adrian.
        </h1>
      </div>

      {/* The 3D MacBook canvas floats gracefully directly beneath this headline! */}
    </section>
  )
}
