import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { FAQ_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("1");
  const displayItems = FAQ_ITEMS.slice(0, 6);

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="label-badge mb-4 inline-flex">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="section-heading mb-4">
            Got Questions?
            <br />
            <span className="gradient-text">We Have Answers</span>
          </h2>
          <p className="section-subheading">
            Everything you need to know about CompuPoint. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {displayItems.map((item) => (
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
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300",
                  openId === item.id
                    ? "bg-primary-600 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-500"
                )}>
                  <span className="text-xs font-bold">{item.id}</span>
                </div>
                <div className="flex-1 min-w-0">
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
                <div className="px-5 pb-5 ml-10">
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                  <div className="mt-3">
                    <span className="tag">{item.category}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            Still have questions? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/faq" className="btn-primary">
              View All FAQs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
