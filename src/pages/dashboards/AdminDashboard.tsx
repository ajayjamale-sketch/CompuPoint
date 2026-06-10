import { useState } from "react";
import {
  LayoutDashboard, Users, BookOpen, Award, BarChart3,
  Shield, DollarSign, Wrench, AlertTriangle, TrendingUp, Zap, Plus, Eye, Lock, CheckCircle2
} from "lucide-react";
import { DashboardShell, StatCard, SectionHeader, WelcomeBanner, StatusBadge } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "User Management", icon: Users, badge: 12 },
  { id: "courses", label: "Course Control", icon: BookOpen },
  { id: "services", label: "Services Monitor", icon: Wrench, badge: 5 },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "analytics", label: "Platform Analytics", icon: BarChart3 },
  { id: "security", label: "Security", icon: Shield },
];

const platformStats = {
  totalUsers: 125420,
  newUsersThisMonth: 3240,
  activeTrainers: 48,
  activeTechnicians: 82,
  totalCourses: 280,
  revenueThisMonth: 4820000,
  revenueGrowth: 24,
  activeServiceRequests: 147,
};

const revenueData = [
  { month: "Aug", revenue: 3200000 }, { month: "Sep", revenue: 3750000 }, { month: "Oct", revenue: 4100000 },
  { month: "Nov", revenue: 3900000 }, { month: "Dec", revenue: 4500000 }, { month: "Jan", revenue: 4820000 },
];

const userGrowthData = [
  { month: "Aug", users: 98000 }, { month: "Sep", users: 105000 }, { month: "Oct", users: 111000 },
  { month: "Nov", users: 116000 }, { month: "Dec", users: 121000 }, { month: "Jan", users: 125420 },
];

const userRoleData = [
  { name: "Students", value: 88000, color: "#2563EB" },
  { name: "Professionals", value: 22000, color: "#7c3aed" },
  { name: "Trainers", value: 8000, color: "#16a34a" },
  { name: "Technicians", value: 4000, color: "#f97316" },
  { name: "Business", value: 2800, color: "#0891b2" },
  { name: "Institutes", value: 620, color: "#6366f1" },
];

const pendingUsers = [
  { name: "Rohan Kapoor", role: "trainer", email: "rohan@email.com", appliedAt: "2h ago", status: "pending" },
  { name: "Meera Jain", role: "technician", email: "meera@email.com", appliedAt: "4h ago", status: "pending" },
  { name: "Tech Academy Pvt Ltd", role: "institute", email: "info@techacademy.com", appliedAt: "8h ago", status: "review" },
  { name: "Suresh Patel", role: "trainer", email: "suresh@email.com", appliedAt: "12h ago", status: "pending" },
];

const serviceAlerts = [
  { id: "SR-5001", issue: "Payment gateway timeout", severity: "high", time: "15 min ago" },
  { id: "SYS-001", issue: "API rate limit reached — Email service", severity: "medium", time: "1h ago" },
  { id: "SR-5002", issue: "Unassigned urgent repair request", severity: "high", time: "2h ago" },
];

const topCourses = [
  { title: "Python Programming", enrollments: 15200, revenue: 456000, rating: 4.7 },
  { title: "Full-Stack Web Dev", enrollments: 8320, revenue: 415000, rating: 4.9 },
  { title: "Digital Marketing", enrollments: 11200, revenue: 390000, rating: 4.7 },
  { title: "MS Office Mastery", enrollments: 12450, revenue: 248000, rating: 4.8 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  if (!user) return null;

  return (
    <DashboardShell
      sidebarItems={sidebarItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title="Admin Control Panel"
      roleColor="text-red-600 dark:text-red-400"
      roleBg="bg-red-50 dark:bg-red-900/20"
    >
      {activeTab === "overview" && <OverviewTab user={user} />}
      {activeTab === "users" && <UsersTab />}
      {activeTab === "courses" && <CoursesTab />}
      {activeTab === "services" && <ServicesTab />}
      {activeTab === "revenue" && <RevenueTab />}
      {activeTab === "analytics" && <AnalyticsTab />}
      {activeTab === "security" && <SecurityTab />}

    </DashboardShell>
  );
}

function OverviewTab({ user }: { user: NonNullable<ReturnType<typeof useAuth>["user"]> }) {
  return (
    <div className="space-y-5">
      <WelcomeBanner name={user.name} message={`Platform admin • ${platformStats.newUsersThisMonth.toLocaleString()} new users this month • ${serviceAlerts.length} alerts need attention`} icon={Shield} gradient="from-slate-800 to-slate-900" />

      {/* Alerts Banner */}
      {serviceAlerts.length > 0 && (
        <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl">
          <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-red-700 dark:text-red-400">{serviceAlerts.length} Platform Alerts</p>
            <p className="text-[11px] text-red-600/70 dark:text-red-400/70">{serviceAlerts[0].issue} — {serviceAlerts[0].time}</p>
          </div>
          <button className="text-xs text-red-600 font-semibold hover:underline flex-shrink-0">View All</button>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Users} label="Total Users" value={`${(platformStats.totalUsers / 1000).toFixed(1)}K`} change={`+${platformStats.newUsersThisMonth.toLocaleString()} this month`} color="blue" />
        <StatCard icon={BookOpen} label="Active Courses" value={platformStats.totalCourses} change="12 pending review" color="green" />
        <StatCard icon={DollarSign} label="Revenue MTD" value={`₹${(platformStats.revenueThisMonth / 1000000).toFixed(2)}M`} change={`+${platformStats.revenueGrowth}% growth`} color="purple" />
        <StatCard icon={Wrench} label="Open Requests" value={platformStats.activeServiceRequests} change="18 urgent" color="orange" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="card-base p-4">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Revenue — Last 6 Months (₹)</h3>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000000}M`} />
                <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card-base p-4">
            <SectionHeader title="Pending User Approvals" subtitle={`${pendingUsers.length} accounts awaiting review`} />
            <div className="space-y-2.5">
              {pendingUsers.map((u) => (
                <div key={u.email} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs flex-shrink-0">
                      {u.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{u.name}</p>
                      <p className="text-[11px] text-slate-400 capitalize">{u.role} • {u.appliedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button className="px-2.5 py-1 bg-green-600 hover:bg-green-700 text-white text-[11px] font-medium rounded-lg transition-colors">Approve</button>
                    <button className="px-2.5 py-1 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 text-red-600 dark:text-red-400 text-[11px] font-medium rounded-lg transition-colors">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="card-base p-4">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">User Distribution</h3>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={userRoleData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
                  {userRoleData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [v.toLocaleString(), ""]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {userRoleData.slice(0, 4).map((d) => (
                <div key={d.name} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="text-slate-500">{d.name}</span>
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{d.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-base p-4">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Active Alerts</h3>
            <div className="space-y-2.5">
              {serviceAlerts.map((alert) => (
                <div key={alert.id} className={cn("p-2.5 rounded-lg border", alert.severity === "high" ? "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-800" : "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-800")}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className={cn("w-3.5 h-3.5 flex-shrink-0 mt-0.5", alert.severity === "high" ? "text-red-500" : "text-yellow-500")} />
                    <div>
                      <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">{alert.issue}</p>
                      <p className="text-[10px] text-slate-400">{alert.id} • {alert.time}</p>
                    </div>
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

function UsersTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="User Management" subtitle="Manage all platform users" action={<button className="btn-primary text-xs px-3 py-2"><Plus className="w-3.5 h-3.5" />Add User</button>} />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {userRoleData.map((d) => (
          <div key={d.name} className="card-base p-3 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.color }} />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{d.value.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400 capitalize">{d.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="card-base p-4">
        <SectionHeader title="Pending Approvals" />
        <div className="space-y-2.5">
          {pendingUsers.map((u) => (
            <div key={u.email} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-xs font-bold">{u.name[0]}</div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">{u.name}</p>
                  <p className="text-[11px] text-slate-400">{u.email} • {u.role} • {u.appliedAt}</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button className="px-2.5 py-1 bg-green-600 hover:bg-green-700 text-white text-[11px] font-medium rounded-lg transition-colors">Approve</button>
                <button className="px-2.5 py-1 border border-border rounded-lg text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Review</button>
                <button className="px-2.5 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-[11px] font-medium rounded-lg transition-colors">Reject</button>
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
      <SectionHeader title="Course Control" subtitle="Monitor and manage all platform courses" />
      <div className="card-base overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-slate-50 dark:bg-slate-800/50">
              {["Course", "Enrollments", "Revenue", "Rating", "Actions"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {topCourses.map((c) => (
              <tr key={c.title} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-4 py-3 text-xs font-medium text-slate-900 dark:text-white">{c.title}</td>
                <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{c.enrollments.toLocaleString()}</td>
                <td className="px-4 py-3 text-xs font-semibold text-green-600 dark:text-green-400">₹{(c.revenue / 1000).toFixed(0)}K</td>
                <td className="px-4 py-3 text-xs text-yellow-600">{c.rating} ★</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-xs text-primary-600 hover:underline"><Eye className="w-3 h-3" />View</button>
                    <button className="text-xs text-red-600 hover:underline">Suspend</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ServicesTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Services Monitor" subtitle="Platform-wide service request oversight" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
        <StatCard icon={Wrench} label="Active Requests" value={147} change="18 urgent" color="orange" />
        <StatCard icon={CheckCircle2} label="Completed Today" value={23} color="green" />
        <StatCard icon={AlertTriangle} label="Overdue" value={5} change="Needs attention" color="red" />
        <StatCard icon={Users} label="Active Technicians" value={82} change="12 on field" color="blue" />
      </div>
      <div className="card-base p-4">
        <SectionHeader title="Recent Platform Alerts" />
        {serviceAlerts.map((alert) => (
          <div key={alert.id} className={cn("flex items-start gap-3 p-3 rounded-xl mb-2.5 border", alert.severity === "high" ? "bg-red-50 dark:bg-red-900/10 border-red-100" : "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100")}>
            <AlertTriangle className={cn("w-4 h-4 flex-shrink-0 mt-0.5", alert.severity === "high" ? "text-red-500" : "text-yellow-500")} />
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{alert.issue}</p>
              <p className="text-[11px] text-slate-500">{alert.id} • {alert.time}</p>
            </div>
            <button className="text-xs font-medium text-primary-600 hover:underline flex-shrink-0">Resolve</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevenueTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Revenue Analytics" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard icon={DollarSign} label="Revenue MTD" value="₹48.2L" change="+24% vs last month" color="green" />
        <StatCard icon={TrendingUp} label="Annual Run Rate" value="₹5.8Cr" change="+32% YoY growth" color="blue" />
        <StatCard icon={Users} label="Paying Users" value="42K" change="34% conversion" color="purple" />
      </div>
      <div className="card-base p-4">
        <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Revenue — 6 Month Trend (₹)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000000}M`} />
            <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
            <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fill="url(#adminRevGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Platform Analytics" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">User Growth</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={userGrowthData}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [v.toLocaleString(), "Users"]} />
              <Line type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={2.5} dot={{ fill: "#2563EB", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000000}M`} />
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Security & Access Control" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard icon={Shield} label="Login Attempts" value={1247} change="Today" color="blue" />
        <StatCard icon={Lock} label="Blocked IPs" value={8} change="+2 today" color="red" />
        <StatCard icon={CheckCircle2} label="2FA Active Users" value="68%" change="+4% this month" color="green" />
      </div>
      <div className="card-base p-4">
        <SectionHeader title="Recent Security Events" />
        {[
          { event: "Multiple failed login attempts detected", ip: "192.168.1.105", time: "10 min ago", level: "high" },
          { event: "Admin password reset requested", ip: "10.0.0.25", time: "45 min ago", level: "medium" },
          { event: "New API key generated", ip: "10.0.0.1", time: "2h ago", level: "low" },
        ].map((e) => (
          <div key={e.event} className={cn("flex items-start gap-3 p-3 rounded-xl mb-2 border", e.level === "high" ? "bg-red-50 dark:bg-red-900/10 border-red-100" : e.level === "medium" ? "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100" : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700")}>
            <Shield className={cn("w-3.5 h-3.5 flex-shrink-0 mt-0.5", e.level === "high" ? "text-red-500" : e.level === "medium" ? "text-yellow-500" : "text-slate-400")} />
            <div>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{e.event}</p>
              <p className="text-[11px] text-slate-400">IP: {e.ip} • {e.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
