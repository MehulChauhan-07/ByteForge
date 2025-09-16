import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Filter } from "lucide-react";
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
}

const SearchBar = ({
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortOrderChange,
  onClearSearch,
}: SearchBarProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={searchInputRef}
          type="text"
          placeholder="Search your notes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-10"
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
      </div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-lg">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All Notes</DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* You can add custom filters here if needed */}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant={sortOrder === "newest" ? "default" : "outline"}
          size="sm"
          onClick={() => onSortOrderChange("newest")}
          className="rounded-lg"
        >
          Newest
        </Button>
        <Button
          variant={sortOrder === "oldest" ? "default" : "outline"}
          size="sm"
          onClick={() => onSortOrderChange("oldest")}
          className="rounded-lg"
        >
          Oldest
        </Button>
        <Button
          variant={sortOrder === "alphabetical" ? "default" : "outline"}
          size="sm"
          onClick={() => onSortOrderChange("alphabetical")}
          className="rounded-lg"
        >
          A-Z
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
