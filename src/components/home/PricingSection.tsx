import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, Zap, ArrowRight, Star } from "lucide-react";
import { PRICING_PLANS } from "@/constants";
import { formatCurrency, cn } from "@/lib/utils";

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="section-padding bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="label-badge mb-4 inline-flex">
            <Zap className="w-4 h-4" />
            <span>Pricing Plans</span>
          </div>
          <h2 className="section-heading mb-4">
            Simple, Transparent
            <br />
            <span className="gradient-text">Pricing for Everyone</span>
          </h2>
          <p className="section-subheading mb-8">
            Choose the plan that fits your learning goals. All plans include a 7-day free trial with no credit card required.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                !isYearly
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                isYearly
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              )}
            >
              Yearly
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-full">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-green-500" />
            <span>7-day free trial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-green-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-green-500" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-green-500" />
            <span>24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan, isYearly }: { plan: typeof PRICING_PLANS[0]; isYearly: boolean }) {
  const price = isYearly ? plan.yearlyPrice : plan.price;

  return (
    <div className={cn(
      "pricing-card relative flex flex-col transition-all duration-300 hover:-translate-y-1",
      plan.highlighted ? "pricing-card-featured shadow-blue-lg scale-105" : ""
    )}>
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-accent-500 text-white text-xs font-bold rounded-full shadow-cyan">
            <Star className="w-3 h-3 fill-white" />
            {plan.badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className={cn(
          "text-xl font-heading font-bold mb-2",
          plan.highlighted ? "text-white" : "text-slate-900 dark:text-white"
        )}>
          {plan.name}
        </h3>
        <p className={cn(
          "text-sm leading-relaxed",
          plan.highlighted ? "text-blue-100" : "text-slate-500 dark:text-slate-400"
        )}>
          {plan.description}
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className={cn(
            "text-4xl font-heading font-bold",
            plan.highlighted ? "text-white" : "text-slate-900 dark:text-white"
          )}>
            {formatCurrency(price)}
          </span>
          <span className={cn(
            "text-sm",
            plan.highlighted ? "text-blue-200" : "text-slate-500 dark:text-slate-400"
          )}>
            /month
          </span>
        </div>
        {isYearly && (
          <p className={cn(
            "text-xs mt-1",
            plan.highlighted ? "text-blue-200" : "text-slate-500 dark:text-slate-400"
          )}>
            Billed annually — save {formatCurrency((plan.price - plan.yearlyPrice) * 12)}/year
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
              plan.highlighted ? "bg-white/20" : "bg-primary-50 dark:bg-primary-900/30"
            )}>
              <Check className={cn(
                "w-3 h-3",
                plan.highlighted ? "text-white" : "text-primary-600 dark:text-primary-400"
              )} />
            </div>
            <span className={cn(
              "text-sm",
              plan.highlighted ? "text-blue-50" : "text-slate-700 dark:text-slate-300"
            )}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        to={plan.id === "enterprise" ? "/contact" : "/register"}
        className={cn(
          "flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200",
          plan.highlighted
            ? "bg-white text-primary-600 hover:bg-blue-50 shadow-lg hover:shadow-xl"
            : "btn-primary"
        )}
      >
        {plan.cta}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
