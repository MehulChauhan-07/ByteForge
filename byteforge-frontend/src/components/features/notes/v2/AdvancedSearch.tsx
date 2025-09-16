import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";
import {
  Search,
  X,
  Filter,
  ChevronDown,
  ChevronUp,
  CalendarIcon,
  Clock,
  FileText,
  SlidersHorizontal,
  Star,
  Tag,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";

interface AdvancedSearchProps {
  onSearch: (params: SearchParams) => void;
  totalNotes: number;
  resultCount: number;
}

type SearchParams = {
  query: string;
  dateRange: { from?: Date; to?: Date };
  contentLength?: { min: number; max: number };
  sortBy: string;
  favorites: boolean;
  categories: string[];
};

const AdvancedSearch = ({
  onSearch,
  totalNotes,
  resultCount,
}: AdvancedSearchProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    dateRange: {},
    contentLength: { min: 0, max: 5000 },
    sortBy: "newest",
    favorites: false,
    categories: [],
  });

  // Sample categories - replace with your actual categories from backend
  const availableCategories = [
    "Code Snippets",
    "Personal",
    "Work",
    "Study",
    "Important",
    "Tutorial",
  ];

  // Handle search parameter changes
  const updateSearchParam = (key: keyof SearchParams, value: any) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle content length slider change
  const handleContentLengthChange = (value: number[]) => {
    updateSearchParam("contentLength", { min: value[0], max: value[1] });
  };

  // Handle category toggle
  const toggleCategory = (category: string) => {
    const updatedCategories = searchParams.categories.includes(category)
      ? searchParams.categories.filter((c) => c !== category)
      : [...searchParams.categories, category];

    updateSearchParam("categories", updatedCategories);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({
      query: "",
      dateRange: {},
      contentLength: { min: 0, max: 5000 },
      sortBy: "newest",
      favorites: false,
      categories: [],
    });
  };

  // Submit search with current parameters
  const handleSubmitSearch = () => {
    onSearch(searchParams);
  };

  return (
    <div className={`mb-8 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
      {/* Main Search Input */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <div
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              isAdvancedOpen ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Search className="h-4 w-4" />
          </div>
          <Input
            value={searchParams.query}
            onChange={(e) => updateSearchParam("query", e.target.value)}
            placeholder="Search your notes... (Ctrl+K)"
            className={`pl-9 pr-32 h-12 transition-all duration-200 rounded-lg ${
              isDark ? "bg-slate-900 border-slate-700" : ""
            } ${isAdvancedOpen ? "ring-2 ring-primary/20" : ""}`}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            {searchParams.query && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateSearchParam("query", "")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 ${isAdvancedOpen ? "text-primary" : ""}`}
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              Filters
              {isAdvancedOpen ? (
                <ChevronUp className="h-3 w-3 ml-1" />
              ) : (
                <ChevronDown className="h-3 w-3 ml-1" />
              )}
            </Button>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchParams.favorites ||
          searchParams.categories.length > 0 ||
          searchParams.dateRange.from ||
          searchParams.dateRange.to) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-muted-foreground">
              Active filters:
            </span>

            {searchParams.favorites && (
              <Badge
                variant="secondary"
                className="rounded-full flex items-center gap-1"
                onClick={() => updateSearchParam("favorites", false)}
              >
                <Star className="h-3 w-3 text-yellow-500" />
                Favorites
                <X className="h-3 w-3 ml-1 cursor-pointer" />
              </Badge>
            )}

            {searchParams.dateRange.from && (
              <Badge
                variant="secondary"
                className="rounded-full flex items-center gap-1"
                onClick={() =>
                  updateSearchParam("dateRange", {
                    ...searchParams.dateRange,
                    from: undefined,
                  })
                }
              >
                <Clock className="h-3 w-3" />
                After: {searchParams.dateRange.from.toLocaleDateString()}
                <X className="h-3 w-3 ml-1 cursor-pointer" />
              </Badge>
            )}

            {searchParams.dateRange.to && (
              <Badge
                variant="secondary"
                className="rounded-full flex items-center gap-1"
                onClick={() =>
                  updateSearchParam("dateRange", {
                    ...searchParams.dateRange,
                    to: undefined,
                  })
                }
              >
                <Clock className="h-3 w-3" />
                Before: {searchParams.dateRange.to.toLocaleDateString()}
                <X className="h-3 w-3 ml-1 cursor-pointer" />
              </Badge>
            )}

            {searchParams.categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="rounded-full flex items-center gap-1"
                onClick={() => toggleCategory(category)}
              >
                <Tag className="h-3 w-3" />
                {category}
                <X className="h-3 w-3 ml-1 cursor-pointer" />
              </Badge>
            ))}

            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7 px-2"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Search Stats */}
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div>
            {searchParams.query ? (
              <span>
                Found {resultCount} {resultCount === 1 ? "result" : "results"}{" "}
                for "{searchParams.query}"
              </span>
            ) : (
              <span>
                Showing {resultCount} of {totalNotes}{" "}
                {totalNotes === 1 ? "note" : "notes"}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-7 px-2 flex items-center gap-1"
                >
                  Sort:{" "}
                  {searchParams.sortBy.charAt(0).toUpperCase() +
                    searchParams.sortBy.slice(1)}
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={isDark ? "bg-slate-800 border-slate-700" : ""}
              >
                <DropdownMenuItem
                  onClick={() => updateSearchParam("sortBy", "newest")}
                >
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => updateSearchParam("sortBy", "oldest")}
                >
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => updateSearchParam("sortBy", "alphabetical")}
                >
                  A-Z
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => updateSearchParam("sortBy", "contentLength")}
                >
                  Content Length
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Advanced Search Panel */}
      <AnimatePresence>
        {isAdvancedOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className={`mt-4 p-4 rounded-lg border ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-card"
              }`}
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="date" className="border-b-0">
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Date Range</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">From</div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start text-left ${
                                isDark ? "bg-slate-800 border-slate-700" : ""
                              }`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {searchParams.dateRange.from ? (
                                searchParams.dateRange.from.toLocaleDateString()
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className={`w-auto p-0 ${
                              isDark ? "bg-slate-800 border-slate-700" : ""
                            }`}
                          >
                            <Calendar
                              mode="single"
                              selected={searchParams.dateRange.from}
                              onSelect={(date) =>
                                updateSearchParam("dateRange", {
                                  ...searchParams.dateRange,
                                  from: date,
                                })
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">To</div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start text-left ${
                                isDark ? "bg-slate-800 border-slate-700" : ""
                              }`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {searchParams.dateRange.to ? (
                                searchParams.dateRange.to.toLocaleDateString()
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className={`w-auto p-0 ${
                              isDark ? "bg-slate-800 border-slate-700" : ""
                            }`}
                          >
                            <Calendar
                              mode="single"
                              selected={searchParams.dateRange.to}
                              onSelect={(date) =>
                                updateSearchParam("dateRange", {
                                  ...searchParams.dateRange,
                                  to: date,
                                })
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="content" className="border-b-0">
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Content Length</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 px-1">
                      <Slider
                        defaultValue={[0, 5000]}
                        max={5000}
                        step={100}
                        onValueChange={handleContentLengthChange}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div>
                          Min: {searchParams.contentLength?.min} characters
                        </div>
                        <div>
                          Max: {searchParams.contentLength?.max} characters
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="categories" className="border-b-0">
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <span>Categories</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {availableCategories.map((category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`category-${category}`}
                            checked={searchParams.categories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="favorites" className="border-b-0">
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      <span>Favorites</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="favorites"
                        checked={searchParams.favorites}
                        onCheckedChange={(checked) =>
                          updateSearchParam("favorites", Boolean(checked))
                        }
                      />
                      <label
                        htmlFor="favorites"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Show only favorite notes
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className={isDark ? "bg-slate-800 border-slate-700" : ""}
                >
                  Reset
                </Button>
                <Button
                  onClick={handleSubmitSearch}
                  className={`${isDark ? "bg-blue-600 hover:bg-blue-700" : ""}`}
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

export default AdvancedSearch;
