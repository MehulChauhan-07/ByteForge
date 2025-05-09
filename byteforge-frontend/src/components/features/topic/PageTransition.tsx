// Add this to your main EnhancedTopicsPage component
import { motion, AnimatePresence } from 'framer-motion';

// Page transition variants
const pageTransitions = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// Then in your component return:x
return (
  <div className="flex-1 overflow-auto bg-background text-foreground">
    <AnimatePresence mode="wait">
      {!selectedTopic ? (
        <motion.div
          key="topic-list"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransitions}
          className="container mx-auto max-w-7xl px-4 py-8"
        >
          {/* Topics list content */}
        </motion.div>
      ) : (
        <motion.div
          key={`topic-${selectedTopic.id}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransitions}
          className="container mx-auto max-w-7xl px-4 py-8"
        >
          {/* Topic details content */}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
