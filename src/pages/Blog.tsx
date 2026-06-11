import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search, Clock, Eye, Heart, ArrowRight, TrendingUp, BookOpen,
  Code2, Briefcase, ChevronLeft, Send, Share2, Award, Sparkles, MessageSquare
} from "lucide-react";
import { BLOG_POSTS } from "@/constants";
import { formatDate, cn } from "@/lib/utils";
import { toast } from "sonner";

const categories = ["All", "Career", "Certification", "Technology", "Programming", "Hardware"];

// Structured content for each blog post
const blogContentMap: Record<string, string[]> = {
  "1": [
    "As we progress into 2026, the global technology landscape continues to evolve at a blistering pace. Industry demands are shifting from generic programming capabilities toward specialized, AI-collaborative engineering and multi-cloud solutions. For tech professionals and newcomers alike, staying ahead of these trends is the key to maintaining a competitive edge.",
    "1. Artificial Intelligence & Prompt Engineering: Generative AI is no longer a novelty; it is a core productivity driver. Organizations are seeking professionals who know how to build, fine-tune, and integrate AI models into existing software architectures.",
    "2. Cloud Infrastructure Architecture: With enterprises adopting hybrid and multi-cloud strategies, expertise in Google Cloud, AWS, and Azure remains highly sought after. Automation of deployments via Terraform and Kubernetes is now a baseline requirement.",
    "3. Full-Stack Web Development: The demand for modern web architectures (React, Next.js, and Node.js) shows no signs of slowing. Front-end performance optimization and real-time data sync are crucial skills.",
    "4. Cybersecurity Audits: Data privacy regulations and sophisticated threat vectors mean that cybersecurity is now every developer's responsibility. Understanding threat models, network security, and secure coding practices is vital.",
    "In conclusion, continuous learning is the only constant in tech. By leveraging proctored IT Academies and industry-recognized certifications, professionals can future-proof their careers and secure highly lucrative roles."
  ],
  "2": [
    "Earning your CompTIA A+ certification is widely regarded as the gateway into the IT support and helpdesk industry. However, preparing for the dual core exams can feel overwhelming without a structured strategy. This guide breaks down a proven 30-day timeline to pass on your first attempt.",
    "Days 1-10: Mastering Hardware Fundamentals. Focus heavily on mobile devices, networking hardware, cabling, and basic virtualization concepts. Spend at least 2 hours daily reading course materials and taking module-based practice quizzes.",
    "Days 11-20: Operating Systems & Software. Transition your study to Windows, macOS, Linux, and Android operating systems. Learn troubleshooting workflows, command-line tools, security configurations, and operational procedures.",
    "Days 21-30: Simulated Testing and Weakness Assessment. The final stretch should consist exclusively of timed practice exams. Identify your lowest-scoring domains, revisit core training lectures for those specific concepts, and memorize common network port numbers.",
    "Remember to leverage online test libraries and mock diagnostic environments. Confidence and familiarity with the exam format are just as important as technical knowledge."
  ],
  "3": [
    "Artificial Intelligence is fundamentally rewriting the rules of computer education. Traditional rote learning is being replaced by dynamic, adaptive ecosystems that personalize instruction to every student's unique learning curve.",
    "Instant Doubt Resolution: The days of waiting for the next class to ask a question are over. AI assistants analyze coding errors, provide line-by-line debugging guidance, and explain complex computational theories in real-time, 24/7.",
    "Predictive Skill Gap Analysis: By monitoring course progress and quiz scores, machine learning models can identify exact areas where a student is struggling (e.g., JavaScript closures or SQL joins) and dynamically serve supplementary exercises.",
    "Custom Career Guidance: AI tools align student profiles with active job portal requirements, telling them exactly which certification or project they need next to secure a specific role.",
    "As educational platforms continue to evolve, the integration of AI will bridge the gap between classroom theory and real-world workplace competence."
  ],
  "4": [
    "Whether you are running a high-end gaming rig or a corporate workstation, proactive computer maintenance is essential to prevent hardware failures and keep your operating system running at peak performance.",
    "1. Physical Dusting: Dust build-up acts as an insulator, trapping heat and forcing fans to run at maximum speeds. Clean your desktop case or laptop vents with compressed air every 6 months to avoid thermal throttling.",
    "2. OS Optimization: Defragment mechanical drives, clean up temporary registry directories, and disable unnecessary startup programs. Keeping your system files streamlined reduces boot times and boosts responsiveness.",
    "3. Storage Health Tracking: Regularly monitor SSD health metrics using diagnostic utilities. Back up vital data to cloud storage before drives show warning signs of failure.",
    "4. Upgrading RAM and SSDs: Often, a system that feels slow doesn't need replacing. Upgrading from 8GB to 16GB of RAM or installing a solid-state boot drive can breathe new life into older setups."
  ],
  "5": [
    "For aspiring developers, the choice between Python and JavaScript is one of the most common dilemmas. Both languages dominate the modern tech stack, but they serve vastly different primary purposes.",
    "Python is the undisputed king of Data Science, Machine Learning, and backend scripting. Its clean, English-like syntax has a minimal learning curve, making it the perfect first language for beginners focused on data and algorithms.",
    "JavaScript is the language of the web. If you are passionate about building interactive user interfaces, animations, and web applications, JavaScript is non-negotiable. With Node.js, it is also highly prominent in server-side development.",
    "Salary & Opportunities: Both offer fantastic salary potential. JavaScript has a higher volume of front-end and full-stack job listings, while Python commands high rates in specialized AI and analysis fields.",
    "Our recommendation: Start with Python if you are interested in data or backend logic. Choose JavaScript if you want to build websites and see visual results immediately."
  ],
  "6": [
    "Launching an IT career without a formal computer science degree is highly achievable in today's skill-first market. What matters most to hiring managers is your portfolio, hands-on capabilities, and recognized certifications.",
    "Step 1: Focus on Core Fundamentals. Master command-line utilities, basic networking, and version control (Git). These are the universal tools of the tech trade.",
    "Step 2: Build Real-World Projects. Create functional applications or set up simulated server environments. Document your development process and host your repositories publicly on GitHub.",
    "Step 3: Earn Industry Credentials. Target entry-level certifications like CompTIA A+, Cisco CCNA, or Tally Specialist to validate your knowledge to recruiters.",
    "Step 4: Network and Apply. Optimize your LinkedIn profile, participate in local developer meetups, and use tech job boards to apply for internships and junior positions."
  ]
};

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null);

  // Dynamic comments state
  const [comments, setComments] = useState<Record<string, { author: string; text: string; date: string }[]>>({
    "1": [
      { author: "Siddharth Sen", text: "Incredibly accurate. AI skills are definitely transforming the job market here in Mumbai.", date: "1 hour ago" },
      { author: "Komal Patil", text: "Great write-up! I am planning to enroll in the Full-Stack Web Development course next week.", date: "Yesterday" }
    ],
    "2": [
      { author: "Vivek Deshmukh", text: "This 30-day plan is exactly what I needed. CompTIA proctored exams are tough but doable.", date: "2 days ago" }
    ]
  });
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  const filtered = BLOG_POSTS.filter((post) => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || post.category === activeCategory;
    return matchSearch && matchCat;
  });

  const handleShare = (postTitle: string) => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(`Share link for "${postTitle}" copied to clipboard!`);
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentText.trim()) {
      toast.error("Please fill in your name and comment message.");
      return;
    }
    const newComment = {
      author: newCommentAuthor,
      text: newCommentText,
      date: "Just now"
    };
    setComments(prev => ({
      ...prev,
      [postId]: [newComment, ...(prev[postId] || [])]
    }));
    setNewCommentAuthor("");
    setNewCommentText("");
    toast.success("Comment posted successfully!");
  };

  if (selectedPost) {
    const paragraphs = blogContentMap[selectedPost.id] || [
      selectedPost.excerpt,
      "This is a placeholder for the full blog post text. CompuPoint delivers high-quality IT training and diagnostics.",
      "Enroll in our courses today to get hands-on experience and build professional capabilities."
    ];
    const postComments = comments[selectedPost.id] || [];
    const relatedPosts = BLOG_POSTS.filter(p => p.category === selectedPost.category && p.id !== selectedPost.id).slice(0, 3);

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16 animate-fade-in">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Blog
          </button>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (Article Content) */}
            <article className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-96 object-cover" />
              
              <div className="p-6 sm:p-8">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-xs">
                  <span className="tag">{selectedPost.category}</span>
                  <span className="flex items-center gap-1 text-slate-500"><Clock className="w-3.5 h-3.5" />{selectedPost.readTime} min read</span>
                  <span className="flex items-center gap-1 text-slate-500"><Eye className="w-3.5 h-3.5" />{selectedPost.views.toLocaleString()} views</span>
                  <span className="flex items-center gap-1 text-slate-500"><Heart className="w-3.5 h-3.5" />{selectedPost.likes} likes</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-950 dark:text-white leading-tight mb-6">
                  {selectedPost.title}
                </h1>

                {/* Author Card */}
                <div className="flex items-center justify-between py-4 border-y border-slate-100 dark:border-slate-800 mb-8">
                  <div className="flex items-center gap-3">
                    <img src={selectedPost.authorAvatar} alt={selectedPost.author} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedPost.author}</p>
                      <p className="text-xs text-slate-400">Published on {formatDate(selectedPost.publishedAt)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleShare(selectedPost.title)}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-slate-150 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 transition-colors"
                    title="Copy share link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Article Body */}
                <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6 text-sm sm:text-base leading-relaxed">
                  {paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Comments Section */}
                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Comments ({postComments.length})
                  </h3>

                  {/* Add Comment Form */}
                  <form onSubmit={(e) => handleAddComment(selectedPost.id, e)} className="space-y-4 mb-8">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={newCommentAuthor}
                          onChange={e => setNewCommentAuthor(e.target.value)}
                          placeholder="Your Name"
                          className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-400">Message *</label>
                      <textarea
                        rows={3}
                        required
                        value={newCommentText}
                        onChange={e => setNewCommentText(e.target.value)}
                        placeholder="Write your comment..."
                        className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm"
                      />
                    </div>
                    <button type="submit" className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5">
                      Post Comment <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {postComments.length === 0 ? (
                      <p className="text-xs text-slate-400 dark:text-slate-500 italic">No comments yet. Be the first to share your thoughts!</p>
                    ) : (
                      postComments.map((comment, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-150 dark:border-slate-850">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-slate-950 dark:text-white">{comment.author}</span>
                            <span className="text-[10px] text-slate-400">{comment.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">{comment.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </article>

            {/* Right Column (Sidebar) */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Author Bio */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center shadow-sm">
                <img src={selectedPost.authorAvatar} alt={selectedPost.author} className="w-16 h-16 rounded-full object-cover mx-auto mb-3" />
                <h4 className="font-bold text-sm text-slate-950 dark:text-white">{selectedPost.author}</h4>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mt-0.5 mb-3">Staff Writer</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  IT specialist with years of hands-on industry experience covering cybersecurity architectures, systems configurations, and web technologies.
                </p>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white mb-4 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-accent" />
                    Related Articles
                  </h4>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <div
                        key={related.id}
                        onClick={() => { setSelectedPost(related); window.scrollTo(0, 0); }}
                        className="flex items-start gap-3 cursor-pointer group"
                      >
                        <img src={related.image} className="w-16 h-12 rounded object-cover flex-shrink-0" alt="" />
                        <div>
                          <h5 className="text-xs font-bold text-slate-950 dark:text-white line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                            {related.title}
                          </h5>
                          <span className="text-[9px] text-slate-400 block mt-1">{formatDate(related.publishedAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Promo Banner */}
              <div className="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-2xl p-6 text-white text-center shadow-md">
                <Award className="w-10 h-10 text-white mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-sm mb-1.5">Accelerate Your IT Career</h4>
                <p className="text-xs text-indigo-100 leading-relaxed mb-4">
                  Pass proctored certification exams with our pro libraries and hands-on laboratory courses.
                </p>
                <Link to="/register" className="inline-block w-full py-2 bg-white text-primary font-bold text-xs rounded-lg hover:bg-slate-50 transition-colors">
                  Get Started Free
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-gradient-hero border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(#6366F1 1px, transparent 1px), linear-gradient(90deg, #6366F1 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="label-badge mb-4 inline-flex">
            <BookOpen className="w-4 h-4" />
            <span>CompuPoint Blog</span>
          </div>
          <h1 className="section-heading mb-4">
            IT Insights &
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent"> Tech Knowledge</span>
          </h1>
          <p className="section-subheading mb-8">
            Expert articles, tutorials, certification guides, and career advice from IT professionals.
          </p>
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-base shadow-sm"
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
              onClick={() => { setActiveCategory(cat); setSelectedPost(null); }}
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
                <div
                  onClick={() => { setSelectedPost(filtered[0]); window.scrollTo(0, 0); }}
                  className="card-base overflow-hidden hover:-translate-y-0.5 cursor-pointer"
                >
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
                <BlogCard key={post.id} post={post} onClick={() => { setSelectedPost(post); window.scrollTo(0, 0); }} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function BlogCard({ post, onClick }: { post: typeof BLOG_POSTS[0]; onClick?: () => void }) {
  return (
    <div onClick={onClick} className="card-base overflow-hidden hover:-translate-y-1 cursor-pointer group transition-all duration-200">
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
