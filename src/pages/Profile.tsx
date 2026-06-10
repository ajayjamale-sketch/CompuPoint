import { useState } from "react";
import { Camera, User, Mail, Phone, MapPin, Save, Award, BookOpen, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getInitials, formatDate } from "@/lib/utils";
import { CERTIFICATIONS } from "@/constants";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, updateUser, isLoggedIn } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    location: user?.location || "",
  });
  const [saving, setSaving] = useState(false);

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-sm">
          <AlertCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-xl font-heading font-bold mb-2 text-slate-900 dark:text-white">Sign In Required</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Please sign in to view your profile.</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    updateUser(form);
    toast.success("Profile updated successfully!");
    setEditing(false);
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/dashboard" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium">Profile</span>
        </nav>

        {/* Profile Header */}
        <div className="card-base p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-2xl object-cover" />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-primary-600 flex items-center justify-center text-white text-3xl font-bold">
                  {getInitials(user.name)}
                </div>
              )}
              {editing && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center shadow-blue">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-1">{user.name}</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 capitalize">{user.role} · Member since {formatDate(user.joinedAt)}</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="tag capitalize">{user.role}</span>
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Award className="w-3.5 h-3.5 text-yellow-500" />
                  {user.points} points
                </div>
              </div>
            </div>

            <button
              onClick={() => editing ? handleSave() : setEditing(true)}
              disabled={saving}
              className="btn-primary text-sm px-5 py-2.5"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : editing ? (
                <><Save className="w-4 h-4" /> Save Changes</>
              ) : (
                <><User className="w-4 h-4" /> Edit Profile</>
              )}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Form */}
          <div className="lg:col-span-2 card-base p-6">
            <h2 className="font-heading font-semibold text-slate-900 dark:text-white mb-5">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={editing ? form.name : user.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    disabled={!editing}
                    className="input-base pl-10 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="input-base pl-10 opacity-60 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">Email cannot be changed from this page.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={editing ? form.phone : (user.phone || "")}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    disabled={!editing}
                    placeholder="+91 98765 43210"
                    className="input-base pl-10 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={editing ? form.location : (user.location || "")}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    disabled={!editing}
                    placeholder="City, State"
                    className="input-base pl-10 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bio</label>
                <textarea
                  value={editing ? form.bio : (user.bio || "")}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  disabled={!editing}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  className="input-base disabled:opacity-60 disabled:cursor-not-allowed resize-none"
                />
              </div>
              {editing && (
                <div className="flex gap-3">
                  <button onClick={handleSave} disabled={saving} className="btn-primary text-sm px-5 py-2.5">
                    {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Save Changes"}
                  </button>
                  <button onClick={() => setEditing(false)} className="btn-secondary text-sm px-5 py-2.5">Cancel</button>
                </div>
              )}
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-4">
            <div className="card-base p-5">
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-4">Learning Stats</h3>
              <div className="space-y-3">
                {[
                  { icon: BookOpen, label: "Courses Enrolled", value: user.coursesEnrolled },
                  { icon: Award, label: "Certifications", value: user.certifications },
                  { icon: Award, label: "Total Points", value: user.points },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      <span className="text-xs text-slate-600 dark:text-slate-300">{label}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-base p-5">
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-4">Recent Certifications</h3>
              <div className="space-y-3">
                {CERTIFICATIONS.slice(0, 2).map((cert) => (
                  <div key={cert.id} className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <Award className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-900 dark:text-white leading-snug">{cert.title}</p>
                      <p className="text-[10px] text-slate-500">{formatDate(cert.issueDate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
