import { motion, Variants } from "framer-motion";
import {
  Zap,
  BookOpen,
  Code,
  Layout,
  CheckCircle,
  Award,
  FileCode,
  Users,
} from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Structured Curriculum",
    description:
      "Progress through our carefully designed learning path that builds your Java skills from the ground up.",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Interactive Code Examples",
    description:
      "Learn by doing with runnable code examples that you can edit and experiment with in real-time.",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Progress Tracking",
    description:
      "Keep track of your learning journey with detailed progress metrics and completion certificates.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Hands-on Exercises",
    description:
      "Solidify your understanding with practical coding exercises and real-world project challenges.",
  },
  {
    icon: <FileCode className="h-6 w-6" />,
    title: "Coding Quizzes",
    description:
      "Test your knowledge with interactive quizzes after each topic to reinforce your learning.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Support",
    description:
      "Join our community of learners to share knowledge, ask questions, and collaborate on projects.",
  },
];

const FeaturesSection = () => {
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

  return (
    <section className="py-16 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Master Java
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            ByteForge provides a comprehensive learning experience with features
            designed to optimize your Java programming journey.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow"
            >
              <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                <div className="text-primary">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
