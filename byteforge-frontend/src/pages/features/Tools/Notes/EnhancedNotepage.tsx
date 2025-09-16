"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import noteService, { Note } from "@/services/noteService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
// Component imports
import NoteHeader from "@/components/features/notes/v2/NoteHeader";
import SearchBar from "@/components/features/notes/v2/SearchBar";
import NoteList from "@/components/features/notes/v2/NoteList";
import CreateNoteForm from "@/components/features/notes/v2/CreateNoteForm";
import EmptyNoteState from "@/components/features/notes/v2/EmptyNoteState";
import LoadingState from "@/components/features/notes/v2/LoadingState";

// Animation variants
const pageTransitions = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const EnhancedNotePage = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "alphabetical"
  >("newest");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<{
    type: string;
    id?: number;
    time: Date;
  } | null>(null);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  useEffect(() => {
    if (notes.length > 0) {
      let filtered = notes;

      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter(
          (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply category filter if active
      if (activeCategory) {
        // This would be used if you had categories in the future
      }

      // Apply sorting
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
    } else {
      setFilteredNotes([]);
    }
  }, [notes, searchQuery, sortOrder, activeCategory]);

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

  const handleCreateNote = async (title: string, content: string) => {
    if (!title.trim()) {
      toast.error("Note title is required");
      return;
    }

    try {
      setIsLoading(true);
      const createdNote = await noteService.createNote(title, content);
      if (createdNote) {
        // Add to beginning of array for better UX
        setNotes([createdNote, ...notes]);
        setIsCreating(false);
        setLastAction({
          type: "create",
          id: Number(createdNote.id),
          time: new Date(),
        });
        setIsLoading(false);

        // Show a more interactive toast
        toast.success("Note created successfully", {
          description: `"${title.substring(0, 30)}${
            title.length > 30 ? "..." : ""
          }" has been created.`,
          action: {
            label: "View",
            onClick: () => setEditingNoteId(Number(createdNote.id)),
          },
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create note";
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  const handleUpdateNote = async (
    id: number,
    title: string,
    content: string
  ) => {
    if (!title.trim()) {
      toast.error("Note title is required");
      return;
    }

    try {
      setIsLoading(true);
      const updatedNote = await noteService.updateNote(id, title, content);
      if (updatedNote) {
        setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
        setEditingNoteId(null);
        setLastAction({ type: "update", id: id, time: new Date() });
        setIsLoading(false);

        toast.success("Note updated successfully", {
          description: `"${title.substring(0, 30)}${
            title.length > 30 ? "..." : ""
          }" has been updated.`,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update note";
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      setIsLoading(true);
      await noteService.deleteNote(noteId);

      // Find note before removing it
      const deletedNote = notes.find((note) => note.id === noteId);
      const noteTitle = deletedNote?.title || "Note";

      setNotes(notes.filter((note) => note.id !== noteId));
      setLastAction({ type: "delete", time: new Date() });
      setIsLoading(false);

      toast.success("Note deleted successfully", {
        description: `"${noteTitle.substring(0, 30)}${
          noteTitle.length > 30 ? "..." : ""
        }" has been deleted.`,
        action: {
          label: "Undo",
          onClick: () => {
            // In a real app, you'd implement an undo function
            toast.info("Undo feature would restore the note here");
          },
        },
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete note";
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
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
          <p className="text-muted-foreground mb-4">
            Please log in to access your notes.
          </p>
          <div className="relative w-full max-w-md mx-auto mt-8 p-6 border rounded-xl bg-card">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl" />
            <div className="relative">
              <h3 className="text-xl font-semibold mb-2">
                Welcome to ByteForge Notes
              </h3>
              <p className="text-muted-foreground mb-4">
                Sign in to manage your notes, save code snippets, and track your
                progress.
              </p>
              <Button className="w-full">Sign In</Button>
            </div>
          </div>
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
      {/* Header Component */}
      <NoteHeader
        onCreateNote={() => setIsCreating(true)}
        onChangeView={setCurrentView}
        onChangeSortOrder={setSortOrder}
        isCreating={isCreating}
        currentView={currentView}
        userName={user.displayName || "User"}
        totalNotes={notes.length}
      />

      {/* Search Component */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onClearSearch={clearSearch}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        notesCount={filteredNotes.length}
        totalNotes={notes.length}
      />

      {error && (
        <div className="mb-4 p-4 rounded-md bg-destructive/10 text-destructive flex items-center">
          <span className="mr-2">⚠️</span>
          <p>{error}</p>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={() => setError("")}
          >
            Dismiss
          </Button>
        </div>
      )}

      {/* Create Note Form */}
      <AnimatePresence>
        {isCreating && (
          <CreateNoteForm
            onCancel={() => setIsCreating(false)}
            onSave={handleCreateNote}
            currentDate={new Date().toISOString()}
            userName="MehulChauhan-22"
          />
        )}
      </AnimatePresence>

      {/* Notes Display */}
      {isLoading && !filteredNotes.length ? (
        <LoadingState />
      ) : filteredNotes.length === 0 ? (
        <EmptyNoteState
          searchQuery={searchQuery}
          onClearSearch={clearSearch}
          onCreateNote={() => setIsCreating(true)}
          userName="MehulChauhan-22"
        />
      ) : (
        <NoteList
          notes={filteredNotes}
          currentView={currentView}
          editingNoteId={editingNoteId}
          onEditNote={(noteId) => setEditingNoteId(noteId)}
          onCancelEdit={() => setEditingNoteId(null)}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
          lastAction={lastAction}
          userName="MehulChauhan-22"
        />
      )}
    </motion.div>
  );
};

export default EnhancedNotePage;
