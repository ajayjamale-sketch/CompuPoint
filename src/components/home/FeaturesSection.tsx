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
  },
  {
    icon: Award,
    title: "Professional Certification Center",
    description: "Industry-recognized certifications with online exams, practice tests, and verified digital badges.",
    color: "cyan",
    tag: "Certify",
  },
  {
    icon: Brain,
    title: "AI Learning Assistant",
    description: "Personalized AI tutor that answers questions, adapts learning paths, and provides career guidance 24/7.",
    color: "blue",
    tag: "AI-Powered",
  },
  {
    icon: Wrench,
    title: "Hardware & Repair Services",
    description: "Complete computer maintenance, on-site support, AMC contracts, and spare parts marketplace.",
    color: "cyan",
    tag: "Services",
  },
  {
    icon: Code2,
    title: "Software Installation & Support",
    description: "Professional software setup, OS installation, remote support, and license management services.",
    color: "blue",
    tag: "Support",
  },
  {
    icon: Globe,
    title: "IT Services Marketplace",
    description: "Connect with freelance IT professionals for web development, networking, and cloud setup services.",
    color: "cyan",
    tag: "Marketplace",
  },
  {
    icon: ShoppingBag,
    title: "Computer Store",
    description: "Curated marketplace for laptops, accessories, networking equipment, and software licenses.",
    color: "blue",
    tag: "Shop",
  },
  {
    icon: Briefcase,
    title: "Career & Placement Hub",
    description: "Resume builder, job portal, internship listings, interview prep, and dedicated placement assistance.",
    color: "cyan",
    tag: "Careers",
  },
  {
    icon: Monitor,
    title: "Institute Management",
    description: "Complete management for training institutes: students, batches, attendance, fees, and performance.",
    color: "blue",
    tag: "Manage",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Powerful insights on learning progress, certification status, service performance, and revenue.",
    color: "cyan",
    tag: "Insights",
  },
  {
    icon: Shield,
    title: "Cybersecurity Training",
    description: "Ethical hacking, network security, and cybersecurity certification programs for professionals.",
    color: "blue",
    tag: "Security",
  },
  {
    icon: GraduationCap,
    title: "Admin & Business Management",
    description: "Comprehensive platform governance with user management, revenue monitoring, and support control.",
    color: "cyan",
    tag: "Admin",
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
            return (
              <div
                key={feature.title}
                className="feature-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                  feature.color === "blue"
                    ? "bg-primary-50 dark:bg-primary-900/30"
                    : "bg-cyan-50 dark:bg-cyan-900/30"
                }`}>
                  <Icon className={`w-5 h-5 ${
                    feature.color === "blue"
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-cyan-600 dark:text-cyan-400"
                  }`} />
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                    {feature.title}
                  </h3>
                  <span className={`tag text-xs flex-shrink-0 ${
                    feature.color === "blue"
                      ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                      : "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                  }`}>
                    {feature.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
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
