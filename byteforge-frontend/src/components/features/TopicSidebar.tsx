import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { Topic } from "../../types";
import { topics } from "../../data/topics";
import { cn } from "../../lib/utils";

interface TopicSidebarProps {
  className?: string;
}

const TopicSidebar: React.FC<TopicSidebarProps> = ({ className }) => {
  const location = useLocation();
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const renderTopic = (topic: Topic) => {
    const isExpanded = expandedTopics.has(topic.id);
    const hasSubtopicActive = (topic.subtopics ?? []).some((subtopic) =>
      isActive(`/topics/${topic.id}/${subtopic.subtopicId}`)
    );

    return (
      <div key={topic.id} className="space-y-1">
        <button
          onClick={() => toggleTopic(topic.id)}
          className={cn(
            "flex items-center w-full p-2 rounded-md hover:bg-accent transition-colors",
            (isExpanded || hasSubtopicActive) && "bg-accent"
          )}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          <span className="flex-1 text-left">{topic.title}</span>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {isExpanded && (
          <div className="ml-6 space-y-1">
            {(topic.subtopics ?? []).map((subtopic) => (
              <Link
                key={subtopic.subtopicId}
                to={`/topics/${topic.id}/${subtopic.subtopicId}`}
                className={cn(
                  "block p-2 rounded-md hover:bg-accent transition-colors",
                  isActive(`/topics/${topic.id}/${subtopic.subtopicId}`) &&
                    "bg-accent"
                )}
              >
                {subtopic.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("w-64 border-r p-4 overflow-y-auto", className)}>
      <h2 className="text-lg font-semibold mb-4">Topics</h2>
      <div className="space-y-2">{topics.map(renderTopic)}</div>
    </div>
  );
};

export default TopicSidebar;
