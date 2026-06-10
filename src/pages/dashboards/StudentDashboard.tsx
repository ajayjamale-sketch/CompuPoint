import { useState, useEffect } from "react";
import {
  LayoutDashboard, BookOpen, Award, Briefcase, BarChart3,
  Play, Clock, Star, CheckCircle2, TrendingUp, Zap, Target, Download, FileText, MessageCircle, X, Brain, Mic, Send, AlertCircle, Video, ChevronRight
} from "lucide-react";
import { DashboardShell, StatCard, SectionHeader, WelcomeBanner, StatusBadge } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { COURSES, CERTIFICATIONS } from "@/constants";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// --- Sidebar Items ---
const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "courses", label: "My Courses", icon: BookOpen, badge: 0 },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "career", label: "Career Hub", icon: Briefcase },
  { id: "analytics", label: "My Progress", icon: BarChart3 },
];

// --- Static Data ---
const weeklyData = [
  { day: "Mon", hours: 2.5 }, { day: "Tue", hours: 1.8 }, { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 2.0 }, { day: "Fri", hours: 4.1 }, { day: "Sat", hours: 3.5 }, { day: "Sun", hours: 1.5 },
];

const upcomingTests = [
  { id: "test1", title: "Python Fundamentals Exam", date: "Jan 18, 2026", type: "Certification" },
  { id: "test2", title: "Web Dev Mid-Term Assessment", date: "Jan 22, 2026", type: "Assessment" },
  { id: "test3", title: "MS Office Practical Test", date: "Jan 25, 2026", type: "Practice" },
];

const jobRecommendations = [
  { id: 1, title: "Junior Web Developer", company: "TechStart India", location: "Bangalore", salary: "₹4-6 LPA", match: 88, applied: false },
  { id: 2, title: "Python Developer", company: "DataSoft Solutions", location: "Remote", salary: "₹5-8 LPA", match: 82, applied: false },
  { id: 3, title: "Frontend Developer", company: "WebCraft Labs", location: "Mumbai", salary: "₹3.5-5 LPA", match: 75, applied: false },
];

// --- Interview Data ---
const INTERVIEW_QUESTIONS: Record<string, string[]> = {
  Frontend: [
    "What is the difference between virtual DOM and real DOM?",
    "Explain the CSS Box Model and how box-sizing works.",
    "What are closures in JavaScript?"
  ],
  Backend: [
    "Explain RESTful APIs and the key HTTP methods.",
    "What are database indexes and how do they improve performance?",
    "How do you handle authentication in a web app?"
  ],
  "Data Science": [
    "Explain supervised vs unsupervised learning.",
    "What is overfitting and how to prevent it?",
    "What is the role of activation functions?"
  ],
  Python: [
    "What are generators in Python?",
    "Explain deep copy vs shallow copy.",
    "How does Python manage memory?"
  ],
  JavaScript: [
    "Explain promises and async/await.",
    "What is the difference between == and ===?",
    "Explain prototype inheritance."
  ],
  Behavioral: [
    "Tell me about a challenging technical problem you solved.",
    "How do you handle disagreements in a team?",
    "Describe a time you had to learn a new technology quickly."
  ]
};

const SIMULATED_ANSWERS: Record<string, string[]> = {
  Frontend: [
    "The Virtual DOM is a lightweight copy of the real DOM. React updates it first, compares with previous snapshot, then only updates changed nodes, improving performance.",
    "The CSS Box Model consists of margin, border, padding, and content. box-sizing: border-box includes padding and border in width/height, making layouts predictable.",
    "A closure is a function that remembers its outer variables even after the outer function finishes. It's used for data privacy and creating factory functions."
  ],
  Backend: [
    "RESTful APIs use HTTP methods: GET to retrieve, POST to create, PUT/PATCH to update, DELETE to remove. They are stateless and use standard status codes.",
    "Indexes are B-Tree structures that speed up SELECT queries but slow down writes. They avoid full table scans.",
    "Authentication verifies identity using JWTs or sessions. Authorization checks permissions, often with RBAC."
  ],
  "Data Science": [
    "Supervised learning uses labeled data for classification/regression; unsupervised finds patterns in unlabeled data like clustering.",
    "Overfitting occurs when a model learns noise instead of signal. Prevent with cross-validation, regularization, or more data.",
    "Activation functions introduce non-linearity, enabling networks to learn complex patterns. ReLU avoids vanishing gradients."
  ],
  Python: [
    "Generators yield items lazily, saving memory. They are defined with 'yield' instead of 'return'.",
    "Shallow copy copies top-level references; deep copy recursively duplicates nested objects. Use copy.deepcopy().",
    "Python uses reference counting and a cyclic garbage collector. Memory is freed when ref count reaches zero."
  ],
  JavaScript: [
    "Promises represent async operations. Async/await is syntactic sugar for promises, making code synchronous-looking.",
    "== performs type coercion, === checks strict equality without coercion.",
    "Every JS object has a prototype property. When accessing a property, JS traverses up the prototype chain until found."
  ],
  Behavioral: [
    "In my last project, we had a memory leak. I used heap snapshots to find a retained listener, removed it, and memory usage dropped by 70%.",
    "I focus on data and objectives. We once disagreed on a database; I created benchmarks, presented results, and we reached consensus.",
    "During a hackathon, I learned a new mapping library in 2 hours by reading docs and building a prototype, and we finished on time."
  ]
};

const INTERVIEW_FEEDBACK: Record<string, { score: number; strengths: string[]; improvements: string[] }> = {
  Frontend: {
    score: 84,
    strengths: ["Clear explanation of diffing algorithm", "Good understanding of box-sizing", "Accurate closure description"],
    improvements: ["Elaborate on performance implications", "Explain margin collapse"]
  },
  Backend: {
    score: 78,
    strengths: ["Solid REST explanation", "Understands B-Trees"],
    improvements: ["Include JWT refresh strategies", "Explain indexing limits"]
  },
  "Data Science": {
    score: 80,
    strengths: ["Properly defined supervised/unsupervised", "Good regularization explanation"],
    improvements: ["Discuss L1 vs L2", "Vanishing gradient details"]
  },
  Python: {
    score: 86,
    strengths: ["Deep generator knowledge", "Clear shallow/deep copy"],
    improvements: ["Explain GIL limitations"]
  },
  JavaScript: {
    score: 81,
    strengths: ["Good event loop understanding", "Strict vs loose equality"],
    improvements: ["Provide prototype examples", "Promise.allSettled usage"]
  },
  Behavioral: {
    score: 90,
    strengths: ["Strong STAR method", "High emotional intelligence"],
    improvements: ["Add more specific metrics"]
  }
};

// --- Lecture Data for Courses ---
const courseLectures: Record<string, { title: string; duration: string; completed: boolean }[]> = {
  [COURSES[0]?.id || "course1"]: [
    { title: "Introduction to Python", duration: "12 min", completed: true },
    { title: "Variables & Data Types", duration: "18 min", completed: true },
    { title: "Control Flow", duration: "22 min", completed: false },
    { title: "Functions & Modules", duration: "25 min", completed: false },
    { title: "OOP in Python", duration: "30 min", completed: false },
  ],
  [COURSES[1]?.id || "course2"]: [
    { title: "HTML & CSS Refresher", duration: "15 min", completed: true },
    { title: "JavaScript ES6+", duration: "28 min", completed: true },
    { title: "React Components & Props", duration: "24 min", completed: false },
    { title: "State & Hooks", duration: "32 min", completed: false },
    { title: "API Integration", duration: "35 min", completed: false },
  ],
  [COURSES[2]?.id || "course3"]: [
    { title: "Digital Marketing Overview", duration: "10 min", completed: true },
    { title: "SEO Fundamentals", duration: "22 min", completed: true },
    { title: "Content Marketing", duration: "18 min", completed: true },
    { title: "Social Media Strategy", duration: "20 min", completed: true },
    { title: "Analytics & Reporting", duration: "25 min", completed: true },
  ],
  [COURSES[3]?.id || "course4"]: [
    { title: "MS Word Advanced", duration: "20 min", completed: true },
    { title: "Excel Formulas & PivotTables", duration: "35 min", completed: false },
    { title: "PowerPoint Masterclass", duration: "28 min", completed: false },
    { title: "Outlook & Teams", duration: "15 min", completed: false },
  ],
};

// Helper to calculate progress from lectures
const calculateProgress = (lectures: { completed: boolean }[]) => {
  if (!lectures.length) return 0;
  const completed = lectures.filter(l => l.completed).length;
  return Math.round((completed / lectures.length) * 100);
};

// --- Main Dashboard Component ---
export default function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // State for courses and progress
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    return COURSES.slice(0, 4).map((course, idx) => ({
      ...course,
      progress: idx === 0 ? 72 : idx === 1 ? 45 : idx === 2 ? 100 : 28,
      lastAccessed: idx === 0 ? "2 hours ago" : idx === 1 ? "Yesterday" : idx === 2 ? "3 days ago" : "5 days ago",
      completed: idx === 2,
    }));
  });
  const [certifications, setCertifications] = useState(CERTIFICATIONS.slice(0, 3).map(cert => ({ ...cert, status: "earned" as const })));
  const [jobList, setJobList] = useState(jobRecommendations);
  const [userPoints, setUserPoints] = useState(2450);
  const [streak, setStreak] = useState(12);
  const [hoursLearned, setHoursLearned] = useState(47.5);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [selectedCertCourse, setSelectedCertCourse] = useState<string | null>(null);
  
  // Course player state
  const [activeCourse, setActiveCourse] = useState<any>(null);
  const [lectures, setLectures] = useState<any[]>([]);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  let videoInterval: NodeJS.Timeout | null = null;
  
  // Career hub modals
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showSkillGapModal, setShowSkillGapModal] = useState(false);
  const [activeInterview, setActiveInterview] = useState<any>(null);
  const [simulatedVoiceStatus, setSimulatedVoiceStatus] = useState("");
  
  // Form data
  const [resumeData, setResumeData] = useState({
    name: user?.name || "",
    role: "",
    experience: "",
    skills: "",
    email: user?.email || "",
    phone: "",
    education: "",
    template: "modern"
  });
  const [interviewTopic, setInterviewTopic] = useState("");
  const [skillGapRole, setSkillGapRole] = useState("");

  // Update sidebar badge
  const inProgressCount = enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length;
  const updatedSidebarItems = sidebarItems.map(item =>
    item.id === "courses" ? { ...item, badge: inProgressCount } : item
  );

  const showNotification = (message: string, type: "success" | "error" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // --- Course Player Logic ---
  const continueCourse = (courseId: string) => {
    const course = enrolledCourses.find(c => c.id === courseId);
    if (!course) return;
    const courseLecturesList = courseLectures[courseId] || [];
    setLectures(courseLecturesList);
    setActiveCourse(course);
    setCurrentLectureIndex(courseLecturesList.findIndex(l => !l.completed));
    if (currentLectureIndex === -1) setCurrentLectureIndex(0);
    setVideoProgress(0);
    setIsPlaying(false);
  };

  const completeCurrentLecture = () => {
    if (!activeCourse || !lectures.length) return;
    if (lectures[currentLectureIndex].completed) return;
    
    const updatedLectures = [...lectures];
    updatedLectures[currentLectureIndex].completed = true;
    setLectures(updatedLectures);
    
    const newProgress = calculateProgress(updatedLectures);
    setEnrolledCourses(prev => prev.map(c => 
      c.id === activeCourse.id ? { ...c, progress: newProgress, completed: newProgress === 100 } : c
    ));
    
    if (newProgress === 100 && activeCourse.progress !== 100) {
      setUserPoints(prev => prev + 500);
      setHoursLearned(prev => prev + 12);
      showNotification(`🎉 Course completed! +500 CompuPoints`, "success");
    } else {
      showNotification(`Lecture completed! Course progress: ${newProgress}%`, "success");
    }
    
    if (currentLectureIndex + 1 < updatedLectures.length) {
      setTimeout(() => {
        setCurrentLectureIndex(currentLectureIndex + 1);
        setVideoProgress(0);
        setIsPlaying(false);
      }, 1000);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (videoInterval) clearInterval(videoInterval);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      videoInterval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            if (videoInterval) clearInterval(videoInterval);
            setIsPlaying(false);
            completeCurrentLecture();
            return 0;
          }
          return prev + 2;
        });
      }, 200);
    }
  };

  const closeCoursePlayer = () => {
    if (videoInterval) clearInterval(videoInterval);
    setActiveCourse(null);
    setLectures([]);
    setIsPlaying(false);
    setVideoProgress(0);
  };

  // --- Career Hub Handlers ---
  const handleResumeBuilder = () => setShowResumeModal(true);
  const handleMockInterviews = () => setShowInterviewModal(true);
  const handleSkillGap = () => setShowSkillGapModal(true);

  const handleResumeSubmit = () => {
    if (!resumeData.name || !resumeData.role) {
      showNotification("Please fill in Name and Target Role", "error");
      return;
    }

    const templateStyles = {
      modern: {
        primary: "#4F46E5",
        text: "#1E293B",
        bg: "#F8FAFC",
        accent: "#6366F1"
      },
      minimalist: {
        primary: "#0F172A",
        text: "#334155",
        bg: "#FFFFFF",
        accent: "#475569"
      },
      executive: {
        primary: "#1E3A8A",
        text: "#1E293B",
        bg: "#FAF5FF",
        accent: "#B45309"
      }
    }[resumeData.template as "modern" | "minimalist" | "executive" || "modern"];

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resumeData.name} - Resume</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: ${templateStyles.text};
      background: ${templateStyles.bg};
      margin: 0;
      padding: 40px;
      line-height: 1.6;
    }
    .resume-container {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      padding: 50px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
      border-top: 8px solid ${templateStyles.primary};
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      margin: 0 0 5px 0;
      font-size: 32px;
      color: ${templateStyles.primary};
      letter-spacing: -0.5px;
    }
    .header .role {
      font-size: 18px;
      font-weight: 600;
      color: ${templateStyles.accent};
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .contact-info {
      font-size: 13px;
      color: #64748B;
      display: flex;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
    }
    .section-title {
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      color: ${templateStyles.primary};
      border-bottom: 2px solid #E2E8F0;
      padding-bottom: 6px;
      margin-top: 30px;
      margin-bottom: 15px;
      letter-spacing: 0.5px;
    }
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0;
      list-style: none;
    }
    .skill-tag {
      background: #F1F5F9;
      color: #334155;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
    }
    .experience-item, .education-item {
      margin-bottom: 20px;
    }
    .item-title {
      font-weight: 750;
      font-size: 15px;
      color: #0F172A;
    }
    .item-subtitle {
      font-size: 13px;
      color: ${templateStyles.accent};
      font-weight: 600;
      margin-bottom: 8px;
    }
    .item-desc {
      font-size: 14px;
      color: #475569;
      white-space: pre-wrap;
    }
    @media print {
      body { background: #fff; padding: 0; }
      .resume-container { box-shadow: none; border-radius: 0; padding: 20px; }
      .no-print { display: none; }
    }
    .no-print {
      text-align: center;
      margin-bottom: 20px;
    }
    .btn {
      background: ${templateStyles.primary};
      color: #fff;
      border: none;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
    }
  </style>
</head>
<body>
  <div class="no-print">
    <button class="btn" onclick="window.print()">Print or Save as PDF</button>
  </div>
  <div class="resume-container">
    <div class="header">
      <h1>${resumeData.name}</h1>
      <div class="role">${resumeData.role}</div>
      <div class="contact-info">
        <span>Email: ${resumeData.email || 'not provided'}</span>
        <span>•</span>
        <span>Phone: ${resumeData.phone || 'not provided'}</span>
      </div>
    </div>
    
    <div class="section-title">Professional Summary & Experience</div>
    <div class="experience-item">
      <div class="item-desc">${resumeData.experience || 'No experience details specified.'}</div>
    </div>

    <div class="section-title">Key Skills</div>
    <ul class="skills-list">
      ${(resumeData.skills || '').split(',').map(s => s.trim()).filter(Boolean).map(s => `<li class="skill-tag">${s}</li>`).join('\n') || '<li class="skill-tag">No skills listed</li>'}
    </ul>

    <div class="section-title">Education & Training</div>
    <div class="education-item">
      <div class="item-desc">${resumeData.education || 'Self-taught / Professional development'}</div>
    </div>
  </div>
</body>
</html>
`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resumeData.name.replace(/\s+/g, "_")}_Resume.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification("✨ Resume downloaded! Open the file to Print or Save as PDF.", "success");
    setShowResumeModal(false);
    setResumeData({
      name: user?.name || "",
      role: "",
      experience: "",
      skills: "",
      email: user?.email || "",
      phone: "",
      education: "",
      template: "modern"
    });
  };

  const handleInterviewStart = () => {
    if (!interviewTopic) {
      showNotification("Please select a topic", "error");
      return;
    }
    const topicQuestions = INTERVIEW_QUESTIONS[interviewTopic] || [
      "Describe your experience with this technology.",
      "What is the most challenging project you built?",
      "How do you keep up with updates?"
    ];
    setActiveInterview({
      topic: interviewTopic,
      questions: topicQuestions,
      currentQuestionIndex: 0,
      answers: Array(topicQuestions.length).fill(""),
      status: "started",
      feedback: null
    });
    setShowInterviewModal(false);
  };

  const handleAnswerChange = (val: string) => {
    if (!activeInterview) return;
    const updatedAnswers = [...activeInterview.answers];
    updatedAnswers[activeInterview.currentQuestionIndex] = val;
    setActiveInterview({ ...activeInterview, answers: updatedAnswers });
  };

  const handleNextQuestion = () => {
    if (!activeInterview) return;
    const currentAnswer = activeInterview.answers[activeInterview.currentQuestionIndex]?.trim();
    if (!currentAnswer) {
      showNotification("Please provide an answer first", "error");
      return;
    }
    if (activeInterview.currentQuestionIndex < activeInterview.questions.length - 1) {
      setActiveInterview({ ...activeInterview, currentQuestionIndex: activeInterview.currentQuestionIndex + 1 });
    } else {
      setActiveInterview({ ...activeInterview, status: "evaluating" });
      setTimeout(() => {
        const fb = INTERVIEW_FEEDBACK[activeInterview.topic] || {
          score: 80,
          strengths: ["Demonstrated foundational knowledge.", "Communicated clearly."],
          improvements: ["Elaborate more on specific use cases."]
        };
        setActiveInterview({
          ...activeInterview,
          status: "completed",
          feedback: fb
        });
        setUserPoints(prev => prev + 150);
        showNotification("🎉 Interview complete! +150 CompuPoints", "success");
      }, 2500);
    }
  };

  const handleSkillGapAnalyze = () => {
    if (!skillGapRole) {
      showNotification("Please enter your target role", "error");
      return;
    }
    showNotification(`📊 Analyzing skill gap for ${skillGapRole}... Check your dashboard for insights.`, "success");
    setShowSkillGapModal(false);
    setSkillGapRole("");
  };

  const applyToJob = (jobId: number) => {
    setJobList(prev => prev.map(job => job.id === jobId ? { ...job, applied: true } : job));
    showNotification(`Application submitted for ${jobList.find(j => j.id === jobId)?.title}!`, "success");
  };

  const handleBrowseCourses = () => {
    const newCourse = {
      ...COURSES[0],
      id: `course-${Date.now()}`,
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      duration: "6 weeks",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      progress: 0,
      lastAccessed: "just now",
      completed: false
    };
    setEnrolledCourses(prev => [newCourse, ...prev]);
    showNotification(`Enrolled in "${newCourse.title}"!`, "success");
  };

  const viewCertificate = (courseTitle: string) => setSelectedCertCourse(courseTitle);
  const downloadCert = (certId: string) => {
    const cert = certifications.find(c => c.id === certId);
    if (cert) setSelectedCertCourse(cert.title);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (videoInterval) clearInterval(videoInterval);
    };
  }, []);

  if (!user) return null;

  // Helper component for alert triangle (if not imported)
  const AlertTriangleIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );

  return (
    <>
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 fade-in duration-200">
          <div className={cn(
            "px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2",
            notification.type === "success" ? "bg-green-600 text-white" : notification.type === "error" ? "bg-red-600 text-white" : "bg-blue-600 text-white"
          )}>
            {notification.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : notification.type === "error" ? <AlertTriangleIcon className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
            {notification.message}
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCertCourse && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 border rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative">
            <button onClick={() => setSelectedCertCourse(null)} className="absolute top-4 right-4"><X className="w-5 h-5 text-slate-400" /></button>
            <div className="border-8 border-double border-primary/20 p-8 rounded-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 mx-auto flex items-center justify-center"><Award className="w-8 h-8 text-primary-600" /></div>
              <span className="text-xs uppercase tracking-widest text-slate-400">Certificate of Completion</span>
              <h3 className="text-xl font-bold">This is proudly presented to</h3>
              <p className="text-lg font-bold text-primary-600 italic">{user.name}</p>
              <p className="text-xs text-slate-500">for successfully completing</p>
              <h4 className="text-base font-bold uppercase">{selectedCertCourse}</h4>
              <div className="flex justify-between pt-6 border-t text-xs">
                <div><span className="block text-[10px] text-slate-400">Issue Date</span>June 2026</div>
                <div><span className="font-mono text-[9px] text-slate-400">VERIFIED</span></div>
                <div><span className="block text-[10px] text-slate-400">Authorized Signature</span>CompuPoint Academy</div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setSelectedCertCourse(null)} className="px-4 py-2 text-sm border rounded-lg">Close</button>
              <button onClick={() => { showNotification("Downloading PDF...", "success"); setSelectedCertCourse(null); }} className="px-4 py-2 text-sm bg-primary text-white rounded-lg flex items-center gap-1"><Download className="w-4 h-4" /> Download PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Builder Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full p-6 flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto">
            {/* LEFT INPUT COLUMN */}
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <h3 className="text-lg font-bold flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> AI Resume Builder</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                  <input type="text" value={resumeData.name} onChange={e => setResumeData({...resumeData, name: e.target.value})} placeholder="Full Name" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent text-sm text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400">Target Role</label>
                  <input type="text" value={resumeData.role} onChange={e => setResumeData({...resumeData, role: e.target.value})} placeholder="Target Role" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent text-sm text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                  <input type="email" value={resumeData.email} onChange={e => setResumeData({...resumeData, email: e.target.value})} placeholder="Email" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent text-sm text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400">Phone Number</label>
                  <input type="text" value={resumeData.phone} onChange={e => setResumeData({...resumeData, phone: e.target.value})} placeholder="Phone" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent text-sm text-slate-900 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400">Education Details</label>
                <input type="text" value={resumeData.education} onChange={e => setResumeData({...resumeData, education: e.target.value})} placeholder="Degree, School, Year" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400">Professional Summary & Experience</label>
                <textarea value={resumeData.experience} onChange={e => setResumeData({...resumeData, experience: e.target.value})} placeholder="Experience & achievements" rows={3} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400">Skills (comma separated)</label>
                <input type="text" value={resumeData.skills} onChange={e => setResumeData({...resumeData, skills: e.target.value})} placeholder="React, Node.js, Python, SQL" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent text-sm text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Select Design Template</label>
                <div className="grid grid-cols-3 gap-2">
                  {["modern", "minimalist", "executive"].map((t) => (
                    <button key={t} type="button" onClick={() => setResumeData({...resumeData, template: t})} className={cn("px-3 py-2 text-xs font-semibold capitalize rounded-lg border", resumeData.template === t ? "bg-primary text-white border-primary" : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350")}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={handleResumeSubmit} className="flex-1 btn-primary text-sm py-2">Generate & Download</button>
                <button onClick={() => setShowResumeModal(false)} className="px-4 py-2 text-sm border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350">Cancel</button>
              </div>
            </div>

            {/* RIGHT PREVIEW COLUMN */}
            <div className="w-full md:w-80 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border flex flex-col max-h-[75vh]">
              <div className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center justify-between">
                <span>Live Preview</span>
                <span className="text-primary font-semibold capitalize">{resumeData.template} Template</span>
              </div>
              <div className="flex-1 bg-white text-slate-900 p-4 rounded-lg shadow-sm border border-slate-100 overflow-y-auto text-[10px] space-y-3 font-sans">
                <div className="text-center pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-950 leading-tight m-0">{resumeData.name || "Your Name"}</h4>
                  <p className="text-[9px] font-semibold text-primary uppercase tracking-wider m-0.5">{resumeData.role || "Target Profession"}</p>
                  <p className="text-[8px] text-slate-400 m-0">{resumeData.email || "email@address.com"} | {resumeData.phone || "+91 99999 99999"}</p>
                </div>
                <div>
                  <h5 className="font-bold uppercase text-slate-950 border-b border-slate-100 pb-0.5 mb-1 text-[9px]">Summary & Experience</h5>
                  <p className="text-slate-600 leading-normal m-0 whitespace-pre-wrap">{resumeData.experience || "Your professional history and accomplishments..."}</p>
                </div>
                <div>
                  <h5 className="font-bold uppercase text-slate-950 border-b border-slate-100 pb-0.5 mb-1 text-[9px]">Skills</h5>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(resumeData.skills || "React, JavaScript, CSS").split(',').map(s => s.trim()).filter(Boolean).map((s, idx) => (
                      <span key={idx} className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-medium">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-bold uppercase text-slate-950 border-b border-slate-100 pb-0.5 mb-1 text-[9px]">Education</h5>
                  <p className="text-slate-600 m-0">{resumeData.education || "University details..."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mock Interview Topic Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2"><Mic className="w-5 h-5 text-purple-500" /> Mock Interview</h3>
              <button onClick={() => setShowInterviewModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <p className="text-xs text-slate-500">Choose a topic:</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(INTERVIEW_QUESTIONS).map(topic => (
                  <button key={topic} onClick={() => setInterviewTopic(topic)} className={cn("px-3 py-2 text-xs rounded-lg border transition", interviewTopic === topic ? "bg-primary text-white border-primary" : "border-slate-300 hover:bg-slate-100")}>{topic}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={handleInterviewStart} className="flex-1 btn-primary text-sm py-2">Start Interview</button>
                <button onClick={() => setShowInterviewModal(false)} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Interview Session Modal */}
      {activeInterview && activeInterview.status === "started" && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative flex flex-col max-h-[90vh]">
            <button onClick={() => setActiveInterview(null)} className="absolute top-4 right-4"><X className="w-5 h-5 text-slate-400" /></button>
            <div className="border-b pb-4 mb-4">
              <span className="text-xs font-bold uppercase text-purple-500">AI Mock Interview</span>
              <h3 className="text-lg font-bold">Topic: {activeInterview.topic}</h3>
            </div>
            <div className="flex justify-between text-xs mb-2">
              <span>Question {activeInterview.currentQuestionIndex + 1} of {activeInterview.questions.length}</span>
              <span className="font-semibold">{Math.round((activeInterview.currentQuestionIndex / activeInterview.questions.length) * 100)}% Complete</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full mb-4"><div className="h-full bg-primary-600 rounded-full" style={{ width: `${(activeInterview.currentQuestionIndex / activeInterview.questions.length) * 100}%` }}></div></div>
            <div className="bg-purple-50 p-4 rounded-xl mb-4">
              <p className="text-sm font-semibold">{activeInterview.questions[activeInterview.currentQuestionIndex]}</p>
            </div>
            <textarea value={activeInterview.answers[activeInterview.currentQuestionIndex]} onChange={e => handleAnswerChange(e.target.value)} placeholder="Type your answer here..." className="w-full p-3 border rounded-xl min-h-[120px] text-sm" />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setActiveInterview(null)} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
              <button onClick={handleNextQuestion} className="btn-primary text-sm py-2 px-5 flex items-center gap-1">{activeInterview.currentQuestionIndex < activeInterview.questions.length - 1 ? "Next Question" : "Submit"} <Send className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>
      )}

      {activeInterview && activeInterview.status === "evaluating" && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full border-4 border-purple-500 border-t-transparent animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-bold">Evaluating your answers...</h3>
            <p className="text-sm text-slate-500">AI is analyzing your responses.</p>
          </div>
        </div>
      )}

      {activeInterview && activeInterview.status === "completed" && activeInterview.feedback && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Interview Feedback</h3>
              <button onClick={() => setActiveInterview(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl mb-4">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray={`${activeInterview.feedback.score} 100`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center"><span className="text-base font-black">{activeInterview.feedback.score}%</span></div>
              </div>
              <div><h4 className="font-bold">Score: {activeInterview.feedback.score}%</h4><p className="text-xs">+150 CompuPoints earned!</p></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div><p className="text-xs font-bold text-green-600 mb-2">Strengths</p><ul className="space-y-1">{activeInterview.feedback.strengths.map((s, i) => <li key={i} className="text-xs bg-green-50 p-2 rounded-lg">{s}</li>)}</ul></div>
              <div><p className="text-xs font-bold text-orange-600 mb-2">Improvements</p><ul className="space-y-1">{activeInterview.feedback.improvements.map((imp, i) => <li key={i} className="text-xs bg-orange-50 p-2 rounded-lg">{imp}</li>)}</ul></div>
            </div>
            <button onClick={() => setActiveInterview(null)} className="w-full btn-primary py-2">Close</button>
          </div>
        </div>
      )}

      {/* Skill Gap Modal */}
      {showSkillGapModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2"><Brain className="w-5 h-5 text-cyan-500" /> Skill Gap Analysis</h3>
              <button onClick={() => setShowSkillGapModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <input type="text" value={skillGapRole} onChange={e => setSkillGapRole(e.target.value)} placeholder="Desired role (e.g., AI Engineer)" className="w-full px-3 py-2 border rounded-lg mb-4 text-sm" />
            <div className="bg-slate-50 p-3 rounded-lg text-xs mb-4">
              <p className="font-semibold mb-1">Based on your profile:</p>
              <ul className="list-disc list-inside"><li>Current courses: {enrolledCourses.length}</li><li>Completed certs: {certifications.length}</li><li>CompuPoints: {userPoints}</li></ul>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSkillGapAnalyze} className="flex-1 btn-primary text-sm py-2">Analyze</button>
              <button onClick={() => setShowSkillGapModal(false)} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Course Player Modal */}
      {activeCourse && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-3">
                <img src={activeCourse.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                <div><h3 className="text-base font-bold">{activeCourse.title}</h3><p className="text-xs text-slate-500">{activeCourse.instructor}</p></div>
              </div>
              <button onClick={closeCoursePlayer}><X className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="flex-1 p-4 bg-slate-900 flex flex-col">
                <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                  {isPlaying ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="text-white text-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2"><Video className="w-8 h-8 animate-pulse" /></div>
                        <p className="text-xs">Playing: {lectures[currentLectureIndex]?.title}</p>
                        <div className="w-48 h-1 bg-white/30 rounded-full mt-2"><div className="h-full bg-primary-500 rounded-full" style={{ width: `${videoProgress}%` }}></div></div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <button onClick={togglePlay} className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"><Play className="w-8 h-8 text-white ml-1" /></button>
                    </div>
                  )}
                  <img src={activeCourse.image} className="w-full h-full object-cover opacity-40" alt="" />
                </div>
                <div className="mt-4 text-center">
                  <button onClick={togglePlay} className="px-4 py-2 bg-primary text-white rounded-lg text-sm">{isPlaying ? "Pause" : "Play Current Lecture"}</button>
                </div>
              </div>
              <div className="w-80 border-l flex flex-col">
                <div className="p-3 border-b bg-slate-50"><h4 className="text-xs font-semibold">Course Content</h4><p className="text-[11px] text-slate-500">{lectures.length} lectures</p></div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  {lectures.map((lect, idx) => (
                    <div key={idx} onClick={() => { if (idx <= currentLectureIndex || lect.completed) { setCurrentLectureIndex(idx); setVideoProgress(0); setIsPlaying(false); if (videoInterval) clearInterval(videoInterval); } else showNotification("Complete previous lectures first", "error"); }} className={cn("flex items-center gap-2 p-2 rounded-lg cursor-pointer", currentLectureIndex === idx ? "bg-primary-50 border border-primary-200" : "hover:bg-slate-50", lect.completed && "opacity-70")}>
                      {lect.completed ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Play className="w-3.5 h-3.5 text-slate-400" />}
                      <div className="flex-1"><p className="text-xs truncate">{lect.title}</p><p className="text-[10px] text-slate-400">{lect.duration}</p></div>
                      {currentLectureIndex === idx && !lect.completed && <ChevronRight className="w-3.5 h-3.5 text-primary-500" />}
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t bg-slate-50"><div className="flex justify-between text-xs mb-1"><span>Overall Progress</span><span className="font-bold">{calculateProgress(lectures)}%</span></div><div className="h-1.5 bg-slate-200 rounded-full"><div className="h-full bg-primary-600 rounded-full" style={{ width: `${calculateProgress(lectures)}%` }}></div></div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Shell */}
      <DashboardShell
        sidebarItems={updatedSidebarItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        title="Student Dashboard"
        roleColor="text-primary dark:text-primary-400"
        roleBg="bg-primary-50 dark:bg-primary-900/20"
      >
        {activeTab === "overview" && (
          <OverviewTab
            user={{ ...user, points: userPoints }}
            enrolledCourses={enrolledCourses}
            upcomingTests={upcomingTests}
            weeklyData={weeklyData}
            userPoints={userPoints}
            streak={streak}
            hoursLearned={hoursLearned}
            onContinueCourse={continueCourse}
            onViewCertificate={viewCertificate}
          />
        )}
        {activeTab === "courses" && (
          <CoursesTab
            enrolledCourses={enrolledCourses}
            onContinueCourse={continueCourse}
            onViewCertificate={viewCertificate}
            onBrowseCourses={handleBrowseCourses}
          />
        )}
        {activeTab === "certifications" && (
          <CertsTab
            certifications={certifications}
            onDownloadCert={downloadCert}
          />
        )}
        {activeTab === "career" && (
          <CareerTab
            jobRecommendations={jobList}
            onApplyJob={applyToJob}
            onResumeBuilder={handleResumeBuilder}
            onMockInterviews={handleMockInterviews}
            onSkillGap={handleSkillGap}
          />
        )}
        {activeTab === "analytics" && (
          <AnalyticsTab
            weeklyData={weeklyData}
            enrolledCourses={enrolledCourses}
            userPoints={userPoints}
          />
        )}
      </DashboardShell>
    </>
  );
}

// --- Overview Tab ---
function OverviewTab({ user, enrolledCourses, upcomingTests, weeklyData, userPoints, streak, hoursLearned, onContinueCourse, onViewCertificate }: any) {
  const completedCourses = enrolledCourses.filter((c: any) => c.progress === 100).length;
  const inProgressCourses = enrolledCourses.filter((c: any) => c.progress > 0 && c.progress < 100).length;

  return (
    <div className="space-y-5">
      <WelcomeBanner name={user.name} message="You have 2 pending assignments and 1 certification due this week." icon={Zap} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={BookOpen} label="Enrolled Courses" value={enrolledCourses.length} change={`${inProgressCourses} in progress`} color="blue" />
        <StatCard icon={Award} label="Certifications" value={completedCourses} change="+1 earned" color="green" />
        <StatCard icon={Clock} label="Hours Learned" value={`${hoursLearned}h`} change="+8.2h this week" color="purple" />
        <StatCard icon={TrendingUp} label="Current Streak" value={`${streak} days`} change="Personal best!" color="orange" />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card-base p-4">
          <SectionHeader title="Continue Learning" />
          <div className="space-y-2.5">
            {enrolledCourses.slice(0, 3).map((course: any) => (
              <div key={course.id} onClick={() => course.progress === 100 ? onViewCertificate(course.title) : onContinueCourse(course.id)} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 cursor-pointer hover:bg-slate-100">
                <img src={course.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                <div className="flex-1">
                  <p className="text-xs font-semibold">{course.title}</p>
                  <p className="text-[11px] text-slate-400 mb-1">{course.lastAccessed}</p>
                  <div className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-slate-200 rounded-full"><div className={cn("h-full rounded-full", course.progress === 100 ? "bg-green-500" : "bg-primary-600")} style={{ width: `${course.progress}%` }} /></div><span className="text-[10px] font-bold">{course.progress}%</span></div>
                </div>
                {course.progress === 100 ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Play className="w-3.5 h-3.5 text-primary-600" />}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="card-base p-4"><div className="flex justify-between mb-3"><h3 className="text-xs font-semibold">Weekly Activity</h3><span className="text-xs text-slate-400">hrs/day</span></div><ResponsiveContainer width="100%" height={80}><AreaChart data={weeklyData}><defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366F1" stopOpacity={0} /></linearGradient></defs><XAxis dataKey="day" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} /><Tooltip /><Area type="monotone" dataKey="hours" stroke="#6366F1" strokeWidth={2} fill="url(#grad)" /></AreaChart></ResponsiveContainer></div>
          <div className="card-base p-4 text-center"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center mx-auto mb-2"><Zap className="w-5 h-5 text-white" /></div><p className="text-xl font-bold">{userPoints.toLocaleString()}</p><p className="text-xs text-slate-500">CompuPoints</p><div className="mt-2 h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" style={{ width: `${(userPoints % 1000) / 10}%` }} /></div><p className="text-[10px] text-slate-400 mt-1">{1000 - (userPoints % 1000)} pts to next level</p></div>
        </div>
      </div>
      <div className="card-base p-4"><SectionHeader title="Upcoming Assessments" /><div className="grid sm:grid-cols-3 gap-3">{upcomingTests.map((test: any) => (<div key={test.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50"><div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center"><Target className="w-3.5 h-3.5 text-primary-600" /></div><div><p className="text-xs font-semibold">{test.title}</p><p className="text-[11px] text-slate-400">{test.date}</p><span className="tag text-[10px] mt-1">{test.type}</span></div></div>))}</div></div>
    </div>
  );
}

// --- Courses Tab ---
function CoursesTab({ enrolledCourses, onContinueCourse, onViewCertificate, onBrowseCourses }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="My Courses" subtitle={`${enrolledCourses.length} courses enrolled`} action={<button onClick={onBrowseCourses} className="btn-primary text-xs px-3 py-2">Browse Courses</button>} />
      <div className="grid sm:grid-cols-2 gap-4">
        {enrolledCourses.map((course: any) => (
          <div key={course.id} onClick={() => course.progress === 100 ? onViewCertificate(course.title) : onContinueCourse(course.id)} className="card-base overflow-hidden cursor-pointer hover:-translate-y-0.5 transition">
            <div className="relative"><img src={course.image} className="w-full h-36 object-cover" /><div className="absolute top-2 right-2"><span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full", course.progress === 100 ? "bg-green-500" : "bg-primary-600")}>{course.progress === 100 ? "Completed" : "In Progress"}</span></div></div>
            <div className="p-4"><h3 className="text-sm font-semibold mb-1">{course.title}</h3><p className="text-xs text-slate-400 mb-3">{course.instructor} • {course.duration}</p><div className="flex items-center gap-2 mb-3"><div className="flex-1 h-2 bg-slate-100 rounded-full"><div className={cn("h-full rounded-full", course.progress === 100 ? "bg-green-500" : "bg-primary-600")} style={{ width: `${course.progress}%` }} /></div><span className="text-xs font-bold">{course.progress}%</span></div>{course.progress === 100 ? (<button className="btn-primary w-full text-xs py-2">View Certificate</button>) : (<button className="btn-primary w-full text-xs py-2">Continue Learning</button>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Certifications Tab ---
function CertsTab({ certifications, onDownloadCert }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader title="My Certifications" subtitle="Industry-recognized credentials" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert: any) => (
          <div key={cert.id} onClick={() => onDownloadCert(cert.id)} className="card-base p-5 cursor-pointer hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4"><Award className="w-5 h-5 text-primary-600" /></div>
            <h3 className="text-sm font-semibold mb-2">{cert.title}</h3>
            <p className="text-xs text-slate-400">Issued: {cert.issueDate}</p>
            <p className="text-[10px] font-mono text-slate-400 mb-3">{cert.credentialId}</p>
            <div className="flex items-center justify-between"><StatusBadge status={cert.status} /><button className="text-xs text-primary-600 font-medium hover:underline flex items-center gap-1"><Award className="w-3 h-3" /> View Certificate</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Career Tab ---
function CareerTab({ jobRecommendations, onApplyJob, onResumeBuilder, onMockInterviews, onSkillGap }: any) {
  return (
    <div className="space-y-5">
      <SectionHeader title="Career Hub" subtitle="Opportunities matched to your skills" />
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Briefcase, title: "Resume Builder", desc: "AI-powered resume tailored for IT roles.", action: "Build Resume", handler: onResumeBuilder, color: "blue" },
          { icon: MessageCircle, title: "Mock Interviews", desc: "Practice with AI and get instant feedback.", action: "Start Practice", handler: onMockInterviews, color: "purple" },
          { icon: TrendingUp, title: "Skill Gap Analysis", desc: "Know exactly what to learn next.", action: "Analyse Skills", handler: onSkillGap, color: "cyan" }
        ].map((tool) => (
          <div key={tool.title} className="card-base p-4 text-center">
            <div className={`flex justify-center mb-2 text-${tool.color}-500`}>{tool.icon === Briefcase ? <Briefcase className="w-8 h-8" /> : tool.icon === MessageCircle ? <MessageCircle className="w-8 h-8" /> : <TrendingUp className="w-8 h-8" />}</div>
            <h3 className="text-sm font-semibold">{tool.title}</h3>
            <p className="text-xs text-slate-400 mt-1">{tool.desc}</p>
            <button onClick={tool.handler} className="btn-primary text-xs px-3 py-2 mt-3">{tool.action}</button>
          </div>
        ))}
      </div>
      <div className="card-base p-4"><SectionHeader title="Job Recommendations" /><div className="space-y-3">{jobRecommendations.map((job: any) => (<div key={job.id} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-50"><div><p className="text-sm font-semibold">{job.title}</p><p className="text-xs text-slate-400">{job.company} • {job.location}</p><p className="text-xs font-medium text-green-600 mt-0.5">{job.salary}</p></div><div className="text-right"><div className="text-lg font-bold text-primary-600">{job.match}%</div><p className="text-[10px] text-slate-400">match</p>{job.applied ? <span className="inline-block text-[11px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">Applied</span> : <button onClick={() => onApplyJob(job.id)} className="btn-primary text-[11px] px-2.5 py-1 mt-1">Apply</button>}</div></div>))}</div></div>
    </div>
  );
}

// --- Analytics Tab ---
function AnalyticsTab({ weeklyData, enrolledCourses, userPoints }: any) {
  const totalProgress = enrolledCourses.reduce((sum: number, c: any) => sum + c.progress, 0) / enrolledCourses.length;
  const completedCourses = enrolledCourses.filter((c: any) => c.progress === 100).length;
  const technicalSkill = Math.min(100, Math.floor((totalProgress + completedCourses * 10) / 1.2));
  const certificationsScore = Math.min(100, Math.floor((completedCourses / enrolledCourses.length) * 100));
  const projectsScore = Math.min(100, Math.floor(userPoints / 50));
  const softSkills = 80;

  const skillsProgress = [
    { name: "Python Programming", level: "Proficient", value: 85, color: "bg-blue-500" },
    { name: "Frontend Development (React)", level: "Intermediate", value: 60, color: "bg-indigo-500" },
    { name: "Database Design (SQL)", level: "Beginner", value: 35, color: "bg-purple-500" },
    { name: "MS Office & Productivity", level: "Proficient", value: 90, color: "bg-green-500" },
    { name: "Digital Marketing & SEO", level: "Proficient", value: 100, color: "bg-emerald-500" },
  ];

  const milestones = [
    { title: "Quick Learner", desc: "Spend more than 4 hours in a single day learning", status: "unlocked", date: "June 08, 2026" },
    { title: "Code Warrior", desc: "Complete 3 course assignments with >90% score", status: "unlocked", date: "June 04, 2026" },
    { title: "Interview Ready", desc: "Complete an AI Mock Interview with a score >= 80%", status: "unlocked", date: "June 10, 2026" },
    { title: "CompuPoints Tycoon", desc: "Accumulate more than 2,000 total CompuPoints", status: "unlocked", date: "May 28, 2026" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader title="My Learning Analytics" subtitle="Real-time performance metrics and skill insights" />
      
      {/* Top Charts */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold mb-3 text-slate-900 dark:text-white">Weekly Learning Hours</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="hours" stroke="#6366F1" strokeWidth={2} fill="url(#aGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card-base p-4">
          <h3 className="text-xs font-semibold mb-3 text-slate-900 dark:text-white">Career Readiness Score</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" className="dark:stroke-slate-800" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="#6366F1" strokeWidth="3" strokeDasharray={`${Math.floor(totalProgress)} 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-slate-900 dark:text-white">{Math.floor(totalProgress)}%</span>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              {[
                { l: "Technical Skills", v: technicalSkill },
                { l: "Certifications", v: certificationsScore },
                { l: "Projects", v: projectsScore },
                { l: "Soft Skills", v: softSkills }
              ].map(({ l, v }) => (
                <div key={l}>
                  <div className="flex justify-between text-[11px] text-slate-700 dark:text-slate-350">
                    <span>{l}</span>
                    <span className="font-bold">{v}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Sections - Skills & Course Status */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Skill Matrix */}
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold mb-3 text-slate-900 dark:text-white">Skill Acquisition Matrix</h3>
          <div className="space-y-3">
            {skillsProgress.map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-800 dark:text-slate-200">{skill.name}</span>
                  <span className="text-[10px] text-slate-450 dark:text-slate-400 font-bold uppercase">{skill.level}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${skill.color}`} style={{ width: `${skill.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Enrolled Course Status */}
        <div className="card-base p-4">
          <h3 className="text-xs font-semibold mb-3 text-slate-900 dark:text-white">Course Learning Ledger</h3>
          <div className="space-y-3">
            {enrolledCourses.map((course: any) => (
              <div key={course.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{course.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{course.duration} total duration</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[9px] font-bold px-2 py-0.5 rounded-full capitalize",
                    course.progress === 100 ? "bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400" : "bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400"
                  )}>
                    {course.progress === 100 ? "Earned" : `${course.progress}%`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones / Achievements */}
      <div className="card-base p-4">
        <h3 className="text-xs font-semibold mb-3 text-slate-900 dark:text-white">Earned Milestones & Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {milestones.map((m) => (
            <div key={m.title} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-center relative overflow-hidden group hover:border-indigo-200 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">{m.title}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal mb-2">{m.desc}</p>
              <div className="text-[8px] font-mono text-slate-400 font-bold">{m.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}