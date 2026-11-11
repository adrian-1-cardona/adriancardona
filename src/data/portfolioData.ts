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
  codeSnippet?: {
    language: string
    title: string
    code: string
  }
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

export interface ToolCategory {
  title: string
  description: string
  items: {
    name: string
    detail: string
  }[]
}

export const PROFILE = {
  name: "Adrian Cardona",
  eyebrow: "Software Engineer",
  headline: "High-performance systems. Compilers. Grounded AI.",
  bio: "Software engineer and undergraduate researcher at Cal Poly SLO. Building compilers in Rust, robust data pipelines, and production-grade AI infrastructure with an obsession for correctness, performance, and craftsmanship.",
  location: "San Luis Obispo, CA",
  education: {
    school: "California Polytechnic State University, San Luis Obispo",
    degree: "Computer Science",
    gpa: "3.5",
  },
  email: "cardonaadrian101@gmail.com",
  links: {
    github: "https://github.com/adrian-1-cardona",
    linkedin: "https://www.linkedin.com/in/adrian-cardona/",
    resume: "/ADRIAN_CARDONA_RESUME.pdf",
  },
}

export const PROJECTS: Project[] = [
  {
    id: "guppty",
    name: "Guppty",
    tagline: "A compiled programming language engineered from scratch in Rust.",
    category: "Systems & Compilers",
    year: "2026",
    description:
      "A complete programming language runtime implemented in pure Rust. Features a handwritten zero-allocation lexer, Pratt parser, recursive-descent bytecode compiler, stack-based virtual machine, lexical scoping with first-class closures, and span-aware compiler diagnostics.",
    highlights: [
      "Stack-based bytecode VM with custom instruction dispatch loop for predictable execution",
      "Pratt parser for robust operator precedence and expressive syntax trees",
      "Span-aware diagnostics with formatted source pointers and helpful compiler error hints",
      "Automated GitHub Actions CI/CD test suite verifying language semantics on every commit",
    ],
    stack: ["Rust", "Bytecode VM", "Compiler Design", "GitHub Actions CI"],
    links: [
      {
        label: "Documentation & Guide",
        href: "https://adrian-1-cardona.github.io/Guppty/#installation",
        isExternal: true,
      },
      {
        label: "Source Code on GitHub",
        href: "https://github.com/adrian-1-cardona",
        isExternal: true,
      },
    ],
    codeSnippet: {
      language: "rust",
      title: "guppty_vm::dispatch",
      code: `// Stack-based bytecode evaluation loop in Guppty
match instruction {
    OpCode::PushConstant(idx) => {
        let val = self.chunk.read_constant(idx);
        self.stack.push(val);
    }
    OpCode::BinaryAdd => {
        let b = self.stack.pop()?;
        let a = self.stack.pop()?;
        self.stack.push(a.add(b)?);
    }
    OpCode::CallFunction(argc) => {
        self.invoke_closure(argc)?;
    }
    OpCode::Return => {
        let res = self.stack.pop().unwrap_or(Value::Nil);
        if self.frames.is_empty() { return Ok(res); }
    }
}`,
    },
  },
  {
    id: "gitex",
    name: "Gitex",
    tagline: "Codebase intelligence and semantic Q&A platform.",
    category: "Full-Stack AI Platform",
    year: "2025 — 2026",
    description:
      "A full-stack platform that indexes multi-repository codebases and delivers verifiable, context-grounded answers. Built with TypeScript, React, Gemini API, Convex vector search, and monitored with Sentry for zero-regression production reliability.",
    highlights: [
      "Vector embedding pipelines with Convex DB for fast sub-50ms symbol and semantic code search",
      "Strict grounding prompt contracts preventing LLM hallucination on complex dependency graphs",
      "End-to-end CI/CD pipelines with automated type checking, linting, and Sentry error telemetry",
      "Streamlined developer UI with code citation trees and diff previews",
    ],
    stack: [
      "TypeScript",
      "React",
      "Gemini API",
      "Convex Vector DB",
      "Sentry",
      "Tailwind CSS",
    ],
    links: [
      {
        label: "Visit Gitex.dev",
        href: "https://gitex.dev",
        isExternal: true,
      },
      {
        label: "GitHub Repository",
        href: "https://github.com/adrian-1-cardona",
        isExternal: true,
      },
    ],
    codeSnippet: {
      language: "typescript",
      title: "gitex::queryPipeline",
      code: `// Grounded vector search & retrieval augmentation
export async function queryCodebase(query: string, repoId: string) {
  const embedding = await generateEmbedding(query);
  const relevantNodes = await convex.query("vectors:search", {
    vector: embedding,
    filter: { repoId },
    limit: 6,
  });

  return generateGroundedResponse({
    prompt: query,
    citations: relevantNodes,
    temperature: 0.1, // High determinism
  });
}`,
    },
  },
  {
    id: "experiment-runner",
    name: "Experiment Runner",
    tagline: "Automated research experiment orchestration for empirical AI.",
    category: "Research Infrastructure",
    year: "2026",
    description:
      "Python infrastructure and cross-platform desktop UI built for Cal Poly CSSE AI researchers to orchestrate multi-trial experimental runs with bit-for-bit repeatability, real-time progress telemetry, and deterministic validation suites.",
    highlights: [
      "Isolated subprocess worker pools with automatic error recovery and state checkpointing",
      "Desktop telemetry interface displaying live experiment metrics, memory utilization, and progress",
      "Comprehensive pytest validation suite with strict seed and environment locking",
      "Integrated into laboratory CI workflows for continuous benchmarking before paper submission",
    ],
    stack: ["Python", "Pytest", "Desktop UI", "Multiprocessing", "CI/CD"],
    links: [
      {
        label: "Cal Poly Research Project",
        href: "https://github.com/adrian-1-cardona",
        isExternal: true,
      },
    ],
    codeSnippet: {
      language: "python",
      title: "runner::orchestrate_trials",
      code: `class ExperimentOrchestrator:
    """Manages isolated trial executions with deterministic seed states."""
    def run_trial(self, trial_id: str, config: TrialConfig) -> TrialResult:
        with isolated_environment(seed=config.seed):
            logger.info("Starting deterministic run for trial %s", trial_id)
            metrics = execute_pipeline(config)
            self.telemetry.emit_checkpoint(trial_id, metrics)
            return TrialResult(status="PASSED", metrics=metrics)`,
    },
  },
]

export const EXPERIENCES: Experience[] = [
  {
    id: "cal-poly-bailey",
    company: "Cal Poly Bailey College of Science and Mathematics",
    role: "Software Engineering Intern",
    location: "San Luis Obispo, CA",
    period: "Jan 2026 — Present",
    current: true,
    type: "Engineering Internship",
    description:
      "Architected internal media management pipelines and modernized college web infrastructure to support academic departments and administrative teams.",
    achievements: [
      "Built a robust TypeScript media processing system integrated with SharePoint and Microsoft Power Automate, eliminating manual cataloging for staff.",
      "Engineered automated retry and error recovery logic, ensuring fault-tolerant data transfers across large file catalogs.",
      "Collaborated directly with non-technical staff to translate departmental needs into intuitive software workflows.",
      "Modernized responsive college web properties using HTML, modern CSS, and Drupal CMS.",
    ],
    skills: [
      "TypeScript",
      "Power Automate",
      "SharePoint API",
      "Drupal",
      "Systems Integration",
    ],
  },
  {
    id: "cal-poly-csse",
    company: "Cal Poly Department of Computer Science & Software Engineering",
    role: "Undergraduate Researcher",
    location: "San Luis Obispo, CA",
    period: "Aug 2026 — Present",
    current: true,
    type: "Research",
    description:
      "Designing automated testing frameworks and reproducible experiment runners for university AI and software engineering faculty.",
    achievements: [
      "Engineered a Python backend engine enabling AI researchers to execute identical trial suites with verifiable deterministic outputs.",
      "Implemented comprehensive automated testing with pytest and GitHub Actions CI to catch regressions prior to publication.",
      "Built a desktop progress monitor providing real-time telemetry into long-running experimental simulations.",
    ],
    skills: [
      "Python",
      "Automated Testing",
      "Pytest",
      "GitHub Actions CI",
      "Telemetry",
    ],
  },
  {
    id: "foundation-ccc",
    company: "Foundation for California Community Colleges",
    role: "Technology Solutions Research Intern",
    location: "Los Angeles, CA",
    period: "Jul 2025 — Mar 2026",
    current: false,
    type: "Data Engineering & Research",
    description:
      "Conducted data analysis across statewide student datasets to identify hurdles in financial aid distribution and enhance educational equity.",
    achievements: [
      "Analyzed large-scale student record databases with SQL to pinpoint key drop-off milestones in the FAFSA completion pipeline.",
      "Synthesized complex quantitative metrics into clear executive reports for policy directors and non-technical stakeholders.",
      "Iterated rapidly within an Agile research environment, revising analyses based on senior research critique.",
    ],
    skills: [
      "SQL",
      "Data Analysis",
      "Agile",
      "Stakeholder Reporting",
      "Python",
    ],
  },
  {
    id: "extern-ai",
    company: "AI Document Insights (Extern)",
    role: "AI Systems Extern",
    location: "Los Angeles, CA",
    period: "Feb 2025 — Apr 2025",
    current: false,
    type: "Applied AI",
    description:
      "Developed production-grade Retrieval-Augmented Generation (RAG) pipelines for complex financial and legal mortgage agreements.",
    achievements: [
      "Built semantic search and retrieval systems using Python, LlamaIndex, and Gemini API to query mortgage and lease documents.",
      "Engineered prompt grounding and citation mapping, eliminating hallucinations and ensuring every response quotes verifiable source text.",
      "Evaluated embedding models and chunking strategies to optimize precision and recall across dense legal tables.",
    ],
    skills: [
      "Python",
      "Gemini API",
      "RAG Pipelines",
      "LlamaIndex",
      "Vector Search",
    ],
  },
]

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    title: "Core Languages & Systems",
    description:
      "Compiled and typed languages for performance, reliability, and correctness.",
    items: [
      { name: "Rust", detail: "Bytecode VMs, memory safety, compilers" },
      { name: "TypeScript", detail: "Strict typing, scalable applications" },
      { name: "Python", detail: "Scientific computing, automation, AI" },
      { name: "C", detail: "Low-level systems and memory mechanics" },
      { name: "SQL", detail: "Relational modeling, analytics queries" },
    ],
  },
  {
    title: "Full-Stack & Web Architecture",
    description:
      "Modern frameworks and tooling for responsive, high-performance user interfaces.",
    items: [
      { name: "React", detail: "Declarative component architecture" },
      { name: "Next.js", detail: "Server-side rendering, routing" },
      { name: "Tailwind CSS", detail: "Utility-first design systems" },
      { name: "Vite", detail: "Lightning-fast modern build tooling" },
      { name: "Node.js", detail: "Asynchronous backend services" },
    ],
  },
  {
    title: "Data, Cloud & Infrastructure",
    description:
      "Persistent storage, containerization, and reliable operating environments.",
    items: [
      { name: "PostgreSQL", detail: "ACID transactions and relational data" },
      { name: "Convex", detail: "Real-time reactive vector databases" },
      { name: "Docker", detail: "Hermetic containerized deployments" },
      { name: "Linux / Unix", detail: "Shell scripting, POSIX systems" },
    ],
  },
  {
    title: "AI, Testing & Delivery",
    description:
      "Verification, deployment pipelines, and grounded intelligent systems.",
    items: [
      { name: "Gemini API", detail: "Multimodal and grounded reasoning" },
      { name: "RAG & Vector Search", detail: "Semantic document retrieval" },
      { name: "GitHub Actions", detail: "Automated continuous delivery" },
      { name: "Pytest", detail: "Deterministic test harness execution" },
    ],
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "designing-bytecode-vm",
    slug: "designing-a-bytecode-virtual-machine-in-rust",
    title:
      "Correctness Before Cleverness: Designing a Bytecode Virtual Machine in Rust",
    subtitle:
      "How building the Guppty programming language shaped my perspective on memory safety, stack evaluation, and predictable runtimes.",
    category: "Systems & Compilers",
    publishDate: "March 2026",
    readTime: "7 min read",
    summary:
      "Why tree-walking AST interpreters hit a hard performance ceiling, and how designing an explicit stack bytecode VM in Rust enforces memory safety without garbage collection cycles.",
    keyTakeaways: [
      "Tree-walking interpreters suffer from cache misses and call-stack overflow on deep ASTs.",
      "A linear bytecode array maximizes CPU cache locality and predictable instruction pointer stepping.",
      "Handling closures in Rust requires careful representation of upvalues to avoid cyclic references.",
      "Span-aware diagnostics are not cosmetic—they are a primary interface contract with developers.",
    ],
    sections: [
      {
        heading: "1. The Trap of the Tree-Walking Interpreter",
        paragraphs: [
          "When you first build an interpreter, recursive tree-walking feels natural. You parse source code into an Abstract Syntax Tree (AST), write an `eval()` function, and match on each node: expressions evaluate their children, statements evaluate recursively, and results bubble up.",
          "This approach works cleanly for toy calculators. But the moment you introduce loops, functions with deep recursion, or heavy expressions, the drawbacks hit immediately: every tree hop triggers heap indirection, cache lines are constantly invalidated, and deep execution paths exhaust the host thread's call stack.",
          "To build Guppty into a real programming language, I abandoned the tree-walker and transitioned to a two-phase architecture: an AST compiler that emits a flat vector of bytecode instructions, and an iterative stack virtual machine that executes them with predictable memory bounds.",
        ],
      },
      {
        heading: "2. The Instruction Set & Stack Architecture",
        paragraphs: [
          "A stack-based VM is conceptually simple: operands are pushed onto an evaluation stack, and opcodes pop their arguments, perform an operation, and push the result back. Because instructions are laid out sequentially in contiguous memory (`Chunk.code: Vec<u8>`), the CPU instruction prefetcher operates with near-zero branch mispredictions.",
        ],
        codeBlock: {
          language: "rust",
          title: "compiler/vm.rs",
          code: `#[derive(Debug, Clone, Copy)]
pub enum OpCode {
    PushConstant(u16),
    BinaryAdd,
    BinarySubtract,
    BinaryMultiply,
    BinaryDivide,
    JumpIfFalse(u16),
    Jump(u16),
    Call(u8),
    Return,
}

impl VirtualMachine {
    #[inline(always)]
    pub fn step(&mut self) -> Result<InterpretResult, RuntimeError> {
        let opcode = self.read_byte();
        match opcode {
            OpCode::BinaryAdd => {
                let right = self.pop_stack()?;
                let left = self.pop_stack()?;
                self.push_stack(left + right)?;
            }
            OpCode::JumpIfFalse(offset) => {
                if self.peek_stack()?.is_falsy() {
                    self.ip += offset as usize;
                }
            }
            // ...
        }
        Ok(InterpretResult::Continue)
    }
}`,
        },
      },
      {
        heading: "3. First-Class Closures in Pure Rust",
        paragraphs: [
          "In languages like Python or JavaScript, closures are taken for granted. In Rust, however, closures represent a notorious challenge: how do you capture variables from an outer enclosing scope that might outlive the stack frame, without incurring garbage collector pauses or violating Rust's strict ownership rules?",
          "Guppty solves this using an 'Upvalue' abstraction. When a local variable is captured by an inner closure while still on the active stack, it is represented as an Open Upvalue pointing directly to the stack index. When the enclosing stack frame pops, the VM 'closes' the upvalue by copying the value into heap-allocated storage wrapped in a reference-counted cell.",
          "This guarantees zero allocation overhead for variables that never escape their local frame, while providing safe memory sharing for those that do.",
        ],
        callout:
          "Key Architectural Insight: Premature optimization in compiler design usually leads to fragile code. Structuring the VM with explicit invariants made adding features like closures and try/catch dramatically simpler.",
      },
      {
        heading: "4. Span-Aware Diagnostics: Error Messages Are UI",
        paragraphs: [
          "Nothing is more frustrating to a programmer than receiving a cryptic `Error: ParseException at line 42`. In Guppty, every token and AST node carries a `Span` struct containing byte offsets, line numbers, and column positions.",
          "When an error occurs during parsing or type checking, the compiler renders a terminal preview with underline carets and remediation tips. Good engineering is not just what happens when everything succeeds—it is how gracefully a system guides the user when something goes wrong.",
        ],
      },
    ],
  },
  {
    id: "production-rag-without-hallucinations",
    slug: "production-rag-without-hallucinations",
    title:
      "Production RAG Without Hallucinations: Grounding LLMs in Dense Legal Documents",
    subtitle:
      "Architectural patterns from building AI document intelligence systems for complex mortgages and commercial leases.",
    category: "AI & Retrieval",
    publishDate: "February 2026",
    readTime: "6 min read",
    summary:
      "Naive cosine similarity over raw text chunks breaks down on legal contracts. Here is how hybrid retrieval, hierarchical chunking, and strict prompt grounding eliminated hallucinations.",
    keyTakeaways: [
      "Naive fixed-token chunking destroys legal definitions and cross-referenced covenants.",
      "Hybrid search combining BM25 keyword matching with dense embeddings outperforms purely semantic search on technical terms.",
      "Prompt grounding contracts must strictly forbid extrapolation and enforce paragraph-level citations.",
      "Automated evaluation suites are non-negotiable for measuring hallucination rates over time.",
    ],
    sections: [
      {
        heading: "1. Why Naive RAG Fails in Production",
        paragraphs: [
          "When companies prototype Retrieval-Augmented Generation (RAG), the standard recipe is seductive: read a PDF, split it into 500-token chunks with 50-token overlap, compute embeddings with OpenAI or Cohere, store them in a vector DB, and feed the top 3 results into an LLM.",
          "In real-world domains like mortgage contracts or lease disclosures, this naive approach fails catastrophically. A clause defining interest rate adjustments might rely on a definition located 14 pages earlier. If a chunk only contains the calculation without the qualifier, the LLM hallucinates an authoritative yet completely erroneous answer.",
        ],
      },
      {
        heading: "2. Hierarchical Chunking & Structure Preservation",
        paragraphs: [
          "Instead of slicing documents arbitrarily by character or token count, we built a structure-aware ingestion pipeline. Documents are parsed into a document hierarchy: Sections, Clauses, Subclauses, and Tables.",
          "Parent sections carry metadata context down to leaf chunks. When a specific paragraph is retrieved, the model receives both the precise text and its enclosing section breadcrumb (e.g., 'Article IV > Section 4.2: Prepayment Penalties').",
        ],
        codeBlock: {
          language: "python",
          title: "pipeline/chunker.py",
          code: `def build_hierarchical_chunks(document_ast: DocTree) -> list[DocumentChunk]:
    chunks = []
    for section in document_ast.sections:
        context_header = f"[{section.title}]"
        for paragraph in section.paragraphs:
            chunks.append(DocumentChunk(
                content=f"{context_header}\\n{paragraph.text}",
                metadata={
                    "section_id": section.id,
                    "page_number": paragraph.page,
                    "clause": paragraph.clause_number,
                }
            ))
    return chunks`,
        },
      },
      {
        heading: "3. Grounding Contracts & Citation Verification",
        paragraphs: [
          "To completely eliminate hallucinations, we enforced a strict output schema with Gemini. The model is instructed through system contracts that every claim must be followed by an exact bracketed citation `[Page X, Section Y]`. If the retrieved documents do not contain the answer, the model is required to reply: 'The provided documents do not contain sufficient evidence to answer this question.'",
          "A downstream regex and citation validator verifies that every cited page and clause exists in the retrieved context set. Any ungrounded assertion is flagged and rejected before reaching the user.",
        ],
      },
    ],
  },
  {
    id: "deterministic-benchmarking-ai-research",
    slug: "deterministic-benchmarking-ai-research",
    title:
      "Deterministic Benchmarking: Building Python Test Harnesses for AI Research",
    subtitle:
      "Eliminating non-determinism in empirical computer science experiments at Cal Poly CSSE.",
    category: "Research & Tooling",
    publishDate: "January 2026",
    readTime: "5 min read",
    summary:
      "If an experiment can't be reproduced with bit-for-bit fidelity, its conclusions are fragile. How we engineered automated Python runners and live desktop telemetry for AI researchers.",
    keyTakeaways: [
      "Subtle variance in GPU nondeterminism and seed management corrupts statistical comparisons.",
      "Worker process isolation prevents memory leaks from accumulating across multi-hour experimental trials.",
      "Live telemetry should be lightweight and decoupled from the compute loop via lock-free ring buffers.",
      "Continuous integration should enforce regression tests on experiment harnesses, not just production web apps.",
    ],
    sections: [
      {
        heading: "1. The Reproducibility Challenge in Academic Software",
        paragraphs: [
          "In academic machine learning and software engineering research, experiments often take dozens of hours to run across multiple test beds. A common pitfall is that researcher A runs a trial on their laptop, researcher B runs it on a university cluster, and the results diverge by 4%—enough to overturn a research hypothesis.",
          "At Cal Poly CSSE, our goal was to eliminate this friction by creating an automated experiment runner that standardizes the entire lifecycle: environment locking, seed pinning, telemetry streaming, and automated artifact generation.",
        ],
      },
      {
        heading: "2. Architecting the Isolated Subprocess Runner",
        paragraphs: [
          "Running dozens of consecutive trials in a single Python process leads to creeping memory growth, uncollected CUDA tensors, and cross-trial contamination. We designed the runner around ephemeral subprocess workers.",
          "Each trial spawns in an isolated process with explicit environment variables, dedicated output directories, and locked pseudo-random seeds. If a trial encounters an out-of-memory error or hardware glitch, the orchestrator logs the crash, snapshots the environment state, and recovers without terminating the broader experiment batch.",
        ],
      },
    ],
  },
  {
    id: "philosophy-of-quiet-engineering",
    slug: "philosophy-of-quiet-engineering",
    title:
      "The Philosophy of Quiet Engineering: Why Dependable Software Feels Invisible",
    subtitle:
      "Moving past hype and superficial aesthetics toward systems that do the hard work quietly and flawlessly.",
    category: "Architecture & Craft",
    publishDate: "November 2025",
    readTime: "4 min read",
    summary:
      "The best engineering is not loud. It doesn't rely on flashy animations or buzzwords. It shows up as instantaneous page loads, zero data loss, and error boundaries that catch failures before users ever notice.",
    keyTakeaways: [
      "Aesthetics are not a substitute for architectural rigor.",
      "Reliability is a feature that users feel even when they cannot name it.",
      "Great tools respect user attention by removing friction and visual noise.",
      "Simplicity in system design requires more discipline than complexity.",
    ],
    sections: [
      {
        heading: "1. The Seduction of Superficial Polish",
        paragraphs: [
          "The modern software ecosystem is saturated with tools that look dazzling on landing pages but collapse under genuine load. Flashing badges, jarring scroll velocity text, and dizzying animations often disguise brittle architectures, missing unit tests, and broken error states.",
          "When you look at timeless software—like Unix utilities, SQLite, or Apple's core operating system primitives—there is a common thread: quiet confidence. The engineering does not beg for attention; it simply executes with absolute precision.",
        ],
      },
      {
        heading: "2. The Three Tenets of Quiet Engineering",
        paragraphs: [
          "Over my internships at Cal Poly Bailey College, research at CSSE, and systems projects like Guppty, I've anchored my work around three core tenets:",
          "1. Correctness Before Cleverness: A clever hack that saves ten lines of code today will cause three midnight outages six months from now. Make data flow explicit, validate inputs at system boundaries, and write tests for edge cases.",
          "2. Build for the Real Workload: Software operates in an imperfect world. Network packets drop, users upload corrupt 500MB files, and API endpoints timeout. A dependable system anticipates failure as a first-class state.",
          "3. Make Complexity Feel Simple: The hardest problems in engineering are conceptual. If you cannot explain the architecture of your system simply, you do not understand it well enough. Strip away the non-essential until only what matters remains.",
        ],
      },
    ],
  },
]

export const PRINCIPLES = [
  {
    number: "01",
    title: "Correctness before cleverness",
    description:
      "Explicit systems, strong type invariants, and comprehensive test suites make software dependable long after the first release. Never sacrifice readability or safety for an obscure shortcut.",
  },
  {
    number: "02",
    title: "Build for the real workload",
    description:
      "Software operates in an imperfect world. Good systems account for network failure modes, malformed inputs, and concurrency bottlenecks instead of optimizing only the happy path.",
  },
  {
    number: "03",
    title: "Make complexity feel simple",
    description:
      "Great engineering disappears into a product that is instantaneous, clear, and quiet. When the architecture is solid, the interface feels effortless.",
  },
]
