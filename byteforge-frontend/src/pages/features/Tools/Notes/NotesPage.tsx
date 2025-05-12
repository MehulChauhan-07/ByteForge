"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit2, Save, X, FileText } from "lucide-react";
import noteService, { Note } from "@/services/noteService";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import NoteCard from "@/components/features/notes/v1/NoteCard";
import NotesHeader from "@/components/features/notes/v1/NoteHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NotesPage = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTab, setSelectedTab] = useState<string>("all");

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [searchQuery, notes]);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const fetchedNotes = await noteService.getAllNotes();
      setNotes(fetchedNotes);
      setFilteredNotes(fetchedNotes);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch notes";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNote = async () => {
    if (!newNote.title.trim()) {
      toast.error("Please provide a title for your note");
      return;
    }

    try {
      const createdNote = await noteService.createNote(
        newNote.title,
        newNote.content
      );
      if (createdNote) {
        setNotes([createdNote, ...notes]);
        setIsCreating(false);
        setNewNote({ title: "", content: "" });
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
      toast.error("Please provide a title for your note");
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Get recently updated notes (last 7 days)
  const recentNotes = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return filteredNotes.filter(
      (note) => new Date(note.updatedAt) >= sevenDaysAgo
    );
  }, [filteredNotes]);

  // Display notes based on selected tab
  const displayedNotes = useMemo(() => {
    switch (selectedTab) {
      case "recent":
        return recentNotes;
      case "all":
      default:
        return filteredNotes;
    }
  }, [selectedTab, filteredNotes, recentNotes]);

  if (!user) {
    return (
      <div className="container max-w-5xl mx-auto py-10 px-4">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground max-w-md">
            You need to be logged in to access your notes. Please log in to view
            and manage your notes.
          </p>
          <Button className="mt-6" size="lg">
            Log In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-4 px-4 min-h-screen">
      <NotesHeader
        onCreateNote={() => setIsCreating(true)}
        onSearch={handleSearch}
        onChangeView={setViewMode}
        currentView={viewMode}
      />

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive"
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="mb-6 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle>Create New Note</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Note title"
                    value={newNote.title}
                    onChange={(e) =>
                      setNewNote({ ...newNote, title: e.target.value })
                    }
                    autoFocus
                  />
                  <Textarea
                    placeholder="Note content"
                    value={newNote.content}
                    onChange={(e) =>
                      setNewNote({ ...newNote, content: e.target.value })
                    }
                    className="min-h-[200px]"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsCreating(false);
                        setNewNote({ title: "", content: "" });
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button onClick={handleCreateNote}>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">
            All Notes ({filteredNotes.length})
          </TabsTrigger>
          <TabsTrigger value="recent">
            Recent ({recentNotes.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="py-12">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading your notes...</p>
          </div>
        </div>
      ) : displayedNotes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center text-muted-foreground"
        >
          <div className="max-w-md mx-auto flex flex-col items-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No notes found</h3>
            <p>
              {searchQuery
                ? "No notes match your search criteria."
                : "You don't have any notes yet. Create your first note to get started!"}
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </Button>
            )}
          </div>
        </motion.div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
              : "flex flex-col gap-4"
          }
        >
          <AnimatePresence>
            {displayedNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <NoteCard
                  note={note}
                  onDelete={handleDeleteNote}
                  onEdit={setEditingNote}
                  onUpdate={handleUpdateNote}
                  isEditing={!!editingNote}
                  editingNote={editingNote}
                  setEditingNote={setEditingNote}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
