import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Monitor, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle,
  GraduationCap, Briefcase, BookOpen, Wrench, Building2, Shield, ChevronRight
} from "lucide-react";
import { mockLogin, mockBypassLogin, ROLE_USERS } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

const BYPASS_ROLES: { role: UserRole; label: string; icon: typeof GraduationCap; color: string; desc: string }[] = [
  { role: "student", label: "Student", icon: GraduationCap, color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800", desc: "Arjun Verma" },
  { role: "professional", label: "IT Professional", icon: Briefcase, color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800", desc: "Sneha Kapoor" },
  { role: "trainer", label: "Trainer", icon: BookOpen, color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800", desc: "Rahul Sharma" },
  { role: "technician", label: "Technician", icon: Wrench, color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-800", desc: "Amit Jain" },
  { role: "business", label: "Business", icon: Building2, color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border-cyan-100 dark:border-cyan-800", desc: "Rajesh Gupta" },
  { role: "institute", label: "Institute", icon: Building2, color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800", desc: "Dr. Priya Krishnan" },
  { role: "admin", label: "Admin", icon: Shield, color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800", desc: "Vikram Nair" },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bypassLoading, setBypassLoading] = useState<UserRole | null>(null);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("Email is required."); return; }
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    if (!password) { setError("Password is required."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setLoading(true);
    try {
      const user = await mockLogin(email, password);
      login(user);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);
      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleBypass = async (role: UserRole) => {
    setBypassLoading(role);
    try {
      const user = await mockBypassLogin(role);
      login(user);
      toast.success(`Signed in as ${user.name} (${role})`);
      navigate("/dashboard");
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setBypassLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Branding */}
      <div className="hidden xl:flex xl:w-5/12 bg-slate-950 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, rgba(37,99,235,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(6,182,212,0.1) 0%, transparent 50%)` }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

        {/* Logo */}
        <div className="relative">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-white">
              Compu<span className="text-primary-400">Point</span>
            </span>
          </Link>
        </div>

        {/* Hero Text */}
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-600/20 border border-primary-600/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-primary-300 font-medium">7 Dashboards. One Platform.</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-white leading-tight">
            Your Role-Specific
            <br />
            <span className="text-primary-400">IT Command Center</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Whether you're a student, trainer, technician, or enterprise admin — CompuPoint gives you a personalized workspace built exactly for your workflow.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: "125K+", lbl: "Active Users" },
              { val: "280+", lbl: "Courses" },
              { val: "96%", lbl: "Satisfaction" },
              { val: "7", lbl: "User Roles" },
            ].map((s) => (
              <div key={s.lbl} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-xl font-bold text-white">{s.val}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-slate-600">&copy; {new Date().getFullYear()} CompuPoint. All rights reserved.</p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-start justify-center px-4 sm:px-8 py-10 overflow-y-auto">
        <div className="w-full max-w-lg">
          {/* Mobile Logo */}
          <div className="xl:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center shadow-blue">
                <Monitor className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Compu<span className="text-primary-600">Point</span>
              </span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-1.5">
              Welcome back
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* Quick Access Panel */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap">Quick Access — Try Any Role</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {BYPASS_ROLES.map(({ role, label, icon: Icon, color, desc }) => (
                <button
                  key={role}
                  onClick={() => handleBypass(role)}
                  disabled={bypassLoading !== null}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm disabled:opacity-60 disabled:cursor-not-allowed",
                    color
                  )}
                >
                  {bypassLoading === role ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  ) : (
                    <Icon className="w-4 h-4 flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="text-xs font-semibold leading-tight">{label}</div>
                    <div className="text-[10px] opacity-70 truncate">{desc}</div>
                  </div>
                  <ChevronRight className="w-3 h-3 ml-auto opacity-50 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-slate-400">or sign in with credentials</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-base pl-10"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-base pl-10 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-base mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Create one free
            </Link>
          </p>

          <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
            Demo credentials: any email + 6 char password
          </p>
        </div>
      </div>
    </div>
  );
}
