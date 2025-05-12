import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, Grid, List, SlidersHorizontal } from "lucide-react";

interface NotesHeaderProps {
  onCreateNote: () => void;
  onSearch: (query: string) => void;
  onChangeView: (view: "grid" | "list") => void;
  currentView: "grid" | "list";
}

const NotesHeader = ({
  onCreateNote,
  onSearch,
  onChangeView,
  currentView,
}: NotesHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm pt-8 pb-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <Button onClick={onCreateNote} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-9 w-full"
          />
        </div>

        <div className="flex gap-2 self-end">
          <Button
            variant={currentView === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => onChangeView("grid")}
            className="h-9 w-9"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={currentView === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => onChangeView("list")}
            className="h-9 w-9"
          >
            <List className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => {}}>
                Sort by Newest
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => {}}>
                Sort by Oldest
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => {}}>
                Sort by Title
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NotesHeader;
