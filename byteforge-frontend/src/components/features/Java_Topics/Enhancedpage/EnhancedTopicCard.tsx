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
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import type { Topic } from "@/types";

interface TopicCardProps {
  topic: Topic;
  onClick: () => void;
  progress: number;
}

const EnhancedTopicCard = ({ topic, onClick, progress }: TopicCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card
        className="group relative overflow-hidden cursor-pointer hover:shadow-lg dark:hover:shadow-slate-800/50"
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
            <Badge variant="outline" className="border-primary/20 text-primary">
              {topic.level}
            </Badge>
          </div>
          <CardDescription>{topic.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {topic.topics.map(
              (subtopic, index) =>
                index < 2 && (
                  <Badge
                    key={subtopic}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {subtopic}
                  </Badge>
                )
            )}
            {topic.topics.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{topic.topics.length - 2} more
              </Badge>
            )}
          </div>

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

        <CardFooter className="pt-0">
          <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <Clock className="h-4 w-4" />
            <span>{topic.duration}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto group/button p-0 h-auto hover:bg-transparent"
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
      </Card>
    </motion.div>
  );
};

export default EnhancedTopicCard;
