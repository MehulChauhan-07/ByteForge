"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  X,
  Search,
  Code,
  BookOpen,
  MessageSquare,
  Save,
  Users,
  Home,
  Bookmark,
  Info,
  List,
  User,
  Bell,
  Globe,
  Loader2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Badge,
  ChevronDown,
  FileText,
  GraduationCap,
  Hash,
  ArrowLeft,
} from "lucide-react";
import { ModeToggle } from "@/components/shared/ModeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@components/ui/navigation-menu";
import { Logo } from "@/components/ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDebounce } from "@hooks/useDebounce";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { useAuth } from "@context/AuthContext";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut, History, HelpCircle } from "lucide-react";

// Constants
const QUICK_LINKS = [
  { to: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
  { to: "/courses", label: "Courses", icon: <BookOpen className="h-5 w-5" /> },
  { to: "/compiler", label: "Compiler", icon: <Code className="h-5 w-5" /> },
  { to: "/topics", label: "Topics", icon: <List className="h-5 w-5" /> },
];

const LEARNING_ITEMS = [
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

const TOOL_ITEMS = [
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

const POPULAR_SEARCHES = [
  "Java basics",
  "OOP concepts",
  "Collections",
  "File handling",
];

const NOTIFICATION_TYPES = {
  info: { icon: <Info className="h-4 w-4" />, color: "text-blue-500" },
  success: {
    icon: <CheckCircle className="h-4 w-4" />,
    color: "text-green-500",
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4" />,
    color: "text-yellow-500",
  },
  error: { icon: <XCircle className="h-4 w-4" />, color: "text-red-500" },
};

// Types
interface NavLinkProps {
  to: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface DropdownItemProps {
  to: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface CollapsibleSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface SearchSuggestion {
  id: string;
  title: string;
  type: "topic" | "course" | "article";
  url: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: Date;
  url: string;
}

interface UserProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResultsProps {
  searchQuery: string;
  searchSuggestions: SearchSuggestion[];
  isLoadingSuggestions: boolean;
  selectedSuggestionIndex: number;
  handleSuggestionClick: (suggestion: SearchSuggestion) => void;
  handleViewAllResults: () => void;
  containerStyle?: string;
}

// Helper functions
const getSuggestionIcon = (type: string) => {
  switch (type) {
    case "topic":
      return <Hash className="h-4 w-4 text-primary" />;
    case "course":
      return <GraduationCap className="h-4 w-4 text-green-500" />;
    case "article":
      return <FileText className="h-4 w-4 text-blue-500" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

const getBadgeVariant = (type: string): "default" | "secondary" | "outline" => {
  switch (type) {
    case "topic":
      return "default";
    case "course":
      return "secondary";
    case "article":
      return "outline";
    default:
      return "default";
  }
};

// Reusable Components
const MobileNavLink = React.memo(
  ({ to, icon, children, onClick, className }: NavLinkProps) => (
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
      ></motion.div>
    </Link>
  )
);

const CollapsibleSection = React.memo(
  ({ title, icon, children, defaultOpen = false }: CollapsibleSectionProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
      <div className="border-b border-border/40 py-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center w-full gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
          aria-expanded={isOpen}
        >
          <div className="flex items-center justify-center w-8 h-8">{icon}</div>
          <span className="text-lg font-medium">{title}</span>
          <motion.div
            className="ml-auto"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden pl-10"
            >
              <div className="py-2">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

const DropdownItem = React.memo(
  ({ to, title, description, icon }: DropdownItemProps) => (
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
  )
);

const SearchResults = ({
  searchQuery,
  searchSuggestions,
  isLoadingSuggestions,
  selectedSuggestionIndex,
  handleSuggestionClick,
  handleViewAllResults,
  containerStyle,
}: SearchResultsProps) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredSuggestions = activeFilter
    ? searchSuggestions.filter((s) => s.type === activeFilter)
    : searchSuggestions;

  if (!searchQuery.trim() && !isLoadingSuggestions) return null;

  return (
    <motion.div
      className={cn(
        "absolute top-full left-0 w-full bg-popover rounded-md shadow-lg border mt-2 max-h-[80vh] overflow-hidden",
        containerStyle
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {searchQuery.length > 2 && !isLoadingSuggestions && (
        <div className="p-2 border-b flex gap-1 overflow-x-auto">
          <Button
            variant={activeFilter === null ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter(null)}
            className="whitespace-nowrap"
          >
            All Results
          </Button>
          {["topic", "course", "article"].map((type) => (
            <Button
              key={type}
              variant={activeFilter === type ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(type)}
              className="whitespace-nowrap"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}s
            </Button>
          ))}
        </div>
      )}

      <div className="overflow-y-auto max-h-[60vh]">
        {isLoadingSuggestions ? (
          <div className="p-6 flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-6 w-6 text-muted-foreground" />
            </motion.div>
            <span className="mt-2 text-sm text-muted-foreground">
              Searching...
            </span>
          </div>
        ) : filteredSuggestions.length > 0 ? (
          <div className="p-2">
            {filteredSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                className={`p-3 hover:bg-accent rounded-md cursor-pointer transition-colors ${
                  selectedSuggestionIndex === index
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50"
                }`}
                whileHover={{ x: 5, backgroundColor: "var(--accent)" }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.05,
                }}
                onClick={() => handleSuggestionClick(suggestion)}
                // Staggered animation for results
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    {getSuggestionIcon(suggestion.type)}
                    <div className="text-sm font-medium">
                      {suggestion.title}
                    </div>
                  </div>
                  <Badge
                    className={`ml-auto ${getBadgeVariant(suggestion.type)}`}
                  >
                    {suggestion.type}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          searchQuery.length > 0 && (
            <div className="p-6 text-center space-y-3">
              <p className="text-muted-foreground">
                No results found for "{searchQuery}"
              </p>
              <p className="text-sm text-muted-foreground">
                Try a different search term or browse topics
              </p>
            </div>
          )
        )}
      </div>

      {searchQuery.length > 0 && (
        <div className="border-t p-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-primary hover:text-primary"
            onClick={handleViewAllResults}
          >
            <Search className="h-4 w-4 mr-2" />
            View all results for "{searchQuery}"
          </Button>
        </div>
      )}
    </motion.div>
  );
};

const UserProfileDropdown = ({ isOpen, onClose }: UserProfileDropdownProps) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute right-0 mt-2 w-64 bg-popover rounded-md shadow-lg border z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.username
                  )}&background=random`}
                  alt={user.username}
                />
                <AvatarFallback>
                  {user.username
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{user.username}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="p-2">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bookmark className="mr-2 h-4 w-4" />
              Saved Items
            </DropdownMenuItem>
            <DropdownMenuItem>
              <History className="mr-2 h-4 w-4" />
              History
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NotificationDropdown = ({
  notifications,
  handleNotificationClick,
  handleMarkAllAsRead,
}: {
  notifications: Notification[];
  handleNotificationClick: (notification: Notification) => void;
  handleMarkAllAsRead: () => void;
}) => (
  <motion.div
    className="absolute right-0 mt-2 w-80 bg-popover rounded-md shadow-lg border z-50"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <div className="p-2 border-b">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Notifications</h3>
        <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
          Mark all as read
        </Button>
      </div>
    </div>
    <div className="max-h-96 overflow-y-auto">
      {notifications.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">
          No notifications
        </div>
      ) : (
        notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className={`p-3 border-b cursor-pointer hover:bg-accent transition-colors ${
              !notification.read ? "bg-accent/50" : ""
            }`}
            onClick={() => handleNotificationClick(notification)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-start gap-2">
              <div className={NOTIFICATION_TYPES[notification.type].color}>
                {NOTIFICATION_TYPES[notification.type].icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{notification.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <time className="text-xs text-muted-foreground">
                  {new Date(notification.timestamp).toLocaleString()}
                </time>
              </div>
              {!notification.read && (
                <div className="h-2 w-2 rounded-full bg-primary" />
              )}
            </div>
          </motion.div>
        ))
      )}
    </div>
  </motion.div>
);

const LanguageMenu = ({
  activeLanguage,
  handleLanguageChange,
}: {
  activeLanguage: string;
  handleLanguageChange: (lang: string) => void;
}) => (
  <motion.div
    className="absolute right-0 mt-2 w-48 bg-popover rounded-md shadow-lg border z-50"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <div className="p-2">
      {["en", "es", "fr", "de", "ja"].map((lang) => (
        <button
          key={lang}
          className={`w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors ${
            activeLanguage === lang ? "bg-accent" : ""
          }`}
          onClick={() => handleLanguageChange(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  </motion.div>
);

// Skip to content link for accessibility
const SkipToContentLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-background focus:px-4 focus:py-2 focus:rounded focus:ring-2 focus:ring-primary"
  >
    Skip to content
  </a>
);

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (!isAuthenticated) {
    return (
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-800">
                  ByteForge
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-800">
                ByteForge
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${
                        user?.username || "User"
                      }&background=random`}
                      alt={user?.username || "User"}
                    />
                    <AvatarFallback>
                      {getInitials(user?.username || "User")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.username || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || ""}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <Settings className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
