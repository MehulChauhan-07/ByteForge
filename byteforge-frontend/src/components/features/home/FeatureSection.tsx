import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Code,
  MessageSquare,
  BookOpen,
  Save,
  Laptop,
  Users,
  ArrowRight,
} from "lucide-react";
import {motion, type Variant, type Variants} from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "Integrated Java Compiler",
    description: "Write, compile, and run Java code directly in your browser",
    content:
      "Our compiler supports the latest Java features and provides real-time error checking and suggestions. Sign in required to save your code.",
    link: "/compiler",
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "AI-Powered Assistant",
    description: "Get instant help with coding problems and concepts",
    content:
      "Our intelligent chatbot provides personalized guidance, explains complex topics, and helps debug your code. Sign in required to access this feature.",
    link: "/assistant",
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    icon: <Save className="h-6 w-6" />,
    title: "Smart Note-Taking",
    description: "Save important concepts and code snippets for later review",
    content:
      "Organize your learning journey with our powerful note-taking system that integrates with lessons and exercises. Sign in required to save notes.",
    link: "/notes",
    color: "text-green-500",
    gradient: "from-green-500/20 to-green-500/5",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Structured Learning Path",
    description: "Follow a clear progression from basics to advanced topics",
    content:
      "Our curriculum is designed by Java experts to ensure you build a solid foundation and progress logically.",
    link: "/courses",
    color: "text-orange-500",
    gradient: "from-orange-500/20 to-orange-500/5",
  },
  {
    icon: <Laptop className="h-6 w-6" />,
    title: "Interactive Exercises",
    description: "Practice with hands-on coding challenges and projects",
    content:
      "Reinforce your learning with practical exercises that test your understanding and build real-world skills.",
    link: "/exercises",
    color: "text-red-500",
    gradient: "from-red-500/20 to-red-500/5",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Support",
    description: "Connect with other learners and Java experts",
    content:
      "Join our active community to share knowledge, collaborate on projects, and get additional help when needed.",
    link: "/community",
    color: "text-indigo-500",
    gradient: "from-indigo-500/20 to-indigo-500/5",
  },
];

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
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          "hover:shadow-lg dark:hover:shadow-slate-800/50",
          "before:absolute before:inset-0 before:bg-gradient-to-b before:opacity-0 before:transition-opacity",
          "hover:before:opacity-100",
          `before:${feature.gradient}`
        )}
      >
        <CardHeader className="pb-2">
          <motion.div
            className={cn("mb-2", feature.color)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {feature.icon}
          </motion.div>
          <CardTitle className="text-xl">{feature.title}</CardTitle>
          <CardDescription>{feature.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {feature.content}
          </p>
          <Button
            variant="ghost"
            className="group/button p-0 h-auto hover:bg-transparent"
            asChild
          >
            <Link
              to={feature.link}
              className="inline-flex items-center gap-1 text-sm font-medium"
            >
              Learn more
              <motion.span
                className="inline-block transition-transform group-hover/button:translate-x-1"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FeatureSection = () => {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
              Key Features of ByteForge
            </h2>
            <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
              Everything you need to master Java programming in one place
            </p>
          </div>
        </motion.div>
        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
