import { useState, useEffect } from "react"
import { ArrowRight, Calendar, Clock } from "lucide-react"
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
    <section id="blog" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Centered Heading */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#37383c] tracking-tight mb-3">
          Engineering Notes &amp; Writing
        </h2>
        <p className="text-[#686a71] text-base sm:text-lg">
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
            className="rounded-3xl bg-white border border-[#e5e7eb] p-6 sm:p-8 cursor-pointer hover:border-[#cbd5e1] hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#9ca3af] mb-3 font-mono">
                <span className="font-semibold text-[#4e95ff] uppercase tracking-wider">
                  {post.category}
                </span>

                <div className="flex items-center gap-2">
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

              <h3 className="text-lg sm:text-xl font-bold text-[#37383c] tracking-tight group-hover:text-[#4e95ff] transition mb-2">
                {post.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#686a71] leading-relaxed line-clamp-3 font-normal">
                {post.summary}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-semibold text-[#37383c] group-hover:text-[#4e95ff] transition">
              <span>Read Full Article</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
