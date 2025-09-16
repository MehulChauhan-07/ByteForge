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
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "View your personal dashboard",
  },
  {
    title: "Profile",
    href: "/profile",
    description: "Manage your profile settings",
  },
  {
    title: "Settings",
    href: "/settings",
    description: "Configure your account settings",
  },
];

export const LEARNING_ITEMS: NavItem[] = [
  {
    title: "Tutorials",
    href: "/tutorials",
    description: "Step-by-step learning guides",
  },
  {
    title: "Documentation",
    href: "/docs",
    description: "Comprehensive API documentation",
  },
  {
    title: "Examples",
    href: "/examples",
    description: "Code examples and snippets",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Latest updates and articles",
  },
];

export const TOOL_ITEMS: NavItem[] = [
  {
    title: "Code Editor",
    href: "/editor",
    description: "Online code editor",
  },
  {
    title: "API Testing",
    href: "/api-test",
    description: "Test your API endpoints",
  },
  {
    title: "Database Explorer",
    href: "/db-explorer",
    description: "Explore and manage databases",
  },
  {
    title: "Deployment",
    href: "/deploy",
    description: "Deploy your applications",
  },
];
