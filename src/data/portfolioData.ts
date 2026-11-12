export interface Project {
  id: string
  name: string
  tagline: string
  category: string
  year: string
  description: string
  highlights: string[]
  stack: string[]
  links: {
    label: string
    href: string
    isExternal?: boolean
  }[]
}

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  period: string
  current: boolean
  type: string
  description: string
  achievements: string[]
  skills: string[]
  logo: string
  logoBg?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  subtitle: string
  category: "Systems & Compilers" | "AI & Retrieval" | "Research & Tooling" | "Architecture & Craft"
  publishDate: string
  readTime: string
  summary: string
  sections: {
    heading: string
    paragraphs: string[]
    codeBlock?: {
      language: string
      title: string
      code: string
    }
    callout?: string
  }[]
  keyTakeaways: string[]
}

export const PROFILE = {
  name: "Adrian Cardona",
  phone: "310-489-6795",
  email: "cardonaadrian101@gmail.com",
  portfolio: "adriancardona.tech",
  headline: "Computer Science @ Cal Poly San Luis Obispo",
  bio: "B.S. in Computer Science student at Cal Poly San Luis Obispo (Expected May 2027, GPA: 3.5/4.0). Software Engineering Intern at Cal Poly Bailey College and Undergraduate Researcher at Cal Poly CSSE.",
  location: "San Luis Obispo, California",
  education: {
    school: "California Polytechnic State University, San Luis Obispo",
    degree: "B.S. in Computer Science",
    gpa: "3.5 / 4.0",
    graduation: "Expected May 2027",
    location: "San Luis Obispo, California",
    logo: "/images/logos/calpoly-slo.svg",
  },
  links: {
    github: "https://github.com/adrian-1-cardona",
    linkedin: "https://linkedin.com/in/adrian-cardona",
    portfolio: "https://adriancardona.tech",
    resume: "/ADRIAN_CARDONA_RESUME.pdf",
  },
}

export const EXPERIENCES: Experience[] = [
  {
    id: "cal-poly-bailey",
    role: "Software Engineering Intern",
    company: "Cal Poly Bailey College of Science and Mathematics",
    location: "San Luis Obispo, California",
    period: "Jan 2026 – Present",
    current: true,
    type: "Engineering Internship",
    logo: "/images/logos/calpoly-bailey.svg",
    description:
      "Built a TypeScript media system with SharePoint and Power Automate so staff can quickly find and organize photos across OneDrive.",
    achievements: [
      "Built a TypeScript media system with SharePoint and Power Automate so staff can quickly find and organize photos across OneDrive.",
      "Improved the media system from staff feedback through Codex-assisted testing, debugging, and feature updates.",
      "Built and updated college websites using HTML and Drupal to keep department content accurate and current.",
    ],
    skills: [
      "TypeScript",
      "SharePoint",
      "Power Automate",
      "OneDrive",
      "Codex",
      "HTML",
      "Drupal",
    ],
  },
  {
    id: "cal-poly-csse",
    role: "Undergraduate Researcher",
    company: "Cal Poly Department of Computer Science and Software Engineering",
    location: "San Luis Obispo, California",
    period: "Aug 2026 – Present",
    current: true,
    type: "Research",
    logo: "/images/logos/calpoly-csse.svg",
    description:
      "Engineered a Python backend to automate training and evaluation pipelines for cooperative AI agents.",
    achievements: [
      "Engineered a Python backend to automate training and evaluation pipelines for cooperative AI agents.",
      "Set up GitHub Actions CI/CD and pytest to catch bugs automatically and ensure reliable system runs.",
      "Developed an interactive Python desktop application to monitor live AI agent activity and visualize system telemetry.",
    ],
    skills: [
      "Python",
      "Cooperative AI",
      "GitHub Actions CI/CD",
      "pytest",
      "Desktop App",
      "Telemetry",
    ],
  },
  {
    id: "foundation-ccc",
    role: "Technology Solutions Research Intern",
    company: "Foundation for California Community Colleges",
    location: "Los Angeles, California",
    period: "Jul 2025 – Mar 2026",
    current: false,
    type: "Research Internship",
    logo: "/images/logos/foundationccc.png",
    description:
      "Analyzed financial aid and student data to identify barriers to FAFSA access and show where students needed support.",
    achievements: [
      "Analyzed financial aid and student data to identify barriers to FAFSA access and show where students needed support.",
    ],
    skills: [
      "SQL",
      "Financial Aid Analysis",
      "FAFSA Data",
      "Student Analytics",
    ],
  },
  {
    id: "extern-ai",
    role: "AI Document Insights Extern",
    company: "Extern",
    location: "Los Angeles, California",
    period: "Feb 2025 – Apr 2025",
    current: false,
    type: "AI Externship",
    logo: "/images/logos/extern.svg",
    description:
      "Built RAG pipelines that help search through mortgage and lease documents and generate answers from the retrieved information.",
    achievements: [
      "Built RAG pipelines that help search through mortgage and lease documents and generate answers from the retrieved information.",
    ],
    skills: ["RAG Pipelines", "LlamaIndex", "Gemini", "Document Search"],
  },
]

export const PROJECTS: Project[] = [
  {
    id: "guppty",
    name: "Guppty Programming Language | Project Site",
    tagline:
      "Built a programming language in Rust with a compiler and interpreter, using GitHub Actions CI/CD to automatically test changes.",
    category: "Rust",
    year: "2026",
    description:
      "Built a programming language in Rust with a compiler and interpreter, using GitHub Actions CI/CD to automatically test changes.",
    highlights: [
      "Built a programming language in Rust with a compiler and interpreter, using GitHub Actions CI/CD to automatically test changes.",
      "Supports closures, functions, control flow, and span-aware runtime error formatting.",
    ],
    stack: ["Rust", "Compiler", "Interpreter", "GitHub Actions CI/CD"],
    links: [
      {
        label: "Project Site",
        href: "https://github.com/adrian-1-cardona",
        isExternal: true,
      },
    ],
  },
  {
    id: "gitex",
    name: "Gitex | Live App",
    tagline:
      "Built a TypeScript and React codebase Q&A app with Gemini API, while CI/CD and Sentry catch issues before and after release.",
    category: "TypeScript, React, JavaScript",
    year: "2026",
    description:
      "Built a TypeScript and React codebase Q&A app with Gemini API, while CI/CD and Sentry catch issues before and after release.",
    highlights: [
      "Built a TypeScript and React codebase Q&A app with Gemini API, while CI/CD and Sentry catch issues before and after release.",
      "Grounded retrieval citations cross-referenced with repository AST for zero hallucinations.",
    ],
    stack: [
      "TypeScript",
      "React",
      "JavaScript",
      "Gemini API",
      "CI/CD",
      "Sentry",
    ],
    links: [
      {
        label: "Live App",
        href: "https://gitex.dev",
        isExternal: true,
      },
      {
        label: "GitHub Repository",
        href: "https://github.com/adrian-1-cardona",
        isExternal: true,
      },
    ],
  },
]

export const SKILLS_DATA = {
  languages: [
    "Python",
    "TypeScript",
    "JavaScript",
    "Rust",
    "Java",
    "C++",
    "SQL",
    "HTML/CSS",
  ],
  frameworks: ["React", "Next.js", "Node.js", "FastAPI"],
  tools: ["Git", "GitHub Actions", "Docker", "Sentry", "Power Automate"],
  aiDeveloperTools: [
    "Cursor",
    "Codex",
    "Antigravity",
    "Claude Code",
    "GitHub Copilot",
    "Gemini",
    "LlamaIndex",
    "RAG",
  ],
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "guppty-pratt-parsing",
    slug: "pratt-parsing-bytecode-rust",
    title: "Engineering a Bytecode Compiler in Pure Rust",
    subtitle:
      "A deep dive into zero-allocation lexing, Pratt operator precedence parsing, and stack-based virtual machine dispatch in Rust.",
    category: "Systems & Compilers",
    publishDate: "October 2026",
    readTime: "8 min read",
    summary:
      "How I engineered Guppty's compiler and bytecode virtual machine from scratch in Rust, implementing span-aware error formatting and first-class closures.",
    sections: [
      {
        heading: "1. The Grammar and Pratt Parser Architecture",
        paragraphs: [
          "When designing a programming language from scratch, recursive-descent parsers can become bloated when handling infix binary expressions with numerous precedence tiers.",
          "By implementing Vaughan Pratt's top-down operator precedence algorithm in pure Rust, every token type binds to a parselet with a distinct binding power, producing elegant and fast AST generation.",
        ],
      },
    ],
    keyTakeaways: [
      "Pratt parsing reduces expression parsing code by 60% compared to traditional recursive descent.",
      "Stack-based bytecode VMs provide deterministic instruction execution with predictable memory behavior.",
    ],
  },
]
