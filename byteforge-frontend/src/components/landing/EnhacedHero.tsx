import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";

const EnhancedHero = () => {
  const navigate = useNavigate();
  const { getCompletionPercentage } = useProgress();
  const [activeUsers, setActiveUsers] = useState(0);

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

  // Calculate most popular topics
  const popularTopics = [...topics]
    .sort((a, b) => Math.random() * 100 - Math.random() * 100) // Just for demonstration
    .slice(0, 3);

  // Get recommended next topic based on user progress
  const getRecommendedNextTopic = () => {
    // This would be based on user's actual progress
    const inProgressTopics = topics.filter((topic) => {
      const progress = getCompletionPercentage(topic.id);
      return progress > 0 && progress < 100;
    });

    return inProgressTopics[0] || topics[0];
  };

  const recommendedTopic = getRecommendedNextTopic();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
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

  const pathItemVariants = {
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

  return (
    <motion.div
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/3 w-64 h-64 bg-cyan-500/20 rounded-full filter blur-3xl"></div>

        {/* Code-like patterns in background */}
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
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Hero Content */}
          <motion.div className="space-y-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Badge className="mb-4 px-3 py-1 text-sm bg-blue-500/20 text-blue-200 hover:bg-blue-500/30 transition-colors border-0">
                <Coffee className="w-3 h-3 mr-1" />
                <span>Java Learning Platform</span>
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Master Java Programming with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  {" "}
                  ByteForge
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl">
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
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0"
                onClick={() => navigate("/topics")}
              >
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-slate-500 text-slate-300 hover:bg-slate-700 hover:text-white"
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
                <div className="bg-green-500/20 p-2 rounded-full">
                  <Award className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">{topics.length}</div>
                  <div className="text-sm text-slate-400">Topics</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <Code className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">250+</div>
                  <div className="text-sm text-slate-400">Code Examples</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-purple-500/20 p-2 rounded-full">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {activeUsers.toLocaleString()}
                    </motion.span>
                  </div>
                  <div className="text-sm text-slate-400">Active Learners</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Learning Path Visualization */}
          <motion.div className="relative" variants={containerVariants}>
            <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl border border-slate-700 p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <LineChart className="mr-2 h-5 w-5 text-blue-400" />
                Your Learning Path
              </h3>

              <div className="relative">
                {/* Connection lines between nodes */}
                <div className="absolute left-10 top-10 h-[calc(100%-32px)] w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500"></div>

                {/* Learning path nodes */}
                <div className="space-y-10">
                  {/* Completed Node */}
                  <motion.div
                    className="flex items-start gap-4"
                    variants={pathItemVariants}
                  >
                    <div className="flex-shrink-0 w-5">
                      <div className="h-5 w-5 rounded-full bg-green-500 border-4 border-slate-800 z-10 relative"></div>
                    </div>
                    <div className="bg-slate-700/60 rounded-lg p-4 flex-grow">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-400 border-0 mb-2"
                        >
                          Completed
                        </Badge>
                        <span className="text-sm text-green-400">100%</span>
                      </div>
                      <h4 className="font-medium">Java Basics</h4>
                      <div className="h-1.5 w-full bg-slate-600 rounded-full mt-2 overflow-hidden">
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
                      <div className="h-5 w-5 rounded-full bg-blue-500 border-4 border-slate-800 z-10 relative"></div>
                    </div>
                    <div className="bg-slate-700/60 rounded-lg p-4 flex-grow">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className="bg-blue-500/10 text-blue-400 border-0 mb-2"
                        >
                          In Progress
                        </Badge>
                        <span className="text-sm text-blue-400">45%</span>
                      </div>
                      <h4 className="font-medium">{recommendedTopic.title}</h4>
                      <div className="h-1.5 w-full bg-slate-600 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full w-[45%]"></div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-3 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-0 h-auto"
                        onClick={() =>
                          navigate(`/topics/${recommendedTopic.id}`)
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
                      <div className="h-5 w-5 rounded-full bg-purple-500/50 border-4 border-slate-800 z-10 relative"></div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4 flex-grow">
                      <Badge
                        variant="outline"
                        className="bg-purple-500/10 text-purple-400 border-0 mb-2"
                      >
                        Up Next
                      </Badge>
                      <h4 className="font-medium">Advanced Java Concepts</h4>
                      <div className="h-1.5 w-full bg-slate-600 rounded-full mt-2"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating badges for popular topics */}
            <motion.div
              className="absolute -top-4 -right-4 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 rounded-lg px-3 py-2 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-medium">
                  Popular: {popularTopics[0]?.title}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedHero;
