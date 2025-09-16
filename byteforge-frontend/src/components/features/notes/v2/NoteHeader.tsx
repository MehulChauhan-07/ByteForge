import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/layout/ThemeProvider";
import {
  BookOpen,
  Plus,
  Settings,
  SortDesc,
  SortAsc,
  Grid,
  List,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

interface NoteHeaderProps {
  onCreateNote: () => void;
  onChangeView: (view: "grid" | "list") => void;
  onChangeSortOrder: (order: "newest" | "oldest" | "alphabetical") => void;
  isCreating: boolean;
  currentView: "grid" | "list";
  userName: string;
  totalNotes: number;
}

const NoteHeader = ({
  onCreateNote,
  onChangeView,
  onChangeSortOrder,
  isCreating,
  currentView,
  userName,
  totalNotes,
}: NoteHeaderProps) => {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
            <motion.h1
              className="text-3xl font-bold flex items-center gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="h-7 w-7 text-primary" />
              <span>My Notes</span>
              <Badge variant="outline" className="ml-2 py-0">
                {totalNotes} {totalNotes === 1 ? "note" : "notes"}
              </Badge>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="text-muted-foreground flex items-center gap-1.5">
                <span>Welcome back, {user.username}</span>
                <span className="text-xs text-muted-foreground/80">•</span>
                <span className="text-xs text-muted-foreground/80">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </p>
            </motion.div>
          </div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hidden md:flex items-center border rounded-lg overflow-hidden">
              <Button
                variant={currentView === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => onChangeView("grid")}
                className="rounded-none border-0"
              >
                <Grid className="h-4 w-4 mr-1" />
                Grid
              </Button>
              <Button
                variant={currentView === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => onChangeView("list")}
                className="rounded-none border-0"
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
            </div>

            <Button
              onClick={onCreateNote}
              className="rounded-lg relative overflow-hidden group"
              disabled={isCreating}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary/80 transition-transform duration-300 transform group-hover:scale-110"></span>
              <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-2">
                <Plus className="h-4 w-4 relative z-10" />
                <span className="relative z-10">New Note</span>
                <Sparkles className="h-3 w-3 absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-9 w-9"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onChangeView("grid")}>
                  <Grid className="h-4 w-4 mr-2" />
                  Grid View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onChangeView("list")}>
                  <List className="h-4 w-4 mr-2" />
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
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleTheme}>
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NoteHeader;
