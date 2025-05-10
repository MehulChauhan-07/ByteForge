import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  BookOpen,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Calendar,
  Clock,
  Star,
  StarHalf,
  Settings,
  Lightbulb,
  BookMarked,
  Layers,
  ListFilter,
  Tag,
  GraduationCap,
  Badge as BadgeIcon,
  TrendingUp,
  LayoutGrid,
  LayoutList,
  MoreHorizontal,
  Bookmark,
  BookmarkPlus,
  Heart,
  AlertCircle,
  ArrowUpRight,
  ArrowRight,
  BookmarkCheck,
  CheckSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/context/ProgressContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { topics, categories } from "@/data/topics";
import type { Topic, Category } from "@/types";
import { cn } from "@/lib/utils";

// Import our enhanced components
// import EnhancedSidebar from "@/components/features/Java_Topics/Enhancedpage/EnhancedSidebar";
import EnhancedTopicCard from "@/components/features/Java_Topics/Enhancedpage/EnhancedTopicCard";
import TopicDetails from "@/components/features/Java_Topics/Enhancedpage/TopicDetails";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
  exit: { opacity: 0 },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
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

interface VisualFilterOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const EnhancedTopicsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [sortOrder, setSortOrder] = useState<
    "newest" | "popular" | "alphabetical"
  >("newest");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [showFeaturedTopic, setShowFeaturedTopic] = useState(true);
  const [bookmarkedTopics, setBookmarkedTopics] = useState<string[]>([]);
  const [likedTopics, setLikedTopics] = useState<string[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { topicId } = useParams();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Handle search from URL and topic selection
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("q");
    const level = params.get("level");
    const category = params.get("category");
    const sort = params.get("sort");
    const view = params.get("view") as "grid" | "list";

    if (search) setSearchQuery(search);
    if (level) setLevelFilter(level);
    if (category) setCategoryFilter(category);
    if (sort) setSortOrder(sort as "newest" | "popular" | "alphabetical");
    if (view) setViewMode(view);

    // If topicId is provided via route parameters
    if (topicId) {
      const topic = topics.find((t) => t.id === topicId);
      if (topic) {
        setSelectedTopic(topic);
      } else {
        // If topic not found, redirect to topics list
        navigate("/topics");
      }
    } else {
      setSelectedTopic(null);
    }
  }, [topicId, location.search]);

  // Scroll effects for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 100) {
          heroRef.current.style.transform = `translateY(-${
            scrollPosition * 0.2
          }px)`;
          heroRef.current.style.opacity = `${1 - scrollPosition / 300}`;
        } else {
          heroRef.current.style.transform = "translateY(0)";
          heroRef.current.style.opacity = "1";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Update URL with current filters
  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (levelFilter) params.set("level", levelFilter);
    if (categoryFilter) params.set("category", categoryFilter);
    if (sortOrder) params.set("sort", sortOrder);
    if (viewMode) params.set("view", viewMode);

    navigate(`/topics?${params.toString()}`);
  };

  // Handle topic card click
  const handleCardClick = (topic: Topic) => {
    setSelectedTopic(topic);
    navigate(`/topics/${topic.id}`);
  };

  // Handle back button click
  const handleBackClick = () => {
    setSelectedTopic(null);
    navigate("/topics");
  };

  const toggleBookmark = (topicId: string) => {
    setBookmarkedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const toggleLike = (topicId: string) => {
    setLikedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  // Apply filters and sort order
  const filteredTopics = topics
    .filter((topic) => {
      const matchesSearch = searchQuery
        ? topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          topic.subtopics.some((subtopic) =>
            subtopic.title.toLowerCase().includes(searchQuery.toLowerCase())
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
        case "popular":
          // This would be replaced with actual popularity metrics
          return likedTopics.includes(b.id)
            ? 1
            : likedTopics.includes(a.id)
            ? -1
            : 0;
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  // Count topics in each category for badges
  const categoryTopicCounts = categories.reduce((acc, category) => {
    acc[category.id] = topics.filter((t) => t.category === category.id).length;
    return acc;
  }, {} as Record<string, number>);

  // Featured topic selection
  const featuredTopic = topics.find((t) => t.id === "java-oop") || topics[0];

  // Mock completion data
  function getCompletionPercentage(id: string): number {
    // Mock progress data - just for demonstration
    return Math.floor(Math.random() * 100);
  }

  const levels: VisualFilterOption[] = [
    {
      id: "all",
      label: "All Levels",
      icon: <Layers className="h-3.5 w-3.5" />,
    },
    {
      id: "Beginner",
      label: "Beginner",
      icon: <BookOpen className="h-3.5 w-3.5" />,
    },
    {
      id: "Intermediate",
      label: "Intermediate",
      icon: <Lightbulb className="h-3.5 w-3.5" />,
    },
    {
      id: "Advanced",
      label: "Advanced",
      icon: <GraduationCap className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <div className="flex min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-900/30">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20 shadow-lg"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5 text-primary" />
          ) : (
            <Menu className="h-5 w-5 text-primary" />
          )}
        </Button>
      </div>

      {/* Filter drawer for mobile */}
      <Sheet open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Topic Filters
            </SheetTitle>
          </SheetHeader>
          <div className="px-4 py-6 space-y-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
            {/* Level Filter */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium flex items-center gap-2 text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Skill Level
              </h4>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <Button
                    key={level.id}
                    variant={
                      (level.id === "all" && !levelFilter) ||
                      levelFilter === level.id
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    className={`
                      rounded-full px-4 flex items-center gap-2
                      ${
                        (level.id === "all" && !levelFilter) ||
                        levelFilter === level.id
                          ? "shadow-md"
                          : "hover:bg-muted/50"
                      }
                    `}
                    onClick={() => {
                      setLevelFilter(level.id === "all" ? null : level.id);
                      updateUrlParams();
                    }}
                  >
                    {level.icon}
                    {level.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Categories Filter */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium flex items-center gap-2 text-primary">
                <ListFilter className="h-3.5 w-3.5" />
                Categories
              </h4>
              <div className="space-y-2">
                <Button
                  variant={!categoryFilter ? "default" : "ghost"}
                  size="sm"
                  className={`
                    w-full justify-between rounded-lg transition-all
                    ${!categoryFilter ? "shadow-md" : "hover:bg-muted/50"}
                  `}
                  onClick={() => {
                    setCategoryFilter(null);
                    updateUrlParams();
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Layers className="h-3.5 w-3.5" />
                    All Categories
                  </span>
                  <span className="bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-xs">
                    {topics.length}
                  </span>
                </Button>

                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      categoryFilter === category.id ? "default" : "ghost"
                    }
                    size="sm"
                    className={`
                      w-full justify-between rounded-lg transition-all
                      ${
                        categoryFilter === category.id
                          ? "shadow-md"
                          : "hover:bg-muted/50 hover:translate-x-1"
                      }
                    `}
                    onClick={() => {
                      setCategoryFilter(category.id);
                      updateUrlParams();
                    }}
                  >
                    <span>{category.title}</span>
                    <span className="bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-xs">
                      {categoryTopicCounts[category.id] || 0}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Tags Cloud */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium flex items-center gap-2 text-primary">
                <Tag className="h-3.5 w-3.5" />
                Popular Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Arrays",
                  "Loops",
                  "Classes",
                  "Methods",
                  "Interfaces",
                  "Collections",
                  "Streams",
                  "Inheritance",
                  "Polymorphism",
                ].map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors rounded-full px-3 py-1"
                    onClick={() => {
                      setSearchQuery(tag);
                      updateUrlParams();
                      setFilterDrawerOpen(false);
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || levelFilter || categoryFilter) && (
              <Button
                variant="outline"
                className="w-full mt-5 rounded-full border-dashed"
                onClick={() => {
                  setSearchQuery("");
                  setLevelFilter(null);
                  setCategoryFilter(null);
                  navigate("/topics");
                  setFilterDrawerOpen(false);
                }}
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Sidebar - Desktop always visible, mobile slide in */}
      {/* <div
        className={`
          md:w-64 md:block md:relative fixed inset-y-0 left-0 z-40
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
          bg-white dark:bg-slate-950 border-r border-border/40 
          md:shadow-none shadow-xl
        `}
      >
        <EnhancedSidebar />
      </div> */}

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {!selectedTopic ? (
            // Topics List View
            <motion.div
              key="topics-list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="min-h-screen pb-12"
            >
              {/* Hero Section */}
              <motion.div
                ref={heroRef}
                className="relative bg-gradient-to-br from-primary/90 to-primary/60 dark:from-primary/80 dark:to-slate-900 text-white py-12 px-6 md:px-12 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-10 z-0"></div>
                <motion.div
                  className="absolute top-1/2 right-10 transform -translate-y-1/2 rounded-full bg-white/10 w-64 h-64 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                ></motion.div>

                <div className="container mx-auto max-w-7xl relative z-10">
                  <motion.div
                    className="max-w-3xl space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative rounded-xl shadow-lg p-3 bg-white/10 backdrop-blur-sm">
                        <BookOpen className="h-7 w-7" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></span>
                      </div>
                      <Badge className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full px-3 py-1">
                        Learn Java with ByteForge
                      </Badge>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                      Master Java Programming <br />
                      <span className="inline-block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        From Fundamentals to Advanced
                      </span>
                    </h1>

                    <p className="text-xl text-white/80 max-w-2xl">
                      Explore our comprehensive curriculum designed to take you
                      from beginner to advanced Java developer with interactive
                      lessons and exercises.
                    </p>

                    <div className="flex gap-4 pt-4">
                      <Button
                        size="lg"
                        variant="secondary"
                        className="rounded-full bg-white text-primary hover:bg-white/90 px-6"
                        onClick={() => {
                          const beginnerTopic = topics.find(
                            (t) => t.level === "Beginner"
                          );
                          if (beginnerTopic) handleCardClick(beginnerTopic);
                        }}
                      >
                        Start Learning
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full bg-transparent border-white text-white hover:bg-white/10 px-6"
                      >
                        Explore Paths
                      </Button>
                    </div>

                    {/* <div className="flex items-center gap-3 mt-8 text-white/70 text-sm">
                      <div className="flex -space-x-2">
                        {[...Array(4)].map((_, i) => (
                          <Avatar
                            key={i}
                            className="border-2 border-white w-8 h-8"
                          >
                            <AvatarFallback>
                              {String.fromCharCode(65 + i)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span>Join 2,000+ students learning Java</span>
                    </div> */}
                  </motion.div>
                </div>
              </motion.div>

              {/* Search and Filters */}
              <div className="container mx-auto max-w-7xl px-4 py-6">
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col md:flex-row items-center gap-4 py-2"
                >
                  <div className="relative w-full md:max-w-xl group">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" />
                    <Input
                      placeholder="Search topics, tags, or keywords..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        updateUrlParams();
                      }}
                      className="pl-10 pr-12 py-6 rounded-full border-slate-200 dark:border-slate-800 focus-visible:ring-primary shadow-sm"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full p-0"
                        onClick={() => {
                          setSearchQuery("");
                          updateUrlParams();
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFilterDrawerOpen(true)}
                      className="md:hidden rounded-full gap-2 border-slate-200 dark:border-slate-800"
                    >
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 rounded-full border-slate-200 dark:border-slate-800"
                        >
                          <TrendingUp className="h-3.5 w-3.5 mr-1" />
                          {sortOrder === "newest"
                            ? "Newest"
                            : sortOrder === "popular"
                            ? "Popular"
                            : "Alphabetical"}
                          <ChevronDown className="h-3 w-3 opacity-70" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="min-w-[180px]"
                      >
                        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSortOrder("newest");
                            updateUrlParams();
                          }}
                        >
                          <Calendar className="h-3.5 w-3.5 mr-2" />
                          Newest
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSortOrder("popular");
                            updateUrlParams();
                          }}
                        >
                          <Star className="h-3.5 w-3.5 mr-2" />
                          Popular
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSortOrder("alphabetical");
                            updateUrlParams();
                          }}
                        >
                          <BadgeIcon className="h-3.5 w-3.5 mr-2" />
                          Alphabetical
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="hidden md:flex border border-slate-200 dark:border-slate-800 rounded-full p-1">
                            <Button
                              variant={
                                viewMode === "grid" ? "default" : "ghost"
                              }
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => {
                                setViewMode("grid");
                                updateUrlParams();
                              }}
                            >
                              <LayoutGrid className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={
                                viewMode === "list" ? "default" : "ghost"
                              }
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => {
                                setViewMode("list");
                                updateUrlParams();
                              }}
                            >
                              <LayoutList className="h-4 w-4" />
                            </Button>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>View Mode</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </motion.div>
              </div>

              {/* Featured Topic Section (conditionally rendered) */}
              {showFeaturedTopic &&
                filteredTopics.length > 0 &&
                !searchQuery &&
                !levelFilter &&
                !categoryFilter && (
                  <div className="container mx-auto max-w-7xl px-4 mb-10">
                    <motion.div
                      variants={itemVariants}
                      className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/40 z-10"></div>
                      <div className="absolute inset-0 bg-[url('/images/featured-bg.jpg')] bg-cover bg-center z-0"></div>

                      <div className="relative z-20 p-6 md:p-10 text-white">
                        <div className="flex flex-col md:flex-row gap-10 items-start">
                          <div className="space-y-6 md:w-2/3">
                            <Badge className="bg-primary/70 hover:bg-primary px-3 py-1 rounded-full mb-4">
                              Featured Path
                            </Badge>

                            <h2 className="text-3xl md:text-4xl font-bold">
                              {featuredTopic.title}
                            </h2>

                            <p className="text-lg text-white/80 max-w-2xl">
                              {featuredTopic.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-2">
                              {featuredTopic.tags.slice(0, 5).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="rounded-full px-3 py-1 text-xs bg-white/20 hover:bg-white/30 text-white"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center gap-6 mt-4">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-primary" />
                                <span className="text-sm">
                                  {featuredTopic.subtopics.length} Lessons
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span className="text-sm">
                                  {featuredTopic.duration}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <StarHalf className="h-4 w-4 text-amber-400" />
                                <span className="text-sm">
                                  4.8 (120 ratings)
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                              <Button
                                size="lg"
                                className="rounded-full gap-2"
                                onClick={() => handleCardClick(featuredTopic)}
                              >
                                Explore Path
                                <ArrowUpRight className="h-4 w-4" />
                              </Button>
                              <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full bg-transparent border-white text-white hover:bg-white/10"
                                onClick={() => setShowFeaturedTopic(false)}
                              >
                                Dismiss
                              </Button>
                            </div>
                          </div>

                          <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <h3 className="text-lg font-medium mb-3">
                              What you'll learn:
                            </h3>
                            <ul className="space-y-3">
                              {featuredTopic.subtopics
                                .slice(0, 5)
                                .map((subtopic, idx) => (
                                  <li
                                    key={idx}
                                    className="flex gap-3 items-center"
                                  >
                                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                                      {idx + 1}
                                    </div>
                                    <span className="text-sm text-white/90">
                                      {subtopic.title}
                                    </span>
                                  </li>
                                ))}
                              {featuredTopic.subtopics.length > 5 && (
                                <li className="pl-9 text-sm text-white/70">
                                  +{featuredTopic.subtopics.length - 5} more
                                  lessons
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

              <div className="container mx-auto max-w-7xl px-4">
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-4 mt-4">
                  {/* Filters Panel - Desktop Only */}
                  <div className="lg:col-span-1 hidden md:block">
                    <motion.div
                      variants={itemVariants}
                      className="sticky top-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm"
                      whileHover={{
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg font-medium mb-5 flex items-center gap-2">
                        <Filter className="h-4 w-4 text-primary" />
                        Filters
                      </h3>

                      {/* Level Filter */}
                      <div className="mb-5">
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-primary">
                          <Sparkles className="h-3.5 w-3.5" />
                          Skill Level
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {levels.map((level) => (
                            <Button
                              key={level.id}
                              variant={
                                (level.id === "all" && !levelFilter) ||
                                levelFilter === level.id
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              className={`
                                rounded-full px-4 flex items-center gap-2
                                ${
                                  (level.id === "all" && !levelFilter) ||
                                  levelFilter === level.id
                                    ? "shadow-md"
                                    : "hover:bg-muted/50"
                                }
                              `}
                              onClick={() => {
                                setLevelFilter(
                                  level.id === "all" ? null : level.id
                                );
                                updateUrlParams();
                              }}
                            >
                              {level.icon}
                              {level.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Categories Filter */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-primary">
                          <ListFilter className="h-3.5 w-3.5" />
                          Categories
                        </h4>
                        <div className="space-y-1.5">
                          <Button
                            variant={!categoryFilter ? "default" : "ghost"}
                            size="sm"
                            className={`
                              w-full justify-between rounded-lg transition-all
                              ${
                                !categoryFilter
                                  ? "shadow-md"
                                  : "hover:bg-muted/50"
                              }
                            `}
                            onClick={() => {
                              setCategoryFilter(null);
                              updateUrlParams();
                            }}
                          >
                            <span className="flex items-center gap-2">
                              <Layers className="h-3.5 w-3.5" />
                              All Categories
                            </span>
                            <span className="bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-xs">
                              {topics.length}
                            </span>
                          </Button>

                          {categories.map((category) => (
                            <Button
                              key={category.id}
                              variant={
                                categoryFilter === category.id
                                  ? "default"
                                  : "ghost"
                              }
                              size="sm"
                              className={`
                                w-full justify-between rounded-lg transition-all
                                ${
                                  categoryFilter === category.id
                                    ? "shadow-md"
                                    : "hover:bg-muted/50 hover:translate-x-1"
                                }
                              `}
                              onClick={() => {
                                setCategoryFilter(category.id);
                                updateUrlParams();
                              }}
                            >
                              <span>{category.title}</span>
                              <span className="bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-xs">
                                {categoryTopicCounts[category.id] || 0}
                              </span>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Tags Cloud */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-primary">
                          <Tag className="h-3.5 w-3.5" />
                          Popular Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Arrays",
                            "Loops",
                            "Classes",
                            "Methods",
                            "Interfaces",
                            "Collections",
                            "Streams",
                            "Inheritance",
                          ].map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors rounded-full px-3 py-1"
                              onClick={() => {
                                setSearchQuery(tag);
                                updateUrlParams();
                              }}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Additional Options */}
                      <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="show-completed"
                            className="text-sm flex items-center gap-2"
                          >
                            <CheckSquare className="h-3.5 w-3.5" />
                            Show Completed
                          </Label>
                          <Switch id="show-completed" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="show-bookmarks"
                            className="text-sm flex items-center gap-2"
                          >
                            <Bookmark className="h-3.5 w-3.5" />
                            Only Bookmarked
                          </Label>
                          <Switch id="show-bookmarks" />
                        </div>
                      </div>

                      {/* Clear Filters Button */}
                      {(searchQuery || levelFilter || categoryFilter) && (
                        <Button
                          variant="outline"
                          className="w-full mt-5 rounded-full border-dashed"
                          onClick={() => {
                            setSearchQuery("");
                            setLevelFilter(null);
                            setCategoryFilter(null);
                            navigate("/topics");
                          }}
                        >
                          Clear All Filters
                        </Button>
                      )}
                    </motion.div>
                  </div>

                  {/* Topics Grid/List */}
                  <div className="lg:col-span-3">
                    {/* Results Header */}
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center justify-between mb-6"
                    >
                      <h2 className="text-2xl font-semibold">
                        {searchQuery || levelFilter || categoryFilter ? (
                          <span>
                            {filteredTopics.length}{" "}
                            {filteredTopics.length === 1 ? "Result" : "Results"}
                            {searchQuery && <span> for "{searchQuery}"</span>}
                            {levelFilter && <span> in {levelFilter}</span>}
                            {categoryFilter && (
                              <span>
                                {" "}
                                in{" "}
                                {categories.find((c) => c.id === categoryFilter)
                                  ?.title || categoryFilter}
                              </span>
                            )}
                          </span>
                        ) : (
                          "All Topics"
                        )}
                      </h2>
                      {filteredTopics.length > 0 && (
                        <span className="text-sm text-muted-foreground">
                          {filteredTopics.length} topics
                        </span>
                      )}
                    </motion.div>

                    {isLoading ? (
                      // Loading skeletons
                      <div
                        className={
                          viewMode === "grid"
                            ? "grid gap-6 sm:grid-cols-1 md:grid-cols-2"
                            : "space-y-4"
                        }
                      >
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden ${
                              viewMode === "list"
                                ? "p-4 flex items-center gap-4"
                                : "h-72"
                            }`}
                          >
                            {viewMode === "list" ? (
                              <>
                                <Skeleton className="h-16 w-16 rounded-lg" />
                                <div className="space-y-2 flex-1">
                                  <Skeleton className="h-4 w-1/3" />
                                  <Skeleton className="h-3 w-2/3" />
                                  <div className="flex gap-2 pt-1">
                                    <Skeleton className="h-2 w-12 rounded-full" />
                                    <Skeleton className="h-2 w-12 rounded-full" />
                                  </div>
                                </div>
                                <Skeleton className="h-9 w-28 rounded-full" />
                              </>
                            ) : (
                              <div className="p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                  <Skeleton className="h-10 w-10 rounded-full" />
                                  <Skeleton className="h-5 w-16 rounded-full" />
                                </div>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <div className="flex gap-2 pt-2">
                                  <Skeleton className="h-6 w-16 rounded-full" />
                                  <Skeleton className="h-6 w-16 rounded-full" />
                                </div>
                                <div className="pt-6">
                                  <Skeleton className="h-2 w-full rounded-full" />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : filteredTopics.length > 0 ? (
                      viewMode === "grid" ? (
                        // Grid View
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                          {filteredTopics.map((topic, index) => (
                            <motion.div
                              key={topic.id}
                              variants={itemVariants}
                              transition={{ delay: index * 0.05 }}
                              className="relative group"
                            >
                              <EnhancedTopicCard
                                topic={topic}
                                onClick={() => handleCardClick(topic)}
                                progress={getCompletionPercentage(topic.id)}
                              />

                              {/* Quick Action Overlay */}
                              <div className="absolute top-3 right-3 flex gap-2 z-20">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="secondary"
                                        className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleBookmark(topic.id);
                                        }}
                                      >
                                        {bookmarkedTopics.includes(topic.id) ? (
                                          <BookmarkCheck className="h-4 w-4 text-primary" />
                                        ) : (
                                          <BookmarkPlus className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      {bookmarkedTopics.includes(topic.id)
                                        ? "Bookmarked"
                                        : "Bookmark"}
                                    </TooltipContent>
                                  </Tooltip>

                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="secondary"
                                        className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleLike(topic.id);
                                        }}
                                      >
                                        <Heart
                                          className={`h-4 w-4 ${
                                            likedTopics.includes(topic.id)
                                              ? "fill-red-500 text-red-500"
                                              : ""
                                          }`}
                                        />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      {likedTopics.includes(topic.id)
                                        ? "Unlike"
                                        : "Like"}
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        // List View
                        <div className="space-y-3">
                          {filteredTopics.map((topic, index) => (
                            <motion.div
                              key={topic.id}
                              variants={itemVariants}
                              transition={{ delay: index * 0.05 }}
                              className="group"
                              whileHover={{
                                y: -2,
                                transition: { duration: 0.2 },
                              }}
                            >
                              <Card
                                className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden border-slate-200 dark:border-slate-800"
                                onClick={() => handleCardClick(topic)}
                              >
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                  <div className="md:w-[120px] p-4 md:p-6 flex items-center justify-center bg-slate-50 dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
                                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                      <BookOpen className="h-8 w-8" />
                                    </div>
                                  </div>

                                  <div className="flex-1 p-4 pt-0 md:py-4 md:pl-0">
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                      <div>
                                        <div className="flex items-center gap-2 mb-1">
                                          <Badge
                                            className={cn(
                                              "rounded-full px-2",
                                              topic.level === "Beginner"
                                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                                : topic.level === "Intermediate"
                                                ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                                : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                                            )}
                                          >
                                            {topic.level}
                                          </Badge>
                                          <span className="text-xs text-muted-foreground">
                                            Updated{" "}
                                            {new Date(
                                              topic.updatedAt
                                            ).toLocaleDateString()}
                                          </span>
                                        </div>

                                        <h3 className="text-xl font-medium mb-1">
                                          {topic.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm line-clamp-2">
                                          {topic.description}
                                        </p>
                                      </div>

                                      <div className="flex md:flex-col items-center gap-2 mt-1">
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 rounded-full"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  toggleBookmark(topic.id);
                                                }}
                                              >
                                                {bookmarkedTopics.includes(
                                                  topic.id
                                                ) ? (
                                                  <BookmarkCheck className="h-4 w-4 text-primary" />
                                                ) : (
                                                  <BookmarkPlus className="h-4 w-4" />
                                                )}
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              {bookmarkedTopics.includes(
                                                topic.id
                                              )
                                                ? "Bookmarked"
                                                : "Bookmark"}
                                            </TooltipContent>
                                          </Tooltip>

                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 rounded-full"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  toggleLike(topic.id);
                                                }}
                                              >
                                                <Heart
                                                  className={`h-4 w-4 ${
                                                    likedTopics.includes(
                                                      topic.id
                                                    )
                                                      ? "fill-red-500 text-red-500"
                                                      : ""
                                                  }`}
                                                />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              {likedTopics.includes(topic.id)
                                                ? "Unlike"
                                                : "Like"}
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6 mt-3">
                                      <div className="flex items-center gap-2">
                                        <div className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                                          {topic.subtopics.length} lessons
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="text-xs">
                                          {topic.duration}
                                        </span>
                                      </div>
                                      <div className="flex-1 md:flex-none">
                                        <div className="flex items-center justify-between text-sm mb-1">
                                          <span className="text-xs text-slate-500 dark:text-slate-400">
                                            Progress
                                          </span>
                                          <span className="text-xs font-medium">
                                            {getCompletionPercentage(topic.id)}%
                                          </span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                          <motion.div
                                            className="h-full rounded-full bg-primary"
                                            initial={{ width: 0 }}
                                            animate={{
                                              width: `${getCompletionPercentage(
                                                topic.id
                                              )}%`,
                                            }}
                                            transition={{
                                              duration: 0.5,
                                              ease: "easeOut",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-3">
                                      {topic.tags.slice(0, 3).map((tag) => (
                                        <Badge
                                          key={tag}
                                          variant="secondary"
                                          className="text-xs font-normal rounded-full"
                                        >
                                          {tag}
                                        </Badge>
                                      ))}
                                      {topic.tags.length > 3 && (
                                        <Badge
                                          variant="outline"
                                          className="text-xs rounded-full"
                                        >
                                          +{topic.tags.length - 3} more
                                        </Badge>
                                      )}
                                    </div>
                                  </div>

                                  <div className="p-4 md:pr-6 flex md:flex-col items-center justify-between md:justify-center gap-3 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800">
                                    <Button
                                      variant="default"
                                      size="sm"
                                      className="rounded-full w-full gap-2"
                                    >
                                      {getCompletionPercentage(topic.id) > 0
                                        ? "Continue"
                                        : "Start"}
                                      <ArrowRight className="h-3.5 w-3.5" />
                                    </Button>

                                    <div className="text-xs text-muted-foreground">
                                      {Math.floor(Math.random() * 100) + 10}{" "}
                                      active learners
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      )
                    ) : (
                      // No results
                      <motion.div
                        variants={itemVariants}
                        className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 px-4"
                      >
                        <div className="mx-auto bg-muted/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                          <AlertCircle className="h-8 w-8 text-muted-foreground/40" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">
                          No topics found
                        </h3>
                        <p className="text-muted-foreground max-w-md mx-auto mb-6">
                          We couldn't find any topics matching your current
                          filters. Try adjusting your search or filter criteria.
                        </p>
                        <Button
                          variant="outline"
                          className="rounded-full px-6"
                          onClick={() => {
                            setSearchQuery("");
                            setLevelFilter(null);
                            setCategoryFilter(null);
                            navigate("/topics");
                          }}
                        >
                          Clear filters
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Topic Details View
            <motion.div
              key={`topic-${selectedTopic.id}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="container mx-auto max-w-7xl px-4 py-6"
            >
              <TopicDetails topic={selectedTopic} onBack={handleBackClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedTopicsPage;
