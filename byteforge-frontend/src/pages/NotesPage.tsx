import React, { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import FeatureGuard from "@/components/FeatureGuard";
import { Plus, Trash2, Save, Search } from "lucide-react";
import api from "@/services/api";

interface Note {
  id: string;
  title: string;
  content: string;
  topicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<{
    title: string;
    content: string;
    id?: string;
  }>({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would call your API
        // Since we're simulating, we'll create mock data
        setTimeout(() => {
          const mockNotes: Note[] = [
            {
              id: "1",
              title: "Java Basics - Variables and Types",
              content:
                'Java has 8 primitive data types: byte, short, int, long, float, double, boolean, and char.\n\nExample:\n```java\nint number = 10;\nString text = "Hello";\n```',
              topicId: "java-basics",
              createdAt: new Date("2025-03-20"),
              updatedAt: new Date("2025-03-22"),
            },
            {
              id: "2",
              title: "Object-Oriented Programming in Java",
              content:
                "The four main principles of OOP are:\n1. Encapsulation\n2. Inheritance\n3. Polymorphism\n4. Abstraction",
              topicId: "java-oop",
              createdAt: new Date("2025-03-15"),
              updatedAt: new Date("2025-03-15"),
            },
          ];
          setNotes(mockNotes);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError("Failed to load notes. Please try again later.");
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const createNewNote = () => {
    setSelectedNote(null);
    setEditingNote({
      title: "",
      content: "",
    });
  };

  const selectNote = (note: Note) => {
    setSelectedNote(note);
    setEditingNote({
      id: note.id,
      title: note.title,
      content: note.content,
    });
  };

  const saveNote = () => {
    if (!editingNote.title.trim()) {
      alert("Please add a title for your note");
      return;
    }

    if (editingNote.id) {
      // Update existing note
      const updatedNote = {
        ...selectedNote!,
        title: editingNote.title,
        content: editingNote.content,
        updatedAt: new Date(),
      };

      setNotes(
        notes.map((note) => (note.id === editingNote.id ? updatedNote : note))
      );
      setSelectedNote(updatedNote);
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        title: editingNote.title,
        content: editingNote.content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setNotes([newNote, ...notes]);
      setSelectedNote(newNote);
      setEditingNote({
        id: newNote.id,
        title: newNote.title,
        content: newNote.content,
      });
    }
  };

  const deleteNote = (id: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((note) => note.id !== id));
      if (selectedNote?.id === id) {
        setSelectedNote(null);
        setEditingNote({
          title: "",
          content: "",
        });
      }
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Content for non-authenticated users
  const nonAuthContent = (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold mb-4">Your Personal Java Notes</h2>
        <p className="mb-6">
          Create and organize your own study notes as you learn Java. Track
          important concepts and code examples.
        </p>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium">Features:</h3>
            <ul className="mt-2 space-y-2 text-left">
              <li>• Create notes for each topic</li>
              <li>• Add code snippets and examples</li>
              <li>• Search through your notes</li>
              <li>• Organize by topics and categories</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6">My Notes</h1>

        <FeatureGuard featureName="Notes" fallback={nonAuthContent}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Note List Sidebar */}
            <div className="border rounded-lg overflow-hidden md:col-span-1">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    className="w-full pl-10 pr-4 py-2 border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-md flex items-center justify-center gap-2"
                  onClick={createNewNote}
                >
                  <Plus className="h-4 w-4" />
                  New Note
                </button>
              </div>
              <div className="overflow-y-auto max-h-[60vh]">
                {loading ? (
                  <div className="p-4 text-center">
                    <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                    <p className="mt-2 text-muted-foreground">
                      Loading notes...
                    </p>
                  </div>
                ) : filteredNotes.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    {searchTerm
                      ? "No notes match your search."
                      : "No notes yet. Create your first note!"}
                  </div>
                ) : (
                  filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      className={`p-4 border-b hover:bg-muted cursor-pointer ${
                        selectedNote?.id === note.id ? "bg-muted" : ""
                      }`}
                      onClick={() => selectNote(note)}
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium truncate">{note.title}</h3>
                        <button
                          className="text-muted-foreground hover:text-red-500 p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-muted-foreground text-sm truncate mt-1">
                        {note.content.substring(0, 50)}
                        {note.content.length > 50 ? "..." : ""}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(note.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Note Editor */}
            <div className="border rounded-lg overflow-hidden md:col-span-2 flex flex-col">
              <div className="p-4 border-b">
                <input
                  type="text"
                  placeholder="Note title"
                  className="w-full text-xl font-medium border-0 focus:outline-none focus:ring-0 px-0"
                  value={editingNote.title}
                  onChange={(e) =>
                    setEditingNote({ ...editingNote, title: e.target.value })
                  }
                />
              </div>
              <textarea
                className="flex-1 p-4 resize-none focus:outline-none focus:ring-0"
                placeholder="Start writing your note here..."
                value={editingNote.content}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, content: e.target.value })
                }
                style={{ minHeight: "400px" }}
              />
              <div className="bg-muted p-2 border-t flex justify-end">
                <button
                  className="bg-primary text-primary-foreground px-3 py-1 rounded flex items-center gap-1 text-sm"
                  onClick={saveNote}
                >
                  <Save className="h-4 w-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </FeatureGuard>
      </div>
    </>
  );
};

export default NotesPage;
