import { Link } from "react-router-dom";
import { Users, Target, Award, Globe, BookOpen, Wrench, Brain, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import AnimatedCounter from "@/components/features/AnimatedCounter";

const team = [
  { name: "Rajesh Krishnamurthy", role: "CEO & Founder", bio: "15+ years in IT education and enterprise technology solutions.", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face" },
  { name: "Priya Nambiar", role: "Head of Education", bio: "Former NASSCOM educator with expertise in digital curriculum design.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face" },
  { name: "Vikram Acharya", role: "CTO", bio: "Ex-Infosys architect leading our AI-powered learning infrastructure.", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face" },
  { name: "Ananya Iyer", role: "Director of Services", bio: "Certified IT service manager overseeing hardware and support operations.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face" },
];

const milestones = [
  { year: "2018", event: "CompuPoint founded in Bangalore with 5 courses and 50 students" },
  { year: "2019", event: "Expanded to 10 cities, launched professional certification programs" },
  { year: "2020", event: "Launched online learning platform, grew to 10,000+ students" },
  { year: "2021", event: "Introduced hardware repair services and IT marketplace" },
  { year: "2022", event: "Enterprise training solutions, 50,000+ students milestone" },
  { year: "2023", event: "AI Learning Assistant launched, 100,000+ certifications issued" },
  { year: "2024", event: "Career placement hub launched, 96% placement success rate" },
  { year: "2025", event: "125,000+ students, expanded to 25+ cities across India" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(#6366F1 1px, transparent 1px), linear-gradient(90deg, #6366F1 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="label-badge mb-4 inline-flex bg-primary-900/40 border-primary-700 text-primary-400">
            <Users className="w-4 h-4" />
            <span>Our Story</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Empowering India's
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Digital Workforce
            </span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Since 2018, CompuPoint has been on a mission to make quality IT education accessible, practical, and career-focused for every Indian student and professional.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-white dark:bg-slate-900 border-b border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: 125000, suffix: "+", label: "Students Trained" },
            { value: 280, suffix: "+", label: "Courses Available" },
            { value: 89000, suffix: "+", label: "Certifications Issued" },
            { value: 25, suffix: "+", label: "Cities Covered" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-primary-600 dark:text-primary-400">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Target, title: "Our Mission", text: "To provide accessible, high-quality computer education and IT services that transform students into skilled professionals, equipped to thrive in India's digital economy. We bridge the gap between theoretical knowledge and industry requirements through practical, hands-on learning experiences.", color: "blue" },
              { icon: Globe, title: "Our Vision", text: "To become India's most trusted technology education and IT services ecosystem, enabling 1 million skilled IT professionals by 2030. We envision a future where quality tech education is available to every student, regardless of geography or economic background.", color: "cyan" },
            ].map(({ icon: Icon, title, text, color }) => (
              <div key={title} className="card-base p-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${color === "blue" ? "bg-primary-50 dark:bg-primary-900/30" : "bg-cyan-50 dark:bg-cyan-900/30"}`}>
                  <Icon className={`w-6 h-6 ${color === "blue" ? "text-primary-600 dark:text-primary-400" : "text-cyan-600 dark:text-cyan-400"}`} />
                </div>
                <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3">{title}</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">What We Offer</h2>
            <p className="section-subheading">A comprehensive ecosystem for all your IT education and service needs.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: BookOpen, title: "Education Academy", desc: "280+ courses from basic computing to advanced programming and certifications." },
              { icon: Award, title: "Certifications", desc: "Industry-recognized credentials validated by top employers across India." },
              { icon: Brain, title: "AI Learning", desc: "Personalized AI assistant for doubt resolution, career guidance, and learning support." },
              { icon: Wrench, title: "Hardware Services", desc: "Complete computer repair, maintenance, AMC contracts, and spare parts marketplace." },
              { icon: TrendingUp, title: "Career Hub", desc: "Resume builder, job portal, internship listings, and placement assistance." },
              { icon: Globe, title: "IT Marketplace", desc: "Connect with verified IT professionals for web development, networking, and cloud services." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="feature-card p-5">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1.5">{title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-slate-900 dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">Our Journey</h2>
            <p className="text-slate-400">Seven years of building India's most comprehensive IT education platform.</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-primary-800" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex items-start gap-6 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                    <div className="inline-flex flex-col sm:inline-block">
                      <span className="text-sm font-bold text-primary-400 mb-1">{m.year}</span>
                      <p className="text-sm text-slate-300 leading-relaxed max-w-xs">{m.event}</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-primary-600 flex-shrink-0 mt-1.5 relative z-10 ring-4 ring-slate-900" />
                  <div className="flex-1 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Meet Our Leadership</h2>
            <p className="section-subheading">Experienced professionals passionate about technology education and career growth.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card-base p-5 text-center hover:-translate-y-1">
                <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-2xl object-cover mx-auto mb-4" />
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-2">{member.role}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Quality First", desc: "Every course, certification, and service meets the highest industry standards." },
              { title: "Accessible Education", desc: "Technology education should be available to all, regardless of background or location." },
              { title: "Practical Learning", desc: "Hands-on projects and real-world applications over theoretical knowledge alone." },
              { title: "Career Outcomes", desc: "Our success is measured by the careers we help build, not just courses completed." },
              { title: "Student Community", desc: "Building a supportive peer network for lifelong learning and professional growth." },
              { title: "Continuous Innovation", desc: "Constantly evolving our platform with the latest technology and industry trends." },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-3 p-4 card-base">
                <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">{title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-600 to-accent-600 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">Join Our Growing Community</h2>
          <p className="text-blue-100 mb-8">Start your IT journey today with CompuPoint's comprehensive platform.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-600 font-bold rounded-xl hover:bg-slate-100 transition-all">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
