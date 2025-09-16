import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Note } from "@/services/noteService";
import NoteCard from "./NoteCard";

interface NoteListProps {
  notes: Note[];
  currentView: "grid" | "list";
  editingNoteId: number | null;
  onEditNote: (noteId: number) => void;
  onCancelEdit: () => void;
  onUpdateNote: (id: number, title: string, content: string) => void;
  onDeleteNote: (id: number) => void;
  lastAction: { type: string; id?: number; time: Date } | null;
  userName: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const NoteList = ({
  notes,
  currentView,
  editingNoteId,
  onEditNote,
  onCancelEdit,
  onUpdateNote,
  onDeleteNote,
  lastAction,
  userName,
}: NoteListProps) => {
  const [highlightedNoteId, setHighlightedNoteId] = useState<number | null>(
    null
  );

  // Highlight a recently created or updated note
  useEffect(() => {
    if (
      lastAction?.id &&
      (lastAction.type === "create" || lastAction.type === "update")
    ) {
      setHighlightedNoteId(lastAction.id);

      // Remove highlight after 2 seconds
      const timer = setTimeout(() => {
        setHighlightedNoteId(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [lastAction]);

  return (
    <AnimatePresence>
      <motion.div
        key={currentView}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, y: 20 }}
        className={
          currentView === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            isEditing={editingNoteId === Number(note.id)}
            onEdit={() => onEditNote(Number(note.id))}
            onCancelEdit={onCancelEdit}
            onUpdate={onUpdateNote}
            onDelete={onDeleteNote}
            isHighlighted={highlightedNoteId === Number(note.id)}
            userName={userName}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default NoteList;
