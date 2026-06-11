import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Monitor, Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, AlertCircle, CheckCircle2, Smartphone, KeyRound, Github } from "lucide-react";
import { mockRegister } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const roles = [
  { value: "student", label: "Student" },
  { value: "professional", label: "IT Professional" },
  { value: "trainer", label: "Trainer" },
  { value: "business", label: "Business" },
];

const passwordStrength = (pwd: string) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "student",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Registration options state
  const [regMethod, setRegMethod] = useState<"email" | "otp">("email");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const strength = passwordStrength(form.password);
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];

  const update = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) { setError("Full name is required."); return; }
    if (!form.email || !form.email.includes("@")) { setError("Valid email is required."); return; }
    if (!form.password || form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (!form.agree) { setError("Please accept the Terms and Privacy Policy."); return; }

    setLoading(true);
    try {
      const user = await mockRegister(form.name, form.email, form.password);
      login(user);
      toast.success("Account created successfully! Welcome to CompuPoint.");
      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) { setError("Full name is required."); return; }
    if (!form.phone || form.phone.trim().length < 10) { setError("Valid 10-digit phone number is required."); return; }
    if (!form.agree) { setError("Please accept the Terms and Privacy Policy."); return; }

    setOtpLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setOtpLoading(false);
      toast.success("OTP sent to your mobile! Use code 123456.");
    }, 1000);
  };

  const handleVerifyOtpRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!otp || otp.trim() !== "123456") {
      setError("Invalid OTP. Please enter 123456.");
      return;
    }
    setLoading(true);
    try {
      const emailGenerated = `${form.phone}@compupoint.com`;
      const user = await mockRegister(form.name, emailGenerated, "otp_bypass_password");
      login(user);
      toast.success("Account created successfully with OTP!");
      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = async (provider: "google" | "github") => {
    setLoading(true);
    setError("");
    setTimeout(async () => {
      try {
        const user = await mockRegister("Social User", `social_${provider}@compupoint.com`, "social_bypass_password");
        login(user);
        toast.success(`Registered with ${provider === "google" ? "Google" : "GitHub"} successfully!`);
        navigate("/dashboard");
      } catch (err) {
        setError("Social registration failed.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Branding */}
      <div className="hidden xl:flex xl:w-5/12 bg-slate-50 dark:bg-slate-950 relative overflow-hidden flex-col justify-between p-12 border-r border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, rgba(37,99,235,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(6,182,212,0.05) 0%, transparent 50%)` }} />
        <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.04]" style={{ backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

        {/* Logo */}
        <div className="relative">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-slate-900 dark:text-white">
              Compu<span className="text-primary-600 dark:text-primary-400">Point</span>
            </span>
          </Link>
        </div>

        {/* Hero Text */}
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-600/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
            <span className="text-xs text-primary-700 dark:text-primary-300 font-medium">Start Your Tech Journey Today</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white leading-tight">
            Learn, Certify &
            <br />
            <span className="text-primary-600 dark:text-primary-400">Build Your Career</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
            Join 125,000+ learners who have built successful IT careers with CompuPoint's structured learning paths and industry certifications.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: "125K+", lbl: "Active Users" },
              { val: "280+", lbl: "Courses" },
              { val: "96%", lbl: "Satisfaction" },
              { val: "7", lbl: "User Roles" },
            ].map((s) => (
              <div key={s.lbl} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 shadow-sm dark:shadow-none">
                <div className="text-xl font-bold text-slate-900 dark:text-white">{s.val}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-slate-400 dark:text-slate-600">&copy; {new Date().getFullYear()} CompuPoint. All rights reserved.</p>
      </div>

      {/* Right Panel - Register Form */}
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
              Create Your Account
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              7-day free trial — no credit card required
            </p>
          </div>

          {/* Register Tabs */}
          <div className="flex border-b border-border mb-6">
            <button
              onClick={() => { setRegMethod("email"); setError(""); }}
              className={cn(
                "flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors",
                regMethod === "email" ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600"
              )}
            >
              Email Sign Up
            </button>
            <button
              onClick={() => { setRegMethod("otp"); setError(""); }}
              className={cn(
                "flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors",
                regMethod === "otp" ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600"
              )}
            >
              Mobile OTP Signup
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Conditional Form Render */}
          {regMethod === "email" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  I am a...
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => update("role", r.value)}
                      className={cn(
                        "px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200",
                        form.role === r.value
                          ? "bg-primary border-primary text-white shadow-indigo"
                          : "bg-background border-border text-slate-600 dark:text-slate-300 hover:border-primary/50"
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Arjun Verma"
                      className="input-base pl-10"
                      autoComplete="name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="9876543210"
                      className="input-base pl-10"
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="reg-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="your@email.com"
                    className="input-base pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="Min. 6 characters"
                    className="input-base pl-10 pr-10"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className={cn("h-1 flex-1 rounded-full transition-all duration-300", i <= strength ? strengthColors[strength] : "bg-slate-200 dark:bg-slate-700")} />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">{strengthLabels[strength]} password</p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    placeholder="Repeat your password"
                    className="input-base pl-10"
                    autoComplete="new-password"
                  />
                  {form.confirmPassword && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {form.password === form.confirmPassword ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => update("agree", e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50 mt-0.5"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary dark:text-primary-400 hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="text-primary dark:text-primary-400 hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-base shadow-indigo-lg"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                ) : (
                  <>Create Account <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={otpSent ? handleVerifyOtpRegister : handleSendOtp} className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  I am a...
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => update("role", r.value)}
                      className={cn(
                        "px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200",
                        form.role === r.value
                          ? "bg-primary border-primary text-white shadow-indigo"
                          : "bg-background border-border text-slate-600 dark:text-slate-300 hover:border-primary/50"
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="reg-name-otp" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="reg-name-otp"
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Arjun Verma"
                    className="input-base pl-10"
                    disabled={otpSent}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-phone-otp" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Mobile Number
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="reg-phone-otp"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="9876543210"
                    className="input-base pl-10"
                    disabled={otpSent}
                  />
                </div>
              </div>

              {otpSent && (
                <div className="animate-in slide-in-from-top-2 duration-200">
                  <label htmlFor="reg-otp-code" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    One-Time Password (OTP)
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="reg-otp-code"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP code"
                      className="input-base pl-10 font-mono tracking-widest text-center text-sm"
                    />
                  </div>
                </div>
              )}

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => update("agree", e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50 mt-0.5"
                  disabled={otpSent}
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary dark:text-primary-400 hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="text-primary dark:text-primary-400 hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading || otpLoading}
                className="btn-primary w-full py-3.5 text-base shadow-indigo-lg"
              >
                {loading || otpLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                ) : otpSent ? (
                  <>Verify & Create Account <ArrowRight className="w-5 h-5" /></>
                ) : (
                  <>Send OTP Code <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>
          )}

          {/* Social Sign Up */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-slate-400">or sign up with</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialRegister("google")}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.92-2.75 3.48-4.51 6.76-4.51z"/>
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.51h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.68 2.85c2.15-1.98 3.75-4.89 3.75-8.6z"/>
                  <path fill="#FBBC05" d="M5.24 10.55c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.39 2.96C.5 4.77 0 6.83 0 9s.5 4.23 1.39 6.04l3.85-2.99c-.24-.72-.38-1.5-.38-2.3z"/>
                  <path fill="#34A853" d="M12 18.96c-3.28 0-5.84-1.76-6.76-4.51L1.39 17.44c1.98 3.89 5.96 6.56 10.61 6.56 2.98 0 5.67-.98 7.67-2.67l-3.68-2.85c-1.12.75-2.53 1.22-3.99 1.22z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialRegister("github")}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Github className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                GitHub
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
