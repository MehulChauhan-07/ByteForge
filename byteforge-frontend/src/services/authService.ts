import axios from "axios";
import { User } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

class AuthService {
  private token: string | null = null;

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth() {
    // Initialize token from localStorage
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.setAuthHeader(this.token);
    }
  }

  private setAuthHeader(token: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  private clearAuth() {
    this.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
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

      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error: any) {
      this.clearAuth();

      if (error.response) {
        const errorMessage = error.response.data?.message || "Login failed";
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error("No response from server");
      } else {
        throw new Error("Login request failed");
      }
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
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return null;

      const user = JSON.parse(userStr);
      if (!this.isValidUser(user)) {
        this.clearAuth();
        return null;
      }

      return user;
    } catch (error) {
      console.error("Error getting current user:", error);
      this.clearAuth();
      return null;
    }
  }

  private isValidUser(user: any): user is User {
    return (
      user &&
      typeof user === "object" &&
      typeof user.id === "string" &&
      typeof user.name === "string" &&
      typeof user.email === "string" &&
      typeof user.username === "string" &&
      Array.isArray(user.roles)
    );
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.getCurrentUser();
  }
}

export default new AuthService();
