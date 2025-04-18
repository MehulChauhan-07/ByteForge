import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { topics } from "@/data/topics";

interface TopicProgress {
  completed: boolean;
  subtopics: Record<string, boolean>;
  quizScore?: number;
}

interface ProgressContextType {
  progress: Record<string, TopicProgress>;
  markSubtopicComplete: (topicId: string, subtopicId: string) => void;
  updateQuizScore: (topicId: string, score: number) => void;
  getCompletionPercentage: (topicId: string) => number;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<Record<string, TopicProgress>>({});

  // Initialize progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("byteforge_progress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    } else {
      // Initialize with empty progress for all topics
      const initialProgress: Record<string, TopicProgress> = {};
      topics.forEach((topic) => {
        initialProgress[topic.id] = {
          completed: false,
          subtopics: topic.topics.reduce((acc, subtopic) => {
            const subtopicId = subtopic
              .toLowerCase()
              .replace(" & ", "-")
              .replace(/\s+/g, "-");
            acc[subtopicId] = false;
            return acc;
          }, {} as Record<string, boolean>),
        };
      });
      setProgress(initialProgress);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("byteforge_progress", JSON.stringify(progress));
  }, [progress]);

  const markSubtopicComplete = (topicId: string, subtopicId: string) => {
    setProgress((prev) => {
      const topicProgress = prev[topicId] || {
        completed: false,
        subtopics: {},
      };
      const updatedSubtopics = {
        ...topicProgress.subtopics,
        [subtopicId]: true,
      };

      // Check if all subtopics are complete
      const topic = topics.find((t) => t.id === topicId);
      const allSubtopicsComplete = topic
        ? topic.topics.every((st) => {
            const stId = st
              .toLowerCase()
              .replace(" & ", "-")
              .replace(/\s+/g, "-");
            return updatedSubtopics[stId];
          })
        : false;

      return {
        ...prev,
        [topicId]: {
          ...topicProgress,
          subtopics: updatedSubtopics,
          completed: allSubtopicsComplete,
        },
      };
    });
  };

  const updateQuizScore = (topicId: string, score: number) => {
    setProgress((prev) => ({
      ...prev,
      [topicId]: {
        ...prev[topicId],
        quizScore: score,
      },
    }));
  };

  const getCompletionPercentage = (topicId: string) => {
    const topicProgress = progress[topicId];
    if (!topicProgress) return 0;

    const subtopicCount = Object.keys(topicProgress.subtopics).length;
    if (subtopicCount === 0) return 0;

    const completedCount = Object.values(topicProgress.subtopics).filter(
      Boolean
    ).length;
    return Math.round((completedCount / subtopicCount) * 100);
  };

  const resetProgress = () => {
    localStorage.removeItem("byteforge_progress");
    setProgress({});
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markSubtopicComplete,
        updateQuizScore,
        getCompletionPercentage,
        resetProgress,
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
