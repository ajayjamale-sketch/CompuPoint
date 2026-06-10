import { UserPlus, BookOpen, Monitor, Award, Rocket, ArrowRight, Check } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UserPlus,
  BookOpen,
  Monitor,
  Award,
  Rocket,
};

const steps = [
  {
    step: "01",
    title: "Register & Get Assessed",
    description: "Create your profile and take a free skill assessment to identify your strengths, knowledge gaps, and best learning path.",
    icon: "UserPlus",
    details: ["Free skill assessment", "Personalized learning path", "Career goal setting"],
  },
  {
    step: "02",
    title: "Enroll in Courses",
    description: "Choose from 280+ expert-curated courses designed for your skill level, career goals, and industry requirements.",
    icon: "BookOpen",
    details: ["280+ courses available", "All skill levels covered", "Live & recorded sessions"],
  },
  {
    step: "03",
    title: "Learn & Practice",
    description: "Access video lessons, live sessions, hands-on labs, AI-powered guidance, and real-world projects at your pace.",
    icon: "Monitor",
    details: ["24/7 AI learning support", "Hands-on lab projects", "Live doubt sessions"],
  },
  {
    step: "04",
    title: "Get Certified",
    description: "Pass industry-recognized assessments and receive verified digital certificates trusted by top employers.",
    icon: "Award",
    details: ["Industry-recognized badges", "Digital verification", "Employer-trusted credentials"],
  },
  {
    step: "05",
    title: "Launch Your Career",
    description: "Use our job portal, resume builder, and placement assistance to land your dream IT role with confidence.",
    icon: "Rocket",
    details: ["Job portal access", "Resume builder", "Placement assistance"],
  },
];

export default function WorkflowSection() {
  return (
    <section className="section-padding bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="label-badge mb-4 inline-flex">
            <ArrowRight className="w-4 h-4" />
            <span>How It Works</span>
          </div>
          <h2 className="section-heading mb-4">
            Your Journey to
            <br />
            <span className="gradient-text">IT Excellence</span>
          </h2>
          <p className="section-subheading">
            A proven 5-step learning pathway from skill assessment to career placement, designed to maximize your success in the tech industry.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector Line - Desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-20 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = iconMap[step.icon];
              return (
                <div key={step.step} className="flex flex-col items-center text-center group" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Step Circle */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-indigo group-hover:shadow-indigo-lg transition-all duration-300 group-hover:-translate-y-1 relative z-10">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center border-2 border-primary z-20">
                      <span className="text-xs font-bold text-white dark:text-slate-900">{step.step}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-heading font-semibold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-1.5 w-full">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-2 text-left">
                        <div className="w-4 h-4 rounded-full bg-primary-50 dark:bg-primary-950/45 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <span className="text-xs text-slate-600 dark:text-slate-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-card rounded-2xl border border-primary-100/50 dark:border-primary-900/50">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-slate-900 dark:text-white">Ready to start your IT journey?</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Join 125,000+ learners who have transformed their careers with CompuPoint.</p>
            </div>
            <a href="/register" className="btn-primary flex-shrink-0">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
