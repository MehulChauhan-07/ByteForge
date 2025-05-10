import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  BookOpen,
  Tag,
  Clock,
  Calendar,
  Bookmark,
  BookmarkCheck,
  Share2,
  MessageSquare,
  Star,
  PenSquare,
  Heart,
  Award,
  Users,
  Info,
  Zap,
  PlayCircle,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { topics } from "@/data/topics";
import { useProgress } from "@/context/ProgressContext";
import SubtopicList from "@/components/features/Java_Topics/SubtopicList";
import ResourcesList from "@/components/features/Java_Topics/ResourcesList";
import RelatedTopics from "@/components/features/Java_Topics/RelatedTopics";
import type { Topic } from "@/types";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0 },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const TopicPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 10);
  const [userRating, setUserRating] = useState(0);

  const { getTopicProgress } = useProgress();

  useEffect(() => {
    if (topicId) {
      const foundTopic = topics.find((t) => t.id === topicId);
      if (foundTopic) {
        setTopic(foundTopic);
        document.title = `${foundTopic.title} | ByteForge`;
      } else {
        navigate("/topics");
      }
    }
  }, [topicId, navigate]);

  const handleGoBack = () => {
    navigate("/topics");
  };

  const handleStartLearning = () => {
    if (topic && topic.subtopics.length > 0) {
      navigate(`/topics/${topic.id}/${topic.subtopics[0].id}`);
    }
  };

  const handleBookmarkToggle = () => {
    setBookmarked(!bookmarked);
  };

  const handleLikeToggle = () => {
    setLikes(likes + (likes % 2 === 0 ? 1 : -1));
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  const getCompletionPercentage = (topicId: string): number => {
    // This would be implemented with actual progress data
    return Math.floor(Math.random() * 100);
  };

  const topicProgress = topic ? getCompletionPercentage(topic.id) : 0;

  if (!topic) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-lg font-medium">Loading topic...</h2>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container py-8 max-w-7xl mx-auto"
    >
      {/* Hero Section with Topic Details */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent mix-blend-multiply z-0" />
          <div className="absolute inset-0 bg-[url('/images/topic-pattern.svg')] opacity-5 z-0" />

          <div className="relative z-10 p-6 md:p-8">
            <Button
              variant="outline"
              size="sm"
              onClick={handleGoBack}
              className="text-muted-foreground hover:text-primary group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full mb-6 px-4"
            >
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Topics
            </Button>

            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
              {/* Topic Info */}
              <div className="space-y-4 flex-grow">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    className={cn(
                      "text-xs px-2.5 py-0.5 rounded-full",
                      topic.level === "Beginner"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : topic.level === "Intermediate"
                        ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                    )}
                  >
                    {topic.level}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs rounded-full px-3 py-0.5 border-slate-200 dark:border-slate-700"
                  >
                    {topic.duration}
                  </Badge>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Updated {new Date(topic.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {topic.title}
                </h1>

                <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl">
                  {topic.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {topic.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-full px-3 py-1 text-xs bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats and Actions */}
              <div className="flex flex-col gap-4 min-w-[300px]">
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-medium">Your Progress</div>
                    <div className="text-lg font-bold text-primary">
                      {topicProgress}%
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${topicProgress}%` }}
                        className={`h-full rounded-full ${
                          topicProgress < 30
                            ? "bg-red-500"
                            : topicProgress < 70
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    </div>
                  </div>

                  {topicProgress === 0 ? (
                    <Button
                      size="lg"
                      className="w-full rounded-xl h-12"
                      onClick={handleStartLearning}
                    >
                      Start Learning
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="w-full rounded-xl h-12"
                      onClick={handleStartLearning}
                    >
                      Continue Learning
                    </Button>
                  )}

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 w-full h-10"
                            onClick={handleBookmarkToggle}
                          >
                            {bookmarked ? (
                              <BookmarkCheck className="h-5 w-5 text-primary" />
                            ) : (
                              <Bookmark className="h-5 w-5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {bookmarked ? "Bookmarked" : "Bookmark"}
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 w-full h-10"
                            onClick={handleLikeToggle}
                          >
                            <Heart
                              className={`h-5 w-5 ${
                                likes % 2 !== 0
                                  ? "fill-red-500 text-red-500"
                                  : ""
                              }`}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Like ({likes})</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 w-full h-10"
                          >
                            <Share2 className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Share</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5">
                  <h3 className="text-sm font-medium mb-3">Topic Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span>Subtopics</span>
                      </div>
                      <span className="font-medium">
                        {topic.subtopics.length}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>Active Learners</span>
                      </div>
                      <span className="font-medium">124</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span>Completion Rate</span>
                      </div>
                      <span className="font-medium">87%</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span>Average Rating</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">4.8</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-3 w-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div variants={itemVariants} className="mb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white dark:bg-slate-900 p-1 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            <TabsTrigger
              value="overview"
              className="rounded-lg py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Info className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="rounded-lg py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="rounded-lg py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Tag className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger
              value="related"
              className="rounded-lg py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Zap className="h-4 w-4 mr-2" />
              Related
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <TabsContent
                value="overview"
                className="space-y-6 focus-visible:outline-none focus-visible:ring-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Overview Card */}
                    <Card className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm col-span-full lg:col-span-2">
                      <CardHeader>
                        <h2 className="text-2xl font-bold">About this topic</h2>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="prose dark:prose-invert max-w-none">
                          <p>
                            This comprehensive topic will guide you through
                            everything you need to know about {topic.title}.
                            Whether you're just starting out or looking to
                            deepen your knowledge, this course provides detailed
                            explanations, practical examples, and hands-on
                            exercises.
                          </p>
                          <h3>What you'll learn:</h3>
                          <ul>
                            {topic.subtopics.slice(0, 5).map((subtopic) => (
                              <li key={subtopic.id}>{subtopic.title}</li>
                            ))}
                            {topic.subtopics.length > 5 && (
                              <li>
                                And {topic.subtopics.length - 5} more lessons...
                              </li>
                            )}
                          </ul>
                        </div>

                        {topic.prerequisites && topic.prerequisites.length > 0 && (
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                              <h3 className="font-medium">Prerequisites</h3>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              Before starting this topic, you should be familiar
                              with:
                            </p>
                            <ul className="mt-2 space-y-1">
                              {topic.prerequisites.map((prereq) => (
                                <li
                                  key={prereq}
                                  className="text-sm flex items-center gap-2"
                                >
                                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-600 dark:bg-yellow-500"></div>
                                  <span>{prereq}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Teacher Card */}
                    <Card className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                      <CardHeader>
                        <h2 className="text-xl font-bold">Instructors</h2>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/images/instructor.jpg" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">John Doe</div>
                            <div className="text-sm text-muted-foreground">
                              Senior Java Developer
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/images/instructor2.jpg" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Jane Smith</div>
                            <div className="text-sm text-muted-foreground">
                              Java Architecture Expert
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= 4
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Curriculum Overview */}
                    <Card className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm col-span-full">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="text-xl font-bold">Topic Curriculum</h2>
                        <Badge
                          variant="outline"
                          className="rounded-full px-3 py-1"
                        >
                          {topic.subtopics.length} lessons
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {topic.subtopics.slice(0, 3).map((subtopic, idx) => (
                            <div
                              key={subtopic.id}
                              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                  {idx + 1}
                                </div>
                                <div>
                                  <h3 className="font-medium">
                                    {subtopic.title}
                                  </h3>
                                  {subtopic.estimatedTime && (
                                    <div className="text-xs text-muted-foreground flex items-center mt-1">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {subtopic.estimatedTime}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-full hover:bg-primary/10 hover:text-primary"
                                onClick={() =>
                                  navigate(`/topics/${topic.id}/${subtopic.id}`)
                                }
                              >
                                <PlayCircle className="h-5 w-5" />
                              </Button>
                            </div>
                          ))}

                          {topic.subtopics.length > 3 && (
                            <div className="text-center pt-2">
                              <Button
                                variant="outline"
                                onClick={() => setActiveTab("content")}
                                className="rounded-full"
                              >
                                View All {topic.subtopics.length} Lessons
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent
                value="content"
                className="focus-visible:outline-none focus-visible:ring-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Topic Content</h2>
                        <Badge
                          variant="outline"
                          className="rounded-full px-3 py-1"
                        >
                          {topic.subtopics.length} lessons
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <SubtopicList
                        topicId={topic.id}
                        subtopics={topic.subtopics}
                        onSubtopicClick={(subtopicId: any) =>
                          navigate(`/topics/${topic.id}/${subtopicId}`)
                        }
                      />
                    </CardContent>
                    <CardFooter className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Total estimated time: {topic.duration}
                      </div>
                      <Button
                        className="rounded-lg"
                        onClick={handleStartLearning}
                      >
                        {topicProgress > 0
                          ? "Continue Learning"
                          : "Start Learning"}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent
                value="resources"
                className="focus-visible:outline-none focus-visible:ring-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <ResourcesList topicId={topic.id} />
                </motion.div>
              </TabsContent>

              <TabsContent
                value="related"
                className="focus-visible:outline-none focus-visible:ring-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <RelatedTopics currentTopicId={topic.id} />
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </div>
        </Tabs>
      </motion.div>

      {/* Rate This Topic Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <Card className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <CardHeader>
            <h2 className="text-xl font-bold text-center">
              How would you rate this topic?
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRating(star)}
                  className="mx-2 focus:outline-none"
                >
                  <Star
                    className={`h-10 w-10 ${
                      userRating >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            {userRating > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-4"
              >
                <p className="text-green-600 dark:text-green-400 font-medium">
                  Thank you for your {userRating}-star rating!
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Discussion Section Teaser */}
      <motion.div variants={itemVariants}>
        <Card className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <h2 className="text-xl font-bold">Join the Discussion</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/images/avatar.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 flex-grow cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <p className="text-muted-foreground">
                  Share your thoughts or ask questions...
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/images/instructor.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 flex-grow">
                <div className="flex items-center justify-between">
                  <div className="font-medium">John Doe</div>
                  <div className="text-xs text-muted-foreground">
                    2 days ago
                  </div>
                </div>
                <p className="mt-2 text-sm">
                  Great topic! I found the examples particularly helpful. Would
                  recommend to anyone who's just starting with Java.
                </p>
                <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 hover:text-primary">
                      <Heart className="h-3.5 w-3.5" />
                      <span>24</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <Button variant="outline" className="w-full rounded-lg">
              View All Comments
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TopicPage;
