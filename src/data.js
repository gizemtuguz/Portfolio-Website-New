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

export const PROFILE = {
  name: "Gizem",
  title: "Developer • Designer • Innovator",
  tagline: "I bring ideas to life through code, design, and technology — from sleek web apps to creative digital experiences.",
  email: "gizemtuguz@gmail.com",
  phone: "+90 5068489115",
  location: "Eskişehir, Türkiye",
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

export const PROJECTS = [
  {
    title: "Affiliate Dashboard Resources",
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
    description:
      "A narrative puzzle adventure set in a haunted graveyard where players solve environment riddles and manage limited resources.",
    stack: ["Unity", "C#", "Particle FX"],
    image: graveKeeperImage,
    live: null,
    code: null,
    caseStudy: graveKeeperCaseStudy,
  },
  {
    title: "Fake News Detection Platform",
    description:
      "A machine-learning pipeline that scores news headlines in real time, visualises dataset insights, and flags risky sources for editors.",
    stack: ["Python", "Transformers", "PyTorch", "Scikit-learn"],
    image: fakeNewsImage,
    live: null,
    code: null,
    caseStudy: fakeNewsCaseStudy,
  },
  {
    title: "Galaxy Shooter",
    description:
      "An arcade-style space shooter with parallax backgrounds, boss mechanics, and upgradeable ships built as a polished desktop game demo.",
    stack: ["Unity 3D", "C#", "Blender"],
    image: galaxyShooterImage,
    live: null,
    code: null,
    caseStudy: galaxyShooterCaseStudy,
  },
  {
    title: "Article Submission System",
    description:
      "An end-to-end workflow where authors upload manuscripts, editors assign reviewers, and everyone tracks revisions through a clean dashboard.",
    stack: ["Flask", "Python", "MySQL", "Bootstrap"],
    image: articleSubmissionImage,
    live: null,
    code: null,
    caseStudy: articleSubmissionCaseStudy,
  },
  {
    title: "Mini Muslims",
    description:
      "A gamified learning app that teaches daily prayers and Islamic values through interactive stories, quizzes, and voice-overs.",
    stack: ["Unity 2D", "C#", "JSON", "Sound Design"],
    image: miniMuslimsImage,
    live: null,
    code: null,
    caseStudy: miniMuslimsCaseStudy,
  },
];

export const GITHUB = {
  blurb: "Code speaks louder than words — explore my repos on GitHub.",
  profileUrl: "https://github.com/gizemtuguz",
};
