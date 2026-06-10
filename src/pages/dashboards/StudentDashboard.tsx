import { useState } from "react";
import {
  LayoutDashboard, BookOpen, Award, Briefcase, BarChart3,
  Play, Clock, Star, CheckCircle2, TrendingUp, Zap, Target
} from "lucide-react";
import { DashboardShell, StatCard, SectionHeader, WelcomeBanner, StatusBadge } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { COURSES, CERTIFICATIONS } from "@/constants";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "courses", label: "My Courses", icon: BookOpen, badge: 4 },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "career", label: "Career Hub", icon: Briefcase },
  { id: "analytics", label: "My Progress", icon: BarChart3 },
];

const weeklyData = [
  { day: "Mon", hours: 2.5 }, { day: "Tue", hours: 1.8 }, { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 2.0 }, { day: "Fri", hours: 4.1 }, { day: "Sat", hours: 3.5 }, { day: "Sun", hours: 1.5 },
];

const enrolledCourses = [
  { ...COURSES[0], progress: 72, lastAccessed: "2 hours ago" },
  { ...COURSES[1], progress: 45, lastAccessed: "Yesterday" },
  { ...COURSES[2], progress: 100, lastAccessed: "3 days ago" },
  { ...COURSES[3], progress: 28, lastAccessed: "5 days ago" },
];

const upcomingTests = [
  { title: "Python Fundamentals Exam", date: "Jan 18, 2026", type: "Certification", status: "upcoming" },
  { title: "Web Dev Mid-Term Assessment", date: "Jan 22, 2026", type: "Assessment", status: "upcoming" },
  { title: "MS Office Practical Test", date: "Jan 25, 2026", type: "Practice", status: "scheduled" },
];

const jobRecommendations = [
  { title: "Junior Web Developer", company: "TechStart India", location: "Bangalore", salary: "₹4-6 LPA", match: 88 },
  { title: "Python Developer", company: "DataSoft Solutions", location: "Remote", salary: "₹5-8 LPA", match: 82 },
  { title: "Frontend Developer", company: "WebCraft Labs", location: "Mumbai", salary: "₹3.5-5 LPA", match: 75 },
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  if (!user) return null;

  return (
    <DashboardShell
      sidebarItems={sidebarItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title="Student Dashboard"
      roleColor="text-blue-600 dark:text-blue-400"
      roleBg="bg-blue-50 dark:bg-blue-900/20"
    >
      {activeTab === "overview" && <OverviewTab user={user} />}
      {activeTab === "courses" && <CoursesTab />}
      {activeTab === "certifications" && <CertsTab />}
      {activeTab === "career" && <CareerTab />}
      {activeTab === "analytics" && <AnalyticsTab />}

    </DashboardShell>
  );
}

function OverviewTab({ user }: { user: NonNullable<ReturnType<typeof useAuth>["user"]> }) {
  return (
    <div className="space-y-5">
      <WelcomeBanner name={user.name} message="You have 2 pending assignments and 1 certification due this week." icon={Zap} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={BookOpen} label="Enrolled Courses" value={user.coursesEnrolled} change="+2 this month" color="blue" />
        <StatCard icon={Award} label="Certifications" value={user.certifications} change="+1 earned" color="green" />
        <StatCard icon={Clock} label="Hours Learned" value="47.5h" change="+8.2h this week" color="purple" />
        <StatCard icon={TrendingUp} label="Current Streak" value="12 days" change="Personal best!" color="orange" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Continue Learning */}
        <div className="lg:col-span-2 card-base p-4">
          <SectionHeader title="Continue Learning" action={<button className="text-xs text-primary-600 dark:text-primary-400 hover:underline">View all</button>} />
          <div className="space-y-2.5">
            {enrolledCourses.slice(0, 3).map((course) => (
              <div key={course.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                <img src={course.image} alt={course.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{course.title}</p>
                  <p className="text-[11px] text-slate-400 mb-1.5">{course.lastAccessed}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full">
                      <div className={cn("h-full rounded-full", course.progress === 100 ? "bg-green-500" : "bg-primary-600")} style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{course.progress}%</span>
                  </div>
                </div>
                {course.progress === 100 ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> : <Play className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* Streak + Points */}
        <div className="space-y-3">
          <div className="card-base p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-slate-900 dark:text-white">Weekly Activity</h3>
              <span className="text-xs text-slate-400">hrs/day</span>
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="hours" stroke="#2563EB" strokeWidth={2} fill="url(#actGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="card-base p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center mx-auto mb-2">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{user.points.toLocaleString()}</p>
            <p className="text-xs text-slate-500">CompuPoints</p>
            <div className="mt-2 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" style={{ width: "68%" }} />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">1,160 pts to next level</p>
          </div>
        </div>
      </div>

      {/* Upcoming Assessments */}
      <div className="card-base p-4">
        <SectionHeader title="Upcoming Assessments" subtitle="Don't miss your scheduled tests" />
        <div className="grid sm:grid-cols-3 gap-3">
          {upcomingTests.map((test) => (
            <div key={test.title} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <Target className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">{test.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{test.date}</p>
                <span className="tag text-[10px] mt-1.5">{test.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoursesTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="My Courses" subtitle={`${enrolledCourses.length} courses enrolled`} action={<Link to="/features#courses" className="btn-primary text-xs px-3 py-2">Browse Courses</Link>} />
      <div className="grid sm:grid-cols-2 gap-4">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="card-base overflow-hidden hover:-translate-y-0.5 cursor-pointer">
            <div className="relative">
              <img src={course.image} alt={course.title} className="w-full h-36 object-cover" />
              <div className="absolute top-2 right-2">
                <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full", course.progress === 100 ? "bg-green-500 text-white" : "bg-primary-600 text-white")}>
                  {course.progress === 100 ? "Completed" : "In Progress"}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{course.title}</h3>
              <p className="text-xs text-slate-400 mb-3">{course.instructor} • {course.duration}</p>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                  <div className={cn("h-full rounded-full", course.progress === 100 ? "bg-green-500" : "bg-primary-600")} style={{ width: `${course.progress}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{course.progress}%</span>
              </div>
              <button className="btn-primary w-full text-xs py-2">
                {course.progress === 100 ? "View Certificate" : "Continue Learning"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertsTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="My Certifications" subtitle="Industry-recognized credentials" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CERTIFICATIONS.map((cert) => (
          <div key={cert.id} className="card-base p-5">
            <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-4">
              <Award className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 leading-snug">{cert.title}</h3>
            <p className="text-xs text-slate-400 mb-1">Issued: {cert.issueDate}</p>
            <p className="text-[10px] font-mono text-slate-400 mb-3">{cert.credentialId}</p>
            <div className="flex items-center justify-between">
              <StatusBadge status={cert.status} />
              <button className="text-xs text-primary-600 dark:text-primary-400 font-medium hover:underline">Download PDF</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CareerTab() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Career Hub" subtitle="Opportunities matched to your skills" />
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Briefcase, title: "Resume Builder", desc: "AI-powered resume tailored for IT roles.", action: "Build Resume", color: "blue" as const },
          { icon: Star, title: "Mock Interviews", desc: "Practice with AI and get instant feedback.", action: "Start Practice", color: "purple" as const },
          { icon: TrendingUp, title: "Skill Gap Analysis", desc: "Know exactly what to learn next.", action: "Analyse Skills", color: "cyan" as const },
        ].map(({ icon: Icon, title, desc, action, color }) => (
          <div key={title} className="card-base p-4">
            <StatCard icon={Icon} label={desc} value="" color={color} />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1 mt-3">{title}</h3>
            <button className="btn-primary text-xs px-3 py-2 mt-2">{action}</button>
          </div>
        ))}
      </div>
      <div className="card-base p-4">
        <SectionHeader title="Job Recommendations" subtitle="Matched based on your skills & certificates" />
        <div className="space-y-3">
          {jobRecommendations.map((job) => (
            <div key={job.title} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{job.title}</p>
                <p className="text-xs text-slate-400">{job.company} • {job.location}</p>
                <p className="text-xs font-medium text-green-600 dark:text-green-400 mt-0.5">{job.salary}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{job.match}%</div>
                <p className="text-[10px] text-slate-400">match</p>
                <button className="btn-primary text-[11px] px-2.5 py-1 mt-1">Apply</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-5">
      <SectionHeader title="My Learning Analytics" subtitle="Track your progress and performance" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Weekly Learning Hours</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="anaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Area type="monotone" dataKey="hours" stroke="#2563EB" strokeWidth={2} fill="url(#anaGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Career Readiness Score</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-100 dark:text-slate-700" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="68 100" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-slate-900 dark:text-white">68%</span>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              {[{ l: "Technical Skills", v: 75 }, { l: "Certifications", v: 60 }, { l: "Projects", v: 55 }, { l: "Soft Skills", v: 80 }].map(({ l, v }) => (
                <div key={l}>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-500 dark:text-slate-400">{l}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{v}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
