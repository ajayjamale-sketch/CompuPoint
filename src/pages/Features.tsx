import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  GraduationCap, Award, Brain, Wrench, Code2, ShoppingBag, Briefcase,
  BarChart3, Monitor, Globe, Shield, Search, ArrowRight, CheckCircle2, Star,
  X, Check, AlertCircle, Laptop, Cpu
} from "lucide-react";
import { COURSES } from "@/constants";
import { formatCurrency, cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const featureCategories = [
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certification", label: "Certification", icon: Award },
  { id: "ai", label: "AI Learning", icon: Brain },
  { id: "services", label: "IT Services", icon: Wrench },
  { id: "career", label: "Career", icon: Briefcase },
];

const allFeatures = [
  {
    category: "education",
    title: "Computer Education Academy",
    description: "Comprehensive IT learning with 280+ structured courses from basic computing to advanced programming, covering MS Office, Tally, web development, graphic design, and digital marketing.",
    icon: GraduationCap,
    benefits: ["280+ structured courses", "Video + live sessions", "Hands-on projects", "Expert instructors", "Beginner to advanced"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=350&fit=crop",
  },
  {
    category: "certification",
    title: "Professional Certification Center",
    description: "Industry-recognized certification programs with online exams, practice tests, skill assessments, and verified digital certificates accepted by 5000+ employers.",
    icon: Award,
    benefits: ["Online proctored exams", "Practice test library", "Digital certificates", "Verification portal", "Employer-trusted credentials"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=350&fit=crop",
  },
  {
    category: "ai",
    title: "AI Learning & Technical Assistant",
    description: "Your 24/7 intelligent learning companion that answers technical questions, personalizes your learning path, provides career recommendations, and helps troubleshoot IT issues.",
    icon: Brain,
    benefits: ["24/7 doubt resolution", "Personalized study plans", "Technical troubleshooting", "Career recommendations", "IT skill assessment"],
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=350&fit=crop",
  },
  {
    category: "services",
    title: "Hardware & Repair Services",
    description: "Complete computer maintenance ecosystem with on-site repair booking, AMC contracts, hardware diagnostics, spare parts marketplace, and professional technicians.",
    icon: Wrench,
    benefits: ["On-site repair booking", "AMC management", "Hardware diagnostics", "Spare parts store", "Service tracking"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=350&fit=crop",
  },
  {
    category: "career",
    title: "Career & Placement Hub",
    description: "End-to-end career development platform with AI-powered resume builder, job portal with 500+ listings, interview preparation, internship opportunities, and dedicated placement support.",
    icon: Briefcase,
    benefits: ["AI resume builder", "500+ job listings", "Mock interviews", "Internship portal", "Placement assistance"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=350&fit=crop",
  },
];

const capabilities = [
  { id: "marketplace", icon: Globe, title: "IT Services Marketplace", desc: "Hire verified IT professionals for web development, networking, and cloud setup." },
  { id: "store", icon: ShoppingBag, title: "Computer Store", desc: "Buy laptops, accessories, networking gear, and software licenses at competitive prices." },
  { id: "institute", icon: Monitor, title: "Institute Management", desc: "Complete management system for training institutes with batch, fee, and performance tracking." },
  { id: "analytics", icon: BarChart3, title: "Analytics Dashboard", desc: "Powerful business and learning intelligence with detailed reports and actionable insights." },
  { id: "cyber", icon: Shield, title: "Cybersecurity Training", desc: "Ethical hacking, network security, and cybersecurity programs for IT professionals." },
  { id: "support", icon: Code2, title: "Software Support", desc: "Professional software installation, OS setup, remote support, and license management." },
  { id: "roadmaps", icon: Brain, title: "Career Roadmaps", desc: "AI-curated career paths for every IT discipline with skill gap analysis and recommendations." },
  { id: "student", icon: CheckCircle2, title: "Student Management", desc: "Track attendance, performance, assignments, and progress for individual students or batches." },
];

export default function Features() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("education");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");
  const [selectedLevelFilter, setSelectedLevelFilter] = useState("All");
  const [selectedCap, setSelectedCap] = useState<string | null>(null);

  // Enrollment Modal states
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{ title: string; price: number } | null>(null);
  const [enrollForm, setEnrollForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [enrollLoading, setEnrollLoading] = useState(false);

  // Custom Capability Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const cleanHash = hash.replace("#", "");
        let matched = false;
        if (cleanHash === "certifications" || cleanHash === "certification") {
          setActiveCategory("certification");
          matched = true;
        } else if (cleanHash === "services") {
          setActiveCategory("services");
          matched = true;
        } else if (cleanHash === "career") {
          setActiveCategory("career");
          matched = true;
        } else if (cleanHash === "education") {
          setActiveCategory("education");
          matched = true;
        } else if (cleanHash === "ai") {
          setActiveCategory("ai");
          matched = true;
        }

        if (matched) {
          setTimeout(() => {
            const el = document.getElementById("features-tabs");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const activeFeature = allFeatures.find((f) => f.category === activeCategory);

  const courseCategories = ["All", ...Array.from(new Set(COURSES.map(c => c.category)))];
  const courseLevels = ["All", "beginner", "intermediate", "advanced"];

  const filteredCourses = COURSES.filter((c) => {
    const matchesSearch = !searchTerm || 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryFilter === "All" || c.category === selectedCategoryFilter;
    const matchesLevel = selectedLevelFilter === "All" || c.level === selectedLevelFilter;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const openEnrollModal = (course: { title: string; price: number }) => {
    setSelectedCourse(course);
    setEnrollForm({ name: "", email: "", phone: "", notes: "" });
    setEnrollModalOpen(true);
  };

  const submitEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollForm.name || !enrollForm.email) {
      toast.error("Please fill in your name and email address.");
      return;
    }
    setEnrollLoading(true);
    setTimeout(() => {
      setEnrollLoading(false);
      setEnrollModalOpen(false);
      toast.success(`🎉 Successfully enrolled in "${selectedCourse?.title}"!`);
      if (isLoggedIn) {
        setTimeout(() => navigate("/dashboard"), 1200);
      } else {
        setTimeout(() => navigate("/register"), 1200);
      }
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) {
      toast.error("Please fill in Name and Email address.");
      return;
    }
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      toast.success("✨ Request submitted successfully! Our team will contact you shortly.");
      setSelectedCap(null);
      setFormName("");
      setFormEmail("");
      setFormDetails("");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-gradient-hero border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(#6366F1 1px, transparent 1px), linear-gradient(90deg, #6366F1 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="label-badge mb-4 inline-flex">
            <Star className="w-4 h-4" />
            <span>Platform Features</span>
          </div>
          <h1 className="section-heading mb-5">
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
              Excel in Technology
            </span>
          </h1>
          <p className="section-subheading">
            From learning and certification to services and career growth, CompuPoint brings together all the tools you need in one powerful platform.
          </p>
        </div>
      </section>

      {/* Feature Tabs */}
      <section id="features-tabs" className="section-padding bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {featureCategories.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200",
                  activeCategory === id
                    ? "bg-primary border-primary text-white shadow-indigo"
                    : "bg-background border-border text-slate-600 dark:text-slate-300 hover:border-primary/50"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Active Feature Detail */}
          {activeFeature && (
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/45 flex items-center justify-center mb-6">
                  <activeFeature.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">
                  {activeFeature.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {activeFeature.description}
                </p>
                <div className="grid grid-cols-1 gap-2.5 mb-8">
                  {activeFeature.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-primary-50 dark:bg-primary-950/45 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{b}</span>
                    </div>
                  ))}
                </div>
                <Link to={isLoggedIn ? "/dashboard" : "/register"} className="btn-primary">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-card-hover border border-slate-100 dark:border-slate-800">
                <img src={activeFeature.image} alt={activeFeature.title} className="w-full h-80 object-cover" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Course Catalog */}
      <section id="courses" className="section-padding bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Course Catalog</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{filteredCourses.length} courses match your criteria</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              {/* Category selector */}
              <div className="flex flex-wrap gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                {courseCategories.slice(0, 5).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
                      selectedCategoryFilter === cat
                        ? "bg-primary text-white"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Level selector */}
              <div className="flex gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                {courseLevels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevelFilter(lvl)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all",
                      selectedLevelFilter === lvl
                        ? "bg-primary text-white"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search courses..."
                  className="input-base pl-9 py-2.5 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length === 0 ? (
              <div className="col-span-full bg-white dark:bg-slate-900 border rounded-2xl p-12 text-center">
                <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">No courses found</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try resetting your filters or search query.</p>
                <button
                  onClick={() => { setSelectedCategoryFilter("All"); setSelectedLevelFilter("All"); setSearchTerm(""); }}
                  className="mt-4 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredCourses.map((course) => (
                <div key={course.id} className="card-base overflow-hidden hover:-translate-y-1 group cursor-pointer transition-all duration-200">
                  <div className="relative overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold capitalize",
                        course.level === "beginner" ? "bg-green-500 text-white" :
                        course.level === "intermediate" ? "bg-blue-500 text-white" : "bg-purple-500 text-white"
                      )}>
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="tag text-xs">{course.category}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1.5 leading-snug group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
                      <span>{course.instructor}</span>
                      <span>•</span>
                      <span>{course.duration}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {course.rating}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {formatCurrency(course.price)}
                      </span>
                      <button
                        onClick={() => openEnrollModal({ title: course.title, price: course.price })}
                        className="btn-primary text-xs px-4 py-2"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Additional Feature Cards */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">More Platform Capabilities</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {capabilities.map(({ id, icon: Icon, title, desc }) => (
              <div
                key={title}
                onClick={() => setSelectedCap(id)}
                className="feature-card p-5 cursor-pointer hover:border-primary/50 group active:scale-[0.98] transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-950/45 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-xs text-slate-900 dark:text-white mb-1.5 leading-snug group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                <div className="mt-3.5 flex items-center gap-1 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Action Modal */}
      {selectedCap && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden animate-scale-in">
            <button
              onClick={() => setSelectedCap(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Custom Modal Content depending on selected capability */}
            {selectedCap === "marketplace" && (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-5 h-5 text-primary animate-pulse" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">IT Services Inquiries</h3>
                </div>
                <p className="text-xs text-slate-500">Hire certified CompuPoint experts for web development, cloud setup, or networking projects.</p>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Full Name</label>
                  <input type="text" required value={formName} onChange={e => setFormName(e.target.value)} placeholder="Full Name" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Email Address</label>
                  <input type="email" required value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="email@example.com" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Project Requirements</label>
                  <textarea rows={3} required value={formDetails} onChange={e => setFormDetails(e.target.value)} placeholder="Describe what you need built or set up..." className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
                </div>
                <button type="submit" disabled={formLoading} className="w-full btn-primary text-sm py-2">
                  {formLoading ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            )}

            {selectedCap === "store" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Computer & Spare Parts Store</h3>
                </div>
                <p className="text-xs text-slate-500 mb-2">Direct purchases of components, accessories, and system upgrades.</p>
                <div className="space-y-2.5">
                  {[
                    { name: '16GB DDR4 RAM Module', price: 3499 },
                    { name: '500GB NVMe SSD Drive', price: 4200 },
                    { name: 'USB-C Multiport Hub Adapter', price: 1899 }
                  ].map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-750">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center text-slate-400">
                          <Cpu className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-950 dark:text-white">{p.name}</h4>
                          <span className="text-xs font-bold text-primary">{formatCurrency(p.price)}</span>
                        </div>
                      </div>
                      <button onClick={() => toast.success(`Added ${p.name} to checkout!`)} className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-lg hover:bg-primary-600">Buy</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedCap === "institute" && (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Register Your Training Institute</h3>
                </div>
                <p className="text-xs text-slate-500">Enable advanced batching, automated digital certificates, and fee trackers for your campus.</p>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Campus/Institute Name</label>
                  <input type="text" required value={formName} onChange={e => setFormName(e.target.value)} placeholder="e.g. Apex Tech Campus" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Contact Email</label>
                  <input type="email" required value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="email@campus.com" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Approximate Student Count</label>
                  <select className="w-full px-3 py-2 border rounded-lg bg-slate-50 dark:bg-slate-950 text-sm">
                    <option>50 - 150 Students</option>
                    <option>150 - 500 Students</option>
                    <option>500+ Students</option>
                  </select>
                </div>
                <button type="submit" disabled={formLoading} className="w-full btn-primary text-sm py-2">
                  {formLoading ? "Submitting..." : "Apply for Institute License"}
                </button>
              </form>
            )}

            {selectedCap === "analytics" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Analytics Dashboard Overview</h3>
                </div>
                <p className="text-xs text-slate-500">Track and assess student performance, test completion statistics, and general business revenue analytics.</p>
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Total Active Learners</span>
                    <span className="font-bold">12,450 Students</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Certificate Pass Ratio</span>
                    <span className="font-bold text-emerald-500">89.4% Pass Rate</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Avg. Lecture Attendance</span>
                    <span className="font-bold">96% Completed</span>
                  </div>
                </div>
                <button onClick={() => setSelectedCap(null)} className="w-full btn-primary text-sm py-2">Got it</button>
              </div>
            )}

            {selectedCap === "cyber" && (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Cybersecurity Training & Audits</h3>
                </div>
                <p className="text-xs text-slate-500">Enroll in proctored ethical hacking assessments or audit your corporate network infrastructure.</p>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Your Name</label>
                  <input type="text" required value={formName} onChange={e => setFormName(e.target.value)} placeholder="Full Name" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Email Address</label>
                  <input type="email" required value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="email@domain.com" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Inquiry Type</label>
                  <select className="w-full px-3 py-2 border rounded-lg bg-slate-50 dark:bg-slate-950 text-sm">
                    <option>Corporate Pentesting / Security Audit</option>
                    <option>Ethical Hacking Course Enrollment</option>
                    <option>Cyber Defenses AMC Support</option>
                  </select>
                </div>
                <button type="submit" disabled={formLoading} className="w-full btn-primary text-sm py-2">
                  {formLoading ? "Registering..." : "Submit Inquiry"}
                </button>
              </form>
            )}

            {selectedCap === "support" && (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Remote Software Support</h3>
                </div>
                <p className="text-xs text-slate-500">Book immediate assistance for OS setup, program installations, or network configurations.</p>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Full Name</label>
                  <input type="text" required value={formName} onChange={e => setFormName(e.target.value)} placeholder="Full Name" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Email Address</label>
                  <input type="email" required value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="email@address.com" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Problem Description</label>
                  <textarea rows={2} required value={formDetails} onChange={e => setFormDetails(e.target.value)} placeholder="Describe the software problem or installation support you need..." className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
                </div>
                <button type="submit" disabled={formLoading} className="w-full btn-primary text-sm py-2">
                  {formLoading ? "Scheduling..." : "Request Remote Support"}
                </button>
              </form>
            )}

            {selectedCap === "roadmaps" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">AI Career Path Tool</h3>
                </div>
                <p className="text-xs text-slate-500">Select your target tech specialization to preview recommended roadmaps:</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Frontend Architect', 'Python AI Developer', 'Cyber Incident Responder', 'Tally Senior Accountant'].map((role) => (
                    <button
                      key={role}
                      onClick={() => toast.success(`Generated dynamic roadmap for ${role}! Visit Student Dashboard to study.`)}
                      className="px-3 py-2 border border-slate-200 dark:border-slate-800 text-xs font-semibold rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-primary/50 text-left"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedCap === "student" && (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Student Batch Setup</h3>
                </div>
                <p className="text-xs text-slate-500">Initialize custom student records, assignments, and attendance sheets.</p>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Trainer/Manager Name</label>
                  <input type="text" required value={formName} onChange={e => setFormName(e.target.value)} placeholder="Full Name" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Email Address</label>
                  <input type="email" required value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="trainer@domain.com" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Batch details</label>
                  <input type="text" required value={formDetails} onChange={e => setFormDetails(e.target.value)} placeholder="e.g. JavaScript Morning Batch B" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
                </div>
                <button type="submit" disabled={formLoading} className="w-full btn-primary text-sm py-2">
                  {formLoading ? "Processing..." : "Configure New Batch"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Enrollment Modal */}
      {enrollModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden animate-scale-in">
            <button
              onClick={() => setEnrollModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <form onSubmit={submitEnrollment} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-primary animate-pulse" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Enroll in: {selectedCourse.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Course Price: <span className="font-bold text-primary">{formatCurrency(selectedCourse.price)}</span>
              </p>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Full Name *</label>
                <input
                  type="text"
                  required
                  value={enrollForm.name}
                  onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Email Address *</label>
                <input
                  type="email"
                  required
                  value={enrollForm.email}
                  onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={enrollForm.phone}
                  onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Any Questions / Notes</label>
                <textarea
                  rows={2}
                  value={enrollForm.notes}
                  onChange={(e) => setEnrollForm({ ...enrollForm, notes: e.target.value })}
                  placeholder="e.g., Preferred batch timing, previous experience..."
                  className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm"
                />
              </div>
              <button type="submit" disabled={enrollLoading} className="w-full btn-primary text-sm py-2">
                {enrollLoading ? "Processing Enrollment..." : "Confirm Enrollment"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-primary text-center animate-fade-in">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">Ready to Explore All Features?</h2>
          <p className="text-blue-100 mb-8">Start your free trial today and access everything CompuPoint has to offer.</p>
          <Link to={isLoggedIn ? "/dashboard" : "/register"} className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-bold rounded-xl hover:bg-indigo-50/50 transition-all shadow-indigo">
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}