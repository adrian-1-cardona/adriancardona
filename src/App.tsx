import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

import { HyperText } from "@/components/ui/hyper-text";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ScrollTypewriter } from "@/components/ui/scroll-typewriter";

const experience = [
  {
    dates: "JAN 2026 — PRESENT",
    role: "Software Engineering Intern",
    company: "Cal Poly Bailey College of Science and Mathematics",
    location: "San Luis Obispo, California",
    impact: "58,579 media files",
    description:
      "Built an internal media management system automating batch ingestion, metadata-driven organization, validation, and failure recovery. Engineered a resumable Power Automate migration for 455 GB of media with duplicate detection and collision-safe writes. Designed searchable metadata workflows for 17,000+ assets.",
  },
  {
    dates: "JUL 2025 — MAR 2026",
    role: "Technology Solutions Research Intern",
    company: "Foundation for California Community Colleges",
    location: "Los Angeles, California",
    impact: "6 colleges analyzed",
    description:
      "Analyzed financial aid and demographic records across 6 California community colleges to identify trends in FAFSA access and student outcomes. Synthesized focus-group feedback into a research report for external stakeholders documenting evidence-based themes around financial aid accessibility.",
  },
  {
    dates: "FEB 2025 — APR 2025",
    role: "AI Document Insights Extern",
    company: "Extern",
    location: "Los Angeles, California",
    impact: "Grounded document AI",
    description:
      "Built a Python RAG pipeline for mortgage document Q&A using LlamaIndex, Ollama, and Gemini API. Evaluated open-source models and retrieval configurations, tuning chunking and prompting strategies, then presented the completed system to Outamation stakeholders.",
  },
];

const projects = [
  {
    index: "01",
    name: "Guppty",
    kicker: "A programming language, from syntax to stack.",
    description:
      "An indentation-based language in Rust with a lexer, parser, bytecode compiler, stack VM, closures, recursion, and control flow. Includes a tree-walking interpreter and CI differential tests across 30+ programs — both backends must produce identical output.",
    proof: "30+ CI-tested programs",
    stack: "RUST / COMPILERS / BYTECODE",
    href: "https://adrian-1-cardona.github.io/Guppty/#installation",
  },
  {
    index: "02",
    name: "Gitex",
    kicker: "Ask a codebase. Get an answer you can trust.",
    description:
      "A codebase Q&A platform with Gemini embeddings and Convex vector search. 31-case RAG evals gate citation groundedness, retrieval recall, and refusals in CI. Auth, billing, rate limits, and security engineered with Clerk and Stripe.",
    proof: "160+ tests · 31-case RAG evals",
    stack: "TYPESCRIPT / REACT / CONVEX",
    href: "https://gitex.dev",
  },
];

const skills = [
  "Rust", "TypeScript", "Python", "C",
  "React", "Node.js", "PostgreSQL", "Docker",
  "RAG / Vector Search", "GitHub Actions", "Unix/Linux", "SQL",
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
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
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
    let introStartedAt: number | null = null;
    let introPullback = 0;
    let introFinished = false;

    const applyHero = (progress: number, intro = introPullback) => {
      const hero = heroRef.current;
      if (!hero) return;
      // All scroll ranges tightened to complete within 220svh track
      const gray = clamp((progress - 0.08) / 0.44);
      const scrollChrome = clamp((progress - 0.06) / 0.42);
      const introChrome = intro;
      const chrome = introChrome + scrollChrome * (1 - introChrome);
      const scrollTitle = clamp((progress - 0.18) / 0.38);
      const introTitle = smootherStep((intro - 0.5) / 0.5);
      const title = introTitle + scrollTitle * (1 - introTitle);
      const scrollDetails = clamp((progress - 0.52) / 0.32);
      const introDetails = smootherStep((intro - 0.72) / 0.28);
      const details = introDetails + scrollDetails * (1 - introDetails);
      const scrollZoom = smootherStep((progress - 0.04) / 0.72);
      const introZoom = intro;
      const zoom = introZoom + scrollZoom * (1 - introZoom);
      const targetScale = window.innerWidth <= 760 ? 0.76 : 0.46;
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
      const damping = 1 - Math.exp(-elapsed / 145);
      const next = current + (target - current) * damping;
      const settled = Math.abs(target - next) < 0.00008;

      if (introStartedAt !== null && !introFinished) {
        const introElapsed = time - introStartedAt;
        introPullback = smootherStep(introElapsed / 2200);
        introFinished = introElapsed >= 2200;
      }

      currentProgressRef.current = settled ? target : next;
      applyHero(currentProgressRef.current, introPullback);

      if (settled && (introStartedAt === null || introFinished)) {
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
        applyHero(currentProgressRef.current, introPullback);
        return;
      }
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(animateHero);
    };

    const handleScroll = () => requestUpdate();
    const handleResize = () => requestUpdate(true);

    requestUpdate(true);
    const introTimer = window.setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        introPullback = 1;
        introFinished = true;
        applyHero(currentProgressRef.current, introPullback);
        return;
      }

      introStartedAt = performance.now();
      previousTimeRef.current = 0;
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(animateHero);
    }, 1000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.clearTimeout(introTimer);
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
            transition={{ duration: 0.88, ease: [0.65, 0, 0.15, 1] }}
          >
            <div className="menu-heading">ADRIAN CARDONA / PORTFOLIO</div>
            <nav aria-label="Main navigation">
              {navigation.map((item, index) => (
                <motion.a
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + index * 0.07, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
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
              <ScrollVelocityRow className="hero-velocity-row hero-velocity-row-top" baseVelocity={0.55} direction={-1}>
                <span>SOFTWARE THAT</span><i>✳</i>
              </ScrollVelocityRow>
              <ScrollVelocityRow className="hero-velocity-row hero-velocity-row-bottom" baseVelocity={0.38} direction={1}>
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
          <ScrollTypewriter as="p" className="statement" charSpeed={42} startDelay={200}>
            I BUILD SOFTWARE THAT HOLDS UP AFTER THE DEMO.
          </ScrollTypewriter>
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
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.95, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
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
          <div className="skills-cloud">
            {skills.map((skill, index) => (
              <span key={skill} className="skill-item">
                <TypingAnimation
                  as="span"
                  className="skill-word"
                  typeSpeed={28}
                  showCursor={false}
                  startOnView
                  delay={index * 160}
                >
                  {skill}
                </TypingAnimation>
                <span className="skill-sep" aria-hidden="true">/</span>
              </span>
            ))}
          </div>
          <p className="coursework">DATA STRUCTURES & ALGORITHMS / SYSTEMS PROGRAMMING / COMPUTER SECURITY / PROGRAMMING LANGUAGES</p>
        </Reveal>
      </section>

      <section id="contact" className="contact-section">
        <Reveal>
          <p className="section-number">04 / NEXT</p>
          <div className="work-hyper-stack contact-hyper-stack" aria-label="Let’s make something unignorable. Connect with me.">
            <HyperText as="h2" className="work-hyper-title" duration={2100} startOnView animateOnHover={false}>
              LET’S 
            </HyperText>
            <HyperText as="h2" className="work-hyper-title contact-hyper-em" duration={2400} delay={220} startOnView animateOnHover={false}>
              CONNECT
            </HyperText>
          </div>
        </Reveal>
        <div className="contact-bottom">
          <p>Open to new grad 2027 tech roles<br />and ambitious technical collaborations.</p>
          <a className="contact-button" href="mailto:cardona.adrian.1029@gmail.com"><span>START A CONVERSATION</span><i>↗</i></a>
        </div>
        <div className="social-row">
          <a href="https://github.com/adrian-1-cardona" target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a href="https://linkedin.com/in/adrian-cardona/" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          <a href="/ADRIAN_CARDONA_RESUME.pdf" target="_blank" rel="noreferrer">RÉSUMÉ ↗</a>
          <a href="tel:3104896795">310 489 6795</a>
        </div>
      </section>
      <footer><span>ADRIAN CARDONA © 2026</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
