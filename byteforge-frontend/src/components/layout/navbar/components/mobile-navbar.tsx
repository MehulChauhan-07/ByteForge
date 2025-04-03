import { Home, BookOpen, Code, List } from "lucide-react";

// Quick links for mobile
export const quickLinks = [
  { to: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
  {
    to: "/courses",
    label: "Courses",
    icon: <BookOpen className="h-5 w-5" />,
  },
  { to: "/compiler", label: "Compiler", icon: <Code className="h-5 w-5" /> },
  { to: "/topics", label: "Topics", icon: <List className="h-5 w-5" /> },
];
