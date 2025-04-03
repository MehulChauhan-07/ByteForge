import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}
// New collapsible section component for mobile
export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/40 py-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
      >
        <div className="flex items-center justify-center w-8 h-8">{icon}</div>
        <span className="text-lg font-medium">{title}</span>
        <motion.div
          className="ml-auto"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pl-10"
          >
            <div className="py-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
