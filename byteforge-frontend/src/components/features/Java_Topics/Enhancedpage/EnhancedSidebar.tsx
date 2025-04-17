import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { topics } from "@/data/topics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProgress } from "@/context/ProgressContex";
import {
  Book,
  Code,
  CheckCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Topic category definitions - using the actual topic IDs from your data
const topicCategories = [
  {
    id: "java-fundamentals",
    label: "Java Fundamentals",
    icon: <Book className="h-4 w-4" />,
    topics: ["java-basics"],
  },
  {
    id: "object-oriented",
    label: "Object-Oriented Programming",
    icon: <Code className="h-4 w-4" />,
    topics: ["oop-java"],
  },
  {
    id: "data-structures",
    label: "Data Structures",
    icon: <Code className="h-4 w-4" />,
    topics: ["java-collections"],
  },
  {
    id: "error-handling",
    label: "Exception Handling",
    icon: <Code className="h-4 w-4" />,
    topics: ["exception-handling"],
  },
  {
    id: "io-files",
    label: "I/O & Files",
    icon: <Code className="h-4 w-4" />,
    topics: ["java-io"],
  },
  {
    id: "concurrency",
    label: "Multithreading",
    icon: <Code className="h-4 w-4" />,
    topics: ["multithreading"],
  },
];

const EnhancedSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { progress, getCompletionPercentage } = useProgress();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    topicCategories.map((cat) => cat.id) // All categories expanded by default
  );

  // Get current topic from URL path
  const currentPath = location.pathname;
  const currentTopicId = currentPath.split("/topics/")[1]?.split("/")[0];
  const handleTopicClick = (topicId: string) => {
    // Use navigate function to go to the topic detail page
    navigate(`/topics/${topicId}`);
  };
  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isTopicActive = (topicId: string) => {
    return currentTopicId === topicId;
  };

  return (
    <div className="flex flex-col w-full h-full border-r p-4 space-y-4 bg-white dark:bg-slate-950">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Java Topics</h2>

        <div className="space-y-1 mt-4">
          {topicCategories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id);

            return (
              <div key={category.id} className="space-y-1">
                {/* Category header */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between font-medium text-left"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <span>{category.label}</span>
                  </div>
                  <div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </Button>

                {/* Category topics */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 space-y-1 py-1">
                        {category.topics.map((topicId) => {
                          // Find the topic by ID from the topics array
                          const topic = topics.find((t) => t.id === topicId);

                          // Skip if topic not found
                          if (!topic) return null;

                          const completionPercentage = getCompletionPercentage(
                            topic.id
                          );
                          const isActive = isTopicActive(topic.id);

                          return (
                            <Button
                              key={topic.id}
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "w-full justify-between pl-4 pr-2 py-1 h-auto text-left",
                                isActive
                                  ? "bg-slate-100 dark:bg-slate-800 font-medium"
                                  : "text-slate-700 dark:text-slate-300"
                              )}
                              onClick={() => navigate(`/topics/${topic.id}`)}
                            >
                              <span className="truncate">{topic.title}</span>

                              {completionPercentage > 0 && (
                                <div className="flex items-center gap-1 text-xs">
                                  {completionPercentage === 100 ? (
                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                  ) : (
                                    <span className="text-xs text-slate-400">
                                      {completionPercentage}%
                                    </span>
                                  )}
                                </div>
                              )}
                            </Button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* This area could contain topic details or other dynamic content */}
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => navigate("/topics")}
      >
        View All Topics
      </Button>
    </div>
  );
};

export default EnhancedSidebar;
