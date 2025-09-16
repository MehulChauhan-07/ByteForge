import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronRight, CheckCircle2, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { topics } from "@/data/topics";
import { useProgress } from "@/context/ProgressContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchBar from "./SearchBar";

interface EnhancedSidebarProps {
  className?: string;
  isMobile?: boolean;
}

const EnhancedSidebar: React.FC<EnhancedSidebarProps> = ({
  className,
  isMobile = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isTopicComplete, isSubTopicComplete } = useProgress();
  const currentTopicId = location.pathname.split("/")[2];

  return (
    <div
      className={cn(
        "h-full bg-gradient-to-b from-background to-muted/20 backdrop-blur-sm border-r border-border/40 overflow-y-auto",
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Learning Path
          </h2>
          <Badge variant="outline" className="text-xs">
            {topics.length} Topics
          </Badge>
        </div>

        <div className="mb-6">
          <SearchBar variant={isMobile ? "mobile" : "desktop"} />
        </div>

        <nav className="space-y-2">
          {topics.map((topic) => {
            const isActive = topic.id === currentTopicId;
            const isCompleted = isTopicComplete(topic.id);

            return (
              <div key={topic.id} className="space-y-1">
                <motion.button
                  onClick={() => navigate(`/topics/${topic.id}`)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-sm rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted/50"
                  )}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-green-500"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                    )}
                    <span className="truncate">{topic.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        topic.level === "Beginner"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : topic.level === "Intermediate"
                          ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                          : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                      )}
                    >
                      {topic.level}
                    </Badge>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isActive && "rotate-90"
                      )}
                    />
                  </div>
                </motion.button>

                <AnimatePresence>
                  {isActive && topic.subtopics && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-8 space-y-1"
                    >
                      {topic.subtopics.map((subtopic) => {
                        // Use subtopicId which is the correct property name as per our type definition
                        const isSubTopicCompleted = isSubTopicComplete(
                          topic.id,
                          subtopic.subtopicId
                        );

                        return (
                          <motion.button
                            key={subtopic.subtopicId}
                            onClick={() =>
                              navigate(
                                `/topics/${topic.id}/${subtopic.subtopicId}`
                              )
                            }
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all duration-200",
                              isSubTopicCompleted
                                ? "text-green-500 hover:bg-green-500/5"
                                : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                            )}
                            whileHover={{ x: 4 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            }}
                          >
                            {isSubTopicCompleted ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-green-500"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </motion.div>
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                            )}
                            <span className="truncate">{subtopic.title}</span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default EnhancedSidebar;
