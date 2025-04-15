"use client";

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Github,
  Loader2,
  ChevronDown,
  ChevronUp,
  X,
  User,
} from "lucide-react";
import authService from "@/services/authService";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { AuthRequest } from "@/types/user";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// Enhanced Error Debugger Component
const ErrorDebugger: React.FC<{ error: unknown; onClose: () => void }> = ({
  error,
  onClose,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDevelopment = import.meta.env.MODE === "development";

  let errorDetails: {
    message: string;
    type: string;
    status: number | null;
    data: string | null;
    stack: string | undefined;
  } = {
    message: "Unknown error",
    type: "Unknown",
    status: null,
    data: null,
    stack: undefined,
  };

  // Enhanced error categorization with user-friendly messages
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;

    errorDetails = {
      message: error.message,
      type: "Network Error",
      status: statusCode || null,
      data: JSON.stringify(error.response?.data || {}, null, 2),
      stack: error.stack,
    };

    // Better categorization based on status codes
    if (error.response) {
      if (statusCode === 401) {
        errorDetails.type = "Authentication Error";
        errorDetails.message =
          "Invalid credentials. Please check your email and password.";
      } else if (statusCode === 403) {
        errorDetails.type = "Authorization Error";
        errorDetails.message =
          "You don't have permission to access this resource.";
      } else if (statusCode === 404) {
        errorDetails.type = "Not Found Error";
        errorDetails.message = "The requested resource was not found.";
      } else if (statusCode === 500) {
        errorDetails.type = "Server Error";
        errorDetails.message =
          "The server encountered an error. Please try again later.";
      } else {
        errorDetails.type = `HTTP Error (${statusCode})`;
      }
    } else if (error.request) {
      errorDetails.type = "No Response Error";
      errorDetails.message =
        "The server did not respond. Please check your internet connection.";
    }
  } else if (error instanceof Error) {
    errorDetails = {
      message: error.message,
      type: error.name,
      status: null,
      data: null,
      stack: error.stack,
    };
  } else if (typeof error === "string") {
    errorDetails.message = error;
  }

  // Function to get specific troubleshooting tips based on error
  const getTroubleshootingTips = () => {
    if (errorDetails.status === 401) {
      return [
        "Double-check your email address and password",
        "Try resetting your password if you've forgotten it",
        "Make sure caps lock is not enabled",
      ];
    } else if (errorDetails.status === 403) {
      return [
        "Verify that your account has the necessary permissions",
        "Your session might have expired - try logging in again",
      ];
    } else if (errorDetails.status === 404) {
      return [
        "Check if the API endpoint URL is correct",
        "Verify that the resource or service is available",
      ];
    } else if (!errorDetails.status && errorDetails.type.includes("Network")) {
      return [
        "Check your internet connection",
        "Verify that the API server is running",
        "Check if there are any CORS issues in your browser console",
      ];
    }

    // Default tips
    return [
      "Check if the API server is running",
      "Verify your network connection",
      "Confirm your credentials are correct",
      "Check browser console for additional errors",
    ];
  };

  // Determine the appropriate colors based on error type
  const getSeverityClassName = () => {
    const status = errorDetails.status;

    if (!status || status >= 500)
      return {
        bg: "bg-red-100 dark:bg-red-900/30",
        border: "border-red-300",
        text: "text-red-600",
      };

    if (status >= 400)
      return {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        border: "border-orange-300",
        text: "text-orange-600",
      };

    if (status >= 300)
      return {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        border: "border-yellow-300",
        text: "text-yellow-600",
      };

    return {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      border: "border-blue-300",
      text: "text-blue-600",
    };
  };

  const severityClass = getSeverityClassName();

  // Production-friendly error display (minimal)
  if (!isDevelopment) {
    return (
      <div
        className={`mt-4 mb-4 bg-gray-100 dark:bg-gray-800 border ${severityClass.border} rounded-md overflow-hidden`}
      >
        <div
          className={`${severityClass.bg} p-3 flex items-center justify-between`}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className={`h-5 w-5 ${severityClass.text}`} />
            <span className={`font-medium ${severityClass.text}`}>
              {errorDetails.type}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-3">
          <p className="text-sm">{errorDetails.message}</p>
          <ul className="text-xs list-disc list-inside space-y-1 mt-3">
            {getTroubleshootingTips()
              .slice(0, 2)
              .map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
          </ul>
        </div>
      </div>
    );
  }

  // Full developer error debugger
  return (
    <div
      className={`mt-4 mb-4 bg-gray-100 dark:bg-gray-800 border ${severityClass.border} rounded-md overflow-hidden`}
    >
      <div
        className={`${severityClass.bg} p-3 flex items-center justify-between`}
      >
        <div className="flex items-center gap-2">
          <AlertCircle className={`h-5 w-5 ${severityClass.text}`} />
          <span className={`font-medium ${severityClass.text}`}>
            Debug Information: {errorDetails.type}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div
        className={`p-3 ${
          !isExpanded && "border-b border-gray-200 dark:border-gray-700"
        }`}
      >
        <p className="text-sm font-medium">{errorDetails.message}</p>
      </div>

      {isExpanded && (
        <div className="p-3 space-y-3">
          {errorDetails.status && (
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                Status Code
              </h4>
              <p className="text-sm">{errorDetails.status}</p>
            </div>
          )}

          {errorDetails.data && (
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                Response Data
              </h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-900 p-2 rounded overflow-x-auto">
                {errorDetails.data}
              </pre>
            </div>
          )}

          {errorDetails.stack && (
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                Stack Trace
              </h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-900 p-2 rounded overflow-x-auto">
                {errorDetails.stack}
              </pre>
            </div>
          )}

          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              Troubleshooting Tips
            </h4>
            <ul className="text-xs list-disc list-inside space-y-1 mt-1">
              {getTroubleshootingTips().map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="pt-2 flex justify-between">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                // Copy error details to clipboard
                const errorText = `
                      Error Type: ${errorDetails.type}
                      Message: ${errorDetails.message}
                      Status: ${errorDetails.status || "N/A"}
                      Data: ${errorDetails.data || "N/A"}
                `;
                navigator.clipboard.writeText(errorText);
              }}
              className="text-xs"
            >
              Copy Error Details
            </Button>

            <Button size="sm" onClick={onClose} className="text-xs">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<AuthRequest>({
    usernameOrEmail: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [errorObject, setErrorObject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDebugger, setShowDebugger] = useState(false);
  const [routerErrors, setRouterErrors] = useState<Error[]>([]);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Add this useEffect to capture console errors
  useEffect(() => {
    // Save the original console.error
    const originalConsoleError = console.error;

    // Override console.error to capture React Router warnings
    console.error = (...args) => {
      // Call the original function first
      originalConsoleError(...args);

      // Check if this is a React Router warning
      const errorMessage = args.join(" ");
      if (errorMessage.includes("React Router") && !errorObject) {
        // Create an Error object to display in the debugger
        const routerError = new Error(errorMessage);
        routerError.name = "React Router Warning";
        setErrorObject(routerError);
        setShowDebugger(true);
      }
    };

    // Cleanup function to restore original console.error
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  React.useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted"); // Add this line to verify the form submission
    setError("");
    setErrorObject(null);
    setShowDebugger(false);
    setIsLoading(true);

    try {
      console.log("Attempting to login with email:", formData.usernameOrEmail); // Add this line to verify the email being used
      // Call the authService login method
      await login(formData.usernameOrEmail, formData.password);
      console.log("Login successful"); // Add this line to verify successful login
      // After successful login, navigate to the intended page
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error("Login error:", err); // Add this line to log the error
      console.log("Error type:", typeof err); // Add this line to verify the error is caught
      // Store the full error object for debugging
      setErrorObject(err);
      setShowDebugger(true);

      console.log("Error object:", err); // Add this line to log the error object
      console.log("showDebugger: set to true");
      // Set a simplified user-friendly error message on the page
      if (axios.isAxiosError(err)) {
        const statusCode = err.response?.status;

        if (statusCode === 401) {
          setError("Invalid email or password. Please try again.");
        } else if (statusCode === 403) {
          setError(
            "Your account doesn't have permission to login at this time."
          );
        } else if (statusCode === 429) {
          setError("Too many login attempts. Please try again later.");
        } else if (!err.response) {
          setError(
            "Unable to connect to the server. Please check your internet connection."
          );
        } else {
          setError(
            err.response?.data?.message || "Login failed. Please try again."
          );
        }
      } else if (err instanceof Error) {
        console.log("this is a standard error");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container max-w-md mx-auto py-10 px-4 min-h-[calc(100vh-8rem)]">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/signup"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>

      <div className="w-full rounded-md border bg-card text-card-foreground shadow-md p-6">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="flex items-center gap-2 p-4 mb-4 text-destructive bg-destructive/10 rounded-md border border-destructive/20">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Enhanced error debugger - WITH FORCED DISPLAY FOR TESTING */}
          {showDebugger && errorObject && (
            <ErrorDebugger
              error={errorObject}
              onClose={() => setShowDebugger(false)}
            />
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usernameOrEmail" className="font-medium">
                Username or Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="text"
                  className="pl-10"
                  placeholder="username or email@example.com"
                  value={formData.usernameOrEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                // Handle GitHub login
                window.location.href = `${API_URL}/oauth2/authorization/github`;
              }}
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>
        </form>
        {/* Add this right after your login button */}
        {import.meta.env.MODE === "development" && (
          <Button
            type="button"
            variant="outline"
            className="w-full mt-2"
            onClick={() => {
              // Create an error with the React Router warnings from the console
              const mockError = new Error(
                "React Router Future Flag Warning: React Router will begin wrapping " +
                  "state updates in `React.startTransition` in v7..."
              );
              mockError.name = "React Router Warning";
              setErrorObject(mockError);
              setShowDebugger(true);
            }}
          >
            Show Console Errors
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
