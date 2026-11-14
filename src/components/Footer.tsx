import { PROFILE } from "@/data/portfolioData"

export default function Footer({ onScrollTop }: { onScrollTop: () => void }) {
  return (
    <footer className="border-t border-neutral-200 bg-white py-16 px-4 sm:px-6 text-left">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Col 1: Brand */}
        <div>
          <button
            onClick={onScrollTop}
            className="font-bold text-black tracking-tight text-base flex items-center gap-2 mb-2 focus:outline-none cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-black" />
            <span>Adrian Cardona</span>
          </button>
          <p className="text-xs text-black leading-relaxed max-w-xs mb-4">
            Undergraduate researcher at Cal Poly San Luis Obispo building
            high-performance systems and intelligent infrastructure.
          </p>
          <div className="text-[11px] text-black font-medium">
            © 2026 Adrian Cardona.
          </div>
        </div>

        {/* Col 2: Systems */}
        <div>
          <div className="font-bold text-xs uppercase tracking-wider text-black mb-3">
            Systems &amp; Software
          </div>
          <ul className="space-y-2 text-xs text-black">
            <li>
              <a
                href="https://adrian-1-cardona.github.io/Guppty/#installation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition text-black"
              >
                Guppty Bytecode VM
              </a>
            </li>
            <li>
              <a
                href="https://gitex.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition text-black"
              >
                Gitex Codebase Q&amp;A
              </a>
            </li>
            <li>
              <a
                href="https://github.com/adrian-1-cardona"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition text-black"
              >
                CSSE Experiment Runner
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Research & Writing */}
        <div>
          <div className="font-bold text-xs uppercase tracking-wider text-black mb-3">
            Research &amp; Notes
          </div>
          <ul className="space-y-2 text-xs text-black">
            <li>
              <a href="#blog" className="hover:underline transition text-black">
                Bytecode VM in Rust
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:underline transition text-black">
                Hallucination-free RAG
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:underline transition text-black">
                Deterministic Benchmarks
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:underline transition text-black">
                The Quiet Engineering Doctrine
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Connect */}
        <div>
          <div className="font-bold text-xs uppercase tracking-wider text-black mb-3">
            Connect &amp; Documents
          </div>
          <ul className="space-y-2 text-xs text-black">
            <li>
              <a
                href={PROFILE.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition font-bold text-black"
              >
                Curriculum Vitae (PDF)
              </a>
            </li>
            <li>
              <a
                href={PROFILE.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition text-black"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={PROFILE.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition text-black"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={`mailto:${PROFILE.email}`}
                className="hover:underline transition text-black"
              >
                {PROFILE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
