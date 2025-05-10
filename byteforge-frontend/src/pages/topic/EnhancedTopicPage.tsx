import { useState, useEffect } from "react";
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
} from "@/components/ui/dropdown-menu";

import { topics, categories } from "@/data/topics";
import type { Topic, Category } from "@/types";

// Import our enhanced components
import EnhancedSidebar from "@/components/features/Java_Topics/Enhancedpage/EnhancedSidebar";
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

const EnhancedTopicsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [sortOrder, setSortOrder] = useState<
    "newest" | "popular" | "alphabetical"
  >("newest");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { topicId } = useParams();

  // const { getUserProgress, getCompletionPercentage } = useProgress();

  // Handle search from URL and topic selection
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("q");
    const level = params.get("level");
    const category = params.get("category");
    const sort = params.get("sort");

    if (search) setSearchQuery(search);
    if (level) setLevelFilter(level);
    if (category) setCategoryFilter(category);
    if (sort) setSortOrder(sort as "newest" | "popular" | "alphabetical");

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

  // Update URL with current filters
  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (levelFilter) params.set("level", levelFilter);
    if (categoryFilter) params.set("category", categoryFilter);
    if (sortOrder) params.set("sort", sortOrder);

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
        // return getCompletionPercentage(b.id) - getCompletionPercentage(a.id);
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

  function getCompletionPercentage(id: string): number {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex h-screen overflow-hidden">
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

      {/* Sidebar - Desktop always visible, mobile slide in */}
      <div
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
      </div>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-slate-50/50 dark:bg-slate-900/30">
        <AnimatePresence mode="wait">
          {!selectedTopic ? (
            // Topics List View
            <motion.div
              key="topics-list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="container py-8"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      Java Learning Topics
                    </h1>
                    <p className="text-xl text-muted-foreground mt-2">
                      Explore our comprehensive Java curriculum designed to take
                      you from beginner to advanced.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      Sort by:
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 rounded-full"
                        >
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
                        className="min-w-[150px]"
                      >
                        <DropdownMenuItem
                          onClick={() => {
                            setSortOrder("newest");
                            updateUrlParams();
                          }}
                        >
                          Newest
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSortOrder("popular");
                            updateUrlParams();
                          }}
                        >
                          Popular
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSortOrder("alphabetical");
                            updateUrlParams();
                          }}
                        >
                          Alphabetical
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid gap-6 grid-cols-1 lg:grid-cols-4 mt-8"
              >
                {/* Filters Panel */}
                <div className="lg:col-span-1">
                  <motion.div
                    className="sticky top-4 bg-white dark:bg-slate-950 rounded-xl border border-border/30 p-5 shadow-sm"
                    whileHover={{
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Filter className="h-4 w-4 text-primary" />
                      Filters
                    </h3>

                    {/* Search */}
                    <div className="relative mb-5 group">
                      <div className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors">
                        <Search className="h-4 w-4" />
                      </div>
                      <Input
                        placeholder="Search topics..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          updateUrlParams();
                        }}
                        className="pl-9 rounded-full bg-muted/30 border-border/30 focus:border-primary py-5"
                      />
                    </div>

                    {/* Level Filter */}
                    <div className="mb-5">
                      <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        Level
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["All", "Beginner", "Intermediate", "Advanced"].map(
                          (level) => (
                            <Button
                              key={level}
                              variant={
                                (level === "All" && !levelFilter) ||
                                levelFilter === level
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              className={`
                                rounded-full px-4
                                ${
                                  (level === "All" && !levelFilter) ||
                                  levelFilter === level
                                    ? "shadow-md"
                                    : "hover:bg-muted/50"
                                }
                              `}
                              onClick={() => {
                                setLevelFilter(level === "All" ? null : level);
                                updateUrlParams();
                              }}
                            >
                              {level}
                            </Button>
                          )
                        )}
                      </div>
                    </div>

                    {/* Categories Filter */}
                    <div>
                      <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <BookOpen className="h-3.5 w-3.5 text-primary" />
                        Categories
                      </h4>
                      <div className="space-y-2">
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
                          <span>All Categories</span>
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

                {/* Topics Grid */}
                <div className="lg:col-span-3">
                  {filteredTopics.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                      {filteredTopics.map((topic, index) => (
                        <motion.div
                          key={topic.id}
                          variants={itemVariants}
                          transition={{ delay: index * 0.05 }}
                        >
                          <EnhancedTopicCard
                            topic={topic}
                            onClick={() => handleCardClick(topic)}
                            progress={getCompletionPercentage(topic.id)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      variants={itemVariants}
                      className="text-center py-16 bg-white dark:bg-slate-950 rounded-xl border"
                    >
                      <BookOpen className="mx-auto h-16 w-16 text-muted-foreground/40" />
                      <h3 className="text-xl font-medium mt-4 mb-2">
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
              </motion.div>
            </motion.div>
          ) : (
            // Topic Details View
            <motion.div
              key={`topic-${selectedTopic.id}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="container py-8"
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
