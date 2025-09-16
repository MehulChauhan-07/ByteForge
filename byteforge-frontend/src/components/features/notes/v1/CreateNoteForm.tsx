import { useState } from "react";
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
import { Save, X } from "lucide-react";

interface CreateNoteFormProps {
  onCancel: () => void;
  onSave: (title: string, content: string) => void;
}

const CreateNoteForm = ({ onCancel, onSave }: CreateNoteFormProps) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
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
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                placeholder="Note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <Textarea
                placeholder="Write your note content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] bg-background"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={() => onSave(title, content)}>
            <Save className="mr-2 h-4 w-4" />
            Save Note
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CreateNoteForm;