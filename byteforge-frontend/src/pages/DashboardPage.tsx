import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Code,
  BookmarkCheck,
  Trophy,
  Clock,
  ChevronRight,
  User as UserIcon,
  Mail,
  Shield,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  progress: number;
  imageUrl: string;
}

interface Activity {
  id: string;
  type: "course_progress" | "exercise_completed" | "quiz_completed";
  title: string;
  timestamp: Date;
  details: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [overall, setOverall] = useState({
    coursesCompleted: 0,
    exercisesCompleted: 0,
    currentStreak: 0,
    overallProgress: 0,
  });
  const [pageLoading, setPageLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setPageLoading(true);
      try {
        // In a real application, you would fetch this data from your backend
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        setCourses([
          {
            id: "1",
            title: "Java Basics",
            description: "Learn the fundamental concepts of Java programming",
            level: "Beginner",
            progress: 75,
            imageUrl: "/images/courses/java-basics.jpg",
          },
          {
            id: "2",
            title: "Object-Oriented Programming",
            description: "Master OOP concepts and implementation in Java",
            level: "Intermediate",
            progress: 30,
            imageUrl: "/images/courses/oop.jpg",
          },
          {
            id: "3",
            title: "Collections Framework",
            description: "Explore Java collections and data structures",
            level: "Intermediate",
            progress: 0,
            imageUrl: "/images/courses/collections.jpg",
          },
        ]);

        setActivities([
          {
            id: "1",
            type: "course_progress",
            title: "Java Basics",
            timestamp: new Date(Date.now() - 3600000), // 1 hour ago
            details: "Completed module on Control Flow",
          },
          {
            id: "2",
            type: "exercise_completed",
            title: "Arrays Exercise",
            timestamp: new Date(Date.now() - 86400000), // 1 day ago
            details: "Scored 90% on Arrays Challenge",
          },
          {
            id: "3",
            type: "quiz_completed",
            title: "Java Syntax Quiz",
            timestamp: new Date(Date.now() - 172800000), // 2 days ago
            details: "Scored 85% on Java Syntax Quiz",
          },
        ]);

        setOverall({
          coursesCompleted: 1,
          exercisesCompleted: 12,
          currentStreak: 3,
          overallProgress: 35,
        });
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Helper function to get activity icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course_progress":
        return <BookOpen className="h-4 w-4 text-primary" />;
      case "exercise_completed":
        return <Code className="h-4 w-4 text-green-500" />;
      case "quiz_completed":
        return <BookmarkCheck className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Format timestamp to relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading || pageLoading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-t-transparent border-primary rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Return null or redirect if not authenticated (the useEffect will handle redirect)
  if (!isAuthenticated || !user) {
    return null;
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!user || !user.username) return "U";
    return user.username.substring(0, 2).toUpperCase();
  };

  return (
    <div className="container py-8">
      {/* Welcome section with user profile quick actions */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.username || "Learner"}!
          </h1>
          <p className="text-muted-foreground">
            Pick up where you left off and continue your Java learning journey.
          </p>
        </div>
        <div className="flex items-center gap-3 self-end">
          <div className="hidden md:block text-right">
            <p className="font-medium">{user.username}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex gap-2">
            <Avatar
              className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
              onClick={() => navigate("/profile")}
            >
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                alt={user.username}
              />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Courses Completed
                </p>
                <p className="text-3xl font-bold">{overall.coursesCompleted}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Exercises Completed
                </p>
                <p className="text-3xl font-bold">
                  {overall.exercisesCompleted}
                </p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <Code className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-3xl font-bold">
                  {overall.currentStreak} days
                </p>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded-full">
                <Trophy className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Overall Progress
                </p>
                <p className="text-sm font-medium">
                  {overall.overallProgress}%
                </p>
              </div>
              <Progress value={overall.overallProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two-column layout for main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Continue Learning Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Continue Learning</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/courses">
                  View all courses <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.slice(0, 2).map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/600x400/e2e8f0/64748b?text=Java+Course";
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <span className="text-xs font-medium px-2 py-1 bg-primary text-white rounded-full">
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Progress
                      </span>
                      <span className="text-sm font-medium">
                        {course.progress}%
                      </span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link to={`/courses/${course.id}`}>
                        {course.progress > 0 ? "Continue" : "Start"} Course
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar with account info and activity */}
        <div className="space-y-8">
          {/* Account Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                    alt={user.username}
                  />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{user.username}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <UserIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Username</p>
                    <p className="text-sm text-muted-foreground">
                      {user.username}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-full">
                    <Mail className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/10 rounded-full">
                    <Shield className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Role</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {user.roles
                        ? user.roles.join(", ").toLowerCase()
                        : "user"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/profile">View Complete Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y max-h-80 overflow-auto">
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <li
                      key={activity.id}
                      className="p-4 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-accent rounded-full">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.details}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatRelativeTime(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-6 text-center text-muted-foreground">
                    No recent activity to display
                  </li>
                )}
              </ul>
            </CardContent>
            <CardFooter className="border-t">
              <Button variant="ghost" size="sm" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
