import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/layout/ThemeProvider";
import { BookOpen, Plus, Settings, SortDesc, SortAsc } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NoteHeaderProps {
  onCreateNote: () => void;
  onChangeView: (view: "grid" | "list") => void;
  onChangeSortOrder: (order: "newest" | "oldest" | "alphabetical") => void;
  isCreating: boolean;
}

const NoteHeader = ({
  onCreateNote,
  onChangeView,
  onChangeSortOrder,
  isCreating,
}: NoteHeaderProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`relative rounded-2xl overflow-hidden mb-8 ${
        theme === "dark" ? "bg-slate-800" : "bg-slate-50"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 dark:from-primary/10 dark:to-slate-900/50 z-10" />
      <div className="absolute inset-0 bg-[url('/images/topic-pattern.svg')] opacity-10 z-0" />

      <div className="relative z-20 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-primary" />
              My Notes
            </h1>
            <p className="text-muted-foreground">
              Save and organize important concepts and code snippets
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={onCreateNote}
              className="rounded-lg"
              disabled={isCreating}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Note
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-lg">
                  <Settings className="h-4 w-4 mr-2" />
                  Options
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onChangeView("grid")}>
                  Grid View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onChangeView("list")}>
                  List View
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onChangeSortOrder("newest")}>
                  <SortDesc className="h-4 w-4 mr-2" />
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onChangeSortOrder("oldest")}>
                  <SortAsc className="h-4 w-4 mr-2" />
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onChangeSortOrder("alphabetical")}
                >
                  <SortAsc className="h-4 w-4 mr-2" />
                  Alphabetical
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteHeader;
