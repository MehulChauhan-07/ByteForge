"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Github,
  Check,
  X,
} from "lucide-react";
import authService from "@/services/authService";
import axios from "axios";
import { RegisterRequest } from "@/types/user";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const SignupPage = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
    roles: ["USER"], // Default role for new users
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const navigate = useNavigate();

  // Real-time validation

  const password = formData.password;
  // Password strength check
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  const passwordStrength = [
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;

  const getPasswordStrengthColor = () => {
    if (password.length === 0) return "bg-muted";
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  useEffect(() => {
    const errors: typeof validationErrors = {};

    // Username validation
    if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    // if (formData.password.length < 8) {
    //   errors.password = "Password must be at least 8 characters long";
    // } else if (!/(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(formData.password)) {
    //   errors.password =
    //     "Password must contain at least one letter and one number";
    // }

    // Confirm password validation
    if (formData.password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errors);
  }, [formData, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      setError("Please fix the validation errors before submitting");
      return;
    }

    if (passwordStrength < 3) {
      setError("Password is too weak. Please use a stronger password.");
      return;
    }

    setIsLoading(true);

    try {
      await authService.signup(formData);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container max-w-md mx-auto py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Create an account</h1>
        <p className="text-muted-foreground">
          Enter your information to get started
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
            {/* // For username field */}
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="font-medium flex items-center justify-between"
              >
                Username
                {formData.username && (
                  <span
                    className={cn(
                      "text-xs transition-colors duration-200",
                      validationErrors.username
                        ? "text-destructive"
                        : "text-green-500"
                    )}
                  >
                    {validationErrors.username ? "Invalid" : "Valid"}
                  </span>
                )}
              </Label>
              <div className="relative">
                <User
                  className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200",
                    formData.username &&
                      (validationErrors.username
                        ? "text-destructive"
                        : "text-green-500"),
                    !formData.username && "text-muted-foreground"
                  )}
                />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  className={cn(
                    "pl-10 transition-all duration-200",
                    formData.username &&
                      !validationErrors.username &&
                      "border-green-500 focus-visible:ring-green-500",
                    formData.username &&
                      validationErrors.username &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                  placeholder="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <AnimatePresence>
                {validationErrors.username && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-destructive mt-1 overflow-hidden"
                  >
                    {validationErrors.username}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* email field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="font-medium flex items-center justify-between"
              >
                Email
                {formData.email && (
                  <span
                    className={cn(
                      "text-xs transition-colors duration-200",
                      validationErrors.email
                        ? "text-destructive"
                        : "text-green-500"
                    )}
                  >
                    {validationErrors.email ? "Invalid" : "Valid"}
                  </span>
                )}
              </Label>
              <div className="relative">
                <Mail
                  className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200",
                    formData.email &&
                      (validationErrors.email
                        ? "text-destructive"
                        : "text-green-500"),
                    !formData.email && "text-muted-foreground"
                  )}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className={cn(
                    "pl-10 transition-all duration-200",
                    formData.email &&
                      !validationErrors.email &&
                      "border-green-500 focus-visible:ring-green-500",
                    formData.email &&
                      validationErrors.email &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <AnimatePresence>
                {validationErrors.email && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-destructive mt-1 overflow-hidden"
                  >
                    {validationErrors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* password field enhansment */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="font-medium flex items-center justify-between"
              >
                Password
                {password.length > 0 && (
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors duration-200",
                      passwordStrength < 3
                        ? "text-destructive"
                        : passwordStrength < 5
                        ? "text-yellow-500"
                        : "text-green-500"
                    )}
                  >
                    {passwordStrength < 3
                      ? "Weak"
                      : passwordStrength < 5
                      ? "Good"
                      : "Strong"}
                  </span>
                )}
              </Label>
              <div className="relative">
                <Lock
                  className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200",
                    password.length > 0 &&
                      (passwordStrength < 3
                        ? "text-destructive"
                        : passwordStrength < 5
                        ? "text-yellow-500"
                        : "text-green-500"),
                    !password.length && "text-muted-foreground"
                  )}
                />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={cn(
                    "pl-10 transition-all duration-200",
                    password.length > 0 &&
                      (passwordStrength < 3
                        ? "border-destructive focus-visible:ring-destructive"
                        : passwordStrength < 5
                        ? "border-yellow-500 focus-visible:ring-yellow-500"
                        : "border-green-500 focus-visible:ring-green-500")
                  )}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Password strength meter with smooth animation */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                    <div className="flex items-center gap-1 text-xs">
                      {hasMinLength ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <X className="h-3 w-3 text-muted-foreground" />
                      )}
                      <span
                        className={
                          hasMinLength
                            ? "text-green-500"
                            : "text-muted-foreground"
                        }
                      >
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {hasUppercase && hasLowercase ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <X className="h-3 w-3 text-muted-foreground" />
                      )}
                      <span
                        className={
                          hasUppercase && hasLowercase
                            ? "text-green-500"
                            : "text-muted-foreground"
                        }
                      >
                        Upper & lowercase
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {hasNumber ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <X className="h-3 w-3 text-muted-foreground" />
                      )}
                      <span
                        className={
                          hasNumber ? "text-green-500" : "text-muted-foreground"
                        }
                      >
                        At least one number
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {hasSpecialChar ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <X className="h-3 w-3 text-muted-foreground" />
                      )}
                      <span
                        className={
                          hasSpecialChar
                            ? "text-green-500"
                            : "text-muted-foreground"
                        }
                      >
                        Special character
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Confirm password animation */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock
                  className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200",
                    confirmPassword &&
                      (confirmPassword === formData.password
                        ? "text-green-500"
                        : "text-destructive"),
                    !confirmPassword && "text-muted-foreground"
                  )}
                />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={cn(
                    "pl-10 transition-all duration-200",
                    confirmPassword &&
                      (confirmPassword === formData.password
                        ? "border-green-500 focus-visible:ring-green-500"
                        : "border-destructive focus-visible:ring-destructive")
                  )}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {confirmPassword && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                    <motion.div
                      // className="absolute right-10 top-1/2 -translate-y-1/2 "
                      className="flex items-center justify-center"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {confirmPassword === formData.password ? (
                        <Check
                          className="h-4 w-4 text-green-500"
                          style={{ margin: 0, padding: 0 }}
                        />
                      ) : (
                        <X
                          className="h-4 w-4 text-destructive"
                          style={{ margin: 0, padding: 0 }}
                        />
                      )}
                    </motion.div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {validationErrors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {validationErrors.confirmPassword}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <Button
              type="submit"
              className={cn(
                "w-full transition-all duration-300",
                isLoading
                  ? "bg-primary/70"
                  : Object.keys(validationErrors).length > 0
                  ? "bg-muted-foreground cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90"
              )}
              disabled={isLoading || Object.keys(validationErrors).length > 0}
            >
              {isLoading ? (
                <>
                  <span className="mr-2 animate-spin">⏳</span> Creating
                  account...
                </>
              ) : (
                <>Create account</>
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
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
