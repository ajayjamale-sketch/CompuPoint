import { useState } from "react";
import { Wrench, ShieldAlert, Cpu, Heart, CheckCircle2, MessageSquare, Shield, Clock, Award, Check } from "lucide-react";
import { toast } from "sonner";

export default function ITServices() {
  const [device, setDevice] = useState("");
  const [problem, setProblem] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!device.trim() || !problem.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Service request submitted! We'll assign a technician shortly.");
  };

  const servicesList = [
    {
      icon: Cpu,
      title: "Hardware Repairs & Diagnostics",
      desc: "Diagnostics and repairs for laptops, desktops, and servers. Component-level repair (chip level), screens, keyboards, RAM/SSD upgrades.",
      features: ["On-site/home visits available", "Genuine spare parts", "30-day service warranty"],
    },
    {
      icon: Wrench,
      title: "Annual Maintenance Contracts (AMC)",
      desc: "Complete computer and network infrastructure health support contracts for training institutes, offices, and colleges.",
      features: ["Scheduled preventive maintenance", "Priority emergency visits", "Remote support desk"],
    },
    {
      icon: ShieldAlert,
      title: "Software Setup & OS Support",
      desc: "Operating system installations (Windows/Linux/macOS), license configuration, antivirus installation, virus/malware removal.",
      features: ["Remote assistance capability", "Data backup assistance", "Full driver installation"],
    },
  ];

  const amcPlans = [
    { name: "Starter AMC", price: "₹499", desc: "Best for single small training labs", features: ["2 Preventive Maintenance visits/year", "Response time: 48 hours", "Remote email support", "Genuine hardware discounts"] },
    { name: "Enterprise Pro AMC", price: "₹1,499", desc: "Best for corporate offices and institutions", features: ["Monthly preventive diagnostics", "Response time: 4 hours priority", "Full network & server audits", "24/7 dedicated remote manager", "Free backup software setup"] }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* 1. Hero Section */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-gradient-hero border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(#6366F1 1px, transparent 1px), linear-gradient(90deg, #6366F1 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="label-badge mb-4 inline-flex">
            <Wrench className="w-4 h-4" />
            <span>Hardware & Software Hub</span>
          </div>
          <h1 className="section-heading mb-5">
            Reliable IT Services
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
              On-Site & Remote Support
            </span>
          </h1>
          <p className="section-subheading">
            Book certified computer technicians for repair, diagnostics, and software setup, or purchase Annual Maintenance Contracts (AMC) for your business.
          </p>
        </div>
      </section>

      {/* 2. Diagnostic Service Offerings Grid */}
      <section className="py-12 px-4 bg-white dark:bg-slate-900 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-6">Our Service Offerings</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {servicesList.map((svc) => (
              <div key={svc.title} className="card-base p-6 hover:border-primary/20 transition-all duration-300 bg-slate-50 dark:bg-slate-950/45">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/45 flex items-center justify-center text-primary mb-4">
                  <svc.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-2">{svc.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{svc.desc}</p>
                <div className="space-y-2 border-t pt-3 border-border/60">
                  {svc.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Annual Maintenance Contract (AMC) Pricing Plans */}
      <section className="py-12 px-4 bg-slate-50 dark:bg-slate-950 border-b border-border">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-2">Annual Maintenance Contracts</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">Get priority on-call engineers and scheduled hardware health checks.</p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {amcPlans.map((plan) => (
              <div key={plan.name} className="card-base p-6 bg-white dark:bg-slate-900 border border-border">
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{plan.desc}</p>
                <div className="text-2xl font-bold text-primary mb-4">{plan.price}<span className="text-xs text-slate-400">/device/month</span></div>
                <ul className="space-y-2.5 text-xs text-slate-500 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => toast.success(`Inquiry sent for ${plan.name}!`)} className="btn-primary w-full text-xs py-2">Get Quote</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Repair Ticket Request Form */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900 border-b border-border">
        <div className="max-w-xl mx-auto">
          <div className="card-base p-6 sm:p-8 bg-slate-50 dark:bg-slate-950/20 border border-border">
            <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-2 text-center flex items-center justify-center gap-2"><MessageSquare className="w-5 h-5 text-primary" /> Book a Service Ticket</h2>
            <p className="text-xs text-slate-500 text-center mb-6">Need immediate help? Fill in details and generate your tracking code.</p>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Device Model / Type *</label>
                  <input
                    type="text"
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    placeholder="e.g. HP Pavilion 15 or Custom PC"
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Problem Details *</label>
                  <textarea
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="Describe the issue (e.g. System not powering on, screen blinking)..."
                    rows={4}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full text-xs py-3">Submit Request</button>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-950/30 flex items-center justify-center mx-auto mb-3 text-green-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm mb-1">Request Received</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Ticket created. A technician will contact you shortly to schedule diagnostics.</p>
                <button onClick={() => { setSubmitted(false); setDevice(""); setProblem(""); }} className="btn-secondary text-xs px-4 py-2">Submit Another Request</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Security & Certification Badges / Trust Banner */}
      <section className="py-12 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-col items-center gap-1.5">
            <Shield className="w-6 h-6 text-green-500" />
            <span className="font-semibold text-slate-900 dark:text-white">ISO 9001:2015</span>
            <span>Certified Service Center</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Award className="w-6 h-6 text-yellow-500" />
            <span className="font-semibold text-slate-900 dark:text-white">Genuine Parts Only</span>
            <span>Manufacturer Sourced Parts</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Clock className="w-6 h-6 text-primary" />
            <span className="font-semibold text-slate-900 dark:text-white">24h Response SLA</span>
            <span>Fast Diagnostics Turnaround</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Heart className="w-6 h-6 text-red-500 animate-pulse" />
            <span className="font-semibold text-slate-900 dark:text-white">99% Satisfaction</span>
            <span>Highly Rated Technicians</span>
          </div>
        </div>
      </section>
    </div>
  );
}
