import { useState } from "react";
import {
  LayoutDashboard, BookOpen, Award, Briefcase, BarChart3,
  TrendingUp, Star, Code2, Target, Globe, CheckCircle2, Zap
} from "lucide-react";
import { DashboardShell, StatCard, SectionHeader, WelcomeBanner, StatusBadge } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { COURSES, CERTIFICATIONS } from "@/constants";
import { cn } from "@/lib/utils";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "skills", label: "Skill Roadmap", icon: Target },
  { id: "certifications", label: "Certifications", icon: Award, badge: 5 },
  { id: "portfolio", label: "Portfolio", icon: Code2 },
  { id: "career", label: "Career Ops", icon: Briefcase },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const skillData = [
  { skill: "JavaScript", current: 85, target: 95 },
  { skill: "React", current: 78, target: 90 },
  { skill: "Node.js", current: 65, target: 85 },
  { skill: "Cloud AWS", current: 45, target: 80 },
  { skill: "DevOps", current: 50, target: 75 },
  { skill: "TypeScript", current: 70, target: 90 },
];

const radarData = [
  { subject: "Frontend", A: 85 }, { subject: "Backend", A: 68 }, { subject: "DevOps", A: 50 },
  { subject: "Security", A: 55 }, { subject: "Cloud", A: 45 }, { subject: "Database", A: 72 },
];

const salaryData = [
  { year: "2022", salary: 6 }, { year: "2023", salary: 8 }, { year: "2024", salary: 10 },
  { year: "2025", salary: 12 }, { year: "2026", salary: 14 },
];

const portfolio = [
  { name: "E-Commerce Platform", tech: "React, Node.js, MongoDB", status: "Live", views: 1240 },
  { name: "AI Chat Application", tech: "Python, FastAPI, OpenAI", status: "Live", views: 890 },
  { name: "DevOps CI/CD Pipeline", tech: "Docker, Jenkins, AWS", status: "Private", views: 320 },
];

const careerOps = [
  { title: "Senior React Developer", company: "Flipkart", type: "Full-time", salary: "₹18-24 LPA", match: 92 },
  { title: "Full-Stack Engineer", company: "Razorpay", type: "Full-time", salary: "₹20-28 LPA", match: 85 },
  { title: "Cloud Architect", company: "Wipro", type: "Contract", salary: "₹25-35 LPA", match: 71 },
];

export default function ProfessionalDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  if (!user) return null;

  return (
    <DashboardShell
      sidebarItems={sidebarItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title="Professional Dashboard"
      roleColor="text-purple-600 dark:text-purple-400"
      roleBg="bg-purple-50 dark:bg-purple-900/20"
    >
      {activeTab === "overview" && <OverviewTab user={user} />}
      {activeTab === "skills" && <SkillsTab />}
      {activeTab === "certifications" && <CertsTab />}
      {activeTab === "portfolio" && <PortfolioTab />}
      {activeTab === "career" && <CareerTab />}
      {activeTab === "analytics" && <AnalyticsTab />}

    </DashboardShell>
  );
}

function OverviewTab({ user }: { user: NonNullable<ReturnType<typeof useAuth>["user"]> }) {
  return (
    <div className="space-y-5">
      <WelcomeBanner name={user.name} message={`${user.organization} • ${user.specialization} • Level 3 Professional`} icon={Zap} gradient="from-purple-600 to-indigo-600" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Award} label="Certifications" value={user.certifications} change="2 expiring soon" color="purple" />
        <StatCard icon={BookOpen} label="Courses Active" value={user.coursesEnrolled} change="+3 this quarter" color="blue" />
        <StatCard icon={TrendingUp} label="Salary Growth" value="+32%" change="Since joining" color="green" />
        <StatCard icon={Star} label="Skill Score" value="84/100" change="Top 8% nationally" color="orange" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-4">Skill Radar</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <Radar name="Skills" dataKey="A" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-4">Salary Trajectory (LPA)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salaryData}>
              <XAxis dataKey="year" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="salary" stroke="#7c3aed" strokeWidth={2.5} dot={{ fill: "#7c3aed", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card-base p-4">
        <SectionHeader title="Top Career Opportunities" subtitle="High-match openings based on your profile" />
        <div className="space-y-2.5">
          {careerOps.map((job) => (
            <div key={job.title} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">{job.title}</p>
                <p className="text-[11px] text-slate-400">{job.company} • {job.type}</p>
                <p className="text-xs font-medium text-green-600 dark:text-green-400">{job.salary}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-bold text-purple-600 dark:text-purple-400">{job.match}% match</div>
                <button className="btn-primary text-[11px] px-2.5 py-1 mt-1">Apply Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillsTab() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Skill Development Roadmap" subtitle="Close your skill gaps to reach your target role" />
      <div className="space-y-3">
        {skillData.map((skill) => {
          const gap = skill.target - skill.current;
          return (
            <div key={skill.skill} className="card-base p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{skill.skill}</span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500">Current: <span className="font-bold text-purple-600">{skill.current}%</span></span>
                  <span className="text-slate-500">Target: <span className="font-bold text-green-600">{skill.target}%</span></span>
                  <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", gap > 20 ? "bg-red-50 text-red-600" : gap > 10 ? "bg-yellow-50 text-yellow-600" : "bg-green-50 text-green-600")}>
                    Gap: {gap}%
                  </span>
                </div>
              </div>
              <div className="relative h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                <div className="absolute h-full bg-purple-600 rounded-full" style={{ width: `${skill.current}%` }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 border-2 border-green-500 bg-white rounded-full" style={{ left: `${skill.target}%` }} />
              </div>
              {gap > 0 && (
                <button className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-2 hover:underline">
                  Find courses to close gap →
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CertsTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Certifications Portfolio" subtitle="Your professional credentials" />
      <div className="grid sm:grid-cols-2 gap-4">
        {CERTIFICATIONS.map((cert) => (
          <div key={cert.id} className="card-base p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{cert.title}</h3>
                <p className="text-xs text-slate-400 mb-2">{cert.issueDate} • {cert.credentialId}</p>
                <div className="flex items-center gap-2">
                  <StatusBadge status={cert.status} />
                  <button className="text-xs text-purple-600 font-medium hover:underline">Share</button>
                  <button className="text-xs text-purple-600 font-medium hover:underline">Download</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="card-base p-5 border-dashed border-2 text-center flex flex-col items-center justify-center min-h-[120px] hover:border-purple-400 transition-colors cursor-pointer">
          <Award className="w-8 h-8 text-purple-300 mb-2" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Add New Certification</p>
          <p className="text-xs text-slate-400">Attempt a new exam</p>
        </div>
      </div>
    </div>
  );
}

function PortfolioTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Portfolio Projects" subtitle="Showcase your work to employers" action={<button className="btn-primary text-xs px-3 py-2">Add Project</button>} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolio.map((project) => (
          <div key={project.name} className="card-base p-4 hover:-translate-y-0.5 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center mb-3">
              <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{project.name}</h3>
            <p className="text-xs text-slate-400 mb-3">{project.tech}</p>
            <div className="flex items-center justify-between">
              <StatusBadge status={project.status.toLowerCase()} />
              <span className="text-xs text-slate-400">{project.views} views</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CareerTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Career Opportunities" subtitle="Matched opportunities for your profile" />
      <div className="space-y-3">
        {careerOps.map((job) => (
          <div key={job.title} className="card-base p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{job.title}</h3>
                  <span className="tag text-[10px]">{job.type}</span>
                </div>
                <p className="text-xs text-slate-400">{job.company}</p>
                <p className="text-sm font-bold text-green-600 dark:text-green-400 mt-1">{job.salary}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{job.match}%</div>
                <p className="text-[10px] text-slate-400">match score</p>
                <button className="btn-primary text-xs px-3 py-1.5 mt-2">Apply Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Professional Analytics" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Skill Coverage</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <Radar name="Skills" dataKey="A" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Salary Progression</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={salaryData}>
              <XAxis dataKey="year" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="salary" stroke="#7c3aed" strokeWidth={2.5} dot={{ fill: "#7c3aed", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
