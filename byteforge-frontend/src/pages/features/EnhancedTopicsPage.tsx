import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, BookOpen, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import CodeEditor from "@/components/features/CodeEditor";

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
  const [activeTab, setActiveTab] = useState("content");

  const location = useLocation();
  const navigate = useNavigate();
  const { topicId } = useParams();
  const { getCompletionPercentage } = useProgress();

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

    if (topicId) {
      const topic = topics.find((t) => t.id === topicId);
      if (topic) {
        setSelectedTopic(topic);
      } else {
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
          topic.subtopics.some(
            (subtopic) =>
              subtopic.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              subtopic.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Update URL with search query
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    navigate(`/topics?${params.toString()}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
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
                  <Card>
                    <CardHeader>
                      <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search topics..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="pl-9"
                        />
                      </div>

                      {/* Level Filter */}
                      <div>
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
                                  setLevelFilter(
                                    level === "All" ? null : level
                                  );
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
                            <Badge variant="secondary">{topics.length}</Badge>
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
                              <Badge variant="secondary">
                                {categoryTopicCounts[category.id] || 0}
                              </Badge>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Clear Filters Button */}
                      {(searchQuery || levelFilter || categoryFilter) && (
                        <Button
                          variant="outline"
                          className="w-full"
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
                    </CardContent>
                  </Card>
                </div>

                {/* Topics Grid */}
                <div className="lg:col-span-3">
                  {filteredTopics.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {filteredTopics.map((topic) => (
                        <Card
                          key={topic.id}
                          className="overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <Badge
                                variant={
                                  topic.level === "Beginner"
                                    ? "default"
                                    : topic.level === "Intermediate"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {topic.level}
                              </Badge>
                              <Badge variant="outline">{topic.duration}</Badge>
                            </div>
                            <CardTitle className="mt-2">
                              {topic.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {topic.description}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {topic.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <div className="p-4">
                            <Button
                              className="w-full"
                              onClick={() => handleCardClick(topic)}
                            >
                              Start Learning
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="text-center py-12">
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
                    </Card>
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
              <div className="mb-6">
                <Button
                  variant="ghost"
                  className="mb-4"
                  onClick={handleBackClick}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Topics
                </Button>
                <h1 className="text-4xl font-bold mb-2">
                  {selectedTopic.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {selectedTopic.description}
                </p>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4"
              >
                <TabsList>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="code">Code Examples</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  <TabsTrigger value="exercises">Exercises</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  {selectedTopic.subtopics.map((subtopic, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{subtopic.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {subtopic.content.map((block, blockIndex) => (
                          <div key={blockIndex} className="mb-4">
                            {block.type === "text" && <p>{block.content}</p>}
                            {block.type === "code" && (
                              <div className="rounded-md overflow-hidden">
                                <CodeEditor
                                  code={block.content}
                                  language={block.language || "java"}
                                  readOnly
                                  className="border-none"
                                />
                              </div>
                            )}
                            {block.type === "image" && (
                              <img
                                src={block.url}
                                alt={block.alt}
                                className="max-w-full rounded-md"
                              />
                            )}
                            {block.type === "video" && (
                              <div className="aspect-video">
                                <iframe
                                  src={block.url}
                                  title={block.title}
                                  className="w-full h-full rounded-md"
                                  allowFullScreen
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="code" className="space-y-4">
                  {selectedTopic.subtopics.map((subtopic, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{subtopic.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {subtopic.codeExamples.map((example, exampleIndex) => (
                          <div key={exampleIndex} className="mb-6">
                            <h3 className="text-lg font-medium mb-2">
                              {example.title}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              {example.description}
                            </p>
                            <div className="rounded-md overflow-hidden">
                              <CodeEditor
                                code={example.code}
                                language={example.language || "java"}
                                readOnly
                                className="border-none"
                              />
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="resources" className="space-y-4">
                  {selectedTopic.subtopics.map((subtopic, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{subtopic.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {subtopic.resources.map((resource, resourceIndex) => (
                          <div key={resourceIndex} className="mb-4">
                            <h3 className="text-lg font-medium mb-2">
                              {resource.title}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              {resource.description}
                            </p>
                            <Button
                              variant="outline"
                              onClick={() =>
                                window.open(resource.url, "_blank")
                              }
                            >
                              View Resource
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="quiz" className="space-y-4">
                  {selectedTopic.subtopics.map((subtopic, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{subtopic.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {subtopic.quizQuestions && (
                          <div className="space-y-4">
                            {subtopic.quizQuestions.map(
                              (question, questionIndex) => (
                                <div key={questionIndex} className="space-y-2">
                                  <h3 className="font-medium">
                                    {question.question}
                                  </h3>
                                  <div className="space-y-2">
                                    {question.options.map(
                                      (option, optionIndex) => (
                                        <div
                                          key={optionIndex}
                                          className={cn(
                                            "p-3 rounded-md border",
                                            option.toString() ===
                                              question.correctAnswer.toString()
                                              ? "bg-green-50 border-green-200"
                                              : "bg-muted"
                                          )}
                                        >
                                          {option}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="exercises" className="space-y-4">
                  {selectedTopic.subtopics.map((subtopic, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{subtopic.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {subtopic.exercises?.map((exercise, exerciseIndex) => (
                          <div key={exerciseIndex} className="mb-6">
                            <h3 className="text-lg font-medium mb-2">
                              {exercise.title}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              {exercise.description}
                            </p>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">
                                  Starter Code:
                                </h4>
                                <div className="rounded-md overflow-hidden">
                                  <CodeEditor
                                    code={exercise.starterCode}
                                    language="java"
                                    readOnly
                                    className="border-none"
                                  />
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Solution:</h4>
                                <div className="rounded-md overflow-hidden">
                                  <CodeEditor
                                    code={exercise.solution}
                                    language="java"
                                    readOnly
                                    className="border-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedTopicsPage;
