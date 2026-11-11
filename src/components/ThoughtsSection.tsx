const thoughts = [
  {
    date: "01",
    title: "Correctness before cleverness",
    text: "Explicit systems, strong validation, and tests make software dependable long after the first release.",
  },
  {
    date: "02",
    title: "Build for the real workload",
    text: "Good systems account for failure modes and scale instead of optimizing only the happy path.",
  },
  {
    date: "03",
    title: "Make complexity feel simple",
    text: "Good engineering disappears into a product that is clear, fast, and easy to understand.",
  },
]

export default function ThoughtsSection() {
  return (
    <section id="thoughts" className="pt-4">
      <h2 className="section-heading">
        ENGINEERING <span>THOUGHTS</span>
      </h2>

      <div className="space-y-4">
        {thoughts.map((thought) => (
          <article
            key={thought.date}
            className="solid-card p-6 flex items-start gap-5"
          >
            <span className="text-xl sm:text-2xl font-black font-mono text-[#6a6b6e] shrink-0">
              {thought.date}
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-1">
                {thought.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#998f8f] leading-relaxed">
                {thought.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
