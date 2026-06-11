import { useState, useEffect } from "react";
import {
  LayoutDashboard, Wrench, ClipboardList, Star, BarChart3,
  MapPin, Clock, CheckCircle2, AlertTriangle, Package, Zap, Plus, Phone,
  X, Edit, Send, Calendar as CalendarIcon, RefreshCw, TrendingUp, DollarSign, Users, Target, PieChart as PieChartIcon
} from "lucide-react";
import { DashboardShell, StatCard, SectionHeader, WelcomeBanner, StatusBadge } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, AreaChart, Area
} from "recharts";

// ========== TOAST COMPONENT (updated to blue) ==========
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

const priorityMap: Record<string, string> = {
  urgent: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-100",
  high: "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border border-orange-100",
  medium: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-100",
  low: "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700",
};

// Initial data (unchanged)
const initialActiveJobs = [
  { id: "JB-2610", customer: "Rajesh Mehta", type: "Laptop Screen Replacement", device: "HP Pavilion 15-eg", priority: "high", status: "in-progress", time: "Est. 2h remaining", location: "Shop", contact: "+91 98765 43210", startTime: "2026-01-15T10:00" },
  { id: "JB-2609", customer: "Anjali Singh", type: "Virus Removal & OS Cleanup", device: "Dell Inspiron 14", priority: "medium", status: "in-progress", time: "Est. 45min", location: "On-site", contact: "+91 87654 32109", startTime: "2026-01-15T09:30" },
  { id: "JB-2608", customer: "Tech Solutions Ltd", type: "Network Setup — 20 Systems", device: "Office Network", priority: "urgent", status: "assigned", time: "Starts at 3:00 PM", location: "Client Office", contact: "+91 76543 21098", startTime: null },
  { id: "JB-2607", customer: "Priya Nair", type: "Data Recovery — HDD Failure", device: "Seagate 1TB HDD", priority: "high", status: "in-progress", time: "Est. 4h", location: "Shop", contact: "+91 65432 10987", startTime: "2026-01-14T14:00" },
  { id: "JB-2606", customer: "StartupHub Pvt Ltd", type: "Server Maintenance AMC", device: "Dell PowerEdge Server", priority: "medium", status: "assigned", time: "Scheduled 5:00 PM", location: "Client Site", contact: "+91 54321 09876", startTime: null },
];

const initialQueuedJobs = [
  { id: "JB-2611", customer: "Mohammed Ali", type: "Keyboard Replacement", device: "Lenovo ThinkPad", priority: "low", status: "pending", scheduled: "Tomorrow 10AM" },
  { id: "JB-2612", customer: "Sunita Sharma", type: "RAM Upgrade — 8GB to 16GB", device: "ASUS VivoBook", priority: "medium", status: "pending", scheduled: "Tomorrow 2PM" },
  { id: "JB-2613", customer: "Global Corp", type: "20x Antivirus Install", device: "Corporate PCs", priority: "medium", status: "pending", scheduled: "Jan 18, 9AM" },
];

const initialJobHistory = [
  { id: "JB-2605", type: "Motherboard Repair", customer: "Vikram Joshi", completedAt: "2026-01-10", rating: 5, revenue: 3500, duration: 3 },
  { id: "JB-2604", type: "Data Backup & Migration", customer: "FreshMart Ltd", completedAt: "2026-01-09", rating: 4, revenue: 2000, duration: 2 },
  { id: "JB-2603", type: "GPU Replacement", customer: "Gaming Zone", completedAt: "2026-01-08", rating: 5, revenue: 8500, duration: 4 },
  { id: "JB-2602", type: "Screen Repair", customer: "Neha Gupta", completedAt: "2026-01-07", rating: 4, revenue: 4500, duration: 2 },
  { id: "JB-2601", type: "OS Installation", customer: "Rohan Das", completedAt: "2026-01-06", rating: 5, revenue: 1200, duration: 1 },
];

const initialPartsInventory = [
  { id: "p1", name: "DDR4 8GB RAM — Kingston", stock: 12, unit: "units", threshold: 5, status: "ok" },
  { id: "p2", name: "2.5\" 1TB HDD — Seagate", stock: 3, unit: "units", threshold: 5, status: "low" },
  { id: "p3", name: "15.6\" FHD Screen Panel", stock: 0, unit: "units", threshold: 3, status: "out" },
  { id: "p4", name: "Laptop Keyboard Generic", stock: 8, unit: "units", threshold: 4, status: "ok" },
  { id: "p5", name: "Thermal Paste", stock: 2, unit: "tubes", threshold: 5, status: "low" },
];

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "jobs", label: "Active Jobs", icon: Wrench, badge: 0 },
  { id: "queue", label: "Job Queue", icon: ClipboardList, badge: 0 },
  { id: "parts", label: "Parts & Inventory", icon: Package },
  { id: "history", label: "Job History", icon: Clock },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};
const saveToStorage = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default function TechnicianDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();

  const [activeJobs, setActiveJobs] = useState(() => loadFromStorage("tech_activeJobs", initialActiveJobs));
  const [queuedJobs, setQueuedJobs] = useState(() => loadFromStorage("tech_queuedJobs", initialQueuedJobs));
  const [jobHistory, setJobHistory] = useState(() => loadFromStorage("tech_jobHistory", initialJobHistory));
  const [partsInventory, setPartsInventory] = useState(() => loadFromStorage("tech_partsInventory", initialPartsInventory));

  // Modal states (unchanged)
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState<{ show: boolean; job: any | null }>({ show: false, job: null });
  const [showViewDetailsModal, setShowViewDetailsModal] = useState<{ show: boolean; job: any | null }>({ show: false, job: null });
  const [showAcceptModal, setShowAcceptModal] = useState<{ show: boolean; job: any | null }>({ show: false, job: null });
  const [showRescheduleModal, setShowRescheduleModal] = useState<{ show: boolean; job: any | null; newSchedule: string }>({ show: false, job: null, newSchedule: "" });
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [showAddPartModal, setShowAddPartModal] = useState(false);
  const [showReorderModal, setShowReorderModal] = useState<{ show: boolean; part: any | null; quantity: number }>({ show: false, part: null, quantity: 1 });
  const [newJobForm, setNewJobForm] = useState({ customer: "", type: "", device: "", priority: "medium", location: "Shop", contact: "", scheduled: "" });
  const [newPartForm, setNewPartForm] = useState({ name: "", stock: "", unit: "units", threshold: "" });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => { saveToStorage("tech_activeJobs", activeJobs); }, [activeJobs]);
  useEffect(() => { saveToStorage("tech_queuedJobs", queuedJobs); }, [queuedJobs]);
  useEffect(() => { saveToStorage("tech_jobHistory", jobHistory); }, [jobHistory]);
  useEffect(() => { saveToStorage("tech_partsInventory", partsInventory); }, [partsInventory]);

  const showToast = (msg: string) => setToastMessage(msg);

  const updatePartStatus = (part: any) => {
    let status = "ok";
    if (part.stock === 0) status = "out";
    else if (part.stock < part.threshold) status = "low";
    else status = "ok";
    return { ...part, status };
  };

  const updateJobStatus = (job: any, newStatus: string) => {
    if (newStatus === "completed") {
      const completedJob = {
        id: job.id,
        type: job.type,
        customer: job.customer,
        completedAt: new Date().toISOString().slice(0,10),
        rating: 5,
        revenue: Math.floor(Math.random() * 5000) + 1000,
        duration: Math.floor(Math.random() * 5) + 1
      };
      setJobHistory([completedJob, ...jobHistory]);
      setActiveJobs(activeJobs.filter(j => j.id !== job.id));
      showToast(`Job ${job.id} completed and moved to history`);
    } else {
      setActiveJobs(activeJobs.map(j => j.id === job.id ? { ...j, status: newStatus } : j));
      showToast(`Job ${job.id} status updated to ${newStatus}`);
    }
    setShowUpdateStatusModal({ show: false, job: null });
  };

  const acceptJob = (job: any) => {
    const newActiveJob = {
      ...job,
      status: "assigned",
      time: "Est. 2h",
      location: job.location || "Shop",
      contact: job.contact || "+91 00000 00000",
      startTime: new Date().toISOString()
    };
    setActiveJobs([newActiveJob, ...activeJobs]);
    setQueuedJobs(queuedJobs.filter(j => j.id !== job.id));
    setShowAcceptModal({ show: false, job: null });
    showToast(`Job ${job.id} accepted and added to active jobs`);
  };

  const rescheduleJob = (job: any, newSchedule: string) => {
    setQueuedJobs(queuedJobs.map(j => j.id === job.id ? { ...j, scheduled: newSchedule } : j));
    setShowRescheduleModal({ show: false, job: null, newSchedule: "" });
    showToast(`Job ${job.id} rescheduled to ${newSchedule}`);
  };

  const addNewJob = () => {
    if (!newJobForm.customer || !newJobForm.type) {
      showToast("Please fill customer and type");
      return;
    }
    const newId = `JB-${Math.floor(Math.random() * 9000) + 1000}`;
    const newJob = {
      id: newId,
      customer: newJobForm.customer,
      type: newJobForm.type,
      device: newJobForm.device || "Not specified",
      priority: newJobForm.priority,
      status: "pending",
      scheduled: newJobForm.scheduled || new Date().toLocaleDateString(),
      location: newJobForm.location,
      contact: newJobForm.contact,
    };
    setQueuedJobs([newJob, ...queuedJobs]);
    setShowAddJobModal(false);
    setNewJobForm({ customer: "", type: "", device: "", priority: "medium", location: "Shop", contact: "", scheduled: "" });
    showToast(`Job ${newId} added to queue`);
  };

  const addNewPart = () => {
    if (!newPartForm.name || !newPartForm.stock) {
      showToast("Please fill part name and stock quantity");
      return;
    }
    const newId = `p${partsInventory.length + 1}`;
    const stockNum = parseInt(newPartForm.stock);
    const thresholdNum = parseInt(newPartForm.threshold) || 5;
    let status = "ok";
    if (stockNum === 0) status = "out";
    else if (stockNum < thresholdNum) status = "low";
    const newPart = { id: newId, name: newPartForm.name, stock: stockNum, unit: newPartForm.unit, threshold: thresholdNum, status };
    setPartsInventory([...partsInventory, newPart]);
    setShowAddPartModal(false);
    setNewPartForm({ name: "", stock: "", unit: "units", threshold: "" });
    showToast(`Part "${newPartForm.name}" added to inventory`);
  };

  const reorderPart = (part: any, quantity: number) => {
    if (quantity <= 0) { showToast("Enter a valid quantity"); return; }
    const newStock = part.stock + quantity;
    const updatedPart = updatePartStatus({ ...part, stock: newStock });
    setPartsInventory(partsInventory.map(p => p.id === part.id ? updatedPart : p));
    setShowReorderModal({ show: false, part: null, quantity: 1 });
    showToast(`Ordered ${quantity} ${part.unit} of ${part.name}. New stock: ${newStock}`);
  };

  const updatedSidebarItems = sidebarItems.map(item => {
    if (item.id === "jobs") return { ...item, badge: activeJobs.length };
    if (item.id === "queue") return { ...item, badge: queuedJobs.length };
    return item;
  });

  if (!user) return null;

  return (
    <>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      {/* Modals (only button colors updated to blue) */}
      {showUpdateStatusModal.show && showUpdateStatusModal.job && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Update Job Status</h3>
              <button onClick={() => setShowUpdateStatusModal({ show: false, job: null })}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <p className="text-sm">Job: <span className="font-semibold">{showUpdateStatusModal.job.id} - {showUpdateStatusModal.job.type}</span></p>
              <div className="flex gap-2">
                <button onClick={() => updateJobStatus(showUpdateStatusModal.job, "in-progress")} className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm">In Progress</button>
                <button onClick={() => updateJobStatus(showUpdateStatusModal.job, "completed")} className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm">Completed</button>
              </div>
              <button onClick={() => setShowUpdateStatusModal({ show: false, job: null })} className="w-full px-3 py-2 border rounded-lg text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showViewDetailsModal.show && showViewDetailsModal.job && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Job Details</h3>
              <button onClick={() => setShowViewDetailsModal({ show: false, job: null })}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>ID:</strong> {showViewDetailsModal.job.id}</p>
              <p><strong>Customer:</strong> {showViewDetailsModal.job.customer}</p>
              <p><strong>Type:</strong> {showViewDetailsModal.job.type}</p>
              <p><strong>Device:</strong> {showViewDetailsModal.job.device}</p>
              <p><strong>Priority:</strong> <span className={cn("px-2 py-0.5 rounded-full text-xs", priorityMap[showViewDetailsModal.job.priority])}>{showViewDetailsModal.job.priority}</span></p>
              <p><strong>Location:</strong> {showViewDetailsModal.job.location}</p>
              <p><strong>Contact:</strong> {showViewDetailsModal.job.contact}</p>
              <p><strong>Time:</strong> {showViewDetailsModal.job.time || "Not scheduled"}</p>
            </div>
            <button onClick={() => setShowViewDetailsModal({ show: false, job: null })} className="w-full mt-4 px-3 py-2 bg-blue-600 text-white rounded-lg">Close</button>
          </div>
        </div>
      )}

      {showAcceptModal.show && showAcceptModal.job && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-2">Accept Job?</h3>
            <p className="text-sm mb-4">Move "{showAcceptModal.job.type}" from queue to active jobs?</p>
            <div className="flex gap-2">
              <button onClick={() => acceptJob(showAcceptModal.job)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Yes, Accept</button>
              <button onClick={() => setShowAcceptModal({ show: false, job: null })} className="flex-1 border rounded-lg py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showRescheduleModal.show && showRescheduleModal.job && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-2">Reschedule Job</h3>
            <input type="text" value={showRescheduleModal.newSchedule} onChange={e => setShowRescheduleModal({ ...showRescheduleModal, newSchedule: e.target.value })} placeholder="e.g., Tomorrow 11AM" className="w-full px-3 py-2 border rounded-lg mb-4" />
            <div className="flex gap-2">
              <button onClick={() => rescheduleJob(showRescheduleModal.job, showRescheduleModal.newSchedule)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Save</button>
              <button onClick={() => setShowRescheduleModal({ show: false, job: null, newSchedule: "" })} className="flex-1 border rounded-lg py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showAddJobModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Add New Job</h3>
              <button onClick={() => setShowAddJobModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Customer Name" value={newJobForm.customer} onChange={e => setNewJobForm({...newJobForm, customer: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" placeholder="Job Type" value={newJobForm.type} onChange={e => setNewJobForm({...newJobForm, type: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" placeholder="Device Model" value={newJobForm.device} onChange={e => setNewJobForm({...newJobForm, device: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <select value={newJobForm.priority} onChange={e => setNewJobForm({...newJobForm, priority: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option>
              </select>
              <input type="text" placeholder="Scheduled Date/Time" value={newJobForm.scheduled} onChange={e => setNewJobForm({...newJobForm, scheduled: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" placeholder="Contact Number" value={newJobForm.contact} onChange={e => setNewJobForm({...newJobForm, contact: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <div className="flex gap-2">
                <button onClick={addNewJob} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Add to Queue</button>
                <button onClick={() => setShowAddJobModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddPartModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Add New Part</h3>
              <button onClick={() => setShowAddPartModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Part Name" value={newPartForm.name} onChange={e => setNewPartForm({...newPartForm, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <input type="number" placeholder="Stock Quantity" value={newPartForm.stock} onChange={e => setNewPartForm({...newPartForm, stock: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" placeholder="Unit" value={newPartForm.unit} onChange={e => setNewPartForm({...newPartForm, unit: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <input type="number" placeholder="Min Threshold" value={newPartForm.threshold} onChange={e => setNewPartForm({...newPartForm, threshold: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <div className="flex gap-2">
                <button onClick={addNewPart} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Add Part</button>
                <button onClick={() => setShowAddPartModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReorderModal.show && showReorderModal.part && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-2">Reorder {showReorderModal.part.name}</h3>
            <input type="number" value={showReorderModal.quantity} onChange={e => setShowReorderModal({ ...showReorderModal, quantity: parseInt(e.target.value) || 1 })} min="1" className="w-full px-3 py-2 border rounded-lg mb-4" />
            <div className="flex gap-2">
              <button onClick={() => reorderPart(showReorderModal.part, showReorderModal.quantity)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Order</button>
              <button onClick={() => setShowReorderModal({ show: false, part: null, quantity: 1 })} className="flex-1 border rounded-lg py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <DashboardShell
        sidebarItems={updatedSidebarItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        title="Technician Dashboard"
        roleColor="text-blue-600 dark:text-blue-400"
        roleBg="bg-blue-50 dark:bg-blue-900/20"
      >
        {activeTab === "overview" && (
          <OverviewTab
            user={user}
            activeJobs={activeJobs}
            queuedJobs={queuedJobs}
            partsInventory={partsInventory}
            onUpdateStatus={(job) => setShowUpdateStatusModal({ show: true, job })}
          />
        )}
        {activeTab === "jobs" && (
          <ActiveJobsTab
            activeJobs={activeJobs}
            onUpdateStatus={(job) => setShowUpdateStatusModal({ show: true, job })}
            onViewDetails={(job) => setShowViewDetailsModal({ show: true, job })}
          />
        )}
        {activeTab === "queue" && (
          <QueueTab
            queuedJobs={queuedJobs}
            onAccept={(job) => setShowAcceptModal({ show: true, job })}
            onReschedule={(job) => setShowRescheduleModal({ show: true, job, newSchedule: "" })}
            onAddJob={() => setShowAddJobModal(true)}
          />
        )}
        {activeTab === "parts" && (
          <PartsTab
            partsInventory={partsInventory}
            onAddPart={() => setShowAddPartModal(true)}
            onReorder={(part) => setShowReorderModal({ show: true, part, quantity: 1 })}
          />
        )}
        {activeTab === "history" && <HistoryTab jobHistory={jobHistory} />}
        {activeTab === "analytics" && (
          <AnalyticsTab
            activeJobs={activeJobs}
            queuedJobs={queuedJobs}
            jobHistory={jobHistory}
            partsInventory={partsInventory}
          />
        )}
      </DashboardShell>
    </>
  );
}

// ========== TAB COMPONENTS (updated colors) ==========
function OverviewTab({ user, activeJobs, queuedJobs, partsInventory, onUpdateStatus }: any) {
  const lowStockParts = partsInventory.filter((p: any) => p.status !== "ok").length;
  return (
    <div className="space-y-5">
      <WelcomeBanner name={user.name} message={`${activeJobs.length} active jobs • ${queuedJobs.length} in queue • ${lowStockParts} parts low on stock`} icon={Wrench} gradient="from-blue-600 to-cyan-600" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Wrench} label="Active Jobs" value={activeJobs.length} change={`${activeJobs.filter((j: any) => j.priority === "urgent").length} urgent`} color="blue" />
        <StatCard icon={CheckCircle2} label="Completed Today" value={3} change="+2 from yesterday" color="green" />
        <StatCard icon={Star} label="Avg Rating" value="4.8/5" change="Excellent" color="blue" />
        <StatCard icon={BarChart3} label="Revenue Today" value="₹8.5K" change="+15% week" color="cyan" />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card-base p-4">
          <SectionHeader title="Active Jobs" action={<span className="text-xs text-blue-600 font-medium">{activeJobs.filter((j: any) => j.priority === "urgent").length} URGENT</span>} />
          <div className="space-y-2.5">
            {activeJobs.slice(0, 4).map((job: any) => (
              <div key={job.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-slate-400">{job.id}</span>
                    <span className={cn("px-1.5 py-0.5 text-[10px] font-bold rounded-full capitalize", priorityMap[job.priority])}>{job.priority}</span>
                  </div>
                  <p className="text-xs font-semibold">{job.type}</p>
                  <p className="text-[11px] text-slate-400">{job.customer} • {job.device}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[11px] text-slate-400"><MapPin className="w-3 h-3" />{job.location}</span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400"><Clock className="w-3 h-3" />{job.time}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <StatusBadge status={job.status} />
                  <button onClick={() => onUpdateStatus(job)} className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-2 py-1 rounded-lg">Update</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="card-base p-4">
            <h3 className="text-xs font-semibold mb-3">Low Stock Alerts</h3>
            <div className="space-y-2">
              {partsInventory.filter((p: any) => p.status !== "ok").map((part: any) => (
                <div key={part.id} className={cn("flex items-center justify-between p-2 rounded-lg text-xs", part.status === "out" ? "bg-red-50 dark:bg-red-900/20" : "bg-yellow-50 dark:bg-yellow-900/20")}>
                  <span className="text-slate-700 truncate mr-2">{part.name.split("—")[0]}</span>
                  <span className={cn("font-bold", part.status === "out" ? "text-red-600" : "text-yellow-600")}>{part.stock === 0 ? "OUT" : part.stock}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActiveJobsTab({ activeJobs, onUpdateStatus, onViewDetails }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="Active Jobs" subtitle={`${activeJobs.length} jobs in progress`} />
      <div className="space-y-3">
        {activeJobs.map((job: any) => (
          <div key={job.id} className="card-base p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono text-slate-400">{job.id}</span>
                  <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full capitalize", priorityMap[job.priority])}>{job.priority}</span>
                  <StatusBadge status={job.status} />
                </div>
                <h3 className="text-sm font-semibold">{job.type}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{job.device}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{job.customer}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{job.contact}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.time}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button onClick={() => onUpdateStatus(job)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg">Update Status</button>
                <button onClick={() => onViewDetails(job)} className="text-xs px-3 py-1.5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QueueTab({ queuedJobs, onAccept, onReschedule, onAddJob }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="Job Queue" subtitle="Incoming and scheduled jobs" action={<button onClick={onAddJob} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg flex items-center gap-1"><Plus className="w-3.5 h-3.5" />Add Job</button>} />
      <div className="space-y-3">
        {queuedJobs.map((job: any) => (
          <div key={job.id} className="card-base p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-slate-400">{job.id}</span>
                  <span className={cn("px-1.5 py-0.5 text-[10px] font-bold rounded-full capitalize", priorityMap[job.priority])}>{job.priority}</span>
                </div>
                <h3 className="text-sm font-semibold">{job.type}</h3>
                <p className="text-xs text-slate-400">{job.device} • {job.customer}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">Scheduled: {job.scheduled}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => onAccept(job)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg">Accept</button>
                <button onClick={() => onReschedule(job)} className="text-xs px-3 py-1.5 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Reschedule</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PartsTab({ partsInventory, onAddPart, onReorder }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="Parts & Inventory" action={<button onClick={onAddPart} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg flex items-center gap-1"><Plus className="w-3.5 h-3.5" />Add Part</button>} />
      <div className="card-base overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b bg-slate-50 dark:bg-slate-800/60"><th className="text-left text-xs font-semibold px-4 py-3">Part Name</th><th className="text-left text-xs font-semibold px-4 py-3">In Stock</th><th className="text-left text-xs font-semibold px-4 py-3">Min Level</th><th className="text-left text-xs font-semibold px-4 py-3">Status</th><th className="text-left text-xs font-semibold px-4 py-3">Action</th></tr></thead>
          <tbody className="divide-y">
            {partsInventory.map((part: any) => (
              <tr key={part.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="px-4 py-3 text-xs font-medium">{part.name}</td>
                <td className="px-4 py-3 text-xs">{part.stock} {part.unit}</td>
                <td className="px-4 py-3 text-xs">{part.threshold}</td>
                <td className="px-4 py-3"><span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full", part.status === "ok" ? "bg-green-50 text-green-700" : part.status === "low" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700")}>{part.status === "ok" ? "In Stock" : part.status === "low" ? "Low Stock" : "Out of Stock"}</span></td>
                <td className="px-4 py-3"><button onClick={() => onReorder(part)} className="text-xs text-blue-600 hover:underline font-medium">Reorder</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HistoryTab({ jobHistory }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="Completed Jobs" />
      <div className="space-y-3">
        {jobHistory.map((job: any) => (
          <div key={job.id} className="card-base p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1"><span className="text-xs font-mono text-slate-400">{job.id}</span><span className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-1.5 py-0.5 text-[10px] font-bold rounded-full">Completed</span></div>
                <h3 className="text-sm font-semibold">{job.type}</h3>
                <p className="text-xs text-slate-400">{job.customer} • {job.completedAt}</p>
                <div className="flex items-center gap-0.5 mt-1">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={cn("w-3 h-3", i < job.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200")} />))}<span className="text-[10px] text-slate-400 ml-1">{job.rating}/5</span></div>
              </div>
              <div className="text-right"><p className="text-sm font-bold text-green-600">₹{job.revenue.toLocaleString()}</p><p className="text-[10px] text-slate-400">earned</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== ENHANCED ANALYTICS TAB (updated colors) ==========
function AnalyticsTab({ activeJobs, queuedJobs, jobHistory, partsInventory }: any) {
  const totalJobsCompleted = jobHistory.length;
  const totalRevenue = jobHistory.reduce((sum: number, job: any) => sum + job.revenue, 0);
  const avgRating = (jobHistory.reduce((sum: number, job: any) => sum + job.rating, 0) / totalJobsCompleted).toFixed(1);
  const avgJobDuration = (jobHistory.reduce((sum: number, job: any) => sum + (job.duration || 0), 0) / totalJobsCompleted).toFixed(1);
  const urgentJobs = activeJobs.filter((j: any) => j.priority === "urgent").length;
  
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().slice(0,10);
  }).reverse();
  const revenueTrend = last7Days.map(date => {
    const dayJobs = jobHistory.filter((j: any) => j.completedAt === date);
    const dayRevenue = dayJobs.reduce((sum: number, j: any) => sum + j.revenue, 0);
    return { date: date.slice(5), revenue: dayRevenue };
  });
  
  const jobTypeCount: Record<string, number> = {};
  jobHistory.forEach((job: any) => {
    const type = job.type.split(" ")[0];
    jobTypeCount[type] = (jobTypeCount[type] || 0) + 1;
  });
  const jobTypeData = Object.entries(jobTypeCount).map(([name, value]) => ({ name, value }));
  const PIE_COLORS = ["#2563EB", "#06B6D4", "#10b981", "#8b5cf6", "#ec489a"];
  
  const completionTrend = last7Days.map(date => {
    const completed = jobHistory.filter((j: any) => j.completedAt === date).length;
    return { date: date.slice(5), completed };
  });
  
  const topParts = partsInventory.filter((p: any) => p.status === "low" || p.status === "out").slice(0, 4).map(p => ({ name: p.name.split("—")[0], used: p.threshold - p.stock + 5 }));
  const daysActive = 30;
  const jobsPerDay = (totalJobsCompleted / daysActive).toFixed(1);
  
  return (
    <div className="space-y-6">
      <SectionHeader title="Advanced Performance Analytics" />
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={DollarSign} label="Total Revenue" value={`₹${(totalRevenue / 1000).toFixed(1)}K`} change="+22% vs last month" color="green" />
        <StatCard icon={Star} label="Avg Customer Rating" value={`${avgRating}/5`} change="Excellent" color="blue" />
        <StatCard icon={Clock} label="Avg Job Duration" value={`${avgJobDuration} hrs`} change="Faster by 15%" color="cyan" />
        <StatCard icon={Target} label="Completion Rate" value={`${((totalJobsCompleted / (totalJobsCompleted + activeJobs.length + queuedJobs.length)) * 100).toFixed(0)}%`} change="On track" color="blue" />
      </div>
      
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card-base p-4">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><TrendingUp className="w-4 h-4 text-green-600" /> Revenue Trend (Last 7 days)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={(v) => `₹${v/1000}K`} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card-base p-4">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Jobs Completed (Last 7 days)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={completionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="completed" fill="#2563EB" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card-base p-4">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><PieChartIcon className="w-4 h-4 text-blue-600" /> Job Type Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={jobTypeData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} (${(percent*100).toFixed(0)}%)`}>
                {jobTypeData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card-base p-4">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><Package className="w-4 h-4 text-cyan-600" /> Most Used Parts (Last 30 days)</h3>
          <div className="space-y-3">
            {topParts.map((part: any) => (
              <div key={part.name} className="flex items-center justify-between">
                <span className="text-xs text-slate-700">{part.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, part.used * 5)}%` }} />
                  </div>
                  <span className="text-xs font-semibold">{part.used} units</span>
                </div>
              </div>
            ))}
            {topParts.length === 0 && <p className="text-xs text-slate-400">No usage data available</p>}
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card-base p-4">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><Zap className="w-4 h-4 text-yellow-600" /> Technician Efficiency</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs">Jobs per day</span>
              <span className="text-lg font-bold text-blue-600">{jobsPerDay}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Avg revenue per job</span>
              <span className="text-lg font-bold text-green-600">₹{(totalRevenue / totalJobsCompleted).toFixed(0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Active jobs / Urgent</span>
              <span className="text-lg font-bold">{activeJobs.length} / {urgentJobs}</span>
            </div>
            <div className="mt-3 pt-2 border-t">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Rating score</span>
                <span className="font-medium">{avgRating} / 5</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 mt-1">
                <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${(parseFloat(avgRating)/5)*100}%` }} />
              </div>
            </div>
          </div>
        </div>
        <div className="card-base p-4">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><AlertTriangle className="w-4 h-4 text-red-500" /> Priority & Bottlenecks</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs">Urgent jobs (active)</span>
              <span className="font-bold text-red-600">{urgentJobs}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">High priority pending</span>
              <span className="font-bold text-orange-600">{queuedJobs.filter((j: any) => j.priority === "high").length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Low stock parts</span>
              <span className="font-bold text-yellow-600">{partsInventory.filter((p: any) => p.status === "low").length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Out of stock parts</span>
              <span className="font-bold text-red-600">{partsInventory.filter((p: any) => p.status === "out").length}</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs">
            <p className="font-semibold text-blue-800">Insight:</p>
            <p className="text-blue-700 dark:text-blue-300">You are {jobsPerDay > 2 ? "above" : "below"} average efficiency. Focus on urgent tasks to reduce backlog.</p>
          </div>
        </div>
      </div>
      
      <div className="text-center text-[10px] text-slate-400 pt-2 border-t">
        Analytics based on last 30 days • Data auto-updates from job history
      </div>
    </div>
  );
}