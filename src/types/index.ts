export type UserRole = "student" | "professional" | "trainer" | "technician" | "business" | "institute" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  bio?: string;
  location?: string;
  joinedAt: string;
  coursesEnrolled: number;
  certifications: number;
  points: number;
  organization?: string;
  specialization?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  price: number;
  rating: number;
  students: number;
  image: string;
  tags: string[];
}

export interface Certification {
  id: string;
  title: string;
  issueDate: string;
  expiryDate?: string;
  status: "active" | "expired" | "pending";
  credentialId: string;
}

export interface ServiceRequest {
  id: string;
  type: string;
  description: string;
  status: "pending" | "assigned" | "in-progress" | "completed" | "cancelled";
  createdAt: string;
  technician?: string;
  priority: "low" | "medium" | "high" | "urgent";
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  image: string;
  views: number;
  likes: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  course?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface DashboardStats {
  coursesEnrolled: number;
  coursesCompleted: number;
  certificationsEarned: number;
  hoursLearned: number;
  currentStreak: number;
  totalPoints: number;
}

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
