import { useEffect, useRef, useState } from "react";

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

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateHero = () => {
      frameRef.current = null;
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const range = Math.max(rect.height - window.innerHeight, 1);
      const progress = clamp(-rect.top / range);
      const zoom = clamp((progress - 0.015) / 0.58);
      const color = clamp((progress - 0.06) / 0.48);
      const chrome = clamp((progress - 0.045) / 0.16);
      const title = clamp((progress - 0.2) / 0.3);
      const details = clamp((progress - 0.62) / 0.24);
      const mobile = window.innerWidth <= 760;

      hero.style.setProperty("--hero-progress", progress.toFixed(4));
      hero.style.setProperty("--color-reveal", color.toFixed(4));
      hero.style.setProperty("--chrome-reveal", chrome.toFixed(4));
      hero.style.setProperty("--eyebrow-reveal", (chrome * (1 - title)).toFixed(4));
      hero.style.setProperty("--title-reveal", title.toFixed(4));
      hero.style.setProperty("--details-reveal", details.toFixed(4));
      hero.style.setProperty("--frame-scale", (1 - zoom * (mobile ? 0.18 : 0.36)).toFixed(4));
      hero.style.setProperty("--portrait-scale", (1.045 - zoom * 0.045).toFixed(4));
      document.documentElement.style.setProperty("--nav-reveal", chrome.toFixed(4));
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
      document.documentElement.style.removeProperty("--nav-reveal");
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Adrian Cardona — top">AC<span>.</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen((open) => !open)}>
          <span>{menuOpen ? "CLOSE" : "INDEX"}</span><i aria-hidden="true" />
        </button>
        <nav id="site-nav" className={menuOpen ? "site-nav is-open" : "site-nav"}>
          <a href="#profile" onClick={closeMenu}>Profile</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a href="/adrian-cardona-resume.pdf" target="_blank" rel="noreferrer" onClick={closeMenu}>Résumé ↗</a>
        </nav>
      </header>

      <section id="top" ref={heroRef} className="hero-track" aria-label="Introduction">
        <div className="hero-sticky">
          <div className="hero-field" aria-hidden="true"><span>SOFTWARE</span><span>ENGINEER</span></div>
          <div className="portrait-frame">
            <img className="portrait portrait-mono" src="/adrian-portrait-mono.webp" alt="" />
            <img className="portrait portrait-color" src="/adrian-portrait-color.webp" alt="Adrian Cardona" />
          </div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-intro">
            <p className="eyebrow"><span /> CALIFORNIA · COMPUTER SCIENCE</p>
            <h1><span>ADRIAN</span><span>CARDONA</span></h1>
          </div>
          <div className="hero-details">
            <p>Building dependable systems,<br />from bytecode to browser.</p>
            <div className="hero-stat"><strong>3.5</strong><span>GPA</span></div>
            <div className="hero-stat"><strong>2027</strong><span>CAL POLY · B.S. CS</span></div>
          </div>
        </div>
      </section>

      <section id="profile" className="statement-section">
        <div className="section-number">00 / PROFILE</div>
        <p className="statement">I BUILD SOFTWARE THAT HOLDS UP <em>AFTER</em> THE DEMO.</p>
        <div className="profile-grid">
          <p className="profile-lede">Computer Science student at Cal Poly San Luis Obispo, graduating May 2027.</p>
          <div className="profile-copy">
            <p>I move between systems, product, and applied AI: programming languages in Rust, production React platforms, resilient data pipelines, and grounded document intelligence.</p>
            <p>The through-line is simple—clean architecture, measurable correctness, and work built to scale beyond a prototype.</p>
          </div>
        </div>
      </section>

      <div className="marquee" aria-label="Core disciplines">
        <div>
          <span>SYSTEMS</span><i>✳</i><span>PRODUCT</span><i>✳</i><span>APPLIED AI</span><i>✳</i>
          <span>SYSTEMS</span><i>✳</i><span>PRODUCT</span><i>✳</i><span>APPLIED AI</span><i>✳</i>
        </div>
      </div>

      <section id="work" className="work-section">
        <div className="section-heading">
          <div className="section-number">01 / SELECTED WORK</div>
          <h2>Things I’ve<br />made real.</h2>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <a className="project-card" href={project.href} target="_blank" rel="noreferrer" key={project.name}>
              <span className="project-index">{project.index}</span>
              <div className="project-main">
                <p className="project-kicker">{project.kicker}</p><h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
              </div>
              <div className="project-meta"><strong>{project.proof}</strong><span>{project.stack}</span></div>
              <span className="project-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="experience-section">
        <div className="section-heading compact">
          <div className="section-number">02 / EXPERIENCE</div><h2>Building<br />in the field.</h2>
        </div>
        <div className="experience-list">
          {experience.map((item, index) => (
            <article className="experience-row" key={item.role}>
              <span className="experience-count">0{index + 1}</span>
              <div>
                <p className="experience-dates">{item.dates}</p><h3>{item.role}</h3>
                <p className="experience-company">{item.company}</p><p className="experience-location">{item.location}</p>
              </div>
              <div className="experience-summary"><strong>{item.impact}</strong><p>{item.description}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="skills-section">
        <div className="section-number">03 / TOOLKIT</div>
        <div className="skills-cloud">{skills.map((skill, index) => <span className={index % 4 === 0 ? "accent" : ""} key={skill}>{skill}</span>)}</div>
        <p className="coursework">DATA STRUCTURES & ALGORITHMS / SYSTEMS PROGRAMMING / DATABASES / COMPUTER SECURITY / SOFTWARE ENGINEERING / PROGRAMMING LANGUAGES</p>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-orbit" aria-hidden="true"><span>AVAILABLE FOR THE RIGHT TEAM · </span></div>
        <p className="section-number">04 / NEXT</p>
        <h2>LET’S MAKE<br /><em>SOMETHING</em><br />UNIGNORABLE.</h2>
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
