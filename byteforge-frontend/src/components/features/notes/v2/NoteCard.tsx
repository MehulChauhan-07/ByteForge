import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Note } from "@/services/noteService";
import { useTheme } from "@/components/layout/ThemeProvider";
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
import {
  Edit2,
  Save,
  X,
  Trash2,
  MoreHorizontal,
  Clock,
  Copy,
  Check,
  BookOpen,
  Star,
  StarOff,
  Lock,
  Maximize2,
  Minimize2,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface NoteCardProps {
  note: Note;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onUpdate: (id: number, title: string, content: string) => void;
  onDelete: (id: number) => void;
  isHighlighted?: boolean;
  userName: string;
  openPreview?: (note: Note) => void;
}

const NoteCard = ({
  note,
  isEditing,
  onEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
  isHighlighted = false,
  userName,
  openPreview,
}: NoteCardProps) => {
  const { theme } = useTheme();
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const isDark = theme === "dark";

  useEffect(() => {
    // Reset edited values when note changes
    setEditedTitle(note.title);
    setEditedContent(note.content);
  }, [note]);

  useEffect(() => {
    // Auto-focus title when editing
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditing]);

  const handleUpdate = () => {
    onUpdate(Number(note.id), editedTitle, editedContent);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(note.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Content copied to clipboard!");
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "Removed from favorites" : "Added to favorites",
      {
        icon: isFavorite ? (
          <StarOff className="h-4 w-4" />
        ) : (
          <Star className="h-4 w-4 text-yellow-500" />
        ),
      }
    );
  };

  const formattedDate = new Date(note.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Animation variants
  const containerVariants: Variants = {
    hover: {
      y: -8,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
    initial: {
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
    highlight: {
      boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.5)",
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        whileHover={isExpanded ? {} : "hover"}
        whileTap={isExpanded ? {} : "tap"}
        variants={containerVariants}
        // animate={isHighlighted ? "highlight" : "initial"}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        className={`relative ${isExpanded ? "z-50" : ""}`}
      >
        <Card
          className={`h-full flex flex-col ${
            isDark ? "bg-slate-900 border-slate-800" : "bg-card"
          } ${
            isEditing ? "ring-1 ring-primary" : ""
          } overflow-hidden shadow-md transition-shadow duration-300 ${
            isHovering && !isExpanded ? "shadow-lg" : "shadow-sm"
          } ${isFavorite ? "border-t-2 border-t-yellow-500" : ""}`}
        >
          {/* Expandable Card Content */}
          <AnimatePresence>
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className={`w-full max-w-3xl max-h-[90vh] overflow-auto rounded-lg border ${
                    isDark ? "bg-slate-900 border-slate-800" : "bg-card"
                  }`}
                >
                  <div className="sticky top-0 z-10 p-4 flex justify-between items-start border-b bg-inherit">
                    <div className="flex items-center gap-2">
                      {isFavorite && (
                        <Star className="h-5 w-5 text-yellow-500" />
                      )}
                      {isLocked && <Lock className="h-5 w-5 text-blue-500" />}
                      <h2 className="text-xl font-bold">{note.title}</h2>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsExpanded(false)}
                      className="rounded-full h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-6 whitespace-pre-line">{note.content}</div>
                  <div className="sticky bottom-0 bg-inherit border-t p-4 flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formattedDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {(note.content.match(/\n/g) || []).length + 1} lines
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsExpanded(false);
                          onEdit();
                        }}
                        className="h-8"
                        >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                        </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyContent}
                        className="h-8"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleToggleFavorite}
                        className="h-8"
                      >
                        {isFavorite ? (
                          <>
                            <StarOff className="h-4 w-4 mr-2" />
                            Unfavorite
                          </>
                        ) : (
                          <>
                            <Star className="h-4 w-4 mr-2" />
                            Favorite
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          {/* note card without hover */}
          <CardHeader className="pb-2 pt-4 px-4">
            <div className="flex justify-between items-start">
              {isEditing ? (
                <Input
                  ref={titleInputRef}
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className={`text-lg font-semibold bg-${
                    isDark ? "slate-800" : "background"
                  } border-${isDark ? "slate-700" : "input"}`}
                />
              ) : (
                <CardTitle className="line-clamp-2 pr-2 text-lg flex items-center gap-2">
                  {isFavorite && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 20, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Star className="h-4 w-4 text-yellow-500 inline" />
                    </motion.span>
                  )}
                  {isLocked && (
                    <Lock className="h-4 w-4 text-blue-500 inline" />
                  )}
                  {note.title}
                </CardTitle>
              )}
              <div className="flex gap-1">
                {isEditing ? (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={onCancelEdit}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="icon"
                        className={`h-8 w-8 ${
                          isDark
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-primary"
                        }`}
                        onClick={handleUpdate}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={onEdit}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className={
                          isDark ? "bg-slate-800 border-slate-700" : ""
                        }
                      >
                        <DropdownMenuItem onClick={onEdit}>
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsExpanded(true)}>
                          <Maximize2 className="h-4 w-4 mr-2" />
                          Expand
                        </DropdownMenuItem>
                        {openPreview && (
                          <DropdownMenuItem onClick={() => openPreview(note)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={handleToggleFavorite}>
                          {isFavorite ? (
                            <>
                              <StarOff className="h-4 w-4 mr-2" />
                              Remove from Favorites
                            </>
                          ) : (
                            <>
                              <Star className="h-4 w-4 mr-2" />
                              Add to Favorites
                            </>
                          )}
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem onClick={handleToggleLock}>
                          {isLocked ? (
                            <>
                              <LockOpen className="h-4 w-4 mr-2" />
                              Unlock Note
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4 mr-2" />
                              Lock Note
                            </>
                          )}
                        </DropdownMenuItem> */}
                        <DropdownMenuItem onClick={handleCopyContent}>
                          {copied ? (
                            <>
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Content
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setShowDeleteDialog(true)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </div>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-3 mt-2">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formattedDate}
              </div>
            </div>
          </CardHeader>
          <CardContent
            className={`flex-grow px-4 py-3 ${isEditing ? "pb-2" : ""}`}
          >
            {isEditing ? (
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className={`min-h-[180px] bg-${
                  isDark ? "slate-800" : "background"
                } border-${isDark ? "slate-700" : "input"} resize-none`}
              />
            ) : (
              <div className="text-sm text-muted-foreground line-clamp-6 whitespace-pre-line overflow-hidden">
                {note.content}
              </div>
            )}
          </CardContent>
          {!isEditing && (
            <CardFooter className="pt-0 px-4 pb-4 mt-auto">
              <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3 w-3" />
                  <span>
                    {(note.content.match(/\n/g) || []).length + 1} lines
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    <Maximize2 className="h-3 w-3" />
                    Expand
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyContent}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    {copied ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </motion.button>
                </div>
              </div>
            </CardFooter>
          )}

          {/* Interactive hover overlay */}
          {/* {isHovering && !isEditing && !isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end justify-center p-4"
            >
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setIsExpanded(true)}
                  className="bg-white/20 backdrop-blur-sm text-white border-0"
                >
                  <Eye className="h-4 w-4 mr-1" /> View
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onEdit}
                  className="bg-white/20 backdrop-blur-sm text-white border-0"
                >
                  <Edit2 className="h-4 w-4 mr-1" /> Edit
                </Button>
              </div>
            </motion.div>
          )} */}
        </Card>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent
          className={isDark ? "bg-slate-900 border-slate-800" : ""}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{note.title}"? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={isDark ? "bg-slate-800 hover:bg-slate-700" : ""}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(Number(note.id));
                setShowDeleteDialog(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NoteCard;
