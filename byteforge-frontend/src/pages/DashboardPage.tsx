import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserIcon, AlertCircle } from "lucide-react";
import authService from "@/services/authService";
// import { User as AuthUser } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
const DashboardPage = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      setDebugInfo(
        `User not found in local storage: ${JSON.stringify(parsedUser)}`
      );
    } else if (!user.username) {
      setDebugInfo(`User has no username: ${JSON.stringify(user)}`);
    } else {
      setDebugInfo(null);
    }
  }, []);
  if (!isAuthenticated || !user) {
    return null;
  }

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="container flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container flex flex-col items-center justify-center h-screen">
        <p>User information not available</p>
        {debugInfo && (
          <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded text-sm">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="h-4 w-4" />
              <p className="font-medium">Debug Info:</p>
            </div>
            <pre className="mt-2 whitespace-pre-wrap">{debugInfo}</pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          {/* Debug display for username */}
          <h1 className="text-3xl font-bold">
            Welcome back, {user.username || "[username missing]"}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your account today.
          </p>

          {/* Debug info - remove in production */}
          {debugInfo && (
            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded text-sm">
              <p className="font-medium">Debug Info:</p>
              <pre className="mt-2 whitespace-pre-wrap">{debugInfo}</pre>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => navigate("/profile")}
          >
            <UserIcon className="h-5 w-5" />
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Username</span>
                <span className="font-medium">{user.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium">
                  {user.roles ? user.roles.join(", ") : "USER"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              No recent activity to display.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/profile")}
              >
                View Profile
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add a debug card */}
      <Card className="mt-6 bg-muted/20">
        <CardHeader>
          <CardTitle>Debug Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
