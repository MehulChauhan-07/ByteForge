import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, ChevronRight, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Topic } from "@/types";

interface EnhancedTopicCardProps {
  topic: Topic;
  onClick: () => void;
  onBookmarkClick: (e: React.MouseEvent) => void;
  isBookmarked: boolean;
}

export const EnhancedTopicCard = ({
  topic,
  onClick,
  onBookmarkClick,
  isBookmarked,
}: EnhancedTopicCardProps) => {
  // Function to determine badge variant based on level
  const levelVariant = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "default";
      case "intermediate":
        return "secondary";
      case "advanced":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-slate-950 border rounded-lg overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative">
        {/* Topic illustration or placeholder */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <BookOpen className="h-16 w-16 text-white opacity-50" />
        </div>

        {/* Bookmark button */}
        <button
          className="absolute top-3 right-3 p-1.5 bg-white/90 dark:bg-slate-900/90 rounded-full shadow-sm hover:bg-white dark:hover:bg-slate-900 transition-colors"
          onClick={(e) => onBookmarkClick(e)}
        >
          <Bookmark
            className={`h-4 w-4 ${
              isBookmarked
                ? "fill-current text-yellow-500"
                : "text-muted-foreground"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {topic.title}
          </h3>
          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
        </div>

        <p className="text-muted-foreground mt-1 mb-3 text-sm line-clamp-2">
          {topic.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant={levelVariant(topic.level)}>{topic.level}</Badge>

          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{topic.duration}</span>
          </Badge>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          {topic.subtopics?.length ?? 0} subtopics
        </div>
      </div>
    </motion.div>
  );
};
