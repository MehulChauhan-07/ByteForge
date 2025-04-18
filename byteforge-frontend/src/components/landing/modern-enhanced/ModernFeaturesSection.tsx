import { motion } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";
import {
  Zap,
  BookOpen,
  Code,
  Layout,
  CheckCircle,
  Award,
  FileCode,
  Users,
  Brain,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Structured Curriculum",
    description:
      "Progress through our carefully designed learning path that builds your Java skills from the ground up.",
    color: "blue",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Interactive Code Examples",
    description:
      "Learn by doing with runnable code examples that you can edit and experiment with in real-time.",
    color: "green",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Progress Tracking",
    description:
      "Keep track of your learning journey with detailed progress metrics and completion certificates.",
    color: "purple",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Hands-on Exercises",
    description:
      "Solidify your understanding with practical coding exercises and real-world project challenges.",
    color: "amber",
  },
  {
    icon: <FileCode className="h-6 w-6" />,
    title: "Coding Quizzes",
    description:
      "Test your knowledge with interactive quizzes after each topic to reinforce your learning.",
    color: "pink",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Support",
    description:
      "Join our community of learners to share knowledge, ask questions, and collaborate on projects.",
    color: "cyan",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI-Powered Assistance",
    description:
      "Get intelligent help and personalized recommendations to accelerate your learning process.",
    color: "indigo",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Industry-Ready Skills",
    description:
      "Develop programming skills that align with current industry standards and best practices.",
    color: "emerald",
  },
];

const ModernFeaturesSection = () => {
  const { theme } = useTheme();

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

  // Get color classes based on theme and color name
  const getColorClasses = (color: string, isBackground = true) => {
    const colorMap: Record<
      string,
      {
        bg: { light: string; dark: string };
        text: { light: string; dark: string };
      }
    > = {
      blue: {
        bg: { light: "bg-blue-50", dark: "bg-blue-900/20" },
        text: { light: "text-blue-600", dark: "text-blue-400" },
      },
      green: {
        bg: { light: "bg-green-50", dark: "bg-green-900/20" },
        text: { light: "text-green-600", dark: "text-green-400" },
      },
      purple: {
        bg: { light: "bg-purple-50", dark: "bg-purple-900/20" },
        text: { light: "text-purple-600", dark: "text-purple-400" },
      },
      amber: {
        bg: { light: "bg-amber-50", dark: "bg-amber-900/20" },
        text: { light: "text-amber-600", dark: "text-amber-400" },
      },
      pink: {
        bg: { light: "bg-pink-50", dark: "bg-pink-900/20" },
        text: { light: "text-pink-600", dark: "text-pink-400" },
      },
      cyan: {
        bg: { light: "bg-cyan-50", dark: "bg-cyan-900/20" },
        text: { light: "text-cyan-600", dark: "text-cyan-400" },
      },
      indigo: {
        bg: { light: "bg-indigo-50", dark: "bg-indigo-900/20" },
        text: { light: "text-indigo-600", dark: "text-indigo-400" },
      },
      emerald: {
        bg: { light: "bg-emerald-50", dark: "bg-emerald-900/20" },
        text: { light: "text-emerald-600", dark: "text-emerald-400" },
      },
    };

    if (isBackground) {
      return theme === "dark"
        ? colorMap[color].bg.dark
        : colorMap[color].bg.light;
    } else {
      return theme === "dark"
        ? colorMap[color].text.dark
        : colorMap[color].text.light;
    }
  };

  return (
    <section
      className={`py-20 ${theme === "dark" ? "bg-slate-900" : "bg-white"}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Everything You Need to Master Java
          </h2>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}
          >
            ByteForge provides a comprehensive learning experience with features
            designed to optimize your Java programming journey.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`p-6 rounded-xl border transition-all ${
                theme === "dark"
                  ? "bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20"
                  : "bg-white border-slate-200 hover:shadow-xl hover:shadow-slate-200/50"
              }`}
            >
              <div
                className={`rounded-full p-3 w-fit mb-4 ${getColorClasses(
                  feature.color
                )}`}
              >
                <div className={getColorClasses(feature.color, false)}>
                  {feature.icon}
                </div>
              </div>
              <h3
                className={`text-xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Total Learning Stats */}
        <motion.div
          className={`mt-16 rounded-xl p-8 ${
            theme === "dark"
              ? "bg-gradient-to-r from-slate-800 to-slate-800/50 border border-slate-700"
              : "bg-gradient-to-r from-slate-50 to-white border border-slate-200"
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                className={`text-4xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                500+
              </div>
              <p
                className={`${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Learning Hours
              </p>
            </div>
            <div className="text-center">
              <div
                className={`text-4xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                50+
              </div>
              <p
                className={`${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Practice Projects
              </p>
            </div>
            <div className="text-center">
              <div
                className={`text-4xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                300+
              </div>
              <p
                className={`${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Code Examples
              </p>
            </div>
            <div className="text-center">
              <div
                className={`text-4xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                1000+
              </div>
              <p
                className={`${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Quiz Questions
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernFeaturesSection;
