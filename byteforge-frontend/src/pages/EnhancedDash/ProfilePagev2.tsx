import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  User,
  Settings,
  Bell,
  BookOpen,
  Award,
  BadgeCheck,
  Clock,
  Calendar,
  Edit3,
  Save,
  Lock,
  Mail,
  Star,
  Bookmark,
  ChevronRight,
  GitBranch,
  Activity,
  BarChart3,
  CheckCircle2,
  Shield,
  LogOut,
  ArrowUpRight,
  FileText,
  Code,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const containerAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemAnimation: Variants = {
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

const ProfilePagev2 = () => {
  // Mock user data
  const [user, setUser] = useState({
    id: "user123",
    name: "Alex Johnson",
    username: "alexj",
    email: "alex@example.com",
    bio: "Java enthusiast and software developer. Learning new things every day.",
    avatar: "/images/avatar.jpg",
    joinedDate: "May 2023",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    github: "alexjdev",
    progress: {
      completed: 23,
      inProgress: 4,
      totalTopics: 45,
    },
    achievements: [
      {
        id: 1,
        name: "Java Basics Master",
        icon: "BookOpen",
        date: "2023-06-15",
      },
      { id: 2, name: "OOP Expert", icon: "Code", date: "2023-07-22" },
      { id: 3, name: "10-Day Streak", icon: "Flame", date: "2023-08-05" },
      {
        id: 4,
        name: "First Project Completed",
        icon: "Rocket",
        date: "2023-08-30",
      },
    ],
    recentActivity: [
      {
        id: 1,
        type: "completed",
        topic: "Java Collections Framework",
        date: "2025-05-08T14:30:00Z",
      },
      {
        id: 2,
        type: "started",
        topic: "Java Stream API",
        date: "2025-05-06T10:15:00Z",
      },
      {
        id: 3,
        type: "bookmark",
        topic: "Java Multithreading",
        date: "2025-05-04T09:45:00Z",
      },
      {
        id: 4,
        type: "completed",
        topic: "Java Lambda Expressions",
        date: "2025-05-01T16:20:00Z",
      },
      {
        id: 5,
        type: "comment",
        topic: "Java Generics",
        comment: "Great explanation on wildcard usage!",
        date: "2025-04-28T11:50:00Z",
      },
    ],
    preferences: {
      emailNotifications: true,
      darkMode: false,
      showProgress: true,
      publicProfile: true,
    },
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  // Completion percentage
  const completionPercentage = Math.round(
    (user.progress.completed / user.progress.totalTopics) * 100
  );

  const handleEditToggle = () => {
    if (editMode) {
      // Save changes
      setUser(editedUser);
    }
    setEditMode(!editMode);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreferenceChange = (preference: string, value: boolean) => {
    setEditedUser((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value,
      },
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getTimeAgo = (dateString: string) => {
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
      return formatDate(dateString);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "started":
        return <BookOpen className="h-4 w-4 text-primary" />;
      case "bookmark":
        return <Bookmark className="h-4 w-4 text-yellow-500" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/30 min-h-screen pb-12">
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Profile</h1>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full p-0 h-10 w-10 overflow-hidden"
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-3 p-3 border-b border-slate-200 dark:border-slate-800">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        @{user.username}
                      </div>
                    </div>
                  </div>
                  <DropdownMenuItem className="gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Privacy</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              variants={containerAnimation}
              initial="hidden"
              animate="visible"
            >
              {/* Profile Card */}
              <motion.div
                variants={itemAnimation}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6"
              >
                <div className="bg-gradient-to-r from-primary/20 to-primary/5 h-24 relative">
                  <Button
                    variant={editMode ? "default" : "outline"}
                    size="sm"
                    className="absolute top-4 right-4 rounded-full gap-1.5"
                    onClick={handleEditToggle}
                  >
                    {editMode ? (
                      <>
                        <Save className="h-4 w-4" />
                        Save Profile
                      </>
                    ) : (
                      <>
                        <Edit3 className="h-4 w-4" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>

                <div className="px-6 pb-6 relative">
                  <div className="absolute -top-12 left-6">
                    <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-900">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-2xl">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="mt-16">
                    {editMode ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={editedUser.name}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            name="username"
                            value={editedUser.username}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={editedUser.bio}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={editedUser.location}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            name="website"
                            value={editedUser.website}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="github">GitHub</Label>
                          <Input
                            id="github"
                            name="github"
                            value={editedUser.github}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl font-bold">{user.name}</h2>
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary border-primary/20 rounded-full"
                          >
                            Advanced
                          </Badge>
                        </div>

                        <p className="text-muted-foreground text-sm">
                          @{user.username}
                        </p>

                        <p className="mt-4 text-slate-700 dark:text-slate-300">
                          {user.bio}
                        </p>

                        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Joined {user.joinedDate}</span>
                        </div>

                        {user.location && (
                          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{user.location}</span>
                          </div>
                        )}

                        {user.website && (
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a
                              href={`https://${user.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1"
                            >
                              {user.website}
                              <ArrowUpRight className="h-3 w-3" />
                            </a>
                          </div>
                        )}

                        {user.github && (
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <GitBranch className="h-4 w-4 text-muted-foreground" />
                            <a
                              href={`https://github.com/${user.github}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1"
                            >
                              {user.github}
                              <ArrowUpRight className="h-3 w-3" />
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Progress Card */}
              <motion.div
                variants={itemAnimation}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Learning Progress</h3>
                  <Badge variant="outline" className="rounded-full text-sm">
                    {completionPercentage}% Complete
                  </Badge>
                </div>

                <Progress value={completionPercentage} className="h-2 mb-4" />

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                    <div className="text-xl font-bold text-primary">
                      {user.progress.completed}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Completed
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                    <div className="text-xl font-bold text-yellow-500">
                      {user.progress.inProgress}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      In Progress
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                    <div className="text-xl font-bold text-slate-600 dark:text-slate-400">
                      {user.progress.totalTopics}
                    </div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                </div>
              </motion.div>

              {/* Achievements Card */}
              <motion.div
                variants={itemAnimation}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Achievements</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs gap-1"
                  >
                    <Award className="h-3.5 w-3.5" />
                    View All
                  </Button>
                </div>

                <div className="space-y-3">
                  {user.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-xl p-3"
                    >
                      <div className="bg-primary/10 rounded-full p-2">
                        <BadgeCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {achievement.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(achievement.date)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-6 bg-white dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-800">
                <TabsTrigger
                  value="overview"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Activity
                </TabsTrigger>
                <TabsTrigger
                  value="bookmarks"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  Bookmarks
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <TabsContent value="overview" className="mt-0">
                    <motion.div
                      variants={containerAnimation}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Learning Stats Card */}
                      <motion.div
                        variants={itemAnimation}
                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
                      >
                        <h3 className="font-semibold text-lg mb-4">
                          Recent Activity
                        </h3>

                        <div className="space-y-4">
                          {user.recentActivity.slice(0, 3).map((activity) => (
                            <div
                              key={activity.id}
                              className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0"
                            >
                              <div className="bg-slate-100 dark:bg-slate-800 rounded-full p-2">
                                {getActivityIcon(activity.type)}
                              </div>
                              <div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                  <span className="font-medium text-sm">
                                    {activity.type === "completed" &&
                                      "Completed"}
                                    {activity.type === "started" &&
                                      "Started learning"}
                                    {activity.type === "bookmark" &&
                                      "Bookmarked"}
                                    {activity.type === "comment" &&
                                      "Commented on"}{" "}
                                    <span className="text-primary">
                                      {activity.topic}
                                    </span>
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {getTimeAgo(activity.date)}
                                  </span>
                                </div>
                                {activity.comment && (
                                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    "{activity.comment}"
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full mt-4 rounded-lg gap-2"
                        >
                          <ChevronRight className="h-4 w-4" />
                          View All Activity
                        </Button>
                      </motion.div>

                      {/* Course Progress Card */}
                      <motion.div
                        variants={itemAnimation}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      >
                        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle>In Progress</CardTitle>
                            <CardDescription>
                              Continue where you left off
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {[
                              {
                                id: 1,
                                title: "Java Stream API",
                                progress: 45,
                                lastActive: "2025-05-09T18:30:00Z",
                                lessons: 12,
                                completed: 5,
                              },
                              {
                                id: 2,
                                title: "Java Multithreading",
                                progress: 25,
                                lastActive: "2025-05-07T14:15:00Z",
                                lessons: 8,
                                completed: 2,
                              },
                            ].map((course) => (
                              <div
                                key={course.id}
                                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3"
                              >
                                <div className="flex justify-between mb-1">
                                  <div className="font-medium">
                                    {course.title}
                                  </div>
                                  <div className="text-sm text-primary">
                                    {course.progress}%
                                  </div>
                                </div>
                                <Progress
                                  value={course.progress}
                                  className="h-1.5 mb-2"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <div>
                                    {course.completed} of {course.lessons}{" "}
                                    lessons
                                  </div>
                                  <div>
                                    Last active {getTimeAgo(course.lastActive)}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                          <CardFooter>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full rounded-lg gap-2"
                            >
                              <BookOpen className="h-4 w-4" />
                              Resume Learning
                            </Button>
                          </CardFooter>
                        </Card>

                        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle>Recommended</CardTitle>
                            <CardDescription>
                              Based on your progress
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {[
                              {
                                id: 1,
                                title: "Java Design Patterns",
                                level: "Advanced",
                                time: "3.5 hours",
                                topics: ["Singleton", "Factory", "Observer"],
                              },
                              {
                                id: 2,
                                title: "Java Spring Framework",
                                level: "Intermediate",
                                time: "5 hours",
                                topics: ["IoC", "MVC", "REST"],
                              },
                            ].map((course) => (
                              <div
                                key={course.id}
                                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3"
                              >
                                <div className="flex justify-between mb-2">
                                  <div className="font-medium">
                                    {course.title}
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className="text-xs h-5"
                                  >
                                    {course.level}
                                  </Badge>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground mb-2">
                                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                                  {course.time}
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {course.topics.map((topic, i) => (
                                    <Badge
                                      key={i}
                                      variant="secondary"
                                      className="text-xs rounded-full bg-primary/10 text-primary border-none"
                                    >
                                      {topic}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </CardContent>
                          <CardFooter>
                            <Button
                              size="sm"
                              className="w-full rounded-lg gap-2"
                            >
                              <BookOpen className="h-4 w-4" />
                              Start Learning
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>

                      {/* Recent Achievements */}
                      <motion.div
                        variants={itemAnimation}
                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
                      >
                        <h3 className="font-semibold text-lg mb-4">
                          Learning Streak
                        </h3>

                        <div className="grid grid-cols-7 gap-2 mb-4">
                          {Array(7)
                            .fill(0)
                            .map((_, i) => {
                              // Mock data for streak
                              const isActive = i < 5;
                              const isToday = i === 4;

                              return (
                                <div
                                  key={i}
                                  className={`aspect-square rounded-lg flex items-center justify-center ${
                                    isActive
                                      ? isToday
                                        ? "bg-primary text-white"
                                        : "bg-primary/20 text-primary"
                                      : "bg-slate-100 dark:bg-slate-800 text-muted-foreground"
                                  }`}
                                >
                                  <div className="text-xs font-medium">
                                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                                  </div>
                                </div>
                              );
                            })}
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold">5 Days</div>
                            <div className="text-sm text-muted-foreground">
                              Current Streak
                            </div>
                          </div>

                          <div>
                            <div className="text-2xl font-bold">12 Days</div>
                            <div className="text-sm text-muted-foreground">
                              Longest Streak
                            </div>
                          </div>

                          <Button size="sm" className="rounded-full gap-1.5">
                            <Clock className="h-4 w-4" />
                            Continue Streak
                          </Button>
                        </div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                )}

                {/* Activity Tab */}
                {activeTab === "activity" && (
                  <TabsContent value="activity" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
                    >
                      <h3 className="font-semibold text-lg mb-6">
                        Activity Timeline
                      </h3>

                      <div className="space-y-6">
                        {user.recentActivity.map((activity, index) => (
                          <div key={activity.id} className="relative">
                            {index < user.recentActivity.length - 1 && (
                              <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
                            )}

                            <div className="flex gap-4">
                              <div className="bg-white dark:bg-slate-900 z-10 rounded-full p-1.5 border border-slate-200 dark:border-slate-800">
                                <div className="bg-slate-100 dark:bg-slate-800 rounded-full p-2">
                                  {getActivityIcon(activity.type)}
                                </div>
                              </div>

                              <div className="flex-1">
                                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <span className="font-medium">
                                      {activity.type === "completed" &&
                                        "Completed"}
                                      {activity.type === "started" &&
                                        "Started learning"}
                                      {activity.type === "bookmark" &&
                                        "Bookmarked"}
                                      {activity.type === "comment" &&
                                        "Commented on"}{" "}
                                      <span className="text-primary">
                                        {activity.topic}
                                      </span>
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {formatDate(activity.date)} at{" "}
                                      {new Date(
                                        activity.date
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                  </div>

                                  {activity.comment && (
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg">
                                      "{activity.comment}"
                                    </p>
                                  )}

                                  <div className="flex items-center gap-3 mt-3">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 rounded-full text-xs gap-1"
                                    >
                                      <BookOpen className="h-3.5 w-3.5" />
                                      View Topic
                                    </Button>

                                    {activity.type === "comment" && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 rounded-full text-xs gap-1"
                                      >
                                        <MessageCircle className="h-3.5 w-3.5" />
                                        Reply
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full mt-6 rounded-xl"
                      >
                        Load More Activity
                      </Button>
                    </motion.div>
                  </TabsContent>
                )}

                {/* Bookmarks Tab */}
                {activeTab === "bookmarks" && (
                  <TabsContent value="bookmarks" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
                    >
                      <h3 className="font-semibold text-lg mb-6">
                        Your Bookmarks
                      </h3>

                      <div className="grid grid-cols-1 gap-4">
                        {[
                          {
                            id: 1,
                            title: "Java Multithreading",
                            dateBookmarked: "2025-05-04T09:45:00Z",
                            type: "topic",
                            tags: ["Advanced", "Concurrency"],
                          },
                          {
                            id: 2,
                            title: "Understanding Java Stream API",
                            dateBookmarked: "2025-05-01T14:30:00Z",
                            type: "subtopic",
                            tags: ["Intermediate", "Functional"],
                          },
                          {
                            id: 3,
                            title: "Implementing Factory Design Pattern",
                            dateBookmarked: "2025-04-28T11:20:00Z",
                            type: "code",
                            tags: ["Design Patterns", "OOP"],
                          },
                          {
                            id: 4,
                            title: "Java Memory Management",
                            dateBookmarked: "2025-04-25T16:45:00Z",
                            type: "topic",
                            tags: ["Advanced", "Performance"],
                          },
                        ].map((bookmark) => (
                          <div
                            key={bookmark.id}
                            className="flex items-start gap-4 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          >
                            <div
                              className={`p-2 rounded-lg ${
                                bookmark.type === "topic"
                                  ? "bg-primary/10 text-primary"
                                  : bookmark.type === "subtopic"
                                  ? "bg-blue-500/10 text-blue-500"
                                  : "bg-yellow-500/10 text-yellow-500"
                              }`}
                            >
                              {bookmark.type === "topic" && (
                                <BookOpen className="h-5 w-5" />
                              )}
                              {bookmark.type === "subtopic" && (
                                <FileText className="h-5 w-5" />
                              )}
                              {bookmark.type === "code" && (
                                <Code className="h-5 w-5" />
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <h4 className="font-medium">
                                  {bookmark.title}
                                </h4>
                                <div className="text-xs text-muted-foreground">
                                  Bookmarked{" "}
                                  {getTimeAgo(bookmark.dateBookmarked)}
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {bookmark.tags.map((tag, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="text-xs rounded-full px-2 py-0 h-5"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center gap-2 mt-3">
                                <Button
                                  size="sm"
                                  className="h-8 rounded-full text-xs"
                                >
                                  Continue Learning
                                </Button>
                                // Continue from the previous code...
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 rounded-full text-xs gap-1"
                                >
                                  <Bookmark className="h-3.5 w-3.5" />
                                  Remove Bookmark
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full mt-6 rounded-xl"
                      >
                        View All Bookmarks
                      </Button>
                    </motion.div>
                  </TabsContent>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <TabsContent value="settings" className="mt-0">
                    <motion.div
                      variants={containerAnimation}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Account Settings */}
                      <motion.div
                        variants={itemAnimation}
                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
                      >
                        <h3 className="font-semibold text-lg mb-6">
                          Account Settings
                        </h3>

                        <div className="space-y-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div>
                              <h4 className="font-medium">Email Address</h4>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-lg gap-1.5"
                            >
                              <Mail className="h-4 w-4" />
                              Change Email
                            </Button>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div>
                              <h4 className="font-medium">Password</h4>
                              <p className="text-sm text-muted-foreground">
                                Last changed 3 months ago
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-lg gap-1.5"
                            >
                              <Lock className="h-4 w-4" />
                              Change Password
                            </Button>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div>
                              <h4 className="font-medium">
                                Two-Factor Authentication
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Add an extra layer of security
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-lg gap-1.5"
                            >
                              <Shield className="h-4 w-4" />
                              Enable 2FA
                            </Button>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                              <h4 className="font-medium">Delete Account</h4>
                              <p className="text-sm text-muted-foreground">
                                Permanently delete your account and data
                              </p>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="rounded-lg"
                            >
                              Delete Account
                            </Button>
                          </div>
                        </div>
                      </motion.div>

                      {/* Preferences */}
                      <motion.div
                        variants={itemAnimation}
                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
                      >
                        <h3 className="font-semibold text-lg mb-6">
                          Preferences
                        </h3>

                        <div className="space-y-6">
                          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div>
                              <h4 className="font-medium">
                                Email Notifications
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Receive course updates and announcements
                              </p>
                            </div>
                            <Switch
                              checked={
                                editedUser.preferences.emailNotifications
                              }
                              onCheckedChange={(checked) =>
                                handlePreferenceChange(
                                  "emailNotifications",
                                  checked
                                )
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div>
                              <h4 className="font-medium">Dark Mode</h4>
                              <p className="text-sm text-muted-foreground">
                                Use dark theme for the interface
                              </p>
                            </div>
                            <Switch
                              checked={editedUser.preferences.darkMode}
                              onCheckedChange={(checked) =>
                                handlePreferenceChange("darkMode", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div>
                              <h4 className="font-medium">Public Profile</h4>
                              <p className="text-sm text-muted-foreground">
                                Allow others to see your profile and progress
                              </p>
                            </div>
                            <Switch
                              checked={editedUser.preferences.publicProfile}
                              onCheckedChange={(checked) =>
                                handlePreferenceChange("publicProfile", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Show Progress</h4>
                              <p className="text-sm text-muted-foreground">
                                Display your progress on completed topics
                              </p>
                            </div>
                            <Switch
                              checked={editedUser.preferences.showProgress}
                              onCheckedChange={(checked) =>
                                handlePreferenceChange("showProgress", checked)
                              }
                            />
                          </div>
                        </div>

                        <Button className="w-full mt-6 rounded-xl gap-2">
                          <Save className="h-4 w-4" />
                          Save Preferences
                        </Button>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                )}
              </AnimatePresence>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Icons
const MapPin = ({ className }: { className?: string }) => (
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Globe = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

const MessageCircle = ({ className }: { className?: string }) => (
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
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default ProfilePagev2;