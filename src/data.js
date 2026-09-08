import affiliateDashboardCaseStudy from "./projects/Affiliate_Dashboard_Resources_Page.pdf";
import articleSubmissionCaseStudy from "./projects/Article_Submission_System.pdf";
import fakeNewsCaseStudy from "./projects/FAKE_NEWS.pdf";
import galaxyShooterCaseStudy from "./projects/GALAXY_SHOOTER.pdf";
import graveKeeperCaseStudy from "./projects/GRAVE_KEEPER.pdf";
import miniMuslimsCaseStudy from "./projects/MINI_MUSLIMS.pdf";
import affiliateDashboardImage from "./projects/images/affiliatedashboard.png";
import articleSubmissionImage from "./projects/images/articlesubmission.png";
import fakeNewsImage from "./projects/images/fakenewsdetection.png";
import galaxyShooterImage from "./projects/images/galaxyshooter.png";
import graveKeeperImage from "./projects/images/gravekeeper.png";
import miniMuslimsImage from "./projects/images/minimuslims.png";
import vlmResearchImage from "./projects/images/vlm-research.jpg";
import thesisTrackerImage from "./projects/images/thesis-tracker.jpg";
import ieeeEstuImage from "./projects/images/repo-ieee-estu.png";
import gustoImage from "./projects/images/repo-gusto.jpg";
import wordleImage from "./projects/images/repo-wordle.png";
import foveaImage from "./projects/images/fovea-retina.jpg";
import awlMidnightImage from "./projects/images/awl-midnight.png";
import ayneDeck from "./projects/ayne-project-deck.pptx?url";
import scaPmCertificate from "./projects/sca-pm-certificate.pdf";
import referenceLetter from "./projects/reference-letter.pdf";

export const PROFILE = {
  name: "Gizem",
  title: "Developer • Designer • AI Researcher",
  tagline: "I build at the intersection of code, design, and AI — from VLM research and computer-vision systems to polished web experiences.",
  email: "gizemtuguz@gmail.com",
  phone: "+90 5068489115",
  location: "Eskişehir, Türkiye",
  githubUser: "gizemtuguz",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/gizemtuguz" },
    { label: "GitHub", href: "https://github.com/gizemtuguz" },
  ],
};

export const SKILLS = [
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "HTML5",
      "JavaScript",
      "Tailwind CSS",
      "Sass/SCSS",
      "Responsive Design",
    ],
  },
  {
    group: "Design",
    items: [
      "Figma",
      "Design Systems",
      "Styleguides",
      "UX Writing (basic)",
      "Usability Testing",
    ],
  },
  {
    group: "AI & Product",
    items: [
      "LLM & Prompt Engineering",
      "OpenAI APIs",
      "AI Agents/Flows",
      "Python",
      "Data Visualization",
      "AI-powered Applications",
    ],
  },
  {
    group: "Tools & Workflow",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "pnpm / npm",
    ],
  },
  {
    group: "Content & Brand",
    items: ["Canva","Social Media Management", "Social Media Kits", "Asset Pipelines", "Branding Support"]
  },
  {
    group: "Game Development",
    items: [
      "Unity 2D/3D",
      "C# Scripting",
      "Game Mechanics Design",
      "Physics & Collisions",
      "Particle Systems & Effects",
      "UI/UX for Games",
    ],
  },
];

/* Project categories used by the filter bar */
export const PROJECT_CATEGORIES = ["All", "AI", "Web", "Game", "iOS"];

export const PROJECTS = [
  {
    title: "AWL Midnight",
    category: "iOS",
    tag: "New",
    year: "2026",
    description:
      "An academic vocabulary app for IELTS — 570 AWL + 121 advanced words (691 total, 70 sets) — with a home-screen widget that rotates hourly. Daily word sets, EN→TR / TR→EN / EN→EN quizzes, a Focus list that resurfaces anything you haven't mastered, lock-screen widgets, and on-device speech synthesis, all wrapped in a dark 'Midnight' theme.",
    stack: ["SwiftUI", "WidgetKit", "AVSpeechSynthesizer", "App Groups"],
    image: awlMidnightImage,
    live: null,
    code: "https://github.com/gizemtuguz/awl-midnight",
    caseStudy: null,
  },
  {
    title: "VLM Hybrid Confidence Score",
    category: "AI",
    tag: "Research",
    year: "2026",
    description:
      "An IEEE-format research project introducing VLM-HCS — a post-hoc calibration framework that fuses five heterogeneous confidence signals (logit yes/no, verbal self-report, token entropy, P(True), and self-consistency) to detect and correct confident hallucinations in vision-language models. Evaluated on LLaVA-NeXT across HallusionBench, MME-Cognition and more.",
    stack: ["LLaVA-NeXT", "PyTorch", "Platt Scaling", "Calibration"],
    image: vlmResearchImage,
    live: null,
    code: null,
    caseStudy: null,
  },
  {
    title: "Hardware Assembly Progress Tracker",
    category: "AI",
    tag: "Thesis",
    year: "2026",
    description:
      "My graduation thesis: a real-time webcam agent that watches a hardware-assembly process and verifies the current step using a fine-tuned PaliGemma 2 3B vision-language model. LoRA/QLoRA training in Colab, MLX inference on Apple Silicon, anti-hallucination constrained decoding, and an async OpenCV UI that never blocks on the model.",
    stack: ["PaliGemma 2", "MLX", "PyTorch", "OpenCV", "LoRA"],
    image: thesisTrackerImage,
    live: null,
    code: null,
    caseStudy: null,
  },
  {
    title: "IEEE ESTÜ Student Branch Website",
    category: "Web",
    tag: "Live",
    year: "2025",
    description:
      "The official website for the IEEE ESTÜ Student Branch — committees, events, sponsors and membership — built as a fast, responsive marketing site.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    image: ieeeEstuImage,
    live: "https://ieee-estu-website.vercel.app",
    code: "https://github.com/gizemtuguz/ieee-estu-website",
    caseStudy: null,
  },
  {
    title: "Gusto Ocakbaşı",
    category: "Web",
    tag: "Live",
    year: "2025",
    description:
      "A restaurant website with an animated intro, digital menu, and reservation-ready layout — designed to feel warm, premium, and unmistakably brand-led.",
    stack: ["Next.js", "TypeScript", "Framer Motion"],
    image: gustoImage,
    live: "https://gusto-ocakbasi.vercel.app",
    code: "https://github.com/gizemtuguz/gusto-ocakbasi",
    caseStudy: null,
  },
  {
    title: "Fake News Detection Platform",
    category: "AI",
    year: "2024",
    description:
      "A machine-learning pipeline that scores news headlines in real time, visualises dataset insights, and flags risky sources for editors.",
    stack: ["Python", "Transformers", "PyTorch", "Scikit-learn"],
    image: fakeNewsImage,
    live: null,
    code: null,
    caseStudy: fakeNewsCaseStudy,
  },
  {
    title: "Fovea & Optic Disc Localization",
    category: "AI",
    year: "2024",
    description:
      "A classical computer-vision pipeline in MATLAB that localizes the fovea and optic disc in retinal fundus images (IDRiD dataset) — a building block for automated diabetic-retinopathy screening.",
    stack: ["MATLAB", "Image Processing", "IDRiD"],
    image: foveaImage,
    live: null,
    code: "https://github.com/gizemtuguz/fovea-optic-disc-localization",
    caseStudy: null,
  },
  {
    title: "Affiliate Dashboard Resources",
    category: "Web",
    year: "2024",
    description:
      "A partner portal delivering launch playbooks, incentive trackers, and marketing assets so affiliates can self-serve what they need in seconds.",
    stack: ["React", "TypeScript", "SCSS", "Figma"],
    image: affiliateDashboardImage,
    live: null,
    code: null,
    caseStudy: affiliateDashboardCaseStudy,
  },
  {
    title: "Grave Keeper",
    category: "Game",
    year: "2023",
    description:
      "A narrative puzzle adventure set in a haunted graveyard where players solve environment riddles and manage limited resources.",
    stack: ["Unity", "C#", "Particle FX"],
    image: graveKeeperImage,
    live: null,
    code: null,
    caseStudy: graveKeeperCaseStudy,
  },
  {
    title: "Galaxy Shooter",
    category: "Game",
    year: "2023",
    description:
      "An arcade-style space shooter with parallax backgrounds, boss mechanics, and upgradeable ships built as a polished desktop game demo.",
    stack: ["Unity 3D", "C#", "Blender"],
    image: galaxyShooterImage,
    live: null,
    code: null,
    caseStudy: galaxyShooterCaseStudy,
  },
  {
    title: "TR · EN Wordle",
    category: "Game",
    tag: "Live",
    year: "2023",
    description:
      "A bilingual (Turkish / English) Wordle clone with daily words, an on-screen keyboard, and win / lose states — a clean, instantly playable word game.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: wordleImage,
    live: "https://tr-eng-wordle.vercel.app",
    code: "https://github.com/gizemtuguz/tr-eng-wordle",
    caseStudy: null,
  },
  {
    title: "Article Submission System",
    category: "Web",
    year: "2023",
    description:
      "An end-to-end workflow where authors upload manuscripts, editors assign reviewers, and everyone tracks revisions through a clean dashboard.",
    stack: ["Flask", "Python", "MySQL", "Bootstrap"],
    image: articleSubmissionImage,
    live: null,
    code: "https://github.com/gizemtuguz/Article-Submission-System",
    caseStudy: articleSubmissionCaseStudy,
  },
  {
    title: "Mini Muslims",
    category: "Game",
    year: "2022",
    description:
      "A gamified learning app that teaches daily prayers and Islamic values through interactive stories, quizzes, and voice-overs.",
    stack: ["Unity 2D", "C#", "JSON", "Sound Design"],
    image: miniMuslimsImage,
    live: null,
    code: null,
    caseStudy: miniMuslimsCaseStudy,
  },
];

/* Animated headline stats — honest counts that match the project list */
export const STATS = [
  { label: "Projects", value: 13, suffix: "" },
  { label: "AI / ML", value: 4, suffix: "" },
  { label: "Web Apps", value: 4, suffix: "" },
  { label: "Games", value: 4, suffix: "" },
];

/* ============================================================
   Project Management
   PLACEHOLDER CONTENT — grounded in real IEEE / event experience.
   Replace numbers, event names, dates, and certifications with the
   real ones when ready. Every field below is safe to edit.
   ============================================================ */
export const PM = {
  intro:
    "Beyond shipping code, I lead people and programs. As IEEE ESTÜ Student Branch President I ran a full year of technical and social events with volunteer teams, sponsors, and real budgets. I also trained formally in project management through the SCA Social Strategic Project Management program, where I designed a full project end-to-end — from charter to closure.",

  // Headline impact numbers (animated) — real IEEE ESTÜ leadership scale.
  stats: [
    { label: "Members led", value: 600, suffix: "+" },
    { label: "Core team", value: 30, suffix: "" },
    { label: "People reached", value: 1000, suffix: "+" },
    { label: "Sponsors & partners", value: 10, suffix: "+" },
  ],

  // Case studies use a Challenge → Action → Result structure.
  caseStudies: [
    {
      title: "Ayné — AI Virtual Try-On & Size Recommendation",
      role: "Project Manager",
      period: "2026 · 9-month plan",
      team: "6-person team · ~₺5M budget",
      program: "Designed end-to-end in the SCA Social Strategic Project Management program",
      challenge:
        "Wrong-size and fit uncertainty drives the majority of online-fashion returns — industry research attributes 50–70% of clothing returns to size or fit — which hurts conversion, margins, and customer trust.",
      action:
        "Owned the complete project design: project charter and SMART goals, work-breakdown structure and activity network, a 9-month schedule (Jan–Sep 2026), a ~₺5M budget across 13 line items, a RACI matrix, a probability×impact risk register, stakeholder and communication plans, and acceptance & closure criteria.",
      result:
        "A board-ready project package for an AI live try-on + size-recommendation MVP — with measurable success targets and a multi-category scale-up roadmap — delivered as the capstone of the program's PM track.",
      tags: ["Project charter", "WBS & network", "Gantt schedule", "Budgeting", "RACI", "Risk matrix", "Stakeholder mgmt"],
      targets: ["≥85% size accuracy", "≥20% fewer returns", "≤3s live latency", "+10% conversion"],
      deck: ayneDeck,
    },
    {
      title: "IEEE ESTÜ Student Branch — Presidency",
      role: "President",
      period: "2024 – 2025",
      team: "600+ members · 30-person core team",
      challenge:
        "Lead a 600+ member student organization and align a 30-person core team across committees, sponsors, and a full annual program — under a fixed budget and volunteer constraints.",
      action:
        "Owned the annual roadmap and goals, delegated clear ownership across committees, ran weekly syncs and shared status tracking, managed sponsor relationships and budgeting, and coordinated cross-functional delivery end-to-end.",
      result:
        "Ran the full annual program on schedule and within budget — sustained by 10+ sponsors and partners and reaching 1000+ people — while keeping a large volunteer team aligned and accountable.",
      tags: ["Program management", "Team leadership", "Stakeholder mgmt", "Budgeting", "Sponsorship"],
    },
    {
      title: "Sensorless In-Line Defect Detection (Vision AI)",
      role: "Project design & planning",
      period: "2026",
      team: "SCA Social program project",
      program: "Designed in the SCA Social AI & Data Science module",
      challenge:
        "Manufacturing defects are usually caught too late — at end-of-line inspection, by random sampling, or with expensive process-specific sensors — while human inspection is fatigue-prone and doesn't scale.",
      action:
        "Designed a sensorless, camera-only real-time quality-control system end-to-end: the data strategy (labeled step / defect / negative frames and bounding-box annotations), a hybrid architecture (a fine-tuned vision-language model for step & defect classification plus an object-detection model for critical-detail verification), temporal voting to cut false alarms, on-device/edge inference with privacy-by-design, PLC/SCADA integration for in-line prevention, and the KPI framework.",
      result:
        "A complete, retrofit-friendly project design for in-line quality control — general-purpose (scenario-defined), low-cost (one camera + edge device per station), with a measurable recall / precision / latency / rework-reduction plan.",
      tags: ["Problem framing", "Data strategy", "Solution architecture", "VLM + detection", "Edge / on-device", "KPI design", "Risk & privacy"],
    },
  ],

  // Ways of working + tools (chips).
  methodologies: [
    "Agile",
    "Scrum",
    "Kanban",
    "Waterfall",
    "Roadmapping",
    "Risk Management",
    "Stakeholder Management",
  ],
  tools: ["Jira", "Trello", "Notion", "Asana", "Miro", "Slack", "Google Workspace"],

  // Credentials. `file` links to a PDF when available (added once the PDFs are
  // dropped into src/projects/). EDIT names/issuer to match the documents exactly.
  certifications: [
    {
      name: "Project Management Professional Development Program",
      issuer: "SCA Social · TNC Group · CPD-accredited · 40h",
      status: "Certified",
      file: scaPmCertificate,
    },
    {
      name: "Reference Letter",
      issuer: "TNC Group · SCA Social",
      status: "PM program",
      file: referenceLetter,
    },
  ],
};

export const GITHUB = {
  blurb: "Code speaks louder than words — explore my repos on GitHub.",
  profileUrl: "https://github.com/gizemtuguz",
};
