import { createContext, useContext, useState } from "react";

interface AuthState {
  user: { name: string; email: string } | null;
  isLoggedIn: boolean;
  login: (name: string, email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthState | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
