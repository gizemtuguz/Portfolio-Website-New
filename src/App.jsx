import React, { useEffect, useMemo, useState } from "react";
import { PROFILE, SKILLS, PROJECTS, GITHUB } from "./data.js";

import imageAvatar from "./assets/avatar.JPG"; 
import GithubContributionCalendar from "./componenets/GithubContributionCalendar";

/* === Icon system (stroke + fill support) === */
function Icon({ name, size = 20 }) {
  const strokeIcons = new Set(["sun", "moon", "external-stroke"]);
  const nodes = {
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.64 5.64 4.22 4.22M19.78 19.78l-1.42-1.42M5.64 18.36 4.22 19.78M19.78 4.22l-1.42 1.42" />
      </>
    ),
    moon: (
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    ),
    external: (
      <path d="M14 3h7v7h-2V6.4l-7.8 7.8-1.4-1.4L17.6 5H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z" />
    ),
    github: (
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12 11.5 11.5 0 0 0 8.3 23.1c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.5-1.8-1.5-1.8-1.2-.8.1-.8.1-.8 1.3.1 2 1.4 2 1.4 1.2 2 3.1 1.4 3.8 1 .1-.9.5-1.4.9-1.7-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.3 1.2-3.2 0-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.1 2.8.1 3.1.8.9 1.2 2 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.5.4 1 1.2 1 2.5v3.7c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    ),
  };

  const isStroke = strokeIcons.has(name);
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="icon"
      fill={isStroke ? "none" : "currentColor"}
      stroke={isStroke ? "currentColor" : "none"}
      strokeWidth={isStroke ? 1.8 : undefined}
      strokeLinecap={isStroke ? "round" : undefined}
      strokeLinejoin={isStroke ? "round" : undefined}
      focusable="false"
    >
      {nodes[name] || nodes.external}
    </svg>
  );
}

/* === Section wrapper === */
function Section({ id, title, children, subdued = false }) {
  return (
    <section id={id} className={`section ${subdued ? "section--subdued" : ""}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        {title && (
          <h2 id={`${id}-title`} className="section__title">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

/* === Skip link === */
function SkipLink() {
  return (
    <a href="#main" className="skip">
      Skip to content
    </a>
  );
}

/* === Theme toggle (icon‑only, muted gray) === */
function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const isLight = theme === "light";
  return (
    <button
      className="btn btn--ghost nav__toggle"
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      <Icon name={isLight ? "moon" : "sun"} />
    </button>
  );
}

/* === Nav === */
function Nav() {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#github", label: "GitHub" },
    { href: "#contact", label: "Contact" },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="nav" role="banner">
      <div className="container nav__inner">
        <a href="#home" className="brand" onClick={(e) => handleClick(e, "#home")}>
          <span className="brand__dot" />
          <span className="brand__text">{PROFILE.name}</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => handleClick(e, l.href)}>
              {l.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

/* === Hero === */
function Hero() {
  return (
    <Section id="home">
      <div className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Hi, I’m {PROFILE.name}</h1>
          <p className="hero__subtitle">{PROFILE.title}</p>
          <p className="hero__tagline">{PROFILE.tagline}</p>
          <div className="hero__actions">
            <a
              className="btn btn--primary"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View My Work
            </a>
            <a
              className="btn btn--ghost"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Let’s Connect
            </a>
          </div>
        </div>
        <div className="hero__art" aria-hidden="true">
          <div className="orb orb--one" />
          <div className="orb orb--two" />
          <div className="orb orb--three" />
        </div>
      </div>
    </Section>
  );
}

/* === About === */
function About() {
  return (
    <Section id="about" title="About Me" subdued>
      <div className="about">
        <div className="about__photo" aria-hidden="true">
          <div className="avatar">
          <div className="avatar" style={{ overflow: "hidden" }}>
            <img src={imageAvatar} alt="Avatar" style={{ width: "110%", height: "110%", objectFit: "cover" }} />
          </div>
          </div>
        </div>
        <div className="about__text">
          <p>
            I’m a web designer & developer focused on crafting clean, accessible, and delightful
            user experiences. I love bridging design systems with modern frontend to ship fast,
            reliable products.
          </p>
          <ul className="socials" aria-label="Social links">
            {PROFILE.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  <Icon name="external" /> {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* === Skills === */
function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="skills">
        {SKILLS.map((g) => (
          <div key={g.group} className="skillcard">
            <h3>{g.group}</h3>
            <div className="chiprow">
              {g.items.map((t) => (
                <span className="chip" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* === Project Card === */
function ProjectCard({ p }) {
  const mediaStyle = p.image ? { backgroundImage: `url(${p.image})` } : undefined;
  const mediaClassName = `project__media${p.image ? "" : " project__media--empty"}`;

  return (
    <article className="project">
      <div className={mediaClassName} style={mediaStyle} aria-label={p.title}>
        {!p.image && <span className="project__media-placeholder">Preview coming soon</span>}
      </div>
      <div className="project__body">
        <h3 className="project__title">{p.title}</h3>
        <p className="project__desc">{p.description}</p>
        <div className="project__stack">
          {p.stack.map((s) => (
            <span key={s} className="chip chip--soft">
              {s}
            </span>
          ))}
        </div>
        <div className="project__actions">
          {p.live && (
            <a className="btn btn--ghost" href={p.live} target="_blank" rel="noopener noreferrer">
              Live Demo <Icon name="external" />
            </a>
          )}
          {p.code && (
            <a className="btn btn--primary" href={p.code} target="_blank" rel="noopener noreferrer">
              <Icon name="github" /> Code
            </a>
          )}
        </div>
        {p.caseStudy && (
          <div className="project__case">
            <a className="btn btn--ghost" href={p.caseStudy} target="_blank" rel="noopener noreferrer">
              Case Study <Icon name="external" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

/* === Projects === */
function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const hasMoreProjects = PROJECTS.length > 3;
  const visibleProjects = showAllProjects || !hasMoreProjects ? PROJECTS : PROJECTS.slice(0, 3);

  return (
    <Section id="projects" title="My Projects" subdued>
      <div className="projects">
        {visibleProjects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
      {hasMoreProjects && (
        <div className="projects__toggle">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setShowAllProjects((prev) => !prev)}
            aria-expanded={showAllProjects}
          >
            {showAllProjects ? "Show fewer projects" : `Show more projects (${PROJECTS.length - visibleProjects.length})`}
          </button>
        </div>
      )}
    </Section>
  );
}

/* === GitHub Block === */
function GithubBlock() {
  return (
    <Section id="github" subdued>
      <div className="github">
        <Icon name="github" size={32} />
        <p>{GITHUB.blurb}</p>
        <GithubContributionCalendar username="gizemtuguz" />
        <a className="btn btn--primary" href={GITHUB.profileUrl} target="_blank" rel="noopener noreferrer">
          Visit My GitHub Profile
        </a>
      </div>
    </Section>
  );
}

/* === Contact === */
function Contact() {
  const [status, setStatus] = useState(null);
  const [isSending, setIsSending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const name = fd.get("name")?.toString().trim();
    const email = fd.get("email")?.toString().trim();
    const message = fd.get("message")?.toString().trim();

    if (!name || !email || !message) {
      setStatus({ type: "error", msg: "Please fill in all fields." });
      return;
    }
    if (!/^[^@]+@[^@]+[.][^@]+$/.test(email)) {
      setStatus({ type: "error", msg: "Please enter a valid email." });
      return;
    }

    try {
      setIsSending(true);
      setStatus(null);

      const submission = new FormData(formEl);
      submission.set("name", name);
      submission.set("email", email);
      submission.set("message", message);
      submission.set("_replyto", email);
      submission.set("_subject", "New portfolio message");
      submission.set("_captcha", "false");

      const response = await fetch("https://formsubmit.co/ajax/gizemtuguz@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: submission,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = await response.json();
      if (payload?.success !== "true") {
        throw new Error(payload?.message || "Unexpected response");
      }

      setStatus({ type: "success", msg: payload.message || "Thanks! Your message is on its way." });
      formEl.reset();
    } catch (error) {
      console.error("Contact form submission failed", error);
      setStatus({
        type: "error",
        msg:
          (error instanceof Error && error.message)
            ? `Sorry, something went wrong: ${error.message}`
            : "Sorry, something went wrong. Please email me directly at gizemtuguz@gmail.com.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Section id="contact">
      <div className="contactlayout">

        <div className="contactinfo">
          <h2>Get in Touch</h2>
        </div>

        <form className="contact" onSubmit={onSubmit} noValidate>
          <label>
            <span>Name</span>
            <input name="name" type="text" placeholder="Your name" required disabled={isSending} />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" placeholder="you@example.com" required disabled={isSending} />
          </label>
          <label className="contact__full">
            <span>Message</span>
            <textarea
              name="message"
              rows={6}
              placeholder="Tell me about your project..."
              required
              disabled={isSending}
            />
          </label>
          <div className="contact__actions">
            <button className="btn btn--primary" type="submit" disabled={isSending}>
              {isSending ? "Sending…" : "Send Message"}
            </button>
            {status && <span className={`formstatus formstatus--${status.type}`}>{status.msg}</span>}
          </div>
        </form>
      </div>
    </Section>
  );
}

/* === Footer === */
function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {year} {PROFILE.name}. Designed & Built by {PROFILE.name}.</p>
        <ul className="socials socials--footer">
          {PROFILE.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div>
      <SkipLink />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GithubBlock />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
