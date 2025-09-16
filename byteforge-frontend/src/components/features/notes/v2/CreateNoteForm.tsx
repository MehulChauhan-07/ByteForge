import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, X, Clock, User } from "lucide-react";

interface CreateNoteFormProps {
  onCancel: () => void;
  onSave: (title: string, content: string) => void;
  currentDate: string;
  userName: string;
}

const CreateNoteForm = ({
  onCancel,
  onSave,
  currentDate,
  userName,
}: CreateNoteFormProps) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);

  // Auto focus title input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const titleInput = document.getElementById("note-title-input");
      if (titleInput) {
        titleInput.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Update character count
  useEffect(() => {
    setCharCount(content.length);
  }, [content]);

  const formattedDate = new Date(currentDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden mb-8"
    >
      <Card
        className={`border-0 shadow-lg ${
          isDark ? "bg-slate-900" : "bg-card"
        } p-0`}
      >
        <CardHeader className="pb-2 pt-5 px-5">
          <CardTitle className="text-2xl font-bold">Create New Note</CardTitle>
          <CardDescription>
            Capture your important ideas and code snippets
          </CardDescription>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {userName}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 pt-3 pb-2 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Title</label>
              <span className="text-xs text-muted-foreground">
                {title.length ? `${title.length} characters` : "Required"}
              </span>
            </div>
            <Input
              id="note-title-input"
              placeholder="Give your note a descriptive title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`bg-${isDark ? "slate-800" : "background"} border-${
                isDark ? "slate-700" : "input"
              } rounded-md`}
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Content</label>
              <span className="text-xs text-muted-foreground">
                {charCount} characters
              </span>
            </div>
            <Textarea
              placeholder="Write your note content here. You can include code snippets, important concepts, or anything you want to remember."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setCharCount(e.target.value.length);
              }}
              className={`min-h-[200px] bg-${
                isDark ? "slate-800" : "background"
              } border-${
                isDark ? "slate-700" : "input"
              } rounded-md resize-none`}
            />
          </div>

          <div
            className={`rounded-md p-3 ${
              isDark ? "bg-slate-800/50" : "bg-muted/50"
            }`}
          >
            <p className="text-sm text-muted-foreground flex items-center">
              <span className="text-primary font-medium mr-1">Pro tip:</span>
              Organize your notes effectively by using clear titles and
              structured content.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 px-5 py-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onCancel}
            className="bg-transparent"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={() => onSave(title, content)}
            disabled={!title.trim()}
            className={`${
              isDark
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Note
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CreateNoteForm;
