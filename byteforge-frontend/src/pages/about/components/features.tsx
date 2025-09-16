import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { BookOpen, Code, MessageSquare, Users } from "lucide-react";

// Animation variants
const containerVariants: Variants = {
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

// Feature highlights
const features = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "Integrated Java Compiler",
    description: "Write, run, and debug Java code directly in your browser.",
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "AI-Powered Assistance",
    description: "Get instant help with coding problems and concepts.",
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Structured Learning Paths",
    description: "Follow a clear progression from basics to advanced topics.",
    color: "text-green-500",
    gradient: "from-green-500/20 to-green-500/5",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Support",
    description: "Join a vibrant community of learners and educators.",
    color: "text-orange-500",
    gradient: "from-orange-500/20 to-orange-500/5",
  },
];

const FeatureCard = ({ feature }: { feature: (typeof features)[0] }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={cn(
        "rounded-lg p-6 border border-slate-200 dark:border-slate-800",
        "group relative overflow-hidden transition-all duration-300",
        "hover:shadow-lg dark:hover:shadow-slate-800/50",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:opacity-0 before:transition-opacity",
        "hover:before:opacity-100",
        `before:${feature.gradient}`
      )}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={cn(
            "p-3 rounded-full bg-slate-100 dark:bg-slate-800",
            feature.color
          )}
        >
          {feature.icon}
        </motion.div>
        <div>
          <h3 className="text-xl font-bold">{feature.title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
export { features, FeatureCard };
