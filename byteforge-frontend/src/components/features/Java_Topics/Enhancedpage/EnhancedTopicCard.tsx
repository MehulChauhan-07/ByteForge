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
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Card
        className="group relative overflow-hidden cursor-pointer hover:shadow-xl dark:hover:shadow-slate-800/50 h-full flex flex-col bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-xl border-0 shadow-md"
        onClick={onClick}
        style={{
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
        }}
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full z-0" />

        <CardHeader className="pb-2 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-primary/5"
              >
                <BookOpen className="h-5 w-5 text-primary" />
              </motion.div>
              <CardTitle className="text-xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent font-bold">
                {topic.title}
              </CardTitle>
            </div>
            <Badge
              variant="outline"
              className={`${levelColor} border-0 rounded-full px-3 py-1 font-medium`}
            >
              {topic.level}
            </Badge>
          </div>
          <CardDescription className="mt-2">
            {topic.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow relative z-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {topic.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-medium rounded-full px-3 py-1 bg-secondary/30 text-secondary-foreground hover:bg-secondary/50 transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {topic.tags.length > 3 && (
              <Badge variant="outline" className="text-xs rounded-full">
                +{topic.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Subtopics preview */}
          <div className="mb-6 bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <span className="bg-primary/10 p-1 rounded-full">
                <Tag className="h-3 w-3 text-primary" />
              </span>
              What you'll learn:
            </h4>
            <ul className="space-y-2">
              {topic.subtopics.slice(0, 3).map((subtopic) => (
                <li
                  key={subtopic.id}
                  className="text-sm flex items-center gap-2 transition-transform hover:translate-x-1"
                >
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>{subtopic.title}</span>
                </li>
              ))}
              {topic.subtopics.length > 3 && (
                <li className="text-sm text-muted-foreground pl-4">
                  + {topic.subtopics.length - 3} more subtopics
                </li>
              )}
            </ul>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Your Progress
              </span>
              <span className="font-bold text-primary">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-4 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 relative z-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-sm font-medium">
              <Clock className="h-4 w-4 text-primary/70" />
              <span>{topic.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="h-3 w-3" />
              <span>Updated {updatedTimeAgo}</span>
            </div>
          </div>

          <Button variant="default" size="sm" className="rounded-full px-4">
            <span className="inline-flex items-center gap-1 text-sm font-medium">
              {progress > 0 ? "Continue" : "Start learning"}
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="h-4 w-4 ml-1" />
              </motion.span>
            </span>
          </Button>
        </CardFooter>

        {/* Prerequisites badge, if any */}
        {(topic.prerequisites?.length || 0) > 0 && (
          <motion.div
            className="absolute top-3 right-3 z-20"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-medium shadow-sm">
              <Award className="h-3 w-3" />
              Prerequisites: {topic.prerequisites.length}
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default EnhancedTopicCard;
