import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Brain, FileText, Star, Target, CheckCircle2, ArrowRight, Building2, Quote } from "lucide-react";
import { toast } from "sonner";

const jobsList = [
  { id: 1, title: "Senior React Developer", company: "Flipkart", type: "Full-time", salary: "₹18-24 LPA", location: "Bangalore (Hybrid)", match: 92 },
  { id: 2, title: "Full-Stack Engineer", company: "Razorpay", type: "Full-time", salary: "₹20-28 LPA", location: "Mumbai (On-site)", match: 85 },
  { id: 3, title: "Python Backend Developer", company: "Zomato", type: "Full-time", salary: "₹14-18 LPA", location: "Gurugram (On-site)", match: 88 },
  { id: 4, title: "DevOps & Cloud Engineer", company: "Wipro", type: "Contract", salary: "₹15-20 LPA", location: "Remote", match: 78 },
];

export default function CareerHub() {
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  const handleApply = (id: number, title: string) => {
    if (appliedJobs.includes(id)) return;
    setAppliedJobs((prev) => [...prev, id]);
    toast.success(`Application sent for "${title}"! Check your email for status updates.`);
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
                        onClick={() => handleApply(job.id, job.title)}
                        className="btn-primary text-xs px-5 py-2.5"
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
              <Link to="/register" className="btn-primary text-xs py-2.5 flex items-center justify-center gap-1.5 w-fit px-6">
                Launch AI Simulator <ArrowRight className="w-4 h-4" />
              </Link>
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
              <Link to="/register" className="btn-secondary text-xs py-2.5 flex items-center justify-center gap-1.5 w-fit px-6">
                Open Resume Editor <ArrowRight className="w-4 h-4" />
              </Link>
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
    </div>
  );
}
