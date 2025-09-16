import { motion } from "framer-motion";

const spinTransition = {
  repeat: Infinity,
  duration: 1,
  ease: "linear" as const,
};

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        animate={{ rotate: 360 }}
        transition={spinTransition}
        className="rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-muted-foreground"
      >
        <p>Loading your notes...</p>
      </motion.div>
    </div>
  );
};

export default LoadingState;
