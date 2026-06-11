import { useState } from "react";
import { Link } from "react-router-dom";
import { Wrench, Shield, CheckCircle2, AlertCircle, Clock, ArrowRight, ClipboardList, ShieldCheck, UserCheck, Star, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ServiceRequests() {
  const [device, setDevice] = useState("");
  const [problem, setProblem] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const mockTickets = [
    { id: "SR-001", type: "Hardware Repair", device: "HP Pavilion 15", status: "in-progress", date: "Jan 10, 2026", tech: "Sanjay Kumar" },
    { id: "SR-002", type: "Software Installation", device: "Dell Vostro Custom", status: "completed", date: "Jan 08, 2026", tech: "Ravi Sharma" },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!device.trim() || !problem.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Service request submitted! Technicians have been notified.");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketId.trim()) return;

    const matched = mockTickets.find((t) => t.id.toUpperCase() === ticketId.trim().toUpperCase());
    if (matched) {
      setSearchResult(matched);
    } else {
      setSearchResult("notFound");
    }
  };

  const serviceFaqs = [
    { q: "Do you offer data backup before repair?", a: "While our technicians take utmost care, CompuPoint is not responsible for data loss. We strongly advise backing up critical files before handoff." },
    { q: "How long does laptop screen repair take?", a: "Standard screen replacements usually take 24-48 hours depending on genuine component availability in our warehouse." },
    { q: "What warranty do you offer on repairs?", a: "All chip-level hardware repairs and replacements come with a 30-day warranty against software conflicts or component failures." },
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* 1. Hero Section */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-gradient-hero border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(#6366F1 1px, transparent 1px), linear-gradient(90deg, #6366F1 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="label-badge mb-4 inline-flex">
            <Wrench className="w-4 h-4" />
            <span>Service Center Portal</span>
          </div>
          <h1 className="section-heading mb-5">
            Repair & Diagnostics
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
              Track Your Support Tickets
            </span>
          </h1>
          <p className="section-subheading">
            Submit new computer repair requests or lookup service status diagnostics using your tracking ticket number below.
          </p>
        </div>
      </section>

      {/* 2. Interactive Ticket Submission Form */}
      <section className="py-12 px-4 bg-white dark:bg-slate-900 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="card-base p-6 sm:p-8 bg-slate-50 dark:bg-slate-950/20 border border-border">
            <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-6">Create New Repair Ticket</h2>
            {!submitted ? (
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">Device Model/Make *</label>
                    <input
                      type="text"
                      value={device}
                      onChange={(e) => setDevice(e.target.value)}
                      placeholder="e.g. Lenovo ThinkPad E14"
                      className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">Request Type *</label>
                    <select className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option value="hardware">Hardware Repair</option>
                      <option value="software">Software Setup / License</option>
                      <option value="amc">Annual Maintenance Contract (AMC)</option>
                      <option value="other">Other Diagnostics</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">Detailed Problem Description *</label>
                  <textarea
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="Please details all issues (e.g. system overheats, blue screen error, OS slow to boot)..."
                    rows={5}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-3.5 text-sm">
                  Submit Repair Ticket
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center mx-auto mb-5 text-green-500">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-2">Ticket Created Successfully!</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-sm mx-auto">
                  Your request was recorded as **SR-004**. A technician has been assigned and will contact you via email or phone within 24 hours.
                </p>
                <button onClick={() => { setSubmitted(false); setDevice(""); setProblem(""); }} className="btn-secondary px-6 py-2.5">
                  Create Another Ticket
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Ticket Status Lookup Widget */}
      <section className="py-12 px-4 bg-slate-50 dark:bg-slate-950 border-b border-border">
        <div className="max-w-xl mx-auto text-center">
          <div className="card-base p-6 border border-primary-200 dark:border-primary-900 bg-white dark:bg-slate-900">
            <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-3 flex items-center justify-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" /> Live Ticket Status Engine
            </h3>
            <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">
              Enter your Ticket Reference Code to review real-time repair status updates.
            </p>
            
            <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                placeholder="Ticket ID (e.g. SR-001)"
                className="flex-1 px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
                required
              />
              <button type="submit" className="btn-primary text-xs py-2.5 px-5">
                Check
              </button>
            </form>

            {searchResult && (
              <div className="mt-4 border-t border-border/10 pt-4 text-left">
                {searchResult === "notFound" ? (
                  <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-xl text-red-600 dark:text-red-400 text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /> Ticket code not found.
                  </div>
                ) : (
                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-border">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-900 dark:text-white">{searchResult.id}</span>
                      <span className="capitalize text-primary">{searchResult.status}</span>
                    </div>
                    <p className="text-[11px]">{searchResult.device} • {searchResult.type}</p>
                    <hr className="border-border/60" />
                    <div className="flex justify-between">
                      <span>Technician:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{searchResult.tech}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Created Date:</span>
                      <span>{searchResult.date}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Technician Spotlight / Expertise Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900 border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-2">Meet Our Certified Technicians</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">Experienced hardware engineers with ISO standard diagnostics training.</p>
          
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
            {[
              { name: "Sanjay Kumar", role: "Senior Hardware Specialist", rating: 4.9, bio: "Expert in component-level chip repairs and server installations." },
              { name: "Ravi Sharma", role: "Software Installation Expert", rating: 4.8, bio: "OS installations, licensing configuration, and database security setup." }
            ].map((tech) => (
              <div key={tech.name} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/45 border border-border flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary flex-shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm">{tech.name}</h3>
                  <p className="text-[10px] text-slate-400 mb-2">{tech.role} · <Star className="w-3.5 h-3.5 inline fill-yellow-400 text-yellow-400" /> {tech.rating}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{tech.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Service FAQ Accordion */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-8 text-center">Diagnostics & Repair FAQs</h2>
          <div className="space-y-3">
            {serviceFaqs.map((item, idx) => (
              <div key={idx} className="card-base p-4 bg-white dark:bg-slate-900">
                <button
                  onClick={() => setOpenFaq(openFaq === item.q ? null : item.q)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-xs text-slate-900 dark:text-white">{item.q}</span>
                  <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", openFaq === item.q && "rotate-180")} />
                </button>
                {openFaq === item.q && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed pl-1">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
