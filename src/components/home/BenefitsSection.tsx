import { BadgeCheck, Brain, GraduationCap, Code2, Wrench, Briefcase, TrendingUp, Clock, Globe, BookOpen } from "lucide-react";
import AnimatedCounter from "@/components/features/AnimatedCounter";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BadgeCheck, Brain, GraduationCap, Code2, Wrench, Briefcase,
};

const benefits = [
  { title: "Industry-Recognized Certifications", description: "Earn certifications trusted and recognized by top employers across India and globally, with digital verification.", icon: "BadgeCheck", color: "blue" },
  { title: "AI-Powered Learning", description: "Personalized study paths, instant doubt resolution, and smart progress tracking with our advanced AI assistant.", icon: "Brain", color: "cyan" },
  { title: "Expert Instructors", description: "Learn from industry veterans with 10+ years of hands-on experience, real-world insights, and mentoring support.", icon: "GraduationCap", color: "blue" },
  { title: "Hands-On Projects", description: "Build a professional portfolio with real-world projects that demonstrate practical skills to employers.", icon: "Code2", color: "cyan" },
  { title: "Hardware & Repair Services", description: "Complete computer maintenance, repair, AMC contracts, and support services available on-site and remotely.", icon: "Wrench", color: "blue" },
  { title: "Career Placement Support", description: "Resume building, interview preparation, job matching, internships, and dedicated placement assistance.", icon: "Briefcase", color: "cyan" },
];

const stats = [
  { value: 125000, suffix: "+", label: "Students Trained", icon: GraduationCap },
  { value: 280, suffix: "+", label: "Courses Available", icon: BookOpen },
  { value: 89000, suffix: "+", label: "Certifications Issued", icon: BadgeCheck },
  { value: 96, suffix: "%", label: "Placement Success Rate", icon: TrendingUp },
];

export default function BenefitsSection() {
  return (
    <section className="section-padding bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary-600/20 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-primary-400" />
                </div>
                <div className="text-3xl font-heading font-bold text-white mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Header + Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-900/40 border border-primary-700 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-semibold text-primary-400">Why CompuPoint?</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Built for Real-World
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">
                IT Success
              </span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8 text-lg">
              CompuPoint is not just a learning platform — it's a complete ecosystem for computer education, IT services, career development, and business growth.
            </p>
            <div className="space-y-4">
              {[
                { icon: Clock, text: "Learn at your own pace with lifetime access to course materials" },
                { icon: Globe, text: "Access from anywhere on mobile, tablet, or desktop" },
                { icon: BadgeCheck, text: "Certificates verified and trusted by 5000+ companies" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-primary-400" />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit) => {
              const Icon = iconMap[benefit.icon];
              return (
                <div
                  key={benefit.title}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-300 group hover:-translate-y-0.5"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 ${benefit.color === "blue" ? "bg-primary-600/20" : "bg-cyan-600/20"}`}>
                    <Icon className={`w-5 h-5 ${benefit.color === "blue" ? "text-primary-400" : "text-cyan-400"}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
