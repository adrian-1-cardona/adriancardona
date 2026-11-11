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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/90">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#2a2725] z-50">
        <div
          className="h-full bg-[#f46c38] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div
        onScroll={handleScroll}
        className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-3xl bg-[#1c1a19] border border-[#2e2b29] sm:rounded-2xl overflow-y-auto shadow-2xl flex flex-col"
      >
        {/* Reader Top Bar */}
        <div className="sticky top-0 z-40 px-6 py-4 bg-[#1c1a19] border-b border-[#2e2b29] flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#998f8f] hover:text-white transition focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Articles</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#242220] hover:bg-[#2c2927] border border-[#35312e] text-xs text-[#998f8f] hover:text-white transition focus:outline-none"
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
              className="p-1 rounded text-[#998f8f] hover:text-white transition focus:outline-none"
              aria-label="Close Reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Content Body */}
        <article className="p-6 sm:p-10 md:p-12 max-w-2xl mx-auto w-full">
          {/* Article Header */}
          <div className="mb-8 text-left border-b border-[#2e2b29] pb-6">
            <div className="flex items-center gap-3 mb-3 text-xs text-[#998f8f]">
              <span className="font-semibold uppercase tracking-wider text-[#f46c38]">
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

            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug mb-3">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-[#998f8f] font-normal leading-relaxed">
              {post.subtitle}
            </p>

            {/* Author Attribution (Monogram, NO photo) */}
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#2e2b29]">
              <div className="w-8 h-8 rounded-lg bg-[#262321] border border-[#35312e] flex items-center justify-center text-xs font-bold text-white tracking-wider">
                AC
              </div>
              <div className="text-left text-xs">
                <div className="font-semibold text-white">Adrian Cardona</div>
                <div className="text-[#998f8f]">
                  Undergraduate Researcher · Cal Poly SLO
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights Box */}
          <div className="rounded-xl p-5 bg-[#242220] border border-[#35312e] mb-8 text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-[#f46c38] mb-2.5">
              Key Engineering Insights
            </div>
            <ul className="space-y-2">
              {post.keyTakeaways.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#998f8f]"
                >
                  <span className="text-[#f46c38] font-bold shrink-0">•</span>
                  <span className="leading-relaxed text-neutral-200">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Structured Sections */}
          <div className="space-y-8 text-left">
            {post.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {section.heading}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-[#998f8f] text-sm sm:text-base leading-relaxed font-normal"
                  >
                    {p}
                  </p>
                ))}

                {section.codeBlock && (
                  <div className="my-4 rounded-xl bg-[#151312] border border-[#2e2b29] overflow-hidden">
                    <div className="px-4 py-2 bg-[#201e1d] border-b border-[#2e2b29] text-xs font-mono text-[#998f8f] flex items-center justify-between">
                      <span>{section.codeBlock.title}</span>
                      <span className="uppercase text-[10px] text-[#6a6b6e] font-medium">
                        {section.codeBlock.language}
                      </span>
                    </div>
                    <pre className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-neutral-300">
                      <code>{section.codeBlock.code}</code>
                    </pre>
                  </div>
                )}

                {section.callout && (
                  <blockquote className="my-4 pl-4 border-l-2 border-[#f46c38] text-neutral-300 text-sm sm:text-base bg-[#201e1d] p-3 rounded-r-lg">
                    {section.callout}
                  </blockquote>
                )}
              </section>
            ))}
          </div>

          {/* Next Article Card */}
          <div className="mt-12 pt-8 border-t border-[#2e2b29] text-left">
            <div className="text-xs uppercase tracking-wider text-[#6a6b6e] font-semibold mb-2">
              Read Next
            </div>
            <button
              onClick={() => onSelectPost(nextPost)}
              className="w-full text-left p-5 rounded-xl bg-[#201e1d] hover:bg-[#252221] border border-[#2e2b29] transition flex items-center justify-between group focus:outline-none"
            >
              <div>
                <div className="text-xs text-[#f46c38] font-medium mb-1">
                  {nextPost.category}
                </div>
                <div className="text-base sm:text-lg font-bold text-white group-hover:text-neutral-200 transition">
                  {nextPost.title}
                </div>
                <div className="text-xs text-[#998f8f] mt-1">
                  {nextPost.readTime}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#998f8f] group-hover:text-white group-hover:translate-x-1 transition shrink-0 ml-4" />
            </button>
          </div>
        </article>
      </div>
    </div>
  )
}
