import React, { useState } from "react";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Topic, Subtopic } from "@/types";

interface QuickJumpNavProps {
  topic: Topic;
  subtopics: Subtopic[];
  activeSubtopicId: string;
  onSubtopicClick: (id: string) => void;
}

export const QuickJumpNav = ({
  topic,
  subtopics,
  activeSubtopicId,
  onSubtopicClick,
}: QuickJumpNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Find current subtopic index
  const currentIndex = subtopics.findIndex(
    (s) => s.subtopicId === activeSubtopicId
  );
  const prevSubtopic = currentIndex > 0 ? subtopics[currentIndex - 1] : null;
  const nextSubtopic =
    currentIndex < subtopics.length - 1 ? subtopics[currentIndex + 1] : null;

  return (
    <div className="sticky top-4 z-10 flex items-center justify-between bg-background/80 backdrop-blur-sm rounded-lg border p-2 shadow-sm">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent">
            <Menu className="h-4 w-4" />
            <span className="font-medium text-sm">Jump to Section</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="start">
          <div className="max-h-[60vh] overflow-y-auto py-1">
            {subtopics.map((subtopic, index) => (
              <button
                key={subtopic.subtopicId}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-accent ${
                  subtopic.subtopicId === activeSubtopicId
                    ? "bg-primary/10 text-primary font-medium"
                    : ""
                }`}
                onClick={() => {
                  onSubtopicClick(subtopic.subtopicId);
                  setIsOpen(false);
                }}
              >
                <span className="text-muted-foreground mr-2">{index + 1}.</span>
                {subtopic.title}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex items-center gap-2">
        {prevSubtopic && (
          <button
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md hover:bg-accent"
            onClick={() => onSubtopicClick(prevSubtopic.subtopicId)}
          >
            <ChevronUp className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>
        )}

        {nextSubtopic && (
          <button
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md hover:bg-accent"
            onClick={() => onSubtopicClick(nextSubtopic.subtopicId)}
          >
            <span>Next</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
