import axios from "axios";
import { User, AuthRequest, AuthResponse, RegisterRequest } from "@/types/user";

// Use local backend URL for development
const API_URL = "http://localhost:8080/api";
const BACKEND_URL = "http://localhost:8080";

// Configure axios defaults
axios.defaults.baseURL = BACKEND_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

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

  public async login(usernameOrEmail: string, password: string): Promise<User> {
    try {
      const authRequest: AuthRequest = {
        usernameOrEmail,
        password,
      };

      console.log("Attempting to login with:", {
        url: `${API_URL}/auth/login`,
        request: authRequest,
      });

      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/login`,
        authRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, username, email: userEmail } = response.data;

      const user: User = {
        id: response.data.id || "0",
        username: response.data.username,
        email: response.data.email,
        roles: response.data.roles || ["USER"],
      };

      this.token = token;
      this.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      this.setAuthHeader(token);
      this.notifyListeners(user);
      return user;
    } catch (error) {
      console.error("Login error:", error);
      this.clearAuth();
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Invalid username/email or password");
        } else if (error.response?.status === 403) {
          throw new Error("Your account is locked or disabled");
        } else if (error.response?.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else if (!error.response) {
          throw new Error("Network error. Please check your connection.");
        } else {
          throw new Error(error.response.data.message || "Login failed");
        }
      }
      throw error;
    }
  }

  public async signup(userData: RegisterRequest): Promise<User> {
    try {
      const requestData = { ...userData };
      if (requestData.roles && !Array.isArray(requestData.roles)) {
        requestData.roles = [requestData.roles];
      }
      if (!requestData.roles || requestData.roles.length === 0) {
        requestData.roles = ["USER"];
      }

      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/register`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, username, email } = response.data;

      const user: User = {
        id: response.data.id || "0",
        username: response.data.username,
        email: response.data.email,
        roles: response.data.roles || ["USER"],
      };

      this.token = token;
      this.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      this.setAuthHeader(token);
      this.notifyListeners(user);

      return user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error(
            error.response.data.message || "Invalid registration data"
          );
        } else if (error.response?.status === 409) {
          throw new Error("Email or username already exists");
        } else if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          throw new Error("Authentication failed. Please try again.");
        } else if (!error.response) {
          throw new Error("Network error. Please check your connection.");
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
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
