import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Types for reusable components
interface NavLinkProps {
  to: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
// Reusable components
export const MobileNavLink: React.FC<NavLinkProps> = ({
  to,
  icon,
  children,
  onClick,
  className,
}) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 text-lg font-medium p-3 rounded-lg transition-colors hover:bg-accent hover:text-primary group",
      className
    )}
    onClick={onClick}
  >
    <div className="flex items-center justify-center w-8 h-8">{icon}</div>
    <span>{children}</span>
    <motion.div
      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
      initial={{ x: -10, opacity: 0 }}
      whileHover={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <ChevronRight className="h-4 w-4" />
    </motion.div>
  </Link>
);
