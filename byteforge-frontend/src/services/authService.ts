import api from "./api";
import { User } from "@/context/AuthContext";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  },

  signup: async (credentials: SignupCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      "/auth/register",
      credentials
    );
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: (): User | null => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) return null;
      return JSON.parse(userString);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem("token") !== null;
  },
};

export default authService;
