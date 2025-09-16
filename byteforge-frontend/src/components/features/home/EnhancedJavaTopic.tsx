import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { topics, categories } from "@/data/topics";
import EnhancedHero from "@/components/landing/default/EnhacedHero";

const EnhancedJavaTopic = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  // Get topics for the active category
  const categoryTopics = topics.filter(
    (topic) => topic.category === activeCategory
  );

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Java Learning Roadmap
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Our curriculum is designed to guide you through Java programming
            concepts in an optimal learning sequence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories sidebar */}
          <div className="lg:border-r lg:pr-6 dark:border-slate-800">
            <h3 className="text-lg font-bold mb-4">Topic Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === category.id
                      ? "bg-primary text-white font-medium"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.title}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <Button onClick={() => navigate("/topics")} className="w-full">
                View All Topics
              </Button>
            </div>
          </div>

          {/* Topics path visualization */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                <h3 className="font-bold text-xl">
                  {categories.find((c) => c.id === activeCategory)?.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                  {categories.find((c) => c.id === activeCategory)?.description}
                </p>
              </div>

              <div className="p-6">
                <motion.div
                  className="relative"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key={activeCategory} // Re-render animation when category changes
                >
                  {/* Connection line */}
                  <div className="absolute left-4 top-4 h-[calc(100%-32px)] w-0.5 bg-slate-200 dark:bg-slate-800"></div>

                  {/* Topic nodes */}
                  <div className="space-y-6">
                    {categoryTopics.map((topic, index) => (
                      <motion.div
                        key={topic.id}
                        variants={itemVariants}
                        className="flex gap-4"
                      >
                        <div className="relative z-10">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                              index === 0
                                ? "bg-green-500"
                                : index === categoryTopics.length - 1
                                ? "bg-purple-500"
                                : "bg-blue-500"
                            }`}
                          >
                            {index + 1}
                          </div>
                        </div>

                        <div className="flex-grow bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-lg">
                                {topic.title}
                              </h4>
                              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                {topic.description}
                              </p>

                              <div className="flex flex-wrap gap-2 mt-3">
                                <span className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                  {topic.level}
                                </span>
                                <span className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                  {topic.duration}
                                </span>
                                <span className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
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
                              className="text-primary hover:bg-primary/10"
                              onClick={() => navigate(`/topics/${topic.id}`)}
                            >
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedJavaTopic;
