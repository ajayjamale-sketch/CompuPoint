import { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ChevronDown, Search, ArrowRight } from "lucide-react";
import { FAQ_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";

const categories = ["All", "Courses", "Certification", "AI Features", "Services", "Pricing", "Support", "Access", "Institute"];

export default function FAQ() {
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
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="label-badge mb-4 inline-flex bg-primary-900/40 border-primary-700 text-primary-400">
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 mb-8">
            Find answers to common questions about CompuPoint's courses, certifications, and services.
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-base"
            />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                activeCategory === cat
                  ? "bg-primary-600 border-primary-600 text-white"
                  : "bg-background border-border text-slate-600 dark:text-slate-300 hover:border-primary-300"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">No questions found. Try a different search term.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "card-base overflow-hidden transition-all duration-300",
                  openId === item.id && "ring-2 ring-primary-200 dark:ring-primary-800"
                )}
              >
                <button
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="w-full flex items-start gap-4 p-5 text-left"
                  aria-expanded={openId === item.id}
                >
                  <div className={cn(
                    "w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all",
                    openId === item.id ? "bg-primary-600 text-white" : "bg-slate-100 dark:bg-slate-700"
                  )}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                        {item.question}
                      </h3>
                      <ChevronDown className={cn(
                        "w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5 transition-transform duration-300",
                        openId === item.id && "rotate-180"
                      )} />
                    </div>
                  </div>
                </button>
                {openId === item.id && (
                  <div className="px-5 pb-5 ml-11">
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                      {item.answer}
                    </p>
                    <span className="tag text-xs">{item.category}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 text-center card-base p-8">
          <HelpCircle className="w-10 h-10 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
          <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-2">
            Still need help?
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">
            Our support team is available Monday–Saturday, 9AM–7PM IST.
          </p>
          <Link to="/contact" className="btn-primary">
            Contact Support
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
