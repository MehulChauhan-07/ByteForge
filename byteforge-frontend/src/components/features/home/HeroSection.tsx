import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  BookOpen,
  Cpu,
  Sparkles,
  Terminal,
  Play,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { topics } from "@/data/topics";
import { AnimatedRoute } from "@/components/layout/motion-layout";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/components/layout/ThemeProvider"; // Your ThemeProvider path

const Hero = () => {
  const [topicCount, setTopicCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const { user } = useAuth();
  const { theme } = useTheme();
  // Get initials for avatar fallback

  // get user name from user context
  const userName = user?.username || "Developer";
  // Set up code examples with dynam  ic username
  const codeSteps = [
    {
      code: `System.out.println("Hello, ${userName} from ByteForge!");`,
      output: `Hello, ${userName} from ByteForge!`,
      explanation: "Basic output in Java",
    },
    {
      code: `String name = "${userName}";
System.out.println("Welcome, " + name);`,
      output: `Welcome, ${userName}`,
      explanation: "Working with variables",
    },
    {
      code: `for(int i = 1; i <= 3; i++) {
    System.out.println("Step " + i);
}`,
      output: "Step 1\nStep 2\nStep 3",
      explanation: "Loops in Java",
    },
  ];

  useEffect(() => {
    if (topics) {
      setTopicCount(topics.length);
    }
  }, []);

  // Auto-advance code steps
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % codeSteps.length);
      setIsTyping(true);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Simulate typing effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 relative">
      {/* <section
      className={`w-full py-12 md:py-24 lg:py-32 relative overflow-hidden transition-colors duration-300 
      ${
        theme === "dark"
          ? "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white"
          : "bg-gradient-to-b from-blue-50 via-white to-blue-50 text-slate-900"
      }`}
    > */}
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <AnimatedRoute
            animationType="slide"
            element={
              <>
                <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                  <motion.div
                    className="inline-flex items-center rounded-lg bg-blue-50 dark:bg-slate-800/60 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 max-w-fit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                    New! Interactive Java lessons available
                  </motion.div>

                  <div className="space-y-6">
                    {/* old title */}
                    {/* <motion.h1
                      className="text-4xl font-bold tracking-normal sm:text-5xl xl:text-6xl leading-snug bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600 dark:from-white dark:to-blue-400"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      Master Java Programming with ByteForge
                    </motion.h1> */}
                    {/* new title */}
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
                    <motion.p
                      className="max-w-[600px] text-slate-600 text-lg md:text-xl dark:text-slate-300 leading-relaxed sm:leading-loose"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      An intuitive learning platform designed to help you become
                      a Java expert through interactive lessons, real-time
                      coding, and AI-powered assistance.
                    </motion.p>
                  </div>

                  {/* Feature highlights with improved interactivity */}
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {[
                      {
                        icon: <Terminal className="h-5 w-5 text-primary" />,
                        label: "Live Compiler",
                        description: "Write & run code instantly",
                      },
                      {
                        icon: <BookOpen className="h-5 w-5 text-primary" />,
                        label: `${topicCount}+ Tutorials`,
                        description: "Comprehensive learning",
                      },
                      {
                        icon: <Cpu className="h-5 w-5 text-primary" />,
                        label: "AI Assistant",
                        description: "24/7 learning support",
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.label}
                        className="flex flex-col gap-1 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex items-center gap-2">
                          {feature.icon}
                          <span className="font-medium">{feature.label}</span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {feature.description}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    className="flex flex-col gap-3 min-[400px]:flex-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Button
                      asChild
                      size="lg"
                      className="bg-primary hover:bg-primary/90 transition-all duration-100 shadow-lg hover:shadow-xl hover:shadow-primary/20 group"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <Link to="/topics" className="flex items-center">
                        Start Learning Now{" "}
                        <motion.div
                          animate={{ x: isHovered ? 5 : 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.div>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="transition-all duration-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Link to="/login">Log In</Link>
                    </Button>
                  </motion.div>
                </div>
              </>
            }
          />

          {/* Right Column - Interactive Code Preview */}
          <AnimatedRoute
            animationType="slide"
            element={
              <>
                <motion.div
                  className="hidden lg:block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="relative w-full max-w-lg mx-auto">
                    <motion.div
                      className="rounded-lg shadow-2xl dark:shadow-blue-900/20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Editor Header */}
                      <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Terminal className="h-3 w-3" />
                          <span>Java Example {currentStep + 1}/3</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-xs"
                          onClick={() => {
                            setCurrentStep(
                              (prev) => (prev + 1) % codeSteps.length
                            );
                            setIsTyping(true);
                          }}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Run
                        </Button>
                      </div>

                      {/* Code Content */}
                      <div className="p-4 font-mono text-sm bg-slate-50 dark:bg-slate-900/50 min-h-[200px]">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="space-y-2"
                        >
                          <div className="text-slate-400 dark:text-slate-500 text-xs mb-2">
                            // {codeSteps[currentStep].explanation}
                          </div>
                          <pre className="text-slate-700 dark:text-slate-300">
                            <code>{codeSteps[currentStep].code}</code>
                          </pre>
                        </motion.div>
                      </div>

                      {/* Output Section */}
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 border-t border-slate-200 dark:border-slate-700">
                        <motion.div
                          key={`output-${currentStep}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: isTyping ? 0.5 : 0 }}
                          className="font-mono text-xs"
                        >
                          <div className="flex items-center gap-2 text-green-500 dark:text-green-400">
                            <CheckCircle className="h-3 w-3" />
                            <span>Output:</span>
                          </div>
                          <div className="mt-1 text-slate-700 dark:text-slate-300 whitespace-pre-line">
                            {codeSteps[currentStep].output}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute -z-10 inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 transform rotate-12 rounded-3xl blur-xl" />
                  </div>
                </motion.div>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
