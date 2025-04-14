"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import authService from "@/services/authService";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const TestLoginPage = () => {
  const [email, setEmail] = useState("admin@byteforge.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const navigate = useNavigate();

  const addDebugInfo = (info: string) => {
    setDebugInfo((prev) => [...prev, `${new Date().toISOString()}: ${info}`]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setDebugInfo([]);

    try {
      addDebugInfo("Starting login process...");

      // Test login endpoint
      addDebugInfo(`Testing login endpoint: ${API_URL}/auth/login`);
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        usernameOrEmail: email,
        password,
      });

      addDebugInfo("Login successful, response received");
      addDebugInfo(
        `Login response data: ${JSON.stringify(loginResponse.data)}`
      );

      // Store the token and user data
      const { token, user } = loginResponse.data;
      addDebugInfo("Storing auth data in localStorage");
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Test token validation with /auth/me
      addDebugInfo("Testing token validation with /auth/me endpoint...");
      try {
        const meResponse = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        addDebugInfo("Token validation successful");
        addDebugInfo(
          `User data from /auth/me: ${JSON.stringify(meResponse.data)}`
        );
      } catch (error) {
        const meError = error as Error;
        addDebugInfo(`Token validation failed: ${meError.message}`);
        if (axios.isAxiosError(meError)) {
          addDebugInfo(`Status: ${meError.response?.status}`);
          addDebugInfo(`Response: ${JSON.stringify(meError.response?.data)}`);
          throw new Error(
            `Token validation failed: ${
              meError.response?.data?.message || meError.message
            }`
          );
        }
      }

      // Test auth service
      addDebugInfo("Testing auth service...");
      try {
        const authServiceUser = authService.getCurrentUser();
        addDebugInfo(`Auth service user: ${JSON.stringify(authServiceUser)}`);
        const isAuthenticated = authService.isAuthenticated();
        addDebugInfo(`Auth service isAuthenticated: ${isAuthenticated}`);
      } catch (authError) {
        addDebugInfo(`Auth service error: ${authError}`);
      }

      // Navigate to dashboard
      addDebugInfo("Navigating to dashboard");
      navigate("/dashboard");
    } catch (err) {
      addDebugInfo("Error occurred during login");
      if (axios.isAxiosError(err)) {
        addDebugInfo(`Error status: ${err.response?.status}`);
        addDebugInfo(`Error response: ${JSON.stringify(err.response?.data)}`);
        setError(
          err.response?.data?.message ||
            `Login failed with status ${err.response?.status}`
        );
      } else {
        addDebugInfo(`Unknown error: ${err}`);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-10 px-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Test Login</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Debug authentication issues
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

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
          </div>
        </form>
      </div>

      {/* Debug Information */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Debug Information</h2>
        <div className="bg-muted p-4 rounded-md max-h-96 overflow-y-auto">
          {debugInfo.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No debug information available yet
            </p>
          ) : (
            <div className="space-y-1">
              {debugInfo.map((info, index) => (
                <p key={index} className="text-sm font-mono">
                  {info}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestLoginPage;
