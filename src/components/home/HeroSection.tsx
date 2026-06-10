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
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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
          backgroundImage: `linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/20 border border-primary-500/30 rounded-full mb-8 backdrop-blur-sm animate-fade-in">
            <Zap className="w-4 h-4 text-accent-400" />
            <span className="text-sm font-semibold text-primary-300">
              AI-Powered Computer Education Platform
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-primary-400" />
          </div>

          {/* Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Your Complete{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-400 flex-shrink-0" />
                <span className="text-sm text-slate-300">{h}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/register" className="btn-primary text-base px-8 py-4 shadow-blue-lg">
              Start Learning Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-200 hover:border-white/30 text-base">
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
                <Icon className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium text-slate-300">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Stats Cards */}
        <div className="absolute bottom-8 right-4 lg:right-8 hidden lg:flex flex-col gap-3">
          <div className="glass-card px-4 py-3 flex items-center gap-3 animate-float">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Placement Rate</p>
              <p className="text-sm font-bold text-white">96%</p>
            </div>
          </div>
          <div className="glass-card px-4 py-3 flex items-center gap-3 animate-float" style={{ animationDelay: "1.5s" }}>
            <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-primary-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Active Learners</p>
              <p className="text-sm font-bold text-white">125K+</p>
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
    </section>
  );
}
