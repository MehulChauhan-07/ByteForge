import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/layout/ThemeProvider";
import {
  ChevronRight,
  BookOpen,
  Code,
  Database,
  Network,
  AlertTriangle,
  File,
} from "lucide-react";
import { topics, categories } from "@/data/topics";

// Define icons for categories
const categoryIcons: Record<string, JSX.Element> = {
  "java-fundamentals": <BookOpen className="h-4 w-4" />,
  "object-oriented": <Code className="h-4 w-4" />,
  "data-structures": <Database className="h-4 w-4" />,
  "error-handling": <AlertTriangle className="h-4 w-4" />,
  "io-files": <File className="h-4 w-4" />,
  concurrency: <Network className="h-4 w-4" />,
};

const ModernLearningPathPreview = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  // Get topics for the active category
  const categoryTopics = topics.filter(
    (topic) => topic.category === activeCategory
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  // Get level badge colors
  const getLevelColor = (level: string) => {
    const colorMap: Record<string, { light: string; dark: string }> = {
      Beginner: {
        light: "bg-green-100 text-green-800",
        dark: "bg-green-900/30 text-green-400",
      },
      Intermediate: {
        light: "bg-blue-100 text-blue-800",
        dark: "bg-blue-900/30 text-blue-400",
      },
      Advanced: {
        light: "bg-purple-100 text-purple-800",
        dark: "bg-purple-900/30 text-purple-400",
      },
    };

    return theme === "dark" ? colorMap[level].dark : colorMap[level].light;
  };

  return (
    <section
      className={`py-16 md:py-24 ${
        theme === "dark"
          ? "bg-gradient-to-b from-slate-950 to-slate-900"
          : "bg-gradient-to-b from-slate-50 to-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Your Java Learning Roadmap
          </motion.h2>
          <motion.p
            className={`text-lg ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our curriculum is designed to guide you through Java programming
            concepts in an optimal learning sequence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories sidebar */}
          <motion.div
            className={`lg:border-r lg:pr-6 ${
              theme === "dark" ? "border-slate-800" : "border-slate-200"
            }`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3
              className={`text-lg font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Topic Categories
            </h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                    activeCategory === category.id
                      ? theme === "dark"
                        ? "bg-blue-900/30 text-blue-400 font-medium"
                        : "bg-blue-50 text-blue-700 font-medium"
                      : theme === "dark"
                      ? "hover:bg-slate-800 text-slate-300"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {categoryIcons[category.id] || (
                    <BookOpen className="h-4 w-4" />
                  )}
                  <span>{category.title}</span>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <Button
                onClick={() => navigate("/topics")}
                className={`w-full ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : ""
                }`}
              >
                View All Topics
              </Button>
            </div>
          </motion.div>

          {/* Topics path visualization */}
          <div className="lg:col-span-3">
            <motion.div
              className={`rounded-xl overflow-hidden shadow-sm ${
                theme === "dark"
                  ? "bg-slate-800/50 border border-slate-700"
                  : "bg-white border border-slate-200"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div
                className={`px-6 py-4 border-b ${
                  theme === "dark" ? "border-slate-700" : "border-slate-200"
                }`}
              >
                <h3
                  className={`font-bold text-xl ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  {categories.find((c) => c.id === activeCategory)?.title}
                </h3>
                <p
                  className={`${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  } text-sm mt-1`}
                >
                  {categories.find((c) => c.id === activeCategory)?.description}
                </p>
              </div>

              <div className="p-6">
                <motion.div
                  className="relative"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  key={activeCategory} // Re-render animation when category changes
                >
                  {/* Connection line */}
                  <div
                    className={`absolute left-4 top-4 h-[calc(100%-32px)] w-0.5 ${
                      theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                    }`}
                  ></div>

                  {/* Topic nodes */}
                  <div className="space-y-6">
                    {categoryTopics.length > 0 ? (
                      categoryTopics.map((topic, index) => (
                        <motion.div
                          key={topic.id}
                          variants={itemVariants}
                          className="flex gap-4"
                        >
                          <div className="relative z-10">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                                index === 0
                                  ? theme === "dark"
                                    ? "bg-green-600"
                                    : "bg-green-500"
                                  : index === categoryTopics.length - 1
                                  ? theme === "dark"
                                    ? "bg-purple-600"
                                    : "bg-purple-500"
                                  : theme === "dark"
                                  ? "bg-blue-600"
                                  : "bg-blue-500"
                              }`}
                            >
                              {index + 1}
                            </div>
                          </div>

                          <motion.div
                            className={`flex-grow rounded-lg p-4 ${
                              theme === "dark"
                                ? "bg-slate-800 border border-slate-700 hover:border-blue-500/50"
                                : "bg-slate-50 border border-slate-200 hover:border-blue-500/50"
                            } hover:shadow-md transition-all`}
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-grow">
                                <h4
                                  className={`font-medium text-lg ${
                                    theme === "dark"
                                      ? "text-white"
                                      : "text-slate-900"
                                  }`}
                                >
                                  {topic.title}
                                </h4>
                                <p
                                  className={`${
                                    theme === "dark"
                                      ? "text-slate-400"
                                      : "text-slate-600"
                                  } text-sm mt-1`}
                                >
                                  {topic.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-3">
                                  <span
                                    className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full ${getLevelColor(
                                      topic.level
                                    )}`}
                                  >
                                    {topic.level}
                                  </span>
                                  <span
                                    className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full ${
                                      theme === "dark"
                                        ? "bg-slate-700 text-slate-300"
                                        : "bg-slate-200 text-slate-700"
                                    }`}
                                  >
                                    {topic.duration}
                                  </span>
                                  <span
                                    className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full ${
                                      theme === "dark"
                                        ? "bg-slate-700 text-slate-300"
                                        : "bg-slate-200 text-slate-700"
                                    }`}
                                  >
                                    {topic.subtopics?.length ||
                                      topic.topics?.length ||
                                      0}{" "}
                                    subtopics
                                  </span>
                                </div>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                className={`ml-4 flex-shrink-0 ${
                                  theme === "dark"
                                    ? "text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
                                    : "text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                                }`}
                                onClick={() => navigate(`/topics/${topic.id}`)}
                              >
                                <ChevronRight className="h-5 w-5" />
                              </Button>
                            </div>
                          </motion.div>
                        </motion.div>
                      ))
                    ) : (
                      <div
                        className={`text-center py-10 ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        No topics found for this category.
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              <div
                className={`px-6 py-4 border-t ${
                  theme === "dark" ? "border-slate-700" : "border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Learn at your own pace
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      theme === "dark" ? "border-slate-700 text-slate-300" : ""
                    }
                    onClick={() => navigate("/roadmap")}
                  >
                    Full Roadmap
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernLearningPathPreview;
