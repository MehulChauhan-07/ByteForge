import React, { useState } from "react";
import { HelpCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContextualHelpProps {
  topic: string;
  contextKey: "navigation" | "content" | "examples" | "quiz";
}

const helpContent = {
  navigation: {
    title: "Navigating Topics",
    content:
      "Use the sidebar navigation to browse between topics. The current topic is highlighted. You can click on any subtopic to jump directly to that section.",
  },
  content: {
    title: "Reading Content",
    content:
      "Content is organized in expandable sections. Click on a section header to expand or collapse it. You can also use the quick navigation controls to move between sections.",
  },
  examples: {
    title: "Working with Examples",
    content:
      "Code examples are interactive. You can edit the code and run it to see the results. Use the reset button to revert to the original example.",
  },
  quiz: {
    title: "Taking Quizzes",
    content:
      "Select your answer and submit to see if you're correct. You can retry quizzes as many times as you like to reinforce your understanding.",
  },
};

export const ContextualHelpButton = ({
  topic,
  contextKey,
}: ContextualHelpProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const help = helpContent[contextKey];

  return (
    <div className="relative inline-block">
      <button
        className="text-muted-foreground hover:text-foreground rounded-full p-1"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Help"
      >
        <HelpCircle className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute z-50 bottom-full mb-2 right-0 w-72 bg-white dark:bg-slate-900 rounded-lg shadow-lg border p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{help.title}</h4>
              <button
                className="text-muted-foreground hover:text-foreground rounded-full"
                onClick={() => setIsOpen(false)}
                aria-label="Close help"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{help.content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
