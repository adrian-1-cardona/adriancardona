import { useState } from "react"
import { ChevronDown } from "lucide-react"

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
    question:
      "What is the technical breakdown of the Guppty programming language?",
    answer:
      "Guppty is implemented in pure Rust. It features a zero-allocation handwritten lexer, Pratt parser for operator precedence, a recursive-descent bytecode compiler, and a stack-based virtual machine. It supports first-class closures via an Upvalue model and includes span-aware error formatting with automated GitHub Actions CI.",
  },
  {
    question: "How does Gitex guarantee zero hallucinations in codebase Q&A?",
    answer:
      "Gitex pairs Convex vector retrieval with strict prompt contracts. Every LLM assertion is required to quote an exact source citation range (e.g. file and line numbers). An automated citation validator cross-references citations against the repository AST before returning the answer to the user.",
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
      className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-left"
    >
      {/* Centered Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#37383c] tracking-tight mb-2">
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
                className="w-full flex items-center justify-between text-left py-2 font-semibold text-[#37383c] hover:text-[#4e95ff] transition focus:outline-none text-base sm:text-lg"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#9ca3af] transition-transform duration-200 shrink-0 ml-4 ${
                    isOpen ? "rotate-180 text-[#4e95ff]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="pt-2 pb-3 text-[#686a71] text-sm leading-relaxed animate-in fade-in duration-150">
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
