// AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// Define User type to improve type safety
type User = {
  id: number | null;
  email: string | null;
  is_recruiter: boolean;
  is_staff: boolean;
  is_superuser: boolean;
};

// Define Auth state type
type AuthState = {
  access: string | null;
  refresh: string | null;
  user: User | null;
};

// Define AuthContext type with proper typing
type AuthContextType = {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  logout: () => void;
  isAuthenticated: boolean; // Added helper property
  isAdmin: boolean; // Added helper property
  isRecruiter: boolean; // Added helper property
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions to work with localStorage
const storage = {
  // Get item with type conversion helpers
  get: {
    string: (key: string): string | null => localStorage.getItem(key),
    boolean: (key: string): boolean => localStorage.getItem(key) === "true",
    number: (key: string): number | null => {
      const value = localStorage.getItem(key);
      return value ? parseInt(value, 10) : null;
    },
  },
  // Save item if different from current value to minimize writes
  save: (key: string, value: string | null): void => {
    if (value === null) {
      localStorage.removeItem(key);
    } else if (localStorage.getItem(key) !== value) {
      localStorage.setItem(key, value);
    }
  },
  // Remove item
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Initialize state from localStorage with proper type conversion
  const [auth, setAuth] = useState<AuthState>({
    access: storage.get.string("access_token"),
    refresh: storage.get.string("refresh_token"),
    user: storage.get.string("user_id")
      ? {
          id: storage.get.number("user_id"),
          email: storage.get.string("user_email"),
          is_recruiter: storage.get.boolean("user_is_recruiter"),
          is_staff: storage.get.boolean("user_is_staff"),
          is_superuser: storage.get.boolean("user_is_superuser"),
        }
      : null,
  });

  // Derived states
  const isAuthenticated = !!auth.access && !!auth.user;
  const isAdmin = isAuthenticated && !!auth.user?.is_superuser;
  const isRecruiter = isAuthenticated && !!auth.user?.is_recruiter;

  // Update localStorage whenever auth changes
  useEffect(() => {
    if (auth.access && auth.refresh && auth.user) {
      storage.save("access_token", auth.access);
      storage.save("refresh_token", auth.refresh);

      if (auth.user.id !== null) {
        storage.save("user_id", auth.user.id.toString());
      }

      storage.save("user_email", auth.user.email || "");
      storage.save("user_is_recruiter", auth.user.is_recruiter.toString());
      storage.save("user_is_staff", auth.user.is_staff.toString());
      storage.save("user_is_superuser", auth.user.is_superuser.toString());
    }
  }, [auth]);

  // Logout function clears all auth data
  const logout = () => {
    // Clear all auth-related localStorage items
    const keysToRemove = [
      "access_token",
      "refresh_token",
      "user_id",
      "user_email",
      "user_is_recruiter",
      "user_is_staff",
      "user_is_superuser",
    ];

    keysToRemove.forEach((key) => storage.remove(key));

    // Reset auth state
    setAuth({
      access: null,
      refresh: null,
      user: null,
    });

    toast.success("Successfully logged out! 👋");
  };

  // Create context value with derived properties
  const contextValue = {
    auth,
    setAuth,
    logout,
    isAuthenticated,
    isAdmin,
    isRecruiter,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

// Custom hook for accessing auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
