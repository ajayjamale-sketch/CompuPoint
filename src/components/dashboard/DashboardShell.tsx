// Shared dashboard layout component used by all role dashboards
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Monitor, Bell, Menu, X, LogOut, User, Settings,
  Sun, Moon, Camera, Mail, Phone, MapPin, Building2,
  Lock, Globe, Palette, Shield, Save, Edit3
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { getInitials, cn } from "@/lib/utils";
import { NOTIFICATIONS } from "@/constants";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
}

interface DashboardShellProps {
  sidebarItems: SidebarItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
  title: string;
  roleColor?: string;
  roleBg?: string;
}

export function DashboardShell({
  sidebarItems,
  activeTab,
  onTabChange,
  children,
  title,
  roleColor = "text-primary-600 dark:text-primary-400",
  roleBg = "bg-primary-50 dark:bg-primary-900/30",
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Handle ?tab=profile or ?tab=settings from URL
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "profile" || tabParam === "settings") {
      onTabChange(tabParam);
    }
  }, [searchParams]);

  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = () => setNotifOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Signed out successfully.");
    navigate("/");
  };

  const allSidebarItems: SidebarItem[] = [
    ...sidebarItems.filter(i => i.id !== "settings"),
    { id: "profile", label: "My Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const activeItem = allSidebarItems.find((i) => i.id === activeTab);

  if (!user) return null;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-[220px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
              <Monitor className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              Compu<span className="text-primary-600">Point</span>
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                {getInitials(user.name)}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
              <span className={cn("text-[10px] font-medium capitalize px-1.5 py-0.5 rounded-full", roleBg, roleColor)}>
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {allSidebarItems.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => { onTabChange(id); setSidebarOpen(false); }}
              className={cn(
                "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150",
                activeTab === id
                  ? cn(roleBg, roleColor)
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {badge !== undefined && (
                <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-primary-600 text-white rounded-full leading-none">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h1>
              <p className="text-xs text-slate-400 hidden sm:block">{activeItem?.label}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {/* Notifications */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-10 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</span>
                    {unreadCount > 0 && <span className="text-xs text-primary-600 font-medium">{unreadCount} unread</span>}
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-64 overflow-y-auto">
                    {NOTIFICATIONS.map((n) => (
                      <div key={n.id} className={cn("px-4 py-3", !n.read && "bg-primary-50/50 dark:bg-primary-900/10")}>
                        <div className="flex items-start gap-2">
                          <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                            n.type === "success" ? "bg-green-500" : n.type === "warning" ? "bg-yellow-500" : "bg-primary-500"
                          )} />
                          <div>
                            <p className="text-xs font-medium text-slate-900 dark:text-white">{n.title}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Avatar — click to open profile tab */}
            <button
              onClick={() => onTabChange("profile")}
              className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all"
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">
                  {getInitials(user.name)}
                </div>
              )}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5">
          {activeTab === "profile" ? (
            <ProfileTab user={user} roleColor={roleColor} roleBg={roleBg} />
          ) : activeTab === "settings" ? (
            <SettingsTab />
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}

// ─── Inline Profile Tab ─────────────────────────────────────────────────────
function ProfileTab({ user, roleColor, roleBg }: { user: NonNullable<ReturnType<typeof useAuth>["user"]>; roleColor: string; roleBg: string }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [location, setLocation] = useState(user.location || "");

  const handleSave = () => {
    setEditing(false);
    toast.success("Profile updated successfully.");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <SectionHeader title="My Profile" subtitle="Manage your personal information and professional details" />

      {/* Profile Card */}
      <div className="card-base p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-primary-100 dark:bg-primary-900/30">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-primary-600">
                  {getInitials(user.name)}
                </div>
              )}
            </div>
            <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center shadow-sm transition-colors">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">{user.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn("text-xs font-semibold capitalize px-2 py-0.5 rounded-full", roleBg, roleColor)}>
                    {user.role}
                  </span>
                  {user.specialization && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">· {user.specialization}</span>
                  )}
                </div>
                {user.organization && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Building2 className="w-3.5 h-3.5" />
                    {user.organization}
                  </div>
                )}
              </div>
              <button
                onClick={() => setEditing(!editing)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
                {editing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-primary-500" /><span className="truncate">{user.email}</span></div>
              <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-primary-500" /><span>{user.phone || "Not set"}</span></div>
              <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary-500" /><span>{user.location || "Not set"}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Courses Enrolled", value: user.coursesEnrolled },
          { label: "Certifications", value: user.certifications },
          { label: "Points Earned", value: user.points.toLocaleString() },
        ].map(({ label, value }) => (
          <div key={label} className="card-base p-4 text-center">
            <p className="text-xl font-bold text-slate-900 dark:text-white">{value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Edit Form */}
      {editing && (
        <div className="card-base p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Edit Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="input-base text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} className="input-base text-sm" placeholder="+91 00000 00000" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Location</label>
              <input value={location} onChange={e => setLocation(e.target.value)} className="input-base text-sm" placeholder="City, State" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bio</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="input-base text-sm resize-none" placeholder="Tell us about yourself..." />
          </div>
          <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      )}

      {/* Bio display */}
      {!editing && bio && (
        <div className="card-base p-5">
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">About</h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{bio}</p>
        </div>
      )}

      <div className="card-base p-5">
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Account Details</h3>
        <div className="space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Member since</span>
            <span className="font-medium text-slate-900 dark:text-white">{new Date(user.joinedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">User ID</span>
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{user.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Account type</span>
            <span className={cn("text-xs font-semibold capitalize px-2 py-0.5 rounded-full", roleBg, roleColor)}>{user.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Inline Settings Tab ─────────────────────────────────────────────────────
function SettingsTab() {
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    emailUpdates: true, courseAlerts: true, marketingEmails: false, smsAlerts: false,
  });
  const [security, setSecurity] = useState({ twoFactor: false, loginAlerts: true });

  const handleSave = () => toast.success("Settings saved successfully.");

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <SectionHeader title="Settings" subtitle="Manage your account preferences and security" />

      {/* Appearance */}
      <div className="card-base p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
            <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Appearance</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Customize the look of your dashboard</p>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Switch between light and dark theme</p>
          </div>
          <button
            onClick={toggleTheme}
            className={cn(
              "relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none",
              isDark ? "bg-primary-600" : "bg-slate-300 dark:bg-slate-600"
            )}
          >
            <span className={cn(
              "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200",
              isDark ? "translate-x-5" : "translate-x-0"
            )} />
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="card-base p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Control what alerts you receive</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { key: "emailUpdates", label: "Email Updates", desc: "Course progress and announcements" },
            { key: "courseAlerts", label: "Course Alerts", desc: "Deadlines and new content notifications" },
            { key: "marketingEmails", label: "Marketing Emails", desc: "Promotional offers and newsletters" },
            { key: "smsAlerts", label: "SMS Alerts", desc: "Critical account and security alerts" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                className={cn(
                  "relative w-11 h-6 rounded-full transition-colors duration-200",
                  notifications[key as keyof typeof notifications] ? "bg-primary-600" : "bg-slate-300 dark:bg-slate-600"
                )}
              >
                <span className={cn(
                  "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200",
                  notifications[key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0"
                )} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="card-base p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
            <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Security</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Protect your account</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { key: "twoFactor", label: "Two-Factor Authentication", desc: "Extra security layer for login" },
            { key: "loginAlerts", label: "Login Alerts", desc: "Get notified of new sign-ins" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
              </div>
              <button
                onClick={() => setSecurity(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                className={cn(
                  "relative w-11 h-6 rounded-full transition-colors duration-200",
                  security[key as keyof typeof security] ? "bg-primary-600" : "bg-slate-300 dark:bg-slate-600"
                )}
              >
                <span className={cn(
                  "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200",
                  security[key as keyof typeof security] ? "translate-x-5" : "translate-x-0"
                )} />
              </button>
            </div>
          ))}
        </div>
        <button className="flex items-center gap-2 mt-4 text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline">
          <Lock className="w-3.5 h-3.5" /> Change Password
        </button>
      </div>

      {/* Language / Region */}
      <div className="card-base p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
            <Globe className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Language & Region</h3>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Language</label>
            <select className="input-base text-sm">
              <option>English (India)</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Telugu</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Time Zone</label>
            <select className="input-base text-sm">
              <option>Asia/Kolkata (IST, UTC+5:30)</option>
              <option>UTC</option>
            </select>
          </div>
        </div>
      </div>

      <button onClick={handleSave} className="btn-primary text-sm px-6 py-3">
        <Save className="w-4 h-4" /> Save All Settings
      </button>
    </div>
  );
}

// ─── Reusable Components ──────────────────────────────────────────────────────
export function StatCard({
  icon: Icon, label, value, change, color = "blue", sub
}: {
  icon: LucideIcon; label: string; value: string | number; change?: string;
  color?: "blue" | "green" | "purple" | "orange" | "cyan" | "red" | "indigo"; sub?: string;
}) {
  const colorMap = {
    blue: { bg: "bg-primary-50 dark:bg-primary/10", text: "text-primary dark:text-primary-400" },
    green: { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-600 dark:text-emerald-400" },
    purple: { bg: "bg-purple-50 dark:bg-purple-950/30", text: "text-purple-600 dark:text-purple-400" },
    orange: { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-600 dark:text-orange-400" },
    cyan: { bg: "bg-accent-50 dark:bg-accent/10", text: "text-accent dark:text-accent-400" },
    red: { bg: "bg-red-50 dark:bg-red-950/30", text: "text-red-600 dark:text-red-400" },
    indigo: { bg: "bg-primary-50 dark:bg-primary/10", text: "text-primary dark:text-primary-400" },
  };
  const c = colorMap[color];
  return (
    <div className="card-base p-4 hover:-translate-y-0.5 transition-transform">
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", c.bg)}>
        <Icon className={cn("w-4 h-4", c.text)} />
      </div>
      <p className="text-xl font-heading font-bold text-slate-900 dark:text-white leading-none">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</p>
      {change && <p className={cn("text-xs font-medium mt-1.5", c.text)}>{change}</p>}
      {sub && <p className="text-[10px] text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <h2 className="text-base font-heading font-bold text-slate-900 dark:text-white">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function WelcomeBanner({
  name, message, icon: Icon, gradient = "from-primary-600 to-cyan-500"
}: {
  name: string; message: string; icon: LucideIcon; gradient?: string;
}) {
  return (
    <div className={cn("bg-gradient-to-r rounded-2xl p-5 text-white flex items-center justify-between", gradient)}>
      <div>
        <h2 className="font-heading font-bold text-lg">Good day, {name.split(" ")[0]}!</h2>
        <p className="text-white/80 text-sm mt-0.5">{message}</p>
      </div>
      <div className="w-12 h-12 rounded-xl bg-white/20 items-center justify-center flex-shrink-0 hidden sm:flex">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "active": "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
    "completed": "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
    "in-progress": "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
    "pending": "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
    "assigned": "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400",
    "cancelled": "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
    "expired": "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
    "open": "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
    "resolved": "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
    "overdue": "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
    "completing": "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400",
    "live": "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
    "private": "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
    "draft": "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
    "warning": "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400",
    "review": "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400",
    "scheduled": "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
    "upcoming": "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400",
  };
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize", map[status] || "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300")}>
      {status.replace("-", " ")}
    </span>
  );
}

export { Bell };
