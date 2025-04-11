import api from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
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

  getCurrentUser: (): { id: number; email: string; name: string } | null => {
    const userString = localStorage.getItem("user");
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem("token") !== null;
  },
};

export default authService;
