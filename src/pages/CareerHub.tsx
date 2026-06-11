import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Brain, FileText, Star, Target, CheckCircle2, ArrowRight, Building2, Quote, Phone, Mail, FileUp, Sparkles, Wand2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const jobsList = [
  { id: 1, title: "Senior React Developer", company: "Flipkart", type: "Full-time", salary: "₹18-24 LPA", location: "Bangalore (Hybrid)", match: 92 },
  { id: 2, title: "Full-Stack Engineer", company: "Razorpay", type: "Full-time", salary: "₹20-28 LPA", location: "Mumbai (On-site)", match: 85 },
  { id: 3, title: "Python Backend Developer", company: "Zomato", type: "Full-time", salary: "₹14-18 LPA", location: "Gurugram (On-site)", match: 88 },
  { id: 4, title: "DevOps & Cloud Engineer", company: "Wipro", type: "Contract", salary: "₹15-20 LPA", location: "Remote", match: 78 },
];

const INTERVIEW_QUESTIONS: Record<string, string[]> = {
  "Frontend React": [
    "Explain the virtual DOM and how React updates it.",
    "What is the difference between state and props in React?",
    "How do React Hooks work under the hood?"
  ],
  "Python Backend": [
    "What are Python decorators and how do you write a custom one?",
    "Explain Python's GIL (Global Interpreter Lock) and its performance impact.",
    "How does Django handle the database request/response lifecycle?"
  ],
  "DevOps": [
    "Explain the difference between CI and CD in modern pipelines.",
    "What is Infrastructure as Code (IaC) and why is it useful?",
    "How do you secure containerized secrets in Kubernetes?"
  ]
};

export default function CareerHub() {
  const { user } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  // Apply Modal States
  const [activeApplyJob, setActiveApplyJob] = useState<any>(null);
  const [applyName, setApplyName] = useState("");
  const [applyEmail, setApplyEmail] = useState("");
  const [applyPhone, setApplyPhone] = useState("");
  const [applyPortfolio, setApplyPortfolio] = useState("");
  const [applyMessage, setApplyMessage] = useState("");
  const [applyLoading, setApplyLoading] = useState(false);

  // AI Mock Interview Modal States
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewRole, setInterviewRole] = useState("Frontend React");
  const [interviewQuestionIndex, setInterviewQuestionIndex] = useState(0);
  const [interviewResponse, setInterviewResponse] = useState("");
  const [interviewResult, setInterviewResult] = useState<any>(null);
  const [interviewLoading, setInterviewLoading] = useState(false);

  // AI Resume Builder Modal States
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [resumeTitle, setResumeTitle] = useState("");
  const [resumeSkills, setResumeSkills] = useState("");
  const [resumeExp, setResumeExp] = useState("");
  const [resumeProj, setResumeProj] = useState("");
  const [resumeLoading, setResumeLoading] = useState(false);

  const handleApplyClick = (job: any) => {
    setActiveApplyJob(job);
    if (user) {
      setApplyName(user.name || "");
      setApplyEmail(user.email || "");
    } else {
      setApplyName("");
      setApplyEmail("");
    }
    setApplyPhone("");
    setApplyPortfolio("");
    setApplyMessage("");
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyName.trim() || !applyEmail.trim() || !applyPhone.trim()) {
      toast.error("Please fill in Name, Email, and Phone.");
      return;
    }
    setApplyLoading(true);
    setTimeout(() => {
      setApplyLoading(false);
      setAppliedJobs((prev) => [...prev, activeApplyJob.id]);
      setActiveApplyJob(null);
      toast.success(`Application sent for "${activeApplyJob.title}"! Check your email for status updates.`);
    }, 1500);
  };

  const handleInterviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewResponse.trim() || interviewResponse.trim().split(" ").length < 5) {
      toast.error("Please provide a descriptive answer (minimum 5 words).");
      return;
    }
    setInterviewLoading(true);
    setTimeout(() => {
      setInterviewLoading(false);
      const randomScore = Math.floor(75 + Math.random() * 20);
      setInterviewResult({
        score: randomScore,
        feedback: `Excellent logic! Your answer captures the core concepts. To score higher, explain the architecture of how state cycles operate.`,
      });
    }, 1500);
  };

  const handleResumeClick = () => {
    setShowResumeModal(true);
    if (user) {
      setResumeName(user.name || "");
      setResumeTitle(user.specialization || "Software Engineer");
    } else {
      setResumeName("");
      setResumeTitle("");
    }
    setResumeSkills("React, TypeScript, TailwindCSS, Node.js");
    setResumeExp("Frontend Developer Intern at CompuSkills Academy");
    setResumeProj("Portfolio Web App, E-Commerce Site");
  };

  const handleResumeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeName.trim() || !resumeTitle.trim() || !resumeSkills.trim()) {
      toast.error("Please fill in Name, Title, and Skills.");
      return;
    }
    setResumeLoading(true);
    setTimeout(() => {
      setResumeLoading(false);
      setShowResumeModal(false);
      toast.success("🎉 Resume generated successfully! PDF is ready for download.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* 1. Hero Section */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-gradient-hero border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(#6366F1 1px, transparent 1px), linear-gradient(90deg, #6366F1 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="label-badge mb-4 inline-flex">
            <Briefcase className="w-4 h-4" />
            <span>Placement & Hiring Portal</span>
          </div>
          <h1 className="section-heading mb-5">
            Launch & Accelerate
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
              Your Tech Career
            </span>
          </h1>
          <p className="section-subheading">
            Connect directly with verified IT recruiters, build professional resume profiles, prepare with AI mock interviews, and land your next role.
          </p>
        </div>
      </section>

      {/* 2. Recruiter Partners Logo Cloud */}
      <section className="py-10 px-4 bg-white dark:bg-slate-900 border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-6 font-semibold">Our Students & Graduates are Hired By</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center opacity-70">
            {["Flipkart", "Razorpay", "Zomato", "Wipro"].map((company) => (
              <div key={company} className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 font-heading font-bold text-base">
                <Building2 className="w-5 h-5 text-primary" />
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Job Search & Placement Openings Grid */}
      <section className="py-12 px-4 bg-slate-50 dark:bg-slate-950 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-6">Featured Career Opportunities</h2>
          <div className="space-y-4">
            {jobsList.map((job) => (
              <div key={job.id} className="card-base p-5 bg-white dark:bg-slate-900 border border-border/80 hover:border-primary/20 transition-all duration-300">
                <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="tag">{job.company}</span>
                      <span className="text-xs text-slate-500">{job.location}</span>
                    </div>
                    <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span>{job.type}</span>
                      <span>•</span>
                      <span className="font-semibold text-primary">{job.salary}</span>
                    </div>
                  </div>

                  <div className="text-right w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-border/60">
                    <div className="text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-0.5">
                      <Target className="w-3.5 h-3.5" />
                      {job.match}% match score
                    </div>
                    {appliedJobs.includes(job.id) ? (
                      <span className="px-4 py-2 text-xs bg-green-50 dark:bg-green-950/35 text-green-700 dark:text-green-400 font-bold rounded-xl border border-green-200">
                        Applied
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApplyClick(job)}
                        className="btn-primary text-xs px-5 py-2.5 shadow-indigo"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI Career Tools Widget Grid */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-8 text-center">AI-Powered Career Toolkit</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* AI Mock Interview Tool */}
            <div className="card-base p-6 border border-primary-200 dark:border-primary-900 bg-gradient-to-br from-primary-50 to-indigo-50/10 dark:from-primary-950/15 dark:to-transparent flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary mb-4">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-2">AI Mock Interview Simulator</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Practice vocal answers for Frontend, Backend, JavaScript, or System Design. Receive an immediate technical score breakout and customized feedback.
                </p>
              </div>
              <button onClick={() => { setShowInterviewModal(true); setInterviewQuestionIndex(0); setInterviewResponse(""); setInterviewResult(null); }} className="btn-primary text-xs py-2.5 flex items-center justify-center gap-1.5 w-fit px-6 shadow-indigo">
                Launch AI Simulator <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* AI Resume Builder */}
            <div className="card-base p-6 border border-border flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-accent-100 dark:bg-accent/10 flex items-center justify-center text-accent mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-2">AI Resume Profile Builder</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Assemble your courses, completed certifications, projects, and target role into a clean print-ready HTML/PDF template.
                </p>
              </div>
              <button onClick={handleResumeClick} className="btn-secondary text-xs py-2.5 flex items-center justify-center gap-1.5 w-fit px-6">
                Open Resume Editor <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Success Story Testimonial Banner */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary mx-auto mb-4">
            <Quote className="w-5 h-5" />
          </div>
          <blockquote className="text-base font-semibold text-slate-900 dark:text-white mb-6 leading-relaxed">
            "I passed the Python Programming Certification, used the AI Mock Interview to prepare, and landed a software engineering role at Wipro within two weeks. The placement dashboard match scores are incredibly accurate!"
          </blockquote>
          <p className="text-xs font-bold text-slate-900 dark:text-white">Rajesh Sen</p>
          <p className="text-[10px] text-slate-400">Software Engineer · Wipro Graduate</p>
        </div>
      </section>

      {/* Job Application Modal */}
      <Dialog open={activeApplyJob !== null} onOpenChange={(open) => !open && setActiveApplyJob(null)}>
        <DialogContent className="max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-border">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-lg font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Apply for Position
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
              Submit your candidate application to <strong>{activeApplyJob?.company}</strong> for the <strong>{activeApplyJob?.title}</strong> role.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleApplySubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="apply-name" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Full Name *</label>
                <input
                  id="apply-name"
                  type="text"
                  required
                  value={applyName}
                  onChange={(e) => setApplyName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 font-medium"
                />
              </div>
              <div>
                <label htmlFor="apply-email" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    id="apply-email"
                    type="email"
                    required
                    value={applyEmail}
                    onChange={(e) => setApplyEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="apply-phone" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    id="apply-phone"
                    type="tel"
                    required
                    value={applyPhone}
                    onChange={(e) => setApplyPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 font-medium"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="apply-portfolio" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Portfolio Link (GitHub)</label>
                <input
                  id="apply-portfolio"
                  type="url"
                  value={applyPortfolio}
                  onChange={(e) => setApplyPortfolio(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Resume Upload *</label>
              <div className="border border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <FileUp className="w-5 h-5 mx-auto text-slate-400 mb-1.5" />
                <p className="text-[10px] text-slate-500 dark:text-slate-400">PDF, DOCX up to 5MB (Preselected default resume template)</p>
              </div>
            </div>

            <div>
              <label htmlFor="apply-message" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Short Cover Note (Optional)</label>
              <textarea
                id="apply-message"
                value={applyMessage}
                onChange={(e) => setApplyMessage(e.target.value)}
                placeholder="Explain why you are a great match..."
                rows={2}
                className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 resize-none"
              />
            </div>

            <DialogFooter className="mt-6 gap-2">
              <button
                type="button"
                onClick={() => setActiveApplyJob(null)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-border text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={applyLoading}
                className="btn-primary text-xs px-5 py-2 font-bold flex items-center justify-center min-w-[100px]"
              >
                {applyLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Apply Job"
                )}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* AI Mock Interview Modal */}
      <Dialog open={showInterviewModal} onOpenChange={setShowInterviewModal}>
        <DialogContent className="max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-border">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-lg font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary animate-pulse" />
              AI Mock Interview Simulator
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
              Test your engineering capability and receive real-time scoring.
            </DialogDescription>
          </DialogHeader>

          {!interviewResult ? (
            <form onSubmit={handleInterviewSubmit} className="space-y-4">
              <div>
                <label htmlFor="interview-role" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Select Domain</label>
                <select
                  id="interview-role"
                  value={interviewRole}
                  onChange={(e) => { setInterviewRole(e.target.value); setInterviewQuestionIndex(0); setInterviewResponse(""); }}
                  className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 font-medium"
                >
                  <option value="Frontend React">Frontend React Development</option>
                  <option value="Python Backend">Python Backend Development</option>
                  <option value="DevOps">Cloud & DevOps Engineering</option>
                </select>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-border rounded-xl">
                <span className="text-[10px] text-primary uppercase font-bold tracking-wider">Interview Question {interviewQuestionIndex + 1} of 3</span>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
                  {INTERVIEW_QUESTIONS[interviewRole]?.[interviewQuestionIndex]}
                </p>
              </div>

              <div>
                <label htmlFor="interview-response" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Your Technical Answer</label>
                <textarea
                  id="interview-response"
                  required
                  value={interviewResponse}
                  onChange={(e) => setInterviewResponse(e.target.value)}
                  placeholder="Type your response or technical explanations here..."
                  rows={4}
                  className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 resize-none font-medium"
                />
              </div>

              <DialogFooter className="mt-6 gap-2">
                <button
                  type="button"
                  onClick={() => setShowInterviewModal(false)}
                  className="px-4 py-2 text-xs font-bold rounded-xl border border-border text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={interviewLoading}
                  className="btn-primary text-xs px-5 py-2 font-bold flex items-center justify-center min-w-[120px]"
                >
                  {interviewLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Submit Response <Sparkles className="w-3.5 h-3.5 ml-1" /></>
                  )}
                </button>
              </DialogFooter>
            </form>
          ) : (
            <div className="space-y-4 py-4 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-2">
                <Target className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">AI Technical Score</p>
                <p className="text-3xl font-heading font-extrabold text-primary">{interviewResult.score}%</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-left border border-border">
                <p className="font-semibold text-slate-900 dark:text-white mb-1">Feedback Summary:</p>
                {interviewResult.feedback}
              </div>
              <div className="flex gap-2 justify-center pt-2">
                <button
                  onClick={() => {
                    setInterviewResponse("");
                    setInterviewResult(null);
                    setInterviewQuestionIndex((interviewQuestionIndex + 1) % 3);
                  }}
                  className="btn-primary text-xs px-4 py-2 flex items-center gap-1"
                >
                  Next Question <RefreshCw className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setShowInterviewModal(false)}
                  className="btn-secondary text-xs px-4 py-2"
                >
                  Close Simulator
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* AI Resume Builder Modal */}
      <Dialog open={showResumeModal} onOpenChange={setShowResumeModal}>
        <DialogContent className="max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-border">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-lg font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              AI Resume Profile Builder
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
              Format your learning achievements and career details into a print-ready template.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleResumeSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="resume-name" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Full Name *</label>
                <input
                  id="resume-name"
                  type="text"
                  required
                  value={resumeName}
                  onChange={(e) => setResumeName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 font-medium"
                />
              </div>
              <div>
                <label htmlFor="resume-title" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Target Professional Title *</label>
                <input
                  id="resume-title"
                  type="text"
                  required
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 font-medium"
                />
              </div>
            </div>

            <div>
              <label htmlFor="resume-skills" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Core Tech Skills *</label>
              <input
                id="resume-skills"
                type="text"
                required
                value={resumeSkills}
                onChange={(e) => setResumeSkills(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 font-medium"
              />
            </div>

            <div>
              <label htmlFor="resume-exp" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Work/Internship Experience</label>
              <textarea
                id="resume-exp"
                value={resumeExp}
                onChange={(e) => setResumeExp(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 resize-none font-medium"
              />
            </div>

            <div>
              <label htmlFor="resume-proj" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Key Capstone Projects</label>
              <textarea
                id="resume-proj"
                value={resumeProj}
                onChange={(e) => setResumeProj(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 resize-none font-medium"
              />
            </div>

            <DialogFooter className="mt-6 gap-2">
              <button
                type="button"
                onClick={() => setShowResumeModal(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-border text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={resumeLoading}
                className="btn-primary text-xs px-5 py-2 font-bold flex items-center justify-center min-w-[120px]"
              >
                {resumeLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Generate Resume <Wand2 className="w-3.5 h-3.5 ml-1" /></>
                )}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
