import { useState, useEffect } from "react";
import {
  LayoutDashboard, FileText, Wrench, BarChart3,
  Plus, Building2, DollarSign, Shield, Zap, TrendingUp, AlertTriangle,
  PieChart, Clock, Users, CheckCircle2, XCircle, X, Send, Calendar
} from "lucide-react";
import { DashboardShell, StatCard, SectionHeader, WelcomeBanner, StatusBadge } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart as RePieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from "recharts";

// ========== TOAST COMPONENT (updated to blue-600) ==========
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2 animate-in slide-in-from-right-5">
      <CheckCircle2 className="w-4 h-4" />
      {message}
    </div>
  );
}

// Initial data (unchanged)
const initialActiveServices = [
  { id: "SR-4501", type: "Network Infrastructure Setup", scope: "30-system office LAN + Wi-Fi", status: "in-progress", assigned: "IT Team Alpha", sla: "Jan 20, 2026", budget: 85000 },
  { id: "SR-4502", type: "Antivirus Deployment", scope: "50 endpoint licenses + central mgmt", status: "pending", assigned: "Pending Assignment", sla: "Jan 22, 2026", budget: 25000 },
  { id: "SR-4503", type: "Server Migration to Cloud", scope: "AWS EC2 migration + data transfer", status: "in-progress", assigned: "Cloud Team Beta", sla: "Jan 30, 2026", budget: 150000 },
  { id: "SR-4504", type: "CCTV & Security System", scope: "16 cameras + NVR + remote access", status: "assigned", assigned: "Security Team", sla: "Feb 5, 2026", budget: 60000 },
];

const initialAmcContracts = [
  { id: "AMC-2201", type: "Comprehensive IT AMC", systems: 35, value: 180000, renewalDate: "Mar 31, 2026", status: "active", covered: "Hardware + Software + Network" },
  { id: "AMC-2202", type: "Server & Network AMC", systems: 5, value: 120000, renewalDate: "Jun 30, 2026", status: "active", covered: "Server maintenance + Network monitoring" },
  { id: "AMC-2103", type: "Desktop Support AMC", systems: 50, value: 75000, renewalDate: "Dec 31, 2025", status: "expired", covered: "Hardware repair + OS support" },
];

const initialQuotes = [
  { id: "QT-8801", service: "Bulk Laptop Procurement — 20 units", vendor: "CompuPoint Store", amount: 640000, status: "pending" },
  { id: "QT-8802", service: "Website Redesign & Hosting", vendor: "WebCraft Labs", amount: 85000, status: "review" },
];

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "services", label: "IT Services", icon: Wrench, badge: 0 },
  { id: "contracts", label: "AMC Contracts", icon: FileText, badge: 0 },
  { id: "quotes", label: "Quotes & Invoices", icon: DollarSign, badge: 0 },
  { id: "analytics", label: "IT Analytics", icon: BarChart3 },
];

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};
const saveToStorage = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();

  const [services, setServices] = useState(() => loadFromStorage("biz_services", initialActiveServices));
  const [contracts, setContracts] = useState(() => loadFromStorage("biz_contracts", initialAmcContracts));
  const [quotes, setQuotes] = useState(() => loadFromStorage("biz_quotes", initialQuotes));

  // Modal states (unchanged)
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showEscalateModal, setShowEscalateModal] = useState<{ show: boolean; service: any | null; message: string }>({ show: false, service: null, message: "" });
  const [showTrackModal, setShowTrackModal] = useState<{ show: boolean; service: any | null }>({ show: false, service: null });
  const [showRenewModal, setShowRenewModal] = useState<{ show: boolean; contract: any | null; newDate: string }>({ show: false, contract: null, newDate: "" });
  const [showNewContractModal, setShowNewContractModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [newService, setNewService] = useState({ type: "", scope: "", budget: "", sla: "" });
  const [newContract, setNewContract] = useState({ type: "", systems: "", value: "", covered: "", renewalDate: "" });
  const [newQuote, setNewQuote] = useState({ service: "", vendor: "", amount: "" });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => { saveToStorage("biz_services", services); }, [services]);
  useEffect(() => { saveToStorage("biz_contracts", contracts); }, [contracts]);
  useEffect(() => { saveToStorage("biz_quotes", quotes); }, [quotes]);

  const showToast = (msg: string) => setToastMessage(msg);

  // --- Service actions (unchanged logic) ---
  const addService = () => {
    if (!newService.type || !newService.scope) {
      showToast("Please fill type and scope");
      return;
    }
    const newId = `SR-${Math.floor(Math.random() * 9000) + 1000}`;
    const newSvc = {
      id: newId,
      type: newService.type,
      scope: newService.scope,
      status: "pending",
      assigned: "Not Assigned",
      sla: newService.sla || new Date().toLocaleDateString(),
      budget: parseInt(newService.budget) || 0,
    };
    setServices([newSvc, ...services]);
    setShowServiceModal(false);
    setNewService({ type: "", scope: "", budget: "", sla: "" });
    showToast(`Service ${newId} created`);
  };

  const escalateService = (service: any, message: string) => {
    if (!message) {
      showToast("Please provide escalation reason");
      return;
    }
    setServices(services.map(s => s.id === service.id ? { ...s, priority: "urgent", escalationNote: message } : s));
    setShowEscalateModal({ show: false, service: null, message: "" });
    showToast(`Service ${service.id} escalated with note: ${message}`);
  };

  // --- Contract actions ---
  const renewContract = (contract: any, newDate: string) => {
    if (!newDate) {
      showToast("Please enter a renewal date");
      return;
    }
    setContracts(contracts.map(c => c.id === contract.id ? { ...c, renewalDate: newDate, status: "active" } : c));
    setShowRenewModal({ show: false, contract: null, newDate: "" });
    showToast(`Contract ${contract.id} renewed until ${newDate}`);
  };

  const addContract = () => {
    if (!newContract.type || !newContract.systems) {
      showToast("Please fill type and systems");
      return;
    }
    const newId = `AMC-${Math.floor(Math.random() * 9000) + 1000}`;
    const newCont = {
      id: newId,
      type: newContract.type,
      systems: parseInt(newContract.systems),
      value: parseInt(newContract.value) || 0,
      renewalDate: newContract.renewalDate || "Dec 31, 2026",
      status: "active",
      covered: newContract.covered || "General coverage",
    };
    setContracts([newCont, ...contracts]);
    setShowNewContractModal(false);
    setNewContract({ type: "", systems: "", value: "", covered: "", renewalDate: "" });
    showToast(`AMC ${newId} added`);
  };

  // --- Quote actions ---
  const addQuote = () => {
    if (!newQuote.service || !newQuote.vendor) {
      showToast("Please fill service and vendor");
      return;
    }
    const newId = `QT-${Math.floor(Math.random() * 9000) + 1000}`;
    const newQ = {
      id: newId,
      service: newQuote.service,
      vendor: newQuote.vendor,
      amount: parseInt(newQuote.amount) || 0,
      status: "pending",
    };
    setQuotes([newQ, ...quotes]);
    setShowQuoteModal(false);
    setNewQuote({ service: "", vendor: "", amount: "" });
    showToast(`Quote ${newId} requested`);
  };

  const approveQuote = (quote: any) => {
    setQuotes(quotes.map(q => q.id === quote.id ? { ...q, status: "approved" } : q));
    showToast(`Quote ${quote.id} approved`);
  };

  const rejectQuote = (quote: any) => {
    setQuotes(quotes.map(q => q.id === quote.id ? { ...q, status: "rejected" } : q));
    showToast(`Quote ${quote.id} rejected`);
  };

  // Sidebar badges
  const updatedSidebarItems = sidebarItems.map(item => {
    if (item.id === "services") return { ...item, badge: services.filter(s => s.status !== "completed").length };
    if (item.id === "contracts") return { ...item, badge: contracts.filter(c => c.status === "active").length };
    if (item.id === "quotes") return { ...item, badge: quotes.filter(q => q.status === "pending" || q.status === "review").length };
    return item;
  });

  if (!user) return null;

  return (
    <>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      {/* Modals (unchanged content, only button colors updated to blue) */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">New Service Request</h3>
              <button onClick={() => setShowServiceModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Service Type" value={newService.type} onChange={e => setNewService({...newService, type: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <textarea placeholder="Scope / Description" value={newService.scope} onChange={e => setNewService({...newService, scope: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              <input type="number" placeholder="Budget (₹)" value={newService.budget} onChange={e => setNewService({...newService, budget: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input type="text" placeholder="SLA Date (e.g., Feb 15, 2026)" value={newService.sla} onChange={e => setNewService({...newService, sla: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <div className="flex gap-2">
                <button onClick={addService} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">Create</button>
                <button onClick={() => setShowServiceModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEscalateModal.show && showEscalateModal.service && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-2">Escalate Service</h3>
            <p className="text-sm text-slate-500 mb-3">{showEscalateModal.service.type}</p>
            <textarea rows={3} placeholder="Reason for escalation..." value={showEscalateModal.message} onChange={e => setShowEscalateModal({ ...showEscalateModal, message: e.target.value })} className="w-full px-3 py-2 border rounded-lg mb-4 bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            <div className="flex gap-2">
              <button onClick={() => escalateService(showEscalateModal.service, showEscalateModal.message)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Submit Escalation</button>
              <button onClick={() => setShowEscalateModal({ show: false, service: null, message: "" })} className="flex-1 border rounded-lg py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showTrackModal.show && showTrackModal.service && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Service Details</h3>
              <button onClick={() => setShowTrackModal({ show: false, service: null })}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>ID:</strong> {showTrackModal.service.id}</p>
              <p><strong>Type:</strong> {showTrackModal.service.type}</p>
              <p><strong>Scope:</strong> {showTrackModal.service.scope}</p>
              <p><strong>Status:</strong> <StatusBadge status={showTrackModal.service.status} /></p>
              <p><strong>Assigned:</strong> {showTrackModal.service.assigned}</p>
              <p><strong>SLA:</strong> {showTrackModal.service.sla}</p>
              <p><strong>Budget:</strong> ₹{showTrackModal.service.budget.toLocaleString()}</p>
            </div>
            <button onClick={() => setShowTrackModal({ show: false, service: null })} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Close</button>
          </div>
        </div>
      )}

      {showRenewModal.show && showRenewModal.contract && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-2">Renew Contract</h3>
            <p className="text-sm mb-2">{showRenewModal.contract.type}</p>
            <input type="text" placeholder="New Renewal Date (e.g., Dec 31, 2027)" value={showRenewModal.newDate} onChange={e => setShowRenewModal({ ...showRenewModal, newDate: e.target.value })} className="w-full px-3 py-2 border rounded-lg mb-4 bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <div className="flex gap-2">
              <button onClick={() => renewContract(showRenewModal.contract, showRenewModal.newDate)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Renew</button>
              <button onClick={() => setShowRenewModal({ show: false, contract: null, newDate: "" })} className="flex-1 border rounded-lg py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showNewContractModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">New AMC Contract</h3>
              <button onClick={() => setShowNewContractModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Contract Type" value={newContract.type} onChange={e => setNewContract({...newContract, type: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input type="number" placeholder="Number of Systems" value={newContract.systems} onChange={e => setNewContract({...newContract, systems: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input type="number" placeholder="Annual Value (₹)" value={newContract.value} onChange={e => setNewContract({...newContract, value: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input type="text" placeholder="Coverage Description" value={newContract.covered} onChange={e => setNewContract({...newContract, covered: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input type="text" placeholder="Renewal Date (e.g., Dec 31, 2027)" value={newContract.renewalDate} onChange={e => setNewContract({...newContract, renewalDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <div className="flex gap-2">
                <button onClick={addContract} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Add Contract</button>
                <button onClick={() => setShowNewContractModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Request Quote</h3>
              <button onClick={() => setShowQuoteModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Service / Product" value={newQuote.service} onChange={e => setNewQuote({...newQuote, service: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input type="text" placeholder="Vendor Name" value={newQuote.vendor} onChange={e => setNewQuote({...newQuote, vendor: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input type="number" placeholder="Estimated Amount (₹)" value={newQuote.amount} onChange={e => setNewQuote({...newQuote, amount: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <div className="flex gap-2">
                <button onClick={addQuote} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Submit Request</button>
                <button onClick={() => setShowQuoteModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <DashboardShell
        sidebarItems={updatedSidebarItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        title="Business Dashboard"
        roleColor="text-blue-600 dark:text-blue-400"
        roleBg="bg-blue-50 dark:bg-blue-900/20"
      >
        {activeTab === "overview" && (
          <OverviewTab
            user={user}
            services={services}
            contracts={contracts}
            quotes={quotes}
            onNewService={() => setShowServiceModal(true)}
            onTrack={(s) => setShowTrackModal({ show: true, service: s })}
            onEscalate={(s) => setShowEscalateModal({ show: true, service: s, message: "" })}
            onRenewContract={(c) => setShowRenewModal({ show: true, contract: c, newDate: "" })}
            onNewContract={() => setShowNewContractModal(true)}
          />
        )}
        {activeTab === "services" && (
          <ServicesTab
            services={services}
            onNewService={() => setShowServiceModal(true)}
            onTrack={(s) => setShowTrackModal({ show: true, service: s })}
            onEscalate={(s) => setShowEscalateModal({ show: true, service: s, message: "" })}
          />
        )}
        {activeTab === "contracts" && (
          <ContractsTab
            contracts={contracts}
            onNewContract={() => setShowNewContractModal(true)}
            onRenew={(c) => setShowRenewModal({ show: true, contract: c, newDate: "" })}
          />
        )}
        {activeTab === "quotes" && (
          <QuotesTab
            quotes={quotes}
            onNewQuote={() => setShowQuoteModal(true)}
            onApprove={approveQuote}
            onReject={rejectQuote}
          />
        )}
        {activeTab === "analytics" && <AnalyticsTab services={services} contracts={contracts} quotes={quotes} />}
      </DashboardShell>
    </>
  );
}

// ========== OVERVIEW TAB (updated colors) ==========
function OverviewTab({ user, services, contracts, quotes, onNewService, onTrack, onEscalate, onRenewContract, onNewContract }: any) {
  const activeServices = services.filter((s: any) => s.status !== "completed");
  const activeAMCs = contracts.filter((c: any) => c.status === "active");
  const pendingQuotes = quotes.filter((q: any) => q.status === "pending" || q.status === "review");
  const totalBudget = activeServices.reduce((sum: number, s: any) => sum + s.budget, 0);

  return (
    <div className="space-y-5">
      <WelcomeBanner name={user.name} message={`${activeServices.length} active IT services • ${activeAMCs.length} AMC contracts • ${pendingQuotes.length} pending quotes`} icon={Building2} gradient="from-blue-600 to-cyan-600" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Wrench} label="Active Services" value={activeServices.length} change="2 in progress" color="blue" />
        <StatCard icon={FileText} label="AMC Contracts" value={activeAMCs.length} change="1 expiring soon" color="blue" />
        <StatCard icon={DollarSign} label="Total Service Budget" value={`₹${(totalBudget / 1000).toFixed(0)}K`} change="+12% vs last month" color="cyan" />
        <StatCard icon={Shield} label="Uptime SLA" value="99.2%" change="Meeting targets" color="green" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <SectionHeader title="Active Service Requests" action={<button onClick={onNewService} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg flex items-center gap-1"><Plus className="w-3.5 h-3.5" />New Request</button>} />
          <div className="space-y-2.5">
            {activeServices.slice(0, 3).map((s: any) => (
              <div key={s.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono text-slate-400">{s.id}</span>
                      <StatusBadge status={s.status} />
                    </div>
                    <p className="text-xs font-semibold">{s.type}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{s.scope}</p>
                    <p className="text-[11px] text-slate-400">SLA: {s.sla}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-bold text-blue-600">₹{(s.budget / 1000).toFixed(0)}K</span>
                    <button onClick={() => onTrack(s)} className="text-[10px] text-blue-600 hover:underline">Track</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold mb-3">Monthly IT Spend (₹)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={[{ month: "Aug", spend: 45000 }, { month: "Sep", spend: 62000 }, { month: "Oct", spend: 38000 }, { month: "Nov", spend: 75000 }, { month: "Dec", spend: 92000 }, { month: "Jan", spend: 58000 }]}>
              <defs><linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} /><stop offset="95%" stopColor="#2563EB" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `₹${v / 1000}K`} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
              <Area type="monotone" dataKey="spend" stroke="#2563EB" strokeWidth={2} fill="url(#spendGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card-base p-4">
        <SectionHeader title="AMC Contract Status" action={<button onClick={onNewContract} className="text-xs text-blue-600 hover:underline">+ New AMC</button>} />
        <div className="space-y-2.5">
          {contracts.slice(0, 3).map((amc: any) => (
            <div key={amc.id} className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <p className="text-xs font-semibold">{amc.type}</p>
                <p className="text-[11px] text-slate-400">{amc.systems} systems • {amc.covered}</p>
                <p className="text-[11px] text-slate-400">Renewal: {amc.renewalDate}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-blue-600">₹{(amc.value / 1000).toFixed(0)}K</p>
                {amc.status === "expired" ? (
                  <button onClick={() => onRenewContract(amc)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 mt-1 rounded-lg">Renew</button>
                ) : (
                  <StatusBadge status={amc.status} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== SERVICES TAB ==========
function ServicesTab({ services, onNewService, onTrack, onEscalate }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="IT Service Requests" action={<button onClick={onNewService} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg flex items-center gap-1"><Plus className="w-3.5 h-3.5" />New Request</button>} />
      <div className="space-y-3">
        {services.map((s: any) => (
          <div key={s.id} className="card-base p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono text-slate-400">{s.id}</span>
                  <StatusBadge status={s.status} />
                </div>
                <h3 className="text-sm font-semibold">{s.type}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{s.scope}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-xs">
                  <span className="text-slate-500">Assigned: <span className="font-medium">{s.assigned}</span></span>
                  <span className="text-slate-500">SLA: <span className="font-medium">{s.sla}</span></span>
                  <span className="font-bold text-blue-600">₹{s.budget.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <button onClick={() => onTrack(s)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg">Track</button>
                <button onClick={() => onEscalate(s)} className="text-xs px-3 py-1.5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Escalate</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== CONTRACTS TAB ==========
function ContractsTab({ contracts, onNewContract, onRenew }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="AMC Contracts" action={<button onClick={onNewContract} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg">+ New AMC</button>} />
      <div className="space-y-3">
        {contracts.map((amc: any) => (
          <div key={amc.id} className={cn("card-base p-4", amc.status === "expired" && "opacity-75")}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-slate-400">{amc.id}</span>
                  <StatusBadge status={amc.status} />
                </div>
                <h3 className="text-sm font-semibold">{amc.type}</h3>
                <p className="text-xs text-slate-400">{amc.systems} systems covered</p>
                <p className="text-xs text-slate-400">{amc.covered}</p>
                <p className="text-xs font-medium mt-1">
                  {amc.status === "expired" ? (
                    <span className="text-red-600">Expired — please renew</span>
                  ) : (
                    <span className="text-slate-500">Renewal due: {amc.renewalDate}</span>
                  )}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-base font-bold text-blue-600">₹{amc.value.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400">per year</p>
                {amc.status === "expired" ? (
                  <button onClick={() => onRenew(amc)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 mt-2 rounded-lg">Renew Now</button>
                ) : (
                  <button onClick={() => onRenew(amc)} className="text-xs px-3 py-1.5 mt-2 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Renew</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== QUOTES TAB ==========
function QuotesTab({ quotes, onNewQuote, onApprove, onReject }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="Quotes & Invoices" action={<button onClick={onNewQuote} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg">Request Quote</button>} />
      <div className="space-y-3">
        {quotes.map((q: any) => (
          <div key={q.id} className="card-base p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-slate-400">{q.id}</span>
                <h3 className="text-sm font-semibold mt-0.5">{q.service}</h3>
                <p className="text-xs text-slate-400">Vendor: {q.vendor}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-base font-bold text-blue-600">₹{q.amount.toLocaleString()}</p>
                <StatusBadge status={q.status} />
                {(q.status === "pending" || q.status === "review") && (
                  <div className="flex gap-1.5 mt-2">
                    <button onClick={() => onApprove(q)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2.5 py-1 rounded-lg">Approve</button>
                    <button onClick={() => onReject(q)} className="text-xs px-2.5 py-1 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Reject</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== ANALYTICS TAB (updated chart colors) ==========
function AnalyticsTab({ services, contracts, quotes }: any) {
  const activeServiceBudget = services.reduce((sum: number, s: any) => sum + s.budget, 0);
  const totalContractValue = contracts.reduce((sum: number, c: any) => sum + c.value, 0);
  const pendingQuoteAmount = quotes.filter((q: any) => q.status !== "approved" && q.status !== "rejected").reduce((sum: number, q: any) => sum + q.amount, 0);
  
  const statusCount = {
    "in-progress": services.filter((s: any) => s.status === "in-progress").length,
    assigned: services.filter((s: any) => s.status === "assigned").length,
    pending: services.filter((s: any) => s.status === "pending").length,
  };
  const serviceStatusData = Object.entries(statusCount).map(([name, value]) => ({ name, value }));
  const amcValueData = contracts.map((c: any) => ({ name: c.type.split(" ")[0], value: c.value }));

  return (
    <div className="space-y-5">
      <SectionHeader title="IT Operations Analytics" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard icon={DollarSign} label="Active Service Budget" value={`₹${(activeServiceBudget / 1000).toFixed(0)}K`} change="In progress" color="blue" />
        <StatCard icon={FileText} label="Total AMC Value" value={`₹${(totalContractValue / 1000).toFixed(0)}K`} change="Annual" color="blue" />
        <StatCard icon={DollarSign} label="Pending Quote Amount" value={`₹${(pendingQuoteAmount / 1000).toFixed(0)}K`} change="Awaiting approval" color="cyan" />
        <StatCard icon={Shield} label="Avg SLA Compliance" value="98.7%" change="+0.5%" color="green" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold mb-3">Service Request Status</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={serviceStatusData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563EB" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold mb-3">AMC Contract Value Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <RePieChart>
              <Pie data={amcValueData} cx="50%" cy="50%" outerRadius={60} dataKey="value" label>
                {amcValueData.map((_, i) => <Cell key={i} fill={["#2563EB", "#06B6D4", "#3B82F6"][i % 3]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold mb-3">Support Tickets per Week</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={[{ week: "W1", tickets: 8 }, { week: "W2", tickets: 12 }, { week: "W3", tickets: 5 }, { week: "W4", tickets: 9 }, { week: "W5", tickets: 14 }]}>
              <XAxis dataKey="week" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="tickets" fill="#06B6D4" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold mb-3">Monthly IT Spend Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={[{ month: "Aug", spend: 45000 }, { month: "Sep", spend: 62000 }, { month: "Oct", spend: 38000 }, { month: "Nov", spend: 75000 }, { month: "Dec", spend: 92000 }, { month: "Jan", spend: 58000 }]}>
              <defs><linearGradient id="spendGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} /><stop offset="95%" stopColor="#2563EB" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={(v) => `₹${v/1000}K`} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
              <Area type="monotone" dataKey="spend" stroke="#2563EB" fill="url(#spendGrad2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}