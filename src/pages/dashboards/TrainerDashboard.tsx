import { useState, useEffect } from "react";
import {
  LayoutDashboard, BookOpen, Users, Award, BarChart3,
  Plus, Clock, CheckCircle2, Star, Edit3, Zap, FileText, Video,
  TrendingUp, Target, Calendar, Eye, X, Send, Download
} from "lucide-react";
import { DashboardShell, StatCard, SectionHeader, WelcomeBanner, StatusBadge } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, CartesianGrid, Legend
} from "recharts";

// ========== TOAST COMPONENT ==========
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2 animate-in slide-in-from-right-5">
      <CheckCircle2 className="w-4 h-4" />
      {message}
    </div>
  );
}

// ========== STATIC DATA ==========
const initialCourses = [
  { id: "1", title: "Python Programming Masterclass", students: 48, rating: 4.8, status: "active", revenue: 48000, sessions: 24, completed: 18, description: "Master Python from basics to advanced" },
  { id: "2", title: "Web Development Bootcamp", students: 62, rating: 4.9, status: "active", revenue: 62000, sessions: 36, completed: 28, description: "Full-stack web development" },
  { id: "3", title: "Data Science Fundamentals", students: 32, rating: 4.7, status: "active", revenue: 32000, sessions: 20, completed: 12, description: "Intro to data science" },
  { id: "4", title: "JavaScript Advanced Concepts", students: 0, rating: 0, status: "draft", revenue: 0, sessions: 18, completed: 0, description: "Deep dive into JS" },
];

const initialStudents = [
  { id: "s1", name: "Arjun Mehta", courseId: "1", progress: 72, lastActive: "2h ago", status: "active" },
  { id: "s2", name: "Priya Shah", courseId: "2", progress: 45, lastActive: "Yesterday", status: "active" },
  { id: "s3", name: "Rahul Singh", courseId: "3", progress: 100, lastActive: "3d ago", status: "completed" },
  { id: "s4", name: "Anjali Patel", courseId: "1", progress: 28, lastActive: "5d ago", status: "active" },
  { id: "s5", name: "Vikram Kumar", courseId: "2", progress: 88, lastActive: "1d ago", status: "active" },
];

const initialAssessments = [
  { id: "a1", title: "Python Mid-Term Exam", courseId: "1", submissions: 12, dueDate: "Jan 18, 2026", graded: false },
  { id: "a2", title: "React Component Project", courseId: "2", submissions: 8, dueDate: "Jan 20, 2026", graded: false },
  { id: "a3", title: "Data Analysis Assignment", courseId: "3", submissions: 5, dueDate: "Jan 22, 2026", graded: false },
];

const initialCertificates = [
  { id: "c1", title: "Python Programming Specialist", studentName: "Arjun Mehta", issuedDate: "Jan 10, 2026" },
  { id: "c2", title: "Web Dev Professional", studentName: "Priya Shah", issuedDate: "Jan 12, 2026" },
  { id: "c3", title: "Data Science Analyst", studentName: "Vikram Kumar", issuedDate: "Jan 14, 2026" },
];

// Analytics data
const revenueData = [
  { month: "Aug", revenue: 28000 }, { month: "Sep", revenue: 35000 }, { month: "Oct", revenue: 42000 },
  { month: "Nov", revenue: 38000 }, { month: "Dec", revenue: 55000 }, { month: "Jan", revenue: 62000 },
];
const studentPerformance = [
  { course: "Python", avg: 78 }, { course: "Web Dev", avg: 82 }, { course: "Data Sci", avg: 71 },
];
const enrollmentTrend = [
  { month: "Aug", newStudents: 18 }, { month: "Sep", newStudents: 24 }, { month: "Oct", newStudents: 32 },
  { month: "Nov", newStudents: 28 }, { month: "Dec", newStudents: 41 }, { month: "Jan", newStudents: 38 },
];
const assessmentCompletion = [
  { name: "Python", completed: 38, pending: 12 },
  { name: "Web Dev", completed: 52, pending: 18 },
  { name: "Data Sci", completed: 24, pending: 14 },
];
const topStudents = [
  { name: "Rahul Singh", course: "Data Science", progress: 100 },
  { name: "Vikram Kumar", course: "Web Development", progress: 88 },
  { name: "Arjun Mehta", course: "Python Programming", progress: 72 },
  { name: "Priya Shah", course: "Web Development", progress: 45 },
  { name: "Anjali Patel", course: "Python Programming", progress: 28 },
];
const learningActivity = [
  { week: "Week 1", hours: 42 }, { week: "Week 2", hours: 38 }, { week: "Week 3", hours: 55 },
  { week: "Week 4", hours: 61 }, { week: "Week 5", hours: 58 }, { week: "Week 6", hours: 72 },
];

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "courses", label: "My Courses", icon: BookOpen, badge: 0 },
  { id: "students", label: "My Students", icon: Users, badge: 0 },
  { id: "assessments", label: "Assessments", icon: FileText, badge: 0 },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

// localStorage helpers
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};
const saveToStorage = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default function TrainerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();

  // Data state
  const [courses, setCourses] = useState(() => loadFromStorage("trainer_courses", initialCourses));
  const [students, setStudents] = useState(() => loadFromStorage("trainer_students", initialStudents));
  const [assessments, setAssessments] = useState(() => loadFromStorage("trainer_assessments", initialAssessments));
  const [certificates, setCertificates] = useState(() => loadFromStorage("trainer_certificates", initialCertificates));

  // UI state
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState<{ show: boolean; course: any | null }>({ show: false, course: null });
  const [showGradeModal, setShowGradeModal] = useState<{ show: boolean; assessment: any | null }>({ show: false, assessment: null });
  const [newCourse, setNewCourse] = useState({ title: "", description: "", price: "" });
  const [gradeData, setGradeData] = useState({ grade: "", feedback: "" });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistence
  useEffect(() => { saveToStorage("trainer_courses", courses); }, [courses]);
  useEffect(() => { saveToStorage("trainer_students", students); }, [students]);
  useEffect(() => { saveToStorage("trainer_assessments", assessments); }, [assessments]);
  useEffect(() => { saveToStorage("trainer_certificates", certificates); }, [certificates]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Handlers
  const addCourse = () => {
    if (!newCourse.title) {
      showToast("Please enter a course title");
      return;
    }
    const newId = String(courses.length + 1);
    const newCourseObj = {
      id: newId,
      title: newCourse.title,
      description: newCourse.description,
      students: 0,
      rating: 0,
      status: "draft",
      revenue: 0,
      sessions: 0,
      completed: 0,
    };
    setCourses([newCourseObj, ...courses]);
    setShowNewCourseModal(false);
    setNewCourse({ title: "", description: "", price: "" });
    showToast(`Course "${newCourse.title}" created!`);
  };

  const updateCourse = () => {
    if (!showEditCourseModal.course) return;
    setCourses(courses.map(c => c.id === showEditCourseModal.course.id ? showEditCourseModal.course : c));
    setShowEditCourseModal({ show: false, course: null });
    showToast("Course updated successfully");
  };

  const gradeSubmission = () => {
    if (!showGradeModal.assessment) return;
    setAssessments(assessments.map(a => a.id === showGradeModal.assessment.id ? { ...a, graded: true, grade: gradeData.grade, feedback: gradeData.feedback } : a));
    setShowGradeModal({ show: false, assessment: null });
    setGradeData({ grade: "", feedback: "" });
    showToast(`Graded "${showGradeModal.assessment.title}" with score: ${gradeData.grade || "N/A"}`);
  };

  const downloadCertificate = (cert: any) => {
    const content = `CERTIFICATE OF COMPLETION\n\nThis certifies that ${cert.studentName} has successfully completed\n${cert.title}\n\nIssued by CompuPoint Academy\nDate: ${cert.issuedDate}\n\nCertificate ID: ${cert.id}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cert.title.replace(/\s/g, "_")}_Certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded certificate for ${cert.studentName}`);
  };

  const addNewAssessment = () => {
    const newId = `a${assessments.length + 1}`;
    const newAss = {
      id: newId,
      title: "New Assessment",
      courseId: courses[0]?.id || "1",
      submissions: 0,
      dueDate: new Date().toLocaleDateString(),
      graded: false,
    };
    setAssessments([newAss, ...assessments]);
    showToast("New assessment added. Edit it later.");
  };

  // Computed
  const totalStudents = students.length;
  const totalRevenue = courses.reduce((sum, c) => sum + c.revenue, 0);
  const pendingAssessments = assessments.filter(a => !a.graded);
  const recentStudents = students.slice(0, 4);
  const updatedSidebarItems = sidebarItems.map(item => {
    if (item.id === "courses") return { ...item, badge: courses.filter(c => c.status === "active").length };
    if (item.id === "students") return { ...item, badge: students.length };
    if (item.id === "assessments") return { ...item, badge: assessments.filter(a => !a.graded).length };
    return item;
  });

  if (!user) return null;

  return (
    <>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      {/* New Course Modal */}
      {showNewCourseModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2"><BookOpen className="w-5 h-5 text-green-500" /> New Course</h3>
              <button onClick={() => setShowNewCourseModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <input type="text" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} placeholder="Course Title" className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <textarea value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} placeholder="Description" rows={3} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              <input type="text" value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: e.target.value})} placeholder="Price (optional)" className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <div className="flex gap-2">
                <button onClick={addCourse} className="flex-1 btn-primary text-sm py-2">Create Course</button>
                <button onClick={() => setShowNewCourseModal(false)} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEditCourseModal.show && showEditCourseModal.course && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Edit Course</h3>
              <button onClick={() => setShowEditCourseModal({ show: false, course: null })}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <input type="text" value={showEditCourseModal.course.title} onChange={e => setShowEditCourseModal({ show: true, course: { ...showEditCourseModal.course, title: e.target.value } })} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <textarea value={showEditCourseModal.course.description || ""} onChange={e => setShowEditCourseModal({ show: true, course: { ...showEditCourseModal.course, description: e.target.value } })} rows={3} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              <select value={showEditCourseModal.course.status} onChange={e => setShowEditCourseModal({ show: true, course: { ...showEditCourseModal.course, status: e.target.value } })} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="active" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Active</option>
                <option value="draft" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Draft</option>
              </select>
              <div className="flex gap-2">
                <button onClick={updateCourse} className="flex-1 btn-primary text-sm py-2">Save Changes</button>
                <button onClick={() => setShowEditCourseModal({ show: false, course: null })} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grade Submission Modal */}
      {showGradeModal.show && showGradeModal.assessment && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Grade: {showGradeModal.assessment.title}</h3>
              <button onClick={() => setShowGradeModal({ show: false, assessment: null })}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <input type="text" value={gradeData.grade} onChange={e => setGradeData({...gradeData, grade: e.target.value})} placeholder="Grade (e.g., 85%)" className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <textarea value={gradeData.feedback} onChange={e => setGradeData({...gradeData, feedback: e.target.value})} placeholder="Feedback to student" rows={3} className="w-full px-3 py-2 border rounded-lg bg-background text-foreground border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              <div className="flex gap-2">
                <button onClick={gradeSubmission} className="flex-1 btn-primary text-sm py-2">Submit Grade</button>
                <button onClick={() => setShowGradeModal({ show: false, assessment: null })} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <DashboardShell
        sidebarItems={updatedSidebarItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        title="Trainer Dashboard"
        roleColor="text-green-600 dark:text-green-400"
        roleBg="bg-green-50 dark:bg-green-900/20"
      >
        {activeTab === "overview" && (
          <OverviewTab
            user={user}
            courses={courses}
            pendingAssessments={pendingAssessments}
            recentStudents={recentStudents}
            totalStudents={totalStudents}
            totalRevenue={totalRevenue}
            onReview={(assessment) => setShowGradeModal({ show: true, assessment })}
            onViewAllStudents={() => setActiveTab("students")}
          />
        )}
        {activeTab === "courses" && (
          <CoursesTab
            courses={courses}
            onNewCourse={() => setShowNewCourseModal(true)}
            onManage={(course) => setShowEditCourseModal({ show: true, course })}
            onEdit={(course) => setShowEditCourseModal({ show: true, course })}
          />
        )}
        {activeTab === "students" && <StudentsTab students={students} courses={courses} />}
        {activeTab === "assessments" && (
          <AssessmentsTab
            assessments={assessments}
            onGrade={(assessment) => setShowGradeModal({ show: true, assessment })}
            onNewAssessment={addNewAssessment}
          />
        )}
        {activeTab === "certificates" && (
          <CertificatesTab certificates={certificates} onView={downloadCertificate} />
        )}
        {activeTab === "analytics" && <AnalyticsTab />}
      </DashboardShell>
    </>
  );
}

// ========== TAB COMPONENTS (identical to before but with alert removal) ==========
function OverviewTab({ user, courses, pendingAssessments, recentStudents, totalStudents, totalRevenue, onReview, onViewAllStudents }: any) {
  const activeCourses = courses.filter((c: any) => c.status === "active").length;
  return (
    <div className="space-y-5">
      <WelcomeBanner name={user.name} message={`You have ${pendingAssessments.length} pending reviews and ${totalStudents} active students.`} icon={BookOpen} gradient="from-green-600 to-teal-600" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={BookOpen} label="Active Courses" value={activeCourses} change="+1 this month" color="green" />
        <StatCard icon={Users} label="Total Students" value={totalStudents} change="+18 this week" color="blue" />
        <StatCard icon={Award} label="Certs Issued" value="87" change="+12 this month" color="purple" />
        <StatCard icon={BarChart3} label="Monthly Revenue" value={`₹${(totalRevenue / 1000).toFixed(0)}K`} change="+24% growth" color="orange" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold mb-3">Revenue This Quarter</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `₹${v / 1000}K`} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card-base p-4">
          <SectionHeader title="Pending Reviews" subtitle={`${pendingAssessments.length} assessments awaiting grading`} />
          <div className="space-y-2.5">
            {pendingAssessments.map((a: any) => (
              <div key={a.id} className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100">
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{a.title}</p>
                  <p className="text-[11px] text-slate-400">{a.submissions} submissions • Due {a.dueDate}</p>
                </div>
                <button onClick={() => onReview(a)} className="btn-primary text-[11px] px-2.5 py-1 flex-shrink-0">Review</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card-base p-4">
        <SectionHeader title="Recent Student Activity" action={<button onClick={onViewAllStudents} className="text-xs text-primary-600 hover:underline">View all</button>} />
        <div className="divide-y divide-border">
          {recentStudents.map((student: any) => (
            <div key={student.id} className="flex items-center gap-3 py-2.5">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs flex-shrink-0">{student.name[0]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold">{student.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{student.courseId} • {student.lastActive}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full"><div className="h-full bg-green-600 rounded-full" style={{ width: `${student.progress}%` }} /></div>
                <span className="text-[10px] text-slate-500">{student.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoursesTab({ courses, onNewCourse, onManage, onEdit }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="My Courses" action={<button onClick={onNewCourse} className="btn-primary text-xs px-3 py-2 flex items-center gap-1"><Plus className="w-3.5 h-3.5" />New Course</button>} />
      <div className="grid sm:grid-cols-2 gap-4">
        {courses.map((course: any) => (
          <div key={course.id} className="card-base p-4 hover:-translate-y-0.5 cursor-pointer">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center"><Video className="w-4 h-4 text-green-600" /></div>
              <StatusBadge status={course.status} />
            </div>
            <h3 className="text-sm font-semibold mb-1">{course.title}</h3>
            <div className="grid grid-cols-3 gap-2 mt-3 mb-3">
              <div className="text-center"><p className="text-sm font-bold">{course.students}</p><p className="text-[10px] text-slate-400">Students</p></div>
              <div className="text-center"><p className="text-sm font-bold">{course.sessions}</p><p className="text-[10px] text-slate-400">Sessions</p></div>
              <div className="text-center"><p className="text-sm font-bold text-green-600">{course.rating > 0 ? course.rating : "—"}</p><p className="text-[10px] text-slate-400">Rating</p></div>
            </div>
            {course.revenue > 0 && <p className="text-xs font-bold text-green-600">₹{course.revenue.toLocaleString()} earned</p>}
            <div className="flex items-center gap-2 mt-3">
              <button onClick={() => onManage(course)} className="flex-1 btn-primary text-xs py-1.5">Manage</button>
              <button onClick={() => onEdit(course)} className="flex items-center gap-1 px-2.5 py-1.5 text-xs border rounded-lg"><Edit3 className="w-3 h-3" />Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentsTab({ students, courses }: any) {
  const getCourseTitle = (courseId: string) => {
    const course = courses.find((c: any) => c.id === courseId);
    return course ? course.title : "Unknown";
  };
  return (
    <div className="space-y-4">
      <SectionHeader title="My Students" subtitle={`${students.length} students across all courses`} />
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b bg-slate-50 dark:bg-slate-800/60"><th className="text-left text-xs font-semibold px-4 py-3">Student</th><th className="text-left text-xs font-semibold px-4 py-3">Course</th><th className="text-left text-xs font-semibold px-4 py-3">Progress</th><th className="text-left text-xs font-semibold px-4 py-3">Last Active</th><th className="text-left text-xs font-semibold px-4 py-3">Status</th></tr></thead>
            <tbody className="divide-y">
              {students.map((s: any) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">{s.name[0]}</div><span className="text-xs font-medium">{s.name}</span></div></td>
                  <td className="px-4 py-3 text-xs text-slate-500">{getCourseTitle(s.courseId)}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full"><div className="h-full bg-green-600 rounded-full" style={{ width: `${s.progress}%` }} /></div><span className="text-[10px]">{s.progress}%</span></div></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{s.lastActive}</td>
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

function AssessmentsTab({ assessments, onGrade, onNewAssessment }: any) {
  const pending = assessments.filter((a: any) => !a.graded);
  return (
    <div className="space-y-4">
      <SectionHeader title="Assessments & Exams" action={<button onClick={onNewAssessment} className="btn-primary text-xs px-3 py-2"><Plus className="w-3.5 h-3.5" />New Assessment</button>} />
      <div className="space-y-3">
        {pending.map((a: any) => (
          <div key={a.id} className="card-base p-4">
            <div className="flex items-start justify-between gap-4">
              <div><h3 className="text-sm font-semibold">{a.title}</h3><p className="text-xs text-slate-400 mt-0.5">Due: {a.dueDate}</p><p className="text-xs font-medium text-yellow-600 mt-1">{a.submissions} submissions pending</p></div>
              <button onClick={() => onGrade(a)} className="btn-primary text-xs px-3 py-2">Grade Submissions</button>
            </div>
          </div>
        ))}
        {pending.length === 0 && <div className="text-center text-slate-400 text-sm py-8">All caught up! No pending assessments.</div>}
      </div>
    </div>
  );
}

function CertificatesTab({ certificates, onView }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="Certificate Management" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        <StatCard icon={Award} label="Total Issued" value={certificates.length} color="green" />
        <StatCard icon={CheckCircle2} label="This Month" value="12" change="+4 from last" color="blue" />
        <StatCard icon={Clock} label="Pending Issue" value="6" change="Action needed" color="orange" />
      </div>
      <div className="card-base p-4">
        <SectionHeader title="Recent Certificates Issued" />
        <div className="space-y-2.5">
          {certificates.map((cert: any) => (
            <div key={cert.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2.5"><Award className="w-4 h-4 text-green-600" /><span className="text-xs">{cert.title} — {cert.studentName}</span></div>
              <button onClick={() => onView(cert)} className="text-xs text-green-600 font-medium hover:underline flex items-center gap-1"><Download className="w-3 h-3" /> Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Teaching Analytics Dashboard" />
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card-base p-4"><h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><TrendingUp className="w-4 h-4 text-green-600" /> Revenue Growth</h3><ResponsiveContainer width="100%" height={220}><BarChart data={revenueData}><XAxis dataKey="month" tick={{ fontSize: 10 }} /><YAxis tickFormatter={(v) => `₹${v/1000}K`} tick={{ fontSize: 10 }} /><Tooltip /><Bar dataKey="revenue" fill="#16a34a" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div>
        <div className="card-base p-4"><h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><Target className="w-4 h-4 text-cyan-600" /> Avg Student Score</h3><ResponsiveContainer width="100%" height={220}><BarChart data={studentPerformance}><XAxis dataKey="course" tick={{ fontSize: 10 }} /><YAxis domain={[0,100]} tick={{ fontSize: 10 }} /><Tooltip /><Bar dataKey="avg" fill="#06b6d4" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card-base p-4"><h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><Users className="w-4 h-4 text-blue-600" /> Enrollment Trend</h3><ResponsiveContainer width="100%" height={220}><LineChart data={enrollmentTrend}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip /><Line type="monotone" dataKey="newStudents" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} /></LineChart></ResponsiveContainer></div>
        <div className="card-base p-4"><h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><FileText className="w-4 h-4 text-purple-600" /> Assessment Completion</h3><ResponsiveContainer width="100%" height={220}><BarChart data={assessmentCompletion} layout="vertical"><XAxis type="number" /><YAxis type="category" dataKey="name" width={50} /><Tooltip /><Legend /><Bar dataKey="completed" name="Completed" fill="#16a34a" /><Bar dataKey="pending" name="Pending" fill="#f59e0b" /></BarChart></ResponsiveContainer></div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card-base p-4"><h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><Star className="w-4 h-4 text-yellow-600" /> Top Students</h3><div className="space-y-2">{topStudents.map((s, i) => (<div key={s.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50"><div className="flex items-center gap-2"><span className="text-xs font-bold text-slate-400 w-5">#{i+1}</span><div><p className="text-xs font-semibold">{s.name}</p><p className="text-[10px] text-slate-400">{s.course}</p></div></div><div className="flex items-center gap-3"><div className="w-16 h-1.5 bg-slate-200 rounded-full"><div className="h-full bg-green-600 rounded-full" style={{ width: `${s.progress}%` }} /></div><span className="text-xs font-bold text-green-600">{s.progress}%</span></div></div>))}</div></div>
        <div className="card-base p-4"><h3 className="text-sm font-semibold flex items-center gap-2 mb-3"><Calendar className="w-4 h-4 text-indigo-600" /> Learning Activity</h3><ResponsiveContainer width="100%" height={220}><AreaChart data={learningActivity}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="week" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip /><Area type="monotone" dataKey="hours" name="Hours" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} /></AreaChart></ResponsiveContainer></div>
      </div>
      <div className="text-center text-[10px] text-slate-400 pt-2 border-t">Analytics updated in real-time</div>
    </div>
  );
}