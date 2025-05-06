import { useState, useEffect, useMemo } from "react"; // Added useMemo
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, ChevronLeft, Bookmark } from "lucide-react"; // Removed Filter, Added Bookmark
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress"; // Added Progress
import { Skeleton } from "@/components/ui/skeleton"; // Added Skeleton
import { useProgress } from "@/context/ProgressContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { topics, categories } from "@/data/topics";
import type { Topic, Category } from "@/types";
import { cn } from "@/lib/utils";
import CodeEditor from "@/components/features/CodeEditor"; // Assuming this component supports themes or is styled for dark mode

// --- Constants ---
const LEVEL_OPTIONS = ["All", "Beginner", "Intermediate", "Advanced"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Popular" },
  { value: "alphabetical", label: "Alphabetical" },
] as const; // Use "as const" for stricter typing
type SortOrderType = (typeof SORT_OPTIONS)[number]["value"];

// --- Animation Variants --- (Keep as is)
const containerVariants = {
  /* ... */
};
const itemVariants = {
  /* ... */
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
      return "destructive"; // Example: use destructive for advanced? Or outline
    default:
      return "outline";
  }
};

// --- Enhanced Topic Card --- (New Component for better structure)
interface EnhancedTopicCardProps {
  topic: Topic;
  progress: number;
  onClick: () => void;
  onBookmarkClick: (e: React.MouseEvent, topicId: string) => void; // Added for bookmarking
  isBookmarked: boolean; // Added to show bookmark state
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
      layout // Enable smooth layout transitions when filtering/sorting
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="group relative" // Added group for coordinating hover effects
    >
      <Card
        className="h-full flex flex-col overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-border"
        onClick={onClick}
      >
        <CardHeader className="pb-2">
          {/* Image Placeholder - uncomment and adjust if you have images */}
          {/* {topic.image && (
            <div className="aspect-video w-full overflow-hidden rounded-md mb-3">
              <img src={topic.image} alt={topic.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
            </div>
          )} */}
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
            {topic.tags.slice(0, 3).map(
              (
                tag // Show only first 3 tags
              ) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              )
            )}
          </div>
        </CardContent>
        <div className="px-4 pb-4 mt-auto">
          {" "}
          {/* Progress and Action */}
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
            // No need for stopPropagation if the entire card handles the main click
            // onClick={(e) => { e.stopPropagation(); onClick(); }}
          >
            {progress > 0 ? "Continue Learning" : "Start Topic"}
          </Button>
        </div>

        {/* Bookmark Button (Absolute Position, shows on group hover) */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity",
            isBookmarked && "opacity-100 text-primary" // Make always visible if bookmarked
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

// --- Main Page Component ---
const EnhancedTopicsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrderType>("newest");
  const [activeTab, setActiveTab] = useState("content");
  const [isLoading, setIsLoading] = useState(false); // Added Loading State
  const [bookmarkedTopics, setBookmarkedTopics] = useState<Set<string>>(
    new Set()
  ); // Added Bookmark State

  const location = useLocation();
  const navigate = useNavigate();
  const { topicId } = useParams();
  // const { getCompletionPercentage } = useProgress();

  // --- Effects ---
  // Sync state from URL params and fetch topic details
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("q") || "");
    setLevelFilter(params.get("level") || null);
    setCategoryFilter(params.get("category") || null);
    setSortOrder((params.get("sort") as SortOrderType) || "newest");

    // Load bookmarks from local storage (example)
    const storedBookmarks = localStorage.getItem("bookmarkedTopics");
    if (storedBookmarks) {
      setBookmarkedTopics(new Set(JSON.parse(storedBookmarks)));
    }

    if (topicId) {
      // Simulate loading for topic detail view if needed
      // setIsLoading(true);
      const topic = topics.find((t) => t.id === topicId);
      if (topic) {
        setSelectedTopic(topic);
        setActiveTab("content"); // Reset tab on topic change
      } else {
        navigate("/topics", { replace: true }); // Use replace to avoid broken back navigation
      }
      // setIsLoading(false);
    } else {
      setSelectedTopic(null);
    }
  }, [topicId, location.search, navigate]); // location.search ensures re-run on query param change

  // --- URL Update Logic ---
  // Debounced update to avoid excessive URL changes while typing search
  useEffect(() => {
    const handler = setTimeout(() => {
      updateUrlParams();
    }, 300); // Debounce time for search/filter URL updates

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, levelFilter, categoryFilter, sortOrder]); // Dependencies that trigger URL update

  const updateUrlParams = () => {
    const params = new URLSearchParams(location.search); // Start with existing params
    if (searchQuery) params.set("q", searchQuery);
    else params.delete("q");
    if (levelFilter) params.set("level", levelFilter);
    else params.delete("level");
    if (categoryFilter) params.set("category", categoryFilter);
    else params.delete("category");
    if (sortOrder !== "newest") params.set("sort", sortOrder);
    else params.delete("sort"); // Only add sort if not default

    // Use replaceState for filters/search to avoid polluting history
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // --- Filtering and Sorting ---
  const filteredTopics = useMemo(() => {
    setIsLoading(true); // Start loading indicator

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
                subtopic.description.toLowerCase().includes(lowerSearch)
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
          // case "popular": // Assuming higher percentage is more popular
          //   return (
          //     getCompletionPercentage(b.id) - getCompletionPercentage(a.id)
          //   );
          case "alphabetical":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });

    // Simulate loading delay if needed for demonstration
    // setTimeout(() => setIsLoading(false), 150);
    setIsLoading(false); // Stop loading indicator immediately for sync ops

    return filtered;
  }, [
    searchQuery,
    levelFilter,
    categoryFilter,
    sortOrder,
    // getCompletionPercentage,
  ]); // Memoize based on dependencies

  // --- Event Handlers ---
  const handleCardClick = (topic: Topic) => {
    navigate(`/topics/${topic.id}`); // Navigate to detail view
  };

  const handleBackClick = () => {
    setSelectedTopic(null); // Clear selected topic state
    navigate("/topics" + location.search); // Go back to list view, preserving filters in URL
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setLevelFilter(null);
    setCategoryFilter(null);
    // Don't reset sort order unless desired
    navigate("/topics"); // Navigate to base URL, which will clear params via useEffect
  };

  const handleBookmarkClick = (e: React.MouseEvent, topicId: string) => {
    e.stopPropagation(); // Prevent card click when clicking bookmark
    const newBookmarkedTopics = new Set(bookmarkedTopics);
    if (newBookmarkedTopics.has(topicId)) {
      newBookmarkedTopics.delete(topicId);
    } else {
      newBookmarkedTopics.add(topicId);
    }
    setBookmarkedTopics(newBookmarkedTopics);
    // Persist to local storage (example)
    localStorage.setItem(
      "bookmarkedTopics",
      JSON.stringify(Array.from(newBookmarkedTopics))
    );
  };

  // --- Derived Data ---
  // Calculate category counts (could be memoized if categories/topics change)
  const categoryTopicCounts = useMemo(
    () =>
      categories.reduce((acc, category) => {
        acc[category.id] = topics.filter(
          (t) => t.category === category.id
        ).length;
        return acc;
      }, {} as Record<string, number>),
    [categories, topics]
  ); // Dependency on topics/categories

  // --- Render Logic ---
  return (
    // Removed outer flex container assuming sidebar is handled elsewhere or not needed here
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
            className="container mx-auto max-w-7xl px-4 py-8" // Added max-width and centering
          >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="mb-8 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Java Learning Topics
                </h1>
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
                          onClick={() => setSortOrder(option.value)} // URL update handled by useEffect
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
              <aside className="lg:col-span-1">
                {/* Sticky position for filters on larger screens */}
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
                        onChange={(e) => setSearchQuery(e.target.value)} // URL update handled by useEffect
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
                        variant="ghost" // Use ghost for less emphasis
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
              <main className="lg:col-span-3">
                {/* Loading State */}
                {isLoading ? (
                  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {[...Array(6)].map(
                      (
                        _,
                        i // Show 6 skeleton loaders
                      ) => (
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
                      )
                    )}
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
                        layout // Animate layout changes in the grid container
                        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3" // Adjusted grid columns
                      >
                        <AnimatePresence>
                          {" "}
                          {/* Needed for exit animations */}
                          {filteredTopics.map((topic) => (
                            // No extra motion.div needed if EnhancedTopicCard has layout prop
                            <EnhancedTopicCard
                              key={topic.id} // Key must be here
                              topic={topic}
                              progress={0} // Hardcoded to 0 instead of using getCompletionPercentage
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
            key={`topic-${selectedTopic.id}`} // Unique key for animation
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="container mx-auto max-w-4xl px-4 py-8" // Constrain width for readability
          >
            {/* Back Button & Header */}
            <div className="mb-6">
              <Button
                variant="ghost"
                className="mb-4 text-muted-foreground hover:text-primary px-0"
                onClick={handleBackClick}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Topics
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold mb-1">
                {selectedTopic.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {selectedTopic.description}
              </p>
              {/* Optional: Add Level/Duration Badges here too */}
              <div className="flex gap-2 mt-3">
                <Badge variant={levelVariant(selectedTopic.level)}>
                  {selectedTopic.level}
                </Badge>
                <Badge variant="outline">{selectedTopic.duration}</Badge>
              </div>
            </div>

            {/* Tabs for Content Sections */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 mb-6">
                {" "}
                {/* Adjust grid cols based on number of tabs */}
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="code">Examples</TabsTrigger>
                <TabsTrigger
                  value="resources"
                  disabled={
                    !selectedTopic.subtopics.some((s) => s.resources?.length)
                  }
                >
                  Resources
                </TabsTrigger>{" "}
                {/* Example: Disable if no resources */}
                <TabsTrigger
                  value="quiz"
                  disabled={
                    !selectedTopic.subtopics.some(
                      (s) => s.quizQuestions?.length
                    )
                  }
                >
                  Quiz
                </TabsTrigger>
                <TabsTrigger
                  value="exercises"
                  disabled={
                    !selectedTopic.subtopics.some((s) => s.exercises?.length)
                  }
                >
                  Exercises
                </TabsTrigger>
              </TabsList>

              {/* Tab Content */}
              <TabsContent
                value="content"
                className="space-y-6 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                {selectedTopic.subtopics.map((subtopic, index) => (
                  <Card
                    key={`content-${index}`}
                    className="overflow-hidden border-border"
                  >
                    <CardHeader>
                      {/* Add estimated time if available */}
                      {subtopic.estimatedTime && (
                        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                          {subtopic.estimatedTime}
                        </p>
                      )}
                      <CardTitle className="text-xl">
                        {subtopic.title}
                      </CardTitle>
                      {subtopic.description && (
                        <p className="text-muted-foreground pt-1">
                          {subtopic.description}
                        </p>
                      )}
                    </CardHeader>
                    {/* Improved content rendering */}
                    <CardContent className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
                      {subtopic.content.map((block, blockIndex) => (
                        <div key={blockIndex} className="mb-4 last:mb-0">
                          {block.type === "text" && <p>{block.content}</p>}
                          {block.type === "code" && (
                            // Use CodeEditor - Ensure it has appropriate styling/theme
                            <div className="[&>pre]:my-4 [&>pre]:p-0">
                              {" "}
                              {/* Adjust CodeEditor container */}
                              <CodeEditor
                                code={block.content}
                                language={block.language || "java"}
                                readOnly
                                // theme="vs-dark" // Example: Explicitly set theme if possible
                                className="!bg-transparent !p-0" // Example: Override bg/padding if needed
                              />
                            </div>
                          )}
                          {block.type === "image" && (
                            <img
                              src={block.url}
                              alt={block.alt || ""}
                              className="max-w-full rounded-md border border-border my-4"
                            />
                          )}
                          {block.type === "video" && (
                            <div className="aspect-video my-4">
                              <iframe
                                src={block.url}
                                title={block.title || "Video"}
                                className="w-full h-full rounded-md border border-border"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          )}
                          {/* Add other block types (list, quote, etc.) as needed */}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent
                value="code"
                className="space-y-6 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                {selectedTopic.subtopics.filter((s) => s.codeExamples?.length)
                  .length > 0 ? (
                  selectedTopic.subtopics.map(
                    (subtopic, index) =>
                      subtopic.codeExamples &&
                      subtopic.codeExamples.length > 0 && (
                        <Card key={`code-${index}`} className="border-border">
                          <CardHeader>
                            <CardTitle className="text-xl">
                              {subtopic.title} - Code Examples
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {subtopic.codeExamples.map(
                              (example, exampleIndex) => (
                                <div key={exampleIndex}>
                                  <h3 className="text-lg font-medium mb-1">
                                    {example.title}
                                  </h3>
                                  {example.description && (
                                    <p className="text-muted-foreground mb-3 text-sm">
                                      {example.description}
                                    </p>
                                  )}
                                  <CodeEditor
                                    code={example.code}
                                    language={example.language || "java"}
                                    readOnly
                                    // theme="vs-dark" // Example theme
                                  />
                                </div>
                              )
                            )}
                          </CardContent>
                        </Card>
                      )
                  )
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No code examples available for this topic yet.
                  </p>
                )}
              </TabsContent>

              {/* Add similar improved rendering for Resources, Quiz, Exercises tabs */}
              {/* Example for Resources */}
              <TabsContent
                value="resources"
                className="space-y-6 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                {selectedTopic.subtopics.filter((s) => s.resources?.length)
                  .length > 0 ? (
                  selectedTopic.subtopics.map(
                    (subtopic, index) =>
                      subtopic.resources &&
                      subtopic.resources.length > 0 && (
                        <Card
                          key={`resource-${index}`}
                          className="border-border"
                        >
                          <CardHeader>
                            <CardTitle className="text-xl">
                              {subtopic.title} - Resources
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {subtopic.resources.map((resource, rIndex) => (
                              <div
                                key={rIndex}
                                className="flex items-center justify-between p-3 border rounded-md bg-muted/30"
                              >
                                <div>
                                  <h4 className="font-medium">
                                    {resource.title}
                                  </h4>
                                  {resource.description && (
                                    <p className="text-sm text-muted-foreground">
                                      {resource.description}
                                    </p>
                                  )}
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    window.open(
                                      resource.url,
                                      "_blank",
                                      "noopener noreferrer"
                                    )
                                  }
                                >
                                  Visit Link
                                </Button>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      )
                  )
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No additional resources available for this topic yet.
                  </p>
                )}
              </TabsContent>

              {/* Placeholder for Quiz and Exercises - implement similarly */}
              <TabsContent value="quiz">
                <p className="text-muted-foreground text-center py-8">
                  Quiz section coming soon!
                </p>
              </TabsContent>
              <TabsContent value="exercises">
                <p className="text-muted-foreground text-center py-8">
                  Exercises section coming soon!
                </p>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedTopicsPage;
