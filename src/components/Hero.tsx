export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-start pt-24 sm:pt-28 px-4 sm:px-6 text-center z-20 pointer-events-none"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Headline matching user reference image exactly: "Hey, I'm Adrian." */}
        <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-bold text-black tracking-tight leading-[1.08] mb-4 pointer-events-auto">
          Hey, I&apos;m Adrian.
        </h1>

        <p className="text-base sm:text-xl text-neutral-600 font-normal tracking-tight max-w-xl mx-auto mb-2 pointer-events-auto">
          I build software that makes things easier.
        </p>
      </div>

      {/* The 3D MacBook canvas floats gracefully directly beneath this headline! */}
    </section>
  )
}
