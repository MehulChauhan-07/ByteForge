import React, { useState } from "react";
import {
  ChevronUp,
  Plus,
  Menu,
  Home,
  BookOpen,
  Search,
  BookMarked,
  ArrowLeft,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface FloatingActionButtonProps {
  isTopicView: boolean;
  onBackClick?: () => void;
}

export const FloatingActionButton = ({
  isTopicView,
  onBackClick,
}: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAction = (action: string) => {
    setIsOpen(false);

    switch (action) {
      case "home":
        navigate("/");
        break;
      case "topics":
        navigate("/topics");
        break;
      case "search":
        // Open search modal or navigate to search page
        navigate("/search");
        break;
      case "bookmarks":
        navigate("/bookmarks");
        break;
      case "back":
        if (onBackClick) onBackClick();
        break;
      default:
        break;
    }
  };

  const menuItems = [
    {
      id: "home",
      icon: <Home className="h-4 w-4" />,
      label: "Home",
    },
    {
      id: "topics",
      icon: <BookOpen className="h-4 w-4" />,
      label: "All Topics",
    },
    {
      id: "search",
      icon: <Search className="h-4 w-4" />,
      label: "Search",
    },
    {
      id: "bookmarks",
      icon: <BookMarked className="h-4 w-4" />,
      label: "Bookmarks",
    },
  ];

  // Add back button if in topic view
  if (isTopicView && onBackClick) {
    menuItems.unshift({
      id: "back",
      icon: <ArrowLeft className="h-4 w-4" />,
      label: "Back",
    });
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-lg border mb-2"
          >
            <div className="space-y-1">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  className="flex items-center gap-3 w-full text-left rounded-md px-4 py-2 text-sm"
                  onClick={() => handleAction(item.id)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="bg-primary text-primary-foreground h-12 w-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </motion.button>
    </div>
  );
};
