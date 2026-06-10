import { Link } from "react-router-dom";
import {
  GraduationCap,
  Award,
  Brain,
  Wrench,
  Code2,
  ShoppingBag,
  Briefcase,
  BarChart3,
  ArrowRight,
  Monitor,
  Globe,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Computer Education Academy",
    description: "280+ structured courses from Basic Computing to Advanced Programming, taught by industry experts.",
    color: "blue",
    tag: "Learn",
    to: "/features#education",
  },
  {
    icon: Award,
    title: "Professional Certification Center",
    description: "Industry-recognized certifications with online exams, practice tests, and verified digital badges.",
    color: "cyan",
    tag: "Certify",
    to: "/features#certification",
  },
  {
    icon: Brain,
    title: "AI Learning Assistant",
    description: "Personalized AI tutor that answers questions, adapts learning paths, and provides career guidance 24/7.",
    color: "blue",
    tag: "AI-Powered",
    to: "/features#ai",
  },
  {
    icon: Wrench,
    title: "Hardware & Repair Services",
    description: "Complete computer maintenance, on-site support, AMC contracts, and spare parts marketplace.",
    color: "cyan",
    tag: "Services",
    to: "/features#services",
  },
  {
    icon: Code2,
    title: "Software Installation & Support",
    description: "Professional software setup, OS installation, remote support, and license management services.",
    color: "blue",
    tag: "Support",
    to: "/features#services",
  },
  {
    icon: Globe,
    title: "IT Services Marketplace",
    description: "Connect with freelance IT professionals for web development, networking, and cloud setup services.",
    color: "cyan",
    tag: "Marketplace",
    to: "/features#services",
  },
  {
    icon: ShoppingBag,
    title: "Computer Store",
    description: "Curated marketplace for laptops, accessories, networking equipment, and software licenses.",
    color: "blue",
    tag: "Shop",
    to: "/features#services",
  },
  {
    icon: Briefcase,
    title: "Career & Placement Hub",
    description: "Resume builder, job portal, internship listings, interview prep, and dedicated placement assistance.",
    color: "cyan",
    tag: "Careers",
    to: "/features#career",
  },
  {
    icon: Monitor,
    title: "Institute Management",
    description: "Complete management for training institutes: students, batches, attendance, fees, and performance.",
    color: "blue",
    tag: "Manage",
    to: "/features#education",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Powerful insights on learning progress, certification status, service performance, and revenue.",
    color: "cyan",
    tag: "Insights",
    to: "/features#education",
  },
  {
    icon: Shield,
    title: "Cybersecurity Training",
    description: "Ethical hacking, network security, and cybersecurity certification programs for professionals.",
    color: "blue",
    tag: "Security",
    to: "/features#education",
  },
  {
    icon: GraduationCap,
    title: "Admin & Business Management",
    description: "Comprehensive platform governance with user management, revenue monitoring, and support control.",
    color: "cyan",
    tag: "Admin",
    to: "/features#education",
  },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="label-badge mb-4 inline-flex">
            <Award className="w-4 h-4" />
            <span>All-in-One Platform</span>
          </div>
          <h2 className="section-heading mb-4">
            Everything You Need to
            <br />
            <span className="gradient-text">Succeed in Technology</span>
          </h2>
          <p className="section-subheading">
            From learning and certification to services and career growth — CompuPoint brings together every tool you need in one seamless platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isPrimaryColor = feature.color === "blue";
            return (
              <Link
                key={feature.title}
                to={feature.to}
                className="card-base p-6 hover:-translate-y-1 cursor-pointer group transition-all duration-300 relative overflow-hidden bg-card border border-border/60 hover:border-primary/20 block"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                  isPrimaryColor
                    ? "bg-primary-50 dark:bg-primary-900/20"
                    : "bg-accent-50 dark:bg-accent/10"
                }`}>
                  <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:rotate-6 ${
                    isPrimaryColor
                      ? "text-primary"
                      : "text-accent"
                  }`} />
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <span className={`tag text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${
                    isPrimaryColor
                      ? "bg-primary-50 dark:bg-primary-900/20 text-primary"
                      : "bg-accent-50 dark:bg-accent/10 text-accent-600 dark:text-accent-400"
                  }`}>
                    {feature.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/features" className="btn-primary px-8 py-3.5">
            Explore All Features
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
