import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit2, Save, X, Clock } from "lucide-react";
import { Note } from "@/services/noteService";
import { motion } from "framer-motion";

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
  onUpdate: () => void;
  isEditing: boolean;
  editingNote: Note | null;
  setEditingNote: (note: Note | null) => void;
}

const NoteCard = ({
  note,
  onDelete,
  onEdit,
  onUpdate,
  isEditing,
  editingNote,
  setEditingNote,
}: NoteCardProps) => {
  const isBeingEdited = isEditing && editingNote?.id === note.id;
  const [isHovered, setIsHovered] = useState(false);

  // Get a random pastel background color based on the note title
  const getColor = () => {
    const colors = [
      "bg-blue-50 dark:bg-blue-950",
      "bg-green-50 dark:bg-green-950",
      "bg-yellow-50 dark:bg-yellow-950",
      "bg-purple-50 dark:bg-purple-950",
      "bg-pink-50 dark:bg-pink-950",
      "bg-indigo-50 dark:bg-indigo-950",
    ];
    const index = note.title.length % colors.length;
    return colors[index];
  };

  return (
    <Card
      className={`h-full overflow-hidden transition-all duration-300 ${
        isBeingEdited ? "ring-2 ring-primary" : ""
      } ${getColor()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          {isBeingEdited ? (
            <Input
              value={editingNote!.title}
              onChange={(e) =>
                setEditingNote({
                  ...editingNote!,
                  title: e.target.value,
                })
              }
              className="text-xl font-medium"
              autoFocus
            />
          ) : (
            <CardTitle className="text-xl font-medium line-clamp-2">
              {note.title}
            </CardTitle>
          )}

          <motion.div
            className="flex gap-1"
            initial={{ opacity: isHovered ? 1 : 0 }}
            animate={{ opacity: isHovered || isBeingEdited ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isBeingEdited ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingNote(null)}
                  className="h-8 px-2"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={onUpdate} className="h-8 px-2">
                  <Save className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(note)}
                  className="h-8 px-2 hover:bg-background/80"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(Number(note.id))}
                  className="h-8 px-2 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        {isBeingEdited ? (
          <Textarea
            value={editingNote!.content}
            onChange={(e) =>
              setEditingNote({
                ...editingNote!,
                content: e.target.value,
              })
            }
            className="min-h-[160px] resize-none"
          />
        ) : (
          <div className="whitespace-pre-wrap prose-sm max-h-[200px] overflow-y-auto line-clamp-6">
            {note.content}
          </div>
        )}
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground pt-0">
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {new Date(note.updatedAt).toLocaleDateString()} at{" "}
          {new Date(note.updatedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
