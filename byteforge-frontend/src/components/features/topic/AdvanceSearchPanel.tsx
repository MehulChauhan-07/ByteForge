import React, { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdvancedSearchPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  levelFilter: string | null;
  onLevelChange: (level: string | null) => void;
  categoryFilter: string | null;
  onCategoryChange: (category: string | null) => void;
  sortOrder: string;
  onSortChange: (order: string) => void;
  availableCategories: string[];
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export const AdvancedSearchPanel = ({
  searchQuery,
  onSearchChange,
  levelFilter,
  onLevelChange,
  categoryFilter,
  onCategoryChange,
  sortOrder,
  onSortChange,
  availableCategories,
  onApplyFilters,
  onClearFilters,
}: AdvancedSearchPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const levels = ["Beginner", "Intermediate", "Advanced"];
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "alphabetical", label: "Alphabetical" },
    { value: "popular", label: "Popular" },
  ];

  return (
    <div className="mb-6 bg-white dark:bg-slate-950 rounded-lg border">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-12"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t"
          >
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Level</label>
                  <Select
                    value={levelFilter || ""}
                    onValueChange={(value) => onLevelChange(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Levels</SelectItem>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={categoryFilter || ""}
                    onValueChange={(value) => onCategoryChange(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {availableCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select
                    value={sortOrder}
                    onValueChange={(value) => onSortChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sort Order" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={onClearFilters}>
                  Clear Filters
                </Button>
                <Button
                  onClick={() => {
                    onApplyFilters();
                    setIsExpanded(false);
                  }}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
