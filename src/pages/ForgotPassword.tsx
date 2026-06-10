import { useState } from "react";
import { Link } from "react-router-dom";
import { Monitor, Mail, ArrowRight, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { mockForgotPassword } from "@/lib/auth";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) { setError("Email is required."); return; }
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }

    setLoading(true);
    try {
      await mockForgotPassword(email);
      setSent(true);
      toast.success("Password reset link sent to your email!");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center shadow-blue">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-slate-900 dark:text-white">
              Compu<span className="text-primary-600">Point</span>
            </span>
          </Link>
        </div>

        <div className="card-base p-8">
          {!sent ? (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-2">
                  Forgot Password?
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  No worries. Enter your email and we'll send you a password reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="forgot-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="forgot-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="input-base pl-10"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3.5 text-base"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Send Reset Link <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </form>

              <div className="flex items-center justify-center mt-6">
                <Link to="/login" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3">
                Email Sent!
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                We've sent a password reset link to
              </p>
              <p className="font-semibold text-slate-900 dark:text-white mb-6">{email}</p>
              <p className="text-xs text-slate-400 mb-8">
                Didn't receive the email? Check your spam folder or try again in a few minutes.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => { setSent(false); setEmail(""); }}
                  className="btn-secondary w-full py-3"
                >
                  Try Different Email
                </button>
                <Link to="/login" className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                  Back to Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
