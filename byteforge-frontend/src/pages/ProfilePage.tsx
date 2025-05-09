import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Mail,
  Lock,
  Shield,
  Bell,
  LogOut,
  Key,
  Trash2,
  AlertCircle,
  Calendar,
  Clock,
  Code,
  BookOpen,
  Trophy,
  Brain,
  PencilLine,
  Save,
  X,
} from "lucide-react";

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    displayName: "",
    bio: "", // Added bio for user self-description
    preferredLanguage: "Java", // Default to Java for ByteForge
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Learning statistics
  const [learningStats, setLearningStats] = useState({
    completedCourses: 2,
    completedExercises: 15,
    streak: 7,
    totalCodingHours: 24,
    javaLevel: "Intermediate", // Beginner, Intermediate, Advanced
    skillLevel: 65, // Percentage
  });

  // Notification preferences state
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailUpdates: true,
    courseReminders: true,
    newFeatures: false,
    securityAlerts: true,
    codingTips: true, // New Java-focused notification preference
    weeklyProgress: true, // New preference for progress reports
  });

  // Recent activity data
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: "course_progress",
      title: "Java Basics",
      description: "Completed Module 3: Control Flow",
      date: "2 days ago",
    },
    {
      id: 2,
      type: "code_challenge",
      title: "String Manipulation",
      description: "Completed challenge with 95% score",
      date: "4 days ago",
    },
    {
      id: 3,
      type: "note",
      title: "OOP Concepts",
      description: "Added new note on inheritance",
      date: "5 days ago",
    },
  ]);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login");
      return;
    }

    setFormData({
      username: user.username,
      email: user.email,
      displayName: user.username,
      bio: user.bio || "Java enthusiast learning to code!",
      preferredLanguage: user.preferredLanguage || "Java",
    });

    // Here you would fetch user learning statistics
    // fetchLearningStats(user.id)
  }, [user, isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (key: keyof typeof notificationPrefs) => {
    setNotificationPrefs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // TODO: Implement actual API call
      // await userService.updateProfile(formData);

      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = () => {
    if (!user || !user.username) return "U";
    return user.username.substring(0, 2).toUpperCase();
  };

  const accountCreatedDate = "April 15, 2023"; // Replace with actual data when available

  // Function to get activity icon by type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course_progress":
        return <BookOpen className="h-4 w-4 text-primary" />;
      case "code_challenge":
        return <Code className="h-4 w-4 text-green-500" />;
      case "note":
        return <PencilLine className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - user profile card and activity */}
        <div className="space-y-6">
          {/* Profile card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                  />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{formData.displayName}</h2>
                <p className="text-muted-foreground">{user.email}</p>

                {/* Java skill level badge */}
                <Badge
                  variant="outline"
                  className="mt-2 bg-yellow-50 text-yellow-700 border-yellow-200"
                >
                  {learningStats.javaLevel} Java Developer
                </Badge>

                <p className="mt-2 text-sm text-center text-muted-foreground">
                  {formData.bio}
                </p>

                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Member since {accountCreatedDate}</span>
                </div>

                <div className="mt-4 flex flex-wrap justify-center gap-1">
                  {user.roles?.map((role, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full capitalize"
                    >
                      {role.toLowerCase()}
                    </span>
                  ))}
                </div>

                <Button
                  className="mt-6 w-full"
                  variant="outline"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Learning Progress card - NEW */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Learning Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Java Skill Level</p>
                    <p className="text-sm font-medium">
                      {learningStats.skillLevel}%
                    </p>
                  </div>
                  <Progress
                    value={learningStats.skillLevel}
                    className="h-2 mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-full">
                  <Trophy className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Current Streak</p>
                  <p className="text-sm text-muted-foreground">
                    {learningStats.streak} days of continuous learning
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-full">
                  <Code className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Completed Exercises</p>
                  <p className="text-sm text-muted-foreground">
                    {learningStats.completedExercises} exercises
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-full">
                  <Clock className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total Coding Hours</p>
                  <p className="text-sm text-muted-foreground">
                    {learningStats.totalCodingHours} hours
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => navigate("/learning-path")}
              >
                View Full Learning Journey
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Activity - NEW */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y">
                {recentActivities.map((activity) => (
                  <li
                    key={activity.id}
                    className="p-3 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="mt-0.5 p-1.5 bg-accent rounded-full">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card> */}
        </div>

        {/* Right column - tabs for different sections */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="edit-profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="edit-profile">Profile</TabsTrigger>
              {/* <TabsTrigger value="learning-preferences">Learning</TabsTrigger> */}
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Edit Profile Tab */}
            <TabsContent value="edit-profile" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    id="profile-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            disabled={!isEditing || isLoading}
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground">
                            This is your public username
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="displayName">Display Name</Label>
                          <Input
                            id="displayName"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleInputChange}
                            disabled={!isEditing || isLoading}
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground">
                            How you want to be addressed
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing || isLoading}
                          className="w-full"
                        />
                        <p className="text-xs text-muted-foreground">
                          Your email is used for notifications and account
                          recovery
                        </p>
                      </div>

                      {/* Bio field - NEW */}
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          disabled={!isEditing || isLoading}
                          className="w-full"
                        />
                        <p className="text-xs text-muted-foreground">
                          Short description about yourself (max 160 characters)
                        </p>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-6">
                  {isEditing ? (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            username: user.username,
                            email: user.email,
                            displayName: user.username,
                            bio:
                              user.bio || "Java enthusiast learning to code!",
                            preferredLanguage: user.preferredLanguage || "Java",
                          });
                        }}
                        disabled={isLoading}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        form="profile-form"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="h-4 w-4 border-2 border-t-transparent border-white/80 rounded-full animate-spin mr-2"></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="ml-auto"
                    >
                      <PencilLine className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Change your profile picture</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                      />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-4 w-full">
                      <p className="text-sm text-muted-foreground">
                        Upload a new profile picture. The image should be square
                        and at least 400x400 pixels.
                      </p>
                      <div className="flex flex-col md:flex-row gap-3">
                        <Button type="button" variant="outline">
                          Upload Image
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="text-destructive hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Learning Preferences Tab - NEW */}
            <TabsContent value="learning-preferences" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Preferences</CardTitle>
                  <CardDescription>
                    Customize your learning experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base">
                        Preferred Programming Language
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        ByteForge focuses on Java, but you can set your
                        preferences for future courses
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {["Java", "Python", "JavaScript", "C++", "C#"].map(
                          (lang) => (
                            <Badge
                              key={lang}
                              variant={
                                formData.preferredLanguage === lang
                                  ? "default"
                                  : "outline"
                              }
                              className="cursor-pointer px-3 py-1.5"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  preferredLanguage: lang,
                                }))
                              }
                            >
                              {lang}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-base">Learning Goals</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        What do you want to achieve with Java?
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        {[
                          {
                            id: "web-dev",
                            label: "Web Development",
                            icon: <Code className="h-4 w-4" />,
                          },
                          {
                            id: "android",
                            label: "Android Development",
                            icon: <Code className="h-4 w-4" />,
                          },
                          {
                            id: "data-science",
                            label: "Data Science",
                            icon: <Brain className="h-4 w-4" />,
                          },
                          {
                            id: "academic",
                            label: "Academic Learning",
                            icon: <BookOpen className="h-4 w-4" />,
                          },
                        ].map((goal) => (
                          <div
                            key={goal.id}
                            className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-accent/50 transition-colors"
                          >
                            <div className="p-1.5 bg-primary/10 rounded-full">
                              {goal.icon}
                            </div>
                            <span className="text-sm">{goal.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-base">Daily Learning Target</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        How much time do you want to spend learning each day?
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">15 minutes</span>
                        <span className="text-sm font-medium">30 minutes</span>
                        <span className="text-sm">1 hour or more</span>
                      </div>
                      <Separator className="my-2" />
                      <input
                        type="range"
                        min="15"
                        max="60"
                        step="15"
                        defaultValue="30"
                        className="w-full h-2 bg-accent rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button className="ml-auto">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Control which notifications you receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-updates">Email Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about your account activity
                        </p>
                      </div>
                      <Switch
                        id="email-updates"
                        checked={notificationPrefs.emailUpdates}
                        onCheckedChange={() =>
                          handleNotificationChange("emailUpdates")
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="course-reminders">
                          Course Reminders
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Get reminded about unfinished courses and exercises
                        </p>
                      </div>
                      <Switch
                        id="course-reminders"
                        checked={notificationPrefs.courseReminders}
                        onCheckedChange={() =>
                          handleNotificationChange("courseReminders")
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="coding-tips">Java Coding Tips</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive daily Java coding tips and best practices
                        </p>
                      </div>
                      <Switch
                        id="coding-tips"
                        checked={notificationPrefs.codingTips}
                        onCheckedChange={() =>
                          handleNotificationChange("codingTips")
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="weekly-progress">Weekly Progress</Label>
                        <p className="text-sm text-muted-foreground">
                          Get a weekly summary of your learning progress
                        </p>
                      </div>
                      <Switch
                        id="weekly-progress"
                        checked={notificationPrefs.weeklyProgress}
                        onCheckedChange={() =>
                          handleNotificationChange("weeklyProgress")
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-features">New Features</Label>
                        <p className="text-sm text-muted-foreground">
                          Learn about new features and improvements to ByteForge
                        </p>
                      </div>
                      <Switch
                        id="new-features"
                        checked={notificationPrefs.newFeatures}
                        onCheckedChange={() =>
                          handleNotificationChange("newFeatures")
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="security-alerts">Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts about suspicious activity or logins
                        </p>
                      </div>
                      <Switch
                        id="security-alerts"
                        checked={notificationPrefs.securityAlerts}
                        onCheckedChange={() =>
                          handleNotificationChange("securityAlerts")
                        }
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button className="ml-auto">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account's security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div>
                        <h3 className="text-base font-medium">
                          Change Password
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Update your account password
                        </p>
                      </div>
                      <Button variant="outline" className="w-full md:w-auto">
                        <Key className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div>
                        <h3 className="text-base font-medium">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline" className="w-full md:w-auto">
                        <Lock className="mr-2 h-4 w-4" />
                        Set Up 2FA
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div>
                        <h3 className="text-base font-medium">
                          Active Sessions
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Manage your active sessions and devices
                        </p>
                      </div>
                      <Button variant="outline" className="w-full md:w-auto">
                        <Shield className="mr-2 h-4 w-4" />
                        View Sessions
                      </Button>
                    </div>

                    <Separator />

                    <div className="rounded-md border border-destructive/10 bg-destructive/5 p-4">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                          <div>
                            <h3 className="font-medium text-destructive">
                              Delete Account
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Permanently delete your account and all associated
                              data. This action cannot be undone.
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          className="w-full md:w-auto"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
