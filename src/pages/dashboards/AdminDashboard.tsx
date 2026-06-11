import { useState } from "react";
import {
  LayoutDashboard, Users, BookOpen, Award, BarChart3,
  Shield, DollarSign, Wrench, AlertTriangle, TrendingUp, Zap, Plus, Eye, Lock, CheckCircle2, X
} from "lucide-react";
import { DashboardShell, StatCard, SectionHeader, WelcomeBanner, StatusBadge } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from "recharts";

// --- Types ---
interface PendingUser {
  name: string;
  role: string;
  email: string;
  appliedAt: string;
  status: "pending" | "review";
}

interface ServiceAlert {
  id: string;
  issue: string;
  severity: "high" | "medium";
  time: string;
}

interface TopCourse {
  title: string;
  enrollments: number;
  revenue: number;
  rating: number;
  instructor?: string;
  duration?: string;
  category?: string;
}

// --- Static Data Structure ---
const initialUserRoleData = [
  { name: "Students", value: 88000, color: "#6366F1" },
  { name: "Professionals", value: 22000, color: "#8B5CF6" },
  { name: "Trainers", value: 8000, color: "#10B981" },
  { name: "Technicians", value: 4000, color: "#F59E0B" },
  { name: "Business", value: 2800, color: "#0EA5E9" },
  { name: "Institutes", value: 620, color: "#EC4899" },
];

const initialPlatformStats = {
  totalUsers: 125420,
  newUsersThisMonth: 3240,
  activeTrainers: 48,
  activeTechnicians: 82,
  totalCourses: 280,
  revenueThisMonth: 4820000,
  revenueGrowth: 24,
  activeServiceRequests: 147,
};

const initialPendingUsers: PendingUser[] = [
  { name: "Rohan Kapoor", role: "trainer", email: "rohan@email.com", appliedAt: "2h ago", status: "pending" },
  { name: "Meera Jain", role: "technician", email: "meera@email.com", appliedAt: "4h ago", status: "pending" },
  { name: "Tech Academy Pvt Ltd", role: "institute", email: "info@techacademy.com", appliedAt: "8h ago", status: "review" },
  { name: "Suresh Patel", role: "trainer", email: "suresh@email.com", appliedAt: "12h ago", status: "pending" },
  { name: "Amit Sharma", role: "trainer", email: "amit.sharma@email.com", appliedAt: "1d ago", status: "pending" },
  { name: "Kiran Rao", role: "technician", email: "kiran.tech@email.com", appliedAt: "1d ago", status: "pending" },
  { name: "Alpha Tech Solutions", role: "institute", email: "register@alphatech.com", appliedAt: "2d ago", status: "review" },
  { name: "Sneha Reddy", role: "student", email: "sneha.reddy@email.com", appliedAt: "3d ago", status: "pending" },
];

const initialServiceAlerts: ServiceAlert[] = [
  { id: "SR-5001", issue: "Payment gateway timeout", severity: "high", time: "15 min ago" },
  { id: "SYS-001", issue: "API rate limit reached — Email service", severity: "medium", time: "1h ago" },
  { id: "SR-5002", issue: "Unassigned urgent repair request", severity: "high", time: "2h ago" },
  { id: "SYS-002", issue: "Database backup replication delay", severity: "medium", time: "5h ago" },
  { id: "SR-5003", issue: "AMC service SLA threshold violation", severity: "high", time: "12h ago" },
];

const initialTopCourses: TopCourse[] = [
  { title: "Python Programming", enrollments: 15200, revenue: 456000, rating: 4.7, instructor: "Dr. Alok Mishra", duration: "30 hours", category: "Programming" },
  { title: "Full-Stack Web Dev", enrollments: 8320, revenue: 415000, rating: 4.9, instructor: "Sarah Connor", duration: "60 hours", category: "Web Development" },
  { title: "Digital Marketing", enrollments: 11200, revenue: 390000, rating: 4.7, instructor: "Rahul Sen", duration: "40 hours", category: "Marketing" },
  { title: "MS Office Mastery", enrollments: 12450, revenue: 248000, rating: 4.8, instructor: "Savita Bhatia", duration: "25 hours", category: "Office Productivity" },
  { title: "Tally & Financial Accounting", enrollments: 9400, revenue: 282000, rating: 4.6, instructor: "Ganesh K.", duration: "35 hours", category: "Accounting" },
  { title: "Graphic Design Basics", enrollments: 7120, revenue: 213600, rating: 4.5, instructor: "Neha Verma", duration: "30 hours", category: "Design" },
  { title: "Cybersecurity Fundamentals", enrollments: 5400, revenue: 324000, rating: 4.8, instructor: "Rohan Kapoor", duration: "45 hours", category: "Security" },
  { title: "Cloud Computing with AWS", enrollments: 4890, revenue: 489000, rating: 4.9, instructor: "Vikram Acharya", duration: "50 hours", category: "Cloud" },
];

const revenueData = [
  { month: "Aug", revenue: 3200000 }, { month: "Sep", revenue: 3750000 }, { month: "Oct", revenue: 4100000 },
  { month: "Nov", revenue: 3900000 }, { month: "Dec", revenue: 4500000 }, { month: "Jan", revenue: 4820000 },
];

const userGrowthData = [
  { month: "Aug", users: 98000 }, { month: "Sep", users: 105000 }, { month: "Oct", users: 111000 },
  { month: "Nov", users: 116000 }, { month: "Dec", users: 121000 }, { month: "Jan", users: 125420 },
];

// Helper: map role string to userRoleData name
const roleToCategory = (role: string): string => {
  if (role === "trainer") return "Trainers";
  if (role === "technician") return "Technicians";
  if (role === "institute") return "Institutes";
  return "Students";
};

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "User Management", icon: Users, badge: 0 },
  { id: "courses", label: "Course Control", icon: BookOpen },
  { id: "services", label: "Services Monitor", icon: Wrench, badge: 0 },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "analytics", label: "Platform Analytics", icon: BarChart3 },
  { id: "security", label: "Security", icon: Shield },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  
  // --- Mutable state with handlers ---
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>(initialPendingUsers);
  const [serviceAlerts, setServiceAlerts] = useState<ServiceAlert[]>(initialServiceAlerts);
  const [topCourses, setTopCourses] = useState<TopCourse[]>(initialTopCourses);
  const [userRoleData, setUserRoleData] = useState(initialUserRoleData);
  const [platformStats, setPlatformStats] = useState(initialPlatformStats);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: "", email: "", role: "student" });
  const [formError, setFormError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<TopCourse | null>(null);

  // Update sidebar badges dynamically
  const updatedSidebarItems = sidebarItems.map(item => {
    if (item.id === "users") return { ...item, badge: pendingUsers.length };
    if (item.id === "services") return { ...item, badge: serviceAlerts.length };
    return item;
  });

  // Show temporary notification
  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // --- User Approval Logic ---
  const approveUser = (userEmail: string) => {
    const userToApprove = pendingUsers.find(u => u.email === userEmail);
    if (!userToApprove) return;

    const category = roleToCategory(userToApprove.role);
    setUserRoleData(prev => prev.map(role => 
      role.name === category ? { ...role, value: role.value + 1 } : role
    ));

    setPlatformStats(prev => ({
      ...prev,
      totalUsers: prev.totalUsers + 1,
      newUsersThisMonth: prev.newUsersThisMonth + 1,
      activeTrainers: userToApprove.role === "trainer" ? prev.activeTrainers + 1 : prev.activeTrainers,
      activeTechnicians: userToApprove.role === "technician" ? prev.activeTechnicians + 1 : prev.activeTechnicians,
    }));

    setPendingUsers(prev => prev.filter(u => u.email !== userEmail));
    showNotification(`${userToApprove.name} approved successfully!`, "success");
  };

  const rejectUser = (userEmail: string) => {
    const userToReject = pendingUsers.find(u => u.email === userEmail);
    setPendingUsers(prev => prev.filter(u => u.email !== userEmail));
    showNotification(`${userToReject?.name} rejected.`, "error");
  };

  // --- Add User Modal handlers ---
  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.name.trim() || !newUserForm.email.trim() || !newUserForm.role) {
      setFormError("All fields are required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(newUserForm.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    const newUser: PendingUser = {
      name: newUserForm.name.trim(),
      role: newUserForm.role,
      email: newUserForm.email.trim(),
      appliedAt: "just now",
      status: "pending",
    };
    setPendingUsers(prev => [newUser, ...prev]);
    showNotification(`${newUser.name} added to pending approvals.`, "success");
    setShowAddUserModal(false);
    setNewUserForm({ name: "", email: "", role: "student" });
    setFormError("");
  };

  // --- Service Alerts ---
  const resolveAlert = (alertId: string) => {
    setServiceAlerts(prev => prev.filter(a => a.id !== alertId));
    showNotification(`Alert ${alertId} resolved.`, "success");
  };

  // --- Course Management ---
  const suspendCourse = (courseTitle: string) => {
    setTopCourses(prev => prev.filter(c => c.title !== courseTitle));
    setPlatformStats(prev => ({ ...prev, totalCourses: prev.totalCourses - 1 }));
    showNotification(`"${courseTitle}" has been suspended.`, "error");
  };

  const viewCourseDetails = (course: TopCourse) => {
    setSelectedCourse(course);
  };

  // --- Review user (just a placeholder notification) ---
  const reviewUser = (user: PendingUser) => {
    showNotification(`Reviewing ${user.name} (${user.role}) - detailed info would appear here.`, "success");
  };

  // --- Quick navigation to services tab ---
  const goToServicesTab = () => setActiveTab("services");

  if (!user) return null;

  return (
    <>
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className={cn(
            "px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2",
            notification.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          )}>
            {notification.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {notification.message}
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-md w-full p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Add New User</h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-transparent text-sm"
                  placeholder="e.g., John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-transparent text-sm"
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-transparent text-sm"
                >
                  <option value="student">Student</option>
                  <option value="trainer">Trainer</option>
                  <option value="technician">Technician</option>
                  <option value="institute">Institute</option>
                </select>
              </div>
              {formError && <p className="text-xs text-red-500">{formError}</p>}
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddUserModal(false)} className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button>
                <button type="submit" className="px-3 py-1.5 text-sm bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg">Add User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl max-w-md w-full p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Course Overview</h3>
              <button onClick={() => setSelectedCourse(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{selectedCourse.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{selectedCourse.category || "General Technology"}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Instructor</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{selectedCourse.instructor || "CompuPoint Trainer"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Duration</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{selectedCourse.duration || "40 hours"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Enrollments</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{selectedCourse.enrollments.toLocaleString()} students</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Rating</span>
                  <span className="text-xs font-semibold text-yellow-500">{selectedCourse.rating} ★</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Total Revenue</span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">₹{selectedCourse.revenue.toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedCourse(null)} className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Close</button>
                  <button onClick={() => { suspendCourse(selectedCourse.title); setSelectedCourse(null); }} className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">Suspend</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <DashboardShell
        sidebarItems={updatedSidebarItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        title="Admin Control Panel"
        roleColor="text-red-600 dark:text-red-400"
        roleBg="bg-red-50 dark:bg-red-900/20"
      >
        {activeTab === "overview" && (
          <OverviewTab 
            user={user} 
            platformStats={platformStats}
            pendingUsers={pendingUsers}
            serviceAlerts={serviceAlerts}
            userRoleData={userRoleData}
            onApproveUser={approveUser}
            onRejectUser={rejectUser}
            onViewAllAlerts={goToServicesTab}
          />
        )}
        {activeTab === "users" && (
          <UsersTab 
            pendingUsers={pendingUsers}
            userRoleData={userRoleData}
            onApproveUser={approveUser}
            onRejectUser={rejectUser}
            onReviewUser={reviewUser}
            onAddUser={() => setShowAddUserModal(true)}
          />
        )}
        {activeTab === "courses" && (
          <CoursesTab 
            topCourses={topCourses}
            onViewCourse={viewCourseDetails}
            onSuspendCourse={suspendCourse}
          />
        )}
        {activeTab === "services" && (
          <ServicesTab 
            serviceAlerts={serviceAlerts}
            platformStats={platformStats}
            onResolveAlert={resolveAlert}
          />
        )}
        {activeTab === "revenue" && <RevenueTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "security" && <SecurityTab />}
      </DashboardShell>
    </>
  );
}

// --- OverviewTab component (same as before, but now uses passed props) ---
interface OverviewTabProps {
  user: any;
  platformStats: typeof initialPlatformStats;
  pendingUsers: PendingUser[];
  serviceAlerts: ServiceAlert[];
  userRoleData: typeof initialUserRoleData;
  onApproveUser: (email: string) => void;
  onRejectUser: (email: string) => void;
  onViewAllAlerts: () => void;
}

function OverviewTab({ user, platformStats, pendingUsers, serviceAlerts, userRoleData, onApproveUser, onRejectUser, onViewAllAlerts }: OverviewTabProps) {
  return (
    <div className="space-y-5">
      <WelcomeBanner name={user.name} message={`Platform admin • ${platformStats.newUsersThisMonth.toLocaleString()} new users this month • ${serviceAlerts.length} alerts need attention`} icon={Shield} gradient="from-slate-800 to-slate-900" />

      {serviceAlerts.length > 0 && (
        <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl">
          <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-red-700 dark:text-red-400">{serviceAlerts.length} Platform Alerts</p>
            <p className="text-[11px] text-red-600/70 dark:text-red-400/70">{serviceAlerts[0].issue} — {serviceAlerts[0].time}</p>
          </div>
          <button onClick={onViewAllAlerts} className="text-xs text-red-600 font-semibold hover:underline flex-shrink-0">View All</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                <defs><linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366F1" stopOpacity={0} /></linearGradient></defs>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000000}M`} />
                <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card-base p-4">
            <SectionHeader title="Pending User Approvals" subtitle={`${pendingUsers.length} accounts awaiting review`} />
            <div className="space-y-2.5">
              {pendingUsers.map((u) => (
                <div key={u.email} className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs flex-shrink-0">{u.name[0]}</div>
                    <div className="min-w-0"><p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{u.name}</p><p className="text-[11px] text-slate-400 capitalize">{u.role} • {u.appliedAt}</p></div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button onClick={() => onApproveUser(u.email)} className="px-2.5 py-1 bg-green-600 hover:bg-green-700 text-white text-[11px] font-medium rounded-lg transition-colors">Approve</button>
                    <button onClick={() => onRejectUser(u.email)} className="px-2.5 py-1 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 text-red-600 dark:text-red-400 text-[11px] font-medium rounded-lg transition-colors">Reject</button>
                  </div>
                </div>
              ))}
              {pendingUsers.length === 0 && <p className="text-xs text-slate-400 text-center py-4">No pending approvals</p>}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="card-base p-4">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">User Distribution</h3>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart><Pie data={userRoleData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">{userRoleData.map((entry, i) => <Cell key={i} fill={entry.color} />)}</Pie><Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [v.toLocaleString(), ""]} /></PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">{userRoleData.slice(0, 4).map((d) => (<div key={d.name} className="flex items-center justify-between text-[11px]"><div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} /><span className="text-slate-500">{d.name}</span></div><span className="font-semibold text-slate-700 dark:text-slate-300">{d.value.toLocaleString()}</span></div>))}</div>
          </div>
          <div className="card-base p-4">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Active Alerts</h3>
            <div className="space-y-2.5">{serviceAlerts.map((alert) => (<div key={alert.id} className={cn("p-2.5 rounded-lg border", alert.severity === "high" ? "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-800" : "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-800")}><div className="flex items-start gap-2"><AlertTriangle className={cn("w-3.5 h-3.5 flex-shrink-0 mt-0.5", alert.severity === "high" ? "text-red-500" : "text-yellow-500")} /><div><p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">{alert.issue}</p><p className="text-[10px] text-slate-400">{alert.id} • {alert.time}</p></div></div></div>))}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- UsersTab with review button functionality ---
function UsersTab({ pendingUsers, userRoleData, onApproveUser, onRejectUser, onReviewUser, onAddUser }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="User Management" subtitle="Manage all platform users" action={<button onClick={onAddUser} className="btn-primary text-xs px-3 py-2 flex items-center gap-1"><Plus className="w-3.5 h-3.5" />Add User</button>} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {userRoleData.map((d: any) => (<div key={d.name} className="card-base p-3 flex items-center gap-3"><div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.color }} /><div><p className="text-sm font-bold text-slate-900 dark:text-white">{d.value.toLocaleString()}</p><p className="text-[11px] text-slate-400 capitalize">{d.name}</p></div></div>))}
      </div>
      <div className="card-base p-4 overflow-x-auto">
        <SectionHeader title="Pending Approvals" />
        <div className="space-y-2.5 min-w-[500px]">
          {pendingUsers.map((u: any) => (<div key={u.email} className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"><div className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-xs font-bold">{u.name[0]}</div><div><p className="text-xs font-semibold text-slate-900 dark:text-white">{u.name}</p><p className="text-[11px] text-slate-400">{u.email} • {u.role} • {u.appliedAt}</p></div></div><div className="flex gap-1.5"><button onClick={() => onApproveUser(u.email)} className="px-2.5 py-1 bg-green-600 hover:bg-green-700 text-white text-[11px] font-medium rounded-lg transition-colors">Approve</button><button onClick={() => onReviewUser(u)} className="px-2.5 py-1 border border-border rounded-lg text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Review</button><button onClick={() => onRejectUser(u.email)} className="px-2.5 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-[11px] font-medium rounded-lg transition-colors">Reject</button></div></div>))}
        </div>
      </div>
    </div>
  );
}

// --- CoursesTab (unchanged but passed props) ---
function CoursesTab({ topCourses, onViewCourse, onSuspendCourse }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="Course Control" subtitle="Monitor and manage all platform courses" />
      <div className="card-base overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead><tr className="border-b border-border bg-slate-50 dark:bg-slate-800/50">{["Course", "Enrollments", "Revenue", "Rating", "Actions"].map((h) => (<th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>))}</tr></thead>
          <tbody className="divide-y divide-border">{topCourses.map((c: any) => (<tr key={c.title} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"><td className="px-4 py-3 text-xs font-medium text-slate-900 dark:text-white">{c.title}</td><td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{c.enrollments.toLocaleString()}</td><td className="px-4 py-3 text-xs font-semibold text-green-600 dark:text-green-400">₹{(c.revenue / 1000).toFixed(0)}K</td><td className="px-4 py-3 text-xs text-yellow-600">{c.rating} ★</td><td className="px-4 py-3"><div className="flex gap-3"><button onClick={() => onViewCourse(c)} className="flex items-center gap-1 text-xs text-primary-600 hover:underline"><Eye className="w-3 h-3" />View</button><button onClick={() => onSuspendCourse(c.title)} className="text-xs text-red-600 hover:underline">Suspend</button></div></td></tr>))}</tbody>
        </table>
        {topCourses.length === 0 && <p className="text-center text-xs text-slate-400 py-6">No active courses</p>}
      </div>
    </div>
  );
}

// --- ServicesTab (unchanged) ---
function ServicesTab({ serviceAlerts, platformStats, onResolveAlert }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="Services Monitor" subtitle="Platform-wide service request oversight" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
        <StatCard icon={Wrench} label="Active Requests" value={platformStats.activeServiceRequests} change="18 urgent" color="orange" />
        <StatCard icon={CheckCircle2} label="Completed Today" value={23} color="green" />
        <StatCard icon={AlertTriangle} label="Overdue" value={5} change="Needs attention" color="red" />
        <StatCard icon={Users} label="Active Technicians" value={platformStats.activeTechnicians} change="12 on field" color="blue" />
      </div>
      <div className="card-base p-4">
        <SectionHeader title="Recent Platform Alerts" />
        {serviceAlerts.map((alert: any) => (<div key={alert.id} className={cn("flex flex-wrap items-start justify-between gap-3 p-3 rounded-xl mb-2.5 border", alert.severity === "high" ? "bg-red-50 dark:bg-red-900/10 border-red-100" : "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100")}><div className="flex items-start gap-3"><AlertTriangle className={cn("w-4 h-4 flex-shrink-0 mt-0.5", alert.severity === "high" ? "text-red-500" : "text-yellow-500")} /><div><p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{alert.issue}</p><p className="text-[11px] text-slate-500">{alert.id} • {alert.time}</p></div></div><button onClick={() => onResolveAlert(alert.id)} className="text-xs font-medium text-primary-600 hover:underline flex-shrink-0">Resolve</button></div>))}
        {serviceAlerts.length === 0 && <p className="text-center text-xs text-slate-400 py-4">All systems operational</p>}
      </div>
    </div>
  );
}

// --- RevenueTab (unchanged) ---
function RevenueTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Revenue Analytics" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard icon={DollarSign} label="Revenue MTD" value="₹48.2L" change="+24% vs last month" color="green" />
        <StatCard icon={TrendingUp} label="Annual Run Rate" value="₹5.8Cr" change="+32% YoY growth" color="blue" />
        <StatCard icon={Users} label="Paying Users" value="42K" change="34% conversion" color="purple" />
      </div>
      <div className="card-base p-4">
        <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Revenue — 6 Month Trend (₹)</h3>
        <ResponsiveContainer width="100%" height={200}><AreaChart data={revenueData}><defs><linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366F1" stopOpacity={0} /></linearGradient></defs><XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000000}M`} /><Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} /><Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} fill="url(#adminRevGrad)" /></AreaChart></ResponsiveContainer>
      </div>
    </div>
  );
}

// --- AnalyticsTab (unchanged) ---
function AnalyticsTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Platform Analytics" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card-base p-4"><h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">User Growth</h3><ResponsiveContainer width="100%" height={180}><LineChart data={userGrowthData}><XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} /><Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [v.toLocaleString(), "Users"]} /><Line type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={2.5} dot={{ fill: "#6366F1", r: 4 }} /></LineChart></ResponsiveContainer></div>
        <div className="card-base p-4"><h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Revenue Growth</h3><ResponsiveContainer width="100%" height={180}><BarChart data={revenueData}><XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000000}M`} /><Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} /><Bar dataKey="revenue" fill="#6366F1" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
      </div>
    </div>
  );
}

// --- SecurityTab (unchanged) ---
function SecurityTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Security & Access Control" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard icon={Shield} label="Login Attempts" value={1247} change="Today" color="blue" />
        <StatCard icon={Lock} label="Blocked IPs" value={8} change="+2 today" color="red" />
        <StatCard icon={CheckCircle2} label="2FA Active Users" value="68%" change="+4% this month" color="green" />
      </div>
      <div className="card-base p-4">
        <SectionHeader title="Recent Security Events" />
        {[{ event: "Multiple failed login attempts detected", ip: "192.168.1.105", time: "10 min ago", level: "high" },{ event: "Admin password reset requested", ip: "10.0.0.25", time: "45 min ago", level: "medium" },{ event: "New API key generated", ip: "10.0.0.1", time: "2h ago", level: "low" }].map((e) => (<div key={e.event} className={cn("flex items-start gap-3 p-3 rounded-xl mb-2 border", e.level === "high" ? "bg-red-50 dark:bg-red-900/10 border-red-100" : e.level === "medium" ? "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100" : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700")}><Shield className={cn("w-3.5 h-3.5 flex-shrink-0 mt-0.5", e.level === "high" ? "text-red-500" : e.level === "medium" ? "text-yellow-500" : "text-slate-400")} /><div><p className="text-xs font-medium text-slate-800 dark:text-slate-200">{e.event}</p><p className="text-[11px] text-slate-400">IP: {e.ip} • {e.time}</p></div></div>))}
      </div>
    </div>
  );
}