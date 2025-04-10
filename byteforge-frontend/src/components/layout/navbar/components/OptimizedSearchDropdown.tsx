// byteforge-frontend/src/components/layout/navbar/components/OptimizedSearchDropdown.tsx

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  handleSearch: (query: string) => void;
  recentSearches: string[];
}

const OptimizedSearchDropdown = ({
  isOpen,
  onClose,
  handleSearch,
  recentSearches,
}: SearchDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 top-full mt-1 rounded-lg bg-background shadow-lg"
    >
      <div className="relative">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search..."
              className="pl-9 pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {recentSearches.length > 0 && !searchQuery && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recent Searches</h3>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <div
                    key={`recent-${index}`}
                    className="p-2 hover:bg-accent rounded-md cursor-pointer flex items-center gap-2 transition-transform hover:translate-x-1"
                    onClick={() => {
                      setSearchQuery(search);
                      handleSearch(search);
                      onClose();
                    }}
                  >
                    <History className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{search}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchQuery && (
            <Button type="submit" className="w-full">
              Search for "{searchQuery}"
            </Button>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default OptimizedSearchDropdown;
