import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Clock, Eye, Heart, ArrowRight, TrendingUp, BookOpen, Code2, Briefcase } from "lucide-react";
import { BLOG_POSTS } from "@/constants";
import { formatDate, cn } from "@/lib/utils";

const categories = ["All", "Career", "Certification", "Technology", "Programming", "Hardware"];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = BLOG_POSTS.filter((post) => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || post.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="label-badge mb-4 inline-flex bg-primary-900/40 border-primary-700 text-primary-400">
            <BookOpen className="w-4 h-4" />
            <span>CompuPoint Blog</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            IT Insights &
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent"> Tech Knowledge</span>
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Expert articles, tutorials, certification guides, and career advice from IT professionals.
          </p>
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-base"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200",
                activeCategory === cat
                  ? "bg-primary-600 border-primary-600 text-white"
                  : "bg-background border-border text-slate-600 dark:text-slate-300 hover:border-primary-300"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">No articles found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Try a different search term or category.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {activeCategory === "All" && !search && (
              <div className="mb-10">
                <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">Featured Article</h2>
                <div className="card-base overflow-hidden hover:-translate-y-0.5 cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-0">
                    <img src={filtered[0].image} alt={filtered[0].title} className="w-full h-64 md:h-full object-cover" />
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="tag">{filtered[0].category}</span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />{filtered[0].readTime} min read
                        </span>
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                        {filtered[0].title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                        {filtered[0].excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={filtered[0].authorAvatar} alt={filtered[0].author} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <p className="text-xs font-semibold text-slate-900 dark:text-white">{filtered[0].author}</p>
                            <p className="text-[10px] text-slate-500">{formatDate(filtered[0].publishedAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{filtered[0].views.toLocaleString()}</span>
                          <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{filtered[0].likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Posts Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeCategory === "All" && !search ? filtered.slice(1) : filtered).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function BlogCard({ post }: { post: typeof BLOG_POSTS[0] }) {
  return (
    <div className="card-base overflow-hidden hover:-translate-y-1 cursor-pointer group">
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-white/90 dark:bg-slate-900/90 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} min</span>
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
          <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{post.likes}</span>
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{post.author}</span>
          </div>
          <span className="text-[10px] text-slate-400">{formatDate(post.publishedAt)}</span>
        </div>
      </div>
    </div>
  );
}
