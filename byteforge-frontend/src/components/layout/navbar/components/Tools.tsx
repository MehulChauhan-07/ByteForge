import {
  Code,
  MessageSquare,
  Save,
  Users,
  Link as LinkIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CollapsibleSection } from "./CollapsibleSection";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TOOL_ITEMS } from "./navbar-Items";

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactElement;
  children: React.ReactNode;
}

{
  /* Tools section */
}
export const Tools = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Monitor location changes to close sidebar on navigation
  useEffect(() => {
    setIsSidebarOpen(false);
    setIsSearchOpen(false);
  }, [location]);
  // Handle closing the search
  const closeSearch = () => setIsSearchOpen(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <CollapsibleSection title="Tools" icon={<Code className="h-5 w-5" />}>
      <div className="flex flex-col gap-1">
        {TOOL_ITEMS.map((item) => (
          <Link
            key={String(item.to)}
            to={String(item.to)}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
            onClick={closeSidebar}
          >
            {item.icon}
            <div>
              <div className="text-sm font-medium">{item.title}</div>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </CollapsibleSection>
  );
};
