import api from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    // Add other user properties as needed
  };
}

// These functions now return the response for the context to handle storage
export const login = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>(
      "/api/auth/login",
      credentials
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  userData: RegisterRequest
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>(
      "/api/auth/register",
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      await api.post("/api/auth/logout");
    }
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("token") !== null;
};
