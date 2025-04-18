import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, BookOpen } from "lucide-react";
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

const EnhancedTopicsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [sortOrder, setSortOrder] = useState<
    "newest" | "popular" | "alphabetical"
  >("newest");

  const location = useLocation();
  const navigate = useNavigate();
  const { topicId } = useParams();

  const { getUserProgress, getCompletionPercentage } = useProgress();

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
          return getCompletionPercentage(b.id) - getCompletionPercentage(a.id);
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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 hidden md:block h-full">
        <EnhancedSidebar />
      </div>

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
              className="container py-8"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-4xl font-bold">Java Learning Topics</h1>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Sort by:
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          {sortOrder === "newest"
                            ? "Newest"
                            : sortOrder === "popular"
                            ? "Popular"
                            : "Alphabetical"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
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
                <p className="text-xl text-muted-foreground">
                  Explore our comprehensive Java curriculum designed to take you
                  from beginner to advanced.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid gap-6 grid-cols-1 lg:grid-cols-4 mt-8"
              >
                {/* Filters Panel */}
                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-slate-950 rounded-lg border p-4">
                    <h3 className="text-lg font-medium mb-4">Filters</h3>

                    {/* Search */}
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search topics..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          updateUrlParams();
                        }}
                        className="pl-9"
                      />
                    </div>

                    {/* Level Filter */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Level</h4>
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
                      <h4 className="text-sm font-medium mb-2">Categories</h4>
                      <div className="space-y-1">
                        <Button
                          variant={!categoryFilter ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-between"
                          onClick={() => {
                            setCategoryFilter(null);
                            updateUrlParams();
                          }}
                        >
                          <span>All Categories</span>
                          <span className="bg-primary-foreground text-primary px-1.5 rounded-md text-xs">
                            {topics.length}
                          </span>
                        </Button>

                        {categories.map((category) => (
                          <Button
                            key={category.id}
                            variant={
                              categoryFilter === category.id
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className="w-full justify-between"
                            onClick={() => {
                              setCategoryFilter(category.id);
                              updateUrlParams();
                            }}
                          >
                            <span>{category.title}</span>
                            <span className="bg-primary-foreground text-primary px-1.5 rounded-md text-xs">
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
                        className="w-full mt-4"
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
                  </div>
                </div>

                {/* Topics Grid */}
                <div className="lg:col-span-3">
                  {filteredTopics.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                      {filteredTopics.map((topic) => (
                        <EnhancedTopicCard
                          key={topic.id}
                          topic={topic}
                          onClick={() => handleCardClick(topic)}
                          progress={getCompletionPercentage(topic.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white dark:bg-slate-950 rounded-lg border">
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="text-lg font-medium mt-4 mb-2">
                        No topics found
                      </h3>
                      <p className="text-muted-foreground">
                        Try changing your search or filter criteria
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery("");
                          setLevelFilter(null);
                          setCategoryFilter(null);
                          navigate("/topics");
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
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
