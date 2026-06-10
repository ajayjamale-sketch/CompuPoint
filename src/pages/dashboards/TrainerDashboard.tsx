import { useState } from "react";
import {
  LayoutDashboard, BookOpen, Users, Award, BarChart3,
  Plus, Clock, CheckCircle2, Star, Edit3, Zap, FileText, Video
} from "lucide-react";
import { DashboardShell, StatCard, SectionHeader, WelcomeBanner, StatusBadge } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "courses", label: "My Courses", icon: BookOpen, badge: 6 },
  { id: "students", label: "My Students", icon: Users, badge: 142 },
  { id: "assessments", label: "Assessments", icon: FileText, badge: 3 },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const myCourses = [
  { id: "1", title: "Python Programming Masterclass", students: 48, rating: 4.8, status: "active", revenue: 48000, sessions: 24, completed: 18 },
  { id: "2", title: "Web Development Bootcamp", students: 62, rating: 4.9, status: "active", revenue: 62000, sessions: 36, completed: 28 },
  { id: "3", title: "Data Science Fundamentals", students: 32, rating: 4.7, status: "active", revenue: 32000, sessions: 20, completed: 12 },
  { id: "4", title: "JavaScript Advanced Concepts", students: 0, rating: 0, status: "draft", revenue: 0, sessions: 18, completed: 0 },
];

const recentStudents = [
  { name: "Arjun Mehta", course: "Python Programming", progress: 72, lastActive: "2h ago", status: "active" },
  { name: "Priya Shah", course: "Web Development", progress: 45, lastActive: "Yesterday", status: "active" },
  { name: "Rahul Singh", course: "Data Science", progress: 100, lastActive: "3d ago", status: "completed" },
  { name: "Anjali Patel", course: "Python Programming", progress: 28, lastActive: "5d ago", status: "active" },
  { name: "Vikram Kumar", course: "Web Development", progress: 88, lastActive: "1d ago", status: "active" },
];

const pendingAssessments = [
  { title: "Python Mid-Term Exam", course: "Python Programming", submissions: 12, dueDate: "Jan 18, 2026" },
  { title: "React Component Project", course: "Web Development", submissions: 8, dueDate: "Jan 20, 2026" },
  { title: "Data Analysis Assignment", course: "Data Science", submissions: 5, dueDate: "Jan 22, 2026" },
];

const revenueData = [
  { month: "Aug", revenue: 28000 }, { month: "Sep", revenue: 35000 }, { month: "Oct", revenue: 42000 },
  { month: "Nov", revenue: 38000 }, { month: "Dec", revenue: 55000 }, { month: "Jan", revenue: 62000 },
];

const studentPerformance = [
  { course: "Python", avg: 78 }, { course: "Web Dev", avg: 82 }, { course: "Data Sci", avg: 71 },
];

export default function TrainerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  if (!user) return null;

  return (
    <DashboardShell
      sidebarItems={sidebarItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title="Trainer Dashboard"
      roleColor="text-green-600 dark:text-green-400"
      roleBg="bg-green-50 dark:bg-green-900/20"
    >
      {activeTab === "overview" && <OverviewTab user={user} />}
      {activeTab === "courses" && <CoursesTab />}
      {activeTab === "students" && <StudentsTab />}
      {activeTab === "assessments" && <AssessmentsTab />}
      {activeTab === "certificates" && <CertificatesTab />}
      {activeTab === "analytics" && <AnalyticsTab />}

    </DashboardShell>
  );
}

function OverviewTab({ user }: { user: NonNullable<ReturnType<typeof useAuth>["user"]> }) {
  const totalStudents = myCourses.reduce((a, c) => a + c.students, 0);
  const totalRevenue = myCourses.reduce((a, c) => a + c.revenue, 0);
  return (
    <div className="space-y-5">
      <WelcomeBanner name={user.name} message={`You have ${pendingAssessments.length} pending reviews and ${totalStudents} active students this week.`} icon={BookOpen} gradient="from-green-600 to-teal-600" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={BookOpen} label="Active Courses" value={myCourses.filter(c => c.status === "active").length} change="+1 this month" color="green" />
        <StatCard icon={Users} label="Total Students" value={totalStudents} change="+18 this week" color="blue" />
        <StatCard icon={Award} label="Certs Issued" value={87} change="+12 this month" color="purple" />
        <StatCard icon={BarChart3} label="Monthly Revenue" value={`₹${(totalRevenue / 1000).toFixed(0)}K`} change="+24% growth" color="orange" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Revenue This Quarter</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card-base p-4">
          <SectionHeader title="Pending Reviews" subtitle={`${pendingAssessments.length} assessments awaiting grading`} />
          <div className="space-y-2.5">
            {pendingAssessments.map((a) => (
              <div key={a.title} className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-800">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{a.title}</p>
                  <p className="text-[11px] text-slate-400">{a.submissions} submissions • Due {a.dueDate}</p>
                </div>
                <button className="btn-primary text-[11px] px-2.5 py-1 flex-shrink-0">Review</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card-base p-4">
        <SectionHeader title="Recent Student Activity" action={<button className="text-xs text-primary-600 dark:text-primary-400 hover:underline">View all</button>} />
        <div className="divide-y divide-border">
          {recentStudents.slice(0, 4).map((student) => (
            <div key={student.name} className="flex items-center gap-3 py-2.5">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-xs flex-shrink-0">
                {student.name.split(" ")[0][0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 dark:text-white">{student.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{student.course} • {student.lastActive}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                  <div className="h-full bg-green-600 rounded-full" style={{ width: `${student.progress}%` }} />
                </div>
                <span className="text-[10px] text-slate-500">{student.progress}%</span>
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
      <SectionHeader title="My Courses" subtitle="Manage and monitor your teaching content" action={<button className="btn-primary text-xs px-3 py-2"><Plus className="w-3.5 h-3.5" />New Course</button>} />
      <div className="grid sm:grid-cols-2 gap-4">
        {myCourses.map((course) => (
          <div key={course.id} className="card-base p-4 hover:-translate-y-0.5 cursor-pointer">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <Video className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <StatusBadge status={course.status} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{course.title}</h3>
            <div className="grid grid-cols-3 gap-2 mt-3 mb-3">
              <div className="text-center">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{course.students}</p>
                <p className="text-[10px] text-slate-400">Students</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{course.sessions}</p>
                <p className="text-[10px] text-slate-400">Sessions</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-green-600">{course.rating > 0 ? course.rating : "—"}</p>
                <p className="text-[10px] text-slate-400">Rating</p>
              </div>
            </div>
            {course.revenue > 0 && <p className="text-xs font-bold text-green-600 dark:text-green-400">₹{course.revenue.toLocaleString()} earned</p>}
            <div className="flex items-center gap-2 mt-3">
              <button className="flex-1 btn-primary text-xs py-1.5">Manage</button>
              <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs border border-border rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <Edit3 className="w-3 h-3" />Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentsTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="My Students" subtitle={`${recentStudents.length} students across all courses`} />
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Student</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Course</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Progress</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Last Active</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentStudents.map((student) => (
                <tr key={student.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 text-xs font-bold flex-shrink-0">
                        {student.name[0]}
                      </div>
                      <span className="text-xs font-medium text-slate-900 dark:text-white">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{student.course}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: `${student.progress}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-500">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{student.lastActive}</td>
                  <td className="px-4 py-3"><StatusBadge status={student.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AssessmentsTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Assessments & Exams" subtitle="Create and manage student evaluations" action={<button className="btn-primary text-xs px-3 py-2"><Plus className="w-3.5 h-3.5" />New Assessment</button>} />
      <div className="space-y-3">
        {pendingAssessments.map((a) => (
          <div key={a.title} className="card-base p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{a.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{a.course} • Due: {a.dueDate}</p>
                <p className="text-xs font-medium text-yellow-600 dark:text-yellow-400 mt-1">{a.submissions} submissions pending review</p>
              </div>
              <button className="btn-primary text-xs px-3 py-2 flex-shrink-0">Grade Submissions</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificatesTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Certificate Management" subtitle="Issue and manage student certificates" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        <StatCard icon={Award} label="Total Issued" value={87} color="green" />
        <StatCard icon={CheckCircle2} label="This Month" value={12} change="+4 from last" color="blue" />
        <StatCard icon={Clock} label="Pending Issue" value={6} change="Action needed" color="orange" />
      </div>
      <div className="card-base p-4">
        <SectionHeader title="Recent Certificates Issued" />
        <div className="space-y-2.5">
          {["Python Programming Specialist — Arjun Mehta", "Web Dev Professional — Priya Shah", "Data Science Analyst — Vikram Kumar"].map((cert) => (
            <div key={cert} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-xs text-slate-700 dark:text-slate-300">{cert}</span>
              </div>
              <button className="text-xs text-green-600 font-medium hover:underline">View</button>
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
      <SectionHeader title="Teaching Analytics" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Avg Student Score by Course</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={studentPerformance}>
              <XAxis dataKey="course" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Bar dataKey="avg" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
