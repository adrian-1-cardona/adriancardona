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
      "Adrian currently serves as a Software Engineering Intern at the Cal Poly Bailey College of Science and Mathematics, building a TypeScript media system with SharePoint and Power Automate so staff can quickly find and organize photos across OneDrive, and maintaining college websites using HTML and Drupal. Concurrently, he is an Undergraduate Researcher at Cal Poly CSSE automating training and evaluation pipelines for cooperative AI agents.",
  },
  {
    question: "What independent software systems has Adrian built?",
    answer:
      "Adrian built Guppty (a programming language in Rust with a compiler and interpreter, using GitHub Actions CI/CD to automatically test changes) and Gitex (a TypeScript and React codebase Q&A app with Gemini API, while CI/CD and Sentry catch issues before and after release).",
  },
  {
    question: "What research was conducted at Cal Poly CSSE?",
    answer:
      "As an Undergraduate Researcher under CSSE faculty, Adrian engineered a Python backend to automate training and evaluation pipelines for cooperative AI agents, set up GitHub Actions CI/CD and pytest to catch bugs automatically and ensure reliable system runs, and developed an interactive Python desktop application to monitor live AI agent activity and visualize system telemetry.",
  },
  {
    question: "What technologies does Adrian work with primarily?",
    answer:
      "Languages: Python, TypeScript, JavaScript, Rust, Java, C++, SQL, HTML/CSS. Frameworks: React, Next.js, Node.js, FastAPI. Tools: Git, GitHub Actions, Docker, Sentry, Power Automate, SharePoint, Drupal. AI & Developer Tools: Cursor, Codex, Antigravity, Claude Code, GitHub Copilot, Gemini, LlamaIndex, RAG.",
  },
  {
    question: "How can I get in touch or request a reference?",
    answer:
      "You can send an email directly to cardonaadrian101@gmail.com, call 310-489-6795, download the resume via the link in the header, or connect on LinkedIn at linkedin.com/in/adrian-cardona.",
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
      {/* Centered Heading: All Black Text */}
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[38px] font-bold text-black tracking-tight leading-tight mb-2">
          Frequently asked questions
        </h2>
        <p className="text-black text-sm sm:text-base font-normal">
          Everything you need to know about Adrian&apos;s background,
          availability, and technical focus.
        </p>
      </div>

      {/* Accordion List */}
      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div key={index} className="py-4">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between text-left py-2 font-bold text-black hover:opacity-75 transition focus:outline-none text-base sm:text-lg cursor-pointer group"
              >
                <span>{item.question}</span>
                <span className="text-2xl font-mono text-black shrink-0 ml-4 font-normal transition">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="pt-2 pb-3 text-black text-sm sm:text-base leading-relaxed animate-in fade-in duration-150 font-normal">
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
