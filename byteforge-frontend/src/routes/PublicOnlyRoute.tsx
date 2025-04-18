import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { Children, ReactNode } from "react";

interface PublicOnlyRouteProps {
  children: ReactNode;
}

// This route is for login/signup pages - authenticated users should be redirected away
const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, redirect to the intended destination or dashboard
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  // User is not authenticated, render the public route
  return children;
};

export default PublicOnlyRoute;
