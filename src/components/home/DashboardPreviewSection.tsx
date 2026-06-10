import { Link } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Award,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
} from "lucide-react";
import dashboardImg from "@/assets/dashboard-preview.jpg";

const dashboardFeatures = [
  { icon: BookOpen, label: "Course Progress Tracker", desc: "Real-time progress on all enrolled courses" },
  { icon: Award, label: "Certification Dashboard", desc: "All earned certificates with verification links" },
  { icon: BarChart3, label: "Learning Analytics", desc: "Detailed insights on learning patterns and performance" },
  { icon: TrendingUp, label: "Career Readiness Score", desc: "AI-powered career preparedness assessment" },
];

const mockCourses = [
  { name: "Full-Stack Web Development", progress: 72, color: "bg-primary" },
  { name: "Python Programming", progress: 100, color: "bg-green-500" },
  { name: "Digital Marketing", progress: 45, color: "bg-accent" },
  { name: "Tally Prime & Accounting", progress: 88, color: "bg-purple-500" },
];

export default function DashboardPreviewSection() {
  return (
    <section className="section-padding bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="label-badge mb-6 inline-flex">
              <Zap className="w-4 h-4" />
              <span>Powerful Dashboard</span>
            </div>
            <h2 className="section-heading mb-6">
              Track Every Step of
              <br />
              <span className="gradient-text">Your Progress</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 text-lg">
              Your personalized command center for learning, certifications, service requests, and career development — all in one beautiful interface.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {dashboardFeatures.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border hover:border-primary/20 transition-all duration-200 group">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-950/45 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">{label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/dashboard" className="btn-primary px-7 py-3.5 shadow-indigo-lg">
              View Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="relative">
            {/* Main Dashboard Preview */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(99,102,241,0.2)] border border-border">
              <img
                src={dashboardImg}
                alt="CompuPoint Dashboard"
                className="w-full h-auto"
                loading="lazy"
              />
              {/* Overlay with real UI elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -left-6 top-1/4 card-base p-4 w-48 shadow-card-hover animate-float hidden sm:block">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary-50 dark:bg-primary-950/45 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-slate-900 dark:text-white">Course Progress</span>
              </div>
              <div className="space-y-2">
                {mockCourses.slice(0, 3).map((c) => (
                  <div key={c.name}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">{c.name}</span>
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{c.progress}%</span>
                    </div>
                    <div className="h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Achievement Card */}
            <div className="absolute -right-4 bottom-16 card-base p-4 w-44 shadow-card-hover animate-float hidden sm:block" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-xs font-semibold text-slate-900 dark:text-white">Achievement</span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Python Expert</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Certificate Earned Today</p>
              <div className="flex items-center gap-1 mt-2">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="text-[10px] text-slate-400">Just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
