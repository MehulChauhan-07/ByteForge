// src/pages/features/NotesPage.jsx
import { SetStateAction, useState } from "react";

const NotesPage = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "React Hooks",
      content:
        "useState, useEffect, useContext are the most commonly used hooks.",
      lastEdited: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox",
      content:
        "CSS Grid is for 2D layouts while Flexbox is primarily for 1D layouts.",
      lastEdited: new Date().toLocaleDateString(),
    },
  ]);

  const [activeNote, setActiveNote] = useState<{
    id: number;
    title: string;
    content: string;
    lastEdited: string;
  } | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleNewNote = () => {
    setActiveNote(null);
    setTitle("");
    setContent("");
  };

  const handleSaveNote = () => {
    if (!title.trim()) return;

    const currentDate = new Date().toLocaleDateString();

    if (activeNote) {
      // Update existing note
      setNotes(
        notes.map((note) =>
          note.id === activeNote.id
            ? { ...note, title, content, lastEdited: currentDate }
            : note
        )
      );
    } else {
      // Create new note
      const newNote = {
        id: Date.now(),
        title,
        content,
        lastEdited: currentDate,
      };
      setNotes([...notes, newNote]);
      setActiveNote(newNote);
    }
  };

  const handleSelectNote = (
    note: {
      id: number;
      title: string;
      content: string;
      lastEdited: string;
    } | null
  ) => {
    if (!note) return; // Add a null check
    setActiveNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (activeNote && activeNote.id === id) {
      handleNewNote();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Notes</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 border rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Notes</h2>
            <button
              onClick={handleNewNote}
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              New
            </button>
          </div>

          <div className="space-y-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`p-3 border rounded-md cursor-pointer ${
                  activeNote && activeNote.id === note.id
                    ? "bg-blue-50 border-blue-300"
                    : ""
                }`}
                onClick={() => handleSelectNote(note)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium truncate">{note.title}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note.id);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-sm text-gray-500 truncate">{note.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Last edited: {note.lastEdited}
                </p>
              </div>
            ))}

            {notes.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No notes yet. Create one!
              </p>
            )}
          </div>
        </div>

        <div className="md:col-span-3 border rounded-md p-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full px-4 py-2 text-xl font-medium border-b focus:outline-none focus:border-blue-500 mb-4"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className="w-full h-64 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveNote}
              disabled={!title.trim()}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              Save Note
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Note Taking Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Create, edit, and delete notes</li>
          <li>Automatic saving (premium feature)</li>
          <li>Rich text formatting (premium feature)</li>
          <li>Tags and categories (premium feature)</li>
          <li>Cloud sync across devices (premium feature)</li>
        </ul>
      </div>
    </div>
  );
};

export default NotesPage;
