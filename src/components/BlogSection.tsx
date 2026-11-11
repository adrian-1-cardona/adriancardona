import { useState, useEffect } from "react"
import { ArrowRight, BookOpen, Calendar, Clock, Sparkles } from "lucide-react"
import { BLOG_POSTS, type BlogPost } from "@/data/portfolioData"
import BlogReaderModal from "@/components/BlogReaderModal"

interface BlogSectionProps {
  selectedPostSlug?: string | null
  onPostOpened?: (slug: string | null) => void
}

export default function BlogSection({
  selectedPostSlug,
  onPostOpened,
}: BlogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [activePost, setActivePost] = useState<BlogPost | null>(null)

  const categories = [
    "All",
    "Systems & Compilers",
    "AI & Retrieval",
    "Research & Tooling",
    "Architecture & Craft",
  ]

  const filteredPosts =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory)

  // Sync external slug from URL if provided
  useEffect(() => {
    if (selectedPostSlug) {
      const match = BLOG_POSTS.find((p) => p.slug === selectedPostSlug)
      if (match) setActivePost(match)
    }
  }, [selectedPostSlug])

  const handleOpenPost = (post: BlogPost) => {
    setActivePost(post)
    if (onPostOpened) onPostOpened(post.slug)
    window.history.pushState(null, "", `#blog/${post.slug}`)
  }

  const handleClosePost = () => {
    setActivePost(null)
    if (onPostOpened) onPostOpened(null)
    window.history.pushState(null, "", "#blog")
  }

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="apple-eyebrow mb-2">Engineering Journal</div>
        <h2 className="apple-headline apple-gradient-text text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          Thoughtful systems, written down.
        </h2>
        <p className="text-neutral-400 text-base sm:text-lg">
          Technical deep dives into compiler architectures in Rust, grounding
          RAG pipelines against hallucinations, and the discipline of dependable
          engineering.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus:outline-none ${
                activeCategory === cat
                  ? "bg-white text-black shadow-md font-semibold"
                  : "bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white border border-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => handleOpenPost(post)}
            className="apple-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer group relative overflow-hidden transition-all duration-300"
          >
            {/* Top subtle highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div>
              {/* Category & Metadata */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  {post.category}
                </span>

                <div className="flex items-center gap-3 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.publishDate}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-blue-300 transition-colors leading-snug">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6 font-normal line-clamp-3">
                {post.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 group-hover:text-white transition flex items-center gap-1.5">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>

              <span className="text-[11px] text-neutral-500">
                {post.sections.length} sections
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {activePost && (
        <BlogReaderModal
          post={activePost}
          onClose={handleClosePost}
          onSelectPost={(post) => handleOpenPost(post)}
        />
      )}
    </section>
  )
}
