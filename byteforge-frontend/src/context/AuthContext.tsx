import React, { createContext, useState, useContext, useEffect } from "react";
import authService from "@/services/authService";

// Define user type based on your JWT response
interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  token: string;
  type: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: {
    usernameOrEmail: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const initAuth = () => {
      const storedUser = authService.getCurrentUser();
      if (storedUser) {
        setUser(storedUser);
        authService.setAuthHeader(storedUser.token);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: {
    usernameOrEmail: string;
    password: string;
  }) => {
    const userData = await authService.login(credentials);
    setUser(userData);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
