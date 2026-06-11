import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Monitor, Menu, X, Sun, Moon, ChevronDown,
  Bell, LogOut, User, Settings, LayoutDashboard,
  CheckCircle2, AlertTriangle, Info, Check, Trash2
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { getInitials, cn } from "@/lib/utils";
import { NOTIFICATIONS } from "@/constants";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const { toggleTheme, isDark } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isHeroPage = location.pathname === "/";
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const deleteNotif = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = () => {
      setUserMenuOpen(false);
      setNotifOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  // On hero page before scroll: transparent with white text
  // On other pages or after scroll: solid bg with themed text
  const isTransparent = isHeroPage && !scrolled;

  const navTextClass = isTransparent
    ? "text-white/80 hover:text-white"
    : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400";

  const navActiveClass = isTransparent
    ? "text-white font-semibold bg-white/10"
    : "text-primary-600 dark:text-primary-400 font-semibold bg-primary-50 dark:bg-primary-900/20";

  const iconBtnClass = isTransparent
    ? "text-white/70 hover:text-white hover:bg-white/10"
    : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full px-4 sm:px-6 lg:px-8",
          scrolled || !isHeroPage ? "pt-3" : "pt-5"
        )}
      >
        <nav
          className={cn(
            "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-350 rounded-2xl",
            scrolled || !isHeroPage
              ? "bg-white/95 dark:bg-slate-950/75 backdrop-blur-xl border border-slate-200/50 dark:border-white/5 shadow-glass h-14"
              : "bg-transparent border border-transparent h-16"
          )}
        >
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-indigo">
                <Monitor className="w-4 h-4 text-white" />
              </div>
              <span className={cn(
                "font-heading font-bold text-lg transition-colors duration-300",
                isTransparent ? "text-white" : "text-slate-900 dark:text-white"
              )}>
                Compu<span className={isTransparent ? "text-accent-400" : "text-primary"}>Point</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(item.href) ? navActiveClass : navTextClass
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-1.5">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={cn("w-9 h-9 p-0 rounded-lg inline-flex items-center justify-center transition-all duration-200", iconBtnClass)}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {isLoggedIn && user ? (
                <>
                  {/* Notifications */}
                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => { setNotifOpen(!notifOpen); setUserMenuOpen(false); }}
                      className={cn("w-9 h-9 p-0 rounded-lg inline-flex items-center justify-center relative transition-all duration-200", iconBtnClass)}
                      aria-label="Notifications"
                    >
                      <Bell className="w-4 h-4" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                    {notifOpen && (
                      <div className="absolute right-0 top-11 w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-50 animate-scale-in">
                        <div className="px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</span>
                            {unreadCount > 0 && (
                              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-400 rounded-full">
                                {unreadCount} new
                              </span>
                            )}
                          </div>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-xs font-semibold text-primary hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-350 transition-colors"
                            >
                              Mark all read
                            </button>
                          )}
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-96 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="p-8 text-center flex flex-col items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-3">
                                <Bell className="w-5 h-5" />
                              </div>
                              <p className="text-sm font-medium text-slate-950 dark:text-slate-200">All caught up!</p>
                              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">No new notifications at this time.</p>
                            </div>
                          ) : (
                            notifications.map((n) => {
                              const isSuccess = n.type === "success";
                              const isWarning = n.type === "warning";
                              const isInfo = n.type === "info";
                              return (
                                <div
                                  key={n.id}
                                  className={cn(
                                    "p-4 flex gap-3 group relative transition-colors duration-150 hover:bg-slate-50/50 dark:hover:bg-slate-850/30",
                                    !n.read && "bg-primary-50/20 dark:bg-primary-950/10"
                                  )}
                                >
                                  {/* Icon Wrapper */}
                                  <div className="flex-shrink-0">
                                    <div
                                      className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center",
                                        isSuccess && "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
                                        isWarning && "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
                                        isInfo && "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
                                        !isSuccess && !isWarning && !isInfo && "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                                      )}
                                    >
                                      {isSuccess && <CheckCircle2 className="w-4 h-4" />}
                                      {isWarning && <AlertTriangle className="w-4 h-4" />}
                                      {(isInfo || (!isSuccess && !isWarning)) && <Info className="w-4 h-4" />}
                                    </div>
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0 pr-8">
                                    <div className="flex items-center gap-1.5">
                                      <p className={cn("text-xs font-semibold truncate", n.read ? "text-slate-700 dark:text-slate-300" : "text-slate-950 dark:text-white")}>
                                        {n.title}
                                      </p>
                                      {!n.read && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed break-words">
                                      {n.message}
                                    </p>
                                    <span className="text-[10px] text-slate-400 dark:text-slate-550 block mt-1.5 font-medium">
                                      {new Date(n.createdAt).toLocaleDateString([], { month: "short", day: "numeric" })} at {new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                  </div>

                                  {/* Actions */}
                                  <div className="absolute right-3 top-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                    <button
                                      onClick={(e) => toggleRead(n.id, e)}
                                      className={cn(
                                        "p-1 rounded bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-750 shadow-sm transition-colors",
                                        n.read ? "text-slate-400 hover:text-primary dark:text-slate-500" : "text-primary hover:bg-primary-50 dark:text-primary-400"
                                      )}
                                      title={n.read ? "Mark as unread" : "Mark as read"}
                                    >
                                      <Check className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={(e) => deleteNotif(n.id, e)}
                                      className="p-1 rounded bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-750 shadow-sm text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors"
                                      title="Delete notification"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Menu */}
                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false); }}
                      className={cn(
                        "flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl transition-all duration-200",
                        isTransparent ? "hover:bg-white/10" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                      )}
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">
                          {getInitials(user.name)}
                        </div>
                      )}
                      <span className={cn(
                        "text-sm font-medium max-w-[100px] truncate transition-colors",
                        isTransparent ? "text-white/90" : "text-slate-700 dark:text-slate-200"
                      )}>
                        {user.name.split(" ")[0]}
                      </span>
                      <ChevronDown className={cn("w-3.5 h-3.5", isTransparent ? "text-white/60" : "text-slate-400")} />
                    </button>
                    {userMenuOpen && (
                      <div className="absolute right-0 top-11 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden z-50">
                        <div className="p-3 border-b border-slate-100 dark:border-slate-700">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                        </div>
                        <div className="p-2">
                          <Link to="/dashboard" className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            <LayoutDashboard className="w-4 h-4 text-slate-400" /> Dashboard
                          </Link>
                          <Link to="/dashboard?tab=profile" className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            <User className="w-4 h-4 text-slate-400" /> Profile
                          </Link>
                          <Link to="/dashboard?tab=settings" className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            <Settings className="w-4 h-4 text-slate-400" /> Settings
                          </Link>
                          <hr className="my-1 border-slate-100 dark:border-slate-700" />
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={cn(
                      "text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200",
                      isTransparent
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/20"
                    )}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className={cn(
                      "text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 inline-flex items-center gap-1.5",
                      isTransparent
                        ? "bg-white text-primary hover:bg-indigo-50/50 shadow-indigo"
                        : "bg-primary hover:bg-primary-600 text-white shadow-indigo hover:-translate-y-0.5"
                    )}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={toggleTheme}
                className={cn("w-9 h-9 p-0 rounded-lg inline-flex items-center justify-center transition-all duration-200", iconBtnClass)}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn("w-9 h-9 p-0 rounded-lg inline-flex items-center justify-center transition-all duration-200", iconBtnClass)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-slate-900 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
                  <Monitor className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-heading font-bold text-slate-900 dark:text-white">
                  Compu<span className="text-primary-600">Point</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="my-3 border-slate-200 dark:border-slate-800" />
              {isLoggedIn && user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 mb-2">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-bold">
                        {getInitials(user.name)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user.role}</p>
                    </div>
                  </div>
                  <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link to="/dashboard?tab=profile" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link to="/dashboard?tab=settings" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <div className="space-y-2 pt-2">
                  <Link to="/login" className="flex items-center justify-center w-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold py-2.5 rounded-xl text-sm transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" className="flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors shadow-indigo">
                    Get Started Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
