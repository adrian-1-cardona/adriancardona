import { useState } from "react"

interface FaqItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What roles and timeline is Adrian currently targeting?",
    answer:
      "Adrian is targeting Software Engineering internships and full-time engineering roles for 2026. Key areas of interest include systems programming, compiler design, developer tooling, and reliable AI/data infrastructure.",
  },
  {
    question: "What are Adrian's primary software engineering appointments?",
    answer:
      "Adrian currently serves as a Software Engineering Intern at the Cal Poly Bailey College of Science and Mathematics, architecting fault-tolerant TypeScript media ingestion pipelines and Microsoft Power Automate flows. Concurrently, he is an Undergraduate Researcher at the Cal Poly CSSE Department, engineering deterministic Python benchmarking runners and telemetry tools for faculty.",
  },
  {
    question: "What independent systems projects has Adrian built?",
    answer:
      "As secondary exploratory work, Adrian built Guppty (a compiled language runtime in pure Rust with a Pratt parser, recursive-descent bytecode compiler, and stack VM) and Gitex (a grounded vector search engine with automated AST citation verification).",
  },
  {
    question: "What research was conducted at Cal Poly CSSE?",
    answer:
      "As an Undergraduate Researcher under CSSE faculty, Adrian designed automated Python benchmarking harnesses and desktop telemetry monitors to execute repeatable AI and ML experiments with locked seeds, subprocess worker isolation, and rigorous pytest suites.",
  },
  {
    question: "What technologies does Adrian work with primarily?",
    answer:
      "Core systems languages include Rust, TypeScript, Python, and C. On the web and data layer, Adrian works with React, Next.js, PostgreSQL, Convex Vector DB, Docker, and GitHub Actions CI/CD pipelines.",
  },
  {
    question: "How can I get in touch or request a reference?",
    answer:
      "You can send an email directly to cardonaadrian101@gmail.com, download the curriculum vitae via the link in the header, or connect on LinkedIn at linkedin.com/in/adrian-cardona.",
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section
      id="faq"
      className="scroll-mt-24 py-20 px-4 sm:px-6 max-w-4xl mx-auto text-left"
    >
      {/* Centered Heading */}
      <div className="text-center mb-12">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#4e95ff] mb-2">
          // Q&amp;A
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#19191d] tracking-[-0.5px] leading-tight mb-2">
          Frequently asked questions
        </h2>
        <p className="text-[#686a71] text-sm sm:text-base">
          Everything you need to know about Adrian&apos;s background,
          availability, and technical focus.
        </p>
      </div>

      {/* Accordion List */}
      <div className="divide-y divide-[#e5e7eb] border-y border-[#e5e7eb]">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div key={index} className="py-4">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between text-left py-2 font-semibold text-[#19191d] hover:text-[#4e95ff] transition focus:outline-none text-base sm:text-lg cursor-pointer"
              >
                <span>{item.question}</span>
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-base font-mono shrink-0 ml-4 transition-colors ${
                    isOpen
                      ? "bg-[#4e95ff] text-white"
                      : "bg-slate-100 text-[#686a71]"
                  }`}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="pt-2 pb-3 text-[#686a71] text-sm sm:text-base leading-relaxed animate-in fade-in duration-150">
                  {item.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
