import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
    pending: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400",
    "in-progress": "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
    completed: "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
    cancelled: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400",
    expired: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400",
    assigned: "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400",
  };
  return map[status] || "text-gray-600 bg-gray-50";
}

export function getPriorityColor(priority: string): string {
  const map: Record<string, string> = {
    low: "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
    medium: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400",
    high: "text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400",
    urgent: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400",
  };
  return map[priority] || "text-gray-600 bg-gray-50";
}

export function getLevelColor(level: string): string {
  const map: Record<string, string> = {
    beginner: "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
    intermediate: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
    advanced: "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400",
  };
  return map[level] || "text-gray-600 bg-gray-50";
}
