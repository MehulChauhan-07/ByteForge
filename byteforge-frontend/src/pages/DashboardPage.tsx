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
import { Badge } from "@/components/ui/badge";
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
  Terminal,
  Bookmark,
  FileText,
  Brain,
  Coffee,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  History,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  progress: number;
  imageUrl: string;
  tags: string[];
  modules: number;
  completedModules: number;
}

interface Activity {
  id: string;
  type:
    | "course_progress"
    | "exercise_completed"
    | "quiz_completed"
    | "note_created"
    | "code_challenge";
  title: string;
  timestamp: Date;
  details: string;
}

interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completed: boolean;
  dueDate?: Date;
}

interface Resource {
  id: string;
  title: string;
  type: "article" | "video" | "documentation";
  url: string;
  description: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [savedSnippets, setSavedSnippets] = useState<CodeSnippet[]>([]);
  const [overall, setOverall] = useState({
    coursesCompleted: 0,
    exercisesCompleted: 0,
    currentStreak: 0,
    overallProgress: 0,
    totalCodingHours: 0,
    javaLevel: "Beginner",
  });
  const [pageLoading, setPageLoading] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState({
    nextTopic: "Java Collections Framework",
    practiceArea: "Object-Oriented Design",
    recommendedChallenge: "Build a simple banking application",
  });

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
            tags: ["Syntax", "Variables", "Control Flow"],
            modules: 8,
            completedModules: 6,
          },
          {
            id: "2",
            title: "Object-Oriented Programming",
            description: "Master OOP concepts and implementation in Java",
            level: "Intermediate",
            progress: 30,
            imageUrl: "/images/courses/oop.jpg",
            tags: ["Classes", "Inheritance", "Polymorphism"],
            modules: 10,
            completedModules: 3,
          },
          {
            id: "3",
            title: "Java Collections Framework",
            description: "Explore Java collections and data structures",
            level: "Intermediate",
            progress: 0,
            imageUrl: "/images/courses/collections.jpg",
            tags: ["ArrayList", "HashMap", "Algorithms"],
            modules: 7,
            completedModules: 0,
          },
          {
            id: "4",
            title: "Exception Handling in Java",
            description: "Learn to handle exceptions and write robust code",
            level: "Intermediate",
            progress: 0,
            imageUrl: "/images/courses/exceptions.jpg",
            tags: ["try-catch", "Throw", "Custom Exceptions"],
            modules: 5,
            completedModules: 0,
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
          {
            id: "4",
            type: "code_challenge",
            title: "Fibonacci Sequence",
            timestamp: new Date(Date.now() - 259200000), // 3 days ago
            details: "Completed challenge with optimal solution",
          },
          {
            id: "5",
            type: "note_created",
            title: "OOP Principles",
            timestamp: new Date(Date.now() - 345600000), // 4 days ago
            details: "Created notes on Encapsulation and Inheritance",
          },
        ]);

        setChallenges([
          {
            id: "1",
            title: "Build a Calculator App",
            description: "Create a simple calculator with basic operations",
            difficulty: "beginner",
            completed: false,
            dueDate: new Date(Date.now() + 604800000), // 7 days from now
          },
          {
            id: "2",
            title: "File I/O Challenge",
            description: "Read and write data to files using Java I/O",
            difficulty: "intermediate",
            completed: false,
            dueDate: new Date(Date.now() + 1209600000), // 14 days from now
          },
          {
            id: "3",
            title: "Employee Management System",
            description: "Create a system to manage employee records",
            difficulty: "intermediate",
            completed: false,
          },
        ]);

        setResources([
          {
            id: "1",
            title: "Java Documentation",
            type: "documentation",
            url: "https://docs.oracle.com/en/java/",
            description: "Official Java documentation by Oracle",
          },
          {
            id: "2",
            title: "Understanding Java Classes and Objects",
            type: "article",
            url: "#",
            description: "A comprehensive guide to OOP in Java",
          },
          {
            id: "3",
            title: "Java Stream API Tutorial",
            type: "video",
            url: "#",
            description: "Learn how to use streams for data processing",
          },
        ]);

        setSavedSnippets([
          {
            id: "1",
            title: "Quick Sort Implementation",
            description:
              "An efficient sorting algorithm implementation in Java",
            language: "java",
            code: "public static void quickSort(int[] arr, int low, int high) {\n  if (low < high) {\n    int pivotIndex = partition(arr, low, high);\n    quickSort(arr, low, pivotIndex - 1);\n    quickSort(arr, pivotIndex + 1, high);\n  }\n}",
          },
          {
            id: "2",
            title: "Binary Search",
            description: "Implementation of binary search algorithm",
            language: "java",
            code: "public static int binarySearch(int[] arr, int target) {\n  int left = 0;\n  int right = arr.length - 1;\n  while (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (arr[mid] == target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}",
          },
        ]);

        setOverall({
          coursesCompleted: 1,
          exercisesCompleted: 12,
          currentStreak: 3,
          overallProgress: 35,
          totalCodingHours: 24,
          javaLevel: "Beginner",
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
      case "note_created":
        return <FileText className="h-4 w-4 text-yellow-500" />;
      case "code_challenge":
        return <Terminal className="h-4 w-4 text-purple-500" />;
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

  // Function to get challenge difficulty badge
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Beginner
          </Badge>
        );
      case "intermediate":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Intermediate
          </Badge>
        );
      case "advanced":
        return (
          <Badge
            variant="outline"
            className="bg-orange-50 text-orange-700 border-orange-200"
          >
            Advanced
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Function to get resource type icon
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "video":
        return <BookOpen className="h-4 w-4 text-red-500" />;
      case "documentation":
        return <BookmarkCheck className="h-4 w-4 text-green-500" />;
      default:
        return <Bookmark className="h-4 w-4" />;
    }
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
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">
              Welcome back, {user.username || "Learner"}!
            </h1>
            <Coffee className="h-6 w-6 text-orange-500" />
          </div>
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
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 mr-2 bg-primary/5 hover:bg-primary/10"
              onClick={() => navigate("/editor")}
            >
              <Terminal className="h-4 w-4" />
              <span>Open Editor</span>
            </Button>
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
              <p className="text-xs text-muted-foreground mt-1">
                Current level:{" "}
                <span className="text-primary font-medium">
                  {overall.javaLevel}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Learning Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="courses">
            <TabsList className="mb-4">
              <TabsTrigger value="courses" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>Courses</span>
              </TabsTrigger>
              <TabsTrigger
                value="challenges"
                className="flex items-center gap-1"
              >
                <Terminal className="h-4 w-4" />
                <span>Challenges</span>
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="flex items-center gap-1"
              >
                <Bookmark className="h-4 w-4" />
                <span>Resources</span>
              </TabsTrigger>
              <TabsTrigger value="snippets" className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                <span>Snippets</span>
              </TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-4">
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
                      <div className="flex flex-wrap gap-1 mb-3">
                        {course.tags.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="font-normal"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          Module {course.completedModules} of {course.modules}
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

              <h2 className="text-xl font-semibold mt-8 mb-4">
                Explore More Courses
              </h2>
              <div className="space-y-4">
                {courses.slice(2, 4).map((course) => (
                  <Card key={course.id}>
                    <div className="flex flex-col md:flex-row overflow-hidden">
                      <div className="md:w-1/4 bg-muted">
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/600x400/e2e8f0/64748b?text=Java+Course";
                          }}
                        />
                      </div>
                      <div className="p-4 md:p-6 md:w-3/4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">
                            {course.title}
                          </h3>
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                            {course.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {course.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {course.tags.map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="font-normal"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button asChild>
                          <Link to={`/courses/${course.id}`}>
                            Start Learning
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Challenges Tab */}
            <TabsContent value="challenges">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Coding Challenges</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/challenges">
                    View all challenges{" "}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <Card key={challenge.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          {challenge.title}
                        </CardTitle>
                        {getDifficultyBadge(challenge.difficulty)}
                      </div>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                      <div>
                        {challenge.dueDate && (
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Due {challenge.dueDate.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Button asChild>
                        <Link to={`/challenges/${challenge.id}`}>
                          {challenge.completed
                            ? "View Solution"
                            : "Start Challenge"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Learning Resources</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/resources">
                    Browse library <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {resources.map((resource) => (
                  <Card key={resource.id}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="p-3 rounded-full bg-accent">
                        {getResourceIcon(resource.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {resource.description}
                        </p>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                <div className="pt-2 flex justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/resources">View All Resources</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Snippets Tab */}
            <TabsContent value="snippets">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Saved Code Snippets</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/notes">
                    Manage notes <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {savedSnippets.map((snippet) => (
                  <Card key={snippet.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{snippet.title}</CardTitle>
                      <CardDescription>{snippet.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted rounded-md p-3 font-mono text-sm overflow-x-auto">
                        <pre className="text-xs">{snippet.code}</pre>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Badge variant="outline">{snippet.language}</Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Copy
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}

                <Card className="border-dashed border-2 bg-accent/5 hover:bg-accent/10 cursor-pointer transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="p-3 rounded-full bg-accent mb-2">
                      <Code className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium">Create New Snippet</h3>
                    <p className="text-sm text-muted-foreground text-center mt-1">
                      Save code examples for future reference
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Access Tools */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Quick Access Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                asChild
                variant="outline"
                className="h-auto py-6 flex flex-col items-center justify-center"
              >
                <Link to="/editor">
                  <Terminal className="h-6 w-6 mb-2" />
                  <span className="text-sm">Code Editor</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto py-6 flex flex-col items-center justify-center"
              >
                <Link to="/notes">
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-sm">Notes</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto py-6 flex flex-col items-center justify-center"
              >
                <Link to="/chat">
                  <MessageSquare className="h-6 w-6 mb-2" />
                  <span className="text-sm">AI Assistant</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto py-6 flex flex-col items-center justify-center"
              >
                <Link to="/progress">
                  <GraduationCap className="h-6 w-6 mb-2" />
                  <span className="text-sm">Learning Path</span>
                </Link>
              </Button>
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
                  <Badge className="mt-1 bg-yellow-50 text-yellow-700 border-yellow-200">
                    {overall.javaLevel} Java Developer
                  </Badge>
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
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/activity" className="text-xs flex items-center">
                  <History className="h-3 w-3 mr-1" />
                  View all
                </Link>
              </Button>
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
          </Card>

          {/* Learning Progress Card - NEW */}
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Streak */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Current Streak</span>
                  <span className="text-sm text-muted-foreground">
                    {overall.currentStreak} days
                  </span>
                </div>
                <div className="flex">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 space-y-1 flex flex-col items-center"
                    >
                      <div
                        className={`w-5 h-5 rounded-full ${
                          i < overall.currentStreak % 7
                            ? "bg-primary"
                            : "bg-muted"
                        } flex items-center justify-center`}
                      >
                        {i < overall.currentStreak % 7 && (
                          <CheckCircle2 className="text-primary-foreground h-3 w-3" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {i === 0
                          ? "M"
                          : i === 1
                          ? "T"
                          : i === 2
                          ? "W"
                          : i === 3
                          ? "T"
                          : i === 4
                          ? "F"
                          : i === 5
                          ? "S"
                          : "S"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Skill Levels */}
              <div>
                <h3 className="text-sm font-medium mb-3">Skill Progress</h3>
                <div className="space-y-3">
                  {[
                    { name: "Java Basics", progress: 85 },
                    { name: "OOP Concepts", progress: 60 },
                    { name: "Data Structures", progress: 45 },
                    { name: "Algorithms", progress: 30 },
                  ].map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {skill.progress}%
                        </span>
                      </div>
                      <Progress value={skill.progress} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
