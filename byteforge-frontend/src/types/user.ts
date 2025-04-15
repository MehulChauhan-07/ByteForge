export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthRequest {
  usernameOrEmail: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  roles?: string[];
}
