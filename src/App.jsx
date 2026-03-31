const featuredProjects = [
  {
    title: "Property Management System",
    summary:
      "Designed and implemented a full-stack property management platform for tenants, property owners, and administrators with role-based workflows for leases, payments, and maintenance requests.",
    tags: ["Node.js", "Express", "MySQL"],
  },
  {
    title: "In-Network Temperature Aggregation over CTP",
    summary:
      "Built a TinyOS application to compute average temperature in-network over CTP, reducing transmissions by up to 95% while maintaining strong packet reception in TOSSIM simulations.",
    tags: ["nesC", "TinyOS", "TOSSIM"],
  },
  {
    title: "Insta to Mastodon Reposter",
    summary:
      "Created a Node.js automation tool that scrapes Instagram content, filters posts from the previous day, and reposts them to Mastodon on a daily schedule through the API.",
    tags: ["Node.js", "Masto.js", "cron"],
  },
];

export default function App() {
  return (
    <div className="page-shell">
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />

      <header className="site-header">
        <div className="header-chrome">
          <div className="chrome-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <a className="wordmark" href="#top">
            ~/peter-durfey/portfolio
          </a>
          <nav className="site-nav" aria-label="Primary">
            <a href="#bio">bio.md</a>
            <a href="#projects">projects/</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="panel hero-panel">
          <div className="panel-head">
            <span className="panel-kicker">overview.txt</span>
            <span className="panel-rule" aria-hidden="true" />
          </div>
          <section className="hero">
            <div className="eyebrow">Personal website</div>
            <h1>Computer science graduate student building practical software systems.</h1>
            <p className="hero-copy">
              Based in Indianapolis, I focus on full-stack development, software
              engineering, and building reliable tools that solve real problems.
            </p>
          </section>
        </section>

        <section className="panel section-panel" id="bio">
          <div className="panel-head">
            <span className="panel-kicker">bio.md</span>
            <span className="panel-rule" aria-hidden="true" />
          </div>
          <section className="two-column">
            <div>
              <p className="section-label">Bio</p>
              <h2>Computer science graduate student focused on building useful software.</h2>
            </div>
            <div className="about-copy">
              <p>
                I am Peter Durfey, a computer science graduate student at Indiana
                University with multiple years of professional experience focused
                on software development, full-stack web applications, and problem
                solving. My background includes work with JavaScript, Node.js,
                React, APIs, and relational databases, along with teaching
                assistant experience supporting a graduate-level machine learning
                course using Python, NumPy, and scikit-learn. I enjoy building
                software that is practical, reliable, and well-structured.
              </p>
              <div className="contact-links">
                <a
                  href="https://github.com/3durfey"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/peter-durfey-5665a1124"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a href="mailto:3durfey@gmail.com">3durfey@gmail.com</a>
              </div>
            </div>
          </section>
        </section>

        <section className="panel section-panel" id="projects">
          <div className="panel-head">
            <span className="panel-kicker">projects/</span>
            <span className="panel-rule" aria-hidden="true" />
          </div>
          <section className="featured-work">
            <div className="section-heading">
              <div>
                <p className="section-label">Projects</p>
                <h2>Selected projects in full-stack development, systems, and automation.</h2>
              </div>
              <p className="section-copy">
                These projects reflect my interest in building practical software
                across web platforms, distributed systems, and developer tooling.
              </p>
            </div>

            <div className="project-grid">
              {featuredProjects.map((project) => (
                <article className="project-card" key={project.title}>
                  <div className="project-shine" aria-hidden="true" />
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="tag-row" aria-label={`${project.title} tags`}>
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
