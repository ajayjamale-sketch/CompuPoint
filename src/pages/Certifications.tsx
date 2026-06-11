import { useState } from "react";
import { Link } from "react-router-dom";
import { Award, ShieldCheck, FileCheck, CheckCircle2, ArrowRight, UserCheck, BookOpen, Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const certificationPrograms = [
  {
    id: "CP-WD-001",
    title: "Full-Stack Web Development Professional",
    category: "Web Development",
    examDuration: "120 mins",
    passingScore: "75%",
    description: "Validate your proficiency in client and server-side web engineering, covering React, Node.js, databases, and deployment.",
    skillsNeeded: ["HTML/CSS/JS", "React & Frontend Frameworks", "Node.js & API Architecture", "Database Modeling", "Git & CI/CD"],
  },
  {
    id: "CP-PY-002",
    title: "Python Programming Specialist",
    category: "Software Development",
    examDuration: "90 mins",
    passingScore: "70%",
    description: "Demonstrate solid mastery of Python concepts, algorithms, object-oriented principles, and data analysis packages.",
    skillsNeeded: ["Python Syntax & Types", "OOP & Design Patterns", "Data Structures & Algos", "Error Handling & Debugging", "File I/O & Libraries"],
  },
  {
    id: "CP-DM-003",
    title: "Digital Marketing Certified Professional",
    category: "Digital Business",
    examDuration: "90 mins",
    passingScore: "70%",
    description: "Validate core competence in SEO, SEM, content strategy, email automation, analytics, and social media advertising.",
    skillsNeeded: ["Search Engine Optimization", "Google Ads & PPC Campaigns", "Social Media Management", "Web Analytics (GA4)", "Content Marketing"],
  },
  {
    id: "CP-TA-004",
    title: "Tally Prime & Accounting Professional",
    category: "Office Productivity",
    examDuration: "90 mins",
    passingScore: "75%",
    description: "Verify your practical capabilities in computer accounting, inventory management, GST compliance, and payroll records using Tally.",
    skillsNeeded: ["Double Entry Bookkeeping", "GST Configuration", "Inventory & Stock Records", "Bank Reconciliation", "Payroll & Voucher Entries"],
  },
];

export default function Certifications() {
  const [verifyId, setVerifyId] = useState("");
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [openPolicyFaq, setOpenPolicyFaq] = useState<string | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyId.trim()) return;
    
    if (verifyId.toUpperCase().startsWith("CP-") || verifyId.toUpperCase().startsWith("CERT-")) {
      setVerificationResult(`✅ Credential Verified: Active & Valid. Issued to Rajesh Kumar for "${certificationPrograms[0].title}" on Nov 15, 2025.`);
    } else {
      setVerificationResult("❌ Invalid Credential ID. Please verify the code format (e.g., CP-WD-2025-001234).");
    }
  };

  const certificationWorkflow = [
    { step: "01", title: "Select a Category Path", desc: "Select from coding, accounting, marketing, or security tracks." },
    { step: "02", title: "Attempt Preparatory Tests", desc: "Unlock practice test banks and gauge your knowledge with AI tools." },
    { step: "03", title: "Pass Proctored Exam", desc: "Take a secure online proctored multiple-choice exam." },
    { step: "04", title: "Earn Verified Badge", desc: "Receive a permanent secure verification link and download PDFs." },
  ];

  const policyFaqs = [
    { q: "What is the format of the certification exams?", a: "Exams consist of multiple-choice questions (MCQs), matching items, and scenario-based coding or configuration tasks. They are entirely browser-based." },
    { q: "What happens if I fail the exam?", a: "All candidates receive one free retake attempt within 30 days of the first registration. Additional attempts can be purchased separately." },
    { q: "How long are the certificates valid?", a: "CompuPoint certifications are valid for 2 years from the date of issue. Certified candidates receive discounts on renewal assessments." },
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* 1. Hero Section */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-gradient-hero border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(#6366F1 1px, transparent 1px), linear-gradient(90deg, #6366F1 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="label-badge mb-4 inline-flex">
            <Award className="w-4 h-4" />
            <span>Professional Credentials</span>
          </div>
          <h1 className="section-heading mb-5">
            Get Certified. Get Hired.
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
              Industry-Recognized Badges
            </span>
          </h1>
          <p className="section-subheading">
            Earn verifiable credentials trusted by over 5000+ companies. Show employers your technical capabilities with online exam options.
          </p>
        </div>
      </section>

      {/* 2. Certification Roadmap Workflow */}
      <section className="py-12 px-4 bg-white dark:bg-slate-900 border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-8">Four Steps to Verifiable Professional Stature</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {certificationWorkflow.map((item) => (
              <div key={item.step} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/45 border border-border group hover:border-primary/20 transition-colors">
                <div className="text-2xl font-bold font-heading text-primary mb-3">{item.step}</div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Active Certification Program Cards */}
      <section className="py-12 px-4 bg-slate-50 dark:bg-slate-950 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-6">Active Certification Programs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {certificationPrograms.map((program) => (
              <div key={program.id} className="card-base p-6 bg-white dark:bg-slate-900 border border-border/80 hover:border-primary/20 transition-all duration-300">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="tag">{program.category}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Exam ID: {program.id}</span>
                </div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-2">{program.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{program.description}</p>
                <div className="mb-4">
                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-2">Skills Covered:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {program.skillsNeeded.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-950/45 text-[10px] text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border/40 pt-3 text-xs text-slate-500">
                  <div className="flex gap-4">
                    <span><Clock className="w-3.5 h-3.5 inline mr-1" />{program.examDuration}</span>
                    <span>Score: {program.passingScore}</span>
                  </div>
                  <Link to="/register" className="btn-primary text-[10px] px-3 py-1.5">Prepare Exam</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Credential Verification Portal */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900 border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center text-primary mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-2">Employers Credential Verification Engine</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
            Input a candidate's secure certificate serial number (e.g. CP-WD-2025-001234) below to instantly confirm credential validity.
          </p>
          
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mb-4">
            <input
              type="text"
              value={verifyId}
              onChange={(e) => setVerifyId(e.target.value)}
              placeholder="Enter secure Certificate Code"
              className="flex-1 px-3.5 py-2 bg-background border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
            />
            <button type="submit" className="btn-primary text-xs py-2 px-5">
              Verify
            </button>
          </form>

          {verificationResult && (
            <div className="mt-4 p-3.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-950/45 text-xs text-slate-700 dark:text-slate-300 font-semibold max-w-md mx-auto">
              {verificationResult}
            </div>
          )}
        </div>
      </section>

      {/* 5. Exam Policies & FAQ Accordion */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-8 text-center">Exam Policy & Guidelines FAQ</h2>
          <div className="space-y-3">
            {policyFaqs.map((item, idx) => (
              <div key={idx} className="card-base p-4 bg-white dark:bg-slate-900">
                <button
                  onClick={() => setOpenPolicyFaq(openPolicyFaq === item.q ? null : item.q)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-xs text-slate-900 dark:text-white">{item.q}</span>
                  <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", openPolicyFaq === item.q && "rotate-180")} />
                </button>
                {openPolicyFaq === item.q && (
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
