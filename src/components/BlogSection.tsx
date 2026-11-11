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
    <section id="blog" className="pt-4">
      <h2 className="section-heading">
        ENGINEERING <span>BLOG</span>
      </h2>

      <div className="space-y-4">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            onClick={() => handleOpenPost(post)}
            className="solid-card p-6 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#6a6b6e] mb-2 font-mono">
                <span className="text-[#f46c38] font-bold uppercase tracking-wider">
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

              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#f46c38] transition mb-2">
                {post.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#998f8f] leading-relaxed line-clamp-2">
                {post.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#2a2725] flex items-center justify-between text-xs font-semibold text-[#998f8f] group-hover:text-white transition">
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
