import { useEffect, useState } from "react"
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Check,
  ArrowRight,
  X,
} from "lucide-react"
import { BLOG_POSTS, type BlogPost } from "@/data/portfolioData"

interface BlogReaderModalProps {
  post: BlogPost | null
  onClose: () => void
  onSelectPost: (post: BlogPost) => void
}

export default function BlogReaderModal({
  post,
  onClose,
  onSelectPost,
}: BlogReaderModalProps) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (!post) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [post, onClose])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100
    setScrollProgress(progress)
  }

  if (!post) return null

  const currentIndex = BLOG_POSTS.findIndex((p) => p.id === post.id)
  const nextPost =
    currentIndex < BLOG_POSTS.length - 1
      ? BLOG_POSTS[currentIndex + 1]
      : BLOG_POSTS[0]

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.origin + "#blog/" + post.slug)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <div
          className="h-full bg-blue-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div
        onScroll={handleScroll}
        className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-4xl bg-neutral-950 sm:border sm:border-white/15 sm:rounded-3xl overflow-y-auto shadow-2xl flex flex-col"
      >
        {/* Apple Reader Top Bar */}
        <div className="sticky top-0 z-40 px-6 py-4 bg-neutral-950/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Articles</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white/10 border border-white/10 text-xs text-neutral-300 transition focus:outline-none"
              title="Copy link to article"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition focus:outline-none"
              aria-label="Close Reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Content Body */}
        <article className="p-6 sm:p-12 md:p-16 max-w-3xl mx-auto w-full">
          {/* Article Header */}
          <div className="mb-10 text-left border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                {post.category}
              </span>
              <span className="text-neutral-600">·</span>
              <div className="flex items-center gap-1 text-xs text-neutral-400">
                <Calendar className="w-3 h-3 text-neutral-500" />
                <span>{post.publishDate}</span>
              </div>
              <span className="text-neutral-600">·</span>
              <div className="flex items-center gap-1 text-xs text-neutral-400">
                <Clock className="w-3 h-3 text-neutral-500" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-4">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-neutral-400 font-normal leading-relaxed">
              {post.subtitle}
            </p>

            {/* Author Attribution */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/5">
              <div className="w-10 h-10 rounded-full border border-white/15 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center text-xs font-bold text-white shadow-inner shrink-0 tracking-wider">
                AC
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">
                  Adrian Cardona
                </div>
                <div className="text-xs text-neutral-400">
                  Undergraduate Researcher · Cal Poly SLO
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaways Callout Box */}
          <div className="rounded-2xl p-5 sm:p-6 bg-blue-950/20 border border-blue-500/20 mb-10 text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">
              Key Engineering Insights
            </div>
            <ul className="space-y-2">
              {post.keyTakeaways.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Structured Sections */}
          <div className="space-y-10 text-left">
            {post.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {section.heading}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-neutral-300 text-base sm:text-lg leading-relaxed font-normal"
                  >
                    {p}
                  </p>
                ))}

                {section.codeBlock && (
                  <div className="my-6 rounded-2xl bg-black border border-white/10 overflow-hidden">
                    <div className="px-4 py-2 bg-neutral-900/80 border-b border-white/10 text-xs font-mono text-neutral-400 flex items-center justify-between">
                      <span>{section.codeBlock.title}</span>
                      <span className="uppercase text-[10px] text-neutral-500 font-medium">
                        {section.codeBlock.language}
                      </span>
                    </div>
                    <pre className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-neutral-300">
                      <code>{section.codeBlock.code}</code>
                    </pre>
                  </div>
                )}

                {section.callout && (
                  <blockquote className="my-6 pl-4 border-l-2 border-blue-400 text-neutral-300 italic text-base sm:text-lg bg-white/[0.02] p-4 rounded-r-xl">
                    {section.callout}
                  </blockquote>
                )}
              </section>
            ))}
          </div>

          {/* Reader Footer - Next Article Card */}
          <div className="mt-16 pt-10 border-t border-white/10 text-left">
            <div className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-3">
              Read Next
            </div>
            <button
              onClick={() => onSelectPost(nextPost)}
              className="w-full text-left p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all flex items-center justify-between group focus:outline-none"
            >
              <div>
                <div className="text-xs text-blue-400 font-medium mb-1">
                  {nextPost.category}
                </div>
                <div className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition">
                  {nextPost.title}
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  {nextPost.readTime}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition shrink-0 ml-4" />
            </button>
          </div>
        </article>
      </div>
    </div>
  )
}
