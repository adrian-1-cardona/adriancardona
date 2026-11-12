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
  email: "cardona.adrian.1029@gmail.com",
  portfolio: "adriancardona.tech",
  headline: "Computer Science @ Cal Poly San Luis Obispo",
  bio: "B.S. in Computer Science student at Cal Poly San Luis Obispo (Expected May 2027, GPA: 3.5/4.0). Web Development Intern at Cal Poly Bailey College of Science and Mathematics.",
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
    logo: "/images/logos/calpoly-slo.svg",
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
    role: "Web Development Intern",
    company: "Cal Poly Bailey College of Science and Mathematics",
    location: "San Luis Obispo, California",
    period: "Jan 2026 – Present",
    current: true,
    type: "Engineering Internship",
    logo: "/images/logos/calpoly-bailey.svg",
    description:
      "Built an internal digital asset management system with SharePoint and Power Automate, automating batch ingestion, metadata indexing, duplicate detection, validation, and failure recovery.",
    achievements: [
      "Built an internal digital asset management system with SharePoint and Power Automate, automating batch ingestion, metadata indexing, duplicate detection, validation, and failure recovery.",
      "Engineered a resumable migration pipeline for 58,579 media records with persistent state, collision-safe writes, automated retries, and source traceability while preserving data integrity.",
    ],
    skills: [
      "TypeScript",
      "SharePoint",
      "Power Automate",
      "Digital Asset Management",
      "Data Integrity",
      "Batch Ingestion",
    ],
  },
  {
    id: "foundation-ccc",
    role: "Technology Solutions Research Intern",
    company: "Foundation for California Community Colleges",
    location: "Los Angeles, California",
    period: "July 2025 – March 2026",
    current: false,
    type: "Research Internship",
    logo: "/images/logos/foundationccc.png",
    description:
      "Analyzed statewide education datasets for the Technology Solutions team, transforming enrollment, demographic, and financial-aid data into 10+ stakeholder-facing visualizations and actionable insights.",
    achievements: [
      "Analyzed statewide education datasets for the Technology Solutions team, transforming enrollment, demographic, and financial-aid data into 10+ stakeholder-facing visualizations and actionable insights.",
      "Built reusable data-processing and validation workflows for a 6-person research team, standardizing data cleaning and reporting to improve accuracy, reproducibility, and delivery speed.",
    ],
    skills: [
      "Statewide Datasets",
      "SQL",
      "Data Visualizations",
      "Workflow Automation",
      "Reproducible Research",
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
      "Built a Python RAG pipeline with LlamaIndex, Ollama, and Gemini API to ingest mortgage and lease documents, generate embeddings, and retrieve grounded context.",
    achievements: [
      "Built a Python RAG pipeline with LlamaIndex, Ollama, and Gemini API to ingest mortgage and lease documents, generate embeddings, and retrieve grounded context.",
      "Evaluated open-source AI models and optimized chunking, retrieval, and prompting strategies, presenting the final document intelligence system to Outamation stakeholders.",
    ],
    skills: [
      "Python",
      "LlamaIndex",
      "Ollama",
      "Gemini API",
      "RAG Pipeline",
      "Vector Embeddings",
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
      "Engineered a Python backend to automate training and evaluation pipelines for cooperative AI research.",
    achievements: [
      "Engineered a Python backend to automate training and evaluation pipelines for cooperative AI agents.",
      "Set up GitHub Actions CI/CD and pytest to catch bugs automatically and ensure reliable benchmark runs.",
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
]

export const PROJECTS: Project[] = [
  {
    id: "guppty",
    name: "Guppty Programming Language",
    tagline:
      "A programming language in Rust with a lexer, parser, bytecode compiler, and stack VM.",
    category: "Rust",
    year: "2026",
    description:
      "Built a programming language in Rust with a lexer, parser, bytecode compiler, and stack VM, supporting closures, functions, control flow, and span-aware runtime errors.",
    highlights: [
      "Built a programming language in Rust with a lexer, parser, bytecode compiler, and stack VM, supporting closures, functions, control flow, and span-aware runtime errors.",
      "Engineered dual interpreter and VM execution backends with 38+ tests and CI-enforced differential testing to guarantee identical program behavior.",
    ],
    stack: [
      "Rust",
      "Lexer & Parser",
      "Bytecode Compiler",
      "Stack VM",
      "Differential Testing",
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
      "GitHub codebase Q&A platform with Gemini embeddings and Convex vector search.",
    category: "TypeScript, React, JavaScript",
    year: "2026",
    description:
      "Built a GitHub codebase Q&A platform with Gemini embeddings and Convex vector search, achieving 100% groundedness and refusal accuracy across 31 retrieval evaluations.",
    highlights: [
      "Built a GitHub codebase Q&A platform with Gemini embeddings and Convex vector search, achieving 100% groundedness and refusal accuracy across 31 retrieval evaluations.",
      "Engineered production-grade auth, billing, rate limiting, and AI security controls with Clerk, Stripe, and 160+ automated tests, enforcing retrieval evaluations through CI.",
    ],
    stack: [
      "TypeScript",
      "React",
      "JavaScript",
      "Gemini Embeddings",
      "Convex Vector Search",
      "Clerk",
      "Stripe",
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
    "SQL",
    "Java",
    "C",
    "C++",
    "HTML",
    "CSS",
  ],
  frameworks: [
    "React",
    "Next.js",
    "Node.js",
    "FastAPI",
    "Tailwind CSS",
    "Vite",
  ],
  databases: [
    "PostgreSQL",
    "Redis",
    "Convex",
    "Docker",
    "Docker Compose",
    "Celery",
    "Prometheus",
    "Grafana",
  ],
  tools: [
    "Git",
    "GitHub Actions",
    "Unix/Linux",
    "Jira",
    "Jupyter Notebook",
    "VS Code",
    "IntelliJ",
  ],
  aiDeveloperTools: [
    "Claude Code",
    "Codex",
    "ChatGPT",
    "Cursor",
    "Gemini API",
    "Ollama",
    "LlamaIndex",
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
      {
        heading: "2. Flat Bytecode Vectors vs Stack Frames",
        paragraphs: [
          "To avoid dynamic heap allocations during expression evaluation, Guppty emits instructions into a flat, contiguous vector of opcodes. Operands are pushed onto a fixed-capacity stack frame.",
          "This cache-friendly memory layout enables the interpreter loop to achieve sub-microsecond instruction dispatch on modern x86_64 and ARM processors.",
        ],
      },
    ],
    keyTakeaways: [
      "Pratt parsing reduces expression parsing code by 60% compared to traditional recursive descent.",
      "Stack-based bytecode VMs provide deterministic instruction execution with predictable memory behavior.",
    ],
  },
  {
    id: "gitex-ast-grounding",
    slug: "ast-grounded-code-intelligence",
    title: "Hallucination-Free Code Intelligence with AST Grounding",
    subtitle:
      "How Gitex verifies semantic LLM retrieval against concrete syntax trees and Git diffs to deliver verifiable codebase answers.",
    category: "AI & Retrieval",
    publishDate: "November 2026",
    readTime: "6 min read",
    summary:
      "Techniques for cross-referencing LLM retrieval with AST symbol tables to ensure 100% verifiable code references without hallucinations.",
    sections: [
      {
        heading: "1. The Citation Verification Problem",
        paragraphs: [
          "Standard RAG pipelines query vector databases using text chunks, often producing hallucinated function signatures or obsolete file paths when answering code questions.",
          "Gitex resolves this by parsing the target repository into an abstract syntax tree, resolving symbol scopes, and filtering retrieved snippets against active AST definitions.",
        ],
      },
      {
        heading: "2. Verifying Citations Against Git Diffs",
        paragraphs: [
          "When analyzing pull requests or local working trees, Gitex overlays git diff hunks onto the AST index. Citations are verified against line boundaries so every link points directly to valid code.",
        ],
      },
    ],
    keyTakeaways: [
      "AST symbol table grounding prevents LLM hallucinations in codebase Q&A systems.",
      "Overlaying git diffs on syntax trees enables real-time verification of code citations.",
    ],
  },
]
