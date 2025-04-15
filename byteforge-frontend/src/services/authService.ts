import axios from "axios";
import { User, AuthRequest, AuthResponse, RegisterRequest } from "@/types/user";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private user: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  private constructor() {
    this.initializeAuth();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private initializeAuth() {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        this.token = token;
        this.user = JSON.parse(userStr);
        this.setAuthHeader(token);
      } catch (error) {
        console.error("Error initializing auth:", error);
        this.clearAuth();
      }
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

  public addListener(listener: (user: User | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public async login(email: string, password: string): Promise<User> {
    try {
      const authRequest: AuthRequest = {
        usernameOrEmail: email,
        password,
      };

      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/login`,
        authRequest
      );
      const { token, username, email: userEmail } = response.data;

      const user: User = {
        id: "0", // This will be updated when we get the user profile
        username,
        email: userEmail,
        roles: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.token = token;
      this.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      this.setAuthHeader(token);
      this.notifyListeners(user);
      return user;
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }

  public async signup(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/register`,
        data
      );
      const { token, username, email } = response.data;

      const user: User = {
        id: "0", // This will be updated when we get the user profile
        username,
        email,
        roles: data.roles || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.token = token;
      this.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      this.setAuthHeader(token);
      this.notifyListeners(user);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error(
            error.response.data.message || "Invalid registration data"
          );
        } else if (error.response?.status === 409) {
          throw new Error("Email or username already exists");
        }
      }
      throw error;
    }
  }

  public logout() {
    this.clearAuth();
  }

  public getCurrentUser(): User | null {
    return this.user;
  }

  public isAuthenticated(): boolean {
    return !!this.token && !!this.user;
  }
}

export default AuthService.getInstance();
