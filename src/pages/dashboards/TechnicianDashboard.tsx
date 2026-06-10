import { useState } from "react";
import {
  LayoutDashboard, Wrench, ClipboardList, Star, BarChart3,
  MapPin, Clock, CheckCircle2, AlertTriangle, Package, Zap, Plus, Phone
} from "lucide-react";
import { DashboardShell, StatCard, SectionHeader, WelcomeBanner, StatusBadge } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "jobs", label: "Active Jobs", icon: Wrench, badge: 5 },
  { id: "queue", label: "Job Queue", icon: ClipboardList, badge: 8 },
  { id: "parts", label: "Parts & Inventory", icon: Package },
  { id: "history", label: "Job History", icon: Clock },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const activeJobs = [
  { id: "JB-2610", customer: "Rajesh Mehta", type: "Laptop Screen Replacement", device: "HP Pavilion 15-eg", priority: "high", status: "in-progress", time: "Est. 2h remaining", location: "Shop", contact: "+91 98765 43210" },
  { id: "JB-2609", customer: "Anjali Singh", type: "Virus Removal & OS Cleanup", device: "Dell Inspiron 14", priority: "medium", status: "in-progress", time: "Est. 45min", location: "On-site", contact: "+91 87654 32109" },
  { id: "JB-2608", customer: "Tech Solutions Ltd", type: "Network Setup — 20 Systems", device: "Office Network", priority: "urgent", status: "assigned", time: "Starts at 3:00 PM", location: "Client Office", contact: "+91 76543 21098" },
  { id: "JB-2607", customer: "Priya Nair", type: "Data Recovery — HDD Failure", device: "Seagate 1TB HDD", priority: "high", status: "in-progress", time: "Est. 4h", location: "Shop", contact: "+91 65432 10987" },
  { id: "JB-2606", customer: "StartupHub Pvt Ltd", type: "Server Maintenance AMC", device: "Dell PowerEdge Server", priority: "medium", status: "assigned", time: "Scheduled 5:00 PM", location: "Client Site", contact: "+91 54321 09876" },
];

const queuedJobs = [
  { id: "JB-2611", customer: "Mohammed Ali", type: "Keyboard Replacement", device: "Lenovo ThinkPad", priority: "low", status: "pending", scheduled: "Tomorrow 10AM" },
  { id: "JB-2612", customer: "Sunita Sharma", type: "RAM Upgrade — 8GB to 16GB", device: "ASUS VivoBook", priority: "medium", status: "pending", scheduled: "Tomorrow 2PM" },
  { id: "JB-2613", customer: "Global Corp", type: "20x Antivirus Install", device: "Corporate PCs", priority: "medium", status: "pending", scheduled: "Jan 18, 9AM" },
];

const jobHistory = [
  { id: "JB-2605", type: "Motherboard Repair", customer: "Vikram Joshi", completedAt: "Jan 10, 2026", rating: 5, revenue: 3500 },
  { id: "JB-2604", type: "Data Backup & Migration", customer: "FreshMart Ltd", completedAt: "Jan 09, 2026", rating: 4, revenue: 2000 },
  { id: "JB-2603", type: "GPU Replacement", customer: "Gaming Zone", completedAt: "Jan 08, 2026", rating: 5, revenue: 8500 },
];

const partsInventory = [
  { name: "DDR4 8GB RAM — Kingston", stock: 12, unit: "units", threshold: 5, status: "ok" },
  { name: "2.5\" 1TB HDD — Seagate", stock: 3, unit: "units", threshold: 5, status: "low" },
  { name: "15.6\" FHD Screen Panel", stock: 0, unit: "units", threshold: 3, status: "out" },
  { name: "Laptop Keyboard Generic", stock: 8, unit: "units", threshold: 4, status: "ok" },
  { name: "Thermal Paste", stock: 2, unit: "tubes", threshold: 5, status: "low" },
];

const weeklyJobsData = [
  { day: "Mon", completed: 4 }, { day: "Tue", completed: 6 }, { day: "Wed", completed: 3 },
  { day: "Thu", completed: 7 }, { day: "Fri", completed: 5 }, { day: "Sat", completed: 8 }, { day: "Sun", completed: 2 },
];

const jobTypeData = [
  { name: "Hardware Repair", value: 42 },
  { name: "Software Support", value: 28 },
  { name: "Network Setup", value: 18 },
  { name: "Data Recovery", value: 12 },
];
const PIE_COLORS = ["#6366F1", "#06B6D4", "#16a34a", "#f59e0b"];

const priorityMap: Record<string, string> = {
  urgent: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-100",
  high: "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border border-orange-100",
  medium: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-100",
  low: "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700",
};

export default function TechnicianDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  if (!user) return null;

  return (
    <DashboardShell
      sidebarItems={sidebarItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title="Technician Dashboard"
      roleColor="text-orange-600 dark:text-orange-400"
      roleBg="bg-orange-50 dark:bg-orange-900/20"
    >
      {activeTab === "overview" && <OverviewTab user={user} />}
      {activeTab === "jobs" && <ActiveJobsTab />}
      {activeTab === "queue" && <QueueTab />}
      {activeTab === "parts" && <PartsTab />}
      {activeTab === "history" && <HistoryTab />}
      {activeTab === "analytics" && <AnalyticsTab />}

    </DashboardShell>
  );
}

function OverviewTab({ user }: { user: NonNullable<ReturnType<typeof useAuth>["user"]> }) {
  return (
    <div className="space-y-5">
      <WelcomeBanner name={user.name} message={`${activeJobs.length} active jobs • ${queuedJobs.length} in queue • 2 parts low on stock`} icon={Wrench} gradient="from-orange-600 to-amber-600" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Wrench} label="Active Jobs" value={activeJobs.length} change="2 urgent" color="orange" />
        <StatCard icon={CheckCircle2} label="Completed Today" value={3} change="+2 from yesterday" color="green" />
        <StatCard icon={Star} label="Avg Rating" value="4.8/5" change="Excellent" color="purple" />
        <StatCard icon={BarChart3} label="Revenue Today" value="₹8.5K" change="+15% week" color="blue" />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card-base p-4">
          <SectionHeader title="Active Jobs" subtitle="Jobs currently in progress" action={<span className="text-xs text-orange-600 font-medium">{activeJobs.filter(j => j.priority === "urgent").length} URGENT</span>} />
          <div className="space-y-2.5">
            {activeJobs.slice(0, 4).map((job) => (
              <div key={job.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-slate-400">{job.id}</span>
                    <span className={cn("px-1.5 py-0.5 text-[10px] font-bold rounded-full capitalize", priorityMap[job.priority])}>
                      {job.priority}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">{job.type}</p>
                  <p className="text-[11px] text-slate-400">{job.customer} • {job.device}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[11px] text-slate-400"><MapPin className="w-3 h-3" />{job.location}</span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400"><Clock className="w-3 h-3" />{job.time}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <StatusBadge status={job.status} />
                  <button className="btn-primary text-[10px] px-2 py-1">Update</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="card-base p-4">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Low Stock Alerts</h3>
            <div className="space-y-2">
              {partsInventory.filter(p => p.status !== "ok").map((part) => (
                <div key={part.name} className={cn("flex items-center justify-between p-2 rounded-lg text-xs", part.status === "out" ? "bg-red-50 dark:bg-red-900/10" : "bg-yellow-50 dark:bg-yellow-900/10")}>
                  <span className="text-slate-700 dark:text-slate-300 truncate mr-2">{part.name.split("—")[0]}</span>
                  <span className={cn("font-bold flex-shrink-0", part.status === "out" ? "text-red-600" : "text-yellow-600")}>
                    {part.stock === 0 ? "OUT" : part.stock}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-base p-4">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Job Types</h3>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={jobTypeData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
                  {jobTypeData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {jobTypeData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-[10px] text-slate-500 truncate">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActiveJobsTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Active Jobs" subtitle={`${activeJobs.length} jobs in progress`} />
      <div className="space-y-3">
        {activeJobs.map((job) => (
          <div key={job.id} className="card-base p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono text-slate-400">{job.id}</span>
                  <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full capitalize", priorityMap[job.priority])}>{job.priority}</span>
                  <StatusBadge status={job.status} />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{job.type}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{job.device}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{job.customer}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{job.contact}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.time}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button className="btn-primary text-xs px-3 py-1.5">Update Status</button>
                <button className="px-3 py-1.5 text-xs border border-border rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QueueTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Job Queue" subtitle="Incoming and scheduled jobs" action={<button className="btn-primary text-xs px-3 py-2"><Plus className="w-3.5 h-3.5" />Add Job</button>} />
      <div className="space-y-3">
        {queuedJobs.map((job) => (
          <div key={job.id} className="card-base p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-slate-400">{job.id}</span>
                  <span className={cn("px-1.5 py-0.5 text-[10px] font-bold rounded-full capitalize", priorityMap[job.priority])}>{job.priority}</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{job.type}</h3>
                <p className="text-xs text-slate-400">{job.device} • {job.customer}</p>
                <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mt-1">Scheduled: {job.scheduled}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button className="btn-primary text-xs px-3 py-1.5">Accept</button>
                <button className="text-xs px-3 py-1.5 border border-border rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Reschedule</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PartsTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Parts & Inventory" action={<button className="btn-primary text-xs px-3 py-2"><Plus className="w-3.5 h-3.5" />Add Part</button>} />
      <div className="card-base overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-slate-50 dark:bg-slate-800/50">
              <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Part Name</th>
              <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">In Stock</th>
              <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Min Level</th>
              <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {partsInventory.map((part) => (
              <tr key={part.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-4 py-3 text-xs font-medium text-slate-900 dark:text-white">{part.name}</td>
                <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{part.stock} {part.unit}</td>
                <td className="px-4 py-3 text-xs text-slate-400">{part.threshold}</td>
                <td className="px-4 py-3">
                  <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full",
                    part.status === "ok" ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" :
                    part.status === "low" ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400" :
                    "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                  )}>
                    {part.status === "ok" ? "In Stock" : part.status === "low" ? "Low Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-medium">Reorder</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HistoryTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Completed Jobs" subtitle="History of all resolved service requests" />
      <div className="space-y-3">
        {jobHistory.map((job) => (
          <div key={job.id} className="card-base p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-slate-400">{job.id}</span>
                  <span className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-1.5 py-0.5 text-[10px] font-bold rounded-full">Completed</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{job.type}</h3>
                <p className="text-xs text-slate-400">{job.customer} • {job.completedAt}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("w-3 h-3", i < job.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200 dark:text-slate-700")} />
                  ))}
                  <span className="text-[10px] text-slate-400 ml-1">{job.rating}/5</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-green-600 dark:text-green-400">₹{job.revenue.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400">earned</p>
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
      <SectionHeader title="Performance Analytics" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Jobs Completed This Week</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyJobsData}>
              <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Bar dataKey="completed" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Job Type Distribution</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={jobTypeData} cx="50%" cy="50%" outerRadius={60} dataKey="value">
                {jobTypeData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {jobTypeData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                <span className="text-[10px] text-slate-500">{d.name} ({d.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
