import { useState, useEffect } from "react";
import { getStoredUser, setStoredUser, clearStoredUser, isAuthenticated } from "@/lib/auth";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored && isAuthenticated()) {
      setUser(stored);
    }
    setLoading(false);
  }, []);

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    setStoredUser(updated);
  };

  const logout = () => {
    clearStoredUser();
    setUser(null);
  };

  const login = (userData: User) => {
    setUser(userData);
  };

  return { user, loading, isLoggedIn: !!user, updateUser, logout, login };
}
