import { useState, useEffect } from "react"
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
  const [activePost, setActivePost] = useState<BlogPost | null>(null)

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
    <section
      id="blog"
      className="scroll-mt-24 py-20 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Centered Heading */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[38px] font-medium text-[#111827] tracking-tight leading-tight mb-3">
          Engineering Notes &amp; Writing
        </h2>
        <p className="text-[#4b5563] text-sm sm:text-base">
          In-depth technical writing on compilers, retrieval architectures, and
          dependable software.
        </p>
      </div>

      {/* 2x2 Clean White Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            onClick={() => handleOpenPost(post)}
            className="rounded-3xl bg-white border border-[#e5e7eb] p-6 sm:p-8 cursor-pointer hover:border-[#111827]/40 hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#6b7280] mb-4 font-mono">
                <span className="font-semibold text-[#111827] uppercase tracking-wider">
                  {post.category}
                </span>

                <div className="text-[11px] text-[#6b7280]">
                  <span>{post.publishDate}</span>
                  <span> · </span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#111827] tracking-tight group-hover:text-black transition mb-3">
                {post.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed line-clamp-3 font-normal">
                {post.summary}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-semibold text-[#111827] group-hover:underline transition">
              <span>Read Full Article</span>
              <span className="text-sm font-mono text-[#6b7280] group-hover:text-black group-hover:translate-x-1 transition-transform">
                →
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
