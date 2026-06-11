import { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, BookOpen, Award, BarChart3,
  Plus, DollarSign, ClipboardList, Zap, TrendingUp, CheckCircle2, Clock,
  X, Edit, Send, Calendar, Download
} from "lucide-react";
import { DashboardShell, StatCard, SectionHeader, WelcomeBanner, StatusBadge } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from "recharts";

// ========== TOAST COMPONENT ==========
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2 animate-in slide-in-from-right-5">
      <CheckCircle2 className="w-4 h-4" />
      {message}
    </div>
  );
}

// Initial data
const initialBatches = [
  { id: "B-2601", name: "Full-Stack Web Dev", course: "Web Development", students: 45, instructor: "Rahul Sharma", startDate: "Jan 2, 2026", endDate: "Apr 30, 2026", progress: 42, status: "active" },
  { id: "B-2602", name: "Python Programming", course: "Python", students: 38, instructor: "Priya Patel", startDate: "Jan 5, 2026", endDate: "Mar 15, 2026", progress: 65, status: "active" },
  { id: "B-2603", name: "MS Office Mastery", course: "MS Office", students: 52, instructor: "Amit Kumar", startDate: "Dec 15, 2025", endDate: "Feb 28, 2026", progress: 78, status: "active" },
  { id: "B-2604", name: "Tally & GST", course: "Tally Prime", students: 40, instructor: "Sunita Verma", startDate: "Dec 20, 2025", endDate: "Mar 5, 2026", progress: 55, status: "active" },
  { id: "B-2605", name: "Digital Marketing", course: "Digital Marketing", students: 35, instructor: "Vikram Joshi", startDate: "Nov 1, 2025", endDate: "Jan 31, 2026", progress: 95, status: "completing" },
];

const initialStudents = [
  { id: "STU-1201", name: "Arjun Mehta", batchId: "B-2601", fees: "Paid", attendance: 92, grade: "A", status: "active" },
  { id: "STU-1202", name: "Priya Shah", batchId: "B-2602", fees: "Pending", attendance: 78, grade: "B+", status: "active" },
  { id: "STU-1203", name: "Rahul Singh", batchId: "B-2603", fees: "Paid", attendance: 88, grade: "A", status: "active" },
  { id: "STU-1204", name: "Anjali Patel", batchId: "B-2604", fees: "Overdue", attendance: 65, grade: "B", status: "warning" },
  { id: "STU-1205", name: "Vikram Kumar", batchId: "B-2605", fees: "Paid", attendance: 95, grade: "A+", status: "active" },
];

// Fee data remains static for charts (can be dynamic but not needed for demo)
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

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users, badge: 0 },
  { id: "batches", label: "Batches", icon: BookOpen, badge: 0 },
  { id: "attendance", label: "Attendance", icon: ClipboardList },
  { id: "fees", label: "Fee Management", icon: DollarSign },
  { id: "reports", label: "Reports", icon: BarChart3 },
];

// Helper functions
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};
const saveToStorage = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default function InstituteDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();

  // Data state
  const [batches, setBatches] = useState(() => loadFromStorage("inst_batches", initialBatches));
  const [students, setStudents] = useState(() => loadFromStorage("inst_students", initialStudents));

  // Modal states
  const [showNewBatchModal, setShowNewBatchModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showManageBatchModal, setShowManageBatchModal] = useState<{ show: boolean; batch: any | null }>({ show: false, batch: null });
  const [showAttendanceModal, setShowAttendanceModal] = useState<{ show: boolean; batch: any | null; students: any[] }>({ show: false, batch: null, students: [] });
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState<{ show: boolean; student: any | null; amount: string }>({ show: false, student: null, amount: "" });
  const [showSendReminderModal, setShowSendReminderModal] = useState<{ show: boolean; student: any | null; message: string }>({ show: false, student: null, message: "" });
  const [showSendNoticeModal, setShowSendNoticeModal] = useState<{ show: boolean; student: any | null; message: string }>({ show: false, student: null, message: "" });

  // Form states
  const [newBatch, setNewBatch] = useState({ name: "", course: "", instructor: "", startDate: "", endDate: "", status: "active" });
  const [newStudent, setNewStudent] = useState({ name: "", batchId: batches[0]?.id || "", fees: "Pending", grade: "B" });
  const [editBatch, setEditBatch] = useState({ name: "", instructor: "", startDate: "", endDate: "", status: "" });
  const [attendanceMarks, setAttendanceMarks] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist data
  useEffect(() => { saveToStorage("inst_batches", batches); }, [batches]);
  useEffect(() => { saveToStorage("inst_students", students); }, [students]);

  const showToast = (msg: string) => setToastMessage(msg);

  // Helper: get batch name by id
  const getBatchName = (batchId: string) => batches.find(b => b.id === batchId)?.name || "Unknown";

  // Helper: update batch student count
  const updateBatchStudentCount = (batchId: string) => {
    const count = students.filter(s => s.batchId === batchId).length;
    setBatches(batches.map(b => b.id === batchId ? { ...b, students: count } : b));
  };

  // --- Batch actions ---
  const addBatch = () => {
    if (!newBatch.name || !newBatch.course) {
      showToast("Please fill batch name and course");
      return;
    }
    const newId = `B-${Math.floor(Math.random() * 9000) + 1000}`;
    const newBatchObj = {
      id: newId,
      name: newBatch.name,
      course: newBatch.course,
      students: 0,
      instructor: newBatch.instructor || "Not Assigned",
      startDate: newBatch.startDate || new Date().toLocaleDateString(),
      endDate: newBatch.endDate || "TBD",
      progress: 0,
      status: newBatch.status,
    };
    setBatches([newBatchObj, ...batches]);
    setShowNewBatchModal(false);
    setNewBatch({ name: "", course: "", instructor: "", startDate: "", endDate: "", status: "active" });
    showToast(`Batch ${newBatchObj.name} created`);
  };

  const updateBatch = () => {
    if (!showManageBatchModal.batch) return;
    const updated = { ...showManageBatchModal.batch, ...editBatch };
    setBatches(batches.map(b => b.id === updated.id ? updated : b));
    setShowManageBatchModal({ show: false, batch: null });
    showToast(`Batch ${updated.name} updated`);
  };

  // --- Student actions ---
  const enrollStudent = () => {
    if (!newStudent.name || !newStudent.batchId) {
      showToast("Please fill student name and select batch");
      return;
    }
    const newId = `STU-${Math.floor(Math.random() * 9000) + 1000}`;
    const newStudentObj = {
      id: newId,
      name: newStudent.name,
      batchId: newStudent.batchId,
      fees: newStudent.fees,
      attendance: 0,
      grade: newStudent.grade,
      status: "active",
    };
    setStudents([newStudentObj, ...students]);
    updateBatchStudentCount(newStudent.batchId);
    setShowEnrollModal(false);
    setNewStudent({ name: "", batchId: batches[0]?.id || "", fees: "Pending", grade: "B" });
    showToast(`Student ${newStudent.name} enrolled`);
  };

  const recordPayment = (student: any, amount: string) => {
    if (!amount) {
      showToast("Please enter amount");
      return;
    }
    setStudents(students.map(s => s.id === student.id ? { ...s, fees: "Paid" } : s));
    setShowRecordPaymentModal({ show: false, student: null, amount: "" });
    showToast(`Payment of ₹${amount} recorded for ${student.name}`);
  };

  const sendReminder = (student: any, message: string) => {
    if (!message) {
      showToast("Please enter reminder message");
      return;
    }
    setShowSendReminderModal({ show: false, student: null, message: "" });
    showToast(`Reminder sent to ${student.name}: ${message}`);
  };

  const sendNotice = (student: any, message: string) => {
    if (!message) {
      showToast("Please enter notice message");
      return;
    }
    setShowSendNoticeModal({ show: false, student: null, message: "" });
    showToast(`Notice sent to ${student.name}: ${message}`);
  };

  // --- Attendance ---
  const openAttendanceModal = (batch: any) => {
    const batchStudents = students.filter(s => s.batchId === batch.id);
    const initialMarks: Record<string, number> = {};
    batchStudents.forEach(s => { initialMarks[s.id] = s.attendance || 0; });
    setAttendanceMarks(initialMarks);
    setShowAttendanceModal({ show: true, batch, students: batchStudents });
  };

  const saveAttendance = () => {
    // Update each student's attendance
    const updatedStudents = students.map(s => {
      if (attendanceMarks[s.id] !== undefined) {
        return { ...s, attendance: attendanceMarks[s.id] };
      }
      return s;
    });
    setStudents(updatedStudents);
    // Update batch progress? optional
    setShowAttendanceModal({ show: false, batch: null, students: [] });
    showToast(`Attendance saved for batch ${showAttendanceModal.batch?.name}`);
  };

  // --- Reports (simulate PDF download) ---
  const downloadReport = (reportName: string) => {
    const content = `${reportName}\nGenerated: ${new Date().toLocaleString()}\nInstitute: ${user?.organization || "Institute"}\n\nThis is a simulated PDF report.`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportName.replace(/\s/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${reportName}`);
  };

  // Compute sidebar badges
  const totalStudents = students.length;
  const activeBatches = batches.filter(b => b.status === "active").length;
  const updatedSidebarItems = sidebarItems.map(item => {
    if (item.id === "students") return { ...item, badge: totalStudents };
    if (item.id === "batches") return { ...item, badge: activeBatches };
    return item;
  });

  if (!user) return null;

  return (
    <>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      {/* Modal: New Batch */}
      {showNewBatchModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Create New Batch</h3>
              <button onClick={() => setShowNewBatchModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Batch Name" value={newBatch.name} onChange={e => setNewBatch({...newBatch, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" placeholder="Course" value={newBatch.course} onChange={e => setNewBatch({...newBatch, course: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" placeholder="Instructor" value={newBatch.instructor} onChange={e => setNewBatch({...newBatch, instructor: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" placeholder="Start Date (e.g., Jan 1, 2026)" value={newBatch.startDate} onChange={e => setNewBatch({...newBatch, startDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" placeholder="End Date" value={newBatch.endDate} onChange={e => setNewBatch({...newBatch, endDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <select value={newBatch.status} onChange={e => setNewBatch({...newBatch, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                <option value="active">Active</option>
                <option value="completing">Completing</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <div className="flex gap-2">
                <button onClick={addBatch} className="flex-1 btn-primary">Create Batch</button>
                <button onClick={() => setShowNewBatchModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Enroll Student */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Enroll New Student</h3>
              <button onClick={() => setShowEnrollModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Full Name" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <select value={newStudent.batchId} onChange={e => setNewStudent({...newStudent, batchId: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
              <select value={newStudent.fees} onChange={e => setNewStudent({...newStudent, fees: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
              <select value={newStudent.grade} onChange={e => setNewStudent({...newStudent, grade: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                <option value="A+">A+</option><option value="A">A</option><option value="B+">B+</option><option value="B">B</option><option value="C">C</option>
              </select>
              <div className="flex gap-2">
                <button onClick={enrollStudent} className="flex-1 btn-primary">Enroll</button>
                <button onClick={() => setShowEnrollModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Manage Batch */}
      {showManageBatchModal.show && showManageBatchModal.batch && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Edit Batch</h3>
              <button onClick={() => setShowManageBatchModal({ show: false, batch: null })}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" value={editBatch.name !== "" ? editBatch.name : showManageBatchModal.batch.name} onChange={e => setEditBatch({...editBatch, name: e.target.value})} placeholder="Batch Name" className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" value={editBatch.instructor !== "" ? editBatch.instructor : showManageBatchModal.batch.instructor} onChange={e => setEditBatch({...editBatch, instructor: e.target.value})} placeholder="Instructor" className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" value={editBatch.startDate !== "" ? editBatch.startDate : showManageBatchModal.batch.startDate} onChange={e => setEditBatch({...editBatch, startDate: e.target.value})} placeholder="Start Date" className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" value={editBatch.endDate !== "" ? editBatch.endDate : showManageBatchModal.batch.endDate} onChange={e => setEditBatch({...editBatch, endDate: e.target.value})} placeholder="End Date" className="w-full px-3 py-2 border rounded-lg" />
              <select value={editBatch.status !== "" ? editBatch.status : showManageBatchModal.batch.status} onChange={e => setEditBatch({...editBatch, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                <option value="active">Active</option>
                <option value="completing">Completing</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <div className="flex gap-2">
                <button onClick={updateBatch} className="flex-1 btn-primary">Save Changes</button>
                <button onClick={() => setShowManageBatchModal({ show: false, batch: null })} className="px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Mark Attendance */}
      {showAttendanceModal.show && showAttendanceModal.batch && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Mark Attendance - {showAttendanceModal.batch.name}</h3>
              <button onClick={() => setShowAttendanceModal({ show: false, batch: null, students: [] })}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {showAttendanceModal.students.map((student: any) => (
                <div key={student.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <span className="text-sm">{student.name}</span>
                  <input type="number" min="0" max="100" value={attendanceMarks[student.id] || 0} onChange={e => setAttendanceMarks({...attendanceMarks, [student.id]: parseInt(e.target.value) || 0})} className="w-20 px-2 py-1 border rounded text-center" />
                  <span className="text-xs text-slate-400">%</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={saveAttendance} className="flex-1 btn-primary">Save Attendance</button>
              <button onClick={() => setShowAttendanceModal({ show: false, batch: null, students: [] })} className="px-4 py-2 border rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Record Payment */}
      {showRecordPaymentModal.show && showRecordPaymentModal.student && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-2">Record Payment</h3>
            <p className="text-sm mb-2">Student: {showRecordPaymentModal.student.name}</p>
            <input type="number" placeholder="Amount (₹)" value={showRecordPaymentModal.amount} onChange={e => setShowRecordPaymentModal({ ...showRecordPaymentModal, amount: e.target.value })} className="w-full px-3 py-2 border rounded-lg mb-4" />
            <div className="flex gap-2">
              <button onClick={() => recordPayment(showRecordPaymentModal.student, showRecordPaymentModal.amount)} className="flex-1 btn-primary">Record</button>
              <button onClick={() => setShowRecordPaymentModal({ show: false, student: null, amount: "" })} className="flex-1 border rounded-lg py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Send Reminder */}
      {showSendReminderModal.show && showSendReminderModal.student && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-2">Send Fee Reminder</h3>
            <p className="text-sm mb-2">To: {showSendReminderModal.student.name}</p>
            <textarea rows={3} value={showSendReminderModal.message} onChange={e => setShowSendReminderModal({ ...showSendReminderModal, message: e.target.value })} placeholder="Reminder message..." className="w-full px-3 py-2 border rounded-lg mb-4" />
            <div className="flex gap-2">
              <button onClick={() => sendReminder(showSendReminderModal.student, showSendReminderModal.message)} className="flex-1 btn-primary">Send</button>
              <button onClick={() => setShowSendReminderModal({ show: false, student: null, message: "" })} className="flex-1 border rounded-lg py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Send Notice (for low attendance) */}
      {showSendNoticeModal.show && showSendNoticeModal.student && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-2">Send Attendance Notice</h3>
            <p className="text-sm mb-2">To: {showSendNoticeModal.student.name}</p>
            <textarea rows={3} value={showSendNoticeModal.message} onChange={e => setShowSendNoticeModal({ ...showSendNoticeModal, message: e.target.value })} placeholder="Notice message..." className="w-full px-3 py-2 border rounded-lg mb-4" />
            <div className="flex gap-2">
              <button onClick={() => sendNotice(showSendNoticeModal.student, showSendNoticeModal.message)} className="flex-1 btn-primary">Send</button>
              <button onClick={() => setShowSendNoticeModal({ show: false, student: null, message: "" })} className="flex-1 border rounded-lg py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <DashboardShell
        sidebarItems={updatedSidebarItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        title="Institute Dashboard"
        roleColor="text-indigo-600 dark:text-indigo-400"
        roleBg="bg-indigo-50 dark:bg-indigo-900/20"
      >
        {activeTab === "overview" && (
          <OverviewTab
            user={user}
            batches={batches}
            students={students}
            upcomingEvents={upcomingEvents}
            onNewBatch={() => setShowNewBatchModal(true)}
            onManageBatch={(batch) => { setEditBatch({ name: batch.name, instructor: batch.instructor, startDate: batch.startDate, endDate: batch.endDate, status: batch.status }); setShowManageBatchModal({ show: true, batch }); }}
          />
        )}
        {activeTab === "students" && (
          <StudentsTab
            students={students}
            batches={batches}
            onEnroll={() => setShowEnrollModal(true)}
            onRecordPayment={(s) => setShowRecordPaymentModal({ show: true, student: s, amount: "" })}
            onSendReminder={(s) => setShowSendReminderModal({ show: true, student: s, message: "" })}
          />
        )}
        {activeTab === "batches" && (
          <BatchesTab
            batches={batches}
            onNewBatch={() => setShowNewBatchModal(true)}
            onManageBatch={(batch) => { setEditBatch({ name: batch.name, instructor: batch.instructor, startDate: batch.startDate, endDate: batch.endDate, status: batch.status }); setShowManageBatchModal({ show: true, batch }); }}
            onMarkAttendance={openAttendanceModal}
          />
        )}
        {activeTab === "attendance" && (
          <AttendanceTab
            students={students}
            batches={batches}
            attendanceTrend={attendanceTrend}
            onSendNotice={(s) => setShowSendNoticeModal({ show: true, student: s, message: "" })}
          />
        )}
        {activeTab === "fees" && (
          <FeesTab
            students={students}
            batches={batches}
            feeData={feeData}
            onRecordPayment={(s) => setShowRecordPaymentModal({ show: true, student: s, amount: "" })}
            onSendReminder={(s) => setShowSendReminderModal({ show: true, student: s, message: "" })}
          />
        )}
        {activeTab === "reports" && (
          <ReportsTab onDownloadReport={downloadReport} />
        )}
      </DashboardShell>
    </>
  );
}

// ========== TAB COMPONENTS ==========
function OverviewTab({ user, batches, students, upcomingEvents, onNewBatch, onManageBatch }: any) {
  const activeBatches = batches.filter((b: any) => b.status === "active").length;
  const totalStudents = students.length;
  const totalFeesCollected = 420000; // mock
  return (
    <div className="space-y-5">
      <WelcomeBanner name={user.name} message={`${user.organization} • ${totalStudents} students • ${activeBatches} active batches • Fee collection ₹4.2L this month`} icon={Zap} gradient="from-indigo-600 to-violet-600" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Users} label="Total Students" value={totalStudents} change="+28 this month" color="indigo" />
        <StatCard icon={BookOpen} label="Active Batches" value={activeBatches} change="5 completing soon" color="blue" />
        <StatCard icon={Award} label="Certs Issued" value={248} change="+32 this month" color="green" />
        <StatCard icon={DollarSign} label="Fee Collection" value="₹4.2L" change="+18% vs last" color="purple" />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card-base p-4">
          <SectionHeader title="Active Batches" subtitle={`${batches.length} batches total`} action={<button onClick={onNewBatch} className="btn-primary text-xs px-3 py-2"><Plus className="w-3.5 h-3.5" />New Batch</button>} />
          <div className="space-y-2.5">
            {batches.slice(0, 4).map((batch: any) => (
              <div key={batch.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center"><BookOpen className="w-3.5 h-3.5 text-indigo-600" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><p className="text-xs font-semibold truncate">{batch.name}</p><StatusBadge status={batch.status} /></div>
                  <p className="text-[11px] text-slate-400">{batch.instructor} • {batch.students} students</p>
                  <div className="flex items-center gap-2 mt-1"><div className="flex-1 h-1.5 bg-slate-200 rounded-full"><div className="h-full bg-indigo-600 rounded-full" style={{ width: `${batch.progress}%` }} /></div><span className="text-[10px] text-slate-500">{batch.progress}%</span></div>
                </div>
                <button onClick={() => onManageBatch(batch)} className="text-xs text-indigo-600 hover:underline">Manage</button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="card-base p-4"><h3 className="text-xs font-semibold mb-3">Upcoming Events</h3><div className="space-y-2.5">{upcomingEvents.slice(0,3).map((ev: any) => (<div key={ev.title} className="flex items-start gap-2.5"><div className={cn("w-1.5 h-1.5 rounded-full mt-1.5", ev.type==="exam"?"bg-red-500":ev.type==="graduation"?"bg-green-500":"bg-blue-500")} /><div><p className="text-xs font-medium leading-tight">{ev.title}</p><p className="text-[11px] text-slate-400">{ev.date}</p></div></div>))}</div></div>
          <div className="card-base p-4"><h3 className="text-xs font-semibold mb-3">Attendance Trend</h3><ResponsiveContainer width="100%" height={80}><LineChart data={[{ week: "W1", avg: 88 }, { week: "W2", avg: 85 }, { week: "W3", avg: 91 }, { week: "W4", avg: 87 }, { week: "W5", avg: 93 }]}><XAxis dataKey="week" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} /><Tooltip /><Line type="monotone" dataKey="avg" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} /></LineChart></ResponsiveContainer></div>
        </div>
      </div>
    </div>
  );
}

function StudentsTab({ students, batches, onEnroll, onRecordPayment, onSendReminder }: any) {
  const getBatchName = (batchId: string) => batches.find((b: any) => b.id === batchId)?.name || "Unknown";
  return (
    <div className="space-y-4">
      <SectionHeader title="Student Management" subtitle={`${students.length} students enrolled`} action={<button onClick={onEnroll} className="btn-primary text-xs px-3 py-2"><Plus className="w-3.5 h-3.5" />Enroll Student</button>} />
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b bg-slate-50"><th>Student</th><th>Batch</th><th>Attendance</th><th>Fees</th><th>Grade</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody className="divide-y">
              {students.map((s: any) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">{s.name[0]}</div><div><p className="text-xs font-medium">{s.name}</p><p className="text-[10px] text-slate-400">{s.id}</p></div></div></td>
                  <td className="px-4 py-3 text-xs">{getBatchName(s.batchId)}</td>
                  <td className="px-4 py-3"><span className={cn("text-xs font-semibold", s.attendance >= 85 ? "text-green-600" : s.attendance >= 75 ? "text-yellow-600" : "text-red-600")}>{s.attendance}%</span></td>
                  <td className="px-4 py-3"><span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full", s.fees==="Paid"?"bg-green-50 text-green-700":s.fees==="Pending"?"bg-yellow-50 text-yellow-700":"bg-red-50 text-red-700")}>{s.fees}</span></td>
                  <td className="px-4 py-3 text-xs font-bold text-indigo-600">{s.grade}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3"><div className="flex gap-1"><button onClick={() => onRecordPayment(s)} className="text-xs text-green-600 hover:underline">Pay</button><button onClick={() => onSendReminder(s)} className="text-xs text-orange-600 hover:underline">Remind</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BatchesTab({ batches, onNewBatch, onManageBatch, onMarkAttendance }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="Batch Management" action={<button onClick={onNewBatch} className="btn-primary text-xs px-3 py-2"><Plus className="w-3.5 h-3.5" />Create Batch</button>} />
      <div className="grid sm:grid-cols-2 gap-4">
        {batches.map((batch: any) => (
          <div key={batch.id} className="card-base p-4 hover:-translate-y-0.5 cursor-pointer">
            <div className="flex items-start justify-between gap-2 mb-3"><div><h3 className="text-sm font-semibold">{batch.name}</h3><p className="text-xs text-slate-400">{batch.course} • {batch.id}</p></div><StatusBadge status={batch.status} /></div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-center"><div><p className="text-sm font-bold">{batch.students}</p><p className="text-[10px] text-slate-400">Students</p></div><div><p className="text-sm font-bold">{batch.progress}%</p><p className="text-[10px] text-slate-400">Progress</p></div><div><p className="text-xs font-medium text-indigo-600">{batch.instructor.split(" ")[0]}</p><p className="text-[10px] text-slate-400">Trainer</p></div></div>
            <div className="mb-3"><div className="h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-indigo-600 rounded-full" style={{ width: `${batch.progress}%` }} /></div></div>
            <p className="text-[11px] text-slate-400">{batch.startDate} → {batch.endDate}</p>
            <div className="flex gap-2 mt-3"><button onClick={() => onManageBatch(batch)} className="flex-1 btn-primary text-xs py-1.5">Manage</button><button onClick={() => onMarkAttendance(batch)} className="flex-1 text-xs py-1.5 border rounded-lg">Attendance</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttendanceTab({ students, batches, attendanceTrend, onSendNotice }: any) {
  const lowAttendanceStudents = students.filter((s: any) => s.attendance < 75);
  return (
    <div className="space-y-4">
      <SectionHeader title="Attendance Tracking" />
      <div className="card-base p-4"><h3 className="text-xs font-semibold mb-3">Weekly Attendance Average (%)</h3><ResponsiveContainer width="100%" height={200}><AreaChart data={attendanceTrend}><defs><linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs><XAxis dataKey="week" tick={{ fontSize: 11 }} /><YAxis domain={[70,100]} /><Tooltip formatter={(v: number) => `${v}%`} /><Area type="monotone" dataKey="avg" stroke="#6366f1" fill="url(#attGrad)" /></AreaChart></ResponsiveContainer></div>
      <div className="card-base overflow-hidden"><div className="px-4 py-3 border-b"><h3 className="text-xs font-semibold">Students with Low Attendance (&lt;75%)</h3></div><div className="divide-y">{lowAttendanceStudents.map((s: any) => (<div key={s.id} className="flex items-center justify-between px-4 py-3"><div><p className="text-xs font-medium">{s.name}</p><p className="text-[11px] text-slate-400">{batches.find((b: any) => b.id === s.batchId)?.name}</p></div><div className="flex items-center gap-3"><span className="text-sm font-bold text-red-600">{s.attendance}%</span><button onClick={() => onSendNotice(s)} className="text-xs text-primary-600 hover:underline">Send Notice</button></div></div>))}</div></div>
    </div>
  );
}

function FeesTab({ students, batches, feeData, onRecordPayment, onSendReminder }: any) {
  const pendingStudents = students.filter((s: any) => s.fees !== "Paid");
  return (
    <div className="space-y-4">
      <SectionHeader title="Fee Management" action={<button className="btn-primary text-xs px-3 py-2">Record Payment</button>} />
      <div className="card-base p-4"><h3 className="text-xs font-semibold mb-3">Monthly Fee Collection (₹)</h3><ResponsiveContainer width="100%" height={180}><BarChart data={feeData}><XAxis dataKey="month" tick={{ fontSize: 10 }} /><YAxis tickFormatter={(v) => `₹${v/1000}K`} tick={{ fontSize: 10 }} /><Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} /><Bar dataKey="collected" name="Collected" fill="#6366f1" radius={[4,4,0,0]} /><Bar dataKey="pending" name="Pending" fill="#fbbf24" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div>
      <div className="card-base overflow-hidden"><div className="px-4 py-3 border-b"><h3 className="text-xs font-semibold">Pending / Overdue Fees</h3></div><div className="divide-y">{pendingStudents.map((s: any) => (<div key={s.id} className="flex items-center justify-between px-4 py-3"><div><p className="text-xs font-medium">{s.name}</p><p className="text-[11px] text-slate-400">{batches.find((b: any) => b.id === s.batchId)?.name}</p></div><div className="flex items-center gap-3"><span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full", s.fees==="Pending"?"bg-yellow-50 text-yellow-700":"bg-red-50 text-red-700")}>{s.fees}</span><button onClick={() => onRecordPayment(s)} className="btn-primary text-xs px-2.5 py-1">Pay</button><button onClick={() => onSendReminder(s)} className="text-xs border px-2.5 py-1 rounded-lg">Remind</button></div></div>))}</div></div>
    </div>
  );
}

function ReportsTab({ onDownloadReport }: any) {
  const reports = ["Student Performance Report", "Fee Collection Report", "Attendance Summary", "Batch Progress Report", "Certificate Issuance Report", "Trainer Performance"];
  return (
    <div className="space-y-4">
      <SectionHeader title="Reports & Analytics" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {reports.map((report) => (
          <button key={report} onClick={() => onDownloadReport(report)} className="card-base p-4 text-left hover:-translate-y-0.5 cursor-pointer">
            <BarChart3 className="w-5 h-5 text-indigo-600 mb-2" />
            <p className="text-xs font-semibold">{report}</p>
            <p className="text-[11px] text-primary-600 mt-1 font-medium">Download PDF →</p>
          </button>
        ))}
      </div>
    </div>
  );
}