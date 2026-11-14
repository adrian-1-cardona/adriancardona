import { useEffect, useState } from "react"
import {
  Clock,
  Calendar,
  Share2,
  Check,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div
        onScroll={handleScroll}
        className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-3xl bg-white border border-slate-200 sm:rounded-2xl overflow-y-auto shadow-2xl flex flex-col"
      >
        {/* Reader Top Bar */}
        <div className="sticky top-0 z-40 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-black transition focus:outline-none cursor-pointer"
          >
            All Articles
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 transition focus:outline-none font-medium"
              title="Copy link to article"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
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
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition focus:outline-none"
              aria-label="Close Reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Content Body */}
        <article className="p-6 sm:p-10 md:p-12 max-w-2xl mx-auto w-full">
          {/* Article Header */}
          <div className="mb-8 text-left border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3 mb-3 text-xs text-slate-500 font-medium">
              <span className="text-blue-600 font-semibold uppercase tracking-wider">
                {post.category}
              </span>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{post.publishDate}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-normal font-display text-slate-900 tracking-tight leading-snug mb-3">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {post.subtitle}
            </p>

            {/* Author Attribution (Clean text, no photo) */}
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
              <div className="text-left text-xs">
                <div className="font-semibold text-slate-900">
                  Adrian Cardona
                </div>
                <div className="text-slate-500">
                  Undergraduate Researcher · Cal Poly SLO
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights Box */}
          <div className="rounded-xl p-5 bg-blue-50/60 border border-blue-100 mb-8 text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2.5">
              Key Engineering Insights
            </div>
            <ul className="space-y-2">
              {post.keyTakeaways.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                >
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Structured Sections */}
          <div className="space-y-8 text-left">
            {post.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {section.heading}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal"
                  >
                    {p}
                  </p>
                ))}

                {section.codeBlock && (
                  <div className="my-4 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
                    <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                      <span>{section.codeBlock.title}</span>
                      <span className="uppercase text-[10px] text-slate-500 font-medium">
                        {section.codeBlock.language}
                      </span>
                    </div>
                    <pre className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-slate-200">
                      <code>{section.codeBlock.code}</code>
                    </pre>
                  </div>
                )}

                {section.callout && (
                  <blockquote className="my-4 pl-4 border-l-2 border-blue-600 text-slate-700 text-sm sm:text-base bg-blue-50/40 p-3 rounded-r-lg">
                    {section.callout}
                  </blockquote>
                )}
              </section>
            ))}
          </div>

          {/* Next Article Card */}
          <div className="mt-12 pt-8 border-t border-slate-100 text-left">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Read Next
            </div>
            <button
              onClick={() => onSelectPost(nextPost)}
              className="w-full text-left p-5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition flex items-center justify-between group focus:outline-none"
            >
              <div>
                <div className="text-xs text-blue-600 font-medium mb-1">
                  {nextPost.category}
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                  {nextPost.title}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {nextPost.readTime}
                </div>
              </div>
              <span className="text-xs font-mono font-semibold text-neutral-500 group-hover:text-black transition shrink-0 ml-4">
                Read
              </span>
            </button>
          </div>
        </article>
      </div>
    </div>
  )
}
