import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface FilterChipsProps {
  filters: {
    key: string;
    label: string;
    value: string;
  }[];
  onClearFilter: (key: string) => void;
  onClearAll: () => void;
}

export const FilterChips = ({
  filters,
  onClearFilter,
  onClearAll,
}: FilterChipsProps) => {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {filters.map((filter) => (
        <motion.div
          key={`${filter.key}-${filter.value}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-muted rounded-full pl-3 pr-2 py-1 flex items-center gap-1 text-sm"
        >
          <span>
            {filter.label}: <strong>{filter.value}</strong>
          </span>
          <button
            className="text-muted-foreground hover:text-foreground rounded-full p-1"
            onClick={() => onClearFilter(filter.key)}
            aria-label={`Remove ${filter.label} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </motion.div>
      ))}

      {filters.length > 1 && (
        <button
          className="text-primary hover:underline text-sm"
          onClick={onClearAll}
        >
          Clear all
        </button>
      )}
    </div>
  );
};
