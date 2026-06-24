import React, { useEffect, useMemo, useRef, useState } from "react";
import { PROFILE, SKILLS, PROJECTS, PROJECT_CATEGORIES, STATS, GITHUB } from "./data.js";

import imageAvatar from "./assets/avatar.JPG";
import GithubContributionCalendar from "./componenets/GithubContributionCalendar";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* === Icon system (stroke + fill support) === */
function Icon({ name, size = 20 }) {
  const strokeIcons = new Set(["sun", "moon", "external-stroke", "menu", "close", "arrow"]);
  const nodes = {
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.64 5.64 4.22 4.22M19.78 19.78l-1.42-1.42M5.64 18.36 4.22 19.78M19.78 4.22l-1.42 1.42" />
      </>
    ),
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M6 6l12 12M18 6L6 18" />,
    arrow: <path d="M7 17 17 7M8 7h9v9" />,
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

/* === Scroll-reveal: observe every [data-reveal] and add .is-visible === */
function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]:not(.is-visible)"));
    if (els.length === 0) return;

    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* === Scroll progress bar === */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scrollbar" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>;
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
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
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

/* === Scrollspy: track which section is in view === */
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* === Nav === */
const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const ids = useMemo(() => NAV_LINKS.map((l) => l.href.slice(1)), []);
  const active = useScrollSpy(ids);

  const handleClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="nav" role="banner">
      <div className="container nav__inner">
        <a href="#home" className="brand" onClick={(e) => handleClick(e, "#home")}>
          <span className="brand__dot" />
          <span className="brand__text">{PROFILE.name}</span>
        </a>

        <nav className={`nav__links ${open ? "is-open" : ""}`} aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href.slice(1) ? "is-active" : ""}
              aria-current={active === l.href.slice(1) ? "page" : undefined}
              onClick={(e) => handleClick(e, l.href)}
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        <button
          className="btn btn--ghost nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}

/* === Hero === */
const ROLES = ["Developer", "Designer", "AI Researcher"];

function useRotatingText(words, interval = 2200) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words, interval]);
  return words[index];
}

function Hero() {
  const role = useRotatingText(ROLES);

  return (
    <Section id="home">
      <div className="hero">
        <div className="hero__top" data-reveal>
          <span>Portfolio</span>
          <span className="hero__rule" aria-hidden="true" />
          <span>Eskişehir · ©{new Date().getFullYear()}</span>
        </div>

        <div className="hero__main">
          <div className="hero__content" data-reveal>
            <h1 className="hero__title">
              <span>Gizem</span>
              <span className="hero__title-accent">Tuğuz</span>
            </h1>
            <p className="hero__role">
              <span className="hero__dash">—</span>
              <span className="hero__role-word" key={role}>{role}</span>
            </p>
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
                View selected work
              </a>
              <a
                className="btn btn--link"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get in touch
              </a>
            </div>
          </div>

          <figure className="hero__portrait" data-reveal>
            <img src={imageAvatar} alt="Gizem Tuğuz" />
            <figcaption>
              <span className="hero__avail"><span className="dot" /> Available for work</span>
              <span>Computer Engineering Graduate · ESTÜ</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </Section>
  );
}

/* === Animated counter === */
function Counter({ value, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      setDisplay(value);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          const duration = 1400;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(eased * value));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref} className="stat__value">
      {display}
      {suffix}
    </span>
  );
}

/* === Stats band === */
function Stats() {
  return (
    <Section id="stats">
      <div className="stats" data-reveal>
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <Counter value={s.value} suffix={s.suffix} />
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* === Section wrapper === */
function Section({ id, title, children, subdued = false }) {
  return (
    <section id={id} className={`section ${subdued ? "section--subdued" : ""}`} aria-labelledby={title ? `${id}-title` : undefined}>
      <div className="container">
        {title && (
          <h2 id={`${id}-title`} className="section__title" data-reveal>
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

/* === About === */
function About() {
  return (
    <Section id="about" title="About" subdued>
      <div className="about">
        <div className="about__text" data-reveal>
          <p className="about__lead">
            I’m a Computer Engineering graduate from Eskişehir Technical University, building at the intersection of code, design, and AI.
          </p>
          <p>
            My recent work spans <strong>vision-language model research</strong> and a <strong>VLM-powered computer-vision thesis</strong>, alongside <strong>front-end development</strong> and <strong>UI/UX design</strong>. During my studies I also led the IEEE ESTÜ Student Branch as President and organized large-scale events, bringing together students, professionals, and technology enthusiasts.
          </p>
          <p>
            What excites me most is combining <strong>technology</strong>, <strong>creativity</strong>, and <strong>leadership</strong> — whether researching model calibration, building interactive applications, or designing engaging digital experiences.
          </p>
          <ul className="socials" aria-label="Social links">
            {PROFILE.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} <Icon name="external" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <dl className="about__meta" data-reveal>
          <div>
            <dt>Based in</dt>
            <dd>Eskişehir, Türkiye</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>Developer · Designer · Researcher</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>VLM / AI · Front-end · UI/UX</dd>
          </div>
          <div>
            <dt>Education</dt>
            <dd>BSc Computer Engineering, ESTÜ</dd>
          </div>
        </dl>
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
          <div key={g.group} className="skillcard" data-reveal>
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

/* === Project card === */
function ProjectCard({ p, index }) {
  const mediaStyle = p.image ? { backgroundImage: `url(${p.image})` } : undefined;
  const mediaClassName = `project__media${p.image ? "" : " project__media--empty"}`;

  return (
    <article className="project" data-reveal style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
      <div className={mediaClassName} style={mediaStyle} aria-label={p.title}>
        {p.category && <span className="project__tag">{p.category}</span>}
        {p.tag && <span className="project__badge">{p.tag}</span>}
        {!p.image && <span className="project__media-placeholder">Preview coming soon</span>}
      </div>
      <div className="project__body">
        <div className="project__meta">
          <span className="project__index">{String(index + 1).padStart(2, "0")}</span>
          {p.year && <span className="project__year">{p.year}</span>}
        </div>
        <h3 className="project__title">{p.title}</h3>
        <p className="project__desc">{p.description}</p>
        <div className="project__stack">
          {p.stack.map((s) => (
            <span key={s} className="chip chip--soft">{s}</span>
          ))}
        </div>
        <div className="project__actions">
          {p.live && (
            <a className="btn btn--ghost" href={p.live} target="_blank" rel="noopener noreferrer">
              Live demo <Icon name="external" />
            </a>
          )}
          {p.code && (
            <a className="btn btn--ghost" href={p.code} target="_blank" rel="noopener noreferrer">
              <Icon name="github" /> Code
            </a>
          )}
          {p.caseStudy && (
            <a className="btn btn--ghost" href={p.caseStudy} target="_blank" rel="noopener noreferrer">
              Case study <Icon name="external" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* === Projects (filterable card grid with show-all toggle) === */
const PROJECTS_PREVIEW_COUNT = 6;

function Projects() {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  const hasMore = filtered.length > PROJECTS_PREVIEW_COUNT;
  const visible = showAll || !hasMore ? filtered : filtered.slice(0, PROJECTS_PREVIEW_COUNT);

  useScrollReveal([filter, showAll]);

  const selectFilter = (cat) => {
    setFilter(cat);
    setShowAll(false);
  };

  return (
    <Section id="projects" title="Selected Work" subdued>
      <div className="projects__filters" role="tablist" aria-label="Filter projects by category">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={filter === cat}
            className={`filterchip ${filter === cat ? "is-active" : ""}`}
            onClick={() => selectFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="projects" key={filter}>
        {visible.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} />
        ))}
      </div>

      {hasMore && (
        <div className="projects__toggle">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
          >
            {showAll ? "Show less" : `Show all (${filtered.length})`}
          </button>
        </div>
      )}
    </Section>
  );
}

/* === GitHub live activity (real GitHub Events API) === */
function timeAgo(iso) {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  const units = [
    ["y", 31536000],
    ["mo", 2592000],
    ["w", 604800],
    ["d", 86400],
    ["h", 3600],
    ["m", 60],
  ];
  for (const [label, secs] of units) {
    const v = Math.floor(seconds / secs);
    if (v >= 1) return `${v}${label} ago`;
  }
  return "just now";
}

function GithubActivity({ user, max = 6 }) {
  const [repos, setRepos] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=24&type=owner`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data) => {
        if (!active || !Array.isArray(data)) return;
        const list = data
          .filter((r) => !r.fork)
          .slice(0, max)
          .map((r) => ({
            id: r.id,
            name: r.name,
            lang: r.language,
            when: r.pushed_at,
            url: r.html_url,
          }));
        setRepos(list);
      })
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, [user, max]);

  if (failed) return <p className="ghactivity__note">GitHub is rate-limited right now — visit the profile for the latest.</p>;
  if (!repos) return <p className="ghactivity__note">Loading recent repositories…</p>;
  if (!repos.length) return <p className="ghactivity__note">No public repositories yet.</p>;

  return (
    <ul className="ghactivity">
      {repos.map((r) => (
        <li key={r.id} className="ghactivity__row">
          <a href={r.url} target="_blank" rel="noopener noreferrer">
            <span className="ghactivity__repo">{r.name}</span>
            {r.lang && <span className="ghactivity__lang">{r.lang}</span>}
          </a>
          <span className="ghactivity__time">{timeAgo(r.when)}</span>
        </li>
      ))}
    </ul>
  );
}

/* === GitHub Block === */
function GithubBlock() {
  return (
    <Section id="github" title="GitHub" subdued>
      <div className="github" data-reveal>
        <p className="github__blurb">{GITHUB.blurb}</p>

        <div className="github__grid">
          <div className="github__col">
            <h3 className="github__subtitle">Recently updated repositories</h3>
            <GithubActivity user={PROFILE.githubUser} />
          </div>
          <div className="github__col">
            <h3 className="github__subtitle">Contributions</h3>
            <GithubContributionCalendar username={PROFILE.githubUser} />
          </div>
        </div>

        <a className="btn btn--primary" href={GITHUB.profileUrl} target="_blank" rel="noopener noreferrer">
          Visit my GitHub profile
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
          error instanceof Error && error.message
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
        <div className="contactinfo" data-reveal>
          <h2>Get in Touch</h2>
          <p className="contactinfo__blurb">
            Drop a quick note about your project, collaboration idea, or anything you’re curious about. I’ll reply the moment I see it.
          </p>
        </div>

        <form className="contact" onSubmit={onSubmit} noValidate data-reveal>
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
  useScrollReveal();
  return (
    <div>
      <ScrollProgress />
      <SkipLink />
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
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
