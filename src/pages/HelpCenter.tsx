import { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ChevronDown, Search, ArrowRight, PhoneCall, Mail, ShieldAlert, Award, MessageSquare, BadgeCheck } from "lucide-react";
import { FAQ_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";

const helpCategories = ["All", "Courses", "Certification", "AI Features", "Services", "Pricing", "Support"];

export default function HelpCenter() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchSearch = item.question.toLowerCase().includes(search.toLowerCase()) ||
                        item.answer.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* 1. Hero Section */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-gradient-hero border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(#6366F1 1px, transparent 1px), linear-gradient(90deg, #6366F1 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="label-badge mb-4 inline-flex">
            <HelpCircle className="w-4 h-4" />
            <span>Support Center</span>
          </div>
          <h1 className="section-heading text-slate-900 dark:text-white mb-5">
            How Can We Help You?
          </h1>
          <p className="section-subheading text-slate-500 dark:text-slate-300 mb-8">
            Search our extensive knowledge base or choose a category below to solve your technical questions quickly.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help topics, FAQs, and concepts..."
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-base shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* 2. Help Categories Quick Links Grid */}
      <section className="py-12 px-4 bg-white dark:bg-slate-900 border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-6 font-semibold">Quick Help Categories</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            {[
              { icon: BadgeCheck, title: "Course Access", desc: "Enrollments and curriculum limits" },
              { icon: Award, title: "Certifications", desc: "Exams proctors and badges verification" },
              { icon: ShieldAlert, title: "Service Tickets", desc: "Hardware diagnostics status check" },
              { icon: MessageSquare, title: "Direct Contact", desc: "Priority support phone and emails" }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/45 border border-border">
                <Icon className="w-5 h-5 text-primary mb-2" />
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-xs mb-1">{title}</h3>
                <p className="text-[10px] text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Searchable FAQ Accordion */}
      <section className="py-12 px-4 bg-slate-50 dark:bg-slate-950 border-b border-border">
        <div className="max-w-3xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {helpCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeCategory === cat
                    ? "bg-primary border-primary text-white shadow-indigo"
                    : "bg-background border-border text-slate-600 dark:text-slate-300 hover:border-primary/50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "card-base p-4 bg-white dark:bg-slate-900 border border-border",
                    openId === item.id && "ring-2 ring-primary-200 dark:ring-primary-800"
                  )}
                >
                  <button
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">{item.question}</span>
                    <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", openId === item.id && "rotate-180")} />
                  </button>
                  {openId === item.id && (
                    <div className="mt-3 border-t border-border/10 pt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="card-base p-16 text-center bg-white dark:bg-slate-900 border">
                <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-2">No results found</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
                  Try searching for different terms or selecting another help category filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Direct Contact Support Cards */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-6">Talk to Our Support Team</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a href="mailto:hello@compupoint.in" className="flex items-center gap-4 p-4 card-base hover:-translate-y-0.5 transition-all bg-slate-50 dark:bg-slate-950/45">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-semibold">Email Enquiries</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white">hello@compupoint.in</p>
              </div>
            </a>

            <a href="tel:+918001234567" className="flex items-center gap-4 p-4 card-base hover:-translate-y-0.5 transition-all bg-slate-50 dark:bg-slate-950/45">
              <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-semibold">Phone Support</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white">+91 800 123 4567</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 5. Priority Ticketing CTA Box */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card-base p-8 border border-primary-200 dark:border-primary-900 bg-gradient-to-br from-primary-50 to-indigo-50/10 dark:from-primary-950/15 dark:to-transparent">
            <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-2">Need Priority Enterprise Help?</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto leading-relaxed">
              If your institution has an active Annual Maintenance Contract (AMC), you can open high-priority diagnostic tickets directly.
            </p>
            <Link to="/contact" className="btn-primary text-xs py-2.5 px-6 inline-flex items-center gap-1.5 shadow-indigo-lg">
              Contact Sales Agent <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

