import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, BookOpen, Clock, GraduationCap, ArrowRight, Zap, Award, CheckCircle, ShieldCheck, Phone, Mail } from "lucide-react";
import { COURSES } from "@/constants";
import { formatCurrency, cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Courses() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [category, setCategory] = useState("All");
  const [quizScore, setQuizScore] = useState<string | null>(null);
  const [selectedInterest, setSelectedInterest] = useState("");

  // Enrollment Modal States
  const [activeCourse, setActiveCourse] = useState<any>(null);
  const [enrollName, setEnrollName] = useState("");
  const [enrollEmail, setEnrollEmail] = useState("");
  const [enrollPhone, setEnrollPhone] = useState("");
  const [enrollType, setEnrollType] = useState("free-trial");
  const [enrollLoading, setEnrollLoading] = useState(false);

  const categories = ["All", ...Array.from(new Set(COURSES.map((c) => c.category)))];
  const levels = ["All", "beginner", "intermediate", "advanced"];

  const filtered = COURSES.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                        c.description.toLowerCase().includes(search.toLowerCase()) ||
                        c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchLevel = level === "All" || c.level === level;
    const matchCat = category === "All" || c.category === category;
    return matchSearch && matchLevel && matchCat;
  });

  const handleQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInterest) {
      toast.error("Please select an area of interest.");
      return;
    }
    if (selectedInterest === "coding") {
      setQuizScore("Based on your interest, we recommend: Full-Stack Web Development or Python Programming.");
    } else if (selectedInterest === "office") {
      setQuizScore("Based on your interest, we recommend: Complete MS Office Mastery or Tally Prime & Accounting.");
    } else if (selectedInterest === "marketing") {
      setQuizScore("Based on your interest, we recommend: Digital Marketing Professional.");
    } else {
      setQuizScore("Based on your interest, we recommend starting with computer essentials or web basics.");
    }
  };

  const handleEnrollClick = (course: any) => {
    setActiveCourse(course);
    if (user) {
      setEnrollName(user.name || "");
      setEnrollEmail(user.email || "");
    } else {
      setEnrollName("");
      setEnrollEmail("");
    }
    setEnrollPhone("");
    setEnrollType("free-trial");
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollName.trim() || !enrollEmail.trim() || !enrollPhone.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }
    setEnrollLoading(true);
    setTimeout(() => {
      setEnrollLoading(false);
      setActiveCourse(null);
      toast.success(`🎉 Successfully enrolled in ${activeCourse?.title}! Welcome to the class.`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* 1. Hero Section */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-gradient-hero border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(#6366F1 1px, transparent 1px), linear-gradient(90deg, #6366F1 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="label-badge mb-4 inline-flex">
            <GraduationCap className="w-4 h-4" />
            <span>Academy Catalog</span>
          </div>
          <h1 className="section-heading mb-5">
            Expand Your Skills with
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
              Our Professional Courses
            </span>
          </h1>
          <p className="section-subheading mb-6">
            Choose from over 280 expert-designed computer courses, ranging from MS Office and accounting to advanced web programming and cybersecurity.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <span>280+ Courses</span>
            <span>•</span>
            <span>125K+ Enrolled Students</span>
            <span>•</span>
            <span>4.9/5 Rating</span>
          </div>
        </div>
      </section>

      {/* 2. Featured Courses Carousel/Section */}
      <section className="py-12 px-4 bg-white dark:bg-slate-900 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6 text-primary font-heading font-bold text-lg">
            <Zap className="w-5 h-5 text-accent animate-pulse" />
            <h2>Trending & Hot Courses</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.slice(0, 3).map((course) => (
              <div key={`featured-${course.id}`} className="card-base p-5 hover:border-primary/20 transition-all border border-primary-100 dark:border-primary-950 bg-gradient-to-br from-primary-50/10 to-transparent dark:from-slate-950/20 relative overflow-hidden group flex flex-col justify-between">
                <div>
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-0.5 bg-accent text-white text-[10px] uppercase font-bold rounded-full shadow-emerald">
                      Best Seller
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950/45 flex items-center justify-center text-primary">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{course.title}</h3>
                      <p className="text-[10px] text-slate-400">{course.category}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{course.description}</p>
                </div>
                <div className="flex items-center justify-between border-t border-border/40 pt-3">
                  <span className="text-base font-bold text-primary">{formatCurrency(course.price)}</span>
                  <button onClick={() => handleEnrollClick(course)} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                    Enroll Free <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Main Search & Filter Grid Catalog */}
      <section className="py-12 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          {/* Controls */}
          <div className="card-base p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses or topics..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-xl text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-xl text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 capitalize"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl === "All" ? "All Levels" : lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Courses Catalog Grid */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course) => (
                <div key={course.id} className="card-base overflow-hidden hover:-translate-y-1 group cursor-pointer flex flex-col h-full bg-white dark:bg-slate-900 border border-border">
                  <div className="relative overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold capitalize shadow-sm text-white",
                        course.level === "beginner" ? "bg-green-500" :
                        course.level === "intermediate" ? "bg-blue-500" : "bg-purple-500"
                      )}>
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="tag text-xs">{course.category}</span>
                      </div>
                      <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{course.description}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4 border-t pt-3 border-border/60">
                        <span>{course.instructor}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          {course.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-heading font-bold text-primary">
                          {formatCurrency(course.price)}
                        </span>
                        <button onClick={() => handleEnrollClick(course)} className="btn-primary text-xs px-4 py-2">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-base p-16 text-center bg-white dark:bg-slate-900 border">
              <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-2">No courses found</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-6">
                Try adjusting your search terms or filters to discover other courses in our academy.
              </p>
              <button onClick={() => { setSearch(""); setLevel("All"); setCategory("All"); }} className="btn-secondary text-sm">
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. Why Study at CompuPoint Academy */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900 border-t border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-3">Why Study at CompuPoint?</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-12 max-w-xl mx-auto">
            Our platform is engineered to deliver high-quality computer education aligned with industrial requirements.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { icon: ShieldCheck, title: "Verifiable Badges", desc: "Share secure verification URLs with hiring managers." },
              { icon: Zap, title: "AI Learning Buddy", desc: "Get help with coding syntax and math queries 24/7." },
              { icon: Award, title: "Expert Instructors", desc: "Learn from technical architects with decades of experience." },
              { icon: CheckCircle, title: "Lab Projects", desc: "Build standard web portfolios and diagnostic test sets." }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/45 border border-border">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center text-primary mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm mb-1.5">{title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive Skill Quiz CTA Banner */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="card-base p-8 border-primary-200 dark:border-primary-900 bg-gradient-to-br from-primary-50 to-indigo-50/10 dark:from-primary-950/10 dark:to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-2">Unsure which path to choose?</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Take our quick interest recommender. Tell us your primary career interest, and we'll suggest matching professional courses.
              </p>
              
              <form onSubmit={handleQuiz} className="flex flex-col sm:flex-row gap-2">
                <select
                  value={selectedInterest}
                  onChange={(e) => { setSelectedInterest(e.target.value); setQuizScore(null); }}
                  className="px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                >
                  <option value="">Select Interest...</option>
                  <option value="coding">Coding & Web Dev</option>
                  <option value="office">Business & Accounts</option>
                  <option value="marketing">SEO & Ads</option>
                </select>
                <button type="submit" className="btn-primary text-xs py-2.5 px-5">
                  Get Recommendation
                </button>
              </form>

              {quizScore && (
                <div className="mt-4 p-3.5 rounded-xl border border-primary-200/50 bg-white/80 dark:bg-slate-900/60 text-xs font-semibold text-primary">
                  {quizScore}
                </div>
              )}
            </div>
            
            <div className="w-full md:w-auto text-center">
              <button onClick={() => handleEnrollClick({ title: "Any Selected Course" })} className="btn-primary inline-flex items-center gap-2 py-3 px-6 shadow-indigo-lg text-sm w-full md:w-auto justify-center">
                Start Learning Free <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Enrollment Dialog Modal */}
      <Dialog open={activeCourse !== null} onOpenChange={(open) => !open && setActiveCourse(null)}>
        <DialogContent className="max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-border">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-lg font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Enroll in Course
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
              Submit your request to enroll in <strong>{activeCourse?.title}</strong>.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEnrollSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="enroll-name" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Full Name *</label>
                <input
                  id="enroll-name"
                  type="text"
                  required
                  value={enrollName}
                  onChange={(e) => setEnrollName(e.target.value)}
                  placeholder="e.g. Arjun Verma"
                  className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 font-medium"
                />
              </div>
              <div>
                <label htmlFor="enroll-email" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    id="enroll-email"
                    type="email"
                    required
                    value={enrollEmail}
                    onChange={(e) => setEnrollEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 font-medium"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="enroll-phone" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  id="enroll-phone"
                  type="tel"
                  required
                  value={enrollPhone}
                  onChange={(e) => setEnrollPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full pl-8 pr-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 font-medium"
                />
              </div>
            </div>

            <div>
              <label htmlFor="enroll-type" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Select Enrollment Track</label>
              <select
                id="enroll-type"
                value={enrollType}
                onChange={(e) => setEnrollType(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 font-medium"
              >
                <option value="free-trial">Free 7-Day Trial (Access to base contents)</option>
                <option value="premium">Premium Track (Includes assignments & projects)</option>
                <option value="certified">Certification Fast-Track (Includes exam registration)</option>
              </select>
            </div>

            <DialogFooter className="mt-6 gap-2">
              <button
                type="button"
                onClick={() => setActiveCourse(null)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-border text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={enrollLoading}
                className="btn-primary text-xs px-5 py-2 font-bold flex items-center justify-center min-w-[100px]"
              >
                {enrollLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Enroll Class"
                )}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
