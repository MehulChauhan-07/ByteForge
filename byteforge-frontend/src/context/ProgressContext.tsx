import React, { createContext, useContext, useState, useEffect } from "react";
import { topics } from "@/data/topics";
import { Topic, SubTopic } from "../types";

interface TopicProgress {
  completed: boolean;
  subtopics: Record<string, boolean>;
}

interface ProgressContextType {
  progress: Record<string, TopicProgress>;
  markSubTopicComplete: (topicId: string, subtopicId: string) => void;
  isSubTopicComplete: (topicId: string, subtopicId: string) => boolean;
  isTopicComplete: (topicId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [progress, setProgress] = useState<Record<string, TopicProgress>>({});

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("topicProgress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    } else {
      // Initialize with empty progress for all topics
      const initialProgress: Record<string, TopicProgress> = {};
      topics.forEach((topic) => {
        initialProgress[topic.id] = {
          completed: false,
          subtopics: topic.subtopics.reduce((acc, subtopic: SubTopic) => {
            acc[subtopic.id] = false;
            return acc;
          }, {} as Record<string, boolean>),
        };
      });
      setProgress(initialProgress);
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage whenever it changes
    localStorage.setItem("topicProgress", JSON.stringify(progress));
  }, [progress]);

  const markSubTopicComplete = (topicId: string, subtopicId: string) => {
    setProgress((prev) => {
      const newProgress = { ...prev };
      if (!newProgress[topicId]) {
        newProgress[topicId] = {
          completed: false,
          subtopics: {},
        };
      }
      newProgress[topicId].subtopics[subtopicId] = true;

      // Check if all subtopics are complete
      const topic = topics.find((t) => t.id === topicId);
      if (topic) {
        const allSubtopicsComplete = topic.subtopics.every(
          (st) => newProgress[topicId].subtopics[st.id]
        );
        newProgress[topicId].completed = allSubtopicsComplete;
      }

      return newProgress;
    });
  };

  const isSubTopicComplete = (topicId: string, subtopicId: string) => {
    return progress[topicId]?.subtopics[subtopicId] || false;
  };

  const isTopicComplete = (topicId: string) => {
    return progress[topicId]?.completed || false;
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markSubTopicComplete,
        isSubTopicComplete,
        isTopicComplete,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};
