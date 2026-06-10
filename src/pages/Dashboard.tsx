import { Link } from "react-router-dom";
import { AlertCircle, Monitor } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

// Import all role dashboards
import StudentDashboard from "@/pages/dashboards/StudentDashboard";
import ProfessionalDashboard from "@/pages/dashboards/ProfessionalDashboard";
import TrainerDashboard from "@/pages/dashboards/TrainerDashboard";
import TechnicianDashboard from "@/pages/dashboards/TechnicianDashboard";
import BusinessDashboard from "@/pages/dashboards/BusinessDashboard";
import InstituteDashboard from "@/pages/dashboards/InstituteDashboard";
import AdminDashboard from "@/pages/dashboards/AdminDashboard";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Monitor className="w-5 h-5 text-white" />
          </div>
          <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
            Please sign in to access your dashboard. Use the Quick Access buttons to try any role.
          </p>
          <Link to="/login" className="btn-primary">
            Sign In to Continue
          </Link>
        </div>
      </div>
    );
  }

  // Route to role-specific dashboard
  switch (user.role) {
    case "student":
      return <StudentDashboard />;
    case "professional":
      return <ProfessionalDashboard />;
    case "trainer":
      return <TrainerDashboard />;
    case "technician":
      return <TechnicianDashboard />;
    case "business":
      return <BusinessDashboard />;
    case "institute":
      return <InstituteDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <StudentDashboard />;
  }
}
