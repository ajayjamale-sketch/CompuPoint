import { useState, useEffect } from "react";
import {
  LayoutDashboard, BookOpen, Award, Briefcase, BarChart3,
  TrendingUp, Star, Code2, Target, Globe, CheckCircle2, Zap, X, Plus, Download, Share2, ExternalLink, Send, FileText, Calendar, Clock, Users, Eye
} from "lucide-react";
import { DashboardShell, StatCard, SectionHeader, WelcomeBanner, StatusBadge } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { COURSES, CERTIFICATIONS } from "@/constants";
import { cn } from "@/lib/utils";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie,
  Cell, AreaChart, Area, CartesianGrid, Legend
} from "recharts";

// Fallback data in case imports fail
const FALLBACK_COURSES = [
  { id: "1", title: "Modern JavaScript - ES6+", instructor: "Sarah Chen", duration: "8 hours", image: "https://placehold.co/600x400/2563eb/white?text=JS", description: "Master modern JavaScript features" },
  { id: "2", title: "React - The Complete Guide", instructor: "David Miller", duration: "24 hours", image: "https://placehold.co/600x400/2563eb/white?text=React", description: "Build production-ready React apps" },
  { id: "3", title: "Node.js Microservices", instructor: "Alex Rivera", duration: "12 hours", image: "https://placehold.co/600x400/2563eb/white?text=Node", description: "Scale backend with Node.js" },
  { id: "4", title: "AWS Cloud Practitioner", instructor: "Jordan Lee", duration: "10 hours", image: "https://placehold.co/600x400/2563eb/white?text=AWS", description: "Prepare for AWS certification" },
  { id: "5", title: "DevOps with Docker & Jenkins", instructor: "Maria Gonzalez", duration: "15 hours", image: "https://placehold.co/600x400/2563eb/white?text=DevOps", description: "CI/CD pipelines and containers" },
  { id: "6", title: "TypeScript Mastery", instructor: "Tom Wagner", duration: "6 hours", image: "https://placehold.co/600x400/2563eb/white?text=TS", description: "Type-safe JavaScript" },
];
const FALLBACK_CERTIFICATIONS = [
  { id: 0, title: "Professional Frontend Developer", issuer: "CompuPoint", issueDate: "Jan 2025", credentialId: "CERT-1000", status: "earned" },
  { id: 1, title: "React Advanced Patterns", issuer: "Meta", issueDate: "Mar 2025", credentialId: "CERT-1001", status: "earned" },
  { id: 2, title: "Cloud Foundations", issuer: "AWS", issueDate: "Dec 2024", credentialId: "CERT-1002", status: "earned" },
  { id: 3, title: "DevOps Essentials", issuer: "Linux Foundation", issueDate: "Feb 2023", credentialId: "CERT-1003", status: "expiring" },
];
const FINAL_COURSES = (typeof COURSES !== 'undefined' && COURSES.length) ? COURSES : FALLBACK_COURSES;
const FINAL_CERTS = (typeof CERTIFICATIONS !== 'undefined' && CERTIFICATIONS.length) ? CERTIFICATIONS : FALLBACK_CERTIFICATIONS;

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "skills", label: "Skill Roadmap", icon: Target },
  { id: "certifications", label: "Certifications", icon: Award, badge: 0 },
  { id: "portfolio", label: "Portfolio", icon: Code2 },
  { id: "career", label: "Career Ops", icon: Briefcase },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const skillData = [
  { skill: "JavaScript", current: 85, target: 95 },
  { skill: "React", current: 78, target: 90 },
  { skill: "Node.js", current: 65, target: 85 },
  { skill: "Cloud AWS", current: 45, target: 80 },
  { skill: "DevOps", current: 50, target: 75 },
  { skill: "TypeScript", current: 70, target: 90 },
];

const radarData = [
  { subject: "Frontend", A: 85 }, { subject: "Backend", A: 68 }, { subject: "DevOps", A: 50 },
  { subject: "Security", A: 55 }, { subject: "Cloud", A: 45 }, { subject: "Database", A: 72 },
];

const salaryData = [
  { year: "2022", salary: 6 }, { year: "2023", salary: 8 }, { year: "2024", salary: 10 },
  { year: "2025", salary: 12 }, { year: "2026", salary: 14 },
];

const initialPortfolio = [
  { id: 1, name: "E-Commerce Platform", tech: "React, Node.js, MongoDB", status: "Live", views: 1240 },
  { id: 2, name: "AI Chat Application", tech: "Python, FastAPI, OpenAI", status: "Live", views: 890 },
  { id: 3, name: "DevOps CI/CD Pipeline", tech: "Docker, Jenkins, AWS", status: "Private", views: 320 },
];

const initialCareerOps = [
  { id: 1, title: "Senior React Developer", company: "Flipkart", type: "Full-time", salary: "₹18-24 LPA", match: 92, applied: false },
  { id: 2, title: "Full-Stack Engineer", company: "Razorpay", type: "Full-time", salary: "₹20-28 LPA", match: 85, applied: false },
  { id: 3, title: "Cloud Architect", company: "Wipro", type: "Contract", salary: "₹25-35 LPA", match: 71, applied: false },
];

const initialCertifications = FINAL_CERTS.slice(0, 4).map((cert, idx) => ({
  ...cert,
  id: idx,
  status: idx < 3 ? "earned" : "expiring",
  issueDate: cert.issueDate || "Jan 2025",
  credentialId: cert.credentialId || `CERT-${1000 + idx}`,
}));

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};
const saveToStorage = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default function ProfessionalDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  
  const [certifications, setCertifications] = useState(() => loadFromStorage("professional_certs", initialCertifications));
  const [portfolio, setPortfolio] = useState(() => loadFromStorage("professional_portfolio", initialPortfolio));
  const [careerOps, setCareerOps] = useState(() => loadFromStorage("professional_jobs", initialCareerOps));
  
  const [showAddCertModal, setShowAddCertModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showJobApplicationModal, setShowJobApplicationModal] = useState<{ job: any; show: boolean }>({ job: null, show: false });
  const [showCourseRecommendations, setShowCourseRecommendations] = useState<{ skill: string; show: boolean }>({ skill: "", show: false });
  
  const [newCert, setNewCert] = useState({ title: "", issuer: "", issueDate: "" });
  const [newProject, setNewProject] = useState({ name: "", tech: "", status: "Live" });
  const [jobApplication, setJobApplication] = useState({ name: "", email: "", resume: "" });
  
  useEffect(() => {
    saveToStorage("professional_certs", certifications);
  }, [certifications]);
  useEffect(() => {
    saveToStorage("professional_portfolio", portfolio);
  }, [portfolio]);
  useEffect(() => {
    saveToStorage("professional_jobs", careerOps);
  }, [careerOps]);
  
  const updatedSidebarItems = sidebarItems.map(item =>
    item.id === "certifications" ? { ...item, badge: certifications.length } : item
  );
  
  const openJobApplication = (job: any) => {
    setJobApplication({ name: user?.name || "", email: user?.email || "", resume: "" });
    setShowJobApplicationModal({ job, show: true });
  };
  
  const submitJobApplication = () => {
    if (!jobApplication.name || !jobApplication.email || !jobApplication.resume) {
      alert("Please fill all fields including resume link/summary");
      return;
    }
    setCareerOps(prev => prev.map(job =>
      job.id === showJobApplicationModal.job.id ? { ...job, applied: true } : job
    ));
    setShowJobApplicationModal({ job: null, show: false });
    alert(`✅ Application submitted for ${showJobApplicationModal.job.title} at ${showJobApplicationModal.job.company}. The recruiter will contact you soon.`);
  };
  
  const downloadCert = (certTitle: string) => {
    const content = `CERTIFICATE OF COMPLETION\n\nThis certifies that ${user?.name} has successfully completed the certification:\n${certTitle}\n\nIssued by CompuPoint Academy\nDate: ${new Date().toLocaleDateString()}\n\nVerification ID: ${Math.random().toString(36).substring(7)}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${certTitle.replace(/\s/g, "_")}_Certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const shareCert = async (certTitle: string) => {
    const shareText = `I earned my "${certTitle}" certification from CompuPoint Academy! 🎓`;
    if (navigator.share) {
      await navigator.share({ title: "Certification Achievement", text: shareText });
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("Share link copied to clipboard!");
    }
  };
  
  const addNewCertification = () => {
    if (!newCert.title || !newCert.issuer) {
      alert("Please fill title and issuer");
      return;
    }
    const newId = certifications.length;
    const newCertObj = {
      id: newId,
      title: newCert.title,
      issuer: newCert.issuer,
      issueDate: newCert.issueDate || new Date().toLocaleDateString(),
      credentialId: `CERT-${Math.floor(Math.random() * 10000)}`,
      status: "earned" as const,
    };
    setCertifications(prev => [newCertObj, ...prev]);
    setShowAddCertModal(false);
    setNewCert({ title: "", issuer: "", issueDate: "" });
  };
  
  const addNewProject = () => {
    if (!newProject.name || !newProject.tech) {
      alert("Please fill project name and tech stack");
      return;
    }
    const newId = portfolio.length + 1;
    const newProj = {
      id: newId,
      name: newProject.name,
      tech: newProject.tech,
      status: newProject.status,
      views: 0,
    };
    setPortfolio(prev => [newProj, ...prev]);
    setShowAddProjectModal(false);
    setNewProject({ name: "", tech: "", status: "Live" });
  };
  
  const findCoursesForSkill = (skillName: string) => {
    setShowCourseRecommendations({ skill: skillName, show: true });
  };
  
  const getRecommendedCourses = (skill: string) => {
    const lowerSkill = skill.toLowerCase();
    return FINAL_COURSES.filter(course => 
      course.title.toLowerCase().includes(lowerSkill) || 
      (course.description && course.description.toLowerCase().includes(lowerSkill))
    ).slice(0, 4);
  };
  
  const handleEnroll = (courseTitle: string) => {
    alert(`🎉 You have been enrolled in "${courseTitle}"! Check your learning dashboard to start.`);
  };
  
  if (!user) return null;
  
  return (
    <>
      {/* Job Application Modal */}
      {showJobApplicationModal.show && showJobApplicationModal.job && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2"><Briefcase className="w-5 h-5 text-blue-500" /> Apply for {showJobApplicationModal.job.title}</h3>
              <button onClick={() => setShowJobApplicationModal({ job: null, show: false })}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <input type="text" value={jobApplication.name} onChange={e => setJobApplication({...jobApplication, name: e.target.value})} placeholder="Full Name" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
              <input type="email" value={jobApplication.email} onChange={e => setJobApplication({...jobApplication, email: e.target.value})} placeholder="Email" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
              <textarea value={jobApplication.resume} onChange={e => setJobApplication({...jobApplication, resume: e.target.value})} placeholder="Resume link or summary of experience" rows={3} className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
              <div className="flex gap-2">
                <button onClick={submitJobApplication} className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-blue-700 transition"><Send className="w-4 h-4" /> Submit Application</button>
                <button onClick={() => setShowJobApplicationModal({ job: null, show: false })} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Course Recommendations Modal */}
      {showCourseRecommendations.show && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-white dark:bg-slate-900 pt-0 pb-2">
              <h3 className="text-lg font-bold flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-500" /> Courses to improve "{showCourseRecommendations.skill}"</h3>
              <button onClick={() => setShowCourseRecommendations({ skill: "", show: false })}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {getRecommendedCourses(showCourseRecommendations.skill).length === 0 && (
                <p className="text-sm text-slate-500">No specific courses found. Try exploring general upskilling modules.</p>
              )}
              {getRecommendedCourses(showCourseRecommendations.skill).map(course => (
                <div key={course.id} className="flex items-start gap-3 p-3 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
                  <img src={course.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{course.title}</p>
                    <p className="text-xs text-slate-400">{course.instructor} • {course.duration}</p>
                    <button 
                      onClick={() => handleEnroll(course.title)}
                      className="text-xs text-blue-600 mt-1 font-medium hover:underline flex items-center gap-1"
                    >
                      Enroll Now <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Add Certification Modal */}
      {showAddCertModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2"><Award className="w-5 h-5 text-blue-500" /> Add Certification</h3>
              <button onClick={() => setShowAddCertModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <input type="text" value={newCert.title} onChange={e => setNewCert({...newCert, title: e.target.value})} placeholder="Certification Title" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
              <input type="text" value={newCert.issuer} onChange={e => setNewCert({...newCert, issuer: e.target.value})} placeholder="Issuing Organization" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
              <input type="date" value={newCert.issueDate} onChange={e => setNewCert({...newCert, issueDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
              <div className="flex gap-2">
                <button onClick={addNewCertification} className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition">Add Certification</button>
                <button onClick={() => setShowAddCertModal(false)} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2"><Code2 className="w-5 h-5 text-blue-500" /> Add Portfolio Project</h3>
              <button onClick={() => setShowAddProjectModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <input type="text" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} placeholder="Project Name" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
              <input type="text" value={newProject.tech} onChange={e => setNewProject({...newProject, tech: e.target.value})} placeholder="Tech Stack (e.g., React, Node.js)" className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm" />
              <select value={newProject.status} onChange={e => setNewProject({...newProject, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-transparent text-sm">
                <option value="Live">Live</option>
                <option value="Private">Private</option>
                <option value="In Progress">In Progress</option>
              </select>
              <div className="flex gap-2">
                <button onClick={addNewProject} className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition">Add Project</button>
                <button onClick={() => setShowAddProjectModal(false)} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <DashboardShell
        sidebarItems={updatedSidebarItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        title="Professional Dashboard"
        roleColor="text-blue-600 dark:text-blue-400"
        roleBg="bg-blue-50 dark:bg-blue-900/20"
      >
        {activeTab === "overview" && (
          <OverviewTab
            user={user}
            careerOps={careerOps}
            onApplyJob={openJobApplication}
          />
        )}
        {activeTab === "skills" && (
          <SkillsTab
            skillData={skillData}
            onFindCourses={findCoursesForSkill}
          />
        )}
        {activeTab === "certifications" && (
          <CertsTab
            certifications={certifications}
            onShareCert={shareCert}
            onDownloadCert={downloadCert}
            onAddCert={() => setShowAddCertModal(true)}
          />
        )}
        {activeTab === "portfolio" && (
          <PortfolioTab
            portfolio={portfolio}
            onAddProject={() => setShowAddProjectModal(true)}
          />
        )}
        {activeTab === "career" && (
          <CareerTab
            careerOps={careerOps}
            onApplyJob={openJobApplication}
          />
        )}
        {activeTab === "analytics" && (
          <AnalyticsTab
            user={user}
            certifications={certifications}
            careerOps={careerOps}
            portfolio={portfolio}
            skillData={skillData}
            radarData={radarData}
            salaryData={salaryData}
          />
        )}
      </DashboardShell>
    </>
  );
}

// ========== OVERVIEW TAB ==========
function OverviewTab({ user, careerOps, onApplyJob }: any) {
  return (
    <div className="space-y-5">
      <WelcomeBanner name={user.name} message={`${user.organization} • ${user.specialization} • Level 3 Professional`} icon={Zap} gradient="from-blue-600 to-cyan-600" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Award} label="Certifications" value={user.certifications} change="2 expiring soon" color="blue" />
        <StatCard icon={BookOpen} label="Courses Active" value={user.coursesEnrolled} change="+3 this quarter" color="blue" />
        <StatCard icon={TrendingUp} label="Salary Growth" value="+32%" change="Since joining" color="green" />
        <StatCard icon={Star} label="Skill Score" value="84/100" change="Top 8% nationally" color="cyan" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-sm"><h3 className="text-xs font-semibold mb-4">Skill Radar</h3><ResponsiveContainer width="100%" height={200}><RadarChart data={radarData}><PolarGrid stroke="#e2e8f0" /><PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} /><Radar name="Skills" dataKey="A" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} /></RadarChart></ResponsiveContainer></div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-sm"><h3 className="text-xs font-semibold mb-4">Salary Trajectory (LPA)</h3><ResponsiveContainer width="100%" height={200}><LineChart data={salaryData}><XAxis dataKey="year" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip /><Line type="monotone" dataKey="salary" stroke="#2563EB" strokeWidth={2.5} dot={{ fill: "#2563EB", r: 4 }} /></LineChart></ResponsiveContainer></div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3"><h3 className="text-xs font-semibold">Top Career Opportunities</h3><button className="text-xs text-blue-600">View All</button></div>
        <div className="space-y-2.5">
          {careerOps.slice(0, 3).map((job: any) => (
            <div key={job.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div><p className="text-xs font-semibold">{job.title}</p><p className="text-[11px] text-slate-400">{job.company} • {job.type}</p><p className="text-xs font-medium text-green-600">{job.salary}</p></div>
              <div className="text-right"><div className="text-sm font-bold text-blue-600">{job.match}% match</div>{job.applied ? <span className="inline-block text-[11px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">Applied</span> : <button onClick={() => onApplyJob(job)} className="bg-blue-600 text-white text-[11px] px-2.5 py-1 rounded-lg mt-1 hover:bg-blue-700 transition">Apply Now</button>}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== SKILLS TAB ==========
function SkillsTab({ skillData, onFindCourses }: any) {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center"><h2 className="text-lg font-semibold">Skill Development Roadmap</h2><button className="text-xs text-blue-600">Download Report</button></div>
      <div className="space-y-3">
        {skillData.map((skill: any) => {
          const gap = skill.target - skill.current;
          return (
            <div key={skill.skill} className="bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="text-sm font-semibold">{skill.skill}</span>
                <div className="flex items-center gap-3 text-xs"><span>Current: <span className="font-bold text-blue-600">{skill.current}%</span></span><span>Target: <span className="font-bold text-green-600">{skill.target}%</span></span><span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", gap > 20 ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" : gap > 10 ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400")}>Gap: {gap}%</span></div>
              </div>
              <div className="relative h-2 bg-slate-100 dark:bg-slate-700 rounded-full"><div className="absolute h-full bg-blue-600 rounded-full" style={{ width: `${skill.current}%` }} /><div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 border-2 border-green-500 bg-white dark:bg-slate-900 rounded-full" style={{ left: `${skill.target}%` }} /></div>
              {gap > 0 && <button onClick={() => onFindCourses(skill.skill)} className="text-[11px] text-blue-600 font-medium mt-2 hover:underline flex items-center gap-1">Find courses to close gap <ExternalLink className="w-3 h-3" /></button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ========== CERTIFICATIONS TAB ==========
function CertsTab({ certifications, onShareCert, onDownloadCert, onAddCert }: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center"><h2 className="text-lg font-semibold">Certifications Portfolio</h2><button onClick={onAddCert} className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-700 transition"><Plus className="w-3.5 h-3.5" /> Add New</button></div>
      <div className="grid sm:grid-cols-2 gap-4">
        {certifications.map((cert: any) => (
          <div key={cert.id} className="bg-white dark:bg-slate-900 rounded-xl border p-5 shadow-sm">
            <div className="flex items-start gap-3"><div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center"><Award className="w-5 h-5 text-blue-600" /></div><div className="flex-1"><h3 className="text-sm font-semibold mb-1">{cert.title}</h3><p className="text-xs text-slate-400 mb-2">{cert.issueDate} • {cert.credentialId}</p><div className="flex items-center gap-3"><span className={cn("text-[10px] px-2 py-0.5 rounded-full", cert.status === 'earned' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400')}>{cert.status}</span><button onClick={() => onShareCert(cert.title)} className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1"><Share2 className="w-3 h-3" /> Share</button><button onClick={() => onDownloadCert(cert.title)} className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1"><Download className="w-3 h-3" /> Download</button></div></div></div>
          </div>
        ))}
        <div onClick={onAddCert} className="bg-white dark:bg-slate-900 rounded-xl border-dashed border-2 p-5 text-center flex flex-col items-center justify-center min-h-[140px] hover:border-blue-400 cursor-pointer transition"><Award className="w-8 h-8 text-blue-300 mb-2" /><p className="text-sm font-semibold">Add New Certification</p><p className="text-xs text-slate-400">Attempt a new exam</p></div>
      </div>
    </div>
  );
}

// ========== PORTFOLIO TAB ==========
function PortfolioTab({ portfolio, onAddProject }: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center"><h2 className="text-lg font-semibold">Portfolio Projects</h2><button onClick={onAddProject} className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-700 transition"><Plus className="w-3.5 h-3.5" /> Add Project</button></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolio.map((project: any) => (
          <div key={project.id} className="bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-sm"><div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3"><Globe className="w-5 h-5 text-blue-600" /></div><h3 className="text-sm font-semibold mb-1">{project.name}</h3><p className="text-xs text-slate-400 mb-3">{project.tech}</p><div className="flex items-center justify-between"><span className={cn("text-[10px] px-2 py-0.5 rounded-full", project.status === 'live' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' : project.status === 'private' ? 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300' : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400')}>{project.status}</span><span className="text-xs text-slate-400">{project.views} views</span></div></div>
        ))}
      </div>
    </div>
  );
}

// ========== CAREER TAB ==========
function CareerTab({ careerOps, onApplyJob }: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center"><h2 className="text-lg font-semibold">Career Opportunities</h2><button className="text-xs text-blue-600">Job Alerts</button></div>
      <div className="space-y-3">
        {careerOps.map((job: any) => (
          <div key={job.id} className="bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 mb-1"><h3 className="text-sm font-semibold">{job.title}</h3><span className="text-[10px] bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 px-2 py-0.5 rounded-full">{job.type}</span></div><p className="text-xs text-slate-400">{job.company}</p><p className="text-sm font-bold text-green-600 mt-1">{job.salary}</p></div><div className="text-right"><div className="text-xl font-bold text-blue-600">{job.match}%</div><p className="text-[10px] text-slate-400">match score</p>{job.applied ? <span className="inline-block text-[11px] bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full mt-2">Applied ✓</span> : <button onClick={() => onApplyJob(job)} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg mt-2 hover:bg-blue-700 transition">Apply Now</button>}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== ENHANCED ANALYTICS TAB ==========
function AnalyticsTab({ user, certifications, careerOps, portfolio, skillData, radarData, salaryData }: any) {
  const totalCertifications = certifications.length;
  const appliedJobs = careerOps.filter((job: any) => job.applied).length;
  const totalProjects = portfolio.length;
  const totalPortfolioViews = portfolio.reduce((sum: number, proj: any) => sum + proj.views, 0);
  const avgSkillGap = skillData.reduce((sum: number, s: any) => sum + (s.target - s.current), 0) / skillData.length;
  
  const skillGapData = skillData.map((s: any) => ({
    name: s.skill,
    current: s.current,
    target: s.target,
  }));
  
  const certsPerMonth = [
    { month: "Jan", certs: 1 }, { month: "Feb", certs: 0 }, { month: "Mar", certs: 2 },
    { month: "Apr", certs: 1 }, { month: "May", certs: 0 }, { month: "Jun", certs: Math.max(1, totalCertifications - 3) }
  ];
  
  const applicationData = [
    { name: "Applied", value: appliedJobs, color: "#2563EB" },
    { name: "Not Applied", value: careerOps.length - appliedJobs, color: "#cbd5e1" }
  ];
  
  const learningHours = [
    { week: "Week 1", hours: 4 }, { week: "Week 2", hours: 6 }, { week: "Week 3", hours: 5 },
    { week: "Week 4", hours: 8 }, { week: "Week 5", hours: 7 }, { week: "Week 6", hours: 9 }
  ];
  
  const portfolioViewsData = portfolio.map((p: any) => ({
    project: p.name.length > 12 ? p.name.slice(0, 10) + "..." : p.name,
    views: p.views
  }));
  
  const matchRanges = [
    { range: "90-100%", count: careerOps.filter((j: any) => j.match >= 90).length },
    { range: "75-89%", count: careerOps.filter((j: any) => j.match >= 75 && j.match < 90).length },
    { range: "60-74%", count: careerOps.filter((j: any) => j.match >= 60 && j.match < 75).length },
    { range: "<60%", count: careerOps.filter((j: any) => j.match < 60).length },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Advanced Professional Analytics</h2>
        <button className="text-xs text-blue-600 hover:underline">Export All Reports</button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-3 text-center">
          <Award className="w-5 h-5 text-blue-500 mx-auto mb-1" />
          <div className="text-2xl font-bold">{totalCertifications}</div>
          <div className="text-xs text-slate-400">Certifications</div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-3 text-center">
          <Briefcase className="w-5 h-5 text-blue-500 mx-auto mb-1" />
          <div className="text-2xl font-bold">{appliedJobs}/{careerOps.length}</div>
          <div className="text-xs text-slate-400">Jobs Applied</div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-3 text-center">
          <Code2 className="w-5 h-5 text-green-500 mx-auto mb-1" />
          <div className="text-2xl font-bold">{totalProjects}</div>
          <div className="text-xs text-slate-400">Portfolio Projects</div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-3 text-center">
          <Eye className="w-5 h-5 text-orange-500 mx-auto mb-1" />
          <div className="text-2xl font-bold">{totalPortfolioViews}</div>
          <div className="text-xs text-slate-400">Total Views</div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-blue-500" /> Skill Coverage Radar</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <Radar name="Current Proficiency" dataKey="A" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-500" /> Salary Trajectory (LPA)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={salaryData}>
              <XAxis dataKey="year" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="salary" stroke="#2563EB" strokeWidth={2.5} dot={{ fill: "#2563EB", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-sm">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-blue-500" /> Skill Gap Analysis (Current vs Target)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={skillGapData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" name="Current" fill="#2563EB" barSize={20} radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" name="Target" fill="#10b981" barSize={20} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-slate-400 text-center mt-2">Average skill gap: {avgSkillGap.toFixed(1)}%</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-yellow-500" /> Certification Growth Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={certsPerMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area type="monotone" dataKey="certs" name="Certifications Earned" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Briefcase className="w-4 h-4 text-blue-500" /> Application Status</h3>
          <div className="flex items-center justify-around">
            <ResponsiveContainer width={150} height={150}>
              <PieChart>
                <Pie data={applicationData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                  {applicationData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1">
              <div><span className="text-2xl font-bold text-blue-600">{appliedJobs}</span><span className="text-xs text-slate-400"> / {careerOps.length} applied</span></div>
              <div className="text-xs text-slate-500">Avg. match: {Math.round(careerOps.reduce((a: number, j: any) => a + j.match, 0) / careerOps.length)}%</div>
              <div className="text-xs text-slate-500">Top match: {Math.max(...careerOps.map((j: any) => j.match))}%</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-green-500" /> Learning Activity (Weekly Hours)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={learningHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area type="monotone" dataKey="hours" name="Learning Hours" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-400 text-center mt-2">Consistent upskilling trend</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-blue-500" /> Job Match Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={matchRanges} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="range" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="count" name="Number of Jobs" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {portfolio.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500" /> Portfolio Engagement (Views per Project)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={portfolioViewsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="project" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="views" name="Views" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-400 text-center mt-2">Project visibility across platforms</p>
        </div>
      )}
      
      <div className="text-center text-[10px] text-slate-400 pt-2 border-t">
        Analytics updated in real-time • Data persisted locally
      </div>
    </div>
  );
}