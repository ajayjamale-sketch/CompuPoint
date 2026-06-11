import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageSquare, Headphones } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", type: "general" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) { setError("Name is required."); return; }
    if (!form.email || !form.email.includes("@")) { setError("Valid email is required."); return; }
    if (!form.message.trim() || form.message.length < 20) { setError("Message must be at least 20 characters."); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    toast.success("Message sent! We'll reply within 24 hours.");
    setLoading(false);
  };

  const contactInfo = [
    { icon: Mail, label: "Email Us", value: "hello@compupoint.in", href: "mailto:hello@compupoint.in", desc: "For general enquiries" },
    { icon: Phone, label: "Call Us", value: "+91 800 123 4567", href: "tel:+918001234567", desc: "Mon–Sat, 9AM–7PM IST" },
    { icon: MapPin, label: "Visit Us", value: "Bangalore, Karnataka", href: "#", desc: "Koramangala, 560034" },
    { icon: Clock, label: "Support Hours", value: "Mon–Sat: 9AM–7PM", href: "#", desc: "Emergency: 24/7" },
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="label-badge mb-4 inline-flex">
            <MessageSquare className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          <h1 className="section-heading text-slate-900 dark:text-white mb-4">Contact Us</h1>
          <p className="section-subheading text-slate-500 dark:text-slate-300">
            Have questions about courses, services, or enterprise plans? Our team is ready to help you get started.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-5">
            <h2 className="font-heading font-bold text-slate-900 dark:text-white text-lg">Reach Us</h2>
            {contactInfo.map(({ icon: Icon, label, value, href, desc }) => (
              <a
                key={label}
                href={href}
                className="flex items-start gap-4 p-4 card-base hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                  <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{value}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
              </a>
            ))}

            {/* Quick Support */}
            <div className="card-base p-5 bg-gradient-to-br from-primary-50 to-cyan-50 dark:from-primary-900/20 dark:to-cyan-900/20 border-primary-100 dark:border-primary-800">
              <div className="flex items-center gap-3 mb-3">
                <Headphones className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Priority Support</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Enterprise customers get dedicated account managers and 24/7 phone support.
              </p>
              <a href="/pricing" className="btn-primary text-xs px-4 py-2">
                Upgrade Plan
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card-base p-6 sm:p-8">
              {!sent ? (
                <>
                  <h2 className="font-heading font-bold text-slate-900 dark:text-white text-lg mb-6">Send a Message</h2>

                  {/* Enquiry Type */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Enquiry Type</label>
                    <div className="flex flex-wrap gap-2">
                      {["general", "courses", "services", "enterprise", "support"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => update("type", type)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize transition-all ${
                            form.type === type
                              ? "bg-primary-600 border-primary-600 text-white"
                              : "bg-background border-border text-slate-600 dark:text-slate-300 hover:border-primary-300"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm mb-5">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name *</label>
                        <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Arjun Verma" className="input-base" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address *</label>
                        <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="your@email.com" className="input-base" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                        <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" className="input-base" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Subject</label>
                        <input type="text" value={form.subject} onChange={(e) => update("subject", e.target.value)} placeholder="How can we help?" className="input-base" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Message *</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Describe your question or requirement in detail (min. 20 characters)..."
                        rows={5}
                        className="input-base resize-none"
                      />
                      <p className="text-xs text-slate-400 mt-1 text-right">{form.message.length} / 500</p>
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <><Send className="w-5 h-5" /> Send Message</>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-sm mx-auto">
                    Thank you for reaching out. Our team will respond to your enquiry within 24 hours (business days).
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "", type: "general" }); }}
                    className="btn-secondary px-6 py-2.5"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

