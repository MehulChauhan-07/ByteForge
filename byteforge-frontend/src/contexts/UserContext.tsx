import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

interface User {
  id: string;
  name: string;
  email: string;
  // Add any other user properties
}

interface UserContextType {
  user: User | null;
  token: string | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  logoutUser: () => Promise<void>;
  isAuthenticated: boolean;
  showLoginPrompt: (feature: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState<boolean>(false);
  const [featureRequested, setFeatureRequested] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load user from localStorage on initial render
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const logoutUser = async (): Promise<void> => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      navigate("/");
    }
  };

  const showLoginPrompt = (feature: string) => {
    setFeatureRequested(feature);
    setLoginPromptOpen(true);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        logoutUser,
        isAuthenticated,
        showLoginPrompt,
      }}
    >
      {children}

      {/* Login Prompt Dialog */}
      {loginPromptOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg max-w-md w-full shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="mb-6">
              You need to be logged in to access the {featureRequested} feature.
            </p>
            <div className="flex gap-4">
              <button
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
              <button
                className="bg-muted text-muted-foreground px-4 py-2 rounded-md"
                onClick={() => setLoginPromptOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
