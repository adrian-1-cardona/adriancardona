import { useState } from "react"

interface FaqItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What roles and timeline is Adrian currently targeting?",
    answer:
      "Adrian is targeting Software Engineering internships and full-time engineering roles for 2026/2027 (Expected graduation: May 2027). Key areas of interest include systems programming, web infrastructure, compiler engineering, and AI/retrieval systems.",
  },
  {
    question: "What are Adrian's primary software engineering appointments?",
    answer:
      "Adrian currently serves as a Web Development Intern at the Cal Poly Bailey College of Science and Mathematics, building an internal digital asset management system with SharePoint and Power Automate, automating batch ingestion, and engineering a resumable migration pipeline for 58,579 media records. Concurrently, he is an Undergraduate Researcher at Cal Poly CSSE automating training and evaluation pipelines for cooperative AI agents.",
  },
  {
    question: "What independent software systems has Adrian built?",
    answer:
      "Adrian built Guppty (a programming language in Rust with a lexer, parser, bytecode compiler, and stack VM, with 38+ tests and CI-enforced differential testing) and Gitex (a GitHub codebase Q&A platform with Gemini embeddings and Convex vector search, achieving 100% groundedness and refusal accuracy across 31 retrieval evaluations).",
  },
  {
    question: "What research was conducted at Cal Poly CSSE?",
    answer:
      "As an Undergraduate Researcher under CSSE faculty, Adrian engineered a Python backend to automate training and evaluation pipelines for cooperative AI research, established GitHub Actions CI/CD with pytest to catch bugs automatically, and developed a desktop application to visualize system telemetry.",
  },
  {
    question: "What technologies does Adrian work with primarily?",
    answer:
      "Languages: Python, TypeScript, JavaScript, Rust, SQL, Java, C, C++, HTML, CSS. Frameworks & Databases: React, Next.js, Node.js, FastAPI, PostgreSQL, Redis, Convex, Docker. Developer Tools: Git, GitHub Actions, Unix/Linux, Jira, VS Code. AI Tools: Gemini API, LlamaIndex, Ollama, Codex, Claude Code, Cursor.",
  },
  {
    question: "How can I get in touch or request a reference?",
    answer:
      "You can send an email directly to cardona.adrian.1029@gmail.com, call 310-489-6795, download the resume via the link in the header, or connect on LinkedIn at linkedin.com/in/adrian-cardona.",
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
