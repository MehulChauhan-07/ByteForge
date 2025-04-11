// src/pages/features/NotesPage.jsx
import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createNote,
  updateNote,
  deleteNote,
  getNotes,
  getNoteById,
} from "@/services/noteService";
import { toast } from "sonner";

export default function NotesPage() {
  const [notes, setNotes] = useState<
    Array<{
      id: string;
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
    }>
  >([]);
  const [selectedNote, setSelectedNote] = useState<{
    id: string;
    title: string;
    content: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const loadedNotes = await getNotes();
      setNotes(loadedNotes);
    } catch (error) {
      toast.error("Failed to load notes");
    }
  };

  const handleCreateNote = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      await createNote(title, content);
      toast.success("Note created successfully");
      setTitle("");
      setContent("");
      loadNotes();
    } catch (error) {
      toast.error("Failed to create note");
    }
  };

  const handleUpdateNote = async () => {
    if (!selectedNote) return;

    try {
      await updateNote(selectedNote.id, title, content);
      toast.success("Note updated successfully");
      setIsEditing(false);
      setSelectedNote(null);
      setTitle("");
      setContent("");
      loadNotes();
    } catch (error) {
      toast.error("Failed to update note");
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      toast.success("Note deleted successfully");
      loadNotes();
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  const handleEditNote = async (id: string) => {
    try {
      const note = await getNoteById(id);
      setSelectedNote(note);
      setTitle(note.title);
      setContent(note.content);
      setIsEditing(true);
    } catch (error) {
      toast.error("Failed to load note");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedNote(null);
    setTitle("");
    setContent("");
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Note" : "Create New Note"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Note title"
            value={title}
            onChange={handleTitleChange}
          />
          <Textarea
            placeholder="Note content"
            value={content}
            onChange={handleContentChange}
            className="min-h-[200px]"
          />
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleUpdateNote}>Update Note</Button>
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleCreateNote}>Create Note</Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle className="text-lg">{note.title}</CardTitle>
              <p className="text-sm text-gray-500">
                {new Date(note.updatedAt).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-700 line-clamp-3">{note.content}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleEditNote(note.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
