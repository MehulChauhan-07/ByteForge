import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  async login(credentials: { usernameOrEmail: any; password: any }) {
    try {
      const response = await axios.post(API_URL + "login", {
        usernameOrEmail: credentials.usernameOrEmail,
        password: credentials.password,
      });

      if (response.data.token) {
        // Store user details and JWT token in localStorage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Set the authorization header for subsequent requests
        this.setAuthHeader(response.data.token);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.removeAuthHeader();
  }

  register(username: any, email: any, password: any, name: any) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      name,
    });
  }

  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    return !!user && !!user.token;
  }

  setAuthHeader(token: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  removeAuthHeader() {
    delete axios.defaults.headers.common["Authorization"];
  }

  // Initialize auth header if user is already logged in
  initAuthHeader() {
    const user = this.getCurrentUser();
    if (user && user.token) {
      this.setAuthHeader(user.token);
    }
  }
}

const authService = new AuthService();
// Initialize auth header on service creation
authService.initAuthHeader();

export default authService;
