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
            <div className="space-y-2">
              <Label htmlFor="username" className="font-medium">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  className="pl-10"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              {validationErrors.username && (
                <p className="text-sm text-destructive">
                  {validationErrors.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="pl-10"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {validationErrors.email && (
                <p className="text-sm text-destructive">
                  {validationErrors.email}
                </p>
              )}
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
              {/* {validationErrors.password && (
                <p className="text-sm text-destructive">
                  {validationErrors.password}
                </p>
              )} */}
              {/* Password strength meter */}
              {/* {password.length > 0 && (
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
            </div> */}
              {password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2"
                >
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden grid grid-cols-5 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={cn(
                          "h-full rounded-full transition-colors duration-300",
                          i < passwordStrength
                            ? i < 2
                              ? "bg-destructive"
                              : i < 4
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            : "bg-muted-foreground/20"
                        )}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
                    {/* Your existing validation checks with improved styling */}
                    <motion.div
                      className="flex items-center gap-1.5 text-xs"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {hasMinLength ? (
                        <Check className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-muted-foreground" />
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
                    </motion.div>

                    {/* Repeat for other validation checks with appropriate delay values */}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Confirm password animation */}
            {/* <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`pl-10 
                  ${
                    confirmPassword
                      ? confirmPassword === formData.password
                        ? "border-green-500 focus-visible:ring-green-500"
                        : "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  `}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {confirmPassword && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    {confirmPassword === formData.password ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
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
              {validationErrors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div> */}
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
                  <motion.div
                    className="absolute right-10 top-1/2 -translate-y-1/2"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {confirmPassword === formData.password ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                  </motion.div>
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
