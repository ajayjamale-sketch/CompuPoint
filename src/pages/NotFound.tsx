import { Link } from "react-router-dom";
import { Monitor, Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-100 dark:bg-cyan-900/20 rounded-full blur-2xl" />
      </div>

      <div className="relative text-center max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-blue">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-slate-900 dark:text-white">
              Compu<span className="text-primary-600">Point</span>
            </span>
          </Link>
        </div>

        {/* 404 */}
        <div className="text-[120px] sm:text-[160px] font-heading font-bold leading-none text-slate-100 dark:text-slate-800 select-none mb-0">
          404
        </div>

        <div className="-mt-8 mb-6">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white mb-3">
            Page Not Found
          </h1>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link to="/" className="btn-primary px-7 py-3">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary px-7 py-3 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            { label: "Features", href: "/features" },
            { label: "Pricing", href: "/pricing" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
            { label: "FAQ", href: "/faq" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
