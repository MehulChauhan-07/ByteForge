import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface DropdownItemProps {
  to: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}
export const DropdownItem: React.FC<DropdownItemProps> = ({
  to,
  title,
  description,
  icon,
}) => (
  <motion.li
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <NavigationMenuLink asChild>
      <Link
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        to={to}
      >
        <div className={`${icon ? "flex items-center gap-2" : ""}`}>
          {icon}
          <div className="text-sm font-medium leading-none">{title}</div>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {description}
        </p>
      </Link>
    </NavigationMenuLink>
  </motion.li>
);
