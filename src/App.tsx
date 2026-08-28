import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

import { HyperText } from "@/components/ui/hyper-text";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";
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

const navigation = [
  { label: "Home", detail: "Portrait", href: "#top", number: "00" },
  { label: "Profile", detail: "About me", href: "#profile", number: "01" },
  { label: "Projects", detail: "Selected work", href: "#work", number: "02" },
  { label: "Experience", detail: "In the field", href: "#experience", number: "03" },
  { label: "Toolkit", detail: "Skills & tools", href: "#toolkit", number: "04" },
  { label: "Contact", detail: "Let's talk", href: "#contact", number: "05" },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function smootherStep(value: number) {
  const progress = clamp(value);
  return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
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
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const previousTimeRef = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const applyHero = (progress: number) => {
      const hero = heroRef.current;
      if (!hero) return;
      const gray = clamp((progress - 0.12) / 0.5);
      const chrome = clamp((progress - 0.1) / 0.48);
      const title = clamp((progress - 0.28) / 0.42);
      const details = clamp((progress - 0.68) / 0.22);
      const zoom = smootherStep((progress - 0.045) / 0.68);
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

    const readTargetProgress = () => {
      const hero = heroRef.current;
      if (!hero) return 0;
      const rect = hero.getBoundingClientRect();
      const range = Math.max(rect.height - window.innerHeight, 1);
      return clamp(-rect.top / range);
    };

    const animateHero = (time: number) => {
      const elapsed = previousTimeRef.current ? Math.min(time - previousTimeRef.current, 48) : 16;
      previousTimeRef.current = time;
      const current = currentProgressRef.current;
      const target = targetProgressRef.current;
      const damping = 1 - Math.exp(-elapsed / 105);
      const next = current + (target - current) * damping;
      const settled = Math.abs(target - next) < 0.00008;

      currentProgressRef.current = settled ? target : next;
      applyHero(currentProgressRef.current);

      if (settled) {
        frameRef.current = null;
        previousTimeRef.current = 0;
      } else {
        frameRef.current = requestAnimationFrame(animateHero);
      }
    };

    const requestUpdate = (immediate = false) => {
      targetProgressRef.current = readTargetProgress();
      if (immediate) {
        currentProgressRef.current = targetProgressRef.current;
        applyHero(currentProgressRef.current);
        return;
      }
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(animateHero);
    };

    const handleScroll = () => requestUpdate();
    const handleResize = () => requestUpdate(true);

    requestUpdate(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <main>
      <button
        className={`menu-toggle${menuOpen ? " is-open" : ""}`}
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-navigation"
            className="menu-overlay"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu-heading">ADRIAN CARDONA / PORTFOLIO</div>
            <nav aria-label="Main navigation">
              {navigation.map((item, index) => (
                <motion.a
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + index * 0.055, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="menu-number">{item.number}</span>
                  <span className="menu-label">{item.label}</span>
                  <span className="menu-detail">{item.detail}</span>
                  <span className="menu-arrow" aria-hidden="true">↘</span>
                </motion.a>
              ))}
            </nav>
            <div className="menu-footer">
              <span>SAN LUIS OBISPO, CA</span>
              <span>AVAILABLE FOR OPPORTUNITIES</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="top" ref={heroRef} className="hero-track" aria-label="Introduction">
        <div className="hero-sticky">
          <div className="hero-scene" aria-hidden="true">
            <ScrollVelocityContainer className="hero-velocity-copy">
              <ScrollVelocityRow className="hero-velocity-row hero-velocity-row-top" baseVelocity={1.15} direction={-1}>
                <span>SOFTWARE THAT</span><i>✳</i>
              </ScrollVelocityRow>
              <ScrollVelocityRow className="hero-velocity-row hero-velocity-row-bottom" baseVelocity={0.8} direction={1}>
                <strong>HOLDS UP AFTER THE DEMO</strong><i>✳</i>
              </ScrollVelocityRow>
            </ScrollVelocityContainer>
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

      <section id="experience" className="experience-section">
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

      <section id="toolkit" className="skills-section">
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
