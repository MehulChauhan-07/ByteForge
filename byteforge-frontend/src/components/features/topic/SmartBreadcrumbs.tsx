import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Topic } from "@/types";

interface BreadcrumbsProps {
  topic?: Topic;
  subtopic?: Subtopic;
}

export const SmartBreadcrumbs = ({ topic, subtopic }: BreadcrumbsProps) => {
  const location = useLocation();

  // Determine breadcrumb items based on current route
  let items = [{ label: "Home", path: "/" }];

  if (location.pathname.includes("/topics")) {
    items.push({ label: "Topics", path: "/topics" });

    if (topic) {
      items.push({
        label: topic.category,
        path: `/topics?category=${topic.category}`,
      });
      items.push({ label: topic.title, path: `/topics/${topic.id}` });

      if (subtopic) {
        items.push({
          label: subtopic.title,
          path: `/topics/${topic.id}/${subtopic.id}`,
        });
      }
    }
  }

  return (
    <nav className="flex items-center text-sm mb-6">
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          {index === 0 ? (
            <Link
              to={item.path}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-3.5 w-3.5 mr-1" />
              <span>{item.label}</span>
            </Link>
          ) : (
            <Link
              to={item.path}
              className={`text-${
                index === items.length - 1
                  ? "foreground font-medium"
                  : "muted-foreground hover:text-foreground transition-colors"
              }`}
            >
              {item.label}
            </Link>
          )}

          {index < items.length - 1 && (
            <ChevronRight className="h-3.5 w-3.5 mx-2 text-muted-foreground/50" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
