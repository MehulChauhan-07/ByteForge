import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/context/ProgressContex";

import { topics } from "@/data/topics";
import type { Topic } from "@/types";

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
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { topicId } = useParams(); // Get topicId from URL parameters

  const { getCompletionPercentage } = useProgress();

  // Handle search from URL and topic selection
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("q");
    if (search) {
      setSearchQuery(search);
    }

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
      // Reset selected topic when on the main topics page
      setSelectedTopic(null);
    }
  }, [topicId, location.search]);

  // Handle topic card click
  const handleCardClick = (topic: Topic) => {
    setSelectedTopic(topic);
    // Navigate to the topic detail page with the new URL
    navigate(`/topics/${topic.id}`);
  };

  // Handle back button click
  const handleBackClick = () => {
    setSelectedTopic(null);
    // Update URL to the topics list
    navigate("/topics");
  };

  // Filter topics based on search and level filter
  const filteredTopics = topics.filter((topic) => {
    const matchesSearch = searchQuery
      ? topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.topics.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true;

    const matchesLevel = levelFilter ? topic.level === levelFilter : true;

    return matchesSearch && matchesLevel;
  });

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
                <h1 className="text-4xl font-bold">Java Learning Topics</h1>
                <p className="text-xl text-muted-foreground">
                  Explore our comprehensive Java curriculum designed to take you
                  from beginner to advanced.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4 sm:flex-row sm:items-center mt-6"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      // Update URL with search query
                      const params = new URLSearchParams();
                      if (e.target.value) {
                        params.set("q", e.target.value);
                      }
                      navigate(`/topics?${params.toString()}`);
                    }}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  {["All", "Beginner", "Intermediate", "Advanced"].map(
                    (level) => (
                      <Button
                        key={level}
                        variant={levelFilter === level ? "default" : "outline"}
                        onClick={() =>
                          setLevelFilter(level === "All" ? null : level)
                        }
                        className="min-w-[100px]"
                      >
                        {level}
                      </Button>
                    )
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8"
              >
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((topic) => (
                    <EnhancedTopicCard
                      key={topic.id}
                      topic={topic}
                      onClick={() => handleCardClick(topic)}
                      progress={getCompletionPercentage(topic.id)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-lg font-medium mb-2">
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
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
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
