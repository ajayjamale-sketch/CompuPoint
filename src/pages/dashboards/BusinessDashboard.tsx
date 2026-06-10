import { useState } from "react";
import {
  LayoutDashboard, FileText, Wrench, BarChart3,
  Plus, Building2, DollarSign, Shield, Zap, TrendingUp, AlertTriangle
} from "lucide-react";
import { DashboardShell, StatCard, SectionHeader, WelcomeBanner, StatusBadge } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "services", label: "IT Services", icon: Wrench, badge: 4 },
  { id: "contracts", label: "AMC Contracts", icon: FileText, badge: 2 },
  { id: "quotes", label: "Quotes & Invoices", icon: DollarSign },
  { id: "analytics", label: "IT Analytics", icon: BarChart3 },
];

const activeServices = [
  { id: "SR-4501", type: "Network Infrastructure Setup", scope: "30-system office LAN + Wi-Fi", status: "in-progress", assigned: "IT Team Alpha", sla: "Jan 20, 2026", budget: 85000 },
  { id: "SR-4502", type: "Antivirus Deployment", scope: "50 endpoint licenses + central mgmt", status: "pending", assigned: "Pending Assignment", sla: "Jan 22, 2026", budget: 25000 },
  { id: "SR-4503", type: "Server Migration to Cloud", scope: "AWS EC2 migration + data transfer", status: "in-progress", assigned: "Cloud Team Beta", sla: "Jan 30, 2026", budget: 150000 },
  { id: "SR-4504", type: "CCTV & Security System", scope: "16 cameras + NVR + remote access", status: "assigned", assigned: "Security Team", sla: "Feb 5, 2026", budget: 60000 },
];

const amcContracts = [
  { id: "AMC-2201", type: "Comprehensive IT AMC", systems: 35, value: 180000, renewalDate: "Mar 31, 2026", status: "active", covered: "Hardware + Software + Network" },
  { id: "AMC-2202", type: "Server & Network AMC", systems: 5, value: 120000, renewalDate: "Jun 30, 2026", status: "active", covered: "Server maintenance + Network monitoring" },
  { id: "AMC-2103", type: "Desktop Support AMC", systems: 50, value: 75000, renewalDate: "Dec 31, 2025", status: "expired", covered: "Hardware repair + OS support" },
];

const pendingQuotes = [
  { id: "QT-8801", service: "Bulk Laptop Procurement — 20 units", vendor: "CompuPoint Store", amount: 640000, status: "pending" },
  { id: "QT-8802", service: "Website Redesign & Hosting", vendor: "WebCraft Labs", amount: 85000, status: "review" },
];

const spendData = [
  { month: "Aug", spend: 45000 }, { month: "Sep", spend: 62000 }, { month: "Oct", spend: 38000 },
  { month: "Nov", spend: 75000 }, { month: "Dec", spend: 92000 }, { month: "Jan", spend: 58000 },
];

const ticketTrendData = [
  { week: "W1", tickets: 8 }, { week: "W2", tickets: 12 }, { week: "W3", tickets: 5 },
  { week: "W4", tickets: 9 }, { week: "W5", tickets: 14 },
];

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  if (!user) return null;

  return (
    <DashboardShell
      sidebarItems={sidebarItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title="Business Dashboard"
      roleColor="text-cyan-600 dark:text-cyan-400"
      roleBg="bg-cyan-50 dark:bg-cyan-900/20"
    >
      {activeTab === "overview" && <OverviewTab user={user} />}
      {activeTab === "services" && <ServicesTab />}
      {activeTab === "contracts" && <ContractsTab />}
      {activeTab === "quotes" && <QuotesTab />}
      {activeTab === "analytics" && <AnalyticsTab />}

    </DashboardShell>
  );
}

function OverviewTab({ user }: { user: NonNullable<ReturnType<typeof useAuth>["user"]> }) {
  return (
    <div className="space-y-5">
      <WelcomeBanner name={user.name} message={`${user.organization} • ${activeServices.length} active IT services • ${amcContracts.filter(a => a.status === "active").length} AMC contracts`} icon={Building2} gradient="from-cyan-600 to-teal-600" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Wrench} label="Active Services" value={activeServices.length} change="2 in progress" color="cyan" />
        <StatCard icon={FileText} label="AMC Contracts" value={amcContracts.filter(a => a.status === "active").length} change="1 expiring soon" color="blue" />
        <StatCard icon={DollarSign} label="IT Spend MTD" value="₹58K" change="+12% vs last month" color="orange" />
        <StatCard icon={Shield} label="Uptime SLA" value="99.2%" change="Meeting targets" color="green" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <SectionHeader title="Active Service Requests" action={<button className="btn-primary text-xs px-3 py-2"><Plus className="w-3.5 h-3.5" />New Request</button>} />
          <div className="space-y-2.5">
            {activeServices.slice(0, 3).map((s) => (
              <div key={s.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono text-slate-400">{s.id}</span>
                      <StatusBadge status={s.status} />
                    </div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{s.type}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{s.scope}</p>
                    <p className="text-[11px] text-slate-400">SLA: {s.sla}</p>
                  </div>
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex-shrink-0">₹{(s.budget / 1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Monthly IT Spend (₹)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={spendData}>
              <defs>
                <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Spend"]} />
              <Area type="monotone" dataKey="spend" stroke="#0891b2" strokeWidth={2} fill="url(#spendGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card-base p-4">
        <SectionHeader title="AMC Contract Status" />
        <div className="space-y-2.5">
          {amcContracts.map((amc) => (
            <div key={amc.id} className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">{amc.type}</p>
                <p className="text-[11px] text-slate-400">{amc.systems} systems • {amc.covered}</p>
                <p className="text-[11px] text-slate-400">Renewal: {amc.renewalDate}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-cyan-600">₹{(amc.value / 1000).toFixed(0)}K</p>
                <StatusBadge status={amc.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="IT Service Requests" subtitle="Track all ongoing and scheduled IT work" action={<button className="btn-primary text-xs px-3 py-2"><Plus className="w-3.5 h-3.5" />New Request</button>} />
      <div className="space-y-3">
        {activeServices.map((s) => (
          <div key={s.id} className="card-base p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono text-slate-400">{s.id}</span>
                  <StatusBadge status={s.status} />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{s.type}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{s.scope}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-xs">
                  <span className="text-slate-500">Assigned: <span className="text-slate-700 dark:text-slate-300 font-medium">{s.assigned}</span></span>
                  <span className="text-slate-500">SLA: <span className="text-slate-700 dark:text-slate-300 font-medium">{s.sla}</span></span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">₹{s.budget.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <button className="btn-primary text-xs px-3 py-1.5">Track</button>
                <button className="text-xs px-3 py-1.5 border border-border rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Escalate</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContractsTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="AMC Contracts" subtitle="Annual Maintenance Contract management" action={<button className="btn-primary text-xs px-3 py-2">Request New AMC</button>} />
      <div className="space-y-3">
        {amcContracts.map((amc) => (
          <div key={amc.id} className={cn("card-base p-4", amc.status === "expired" && "opacity-75")}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-slate-400">{amc.id}</span>
                  <StatusBadge status={amc.status} />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{amc.type}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{amc.systems} systems covered</p>
                <p className="text-xs text-slate-400">{amc.covered}</p>
                <p className="text-xs font-medium mt-1">
                  {amc.status === "expired" ? (
                    <span className="text-red-600 dark:text-red-400">Expired — please renew</span>
                  ) : (
                    <span className="text-slate-500">Renewal due: {amc.renewalDate}</span>
                  )}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-base font-bold text-cyan-600 dark:text-cyan-400">₹{amc.value.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400">per year</p>
                {amc.status === "expired" ? (
                  <button className="btn-primary text-xs px-3 py-1.5 mt-2 bg-red-600 hover:bg-red-700">Renew Now</button>
                ) : (
                  <button className="text-xs px-3 py-1.5 mt-2 border border-border rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">View Details</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuotesTab() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Quotes & Invoices" action={<button className="btn-primary text-xs px-3 py-2">Request Quote</button>} />
      <div className="space-y-3">
        {pendingQuotes.map((q) => (
          <div key={q.id} className="card-base p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-slate-400">{q.id}</span>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">{q.service}</h3>
                <p className="text-xs text-slate-400">Vendor: {q.vendor}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-base font-bold text-cyan-600">₹{q.amount.toLocaleString()}</p>
                <StatusBadge status={q.status} />
                <div className="flex gap-1.5 mt-2">
                  <button className="btn-primary text-xs px-2.5 py-1">Approve</button>
                  <button className="text-xs px-2.5 py-1 border border-border rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Reject</button>
                </div>
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
      <SectionHeader title="IT Operations Analytics" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">IT Spend Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={spendData}>
              <defs>
                <linearGradient id="bizGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Area type="monotone" dataKey="spend" stroke="#0891b2" strokeWidth={2} fill="url(#bizGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">Support Tickets per Week</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={ticketTrendData}>
              <XAxis dataKey="week" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: "11px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Bar dataKey="tickets" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
