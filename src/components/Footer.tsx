import { ArrowUpRight } from "lucide-react"
import { PROFILE } from "@/data/portfolioData"

export default function Footer({ onScrollTop }: { onScrollTop: () => void }) {
  return (
    <footer className="border-t border-[#e5e7eb] bg-white py-16 px-4 sm:px-6 text-left">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Col 1: Brand */}
        <div>
          <button
            onClick={onScrollTop}
            className="font-bold text-[#37383c] tracking-tight text-base flex items-center gap-2 mb-2 focus:outline-none"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#4e95ff]" />
            <span>Adrian Cardona</span>
          </button>
          <p className="text-xs text-[#686a71] leading-relaxed max-w-xs mb-4">
            Undergraduate researcher at Cal Poly San Luis Obispo building
            high-performance systems and intelligent infrastructure.
          </p>
          <div className="text-[11px] text-[#9ca3af]">
            © 2026 Adrian Cardona.
          </div>
        </div>

        {/* Col 2: Systems */}
        <div>
          <div className="font-semibold text-xs uppercase tracking-wider text-[#37383c] mb-3">
            Systems &amp; Software
          </div>
          <ul className="space-y-2 text-xs text-[#686a71]">
            <li>
              <a
                href="https://adrian-1-cardona.github.io/Guppty/#installation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4e95ff] transition inline-flex items-center gap-1"
              >
                <span>Guppty Bytecode VM</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href="https://gitex.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4e95ff] transition inline-flex items-center gap-1"
              >
                <span>Gitex Codebase AI</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/adrian-1-cardona"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4e95ff] transition inline-flex items-center gap-1"
              >
                <span>CSSE Experiment Runner</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Research & Writing */}
        <div>
          <div className="font-semibold text-xs uppercase tracking-wider text-[#37383c] mb-3">
            Research &amp; Notes
          </div>
          <ul className="space-y-2 text-xs text-[#686a71]">
            <li>
              <a href="#blog" className="hover:text-[#4e95ff] transition">
                Bytecode VM in Rust
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-[#4e95ff] transition">
                Hallucination-free RAG
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-[#4e95ff] transition">
                Deterministic Benchmarks
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-[#4e95ff] transition">
                The Quiet Engineering Doctrine
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Connect */}
        <div>
          <div className="font-semibold text-xs uppercase tracking-wider text-[#37383c] mb-3">
            Connect &amp; Documents
          </div>
          <ul className="space-y-2 text-xs text-[#686a71]">
            <li>
              <a
                href={PROFILE.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4e95ff] transition inline-flex items-center gap-1 font-medium text-[#4e95ff]"
              >
                <span>Curriculum Vitae (PDF)</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href={PROFILE.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4e95ff] transition inline-flex items-center gap-1"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href={PROFILE.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4e95ff] transition inline-flex items-center gap-1"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${PROFILE.email}`}
                className="hover:text-[#4e95ff] transition"
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
