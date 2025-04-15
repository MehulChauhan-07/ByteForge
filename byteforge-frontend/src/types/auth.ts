export interface User {
  id: string;
  email: string;
  username: string;
  roles: string[];
}
// types/user.ts
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  roles?: string[]; // Optional since we set default if not provided
}

// Useful role constants
export const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
};
