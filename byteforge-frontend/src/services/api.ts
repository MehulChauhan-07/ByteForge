import axios from "axios";

// Use environment variable with fallback
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Enable credentials for CORS
  withCredentials: true,
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Enhanced response interceptor with better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error scenarios
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Unauthorized - token expired or invalid
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          console.error("Authentication failed. Please log in again.");
          break;
        case 403:
          // Forbidden - insufficient permissions
          console.error("You don't have permission to access this resource.");
          break;
        case 500:
          console.error("Server error occurred. Please try again later.");
          break;
      }
    } else if (error.request) {
      // Request made but no response (network issues or CORS)
      console.error(
        "No response received. Check network or CORS configuration."
      );
    } else {
      // Error in setting up the request
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
