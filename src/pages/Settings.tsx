import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Settings as SettingsIcon, Bell, Shield, CreditCard,
  Moon, Globe, Trash2, Save, AlertCircle, CheckCircle2, Monitor
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/features/ThemeToggle";

const tabs = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const { user, isLoggedIn } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-sm">
          <AlertCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-xl font-heading font-bold mb-2 text-slate-900 dark:text-white">Sign In Required</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Please sign in to access settings.</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/dashboard" className="hover:text-primary-600 transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium">Settings</span>
        </nav>

        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-6">Account Settings</h1>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Tabs Sidebar */}
          <div className="sm:w-48 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    activeTab === id
                      ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="flex-1 min-w-0">
            {activeTab === "general" && <GeneralSettings isDark={isDark} toggleTheme={toggleTheme} />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "billing" && <BillingSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneralSettings({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  const [language, setLanguage] = useState("en");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Settings saved successfully!");
    setSaving(false);
  };

  return (
    <div className="space-y-5">
      <div className="card-base p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-5">Appearance</h2>
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-3">
            {isDark ? <Moon className="w-5 h-5 text-slate-500" /> : <Monitor className="w-5 h-5 text-slate-500" />}
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Theme</p>
              <p className="text-xs text-slate-500">{isDark ? "Dark mode is on" : "Light mode is on"}</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-slate-500" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Language</p>
              <p className="text-xs text-slate-500">Select your preferred language</p>
            </div>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input-base w-auto text-sm py-2"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
          </select>
        </div>
      </div>

      <div className="card-base p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-5">Account Preferences</h2>
        <div className="space-y-4">
          {[
            { label: "Public Profile", desc: "Allow others to view your learning profile" },
            { label: "Show Certifications", desc: "Display your certifications on your profile" },
            { label: "Learning Reminders", desc: "Receive daily reminders to maintain your streak" },
          ].map(({ label, desc }) => (
            <ToggleRow key={label} label={label} desc={desc} defaultChecked />
          ))}
        </div>
      </div>

      <button onClick={handleSave} disabled={saving} className="btn-primary px-6 py-3">
        {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save Changes</>}
      </button>
    </div>
  );
}

function NotificationSettings() {
  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Notification preferences saved!");
    setSaving(false);
  };

  return (
    <div className="space-y-5">
      <div className="card-base p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-5">Email Notifications</h2>
        <div className="space-y-4">
          {[
            { label: "Course Updates", desc: "New lectures, assignments, and announcements" },
            { label: "Certification Reminders", desc: "Exam schedules and certification expiry alerts" },
            { label: "Service Request Updates", desc: "Status changes for hardware and software requests" },
            { label: "Job Opportunities", desc: "Matching job openings based on your skills" },
            { label: "Newsletter", desc: "Weekly IT tips, tutorials, and industry news" },
          ].map(({ label, desc }, i) => (
            <ToggleRow key={label} label={label} desc={desc} defaultChecked={i < 3} />
          ))}
        </div>
      </div>
      <div className="card-base p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-5">Push Notifications</h2>
        <div className="space-y-4">
          {[
            { label: "Assignment Deadlines", desc: "Reminders 24h before deadline" },
            { label: "Live Session Reminders", desc: "15 minutes before scheduled sessions" },
            { label: "Achievement Unlocked", desc: "Badges and certification completions" },
          ].map(({ label, desc }) => (
            <ToggleRow key={label} label={label} desc={desc} defaultChecked />
          ))}
        </div>
      </div>
      <button onClick={handleSave} disabled={saving} className="btn-primary px-6 py-3">
        {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save Preferences</>}
      </button>
    </div>
  );
}

function SecuritySettings() {
  const [form, setForm] = useState({ current: "", newPwd: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) { toast.error("Current password is required."); return; }
    if (form.newPwd.length < 6) { toast.error("New password must be at least 6 characters."); return; }
    if (form.newPwd !== form.confirm) { toast.error("Passwords do not match."); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Password changed successfully!");
    setForm({ current: "", newPwd: "", confirm: "" });
    setSaving(false);
  };

  return (
    <div className="space-y-5">
      <div className="card-base p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-5">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Current Password", key: "current" as const },
            { label: "New Password", key: "newPwd" as const },
            { label: "Confirm New Password", key: "confirm" as const },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
              <input
                type={show ? "text" : "password"}
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="input-base"
                placeholder="••••••••"
              />
            </div>
          ))}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} className="w-4 h-4 rounded border-border" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Show passwords</span>
          </label>
          <button type="submit" disabled={saving} className="btn-primary px-6 py-2.5 text-sm">
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Update Password"}
          </button>
        </form>
      </div>

      <div className="card-base p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Two-Factor Authentication</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-700 dark:text-slate-300">Authenticator App</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Add an extra layer of security with 2FA</p>
          </div>
          <button className="btn-secondary text-sm px-4 py-2">Enable 2FA</button>
        </div>
      </div>

      <div className="card-base p-6 border-red-100 dark:border-red-900/30">
        <h2 className="font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
          <Trash2 className="w-4 h-4" /> Danger Zone
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Deleting your account is permanent and cannot be undone. All your data, progress, and certifications will be lost.
        </p>
        <button
          onClick={() => toast.error("Account deletion requires email verification. Check your inbox.")}
          className="px-4 py-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-sm font-medium transition-colors"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

function BillingSettings() {
  return (
    <div className="space-y-5">
      <div className="card-base p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900 dark:text-white">Current Plan</h2>
          <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full border border-primary-100 dark:border-primary-800">
            Free Trial
          </span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl mb-4">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">7-Day Free Trial</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">5 days remaining — upgrade to keep full access</p>
          </div>
        </div>
        <Link to="/pricing" className="btn-primary text-sm px-5 py-2.5">
          Upgrade Plan
        </Link>
      </div>

      <div className="card-base p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Payment Method</h2>
        <div className="flex items-center justify-between p-4 border border-border rounded-xl mb-4">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-slate-500" />
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No payment method added</p>
              <p className="text-xs text-slate-500">Add a card to continue after trial</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => toast.info("Payment integration coming soon!")}
          className="btn-secondary text-sm px-4 py-2"
        >
          Add Payment Method
        </button>
      </div>
    </div>
  );
}

function ToggleRow({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          checked ? "bg-primary-600" : "bg-slate-200 dark:bg-slate-700"
        )}
        role="switch"
        aria-checked={checked}
      >
        <span className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300",
          checked ? "translate-x-5" : "translate-x-0"
        )} />
      </button>
    </div>
  );
}
