import { Key, ReactNode } from "react";

export interface NavItem {
  icon: ReactNode;
  to: Key | null | undefined;
  title: string;
  href: string;
  description?: string;
}

export const QUICK_LINKS: NavItem[] = [
  {
    title: "Home",
    href: "/",
    description: "Return to the homepage",
    icon: undefined,
    to: undefined
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "View your personal dashboard",
    icon: undefined,
    to: undefined
  },
  {
    title: "Profile",
    href: "/profile",
    description: "Manage your profile settings",
    icon: undefined,
    to: undefined
  },
  {
    title: "Settings",
    href: "/settings",
    description: "Configure your account settings",
    icon: undefined,
    to: undefined
  },
];

export const LEARNING_ITEMS: NavItem[] = [
  {
    title: "Tutorials",
    href: "/tutorials",
    description: "Step-by-step learning guides",
    icon: undefined,
    to: undefined
  },
  {
    title: "Documentation",
    href: "/docs",
    description: "Comprehensive API documentation",
    icon: undefined,
    to: undefined
  },
  {
    title: "Examples",
    href: "/examples",
    description: "Code examples and snippets",
    icon: undefined,
    to: undefined
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Latest updates and articles",
    icon: undefined,
    to: undefined
  },
];

export const TOOL_ITEMS: NavItem[] = [
  {
    title: "Code Editor",
    href: "/editor",
    description: "Online code editor",
    icon: undefined,
    to: undefined
  },
  {
    title: "API Testing",
    href: "/api-test",
    description: "Test your API endpoints",
    icon: undefined,
    to: undefined
  },
  {
    title: "Database Explorer",
    href: "/db-explorer",
    description: "Explore and manage databases",
    icon: undefined,
    to: undefined
  },
  {
    title: "Deployment",
    href: "/deploy",
    description: "Deploy your applications",
    icon: undefined,
    to: undefined
  },
];
