import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "@services/authService";
import { User } from "@/types/auth";
import { RegisterRequest } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      const isAuth = authService.isAuthenticated();

      // Ensure user has a role property
      if (currentUser && !currentUser.roles) {
        currentUser.roles = ["USER"]; // Default role if missing
      }

      setUser(currentUser);
      setIsAuthenticated(isAuth);
      setIsLoading(false);
    };

    // Initial check
    checkAuth();

    // Subscribe to auth changes
    const unsubscribe = authService.addListener((newUser) => {
      // Ensure user has a role property when coming from auth event
      if (newUser && !newUser.roles) {
        newUser.roles = ["USER"]; // Default role if missing
      }
      setUser(newUser);
      setIsAuthenticated(!!newUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (usernameOrEmail: string, password: string) => {
    try {
      setIsLoading(true);
      await authService.login(usernameOrEmail, password);
      // The listener will update the state
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: RegisterRequest) => {
    try {
      setIsLoading(true);
      // Ensure user has a role property
      if (!userData.roles) {
        userData.roles = ["USER"]; // Default role if missing
      }
      await authService.signup(userData);
      // The listener will update the state
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      authService.logout();
      // The listener will update the state
    } catch (error) {
      console.error("Logout error:", error);
      // Not throwing here as logout errors are less critical for UX
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
