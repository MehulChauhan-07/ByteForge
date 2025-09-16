import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  X,
  Filter,
  Calendar,
  ArrowDownAZ,
  Sparkle,
  PanelTopClose,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOrder: "newest" | "oldest" | "alphabetical";
  onSortOrderChange: (order: "newest" | "oldest" | "alphabetical") => void;
  onClearSearch: () => void;
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  notesCount: number;
  totalNotes: number;
}

const SearchBar = ({
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortOrderChange,
  onClearSearch,
  activeCategory,
  onCategoryChange,
  notesCount,
  totalNotes,
}: SearchBarProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches] = useState<string[]>([
    "react",
    "javascript",
    "code snippet",
  ]);

  // Focus search input with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getSortIcon = () => {
    switch (sortOrder) {
      case "newest":
        return <Calendar className="h-4 w-4 mr-2" />;
      case "oldest":
        return <Calendar className="h-4 w-4 mr-2" />;
      case "alphabetical":
        return <ArrowDownAZ className="h-4 w-4 mr-2" />;
      default:
        return <Calendar className="h-4 w-4 mr-2" />;
    }
  };

  const getSortLabel = () => {
    switch (sortOrder) {
      case "newest":
        return "Newest";
      case "oldest":
        return "Oldest";
      case "alphabetical":
        return "A-Z";
      default:
        return "Sort";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mb-8"
    >
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <div
              className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                isSearchFocused ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Search className="h-4 w-4" />
            </div>

            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search your notes... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`pl-9 pr-10 h-11 transition-all duration-200 ${
                isSearchFocused ? "ring-2 ring-primary/20 shadow-sm" : ""
              }`}
            />

            {searchQuery && (
              <button
                onClick={() => {
                  onClearSearch();
                  if (searchInputRef.current) {
                    searchInputRef.current.focus();
                  }
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {isSearchFocused && !searchQuery && recentSearches.length > 0 && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 top-full mt-1 p-2 bg-popover shadow-md rounded-md z-10 border"
                >
                  <div className="text-xs text-muted-foreground mb-1.5">
                    Recent searches:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((term, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80"
                        onClick={() => {
                          onSearchChange(term);
                          searchInputRef.current?.blur();
                        }}
                      >
                        {term}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-11">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  {activeCategory && (
                    <Badge variant="secondary" className="ml-2 bg-primary/20">
                      {activeCategory}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onCategoryChange(null)}>
                  All Notes
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onCategoryChange("Important")}>
                  <Sparkle className="h-4 w-4 mr-2 text-yellow-500" />
                  Important
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCategoryChange("Code")}>
                  <PanelTopClose className="h-4 w-4 mr-2 text-blue-500" />
                  Code Snippets
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-11">
                  {getSortIcon()}
                  {getSortLabel()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onSortOrderChange("newest")}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortOrderChange("oldest")}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onSortOrderChange("alphabetical")}
                >
                  <ArrowDownAZ className="h-4 w-4 mr-2" />
                  Alphabetical
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div>
            {searchQuery ? (
              <span>
                Found {notesCount} {notesCount === 1 ? "result" : "results"} for
                "{searchQuery}"
              </span>
            ) : (
              <span>
                Showing {notesCount} of {totalNotes}{" "}
                {totalNotes === 1 ? "note" : "notes"}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <span>
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBar;
