import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    role: "Software Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    fallback: "JD",
    content:
      "ByteForge helped me transition from a complete beginner to a confident Java developer in just 3 months. The interactive compiler and AI assistant were game-changers for my learning.",
    rating: 5,
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    name: "Jane Smith",
    role: "Computer Science Student",
    avatar: "/placeholder.svg?height=40&width=40",
    fallback: "JS",
    content:
      "The structured learning path and note-taking features helped me ace my Java course at university. I particularly loved how I could save code snippets and concepts for exam review.",
    rating: 5,
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    name: "Robert Johnson",
    role: "Career Switcher",
    avatar: "/placeholder.svg?height=40&width=40",
    fallback: "RJ",
    content:
      "After 10 years in marketing, I decided to switch to programming. ByteForge made learning Java approachable and fun. I'm now working as a junior developer thanks to this platform!",
    rating: 5,
    color: "text-green-500",
    gradient: "from-green-500/20 to-green-500/5",
  },
];

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

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
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
          `before:${testimonial.gradient}`
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.fallback}</AvatarFallback>
              </Avatar>
            </motion.div>
            <div>
              <CardTitle className="text-base">{testimonial.name}</CardTitle>
              <CardDescription>{testimonial.role}</CardDescription>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: i * 0.1,
                    }}
                  >
                    <Star
                      className={cn("h-4 w-4 fill-current", testimonial.color)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.p
            className="text-sm text-slate-500 dark:text-slate-400 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-2xl font-serif text-slate-300 dark:text-slate-600 mr-1">
              "
            </span>
            {testimonial.content}
            <span className="text-2xl font-serif text-slate-300 dark:text-slate-600 ml-1">
              "
            </span>
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TestimonialSection = () => {
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our Students Say
            </h2>
            <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
              Join thousands of satisfied learners who have transformed their
              Java skills with ByteForge
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
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
