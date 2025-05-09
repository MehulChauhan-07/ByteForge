import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BookOpen, Code, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { topics } from "@/data/topics";
import { useProgress } from "@/context/ProgressContext";

interface SearchBarProps {
  className?: string;
  variant?: "mobile" | "desktop";
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className,
  variant = "desktop",
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<
    Array<{
      type: "topic" | "subtopic";
      id: string;
      title: string;
      parentId?: string;
      parentTitle?: string;
    }>
  >([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isTopicComplete, isSubTopicComplete } = useProgress();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults = topics.flatMap((topic) => {
      const topicMatch = topic.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const subtopicMatches = topic.subtopics
        .filter((subtopic) =>
          subtopic.title.toLowerCase().includes(query.toLowerCase())
        )
        .map((subtopic) => ({
          type: "subtopic" as const,
          id: subtopic.id,
          title: subtopic.title,
          parentId: topic.id,
          parentTitle: topic.title,
        }));

      if (topicMatch) {
        return [
          {
            type: "topic" as const,
            id: topic.id,
            title: topic.title,
          },
          ...subtopicMatches,
        ];
      }

      return subtopicMatches;
    });

    setResults(searchResults);
  }, [query]);

  const handleResultClick = (result: (typeof results)[0]) => {
    if (result.type === "topic") {
      navigate(`/topics/${result.id}`);
    } else {
      navigate(`/topics/${result.parentId}/${result.id}`);
    }
    setIsOpen(false);
    setQuery("");
    onClose?.();
  };

  return (
    <div
      ref={searchRef}
      className={cn(
        "relative",
        variant === "mobile" ? "w-full" : "w-[300px]",
        className
      )}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className={cn(
            "pl-9 pr-4",
            variant === "mobile" ? "w-full" : "w-[300px]"
          )}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute z-50 mt-2 w-full rounded-lg border bg-background shadow-lg",
              variant === "mobile" ? "max-h-[60vh]" : "max-h-[400px]"
            )}
          >
            <div className="overflow-y-auto p-2">
              {results.map((result, index) => (
                <motion.button
                  key={`${result.type}-${result.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleResultClick(result)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    "hover:bg-muted/50 focus:bg-muted/50"
                  )}
                >
                  {result.type === "topic" ? (
                    <BookOpen className="h-4 w-4 text-primary" />
                  ) : (
                    <Code className="h-4 w-4 text-blue-500" />
                  )}
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{result.title}</span>
                    {result.type === "subtopic" && (
                      <span className="text-xs text-muted-foreground">
                        {result.parentTitle}
                      </span>
                    )}
                  </div>
                  {result.type === "topic" ? (
                    isTopicComplete(result.id) ? (
                      <span className="ml-auto text-xs text-green-500">
                        Completed
                      </span>
                    ) : null
                  ) : isSubTopicComplete(result.parentId!, result.id) ? (
                    <span className="ml-auto text-xs text-green-500">
                      Completed
                    </span>
                  ) : null}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
