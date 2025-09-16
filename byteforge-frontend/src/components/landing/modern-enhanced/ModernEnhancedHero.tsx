import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/layout/ThemeProvider"; // Your ThemeProvider path
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProgress } from "@/context/ProgressContext";
import { topics, categories } from "@/data/topics";
import {
  BookOpen,
  Code,
  Rocket,
  Award,
  ArrowRight,
  LineChart,
  Users,
  Coffee,
  Search,
  ChevronRight,
} from "lucide-react";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
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

const pathItemVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const ModernHeroSection = () => {
  const navigate = useNavigate();
  const { getCompletionPercentage } = useProgress();
  const { theme, setTheme } = useTheme(); // Using your existing theme hook
  const [activeUsers, setActiveUsers] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Simulate increasing active users counter
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => {
        if (prev < 1250) return prev + 7;
        clearInterval(interval);
        return 1250;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Toggle theme function to work with your implementation
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Calculate recommended topics
  const recommendedTopics = [...topics]
    .sort((a, b) => {
      const progressA = getCompletionPercentage(a.id);
      const progressB = getCompletionPercentage(b.id);

      // Sort by in-progress topics first (those with some progress but not complete)
      if (
        progressA > 0 &&
        progressA < 100 &&
        (progressB === 0 || progressB === 100)
      ) {
        return -1;
      }
      if (
        progressB > 0 &&
        progressB < 100 &&
        (progressA === 0 || progressA === 100)
      ) {
        return 1;
      }
      // Then by not started topics
      if (progressA === 0 && progressB > 0) {
        return -1;
      }
      if (progressB === 0 && progressA > 0) {
        return 1;
      }
      // Default to newer topics
      return b.id.localeCompare(a.id);
    })
    .slice(0, 3);

  // Get current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div
      className={`relative overflow-hidden transition-colors duration-300
      ${
        theme === "dark"
          ? "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white"
          : "bg-gradient-to-b from-blue-50 via-white to-blue-50 text-slate-900"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Light theme background elements */}
        {theme !== "dark" && (
          <>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute top-1/2 -left-48 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-32 right-1/3 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl"></div>
          </>
        )}

        {/* Dark theme background elements */}
        {theme === "dark" && (
          <>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
            <div className="absolute top-1/2 -left-48 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-32 right-1/3 w-64 h-64 bg-cyan-500/20 rounded-full filter blur-3xl"></div>

            {/* Code-like patterns in background - dark mode only */}
            <div className="absolute inset-0 opacity-5">
              <pre className="text-xs sm:text-sm text-left overflow-hidden whitespace-pre-wrap break-all">
                {`public class JavaLearning {
  public static void main(String[] args) {
    System.out.println("Welcome to ByteForge");
    // Your learning journey begins here
    LearnJava.start();
    if(practice.consistent()) {
      Skills.improve();
    }
  }
}`}
              </pre>
            </div>
          </>
        )}
      </div>

      {/* Search button at top-right */}
      {/* <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className={`p-2 rounded-full transition-colors
            ${
              theme === "dark"
                ? "bg-slate-800 text-white hover:bg-slate-700"
                : "bg-white text-slate-800 hover:bg-slate-100 shadow-sm"
            }`}
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div> */}

      {/* Search overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="absolute inset-0 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-full max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search topics, lessons or concepts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full p-4 pl-12 rounded-xl text-lg
                    ${
                      theme === "dark"
                        ? "bg-slate-800 text-white border-slate-700 focus:border-blue-500"
                        : "bg-white text-slate-900 border-slate-200 focus:border-blue-500"
                    } 
                    border-2 outline-none transition-colors`}
                  autoFocus
                />
                <Search
                  className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5
                  ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                />
                <button
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full
                    ${
                      theme === "dark"
                        ? "text-slate-400 hover:bg-slate-700"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  onClick={() => setShowSearch(false)}
                >
                  ✕
                </button>
              </div>

              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 rounded-xl overflow-hidden
                    ${
                      theme === "dark"
                        ? "bg-slate-800 border border-slate-700"
                        : "bg-white shadow-lg"
                    }`}
                >
                  <div
                    className={`p-3
                    ${
                      theme === "dark"
                        ? "border-b border-slate-700"
                        : "border-b border-slate-100"
                    }`}
                  >
                    <p
                      className={`text-sm
                      ${
                        theme === "dark" ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Search results for "{searchQuery}"
                    </p>
                  </div>
                  <div className="p-1">
                    {topics
                      .filter(
                        (topic) =>
                          topic.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          topic.description
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          topic.tags?.some((tag) =>
                            tag
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          ) ||
                          topic.topics?.some((t: string) =>
                            t.toLowerCase().includes(searchQuery.toLowerCase())
                          ) 
                      )
                      .slice(0, 5)
                      .map((topic) => (
                        <button
                          key={topic.id}
                          className={`flex items-center w-full text-left p-3 rounded-lg
                            ${
                              theme === "dark"
                                ? "hover:bg-slate-700"
                                : "hover:bg-slate-50"
                            }`}
                          onClick={() => {
                            navigate(`/topics/${topic.id}`);
                            setShowSearch(false);
                          }}
                        >
                          <div
                            className={`p-2 rounded-full mr-3
                            ${
                              theme === "dark" ? "bg-slate-700" : "bg-slate-100"
                            }`}
                          >
                            <BookOpen
                              className={`h-4 w-4
                              ${
                                theme === "dark"
                                  ? "text-blue-400"
                                  : "text-blue-500"
                              }`}
                            />
                          </div>
                          <div className="flex-grow">
                            <h3
                              className={`font-medium
                              ${
                                theme === "dark"
                                  ? "text-white"
                                  : "text-slate-900"
                              }`}
                            >
                              {topic.title}
                            </h3>
                            <p
                              className={`text-sm truncate
                              ${
                                theme === "dark"
                                  ? "text-slate-400"
                                  : "text-slate-500"
                              }`}
                            >
                              {topic.description}
                            </p>
                          </div>
                          <ChevronRight
                            className={`h-4 w-4
                            ${
                              theme === "dark"
                                ? "text-slate-500"
                                : "text-slate-400"
                            }`}
                          />
                        </button>
                      ))}
                  </div>
                  <div
                    className={`p-3 text-center
                    ${
                      theme === "dark"
                        ? "border-t border-slate-700"
                        : "border-t border-slate-100"
                    }`}
                  >
                    <button
                      className={`text-sm font-medium
                        ${
                          theme === "dark"
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-blue-600 hover:text-blue-700"
                        }`}
                      onClick={() => {
                        navigate(`/topics?q=${searchQuery}`);
                        setShowSearch(false);
                      }}
                    >
                      See all results
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main hero content */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Hero Content */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Badge
                className={`mb-4 px-3 py-1 text-sm border-0 inline-flex items-center gap-1
                  ${
                    theme === "dark"
                      ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
              >
                <Coffee className="w-3 h-3" />
                <span>Updated {currentDate}</span>
              </Badge>

              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight
                ${theme === "dark" ? "text-white" : "text-slate-900"}`}
              >
                Master Java Programming with
                <span
                  className={`${
                    theme === "dark"
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
                      : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"
                  }`}
                >
                  {" "}
                  ByteForge
                </span>
              </h1>

              <p
                className={`text-lg md:text-xl leading-relaxed max-w-xl
                ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}
              >
                Interactive tutorials, hands-on coding exercises, and a
                structured curriculum to take you from beginner to advanced Java
                developer.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 items-center"
              variants={itemVariants}
            >
              <Button
                size="lg"
                className={`${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0"
                    : "bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white border-0"
                }`}
                onClick={() => navigate("/topics")}
              >
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className={`${
                  theme === "dark"
                    ? "border-slate-500 text-slate-300 hover:bg-slate-700 hover:text-white"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
                onClick={() => navigate("/roadmap")}
              >
                View Roadmap
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-full
                  ${theme === "dark" ? "bg-green-500/20" : "bg-green-100"}`}
                >
                  <Award
                    className={`h-5 w-5
                    ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
                  />
                </div>
                <div>
                  <div
                    className={`text-xl font-bold
                    ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                  >
                    {topics.length}
                  </div>
                  <div
                    className={`text-sm
                    ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Topics
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-full
                  ${theme === "dark" ? "bg-blue-500/20" : "bg-blue-100"}`}
                >
                  <Code
                    className={`h-5 w-5
                    ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
                  />
                </div>
                <div>
                  <div
                    className={`text-xl font-bold
                    ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                  >
                    250+
                  </div>
                  <div
                    className={`text-sm
                    ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Code Examples
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-full
                  ${theme === "dark" ? "bg-purple-500/20" : "bg-purple-100"}`}
                >
                  <Users
                    className={`h-5 w-5
                    ${
                      theme === "dark" ? "text-purple-400" : "text-purple-600"
                    }`}
                  />
                </div>
                <div>
                  <div
                    className={`text-xl font-bold
                    ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {activeUsers.toLocaleString()}
                    </motion.span>
                  </div>
                  <div
                    className={`text-sm
                    ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Active Learners
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Add your ModeToggle component here if you want it in the hero section */}
            <motion.div variants={itemVariants} className="mt-2">
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Prefer a different look?
              </p>
              <div className="mt-2">
                {/* You can import and use your ModeToggle component here */}
                <Button
                  variant="outline"
                  size="sm"
                  className={`${
                    theme === "dark"
                      ? "border-slate-700 bg-slate-800 text-slate-200"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                  onClick={toggleTheme}
                >
                  {theme === "dark"
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"}
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Learning Path Visualization */}
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Learning Path Card */}
            <div
              className={`rounded-2xl border p-6 shadow-xl
              ${
                theme === "dark"
                  ? "bg-slate-800/60 backdrop-blur-lg border-slate-700"
                  : "bg-white/80 backdrop-blur-lg border-slate-200"
              }`}
            >
              <h3
                className={`text-xl font-bold mb-4 flex items-center
                ${theme === "dark" ? "text-white" : "text-slate-900"}`}
              >
                <LineChart
                  className={`mr-2 h-5 w-5
                  ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
                />
                Your Learning Path
              </h3>

              <div className="relative">
                {/* Connection lines between nodes */}
                <div
                  className={`absolute left-10 top-10 h-[calc(100%-32px)] w-0.5 
                  ${
                    theme === "dark"
                      ? "bg-gradient-to-b from-green-500 via-blue-500 to-purple-500"
                      : "bg-gradient-to-b from-green-600 via-blue-600 to-purple-600"
                  }`}
                ></div>

                {/* Learning path nodes */}
                <div className="space-y-10">
                  {/* Completed Node */}
                  <motion.div
                    className="flex items-start gap-4"
                    variants={pathItemVariants}
                  >
                    <div className="flex-shrink-0 w-5">
                      <div
                        className={`h-5 w-5 rounded-full bg-green-500 z-10 relative
                        ${
                          theme === "dark"
                            ? "border-4 border-slate-800"
                            : "border-4 border-white"
                        }`}
                      ></div>
                    </div>
                    <div
                      className={`rounded-lg p-4 flex-grow
                      ${theme === "dark" ? "bg-slate-700/60" : "bg-slate-50"}`}
                    >
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className={`border-0 mb-2
                          ${
                            theme === "dark"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          Completed
                        </Badge>
                        <span
                          className={`text-sm
                          ${
                            theme === "dark"
                              ? "text-green-400"
                              : "text-green-600"
                          }`}
                        >
                          100%
                        </span>
                      </div>
                      <h4
                        className={`font-medium
                        ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                      >
                        Java Basics
                      </h4>
                      <div
                        className={`h-1.5 w-full rounded-full mt-2 overflow-hidden
                        ${theme === "dark" ? "bg-slate-600" : "bg-slate-200"}`}
                      >
                        <div className="h-full bg-green-500 rounded-full w-full"></div>
                      </div>
                    </div>
                  </motion.div>

                  {/* In Progress Node */}
                  <motion.div
                    className="flex items-start gap-4"
                    variants={pathItemVariants}
                  >
                    <div className="flex-shrink-0 w-5">
                      <div
                        className={`h-5 w-5 rounded-full bg-blue-500 z-10 relative
                        ${
                          theme === "dark"
                            ? "border-4 border-slate-800"
                            : "border-4 border-white"
                        }`}
                      ></div>
                    </div>
                    <div
                      className={`rounded-lg p-4 flex-grow
                      ${theme === "dark" ? "bg-slate-700/60" : "bg-slate-50"}`}
                    >
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className={`border-0 mb-2
                          ${
                            theme === "dark"
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          In Progress
                        </Badge>
                        <span
                          className={`text-sm
                          ${
                            theme === "dark" ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          45%
                        </span>
                      </div>
                      <h4
                        className={`font-medium
                        ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                      >
                        {recommendedTopics[0]?.title ||
                          "Object-Oriented Programming"}
                      </h4>
                      <div
                        className={`h-1.5 w-full rounded-full mt-2 overflow-hidden
                        ${theme === "dark" ? "bg-slate-600" : "bg-slate-200"}`}
                      >
                        <div className="h-full bg-blue-500 rounded-full w-[45%]"></div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`mt-3 p-0 h-auto
                          ${
                            theme === "dark"
                              ? "text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                              : "text-blue-600 hover:text-blue-700 hover:bg-blue-500/10"
                          }`}
                        onClick={() =>
                          navigate(
                            `/topics/${recommendedTopics[0]?.id || "oop-java"}`
                          )
                        }
                      >
                        Continue Learning
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </motion.div>

                  {/* Future Node */}
                  <motion.div
                    className="flex items-start gap-4"
                    variants={pathItemVariants}
                  >
                    <div className="flex-shrink-0 w-5">
                      <div
                        className={`h-5 w-5 rounded-full z-10 relative
                        ${
                          theme === "dark"
                            ? "bg-purple-500/50 border-4 border-slate-800"
                            : "bg-purple-300 border-4 border-white"
                        }`}
                      ></div>
                    </div>
                    <div
                      className={`rounded-lg p-4 flex-grow
                      ${
                        theme === "dark" ? "bg-slate-700/30" : "bg-slate-50/80"
                      }`}
                    >
                      <Badge
                        variant="outline"
                        className={`border-0 mb-2
                        ${
                          theme === "dark"
                            ? "bg-purple-500/10 text-purple-400"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        Up Next
                      </Badge>
                      <h4
                        className={`font-medium
                        ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                      >
                        {recommendedTopics[1]?.title ||
                          "Advanced Java Concepts"}
                      </h4>
                      <div
                        className={`h-1.5 w-full rounded-full mt-2
                        ${theme === "dark" ? "bg-slate-600" : "bg-slate-200"}`}
                      ></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating Popular Topic Badge */}
            <motion.div
              className={`absolute -top-4 -right-4 rounded-lg px-3 py-2 shadow-lg
                ${
                  theme === "dark"
                    ? "bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30"
                    : "bg-white backdrop-blur-md border border-blue-100"
                }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center gap-2">
                <Rocket
                  className={
                    theme === "dark"
                      ? "h-4 w-4 text-cyan-400"
                      : "h-4 w-4 text-cyan-600"
                  }
                />
                <span
                  className={`text-sm font-medium
                  ${theme === "dark" ? "text-cyan-300" : "text-slate-700"}`}
                >
                  Popular: {recommendedTopics[0]?.title || "Java Collections"}
                </span>
              </div>
            </motion.div>

            {/* Quick Access Topics Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
              variants={containerVariants}
            >
              {recommendedTopics.slice(0, 2).map((topic, index) => (
                <motion.div
                  key={topic.id}
                  className={`rounded-xl p-4 cursor-pointer
                    ${
                      theme === "dark"
                        ? "bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700"
                        : "bg-white hover:bg-slate-50 border border-slate-200 shadow-sm"
                    }`}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  onClick={() => navigate(`/topics/${topic.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full
                      ${theme === "dark" ? "bg-slate-700" : "bg-slate-100"}`}
                    >
                      {index === 0 ? (
                        <BookOpen
                          className={
                            theme === "dark"
                              ? "h-4 w-4 text-blue-400"
                              : "h-4 w-4 text-blue-600"
                          }
                        />
                      ) : (
                        <Code
                          className={
                            theme === "dark"
                              ? "h-4 w-4 text-green-400"
                              : "h-4 w-4 text-green-600"
                          }
                        />
                      )}
                    </div>
                    <div>
                      <h4
                        className={`font-medium text-sm
                        ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                      >
                        {topic.title}
                      </h4>
                      <p
                        className={`text-xs truncate mt-0.5
                        ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {topic.level} • {topic.duration}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernHeroSection;
