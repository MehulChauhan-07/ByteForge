import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Code,
  FileText,
  Lightbulb,
  CheckCircle2,
  Clock,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Share2,
  PenSquare,
  Star,
  CheckSquare,
  MessageSquare,
  Heart,
  ChevronDown,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Topic } from "@/types";
import { useProgress } from "@/context/ProgressContext";
import CodeEditor from "@/components/features/CodeEditor";

interface TopicDetailsProps {
  topic: Topic;
  onBack: () => void;
}

const TopicDetails: React.FC<TopicDetailsProps> = ({ topic, onBack }) => {
  const navigate = useNavigate();
  const { subtopicId } = useParams();
  const [activeTab, setActiveTab] = useState("content");
  const [activeSubtopicId, setActiveSubtopicId] = useState<string | null>(
    subtopicId || null
  );
  const [bookmarked, setBookmarked] = useState(false);
  const [showSubtopicsList, setShowSubtopicsList] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 10);
  const [userRating, setUserRating] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isSubTopicComplete, toggleSubTopicCompletion } = useProgress();

  useEffect(() => {
    if (!activeSubtopicId && topic.subtopics.length > 0) {
      setActiveSubtopicId(topic.subtopics[0].id);
    }
  }, [topic, activeSubtopicId]);

  const currentSubtopicIndex = topic.subtopics.findIndex(
    (s) => s.id === activeSubtopicId
  );

  const handleNextSubtopic = () => {
    if (currentSubtopicIndex < topic.subtopics.length - 1) {
      const nextSubtopic = topic.subtopics[currentSubtopicIndex + 1];
      setActiveSubtopicId(nextSubtopic.id);
      navigate(`/topics/${topic.id}/${nextSubtopic.id}`);
      setShowSubtopicsList(false);
    }
  };

  const handlePreviousSubtopic = () => {
    if (currentSubtopicIndex > 0) {
      const prevSubtopic = topic.subtopics[currentSubtopicIndex - 1];
      setActiveSubtopicId(prevSubtopic.id);
      navigate(`/topics/${topic.id}/${prevSubtopic.id}`);
      setShowSubtopicsList(false);
    }
  };

  const handleSubtopicSelect = (subtopicId: string) => {
    setActiveSubtopicId(subtopicId);
    navigate(`/topics/${topic.id}/${subtopicId}`);
    setShowSubtopicsList(false);
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

  const activeSubtopic = topic.subtopics.find((s) => s.id === activeSubtopicId);

  // Progress percentage for the entire topic
  const topicProgress = Math.round(
    (topic.subtopics.filter((s) => isSubTopicComplete(topic.id, s.id)).length /
      topic.subtopics.length) *
      100
  );

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        {/* Hero Section with Dynamic Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 dark:from-primary/10 dark:to-slate-900/50 z-10" />
          <div className="absolute inset-0 bg-[url('/images/topic-pattern.svg')] opacity-10 z-0" />

          <div className="relative z-20 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Topic Info */}
              <div className="space-y-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="text-muted-foreground hover:text-primary group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full mb-2 px-4"
                >
                  <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Topics
                </Button>

                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {topic.title}
                  </h1>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs md:text-sm px-3 py-1 rounded-full font-medium",
                      topic.level === "Beginner"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : topic.level === "Intermediate"
                        ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                    )}
                  >
                    {topic.level}
                  </Badge>
                </div>

                <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
                  {topic.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-1">
                  {topic.tags.slice(0, 5).map((tag) => (
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
              <div className="flex flex-col items-start md:items-end gap-4">
                <div className="flex items-center gap-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:scale-110 transition-transform"
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
                          variant="secondary"
                          size="icon"
                          className="rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:scale-110 transition-transform"
                          onClick={handleLikeToggle}
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              likes % 2 !== 0 ? "fill-red-500 text-red-500" : ""
                            }`}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Like ({likes})</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:scale-110 transition-transform"
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Share</TooltipContent>
                    </Tooltip>

                    {/* <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:scale-110 transition-transform"
                        >
                          <MessageSquare className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Discuss</TooltipContent>
                    </Tooltip> */}
                  </TooltipProvider>
                </div>

                {/* Rating Stars */}
                <div className="flex flex-col items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-3">
                  <div className="text-sm text-muted-foreground mb-1">
                    Rate this topic
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRating(star)}
                        className="mx-0.5 focus:outline-none"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            userRating >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-300 dark:text-slate-500"
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Your progress</div>
                <div className="text-sm font-medium">
                  {topicProgress}% complete
                </div>
              </div>
              <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm h-2.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${topicProgress}%` }}
                  className={`h-full ${
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
          </div>
        </div>

        {/* Content Navigation */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Navigation Sidebar with Subtopics */}
          <div className="lg:w-1/4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden sticky top-4"
            >
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-lg flex items-center justify-between">
                  <span>Module Contents</span>
                  <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
                    {topic.subtopics.length} lessons
                  </span>
                </h3>
              </div>

              <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-2">
                {topic.subtopics.map((subtopic, idx) => {
                  const isComplete = isSubTopicComplete(topic.id, subtopic.id);
                  const isActive = subtopic.id === activeSubtopicId;

                  return (
                    <motion.div
                      key={subtopic.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start p-3 mb-1 rounded-xl text-left hover:bg-muted/80",
                          isActive &&
                            "bg-primary/10 text-primary hover:bg-primary/15",
                          isComplete && "border-l-4 border-green-500 pl-2"
                        )}
                        onClick={() => handleSubtopicSelect(subtopic.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                              isComplete
                                ? "bg-green-500 text-white"
                                : isActive
                                ? "bg-primary text-white"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {isComplete ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <span>{idx + 1}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div
                              className={cn(
                                "font-medium text-sm",
                                isComplete &&
                                  "line-through text-muted-foreground"
                              )}
                            >
                              {subtopic.title}
                            </div>
                            {subtopic.estimatedTime && (
                              <div className="text-xs text-muted-foreground flex items-center mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                {subtopic.estimatedTime}
                              </div>
                            )}
                          </div>
                          {isActive && (
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                          )}
                        </div>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            {/* Navigation Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap md:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-sm border border-slate-200 dark:border-slate-800 mb-6"
            >
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousSubtopic}
                  disabled={currentSubtopicIndex === 0}
                  className="flex gap-2 rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full bg-muted/30 flex items-center gap-1"
                    onClick={() => setShowSubtopicsList(!showSubtopicsList)}
                  >
                    <span className="text-primary font-medium">
                      {currentSubtopicIndex + 1}
                    </span>
                    <span className="text-muted-foreground">of</span>
                    <span className="font-medium">
                      {topic.subtopics.length}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>

                  {/* Dropdown for subtopics */}
                  <AnimatePresence>
                    {showSubtopicsList && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute top-full left-0 mt-2 w-64 z-50 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden"
                      >
                        <div className="max-h-60 overflow-y-auto">
                          {topic.subtopics.map((subtopic, idx) => (
                            <Button
                              key={subtopic.id}
                              variant="ghost"
                              className={cn(
                                "w-full justify-start p-2 rounded-none",
                                subtopic.id === activeSubtopicId &&
                                  "bg-primary/10 text-primary"
                              )}
                              onClick={() => handleSubtopicSelect(subtopic.id)}
                            >
                              <span className="mr-2 text-xs">{idx + 1}.</span>
                              <span className="truncate">{subtopic.title}</span>
                            </Button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextSubtopic}
                  disabled={currentSubtopicIndex === topic.subtopics.length - 1}
                  className="gap-2 rounded-full"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                {activeSubtopic && (
                  <Button
                    variant={
                      isSubTopicComplete(topic.id, activeSubtopic.id)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      toggleSubTopicCompletion(topic.id, activeSubtopic.id)
                    }
                    className={cn(
                      "gap-2 rounded-full",
                      isSubTopicComplete(topic.id, activeSubtopic.id) &&
                        "bg-green-500 hover:bg-green-600"
                    )}
                  >
                    <CheckSquare className="h-4 w-4" />
                    {isSubTopicComplete(topic.id, activeSubtopic.id)
                      ? "Completed"
                      : "Mark Complete"}
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Content Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="flex w-full bg-muted/30 p-1 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <TabsTrigger
                  value="content"
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:font-medium"
                >
                  <BookOpen className="h-4 w-4" />
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:font-medium"
                >
                  <Code className="h-4 w-4" />
                  Code
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:font-medium"
                >
                  <FileText className="h-4 w-4" />
                  Resources
                </TabsTrigger>
                <TabsTrigger
                  value="exercises"
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:font-medium"
                >
                  <Lightbulb className="h-4 w-4" />
                  Exercises
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent
                  value="content"
                  className="mt-0 focus-visible:outline-none focus-visible:ring-0"
                >
                  {activeSubtopic && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <Card className="border-none shadow-none rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <CardHeader className="bg-white dark:bg-slate-900 pb-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {activeSubtopic.estimatedTime || "10 min read"}
                              </div>
                              <h2 className="text-2xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                                {activeSubtopic.title}
                              </h2>
                            </div>
                            <div className="flex items-center gap-2 self-end">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 rounded-full border-dashed"
                              >
                                <PenSquare className="h-4 w-4" />
                                Take Notes
                              </Button>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none pt-2 pb-6 px-6">
                          {activeSubtopic.content.map((block, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="mb-8 last:mb-0"
                            >
                              {block.type === "text" && (
                                <div className="whitespace-pre-line">
                                  {block.content}
                                </div>
                              )}
                              {block.type === "code" && (
                                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
                                  <div className="bg-slate-50 dark:bg-slate-800/60 text-xs px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium flex items-center">
                                        <Code className="h-3.5 w-3.5 mr-1.5 text-primary" />
                                        {block.language || "java"}
                                      </span>
                                      <Badge
                                        variant="outline"
                                        className="text-[10px] px-1.5 py-0 h-4 rounded-full"
                                      >
                                        Example
                                      </Badge>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() =>
                                        navigator.clipboard.writeText(
                                          block.content
                                        )
                                      }
                                      className="h-6 px-2 text-xs font-normal rounded-lg hover:bg-muted/80"
                                    >
                                      Copy Code
                                    </Button>
                                  </div>
                                  <div className="code-container relative">
                                    <CodeEditor
                                      code={block.content}
                                      language={block.language || "java"}
                                      readOnly
                                    />
                                    {/* Run code button for examples */}
                                    <Button
                                      variant="default"
                                      size="sm"
                                      className="absolute bottom-3 right-3 rounded-full px-3 gap-1.5 bg-primary/90 hover:bg-primary shadow-lg"
                                    >
                                      <PlayCircle className="h-4 w-4" />
                                      Run Code
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </CardContent>

                        <CardFooter className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                          {/* <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src="/images/instructor.jpg" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">
                                Author: John Doe
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Senior Java Developer
                              </div>
                            </div>
                          </div> */}

                          <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full gap-1"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                              Ask a question
                            </Button>

                            {currentSubtopicIndex <
                            topic.subtopics.length - 1 ? (
                              <Button
                                variant="default"
                                size="sm"
                                className="rounded-full gap-1"
                                onClick={handleNextSubtopic}
                              >
                                Continue
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Button>
                            ) : (
                              <Button
                                variant="default"
                                size="sm"
                                className="rounded-full gap-1"
                                onClick={() => navigate("/topics")}
                              >
                                Complete Topic
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )}
                </TabsContent>

                <TabsContent
                  value="code"
                  className="mt-0 focus-visible:outline-none focus-visible:ring-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {activeSubtopic?.codeExamples?.map((example, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className="mb-6 last:mb-0"
                      >
                        <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-2xl h-full flex flex-col hover:shadow-md transition-shadow">
                          <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-semibold">
                                {example.title}
                              </h3>
                              <Badge
                                variant="outline"
                                className="text-xs px-2 py-0"
                              >
                                {example.language || "java"}
                              </Badge>
                            </div>
                            {example.description && (
                              <p className="text-muted-foreground text-sm">
                                {example.description}
                              </p>
                            )}
                          </CardHeader>

                          <CardContent className="flex-grow p-0">
                            <div className="relative">
                              <CodeEditor
                                code={example.code}
                                language={example.language || "java"}
                                readOnly
                              />
                              <div className="absolute top-2 right-2 flex gap-2">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() =>
                                    navigator.clipboard.writeText(example.code)
                                  }
                                  className="h-7 px-2 text-xs font-normal bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-sm"
                                >
                                  Copy
                                </Button>
                              </div>
                            </div>
                          </CardContent>

                          <CardFooter className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
                            <div className="flex items-center justify-between w-full">
                              <Badge
                                variant="outline"
                                className="bg-primary/10 text-primary border-primary/20 rounded-full"
                              >
                                Example #{index + 1}
                              </Badge>
                              <Button
                                variant="default"
                                size="sm"
                                className="rounded-full gap-1"
                              >
                                <PlayCircle className="h-3.5 w-3.5" />
                                Try it live
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent
                  value="resources"
                  className="mt-0 focus-visible:outline-none focus-visible:ring-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeSubtopic?.resources?.map((resource, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-md transition-all hover:-translate-y-1 h-full flex flex-col">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-full bg-primary/10 text-primary">
                                <FileText className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold">
                                  {resource.title}
                                </h3>
                                {resource.description && (
                                  <p className="text-muted-foreground text-sm">
                                    {resource.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="flex-grow">
                            <div className="text-sm text-muted-foreground line-clamp-3">
                              This resource provides additional information
                              about {resource.title.toLowerCase()}. Click the
                              button below to access the content.
                            </div>
                          </CardContent>

                          <CardFooter className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
                            <Button
                              variant="outline"
                              className="w-full gap-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                              onClick={() =>
                                window.open(resource.url, "_blank")
                              }
                            >
                              Open Resource
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent
                  value="exercises"
                  className="mt-0 focus-visible:outline-none focus-visible:ring-0"
                >
                  {activeSubtopic?.exercises?.map((exercise, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-8 last:mb-0"
                    >
                      <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-2xl">
                        <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-full bg-primary/10">
                                <Lightbulb className="h-5 w-5 text-primary" />
                              </div>
                              <h3 className="text-xl font-semibold">
                                {exercise.title}
                              </h3>
                            </div>
                            <Badge
                              variant="outline"
                              className="rounded-full px-3 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
                            >
                              Exercise
                            </Badge>
                          </div>
                          {exercise.description && (
                            <p className="text-muted-foreground mt-3 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                              {exercise.description}
                            </p>
                          )}
                        </CardHeader>

                        <CardContent className="p-0">
                          <div className="rounded-lg overflow-hidden">
                            <div className="bg-slate-100 dark:bg-slate-800 text-xs px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {exercise.language || "java"}
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-[10px] px-1.5 py-0 h-4 rounded-full bg-primary/10 text-primary border-primary/20"
                                >
                                  Your Solution
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      exercise.initialCode
                                    )
                                  }
                                  className="h-6 px-2 text-xs font-normal"
                                >
                                  Copy
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 px-2 text-xs font-normal"
                                >
                                  Reset
                                </Button>
                              </div>
                            </div>
                            <div className="code-container relative">
                              <CodeEditor
                                code={exercise.initialCode}
                                language={exercise.language || "java"}
                              />
                            </div>
                          </div>
                        </CardContent>

                        <CardFooter className="p-4 flex flex-wrap justify-between gap-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full"
                            >
                              View Hints
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full"
                            >
                              View Solution
                            </Button>
                          </div>
                          <Button
                            variant="default"
                            size="sm"
                            className="rounded-full gap-2"
                          >
                            <PlayCircle className="h-4 w-4" />
                            Run & Submit
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TopicDetails;
