import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BookOpen, Code, FileText, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { topics } from "@/data/topics";
import { useProgress } from "@/context/ProgressContext";
import { useDebounce } from "@/hooks/useDebounce";

interface UnifiedSearchProps {
  className?: string;
  variant?: "mobile" | "desktop" | "navbar";
  onClose?: () => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  containerClassName?: string;
}

interface SearchResult {
  type: "topic" | "subtopic" | "course" | "article";
  id: string;
  title: string;
  parentId?: string;
  parentTitle?: string;
  url?: string;
}

const UnifiedSearch: React.FC<UnifiedSearchProps> = ({
  className,
  variant = "desktop",
  onClose,
  onSearch,
  placeholder = "Search topics...",
  containerClassName,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isTopicComplete, isSubTopicComplete } = useProgress();
  const debouncedQuery = useDebounce(query, 300);

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
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const searchResults = topics.flatMap((topic) => {
      const topicMatch = topic.title
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase());
      const subtopicMatches = topic.subtopics
        .filter((subtopic) =>
          subtopic.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
        .map((subtopic) => ({
          type: "subtopic" as const,
          id: subtopic.id,
          title: subtopic.title,
          parentId: topic.id,
          parentTitle: topic.title,
          url: `/topics/${topic.id}/${subtopic.id}`,
        }));

      if (topicMatch) {
        return [
          {
            type: "topic" as const,
            id: topic.id,
            title: topic.title,
            url: `/topics/${topic.id}`,
          },
          ...subtopicMatches,
        ];
      }

      return subtopicMatches;
    });

    setResults(searchResults);
    setIsLoading(false);
  }, [debouncedQuery]);

  const handleResultClick = (result: SearchResult) => {
    if (result.url) {
      navigate(result.url);
    } else if (result.type === "topic") {
      navigate(`/topics/${result.id}`);
    } else if (result.type === "subtopic" && result.parentId) {
      navigate(`/topics/${result.parentId}/${result.id}`);
    }
    setIsOpen(false);
    setQuery("");
    onClose?.();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query);
      setIsOpen(false);
      setQuery("");
      onClose?.();
    }
  };

  return (
    <div
      ref={searchRef}
      className={cn(
        "relative",
        variant === "mobile"
          ? "w-full"
          : variant === "navbar"
          ? "w-[400px]"
          : "w-[300px]",
        containerClassName
      )}
    >
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className={cn(
            "pl-9 pr-4",
            variant === "mobile"
              ? "w-full"
              : variant === "navbar"
              ? "w-[400px]"
              : "w-[300px]",
            className
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
      </form>

      <AnimatePresence>
        {isOpen && (query.trim() || isLoading) && (
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
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : results.length > 0 ? (
                results.map((result, index) => (
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
                    ) : result.type === "subtopic" ? (
                      <Code className="h-4 w-4 text-blue-500" />
                    ) : (
                      <FileText className="h-4 w-4 text-green-500" />
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
                    ) : result.type === "subtopic" && result.parentId ? (
                      isSubTopicComplete(result.parentId, result.id) ? (
                        <span className="ml-auto text-xs text-green-500">
                          Completed
                        </span>
                      ) : null
                    ) : null}
                  </motion.button>
                ))
              ) : (
                <div className="py-4 text-center text-sm text-muted-foreground">
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnifiedSearch;
