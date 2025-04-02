import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
  animationType?: "fade" | "slide" | "scale" | "flip" | "none";
}

const animationVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },
  slide: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  flip: {
    initial: { opacity: 0, rotateY: -10 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 10 },
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  none: {
    initial: {},
    animate: {},
    exit: {},
    transition: {},
  },
};

export function PageTransition({
  children,
  animationType = "fade",
}: PageTransitionProps) {
  const location = useLocation();
  const { initial, animate, exit, transition } =
    animationVariants[animationType];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
        className="w-full flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
// Animated Route wrapper component
export const AnimatedRoute = ({
  element,
  animationType,
}: {
  element: ReactNode;
  animationType?: "fade" | "slide" | "scale" | "flip" | "none";
}) => {
  return (
    <PageTransition animationType={animationType}>{element}</PageTransition>
  );
};
