import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Topic } from "@/types";

interface ContextNavigationProps {
  currentTopic: Topic;
  allTopics: Topic[];
}

export const ContextNavigation = ({
  currentTopic,
  allTopics,
}: ContextNavigationProps) => {
  // Find related topics based on tags/category
  const relatedTopics = allTopics
    .filter(
      (topic) =>
        topic.id !== currentTopic.id &&
        (topic.category === currentTopic.category ||
          topic.tags.some((tag) => currentTopic.tags.includes(tag)))
    )
    .slice(0, 3);

  return (
    <div className="bg-accent/30 rounded-lg p-4 mt-8">
      <h3 className="text-lg font-medium mb-3">Continue Learning</h3>
      <div className="space-y-2">
        {relatedTopics.map((topic) => (
          <Link
            key={topic.id}
            to={`/topics/${topic.id}`}
            className="flex items-center justify-between p-3 bg-background rounded border hover:border-primary transition-colors group"
          >
            <div>
              <h4 className="font-medium group-hover:text-primary transition-colors">
                {topic.title}
              </h4>
              <p className="text-sm text-muted-foreground">{topic.duration}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};
