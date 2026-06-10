import { useState } from "react";
import {
  LayoutDashboard, Users, BookOpen, Award, BarChart3,
  Plus, DollarSign, ClipboardList, Zap, TrendingUp, CheckCircle2, Clock
} from "lucide-react";
import { DashboardShell, StatCard, SectionHeader, WelcomeBanner, StatusBadge } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users, badge: 512 },
  { id: "batches", label: "Batches", icon: BookOpen, badge: 12 },
  { id: "attendance", label: "Attendance", icon: ClipboardList },
  { id: "fees", label: "Fee Management", icon: DollarSign },
  { id: "reports", label: "Reports", icon: BarChart3 },
];

const activeBatches = [
  { id: "B-2601", name: "Full-Stack Web Dev", course: "Web Development", students: 45, instructor: "Rahul Sharma", startDate: "Jan 2, 2026", endDate: "Apr 30, 2026", progress: 42, status: "active" },
  { id: "B-2602", name: "Python Programming", course: "Python", students: 38, instructor: "Priya Patel", startDate: "Jan 5, 2026", endDate: "Mar 15, 2026", progress: 65, status: "active" },
  { id: "B-2603", name: "MS Office Mastery", course: "MS Office", students: 52, instructor: "Amit Kumar", startDate: "Dec 15, 2025", endDate: "Feb 28, 2026", progress: 78, status: "active" },
  { id: "B-2604", name: "Tally & GST", course: "Tally Prime", students: 40, instructor: "Sunita Verma", startDate: "Dec 20, 2025", endDate: "Mar 5, 2026", progress: 55, status: "active" },
  { id: "B-2605", name: "Digital Marketing", course: "Digital Marketing", students: 35, instructor: "Vikram Joshi", startDate: "Nov 1, 2025", endDate: "Jan 31, 2026", progress: 95, status: "completing" },
];

const recentStudents = [
  { id: "STU-1201", name: "Arjun Mehta", batch: "Full-Stack Web Dev", fees: "Paid", attendance: 92, grade: "A", status: "active" },
  { id: "STU-1202", name: "Priya Shah", batch: "Python Programming", fees: "Pending", attendance: 78, grade: "B+", status: "active" },
  { id: "STU-1203", name: "Rahul Singh", batch: "MS Office Mastery", fees: "Paid", attendance: 88, grade: "A", status: "active" },
  { id: "STU-1204", name: "Anjali Patel", batch: "Tally & GST", fees: "Overdue", attendance: 65, grade: "B", status: "warning" },
  { id: "STU-1205", name: "Vikram Kumar", batch: "Digital Marketing", fees: "Paid", attendance: 95, grade: "A+", status: "active" },
];

const feeData = [
  { month: "Sep", collected: 320000, pending: 45000 },
  { month: "Oct", collected: 380000, pending: 62000 },
  { month: "Nov", collected: 410000, pending: 38000 },
  { month: "Dec", collected: 350000, pending: 55000 },
  { month: "Jan", collected: 420000, pending: 40000 },
];

const attendanceTrend = [
  { week: "W1", avg: 88 }, { week: "W2", avg: 85 }, { week: "W3", avg: 91 },
  { week: "W4", avg: 87 }, { week: "W5", avg: 93 },
];

const upcomingEvents = [
  { title: "Python Mid-Term Exams", date: "Jan 18, 2026", batch: "B-2602", type: "exam" },
  { title: "Web Dev Project Demo", date: "Jan 25, 2026", batch: "B-2601", type: "demo" },
  { title: "MS Office Batch Graduation", date: "Feb 28, 2026", batch: "B-2603", type: "graduation" },
  { title: "New Batch Orientation", date: "Feb 3, 2026", batch: "B-2606", type: "orientation" },
];

export default function InstituteDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  if (!user) return null;

  return (
    <DashboardShell
      sidebarItems={sidebarItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title="Institute Dashboard"
      roleColor="text-indigo-600 dark:text-indigo-400"
      roleBg="bg-indigo-50 dark:bg-indigo-900/20"
    >
      {activeTab === "overview" && <OverviewTab user={user} />}
      {activeTab === "students" && <StudentsTab />}
      {activeTab === "batches" && <BatchesTab />}
      {activeTab === "attendance" && <AttendanceTab />}
      {activeTab === "fees" && <FeesTab />}
      {activeTab === "reports" && <ReportsTab />}

    </DashboardShell>
  );
}

function OverviewTab({ user }: { user: NonNullable<ReturnType<typeof useAuth>["user"]> }) {
  return (
    <div className="space-y-5">
      <WelcomeBanner name={user.name} message={`${user.organization} • 512 students • 12 active batches • Fee collection ₹4.2L this month`} icon={Zap} gradient="from-indigo-600 to-violet-600" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Users} label="Total Students" value={512} change="+28 this month" color="indigo" />
        <StatCard icon={BookOpen} label="Active Batches" value={12} change="5 completing soon" color="blue" />
        <StatCard icon={Award} label="Certs Issued" value={248} change="+32 this month" color="green" />
        <StatCard icon={DollarSign} label="Fee Collection" value="₹4.2L" change="+18% vs last" color="purple" />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card-base p-4">
          <SectionHeader title="Active Batches" subtitle={`${activeBatches.length} batches running`} action={<button className="btn-primary text-xs px-3 py-2"><Plus className="w-3.5 h-3.5" />New Batch</button>} />
          <div className="space-y-2.5">
            {activeBatches.slice(0, 4).map((batch) => (
              <div key={batch.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{batch.name}</p>
                    <StatusBadge status={batch.status} />
                  </div>
                  <p className="text-[11px] text-slate-400">{batch.instructor} • {batch.students} students</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${batch.progress}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-500">{batch.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="card-base p-4">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Upcoming Events</h3>
            <div className="space-y-2.5">
              {upcomingEvents.map((ev) => (
                <div key={ev.title} className="flex items-start gap-2.5">
                  <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                    ev.type === "exam" ? "bg-red-500" : ev.type === "graduation" ? "bg-green-500" : ev.type === "demo" ? "bg-blue-500" : "bg-yellow-500"
                  )} />
                  <div>
                    <p className="text-xs font-medium text-slate-900 dark:text-white leading-tight">{ev.title}</p>
                    <p className="text-[11px] text-slate-400">{ev.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-base p-4">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Attendance Trend</h3>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={attendanceTrend}>
                <XAxis dataKey="week" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="avg" stroke="#6366f1" strokeWidth={2} dot={{ fill: "#6366f1", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentsTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Student Management" subtitle={`${recentStudents.length} students shown`} action={<button className="btn-primary text-xs px-3 py-2"><Plus className="w-3.5 h-3.5" />Enroll Student</button>} />
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-slate-50 dark:bg-slate-800/50">
                {["Student", "Batch", "Attendance", "Fees", "Grade", "Status"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold flex-shrink-0">
                        {s.name[0]}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-900 dark:text-white">{s.name}</p>
                        <p className="text-[10px] text-slate-400">{s.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{s.batch}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs font-semibold", s.attendance >= 85 ? "text-green-600" : s.attendance >= 75 ? "text-yellow-600" : "text-red-600")}>
                      {s.attendance}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full",
                      s.fees === "Paid" ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" :
                      s.fees === "Pending" ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400" :
                      "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                    )}>
                      {s.fees}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-indigo-600 dark:text-indigo-400">{s.grade}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BatchesTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Batch Management" subtitle="All active and upcoming batches" action={<button className="btn-primary text-xs px-3 py-2"><Plus className="w-3.5 h-3.5" />Create Batch</button>} />
      <div className="grid sm:grid-cols-2 gap-4">
        {activeBatches.map((batch) => (
          <div key={batch.id} className="card-base p-4 hover:-translate-y-0.5 cursor-pointer">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{batch.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{batch.course} • {batch.id}</p>
              </div>
              <StatusBadge status={batch.status} />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-center">
              <div><p className="text-sm font-bold text-slate-900 dark:text-white">{batch.students}</p><p className="text-[10px] text-slate-400">Students</p></div>
              <div><p className="text-sm font-bold text-slate-900 dark:text-white">{batch.progress}%</p><p className="text-[10px] text-slate-400">Progress</p></div>
              <div><p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 leading-tight">{batch.instructor.split(" ")[0]}</p><p className="text-[10px] text-slate-400">Trainer</p></div>
            </div>
            <div className="mb-3">
              <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${batch.progress}%` }} />
              </div>
            </div>
            <p className="text-[11px] text-slate-400">{batch.startDate} → {batch.endDate}</p>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 btn-primary text-xs py-1.5">Manage</button>
              <button className="flex-1 text-xs py-1.5 border border-border rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Attendance</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttendanceTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Attendance Tracking" />
      <div className="card-base p-4">
        <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Weekly Attendance Average (%)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={attendanceTrend}>
            <defs>
              <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [`${v}%`, "Avg Attendance"]} />
            <Area type="monotone" dataKey="avg" stroke="#6366f1" strokeWidth={2} fill="url(#attGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="card-base overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white">Students with Low Attendance (&lt;75%)</h3>
        </div>
        <div className="divide-y divide-border">
          {recentStudents.filter(s => s.attendance < 80).map((s) => (
            <div key={s.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-xs font-medium text-slate-900 dark:text-white">{s.name}</p>
                <p className="text-[11px] text-slate-400">{s.batch}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-red-600">{s.attendance}%</span>
                <button className="text-xs text-primary-600 hover:underline font-medium">Send Notice</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeesTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Fee Management" subtitle="Track collections and pending payments" action={<button className="btn-primary text-xs px-3 py-2">Record Payment</button>} />
      <div className="card-base p-4">
        <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Monthly Fee Collection (₹)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={feeData}>
            <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
            <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]} />
            <Bar dataKey="collected" name="Collected" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" name="Pending" fill="#fbbf24" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="card-base overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white">Pending / Overdue Fees</h3>
        </div>
        <div className="divide-y divide-border">
          {recentStudents.filter(s => s.fees !== "Paid").map((s) => (
            <div key={s.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-xs font-medium text-slate-900 dark:text-white">{s.name}</p>
                <p className="text-[11px] text-slate-400">{s.batch}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full",
                  s.fees === "Pending" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"
                )}>{s.fees}</span>
                <button className="btn-primary text-xs px-2.5 py-1">Send Reminder</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportsTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Reports & Analytics" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Fee Collection Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={feeData}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Bar dataKey="collected" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={attendanceTrend}>
              <XAxis dataKey="week" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="avg" stroke="#6366f1" strokeWidth={2} dot={{ fill: "#6366f1", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["Student Performance Report", "Fee Collection Report", "Attendance Summary", "Batch Progress Report", "Certificate Issuance Report", "Trainer Performance"].map((report) => (
          <button key={report} className="card-base p-4 text-left hover:-translate-y-0.5 cursor-pointer">
            <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mb-2" />
            <p className="text-xs font-semibold text-slate-900 dark:text-white">{report}</p>
            <p className="text-[11px] text-primary-600 dark:text-primary-400 mt-1 font-medium">Download PDF →</p>
          </button>
        ))}
      </div>
    </div>
  );
}
