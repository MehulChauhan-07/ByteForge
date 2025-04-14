import axios from "axios";
import { User } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

class AuthService {
  private token: string | null = null;
  private user: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth() {
    // Initialize token and user from localStorage
    this.token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        this.user = JSON.parse(userStr);
      } catch (error) {
        console.error("Error parsing user data:", error);
        this.clearAuth();
      }
    }

    if (this.token && this.user) {
      this.setAuthHeader(this.token);
    } else {
      this.clearAuth();
    }
  }

  private setAuthHeader(token: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  private clearAuth() {
    this.token = null;
    this.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    this.notifyListeners(null);
  }

  private notifyListeners(user: User | null) {
    this.listeners.forEach((listener) => listener(user));
  }

  addListener(listener: (user: User | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  async login(email: string, password: string): Promise<User> {
    try {
      // Clear any existing auth data
      this.clearAuth();

      const response = await axios.post(`${API_URL}/auth/login`, {
        usernameOrEmail: email,
        password,
      });

      if (!response.data || !response.data.token) {
        throw new Error("Invalid response format: Missing token");
      }

      // Store token
      const token = response.data.token;
      if (!token) {
        throw new Error("Invalid token received");
      }

      this.token = token;
      localStorage.setItem("token", token);
      this.setAuthHeader(token);

      // Create and store user data
      const userData: User = {
        id: response.data.id || "0",
        name: response.data.name || response.data.username,
        email: response.data.email,
        username: response.data.username,
        roles: response.data.roles || [],
      };

      this.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      this.notifyListeners(userData);
      return userData;
    } catch (error: any) {
      this.clearAuth();
      throw error;
    }
  }

  async signup(name: string, email: string, password: string): Promise<User> {
    try {
      // Clear any existing auth data
      this.clearAuth();

      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      if (!response.data || !response.data.token) {
        throw new Error("Invalid response format: Missing token");
      }

      // Store token
      const token = response.data.token;
      if (!token) {
        throw new Error("Invalid token received");
      }

      this.token = token;
      localStorage.setItem("token", token);
      this.setAuthHeader(token);

      // Create and store user data
      const userData: User = {
        id: response.data.id || "0",
        name: response.data.name,
        email: response.data.email,
        username: response.data.username,
        roles: response.data.roles || [],
      };

      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error: any) {
      this.clearAuth();

      if (error.response) {
        const errorMessage = error.response.data?.message || "Signup failed";
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error("No response from server");
      } else {
        throw new Error("Signup request failed");
      }
    }
  }

  logout(): void {
    this.clearAuth();
  }

  getCurrentUser(): User | null {
    return this.user;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.user;
  }
}

export default new AuthService();
