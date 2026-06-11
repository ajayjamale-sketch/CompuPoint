import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Star,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  Zap,
  Wrench,
  Brain,
  X,
  Sparkles,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useAuth } from "@/hooks/useAuth";

const trustBadges = [
  { icon: Users, label: "125K+ Students" },
  { icon: Award, label: "89K+ Certifications" },
  { icon: BookOpen, label: "280+ Courses" },
];

const highlights = [
  "AI-Powered Learning Assistant",
  "Industry-Recognized Certifications",
  "Hardware & Repair Services",
  "Career Placement Support",
];

export default function HeroSection() {
  const { isLoggedIn } = useAuth();
  const [showDemoVideo, setShowDemoVideo] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-hero"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/50" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-accent-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#6366F1 1px, transparent 1px), linear-gradient(90deg, #6366F1 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Badge */}
            <div className="inline-flex items-center self-start gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full mb-8 backdrop-blur-sm animate-fade-in">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-primary-300">
                AI-Powered Computer Education & IT Platform
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-primary-400" />
            </div>

            {/* Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Your Complete{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">
                  IT Learning
                </span>
              </span>
              {" "}& Services Hub
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Master computer skills, earn industry certifications, get hardware support, and launch your tech career — all in one powerful ecosystem built for India's digital future.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              {highlights.map((h) => (
                <div key={h} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm text-slate-300">{h}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-in fade-in" style={{ animationDelay: "0.4s" }}>
              <Link to={isLoggedIn ? "/dashboard" : "/register"} className="btn-primary text-base px-8 py-4 shadow-indigo-lg">
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setShowDemoVideo(true)}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-200 hover:border-white/30 text-base shadow-lg hover:shadow-indigo-500/10 active:scale-[0.98]"
              >
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-slate-300 ml-1">4.9/5 rating</span>
              </div>
              <div className="h-4 w-px bg-slate-600" />
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-slate-300">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Premium Visual Tech Panel) */}
          <div className="lg:col-span-5 relative hidden lg:block animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -inset-1 bg-gradient-primary rounded-3xl blur opacity-25" />
            <div className="relative glass-card border border-white/10 p-6 shadow-2xl flex flex-col gap-5 bg-slate-950/80 backdrop-blur-2xl">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <span className="text-[10px] font-mono text-slate-500">compupoint_assistant.sh</span>
              </div>

              {/* Course Progress Card */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-white">Academy Progress</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary-300 font-bold">Python Dev</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Course Completed</span>
                    <span>72%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-primary rounded-full" style={{ width: "72%" }} />
                  </div>
                </div>
              </div>

              {/* Service Ticket Mock */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Hardware Diagnostics</p>
                    <p className="text-[10px] text-slate-400">Ticket SR-5001 • HP Pavilion</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold flex-shrink-0">In Progress</span>
              </div>

              {/* AI Coaching Prompt */}
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-primary-300 font-bold">
                  <Brain className="w-3.5 h-3.5" />
                  <span>AI Learning Assistant</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  "I've analyzed your web dev assessment. Let's start with Javascript closures next. Ready?"
                </p>
              </div>
            </div>

            {/* Extra decorative badge */}
            <div className="absolute -bottom-6 -left-6 glass-card p-3 shadow-xl flex items-center gap-2.5 animate-float">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Award className="w-4.5 h-4.5 text-green-400" />
              </div>
              <div>
                <p className="text-[9px] text-slate-400">Placement Success</p>
                <p className="text-xs font-bold text-white">96% Hired</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>

      {/* Demo Video Modal */}
      {showDemoVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg animate-fade-in">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-950/50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                <div>
                  <h3 className="text-lg font-semibold text-white">CompuPoint Platform Walkthrough</h3>
                  <p className="text-xs text-slate-400">Discover AI-powered learning & tech services</p>
                </div>
              </div>
              <button
                onClick={() => setShowDemoVideo(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/EngW7tLk6R8?autoplay=1&rel=0"
                title="CompuPoint Platform Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            {/* Modal Footer / Fast Action Tabs */}
            <div className="p-4 bg-slate-950/40 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-400">Ready to try it yourself?</span>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDemoVideo(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Close Preview
                </button>
                <Link
                  to={isLoggedIn ? "/dashboard" : "/register"}
                  onClick={() => setShowDemoVideo(false)}
                  className="px-4 py-2 text-xs font-semibold bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors shadow-md shadow-primary/20"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
