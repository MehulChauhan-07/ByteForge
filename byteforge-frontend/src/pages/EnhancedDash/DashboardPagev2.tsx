import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  BarChart3,
  BookMarked,
  Lightbulb,
  GitBranch,
  RefreshCw,
  Code,
  LucideCode,
  Search,
  Plus,
  LayoutGrid,
  Bell,
  Settings,
  User,
  ArrowRight,
  Rocket,
  GraduationCap,
  LucideCheck,
  Flame,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const DashboardPagev2 = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock data
  const inProgressCourses = [
    {
      id: 1,
      title: "Java Streams API",
      progress: 68,
      lessons: { completed: 7, total: 12 },
      lastAccessed: "2025-05-09T18:30:00Z",
      image: "/images/courses/java-streams.jpg",
      level: "Intermediate",
    },
    {
      id: 2,
      title: "Java Multithreading",
      progress: 35,
      lessons: { completed: 3, total: 8 },
      lastAccessed: "2025-05-08T14:20:00Z",
      image: "/images/courses/multithreading.jpg",
      level: "Advanced",
    },
    {
      id: 3,
      title: "Java Design Patterns",
      progress: 22,
      lessons: { completed: 2, total: 9 },
      lastAccessed: "2025-05-07T10:45:00Z",
      image: "/images/courses/design-patterns.jpg",
      level: "Advanced",
    },
  ];

  const recommendedCourses = [
    {
      id: 4,
      title: "Java Spring Framework",
      description: "Master the fundamentals of Spring Framework for Java",
      progress: 0,
      lessons: { total: 14 },
      image: "/images/courses/spring.jpg",
      level: "Intermediate",
      tags: ["Spring", "MVC", "REST"],
    },
    {
      id: 5,
      title: "Java Microservices",
      description:
        "Build scalable applications with microservices architecture",
      progress: 0,
      lessons: { total: 10 },
      image: "/images/courses/microservices.jpg",
      level: "Advanced",
      tags: ["Microservices", "Cloud", "Docker"],
    },
  ];

  const recentAchievements = [
    {
      id: 1,
      title: "Java Basics Master",
      date: "2025-05-05T14:30:00Z",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
    },
    {
      id: 2,
      title: "7-Day Streak",
      date: "2025-05-07T19:45:00Z",
      icon: <Flame className="h-5 w-5 text-orange-500" />,
    },
    {
      id: 3,
      title: "First Project Completed",
      date: "2025-05-02T11:20:00Z",
      icon: <Rocket className="h-5 w-5 text-purple-500" />,
    },
  ];

  const upcomingLessons = [
    {
      id: 1,
      title: "Understanding Stream Collectors",
      course: "Java Streams API",
      scheduledFor: "2025-05-10T14:00:00Z",
      duration: "45 min",
    },
    {
      id: 2,
      title: "Thread Synchronization",
      course: "Java Multithreading",
      scheduledFor: "2025-05-11T10:30:00Z",
      duration: "60 min",
    },
  ];

  // Helper functions
  const formatDateRelative = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatScheduledDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    // If it's today
    if (date.toDateString() === now.toDateString()) {
      return `Today at ${formatTime(dateString)}`;
    }

    // If it's tomorrow
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow at ${formatTime(dateString)}`;
    }

    // Otherwise, show the full date
    return `${date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })} at ${formatTime(dateString)}`;
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/30 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            <div className="flex items-center gap-4">
              <div className="hidden md:block relative max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search topics..."
                  className="pl-9 rounded-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                />
              </div>

              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full p-0 h-10 w-10 overflow-hidden"
                  >
                    <Avatar>
                      <AvatarImage src="/images/avatar.jpg" alt="User avatar" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <motion.div
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome Section */}
          <motion.div variants={itemAnimation} className="mb-6">
            <Card className="rounded-2xl overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
                <div className="absolute inset-0 bg-[url('/images/dashboard-pattern.svg')] opacity-5" />

                <CardContent className="p-6 sm:p-8 relative">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                        Welcome back, Alex!
                      </h2>
                      <p className="text-muted-foreground">
                        {new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        · Continue your Java learning journey
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button className="rounded-full gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Continue Learning
                      </Button>
                      <Button variant="outline" className="rounded-full gap-2">
                        <GitBranch className="h-4 w-4" />
                        Browse Topics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            variants={itemAnimation}
            className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <Card className="rounded-xl border-slate-200 dark:border-slate-800 shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Topics Completed
                  </p>
                  <h3 className="text-2xl font-bold">23</h3>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-slate-200 dark:border-slate-800 shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-yellow-500/10 p-3 rounded-lg">
                  <BookMarked className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <h3 className="text-2xl font-bold">
                    {inProgressCourses.length}
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-slate-200 dark:border-slate-800 shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <Award className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-slate-200 dark:border-slate-800 shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-orange-500/10 p-3 rounded-lg">
                  <Flame className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                  <h3 className="text-2xl font-bold">7</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* In Progress Courses */}
              <motion.div variants={itemAnimation}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Continue Learning</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm rounded-lg"
                    >
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {inProgressCourses.map((course) => (
                    <Card
                      key={course.id}
                      className="rounded-xl overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-1/4 bg-slate-100 dark:bg-slate-800 aspect-video sm:aspect-square flex items-center justify-center relative">
                            {course.image ? (
                              <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-4xl text-slate-400">
                                <BookOpen className="h-12 w-12" />
                              </div>
                            )}
                            <Badge className="absolute top-2 right-2 bg-black/60 text-white backdrop-blur-sm border-0">
                              {course.level}
                            </Badge>
                          </div>

                          <div className="flex-1 p-5">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                              <h3 className="font-semibold text-lg">
                                {course.title}
                              </h3>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>
                                  Last accessed{" "}
                                  {formatDateRelative(course.lastAccessed)}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Your progress
                                </span>
                                <span className="font-medium">
                                  {course.progress}%
                                </span>
                              </div>
                              <Progress
                                value={course.progress}
                                className="h-2"
                              />

                              <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                  {course.lessons.completed} of{" "}
                                  {course.lessons.total} lessons completed
                                </div>
                                <Button
                                  size="sm"
                                  className="rounded-full gap-1"
                                >
                                  Continue
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Recommended Courses */}
              <motion.div variants={itemAnimation}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Recommended For You</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedCourses.map((course) => (
                    <Card
                      key={course.id}
                      className="rounded-xl overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                    >
                      <CardContent className="p-0">
                        <div className="relative h-32">
                          {course.image ? (
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                              <BookOpen className="h-12 w-12 text-slate-400" />
                            </div>
                          )}
                          <Badge className="absolute top-2 right-2 bg-black/60 text-white backdrop-blur-sm border-0">
                            {course.level}
                          </Badge>
                        </div>

                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {course.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <BookOpen className="h-3.5 w-3.5" />
                              <span>{course.lessons.total} lessons</span>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full"
                            >
                              Start Learning
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              {/* Learning Overview */}
              <motion.div variants={itemAnimation}>
                <Card className="rounded-xl overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
                  <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <CardTitle>Learning Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-1 mb-4">
                      <div className="text-xs text-muted-foreground">
                        Total Learning Time
                      </div>
                      <div className="text-2xl font-bold">32h 45m</div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-sm font-medium">Last 7 days</div>
                      <div className="grid grid-cols-7 gap-1.5">
                        {[60, 30, 45, 20, 90, 0, 40].map((minutes, i) => {
                          const height = Math.max((minutes / 90) * 60, 4);
                          const today = i === 4;

                          return (
                            <div
                              key={i}
                              className="flex flex-col items-center gap-1"
                            >
                              <div className="flex-1 w-full flex items-end">
                                <div
                                  className={`w-full ${
                                    today ? "bg-primary" : "bg-primary/30"
                                  } rounded-sm`}
                                  style={{ height: `${height}px` }}
                                />
                              </div>
                              <div
                                className={`text-xs ${
                                  today
                                    ? "font-medium"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {["M", "T", "W", "T", "F", "S", "S"][i]}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4 rounded-lg gap-1.5"
                    >
                      <BarChart3 className="h-4 w-4" />
                      View Detailed Stats
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Achievements */}
              <motion.div variants={itemAnimation}>
                <Card className="rounded-xl overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
                  <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Achievements</CardTitle>
                      <Badge variant="outline" className="rounded-full">
                        {recentAchievements.length} new
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {recentAchievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <div className="bg-slate-100 dark:bg-slate-800 rounded-full p-2">
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">
                              {achievement.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Earned {formatDateRelative(achievement.date)}
                            </div>
                          </div>
                          <div className="text-yellow-400">
                            <Star className="h-5 w-5 fill-yellow-400" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-3 rounded-lg"
                    >
                      View All Achievements
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Scheduled Lessons */}
              <motion.div variants={itemAnimation}>
                <Card className="rounded-xl overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
                  <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Upcoming Lessons</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 h-8 rounded-full"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    {upcomingLessons.length > 0 ? (
                      <div className="space-y-3">
                        {upcomingLessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                          >
                            <div className="bg-white dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-700">
                              <Calendar className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{lesson.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {lesson.course}
                              </div>
                              <div className="flex items-center gap-3 mt-2 text-xs">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>
                                    {formatScheduledDate(lesson.scheduledFor)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>{lesson.duration}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Calendar className="h-10 w-10 mx-auto text-muted-foreground opacity-50 mb-2" />
                        <p className="text-muted-foreground">
                          No scheduled lessons
                        </p>
                        <Button size="sm" className="mt-3 rounded-full">
                          Schedule Lesson
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const LogOut = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default DashboardPagev2;
