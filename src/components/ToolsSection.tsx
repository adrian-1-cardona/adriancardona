const tools = [
  { short: "TS", name: "TypeScript", desc: "Strict typing & web apps" },
  { short: "PY", name: "Python", desc: "Automation, AI & research" },
  { short: "RS", name: "Rust", desc: "Bytecode VM & compilers" },
  { short: "RE", name: "React", desc: "Component architecture" },
  { short: "NX", name: "Next.js", desc: "Full-stack framework" },
  { short: "PG", name: "PostgreSQL", desc: "Relational persistence" },
  { short: "DK", name: "Docker", desc: "Hermetic containerization" },
  { short: "AI", name: "Gemini / AI", desc: "Vector search & RAG pipelines" },
]

export default function ToolsSection() {
  return (
    <section id="tools" className="pt-4">
      <h2 className="section-heading">
        PREMIUM <span>TOOLS</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <article
            key={tool.name}
            className="solid-card p-5 flex flex-col justify-between min-h-[120px]"
          >
            <strong className="text-2xl font-black text-white font-mono block mb-2">
              {tool.short}
            </strong>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                {tool.name}
              </h3>
              <span className="text-[11px] text-[#6a6b6e] block mt-0.5">
                {tool.desc}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
