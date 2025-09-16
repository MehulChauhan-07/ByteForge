import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Filter, SortAsc, SortDesc } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOrder: "newest" | "oldest" | "alphabetical";
  onSortOrderChange: (order: "newest" | "oldest" | "alphabetical") => void;
  onClearSearch: () => void;
}

const SearchAndFilter = ({
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortOrderChange,
  onClearSearch,
}: SearchAndFilterProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClearSearch = () => {
    onClearSearch();
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

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
            onClick={handleClearSearch}
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
            {/* You can add more filters here if needed */}
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

export default SearchAndFilter;
