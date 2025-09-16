import React, { createContext, useContext, useState, useEffect } from "react";
import { topics } from "@/data/topics";
import { Topic, SubTopic } from "../types";

interface TopicProgress {
  completed: boolean;
  subtopics: Record<string, boolean>;
}

interface ProgressContextType {
  progress: Record<
    string,
    { subtopics: Record<string, boolean>; quizScore?: number }
  >;
  isTopicComplete: (topicId: string) => boolean;
  isSubTopicComplete: (topicId: string, subtopicId: string) => boolean;
  toggleSubTopicCompletion: (topicId: string, subtopicId: string) => void;
  getCompletionPercentage: (topicId: string) => number;
  updateQuizScore?: (topicId: string, percentage: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [progress, setProgress] = useState<
    Record<string, { subtopics: Record<string, boolean>; quizScore?: number }>
  >({});

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("topicProgress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    } else {
      // Initialize with empty progress for all topics
      const initialProgress: Record<
        string,
        { subtopics: Record<string, boolean>; quizScore?: number }
      > = {};
      topics.forEach((topic) => {
        initialProgress[topic.id] = {
          subtopics: (topic.subtopics ?? []).reduce(
            (acc, subtopic: SubTopic) => {
              acc[subtopic.subtopicId] = false;
              return acc;
            },
            {} as Record<string, boolean>
          ),
          quizScore: 0,
        };
      });
      setProgress(initialProgress);
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage whenever it changes
    localStorage.setItem("topicProgress", JSON.stringify(progress));
  }, [progress]);

  const isTopicComplete = (topicId: string) => {
    const topicProgress = progress[topicId];
    if (!topicProgress) return false;

    const subtopics = Object.values(topicProgress.subtopics);
    return subtopics.length > 0 && subtopics.every((completed) => completed);
  };

  const isSubTopicComplete = (topicId: string, subtopicId: string) => {
    return progress[topicId]?.subtopics[subtopicId] || false;
  };

  const toggleSubTopicCompletion = (topicId: string, subtopicId: string) => {
    setProgress((prev) => {
      const topicProgress = prev[topicId] || { subtopics: {} };
      const newSubtopics = {
        ...topicProgress.subtopics,
        [subtopicId]: !topicProgress.subtopics[subtopicId],
      };

      return {
        ...prev,
        [topicId]: {
          ...topicProgress,
          subtopics: newSubtopics,
        },
      };
    });
  };

  const updateQuizScore = (topicId: string, percentage: number) => {
    setProgress((prev) => ({
      ...prev,
      [topicId]: {
        subtopics: prev[topicId]?.subtopics ?? {},
        quizScore: percentage,
      },
    }));
  };

  const getCompletionPercentage = (topicId: string) => {
    const topicProgress = progress[topicId];
    if (!topicProgress) return 0;

    const subtopics = Object.values(topicProgress.subtopics);
    if (subtopics.length === 0) return 0;

    const completedCount = subtopics.filter((completed) => completed).length;
    return Math.round((completedCount / subtopics.length) * 100);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        isTopicComplete,
        isSubTopicComplete,
        toggleSubTopicCompletion,
        getCompletionPercentage,
        updateQuizScore,
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
