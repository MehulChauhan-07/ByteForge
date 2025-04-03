import { Bookmark, BookOpen, Code, MessageSquare, Save, Users } from "lucide-react";

// Tools dropdown items
export const toolItems = [
  {
    to: "/compiler",
    title: "Java Compiler",
    description: "Write, compile, and run Java code in your browser",
    icon: <Code className="h-5 w-5" />,
  },
  {
    to: "/assistant",
    title: "AI Assistant",
    description: "Get help with coding problems and concepts",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    to: "/notes",
    title: "Note Taking",
    description: "Save and organize important concepts and code snippets",
    icon: <Save className="h-5 w-5" />,
  },
  {
    to: "/community",
    title: "Community",
    description: "Connect with other learners and Java experts",
    icon: <Users className="h-5 w-5" />,
  },
];

// Learning dropdown items
export const learningItems = [
  {
    to: "/tutorials",
    title: "Tutorials",
    description: "Step-by-step guides for specific Java topics",
    icon: <Bookmark className="h-5 w-5" />,
  },
  {
    to: "/exercises",
    title: "Exercises",
    description: "Practice with coding challenges and projects",
    icon: <Code className="h-5 w-5" />,
  },
  {
    to: "/certification",
    title: "Certification",
    description: "Earn certificates to showcase your Java skills",
    icon: <BookOpen className="h-5 w-5" />,
  },
];

// Popular search suggestions
export const popularSearches = [
  "Java basics",
  "OOP concepts",
  "Collections",
  "File handling",
];
