import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, ArrowRight } from "lucide-react";

interface EmptyNoteStateProps {
  searchQuery: string;
  onClearSearch: () => void;
  onCreateNote: () => void;
  userName: string;
}

const EmptyNoteState = ({
  searchQuery,
  onClearSearch,
  onCreateNote,
  userName,
}: EmptyNoteStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12"
    >
      <motion.div
        className="inline-flex rounded-full bg-primary/10 p-6 mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.2,
        }}
      >
        <BookOpen className="h-10 w-10 text-primary" />
      </motion.div>

      <motion.h2
        className="text-2xl font-bold mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {searchQuery
          ? "No matching notes found"
          : "Your note collection is empty"}
      </motion.h2>

      <motion.p
        className="text-muted-foreground mb-6 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {searchQuery
          ? `We couldn't find any notes matching "${searchQuery}". Try a different search term or clear your search.`
          : `Welcome, ${userName}! Start organizing your ideas, code snippets, and important concepts by creating your first note.`}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row justify-center gap-3"
      >
        {searchQuery ? (
          <Button onClick={onClearSearch} variant="outline" className="group">
            Clear Search
            <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
          </Button>
        ) : (
          <Button
            onClick={onCreateNote}
            className="relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary/80 transition-transform duration-300 transform group-hover:scale-110"></span>
            <span className="relative flex items-center justify-center gap-2 z-10">
              <Plus className="mr-1 h-4 w-4" />
              Create Your First Note
              <ArrowRight className="ml-0 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
            </span>
          </Button>
        )}
      </motion.div>

      {!searchQuery && (
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[
            {
              title: "Organize Ideas",
              description:
                "Keep track of your thoughts, concepts, and learning resources.",
            },
            {
              title: "Save Code Snippets",
              description:
                "Store useful code examples and programming solutions.",
            },
            {
              title: "Access Anywhere",
              description:
                "Your notes sync across all your devices for easy access.",
            },
          ].map((item, i) => (
            <div key={i} className="p-4 border rounded-lg bg-card shadow-sm">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyNoteState;
