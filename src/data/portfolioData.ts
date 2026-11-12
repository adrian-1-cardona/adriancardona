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
  bio: "B.S. in Computer Science student at Cal Poly San Luis Obispo (Expected May 2027, GPA: 3.5/4.0). Software Engineering Intern at Cal Poly Bailey College of Science and Mathematics.",
  location: "San Luis Obispo, California",
  education: {
    school: "California Polytechnic State University, San Luis Obispo",
    degree: "B.S. in Computer Science",
    gpa: "3.5 / 4.0",
    graduation: "Expected May 2027",
    location: "San Luis Obispo, California",
    coursework: [
      "Data Structures & Algorithms",
      "Systems Programming",
      "Databases",
      "Computer Security",
    ],
    logo: "/images/logos/calpoly-seal.svg",
  },
  links: {
    github: "https://github.com/adrian-1-cardona",
    linkedin: "https://linkedin.com/in/adrian-cardona/",
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
    type: "Software Engineering Internship",
    logo: "/images/logos/calpoly-seal.svg",
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
    type: "Academic Research",
    logo: "/images/logos/calpoly-seal.svg",
    description:
      "Engineered a Python backend to automate training and evaluation pipelines for cooperative AI research.",
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
      "Desktop Application",
      "System Telemetry",
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
    logo: "/images/logos/foundationccc-official.svg",
    description:
      "Analyzed financial aid and student data to identify barriers to FAFSA access and show where students needed support.",
    achievements: [
      "Analyzed financial aid and student data to identify barriers to FAFSA access and show where students needed support.",
    ],
    skills: [
      "Data Analysis",
      "SQL",
      "Student Financial Aid",
      "FAFSA Access",
      "Higher Education",
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
    logo: "/images/logos/extern-official.png",
    description:
      "Built RAG pipelines that help search through mortgage and lease documents and generate answers from the retrieved information.",
    achievements: [
      "Built RAG pipelines that help search through mortgage and lease documents and generate answers from the retrieved information.",
    ],
    skills: [
      "Python",
      "RAG Pipelines",
      "LlamaIndex",
      "Document Intelligence",
      "Retrieval Systems",
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    id: "guppty",
    name: "Guppty Programming Language",
    tagline:
      "Built a programming language in Rust with a compiler and interpreter, using GitHub Actions CI/CD to automatically test changes.",
    category: "Rust",
    year: "2026",
    description:
      "Built a programming language in Rust with a compiler and interpreter, using GitHub Actions CI/CD to automatically test changes.",
    highlights: [
      "Built a programming language in Rust with a compiler and interpreter, using GitHub Actions CI/CD to automatically test changes.",
    ],
    stack: [
      "Rust",
      "Compiler",
      "Interpreter",
      "GitHub Actions CI/CD",
    ],
    links: [
      {
        label: "Documentation",
        href: "https://adrian-1-cardona.github.io/Guppty/#installation",
        isExternal: true,
      },
      {
        label: "GitHub Repository",
        href: "https://github.com/adrian-1-cardona",
        isExternal: true,
      },
    ],
  },
  {
    id: "gitex",
    name: "Gitex",
    tagline:
      "Built a TypeScript and React codebase Q&A app with Gemini API, while CI/CD and Sentry catch issues before and after release.",
    category: "TypeScript, React, JavaScript",
    year: "2026",
    description:
      "Built a TypeScript and React codebase Q&A app with Gemini API, while CI/CD and Sentry catch issues before and after release.",
    highlights: [
      "Built a TypeScript and React codebase Q&A app with Gemini API, while CI/CD and Sentry catch issues before and after release.",
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
        label: "Live Demo",
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
  aiAndDevTools: [
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
    id: "1",
    slug: "rust-compiler-pipeline",
    title: "Engineering a Bytecode Compiler & Virtual Machine in Pure Rust",
    subtitle:
      "A hands-on breakdown of single-pass recursive descent parsing, compact opcode emission, and stack VM dispatch without runtime overhead.",
    category: "Systems & Compilers",
    publishDate: "March 2026",
    readTime: "7 min read",
    summary:
      "How Guppty executes arbitrary dynamic code with zero garbage collection pauses using Pratt precedence parsing, arena constant pools, and differential testing.",
    sections: [
      {
        heading: "1. The Grammar & Pratt Precedence Parser",
        paragraphs: [
          "When designing Guppty, the first major decision was to reject parser-generator bloat in favor of a clean, hand-written Pratt parser in Rust. Pratt parsing associates parsing functions with semantic tokens rather than monolithic grammar rules, keeping expression precedence climbing linear with respect to source token count.",
        ],
      },
    ],
    keyTakeaways: [
      "Hand-written recursive descent Pratt parsers drastically reduce binary size compared to parser generators.",
      "Dual execution backends tested with differential test suites prevent compiler-VM behavioral regressions.",
    ],
  },
  {
    id: "2",
    slug: "grounded-rag-architecture",
    title: "Grounded Retrieval & Hallucination Elimination in Codebase Q&A",
    subtitle:
      "Architecting Gitex: Vector indexing, AST chunking, and refusal calibration with Convex and the Gemini API.",
    category: "AI & Retrieval",
    publishDate: "February 2026",
    readTime: "6 min read",
    summary:
      "A practical engineering guide to achieving 100% groundedness and refusal accuracy across codebase retrieval benchmarks.",
    sections: [
      {
        heading: "1. The Problem with Naive Chunking",
        paragraphs: [
          "Most RAG pipelines split source files arbitrarily by character count. In code, this destroys function scopes and symbol references. Gitex indexes files by AST boundaries, ensuring every chunk retains its enclosing namespace, imports, and declaration context.",
        ],
      },
    ],
    keyTakeaways: [
      "Chunking source code along AST nodes retains syntactic scope and prevents context fragmentation.",
      "Calibrating refusal thresholds prevents hallucination on missing external symbols.",
    ],
  },
]
