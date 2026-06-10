import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        isDark ? "bg-primary-600" : "bg-slate-200",
        className
      )}
    >
      <div
        className={cn(
          "absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center transition-all duration-300",
          isDark ? "translate-x-7" : "translate-x-0"
        )}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-primary-600" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-yellow-500" />
        )}
      </div>
    </button>
  );
}
