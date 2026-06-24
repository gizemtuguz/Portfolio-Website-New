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
export const PROJECT_CATEGORIES = ["All", "AI", "Web", "Game"];

export const PROJECTS = [
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
  { label: "Projects", value: 12, suffix: "" },
  { label: "AI / ML", value: 4, suffix: "" },
  { label: "Web Apps", value: 4, suffix: "" },
  { label: "Games", value: 4, suffix: "" },
];

export const GITHUB = {
  blurb: "Code speaks louder than words — explore my repos on GitHub.",
  profileUrl: "https://github.com/gizemtuguz",
};
