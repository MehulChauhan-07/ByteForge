import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import dashboardService from "@/services/dashboardService";
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
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [overall, setOverall] = useState({
    coursesCompleted: 0,
    exercisesCompleted: 0,
    currentStreak: 0,
    overallProgress: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // In a real application, you would fetch this data from your backend
        // const progressResponse = await dashboardService.getUserProgress();
        // const recommendationsResponse = await dashboardService.getRecommendedCourses();
        // const activityResponse = await dashboardService.getRecentActivity();

        // For now, use mock data
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
        setIsLoading(false);
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

  // Format timestamp to relative time (e.g., "3 hours ago")
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

  if (isLoading) {
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

  return (
    <div className="container py-8">
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name || "Learner"}!
        </h1>
        <p className="text-muted-foreground">
          Pick up where you left off and continue your Java learning journey.
        </p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    // Fallback image if the course image fails to load
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

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y">
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
  );
};

export default DashboardPage;
