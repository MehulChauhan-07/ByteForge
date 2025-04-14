import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  description?: string;
}

interface CollapsibleSectionProps {
  title: string;
  items: NavItem[];
}

export function CollapsibleSection({ title, items }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 rounded-lg bg-background shadow-lg border border-border p-2">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <div className="font-medium">{item.title}</div>
              {item.description && (
                <div className="text-sm text-muted-foreground">
                  {item.description}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
