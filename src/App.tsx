import MacBookCanvas from "@/components/MacBookCanvas"
import { EXPERIENCES, PROJECTS, PROFILE } from "@/data/portfolioData"

export default function App() {
  const projects = [
    PROJECTS.find((p) => p.id === "gitex")!,
    PROJECTS.find((p) => p.id === "guppty")!,
  ]
  return (
    <div className="portfolio">
      <div className="film-background" aria-hidden="true">
        <div className="light-world">
          <div className="ribbon ribbon-one" />
          <div className="ribbon ribbon-two" />
          <div className="ribbon ribbon-three" />
        </div>
        <div className="dark-world" />
      </div>
      <MacBookCanvas />
      <header className="navigation">
        <nav aria-label="Main navigation">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main id="story">
        <section className="story-panel opening" id="top" data-shot="opening">
          <div className="opening-copy">
            <h1>Hey, I’m Adrian.</h1>
          </div>
        </section>
        {EXPERIENCES.map((e, i) => (
          <section
            className="story-panel experience-panel"
            id={i === 0 ? "experience" : e.id}
            data-shot={`role-${i}`}
            key={e.id}
          >
            <div className="story-copy">
              <p className="eyebrow">
                EXPERIENCE <span>0{i + 1} / 04</span>
              </p>
              <h2>{e.role}</h2>
              <p className="organization">{e.company}</p>
              <p className="period">{e.period}</p>
              <div className="description">
                <p>{e.description}</p>
                {e.achievements
                  .filter((a) => a !== e.description)
                  .slice(0, 2)
                  .map((a) => (
                    <p key={a}>{a}</p>
                  ))}
              </div>
            </div>
          </section>
        ))}
        <section
          className="story-panel interlude"
          id="projects"
          data-shot="close"
        >
          <div className="interlude-copy">
            <p className="eyebrow">SELECTED PROJECTS</p>
            <h2>Ideas, made real.</h2>
          </div>
        </section>
        {projects.map((p) => (
          <section
            className="story-panel project-panel"
            id={p.id}
            data-shot={p.id}
            key={p.id}
          >
            <div className="story-copy">
              <p className="eyebrow">PROJECTS</p>
              <h2>{p.id === "guppty" ? "Guppty" : p.name}</h2>
              <p className="organization">
                {p.id === "gitex"
                  ? "A clearer way into a codebase."
                  : "A language, from the ground up."}
              </p>
              <p className="project-stack">{p.stack.join(" · ")}</p>
              <p className="project-description">{p.description}</p>
              <a
                className="text-link"
                href={
                  p.id === "guppty"
                    ? "https://adrian-1-cardona.github.io/Guppty/"
                    : p.links[0].href
                }
                target="_blank"
                rel="noreferrer"
              >
                {p.id === "gitex" ? "Explore Gitex" : "Read the documentation"}
              </a>
            </div>
          </section>
        ))}
        <section
          className="story-panel contact-panel"
          id="contact"
          data-shot="contact"
        >
          <div className="contact-copy">
            <p className="eyebrow">CONTACT</p>
            <h2>Let’s connect.</h2>
            <a className="email-link" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </a>
            <div className="contact-links">
              <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={PROFILE.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={PROFILE.links.resume} target="_blank" rel="noreferrer">
                Résumé
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
