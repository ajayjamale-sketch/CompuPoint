import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  GraduationCap, Award, Brain, Wrench, Code2, ShoppingBag, Briefcase,
  BarChart3, Monitor, Globe, Shield, Search, ArrowRight, CheckCircle2, Star
} from "lucide-react";
import { COURSES } from "@/constants";
import { formatCurrency, cn } from "@/lib/utils";

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

export default function Features() {
  const [activeCategory, setActiveCategory] = useState("education");
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredCourses = COURSES.filter((c) =>
    !searchTerm || c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                <Link to="/register" className="btn-primary">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-card-hover">
                <img src={activeFeature.image} alt={activeFeature.title} className="w-full h-72 object-cover" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Course Catalog */}
      <section id="courses" className="section-padding bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Course Catalog</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{filteredCourses.length} courses available</p>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="card-base overflow-hidden hover:-translate-y-1 group cursor-pointer">
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
                    <button className="btn-primary text-xs px-4 py-2">Enroll Now</button>
                  </div>
                </div>
              </div>
            ))}
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
            {[
              { icon: Globe, title: "IT Services Marketplace", desc: "Hire verified IT professionals for web development, networking, and cloud setup." },
              { icon: ShoppingBag, title: "Computer Store", desc: "Buy laptops, accessories, networking gear, and software licenses at competitive prices." },
              { icon: Monitor, title: "Institute Management", desc: "Complete management system for training institutes with batch, fee, and performance tracking." },
              { icon: BarChart3, title: "Analytics Dashboard", desc: "Powerful business and learning intelligence with detailed reports and actionable insights." },
              { icon: Shield, title: "Cybersecurity Training", desc: "Ethical hacking, network security, and cybersecurity programs for IT professionals." },
              { icon: Code2, title: "Software Support", desc: "Professional software installation, OS setup, remote support, and license management." },
              { icon: Brain, title: "Career Roadmaps", desc: "AI-curated career paths for every IT discipline with skill gap analysis and recommendations." },
              { icon: CheckCircle2, title: "Student Management", desc: "Track attendance, performance, assignments, and progress for individual students or batches." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="feature-card p-5">
                <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-950/45 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-xs text-slate-900 dark:text-white mb-1.5 leading-snug">{title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-primary text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">Ready to Explore All Features?</h2>
          <p className="text-blue-100 mb-8">Start your free trial today and access everything CompuPoint has to offer.</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-bold rounded-xl hover:bg-indigo-50/50 transition-all shadow-indigo">
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
