// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  avatar?: string;
  preferences?: {
    theme: "light" | "dark" | "system";
    language: string;
    notifications: boolean;
  };
  progress?: {
    completedTopics: string[];
    currentTopic?: string;
    quizScores: Record<string, number>;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (err) {
        setError("Failed to load user data");
        console.error("Error loading user:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (userData: User) => {
    try {
      setIsLoading(true);
      setError(null);

      // Here you would typically make an API call to your backend
      // For now, we'll just store in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // Redirect to dashboard or home
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed");
      console.error("Login error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Here you would typically make an API call to your backend
      localStorage.removeItem("user");
      setUser(null);

      // Redirect to home
      navigate("/");
    } catch (err) {
      setError("Logout failed");
      console.error("Logout error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!user) throw new Error("No user logged in");

      const updatedUser = { ...user, ...updates };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      setError("Failed to update user");
      console.error("Update user error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
