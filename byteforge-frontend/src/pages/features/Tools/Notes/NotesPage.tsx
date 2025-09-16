"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Search,
  BookOpen,
  Clock,
  SortAsc,
  SortDesc,
  Filter,
  Calendar,
  Tag,
  Bookmark,
  Share2,
  FilePlus,
  FolderPlus,
  Info,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import noteService, { Note } from "@/services/noteService";
import { toast } from "sonner";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const pageTransitions: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const RedesignedNotesPage = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({ title: "", content: "", tags: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "alphabetical"
  >("newest");
  const [showTagsInput, setShowTagsInput] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  useEffect(() => {
    if (notes.length > 0) {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

      let sorted = [...filtered];
      if (sortOrder === "newest") {
        sorted = sorted.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      } else if (sortOrder === "oldest") {
        sorted = sorted.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      } else if (sortOrder === "alphabetical") {
        sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
      }

      setFilteredNotes(sorted);
    }
  }, [notes, searchQuery, sortOrder]);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const fetchedNotes = await noteService.getAllNotes();
      setNotes(fetchedNotes);
      setFilteredNotes(fetchedNotes);
      setIsLoading(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch notes";
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  const handleCreateNote = async () => {
    if (!newNote.title.trim()) {
      toast.error("Note title is required");
      return;
    }

    try {
      const createdNote = await noteService.createNote(
        newNote.title,
        newNote.content
      );
      if (createdNote) {
        setNotes([...notes, createdNote]);
        setIsCreating(false);
        setNewNote({ title: "", content: "", tags: [] });
        toast.success("Note created successfully");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create note";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleUpdateNote = async () => {
    if (!editingNote) return;
    if (!editingNote.title.trim()) {
      toast.error("Note title is required");
      return;
    }

    try {
      const updatedNote = await noteService.updateNote(
        Number(editingNote.id),
        editingNote.title,
        editingNote.content
      );

      if (updatedNote) {
        setNotes(
          notes.map((note) => (note.id === editingNote.id ? updatedNote : note))
        );
        setEditingNote(null);
        toast.success("Note updated successfully");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update note";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      await noteService.deleteNote(noteId);
      setNotes(notes.filter((note) => note.id !== noteId));
      toast.success("Note deleted successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete note";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  if (!user) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransitions}
        className="container max-w-4xl mx-auto py-10 px-4"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">
            Please log in to access your notes.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitions}
      className="container max-w-7xl mx-auto py-10 px-4"
    >
      {/* Header Section */}
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
                onClick={() => setIsCreating(true)}
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
                  <DropdownMenuItem onClick={() => setCurrentView("grid")}>
                    Grid View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentView("list")}>
                    List View
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortOrder("newest")}>
                    <SortDesc className="h-4 w-4 mr-2" />
                    Newest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("oldest")}>
                    <SortAsc className="h-4 w-4 mr-2" />
                    Oldest First
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortOrder("alphabetical")}
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

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search your notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-10"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
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
              <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                All Notes
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant={sortOrder === "newest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortOrder("newest")}
            className="rounded-lg"
          >
            Newest
          </Button>
          <Button
            variant={sortOrder === "oldest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortOrder("oldest")}
            className="rounded-lg"
          >
            Oldest
          </Button>
          <Button
            variant={sortOrder === "alphabetical" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortOrder("alphabetical")}
            className="rounded-lg"
          >
            A-Z
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive">
          {error}
        </div>
      )}

      {/* Create Note Form */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <Card
              className={`border-2 ${
                theme === "dark" ? "border-slate-700" : "border-primary/20"
              }`}
            >
              <CardHeader>
                <CardTitle>Create New Note</CardTitle>
                <CardDescription>
                  Capture your important ideas and code snippets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <Input
                      placeholder="Note title..."
                      value={newNote.title}
                      onChange={(e) =>
                        setNewNote({ ...newNote, title: e.target.value })
                      }
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Content
                    </label>
                    <Textarea
                      placeholder="Write your note content..."
                      value={newNote.content}
                      onChange={(e) =>
                        setNewNote({ ...newNote, content: e.target.value })
                      }
                      className="min-h-[200px] bg-background"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setNewNote({ title: "", content: "", tags: [] });
                    setShowTagsInput(false);
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleCreateNote}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Note
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes Display */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          <span className="ml-3">Loading notes...</span>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex rounded-full bg-primary/10 p-6 mb-4">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No notes found</h2>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? "No notes match your search criteria. Try a different search term."
              : "You haven't created any notes yet. Create your first note to get started!"}
          </p>
          {searchQuery ? (
            <Button onClick={clearSearch} variant="outline">
              Clear Search
            </Button>
          ) : (
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Note
            </Button>
          )}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            currentView === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              variants={itemVariants}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              whileHover={{
                y: -5,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
            >
              <Card
                className={`h-full flex flex-col ${
                  editingNote?.id === note.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    {editingNote?.id === note.id ? (
                      <Input
                        value={editingNote.title}
                        onChange={(e) =>
                          setEditingNote({
                            ...editingNote,
                            title: e.target.value,
                          })
                        }
                        className="text-xl font-bold"
                      />
                    ) : (
                      <CardTitle className="line-clamp-2">
                        {note.title}
                      </CardTitle>
                    )}
                    <div className="flex gap-1">
                      {editingNote?.id === note.id ? (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setEditingNote(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            className="h-8 w-8"
                            onClick={handleUpdateNote}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setEditingNote(note)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Settings className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => setEditingNote(note)}
                              >
                                <Edit2 className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Bookmark className="h-4 w-4 mr-2" />
                                Bookmark
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() =>
                                  handleDeleteNote(Number(note.id))
                                }
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center mt-2">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(note.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  {editingNote?.id === note.id ? (
                    <Textarea
                      value={editingNote.content}
                      onChange={(e) =>
                        setEditingNote({
                          ...editingNote,
                          content: e.target.value,
                        })
                      }
                      className="min-h-[200px]"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground line-clamp-6 whitespace-pre-line">
                      {note.content}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default RedesignedNotesPage;
