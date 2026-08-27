import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "motion/react";

import { HyperText } from "@/components/ui/hyper-text";
import { TypingAnimation } from "@/components/ui/typing-animation";

const experience = [
  {
    dates: "JAN 2026 — PRESENT",
    role: "Web Development Intern",
    company: "Cal Poly Bailey College of Science & Mathematics",
    location: "San Luis Obispo, California",
    impact: "58,579 media records",
    description:
      "Building an internal digital asset system with SharePoint and Power Automate: batch ingestion, metadata indexing, duplicate detection, validation, recovery, and collision-safe resumable migrations.",
  },
  {
    dates: "JUL 2025 — MAR 2026",
    role: "Technology Solutions Research Intern",
    company: "Foundation for California Community Colleges",
    location: "Los Angeles, California",
    impact: "10+ stakeholder visuals",
    description:
      "Turning statewide enrollment, demographic, and financial-aid data into clear decisions while standardizing reusable data-cleaning, validation, and reporting workflows for a six-person research team.",
  },
  {
    dates: "FEB 2025 — APR 2025",
    role: "AI Document Insights Extern",
    company: "Extern × Outamation",
    location: "Los Angeles, California",
    impact: "Grounded document AI",
    description:
      "Built and tuned a Python RAG pipeline using LlamaIndex, Ollama, and Gemini to ingest mortgage and lease documents, generate embeddings, and retrieve trustworthy source context.",
  },
];

const projects = [
  {
    index: "01",
    name: "Guppty",
    kicker: "A programming language, from syntax to stack.",
    description:
      "A Rust language implementation with a lexer, parser, bytecode compiler, stack VM, closures, control flow, span-aware errors, dual execution backends, and CI-enforced differential testing.",
    proof: "38+ tests",
    stack: "RUST / COMPILERS / BYTECODE",
    href: "https://adrian-1-cardona.github.io/Guppty/#installation",
  },
  {
    index: "02",
    name: "Gitex",
    kicker: "Ask a codebase. Get an answer you can trust.",
    description:
      "A production GitHub Q&A platform with Gemini embeddings, Convex vector search, Clerk auth, Stripe billing, rate limiting, AI security controls, and retrieval evaluations enforced through CI.",
    proof: "160+ tests · 100% groundedness",
    stack: "TYPESCRIPT / REACT / CONVEX",
    href: "https://gitex.dev",
  },
];

const skills = [
  "Python", "TypeScript", "React", "Rust", "FastAPI", "Next.js", "PostgreSQL",
  "Docker", "Redis", "Convex", "Prometheus", "Grafana", "Gemini API", "Ollama",
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 72, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateHero = () => {
      frameRef.current = null;
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const range = Math.max(rect.height - window.innerHeight, 1);
      const progress = clamp(-rect.top / range);
      const gray = clamp((progress - 0.12) / 0.5);
      const chrome = clamp((progress - 0.1) / 0.48);
      const title = clamp((progress - 0.28) / 0.42);
      const details = clamp((progress - 0.68) / 0.22);
      const zoom = clamp((progress - 0.06) / 0.62);
      const targetScale = window.innerWidth <= 760 ? 0.72 : 0.44;
      const frameScale = 1 - zoom * (1 - targetScale);

      hero.style.setProperty("--hero-progress", progress.toFixed(4));
      hero.style.setProperty("--frame-scale", frameScale.toFixed(4));
      hero.style.setProperty("--gray-reveal", gray.toFixed(4));
      hero.style.setProperty("--chrome-reveal", chrome.toFixed(4));
      hero.style.setProperty("--eyebrow-reveal", (chrome * (1 - title)).toFixed(4));
      hero.style.setProperty("--title-reveal", title.toFixed(4));
      hero.style.setProperty("--details-reveal", details.toFixed(4));
    };

    const requestUpdate = () => {
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(updateHero);
    };

    updateHero();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <main>
      <section id="top" ref={heroRef} className="hero-track" aria-label="Introduction">
        <div className="hero-sticky">
          <div className="hero-scene" aria-hidden="true">
            <div className="hero-backdrop-copy">
              <span>SOFTWARE THAT</span>
              <strong>HOLDS UP AFTER THE DEMO</strong>
            </div>
          </div>
          <div className="portrait-frame">
            <div className="portrait-layer portrait-layer-color">
              <img className="portrait" src="/adrian-portrait-desktop.webp" alt="Adrian Cardona" />
            </div>
            <div className="portrait-layer portrait-layer-mono" aria-hidden="true">
              <img className="portrait" src="/adrian-portrait-desktop.webp" alt="" />
            </div>
          </div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-intro">
            <h1>Adrian Cardona</h1>
          </div>
          <div className="hero-details">
            <p>Building dependable systems,<br />from bytecode to browser.</p>
            <div className="hero-stat"><strong>3.5</strong><span>GPA</span></div>
            <div className="hero-stat"><strong>2027</strong><span>CAL POLY · B.S. CS</span></div>
          </div>
        </div>
      </section>

      <section id="profile" className="statement-section">
        <Reveal>
          <div className="section-number">00 / PROFILE</div>
          <p className="statement">I BUILD SOFTWARE THAT HOLDS UP <em>AFTER</em> THE DEMO.</p>
        </Reveal>
        <Reveal className="profile-grid" delay={0.1}>
          <TypingAnimation as="p" className="profile-lede" typeSpeed={28} showCursor={false} startOnView>
            Computer Science student at Cal Poly San Luis Obispo, graduating May 2027.
          </TypingAnimation>
          <div className="profile-copy">
            <p>I move between systems, product, and applied AI: programming languages in Rust, production React platforms, resilient data pipelines, and grounded document intelligence.</p>
            <p>The through-line is simple—clean architecture, measurable correctness, and work built to scale beyond a prototype.</p>
          </div>
        </Reveal>
      </section>

      <div className="marquee" aria-label="Core disciplines">
        <div>
          <span>SYSTEMS</span><i>✳</i><span>PRODUCT</span><i>✳</i><span>APPLIED AI</span><i>✳</i>
          <span>SYSTEMS</span><i>✳</i><span>PRODUCT</span><i>✳</i><span>APPLIED AI</span><i>✳</i>
        </div>
      </div>

      <section id="work" className="work-section">
        <Reveal className="section-heading">
          <div className="section-number">01 / SELECTED WORK</div>
          <div className="work-hyper-stack" aria-label="Things I've made real.">
            <HyperText as="h2" className="work-hyper-title" duration={2100} startOnView animateOnHover={false}>
              THINGS I'VE
            </HyperText>
            <HyperText as="h2" className="work-hyper-title" duration={2400} delay={220} startOnView animateOnHover={false}>
              MADE REAL.
            </HyperText>
          </div>
        </Reveal>
        <div className="project-list">
          {projects.map((project, index) => (
            <motion.a
              className="project-card"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              key={project.name}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="project-index">{project.index}</span>
              <div className="project-main">
                <p className="project-kicker">{project.kicker}</p><h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
              </div>
              <div className="project-meta"><strong>{project.proof}</strong><span>{project.stack}</span></div>
              <span className="project-arrow" aria-hidden="true">↗</span>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="experience-section">
        <Reveal className="section-heading compact">
          <div className="section-number">02 / EXPERIENCE</div>
          <TypingAnimation as="h2" className="experience-typing-title" typeSpeed={72} showCursor={false} startOnView>
            BUILDING IN THE FIELD.
          </TypingAnimation>
        </Reveal>
        <div className="experience-list">
          {experience.map((item, index) => (
            <motion.article
              className="experience-row"
              key={item.role}
              initial={{ opacity: 0, y: 64 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="experience-count">0{index + 1}</span>
              <div>
                <p className="experience-dates">{item.dates}</p><h3>{item.role}</h3>
                <p className="experience-company">{item.company}</p><p className="experience-location">{item.location}</p>
              </div>
              <div className="experience-summary"><strong>{item.impact}</strong><p>{item.description}</p></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="skills-section">
        <Reveal>
          <div className="section-number">03 / TOOLKIT</div>
          <div className="skills-cloud">{skills.map((skill, index) => <span className={index % 4 === 0 ? "accent" : ""} key={skill}>{skill}</span>)}</div>
          <p className="coursework">DATA STRUCTURES & ALGORITHMS / SYSTEMS PROGRAMMING / DATABASES / COMPUTER SECURITY / SOFTWARE ENGINEERING / PROGRAMMING LANGUAGES</p>
        </Reveal>
      </section>

      <section id="contact" className="contact-section">
        <Reveal>
          <p className="section-number">04 / NEXT</p>
          <h2>LET’S MAKE<br /><em>SOMETHING</em><br />UNIGNORABLE.</h2>
        </Reveal>
        <div className="contact-bottom">
          <p>Open to internships, new-grad roles,<br />and ambitious technical collaborations.</p>
          <a className="contact-button" href="mailto:cardona.adrian.1029@gmail.com"><span>START A CONVERSATION</span><i>↗</i></a>
        </div>
        <div className="social-row">
          <a href="https://github.com/adrian-1-cardona" target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a href="https://linkedin.com/in/adrian-cardona/" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          <a href="/adrian-cardona-resume.pdf" target="_blank" rel="noreferrer">RÉSUMÉ ↗</a>
          <a href="tel:3104896795">310 489 6795</a>
        </div>
      </section>
      <footer><span>ADRIAN CARDONA © 2026</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
