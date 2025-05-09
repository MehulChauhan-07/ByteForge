import React, { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  ChevronLeft,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Clock,
  Info,
  ArrowRight,
  ExternalLink,
  ListChecks,
  Link,
  FileText,
  Lightbulb,
  Filter,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useProgress } from "@/context/ProgressContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { topics, categories } from "@/data/topics";
import type { Topic, Category, SubTopic } from "@/types";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import CodeEditor from "@/components/features/CodeEditor";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Import our enhanced components
import EnhancedSidebar from "@/components/features/Java_Topics/Enhancedpage/EnhancedSidebar";
import TopicDetails from "@/components/features/Java_Topics/Enhancedpage/TopicDetails";
import TopicPage from "./TopicPage";
import SubtopicPage from "./SubtopicPage";

// --- Constants ---
const LEVEL_OPTIONS = ["All", "Beginner", "Intermediate", "Advanced"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Popular" },
  { value: "alphabetical", label: "Alphabetical" },
] as const;
type SortOrderType = (typeof SORT_OPTIONS)[number]["value"];

// --- Animation Variants ---
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

// Helper function to determine badge variant based on level
const levelVariant = (
  level: string
): "default" | "secondary" | "outline" | "destructive" | null | undefined => {
  switch (level) {
    case "Beginner":
      return "default";
    case "Intermediate":
      return "secondary";
    case "Advanced":
      return "destructive";
    default:
      return "outline";
  }
};

// --- Subtopic Navigation Component ---
interface SubtopicNavigationProps {
  subtopics: SubTopic[];
  activeSubtopicId: string | null;
  completedSubtopics: Set<string>;
  onSubtopicClick: (subtopicId: string) => void;
  currentTab: string;
}

const SubtopicNavigation: React.FC<SubtopicNavigationProps> = ({
  subtopics,
  activeSubtopicId,
  completedSubtopics,
  onSubtopicClick,
  currentTab,
}) => {
  return (
    <div className="mb-6 rounded-md border p-3 bg-muted/30 sticky top-0 z-10">
      <h3 className="text-sm font-medium mb-2 text-muted-foreground">
        JUMP TO SECTION
      </h3>
      <div className="space-y-1.5">
        {subtopics.map((subtopic) => {
          // Skip subtopics that don't have content for current tab
          if (
            currentTab === "code" &&
            (!subtopic.codeExamples || subtopic.codeExamples.length === 0)
          )
            return null;
          if (
            currentTab === "resources" &&
            (!subtopic.resources || subtopic.resources.length === 0)
          )
            return null;
          if (
            currentTab === "quiz" &&
            (!subtopic.quizQuestions || subtopic.quizQuestions.length === 0)
          )
            return null;
          if (
            currentTab === "exercises" &&
            (!subtopic.exercises || subtopic.exercises.length === 0)
          )
            return null;

          return (
            <button
              key={subtopic.id}
              onClick={() => onSubtopicClick(subtopic.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 group transition-colors hover:bg-accent",
                activeSubtopicId === subtopic.id &&
                  "bg-primary/10 text-primary font-medium"
              )}
            >
              {completedSubtopics.has(subtopic.id) ? (
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
              ) : (
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border border-muted-foreground/50 flex-shrink-0",
                    activeSubtopicId === subtopic.id && "border-primary"
                  )}
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">{subtopic.title}</h3>
                {subtopic?.description && (
                  <p className="text-sm text-muted-foreground">
                    {subtopic.description}
                  </p>
                )}
              </div>
              {subtopic.estimatedTime && (
                <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {subtopic.estimatedTime}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- Key Takeaways Component ---
interface KeyTakeawaysProps {
  points: string[];
}

const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ points }) => {
  return (
    <Alert className="mt-6 bg-primary/5 border-primary/20">
      <Lightbulb className="h-5 w-5 text-primary" />
      <AlertTitle className="text-primary">Key Takeaways</AlertTitle>
      <AlertDescription>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
};

// --- Quick Knowledge Check Component ---
interface QuickCheckProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuickKnowledgeCheck: React.FC<QuickCheckProps> = ({
  question,
  options,
  correctAnswer,
  explanation,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="mt-6 p-4 rounded-lg border border-muted bg-muted/20">
      <h4 className="font-medium text-base mb-3 flex items-center">
        <ListChecks className="h-5 w-5 mr-2 text-primary" />
        Quick Check
      </h4>
      <p className="mb-3">{question}</p>
      <div className="space-y-2 mb-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            disabled={showExplanation}
            className={cn(
              "w-full text-left p-3 rounded-md border text-sm transition-colors",
              showExplanation &&
                index === correctAnswer &&
                "bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400",
              showExplanation &&
                index === selectedAnswer &&
                index !== correctAnswer &&
                "bg-red-500/10 border-red-500/50 text-red-600 dark:text-red-400",
              !showExplanation && "hover:bg-accent"
            )}
          >
            {option}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div
          className={cn(
            "p-3 text-sm rounded-md",
            isCorrect
              ? "bg-green-500/10 text-green-600 dark:text-green-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          )}
        >
          <div className="font-medium mb-1">
            {isCorrect ? "Correct!" : "Incorrect"}
          </div>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
};

// --- Enhanced Topic Card ---
interface EnhancedTopicCardProps {
  topic: Topic;
  progress: number;
  onClick: () => void;
  onBookmarkClick: (e: React.MouseEvent, topicId: string) => void;
  isBookmarked: boolean;
}

const EnhancedTopicCard: React.FC<EnhancedTopicCardProps> = ({
  topic,
  progress,
  onClick,
  onBookmarkClick,
  isBookmarked,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <Card
        className="h-full flex flex-col overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-border"
        onClick={onClick}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center mb-2">
            <Badge variant={levelVariant(topic.level)}>{topic.level}</Badge>
            <span className="text-xs text-muted-foreground">
              {topic.duration}
            </span>
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {topic.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pb-3">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {topic.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {topic.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <div className="px-4 pb-4 mt-auto">
          {progress > 0 && (
            <div className="mb-2">
              <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}
          <Button
            size="sm"
            className="w-full mt-2"
            variant={progress > 0 ? "secondary" : "default"}
          >
            {progress > 0 ? "Continue Learning" : "Start Topic"}
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity",
            isBookmarked && "opacity-100 text-primary"
          )}
          onClick={(e) => onBookmarkClick(e, topic.id)}
          aria-label={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
        >
          <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
        </Button>
      </Card>
    </motion.div>
  );
};

// --- Pre-requisite Component ---
interface PrerequisitesProps {
  prerequisites: string[];
  onPrerequisiteClick: (topicId: string) => void;
}

const Prerequisites: React.FC<PrerequisitesProps> = ({
  prerequisites,
  onPrerequisiteClick,
}) => {
  if (!prerequisites || prerequisites.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2 text-muted-foreground">
        PREREQUISITES
      </h3>
      <div className="flex flex-wrap gap-2">
        {prerequisites.map((prereqId) => {
          const prereqTopic = topics.find((t) => t.id === prereqId);
          if (!prereqTopic) return null;

          return (
            <Button
              key={prereqId}
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => onPrerequisiteClick(prereqId)}
            >
              <Link className="h-3.5 w-3.5" />
              {prereqTopic.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

// --- Next Subtopic Component ---
interface NextSubtopicProps {
  currentIndex: number;
  subtopics: SubTopic[];
  onClick: (subtopicId: string) => void;
}

const NextSubtopic: React.FC<NextSubtopicProps> = ({
  currentIndex,
  subtopics,
  onClick,
}) => {
  if (currentIndex >= subtopics.length - 1) return null;

  const nextSubtopic = subtopics[currentIndex + 1];

  return (
    <div className="mt-8 border-t pt-4">
      <Button
        variant="outline"
        className="w-full justify-between group"
        onClick={() => onClick(nextSubtopic.id)}
      >
        <span>Next: {nextSubtopic.title}</span>
        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

// --- Mark as Complete Button ---
interface MarkCompleteProps {
  subtopicId: string;
  isCompleted: boolean;
  onToggleComplete: (subtopicId: string) => void;
}

const MarkCompleteButton: React.FC<MarkCompleteProps> = ({
  subtopicId,
  isCompleted,
  onToggleComplete,
}) => {
  return (
    <Button
      variant={isCompleted ? "secondary" : "default"}
      size="sm"
      className="gap-1.5"
      onClick={() => onToggleComplete(subtopicId)}
    >
      {isCompleted ? (
        <>
          <CheckCircle2 className="h-4 w-4" />
          Completed
        </>
      ) : (
        <>
          <CheckCircle2 className="h-4 w-4" />
          Mark as Complete
        </>
      )}
    </Button>
  );
};

// --- Main Page Component ---
const EnhancedTopicsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrderType>("newest");
  const [activeTab, setActiveTab] = useState("content");
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedTopics, setBookmarkedTopics] = useState<Set<string>>(
    new Set()
  );
  const [showSidebar, setShowSidebar] = useState(true);

  // New state variables for enhanced features
  const [activeSubtopicId, setActiveSubtopicId] = useState<string | null>(null);
  const [completedSubtopics, setCompletedSubtopics] = useState<Set<string>>(
    new Set()
  );
  const [expandedSubtopics, setExpandedSubtopics] = useState<Set<string>>(
    new Set()
  );
  const [topicProgress, setTopicProgress] = useState<Record<string, number>>(
    {}
  );
  const subtopicRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const location = useLocation();
  const navigate = useNavigate();
  const { topicId, subtopicId } = useParams();
  const { getCompletionPercentage } = useProgress();

  // --- Utility functions ---
  const scrollToSubtopic = (
    subtopicId: string,
    behavior: ScrollBehavior = "smooth"
  ) => {
    if (subtopicRefs.current[subtopicId]) {
      subtopicRefs.current[subtopicId]?.scrollIntoView({
        behavior,
        block: "start",
      });

      // Expand the accordion if collapsed
      setExpandedSubtopics((prev) => new Set([...prev, subtopicId]));
      setActiveSubtopicId(subtopicId);
    }
  };

  const toggleSubtopicCompletion = (subtopicId: string) => {
    const newCompletedSubtopics = new Set(completedSubtopics);

    if (newCompletedSubtopics.has(subtopicId)) {
      newCompletedSubtopics.delete(subtopicId);
    } else {
      newCompletedSubtopics.add(subtopicId);
    }

    setCompletedSubtopics(newCompletedSubtopics);

    // Persist to local storage
    localStorage.setItem(
      "completedSubtopics",
      JSON.stringify(Array.from(newCompletedSubtopics))
    );

    // Update topic progress
    if (selectedTopic) {
      const totalSubtopics = selectedTopic.subtopics.length;
      const completedCount = selectedTopic.subtopics.filter((s) =>
        newCompletedSubtopics.has(s.id)
      ).length;

      const newProgress = Math.round((completedCount / totalSubtopics) * 100);

      setTopicProgress((prev) => ({
        ...prev,
        [selectedTopic.id]: newProgress,
      }));

      // Save progress to local storage
      localStorage.setItem(
        "topicProgress",
        JSON.stringify({
          ...topicProgress,
          [selectedTopic.id]: newProgress,
        })
      );
    }
  };

  const toggleAccordion = (subtopicId: string) => {
    setExpandedSubtopics((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(subtopicId)) {
        newSet.delete(subtopicId);
      } else {
        newSet.add(subtopicId);
      }
      return newSet;
    });
  };

  // --- Effects ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("q") || "");
    setLevelFilter(params.get("level") || null);
    setCategoryFilter(params.get("category") || null);
    setSortOrder((params.get("sort") as SortOrderType) || "newest");

    // Load bookmarks from local storage
    const storedBookmarks = localStorage.getItem("bookmarkedTopics");
    if (storedBookmarks) {
      setBookmarkedTopics(new Set(JSON.parse(storedBookmarks)));
    }

    // Load completed subtopics from local storage
    const storedCompletedSubtopics = localStorage.getItem("completedSubtopics");
    if (storedCompletedSubtopics) {
      setCompletedSubtopics(new Set(JSON.parse(storedCompletedSubtopics)));
    }

    // Load topic progress from local storage
    const storedTopicProgress = localStorage.getItem("topicProgress");
    if (storedTopicProgress) {
      setTopicProgress(JSON.parse(storedTopicProgress));
    }

    if (topicId) {
      const topic = topics.find((t) => t.id === topicId);
      if (topic) {
        setSelectedTopic(topic);

        // Initialize active subtopic
        if (subtopicId) {
          setActiveSubtopicId(subtopicId);
          // Automatically expand this subtopic's accordion
          setExpandedSubtopics(new Set([subtopicId]));
        } else if (topic.subtopics.length > 0) {
          setActiveSubtopicId(topic.subtopics[0].id);
          // Automatically expand first subtopic's accordion
          setExpandedSubtopics(new Set([topic.subtopics[0].id]));
        }
      } else {
        navigate("/topics", { replace: true });
      }
    } else {
      setSelectedTopic(null);
    }

    setIsLoading(false);
  }, [topicId, subtopicId, location.search, navigate]);

  // Scroll to active subtopic when it changes
  useEffect(() => {
    if (activeSubtopicId && selectedTopic) {
      // Use a delay to ensure DOM is ready, especially after tab changes
      const timer = setTimeout(() => {
        scrollToSubtopic(activeSubtopicId, "auto");
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [activeSubtopicId, selectedTopic, activeTab]);

  // --- URL Update Logic ---
  useEffect(() => {
    const handler = setTimeout(() => {
      updateUrlParams();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, levelFilter, categoryFilter, sortOrder]);

  const updateUrlParams = () => {
    const params = new URLSearchParams(location.search);
    if (searchQuery) params.set("q", searchQuery);
    else params.delete("q");
    if (levelFilter) params.set("level", levelFilter);
    else params.delete("level");
    if (categoryFilter) params.set("category", categoryFilter);
    else params.delete("category");
    if (sortOrder !== "newest") params.set("sort", sortOrder);
    else params.delete("sort");

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // --- Filtering and Sorting ---
  const filteredTopics = useMemo(() => {
    const filtered = topics
      .filter((topic) => {
        const lowerSearch = searchQuery.toLowerCase();
        const matchesSearch = searchQuery
          ? topic.title.toLowerCase().includes(lowerSearch) ||
            topic.description.toLowerCase().includes(lowerSearch) ||
            topic.tags.some((tag) => tag.toLowerCase().includes(lowerSearch)) ||
            topic.subtopics.some(
              (subtopic) =>
                subtopic.title.toLowerCase().includes(lowerSearch) ||
                (subtopic.description?.toLowerCase().includes(lowerSearch) ??
                  false)
            )
          : true;
        const matchesLevel = levelFilter ? topic.level === levelFilter : true;
        const matchesCategory = categoryFilter
          ? topic.category === categoryFilter
          : true;
        return matchesSearch && matchesLevel && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortOrder) {
          case "newest":
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          case "alphabetical":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });

    return filtered;
  }, [searchQuery, levelFilter, categoryFilter, sortOrder]);

  // --- Event Handlers ---
  const handleCardClick = (topic: Topic) => {
    navigate(`/topics/${topic.id}`);
  };

  const handleBackClick = () => {
    setSelectedTopic(null);
    navigate("/topics" + location.search);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setLevelFilter(null);
    setCategoryFilter(null);
    navigate("/topics");
  };

  const handleBookmarkClick = (e: React.MouseEvent, topicId: string) => {
    e.stopPropagation();
    const newBookmarkedTopics = new Set(bookmarkedTopics);
    if (newBookmarkedTopics.has(topicId)) {
      newBookmarkedTopics.delete(topicId);
    } else {
      newBookmarkedTopics.add(topicId);
    }
    setBookmarkedTopics(newBookmarkedTopics);

    localStorage.setItem(
      "bookmarkedTopics",
      JSON.stringify(Array.from(newBookmarkedTopics))
    );
  };

  const handleSubtopicClick = (subtopicId: string) => {
    setActiveSubtopicId(subtopicId);
    scrollToSubtopic(subtopicId);

    // Update URL to include subtopic
    if (selectedTopic) {
      navigate(`/topics/${selectedTopic.id}/${subtopicId}`, { replace: true });
    }
  };

  const handlePrerequisiteClick = (topicId: string) => {
    navigate(`/topics/${topicId}`);
  };

  const handleNextSubtopic = (subtopicId: string) => {
    // First mark current subtopic as complete
    if (activeSubtopicId && !completedSubtopics.has(activeSubtopicId)) {
      toggleSubtopicCompletion(activeSubtopicId);
    }

    // Then navigate to next subtopic
    handleSubtopicClick(subtopicId);
  };

  // --- Derived Data ---
  const categoryTopicCounts = useMemo(
    () =>
      categories.reduce((acc, category) => {
        acc[category.id] = topics.filter(
          (t) => t.category === category.id
        ).length;
        return acc;
      }, {} as Record<string, number>),
    [categories, topics]
  );

  // Find current subtopic index for "Next" navigation
  const currentSubtopicIndex = useMemo(() => {
    if (!selectedTopic || !activeSubtopicId) return -1;
    return selectedTopic.subtopics.findIndex((s) => s.id === activeSubtopicId);
  }, [selectedTopic, activeSubtopicId]);

  // --- Render Logic ---
  if (topicId && subtopicId) {
    return <SubtopicPage />;
  }

  if (topicId) {
    return <TopicPage />;
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-4 w-96 bg-muted rounded" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-muted rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-background text-foreground">
      <AnimatePresence mode="wait">
        {!selectedTopic ? (
          // ========================
          // Topics List View
          // ========================
          <motion.div
            key="topics-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="container mx-auto max-w-7xl px-4 py-8"
          >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="mb-8 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="lg:hidden"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Java Learning Topics
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Sort by:
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-[120px] justify-start text-left font-normal"
                      >
                        {SORT_OPTIONS.find((opt) => opt.value === sortOrder)
                          ?.label ?? "Select..."}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {SORT_OPTIONS.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => setSortOrder(option.value)}
                          className={cn(
                            option.value === sortOrder && "bg-accent"
                          )}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                Explore our comprehensive Java curriculum. Filter and sort to
                find your next topic.
              </p>
            </motion.div>

            {/* Main Grid Layout (Filters + Topics) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-8 lg:grid-cols-4"
            >
              {/* Filters Panel */}
              <aside
                className={cn(
                  "lg:col-span-1",
                  !showSidebar && "hidden lg:block"
                )}
              >
                <Card className="sticky top-6 border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Filter & Search</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>

                    {/* Level Filter */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                        Level
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {LEVEL_OPTIONS.map((level) => {
                          const isSelected =
                            (level === "All" && !levelFilter) ||
                            levelFilter === level;
                          return (
                            <Button
                              key={level}
                              variant={isSelected ? "secondary" : "outline"}
                              size="sm"
                              className={cn(
                                "transition-colors h-8",
                                isSelected && "ring-1 ring-primary"
                              )}
                              onClick={() =>
                                setLevelFilter(level === "All" ? null : level)
                              }
                            >
                              {level}
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Categories Filter */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                        Categories
                      </h4>
                      <div className="space-y-1.5">
                        <Button
                          variant={!categoryFilter ? "secondary" : "outline"}
                          size="sm"
                          className={cn(
                            "w-full justify-between h-8",
                            !categoryFilter && "ring-1 ring-primary"
                          )}
                          onClick={() => setCategoryFilter(null)}
                        >
                          <span>All Categories</span>
                          <Badge
                            variant={!categoryFilter ? "default" : "secondary"}
                            className="px-1.5"
                          >
                            {topics.length}
                          </Badge>
                        </Button>
                        {categories.map((category) => {
                          const isSelected = categoryFilter === category.id;
                          return (
                            <Button
                              key={category.id}
                              variant={isSelected ? "secondary" : "outline"}
                              size="sm"
                              className={cn(
                                "w-full justify-between h-8",
                                isSelected && "ring-1 ring-primary"
                              )}
                              onClick={() => setCategoryFilter(category.id)}
                            >
                              <span className="truncate mr-2">
                                {category.title}
                              </span>
                              <Badge
                                variant={isSelected ? "default" : "secondary"}
                                className="px-1.5"
                              >
                                {categoryTopicCounts[category.id] || 0}
                              </Badge>
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Clear Filters Button */}
                    {(searchQuery || levelFilter || categoryFilter) && (
                      <Button
                        variant="ghost"
                        className="w-full h-8 mt-4 text-muted-foreground hover:text-primary"
                        onClick={handleClearFilters}
                      >
                        Clear All Filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </aside>

              {/* Topics Grid Area */}
              <main
                className={cn("lg:col-span-3", !showSidebar && "lg:col-span-4")}
              >
                {/* Loading State */}
                {isLoading ? (
                  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} className="border-border">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-center mb-3">
                            <Skeleton className="h-5 w-1/3" />
                            <Skeleton className="h-4 w-1/4" />
                          </div>
                          <Skeleton className="h-6 w-3/4" />
                        </CardHeader>
                        <CardContent className="pb-3 space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                          <Skeleton className="h-4 w-1/2" />
                        </CardContent>
                        <div className="px-4 pb-4">
                          <Skeleton className="h-9 w-full mt-2" />
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {/* Result Count */}
                    <p className="mb-4 text-sm text-muted-foreground">
                      Showing {filteredTopics.length} topic
                      {filteredTopics.length !== 1 ? "s" : ""}
                    </p>

                    {/* Actual Topics Grid */}
                    {filteredTopics.length > 0 ? (
                      <motion.div
                        layout
                        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                      >
                        <AnimatePresence>
                          {filteredTopics.map((topic) => (
                            <EnhancedTopicCard
                              key={topic.id}
                              topic={topic}
                              progress={topicProgress[topic.id] || 0}
                              onClick={() => handleCardClick(topic)}
                              onBookmarkClick={handleBookmarkClick}
                              isBookmarked={bookmarkedTopics.has(topic.id)}
                            />
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      // No Results State
                      <Card className="text-center py-16 border-dashed border-border bg-muted/40">
                        <CardContent className="flex flex-col items-center">
                          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-xl font-semibold mt-2 mb-2">
                            No Topics Found
                          </h3>
                          <p className="text-muted-foreground max-w-xs mx-auto mb-6">
                            Adjust your search or filters to discover more Java
                            learning content.
                          </p>
                          <Button
                            variant="outline"
                            onClick={handleClearFilters}
                          >
                            Clear Filters & Search
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </main>
            </motion.div>
          </motion.div>
        ) : (
          // ========================
          // Topic Details View
          // ========================
          <motion.div
            key={`topic-${selectedTopic.id}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex h-full"
          >
            {/* Sidebar */}
            <div
              className={cn(
                "w-64 border-r border-border bg-card hidden lg:block",
                !showSidebar && "lg:hidden"
              )}
            >
              <EnhancedSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
              <div className="container mx-auto max-w-5xl px-4 py-8">
                <TopicDetails topic={selectedTopic} onBack={handleBackClick} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedTopicsPage;
