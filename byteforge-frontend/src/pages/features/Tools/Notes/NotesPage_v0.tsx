"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import noteService, { Note } from "@/services/noteService";
import { toast } from "sonner";

export default function NotesPage_v0() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await noteService.getAllNotes();
      setNotes(fetchedNotes);
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
    try {
      const createdNote = await noteService.createNote(
        newNote.title,
        newNote.content
      );
      if (createdNote) {
        setNotes([...notes, createdNote]);
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

  if (!user) {
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">
            Please log in to access your notes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive">
          {error}
        </div>
      )}

      {isCreating && (
        <Card className="mb-6">
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
      )}

      {isLoading ? (
        <div className="text-center">Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No notes yet. Create your first note!
        </div>
      ) : (
        <div className="grid gap-6">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
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
                    <CardTitle>{note.title}</CardTitle>
                  )}
                  <div className="flex gap-2">
                    {editingNote?.id === note.id ? (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditingNote(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button size="icon" onClick={handleUpdateNote}>
                          <Save className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditingNote(note)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteNote(Number(note.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Last updated: {new Date(note.updatedAt).toLocaleString()}
                </div>
              </CardHeader>
              <CardContent>
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
                  <div className="whitespace-pre-wrap">{note.content}</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// export default NotesPage;
