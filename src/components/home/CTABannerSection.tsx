import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Award, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const highlights = [
  { icon: Shield, text: "No credit card required" },
  { icon: Zap, text: "Set up in 2 minutes" },
  { icon: Award, text: "Cancel anytime" },
  { icon: Users, text: "Join 125K+ learners" },
];

export default function CTABannerSection() {
  const { isLoggedIn } = useAuth();
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-primary-700 to-slate-800 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/20 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-semibold mb-8 backdrop-blur-sm">
          <Zap className="w-4 h-4 text-yellow-300" />
          Start Your Free Trial Today
        </div>

        {/* Heading */}
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Transform Your
          <br />
          <span className="text-cyan-300">IT Career?</span>
        </h2>

        <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto mb-10">
          Join over 125,000 students and professionals who have built successful IT careers with CompuPoint. Start with a 7-day free trial — no commitment needed.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            to={isLoggedIn ? "/dashboard" : "/register"}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 hover:bg-blue-50 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 text-base"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-all duration-200 text-base"
          >
            Talk to Sales
          </Link>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {highlights.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-blue-100">
              <Icon className="w-4 h-4 text-cyan-300 flex-shrink-0" />
              <span className="text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
