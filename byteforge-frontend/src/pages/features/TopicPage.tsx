import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { topics } from "@/data/topics";
import { useProgress } from "@/context/ProgressContext";
import type { Topic } from "@/types";

const TopicPage = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isSubTopicComplete, getCompletionPercentage } = useProgress();

  useEffect(() => {
    const loadTopicData = () => {
      setIsLoading(true);
      const foundTopic = topics.find((t) => t.id === topicId);
      if (foundTopic) {
        setTopic(foundTopic);
      } else {
        // If topic not found, redirect to topics list
        navigate("/topics");
      }
      setIsLoading(false);
    };

    loadTopicData();
  }, [topicId, navigate]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-4 w-96 bg-muted rounded" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
          <Button onClick={() => navigate("/topics")}>Back to Topics</Button>
        </div>
      </div>
    );
  }

  const progress = getCompletionPercentage(topic.id);

  const handleSubtopicClick = (subtopicId: string) => {
    navigate(`/topics/${topic.id}/${subtopicId}`);
  };

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            onClick={() => navigate("/topics")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Topics
          </Button>

          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Progress: {progress}%
            </div>
            <Progress value={progress} className="w-32" />
          </div>
        </div>

        {/* Topic Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{topic.title}</h1>
            <Badge
              variant={topic.level === "Beginner" ? "default" : "secondary"}
            >
              {topic.level}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">{topic.description}</p>
          <div className="flex flex-wrap gap-2">
            {topic.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Subtopics List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Subtopics</h2>
          <div className="grid gap-4">
            {topic.subtopics.map((subtopic, index) => (
              <Card
                key={subtopic.id}
                className={cn(
                  "transition-colors hover:border-primary cursor-pointer",
                  isSubTopicComplete(topic.id, subtopic.id) &&
                    "border-green-500/50 bg-green-500/5"
                )}
                onClick={() => handleSubtopicClick(subtopic.id)}
              >
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
                        isSubTopicComplete(topic.id, subtopic.id)
                          ? "bg-green-500/10 text-green-500"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {subtopic.title}
                      </h3>
                      {subtopic.description && (
                        <p className="text-sm text-muted-foreground">
                          {subtopic.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isSubTopicComplete(topic.id, subtopic.id) && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                    <Button variant="ghost" size="sm">
                      Start
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TopicPage;
