import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ArrowRight, Star, Zap, Shield, HelpCircle, ChevronDown, CreditCard, ShieldCheck, X } from "lucide-react";
import { PRICING_PLANS, FAQ_ITEMS } from "@/constants";
import { formatCurrency, cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function Pricing() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // Payment Form States
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePlanSelect = (plan: typeof PRICING_PLANS[0]) => {
    if (!isLoggedIn) {
      toast.info("Please register or log in to select a plan.");
      navigate("/register");
    } else {
      setSelectedPlan(plan);
      setCardName("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
      toast.error("Please fill in all payment details.");
      return;
    }
    setPaymentLoading(true);
    setTimeout(() => {
      setPaymentLoading(false);
      setShowPaymentModal(false);
      const price = isYearly ? selectedPlan.yearlyPrice : selectedPlan.price;
      toast.success(`🎉 Payment of ${formatCurrency(price)} for ${selectedPlan.name} verified! Welcome to CompuPoint Premium.`);
      setTimeout(() => navigate("/dashboard"), 1200);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pt-16 relative">
      {/* Hero */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="label-badge mb-4 inline-flex">
            <Zap className="w-4 h-4" />
            <span>Pricing</span>
          </div>
          <h1 className="section-heading text-slate-900 dark:text-white mb-4">
            Simple Pricing,
            <br />
            <span className="gradient-text">Maximum Value</span>
          </h1>
          <p className="section-subheading text-slate-500 dark:text-slate-300 mb-8">
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
                  <button
                    onClick={() => handlePlanSelect(plan)}
                    className={cn(
                      "flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98]",
                      plan.highlighted ? "bg-white text-primary-600 hover:bg-blue-50" : "btn-primary"
                    )}
                  >
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </button>
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

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden animate-scale-in">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-primary animate-pulse" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Secure Checkout
                </h3>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border flex justify-between items-center text-sm">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedPlan.name} Plan</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block">{isYearly ? "Billed Annually" : "Billed Monthly"}</span>
                </div>
                <span className="text-lg font-black text-primary">
                  {formatCurrency(isYearly ? selectedPlan.yearlyPrice : selectedPlan.price)}
                </span>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Cardholder Name *</label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Card Number *</label>
                <input
                  type="text"
                  required
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                    setCardNumber(val);
                  }}
                  placeholder="4000 1234 5678 9010"
                  className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Expiration Date *</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val.length > 2) {
                        val = val.substring(0, 2) + "/" + val.substring(2);
                      }
                      setCardExpiry(val);
                    }}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">CVV/CVC *</label>
                  <input
                    type="password"
                    required
                    maxLength={3}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                    placeholder="123"
                    className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 justify-center py-1 bg-slate-50 dark:bg-slate-950 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Encrypted 256-bit SSL connection</span>
              </div>

              <button type="submit" disabled={paymentLoading} className="w-full btn-primary text-sm py-2">
                {paymentLoading ? "Processing Payment..." : "Confirm Payment"}
              </button>
            </form>
          </div>
        </div>
      )}

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

