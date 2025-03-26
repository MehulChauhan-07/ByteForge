import React from "react";
import { useUser } from "@/contexts/UserContext";

interface FeatureGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  featureName: string;
}

const FeatureGuard: React.FC<FeatureGuardProps> = ({
  children,
  fallback,
  featureName,
}) => {
  const { isAuthenticated, showLoginPrompt } = useUser();

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="border border-dashed border-muted-foreground rounded-md p-6 text-center">
        <h3 className="text-xl font-medium mb-2">Login Required</h3>
        <p className="text-muted-foreground mb-4">
          You need to be logged in to access {featureName}.
        </p>
        <button
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
          onClick={() => showLoginPrompt(featureName)}
        >
          Login to Access
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default FeatureGuard;
