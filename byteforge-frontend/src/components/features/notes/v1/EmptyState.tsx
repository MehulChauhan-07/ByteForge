import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
  onClearSearch: () => void;
  onCreateNote: () => void;
}

const EmptyState = ({
  searchQuery,
  onClearSearch,
  onCreateNote,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex rounded-full bg-primary/10 p-6 mb-4">
        <BookOpen className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-2">No notes found</h2>
      <p className="text-muted-foreground mb-6">
        {searchQuery
          ? "No notes match your search criteria. Try a different search term."
          : "You haven't created any notes yet. Create your first note to get started!"}
      </p>
      {searchQuery ? (
        <Button onClick={onClearSearch} variant="outline">
          Clear Search
        </Button>
      ) : (
        <Button onClick={onCreateNote}>
          <Plus className="mr-2 h-4 w-4" />
          Create Your First Note
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
