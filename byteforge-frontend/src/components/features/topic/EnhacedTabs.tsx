import React from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  Code,
  BookOpen,
  PenTool,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Topic } from "@/types";

interface EnhancedTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  topic: Topic;
}

export const EnhancedTabs = ({
  activeTab,
  onTabChange,
  topic,
}: EnhancedTabsProps) => {
  const hasResources = topic.subtopics.some((s) => s.resources?.length);
  const hasQuizzes = topic.subtopics.some((s) => s.quizQuestions?.length);
  const hasExercises = topic.subtopics.some((s) => s.exercises?.length);

  const tabs = [
    {
      id: "content",
      label: "Content",
      icon: <FileText className="h-4 w-4" />,
      disabled: false,
    },
    {
      id: "code",
      label: "Examples",
      icon: <Code className="h-4 w-4" />,
      disabled: false,
    },
    {
      id: "resources",
      label: "Resources",
      icon: <BookOpen className="h-4 w-4" />,
      disabled: !hasResources,
    },
    {
      id: "quiz",
      label: "Quiz",
      icon: <Zap className="h-4 w-4" />,
      disabled: !hasQuizzes,
    },
    {
      id: "exercises",
      label: "Exercises",
      icon: <PenTool className="h-4 w-4" />,
      disabled: !hasExercises,
    },
  ];

  return (
    <div className="relative mb-6 border-b">
      <div className="flex overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onTabChange(tab.id)}
            disabled={tab.disabled}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap",
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground",
              tab.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 w-full h-[1px] bg-border -z-10"></div>
    </div>
  );
};
