import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Star, Zap, Shield, HelpCircle, ChevronDown } from "lucide-react";
import { PRICING_PLANS, FAQ_ITEMS } from "@/constants";
import { formatCurrency, cn } from "@/lib/utils";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="label-badge mb-4 inline-flex">
            <Zap className="w-4 h-4" />
            <span>Pricing</span>
          </div>
          <h1 className="section-heading mb-4">
            Simple Pricing,
            <br />
            <span className="gradient-text">Maximum Value</span>
          </h1>
          <p className="section-subheading mb-8">
            Choose the plan that fits your goals. All plans include a 7-day free trial with no credit card required.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-white dark:bg-slate-800 border border-border rounded-xl shadow-card">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                !isYearly ? "bg-primary-600 text-white shadow-blue" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                isYearly ? "bg-primary-600 text-white shadow-blue" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
              )}
            >
              Yearly
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full">
                Save 25%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4 sm:px-6 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {PRICING_PLANS.map((plan) => {
              const price = isYearly ? plan.yearlyPrice : plan.price;
              return (
                <div key={plan.id} className={cn(
                  "pricing-card flex flex-col transition-all duration-300 hover:-translate-y-1",
                  plan.highlighted ? "pricing-card-featured shadow-blue-lg scale-105" : ""
                )}>
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-4 py-1 bg-accent-500 text-white text-xs font-bold rounded-full shadow-cyan">
                        <Star className="w-3 h-3 fill-white" />
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <div className="mb-5">
                    <h2 className={cn("text-xl font-heading font-bold mb-2", plan.highlighted ? "text-white" : "text-slate-900 dark:text-white")}>
                      {plan.name}
                    </h2>
                    <p className={cn("text-sm", plan.highlighted ? "text-blue-100" : "text-slate-500 dark:text-slate-400")}>
                      {plan.description}
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className={cn("text-4xl font-heading font-bold", plan.highlighted ? "text-white" : "text-slate-900 dark:text-white")}>
                        {formatCurrency(price)}
                      </span>
                      <span className={cn("text-sm", plan.highlighted ? "text-blue-200" : "text-slate-500")}>/mo</span>
                    </div>
                    {isYearly && (
                      <p className={cn("text-xs mt-1", plan.highlighted ? "text-blue-200" : "text-slate-400")}>
                        Billed {formatCurrency(price * 12)}/year
                      </p>
                    )}
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                          plan.highlighted ? "bg-white/20" : "bg-primary-50 dark:bg-primary-900/30"
                        )}>
                          <Check className={cn("w-3 h-3", plan.highlighted ? "text-white" : "text-primary-600 dark:text-primary-400")} />
                        </div>
                        <span className={cn("text-sm", plan.highlighted ? "text-blue-50" : "text-slate-700 dark:text-slate-300")}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={plan.id === "enterprise" ? "/contact" : "/register"}
                    className={cn(
                      "flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all",
                      plan.highlighted ? "bg-white text-primary-600 hover:bg-blue-50" : "btn-primary"
                    )}
                  >
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Trust */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-slate-500 dark:text-slate-400">
            {["7-day free trial", "No credit card required", "Cancel anytime", "Secure payments", "24/7 support"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-green-500" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white text-center mb-8">
            Compare Plans
          </h2>
          <div className="card-base overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-slate-500 dark:text-slate-400">Feature</th>
                  <th className="text-center p-4 font-semibold text-slate-900 dark:text-white">Starter</th>
                  <th className="text-center p-4 font-semibold text-primary-600 dark:text-primary-400">Professional</th>
                  <th className="text-center p-4 font-semibold text-slate-900 dark:text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { feature: "Courses Access", starter: "20+", pro: "100+", ent: "Unlimited" },
                  { feature: "Certification Attempts", starter: "2/month", pro: "Unlimited", ent: "Unlimited" },
                  { feature: "AI Learning Assistant", starter: "-", pro: "Full Access", ent: "Full Access" },
                  { feature: "Live Sessions", starter: "-", pro: "Included", ent: "Priority Access" },
                  { feature: "Resume Builder", starter: "-", pro: "Included", ent: "Included" },
                  { feature: "Job Portal", starter: "Basic", pro: "Full Access", ent: "Premium Access" },
                  { feature: "Hardware Services", starter: "-", pro: "-", ent: "Included" },
                  { feature: "Institute Management", starter: "-", pro: "-", ent: "Full System" },
                  { feature: "Analytics Dashboard", starter: "Basic", pro: "Advanced", ent: "Enterprise-grade" },
                  { feature: "Support", starter: "Email", pro: "Email + Chat", ent: "24/7 Phone + Manager" },
                ].map(({ feature, starter, pro, ent }) => (
                  <tr key={feature} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">{feature}</td>
                    <td className="p-4 text-center text-slate-500 dark:text-slate-400">{starter === "-" ? <span className="text-slate-300 dark:text-slate-600">—</span> : starter}</td>
                    <td className="p-4 text-center text-primary-600 dark:text-primary-400 font-medium">{pro === "-" ? <span className="text-slate-300 dark:text-slate-600">—</span> : pro}</td>
                    <td className="p-4 text-center text-slate-700 dark:text-slate-300">{ent === "-" ? <span className="text-slate-300 dark:text-slate-600">—</span> : ent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-center text-slate-900 dark:text-white mb-8">Pricing FAQs</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.filter((f) => f.category === "Pricing" || f.category === "Access").slice(0, 4).map((item) => (
              <div key={item.id} className={cn("card-base overflow-hidden", openFaq === item.id && "ring-2 ring-primary-200 dark:ring-primary-800")}>
                <button onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-medium text-slate-900 dark:text-white text-sm">{item.question}</span>
                  <ChevronDown className={cn("w-5 h-5 text-slate-400 flex-shrink-0 transition-transform", openFaq === item.id && "rotate-180")} />
                </button>
                {openFaq === item.id && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">More questions?</p>
            <Link to="/contact" className="btn-primary px-6">Talk to Sales</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
