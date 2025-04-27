// AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type AuthContextType = {
  auth: {
    access: string | null;
    refresh: string | null;
    user: {
      id: number | null;
      email: string | null;
      is_recruiter: boolean;
      is_staff: boolean;
      is_superuser: boolean;
    } | null;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{
      access: string | null;
      refresh: string | null;
      user: {
        id: number | null;
        email: string | null;
        is_recruiter: boolean;
        is_staff: boolean;
        is_superuser: boolean;
      } | null;
    }>
  >;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type PropTypes = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<PropTypes> = ({ children }) => {
  const [auth, setAuth] = useState<{
    access: string | null;
    refresh: string | null;
    user: {
      id: number | null;
      email: string | null;
      is_recruiter: boolean;
      is_staff: boolean;
      is_superuser: boolean;
    } | null;
  }>({
    access: localStorage.getItem("access_token"),
    refresh: localStorage.getItem("refresh_token"),
    user: {
      id: localStorage.getItem("user_id")
        ? parseInt(localStorage.getItem("user_id") || "0")
        : null,
      email: localStorage.getItem("user_email"),
      is_recruiter: localStorage.getItem("user_is_recruiter") === "true",
      is_staff: localStorage.getItem("user_is_staff") === "true",
      is_superuser: localStorage.getItem("user_is_superuser") === "true",
    },
  });

  // Store auth details in localStorage whenever auth changes
  useEffect(() => {
    if (auth.access && auth.refresh && auth.user) {
      // Optimize storage to avoid redundant writes
      if (localStorage.getItem("access_token") !== auth.access) {
        localStorage.setItem("access_token", auth.access);
      }
      if (localStorage.getItem("refresh_token") !== auth.refresh) {
        localStorage.setItem("refresh_token", auth.refresh);
      }
      if (
        auth.user.id !== null &&
        localStorage.getItem("user_id") !== auth.user.id.toString()
      ) {
        localStorage.setItem("user_id", auth.user.id.toString());
      }
      if (localStorage.getItem("user_email") !== auth.user.email) {
        localStorage.setItem("user_email", auth.user.email || "");
      }
      localStorage.setItem(
        "user_is_recruiter",
        auth.user.is_recruiter.toString(),
      );
      localStorage.setItem("user_is_staff", auth.user.is_staff.toString());
      localStorage.setItem(
        "user_is_superuser",
        auth.user.is_superuser.toString(),
      );
    }
  }, [auth]);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_is_recruiter");
    localStorage.removeItem("user_is_staff");
    localStorage.removeItem("user_is_superuser");
    setAuth({
      access: null,
      refresh: null,
      user: null,
    });
    toast.success("Successfully logged out! 👋");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
