import type { User, UserRole } from "@/types";

const STORAGE_KEY = "compupoint_user";
const TOKEN_KEY = "compupoint_token";

export const ROLE_USERS: Record<UserRole, User> = {
  student: {
    id: "usr_student_001",
    name: "Arjun Verma",
    email: "student@compupoint.in",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop&crop=face",
    phone: "+91 98765 43210",
    bio: "Passionate about technology and continuous learning. Currently pursuing Full-Stack Web Development certification.",
    location: "Bangalore, Karnataka",
    joinedAt: "2025-06-15",
    coursesEnrolled: 4,
    certifications: 3,
    points: 2840,
    specialization: "Web Development",
  },
  professional: {
    id: "usr_professional_002",
    name: "Sneha Kapoor",
    email: "professional@compupoint.in",
    role: "professional",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    phone: "+91 99887 65432",
    bio: "Senior Software Engineer with 6 years of experience. Upgrading skills in Cloud & DevOps.",
    location: "Pune, Maharashtra",
    joinedAt: "2025-01-10",
    coursesEnrolled: 7,
    certifications: 5,
    points: 6120,
    organization: "Infosys Ltd.",
    specialization: "Cloud & DevOps",
  },
  trainer: {
    id: "usr_trainer_003",
    name: "Rahul Sharma",
    email: "trainer@compupoint.in",
    role: "trainer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    phone: "+91 97766 55443",
    bio: "10+ years of IT training experience. Specializing in Python, Data Science, and Web Development.",
    location: "Hyderabad, Telangana",
    joinedAt: "2024-08-20",
    coursesEnrolled: 0,
    certifications: 8,
    points: 9450,
    organization: "CompuPoint Academy",
    specialization: "Python & Data Science",
  },
  technician: {
    id: "usr_technician_004",
    name: "Amit Jain",
    email: "technician@compupoint.in",
    role: "technician",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    phone: "+91 95544 33221",
    bio: "Certified hardware technician specializing in laptop repairs, networking, and server maintenance.",
    location: "Mumbai, Maharashtra",
    joinedAt: "2024-11-05",
    coursesEnrolled: 2,
    certifications: 4,
    points: 3670,
    organization: "TechFix Services",
    specialization: "Hardware & Networking",
  },
  business: {
    id: "usr_business_005",
    name: "Rajesh Gupta",
    email: "business@compupoint.in",
    role: "business",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    phone: "+91 91122 33445",
    bio: "IT Manager at GlobalBiz Solutions. Managing tech infrastructure and team upskilling.",
    location: "Delhi, NCR",
    joinedAt: "2024-09-15",
    coursesEnrolled: 0,
    certifications: 2,
    points: 1820,
    organization: "GlobalBiz Solutions",
    specialization: "IT Management",
  },
  institute: {
    id: "usr_institute_006",
    name: "Dr. Priya Krishnan",
    email: "institute@compupoint.in",
    role: "institute",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    phone: "+91 98001 22334",
    bio: "Director of CompuSkills Training Institute. Managing 500+ students across 12 active batches.",
    location: "Chennai, Tamil Nadu",
    joinedAt: "2024-07-01",
    coursesEnrolled: 0,
    certifications: 6,
    points: 11200,
    organization: "CompuSkills Institute",
    specialization: "IT Training Management",
  },
  admin: {
    id: "usr_admin_007",
    name: "Vikram Nair",
    email: "admin@compupoint.in",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop&crop=face",
    phone: "+91 90000 11111",
    bio: "Platform Administrator. Overseeing all operations, users, and revenue metrics for CompuPoint.",
    location: "Bangalore, Karnataka",
    joinedAt: "2023-01-01",
    coursesEnrolled: 0,
    certifications: 12,
    points: 50000,
    organization: "CompuPoint HQ",
    specialization: "Platform Administration",
  },
};

export const MOCK_USER = ROLE_USERS.student;

export function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, `mock_token_${user.id}_${Date.now()}`);
}

export function clearStoredUser(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem(TOKEN_KEY) && !!getStoredUser();
}

export function mockLogin(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password.length >= 6) {
        // Check if email matches a role preset
        const roleUser = Object.values(ROLE_USERS).find((u) => u.email === email);
        const user = roleUser ? roleUser : { ...ROLE_USERS.student, email };
        setStoredUser(user);
        resolve(user);
      } else {
        reject(new Error("Invalid credentials. Please check your email and password."));
      }
    }, 1000);
  });
}

export function mockBypassLogin(role: UserRole): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = ROLE_USERS[role];
      setStoredUser(user);
      resolve(user);
    }, 600);
  });
}

export function mockRegister(name: string, email: string, password: string, role: UserRole = "student"): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name && email && password.length >= 6) {
        const base = ROLE_USERS[role];
        const user: User = {
          ...base,
          id: `usr_${Date.now()}`,
          name,
          email,
          joinedAt: new Date().toISOString().split("T")[0],
          coursesEnrolled: 0,
          certifications: 0,
          points: 0,
        };
        setStoredUser(user);
        resolve(user);
      } else {
        reject(new Error("Registration failed. Please fill all fields correctly."));
      }
    }, 1500);
  });
}

export function mockForgotPassword(email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && email.includes("@")) {
        resolve();
      } else {
        reject(new Error("Invalid email address."));
      }
    }, 1000);
  });
}

export function mockLogout(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      clearStoredUser();
      resolve();
    }, 500);
  });
}
