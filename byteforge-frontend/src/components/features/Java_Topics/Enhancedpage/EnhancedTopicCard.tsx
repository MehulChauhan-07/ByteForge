import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Clock,
  BookOpen,
  Tag,
  Calendar,
  Award,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Topic } from "@/types";

interface TopicCardProps {
  topic: Topic;
  onClick: () => void;
  progress: number;
}

const EnhancedTopicCard = ({ topic, onClick, progress }: TopicCardProps) => {
  // Determine level color
  const levelColor = {
    Beginner:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Intermediate:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Advanced:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  }[topic.level];

  // Format the updatedAt date
  const updatedTimeAgo = formatDistanceToNow(new Date(topic.updatedAt), {
    addSuffix: true,
  });

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card
        className="group relative overflow-hidden cursor-pointer hover:shadow-lg dark:hover:shadow-slate-800/50 h-full flex flex-col"
        onClick={onClick}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="p-2 rounded-full bg-primary/10"
              >
                <BookOpen className="h-5 w-5 text-primary" />
              </motion.div>
              <CardTitle className="text-xl">{topic.title}</CardTitle>
            </div>
            <Badge variant="outline" className={`${levelColor} border-0`}>
              {topic.level}
            </Badge>
          </div>
          <CardDescription className="mt-2">
            {topic.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {topic.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
            {topic.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{topic.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Subtopics preview */}
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">What you'll learn:</h4>
            <ul className="space-y-1">
              {topic.subtopics.slice(0, 3).map((subtopic) => (
                <li
                  key={subtopic.id}
                  className="text-sm flex items-center gap-1"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>{subtopic.title}</span>
                </li>
              ))}
              {topic.subtopics.length > 3 && (
                <li className="text-sm text-muted-foreground">
                  + {topic.subtopics.length - 3} more subtopics
                </li>
              )}
            </ul>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Progress
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-3 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="h-4 w-4" />
              <span>{topic.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="h-3 w-3" />
              <span>Updated {updatedTimeAgo}</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="group/button p-0 h-auto hover:bg-transparent"
          >
            <span className="inline-flex items-center gap-1 text-sm font-medium">
              {progress > 0 ? "Continue" : "Start learning"}
              <motion.span
                className="inline-block transition-transform group-hover/button:translate-x-1"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </span>
          </Button>
        </CardFooter>

        {/* Prerequisites badge, if any */}
        {topic.prerequisites.length > 0 && (
          <div className="absolute top-2 right-2">
            <div className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 text-xs px-2 py-1 rounded-md flex items-center gap-1">
              <Award className="h-3 w-3" />
              Prerequisites: {topic.prerequisites.length}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default EnhancedTopicCard;
