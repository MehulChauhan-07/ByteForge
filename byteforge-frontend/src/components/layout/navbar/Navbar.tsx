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
  ChevronRight,
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
import { useTheme } from "../ThemeProvider";
import { topics, categories } from "@/data/topics";
import { useProgress } from "@/context/ProgressContext";

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
    to: "/tools/compiler",
    title: "Java Compiler",
    description: "Write, compile, and run Java code in your browser",
    icon: <Code className="h-5 w-5" />,
  },
  {
    to: "/tools/assistant",
    title: "AI Assistant",
    description: "Get help with coding problems and concepts",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    to: "/tools/notes",
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
  user: {
    name: string;
    email: string;
  };
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
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

// Update the Avatar component in the UserProfileDropdown

const UserProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt={user.username} />
            <AvatarFallback>
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/dashboard")}>
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const { getCompletionPercentage } = useProgress();

  // new popup search
  const [showSearch, setShowSearch] = useState(false);
  // Search state variables - separate for different UI contexts
  const [searchQuery, setSearchQuery] = useState("");
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [sidebarSearchOpen, setSidebarSearchOpen] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  // Other UI state variables
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<
    SearchSuggestion[]
  >([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("en");
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const { theme } = useTheme();

  // Debounced search query for API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const sidebarSearchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const userProfileRef = useRef<HTMLDivElement>(null);

  // Router hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Close UI elements when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
    setDesktopSearchOpen(false);
    setMobileSearchOpen(false);
    setSidebarSearchOpen(false);
    setIsNotificationOpen(false);
    setIsLanguageMenuOpen(false);
    setUserProfileOpen(false);
  }, [location]);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // search section
  //  modern search section
  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchOverlay(false);
      navigate(`/topics?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };
  const recommendedTopics = [...topics]
    .sort((a, b) => {
      const progressA = getCompletionPercentage(a.id);
      const progressB = getCompletionPercentage(b.id);

      // Sort by in-progress topics first (those with some progress but not complete)
      if (
        progressA > 0 &&
        progressA < 100 &&
        (progressB === 0 || progressB === 100)
      ) {
        return -1;
      }
      if (
        progressB > 0 &&
        progressB < 100 &&
        (progressA === 0 || progressA === 100)
      ) {
        return 1;
      }
      // Then by not started topics
      if (progressA === 0 && progressB > 0) {
        return -1;
      }
      if (progressB === 0 && progressA > 0) {
        return 1;
      }
      // Default to newer topics
      return b.id.localeCompare(a.id);
    })
    .slice(0, 3);
  // old search section
  // Load recent searches from localStorage
  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      try {
        setRecentSearches(JSON.parse(storedSearches));
      } catch (error) {
        console.error("Failed to parse recent searches:", error);
      }
    }
  }, []);

  // Fetch search suggestions
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      setIsLoadingSuggestions(true);
      setSelectedSuggestionIndex(-1);

      // Simulate API call
      setTimeout(() => {
        // First try to match exactly with POPULAR_SEARCHES
        const exact = POPULAR_SEARCHES.filter(
          (item) => item.toLowerCase() === debouncedSearchQuery.toLowerCase()
        );

        // Then get partial matches
        const partial = POPULAR_SEARCHES.filter(
          (item) =>
            item.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) &&
            !exact.includes(item)
        );

        // Combine and create suggestion objects
        const matches = [...exact, ...partial];

        // Create a mix of different types
        const suggestions: SearchSuggestion[] = [
          ...matches.map((item) => ({
            id: `topic-${item}`,
            title: item,
            type: "topic" as const,
            url: `/topics?q=${encodeURIComponent(item)}`,
          })),
          // Add some course results
          ...(debouncedSearchQuery.toLowerCase().includes("java")
            ? [
                {
                  id: "course-java-basics",
                  title: "Java Programming Basics",
                  type: "course" as const,
                  url: "/courses/java-basics",
                },
                {
                  id: "course-java-advanced",
                  title: "Advanced Java Concepts",
                  type: "course" as const,
                  url: "/courses/java-advanced",
                },
              ]
            : []),
          // Add some article results
          ...(debouncedSearchQuery.toLowerCase().includes("oop")
            ? [
                {
                  id: "article-oop-principles",
                  title: "OOP Principles in Java",
                  type: "article" as const,
                  url: "/articles/oop-principles",
                },
                {
                  id: "article-inheritance",
                  title: "Understanding Inheritance",
                  type: "article" as const,
                  url: "/articles/inheritance",
                },
              ]
            : []),
        ].slice(0, 6);

        setSearchSuggestions(suggestions);
        setIsLoadingSuggestions(false);
      }, 500);
    } else {
      setSearchSuggestions([]);
      setIsLoadingSuggestions(false);
    }
  }, [debouncedSearchQuery]);

  // Load notifications
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const storedNotifications = localStorage.getItem("notifications");
        if (storedNotifications) {
          const parsedNotifications = JSON.parse(storedNotifications);
          setNotifications(parsedNotifications);
          setUnreadCount(
            parsedNotifications.filter((n: Notification) => !n.read).length
          );
        } else {
          // Create sample notifications if none exist
          const sampleNotifications: Notification[] = [
            {
              id: "1",
              title: "New Course Available",
              message: "Check out our new Advanced Java Collections course!",
              type: "info",
              read: false,
              timestamp: new Date(),
              url: "/courses/java-collections",
            },
            {
              id: "2",
              title: "Quiz Completed",
              message: "You scored 85% in Java Basics Quiz",
              type: "success",
              read: true,
              timestamp: new Date(Date.now() - 86400000), // 1 day ago
              url: "/topics/java-basics",
            },
          ];
          setNotifications(sampleNotifications);
          setUnreadCount(sampleNotifications.filter((n) => !n.read).length);
          localStorage.setItem(
            "notifications",
            JSON.stringify(sampleNotifications)
          );
        }
      } catch (err) {
        console.error("Error loading notifications:", err);
      }
    };

    loadNotifications();
  }, []);

  // Handle escape key for closing UI elements
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (desktopSearchOpen) setDesktopSearchOpen(false);
        if (mobileSearchOpen) setMobileSearchOpen(false);
        if (sidebarSearchOpen) setSidebarSearchOpen(false);
        if (isSidebarOpen) setIsSidebarOpen(false);
        if (isNotificationOpen) setIsNotificationOpen(false);
        if (isLanguageMenuOpen) setIsLanguageMenuOpen(false);
        if (userProfileOpen) setUserProfileOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [
    desktopSearchOpen,
    mobileSearchOpen,
    sidebarSearchOpen,
    isSidebarOpen,
    isNotificationOpen,
    isLanguageMenuOpen,
    userProfileOpen,
  ]);

  // Click outside handlers
  useOnClickOutside(desktopSearchRef, () => setDesktopSearchOpen(false));
  useOnClickOutside(mobileSearchRef, () => setMobileSearchOpen(false));
  useOnClickOutside(notificationRef, () => setIsNotificationOpen(false));
  useOnClickOutside(languageMenuRef, () => setIsLanguageMenuOpen(false));
  useOnClickOutside(userProfileRef, () => setUserProfileOpen(false));

  // Focus search input when opened
  useEffect(() => {
    const timer = setTimeout(() => {
      if (desktopSearchOpen && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [desktopSearchOpen]);

  // Callback functions
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchSuggestions([]);
    setDesktopSearchOpen(false);
    setMobileSearchOpen(false);
    setSidebarSearchOpen(false);
  }, []);

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      setIsLoadingSuggestions(true);
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    // Add to recent searches
    const updatedRecentSearches = [
      suggestion.title,
      ...recentSearches.filter((s) => s !== suggestion.title),
    ].slice(0, 5); // Keep only 5 recent searches

    setRecentSearches(updatedRecentSearches);
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updatedRecentSearches)
    );

    // Navigate and close search
    navigate(suggestion.url);
    clearSearch();
  };

  const handleViewAllResults = () => {
    navigate(`/topics?q=${encodeURIComponent(searchQuery)}`);
    clearSearch();
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (!searchSuggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) =>
        prev < searchSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) =>
        prev > 0 ? prev - 1 : searchSuggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedSuggestionIndex >= 0) {
        handleSuggestionClick(searchSuggestions[selectedSuggestionIndex]);
      } else if (searchQuery.trim()) {
        handleViewAllResults();
      }
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      const updatedNotifications = notifications.map((n) =>
        n.id === notification.id ? { ...n, read: true } : n
      );
      setNotifications(updatedNotifications);
      setUnreadCount((prev) => prev - 1);
      localStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );
    }
    // Navigate to the notification's target
    navigate(notification.url);
    setIsNotificationOpen(false);
  };

  const handleMarkAllAsRead = () => {
    const allRead = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(allRead);
    setUnreadCount(0);
    localStorage.setItem("notifications", JSON.stringify(allRead));
  };

  const handleLanguageChange = (language: string) => {
    setActiveLanguage(language);
    setIsLanguageMenuOpen(false);
    localStorage.setItem("language", language);
  };

  const handleLogout = useCallback(() => {
    logout();
    closeSidebar();
  }, [closeSidebar]);

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  return (
    <>
      <SkipToContentLink />
      <motion.header
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
          scrolled ? "shadow-md" : ""
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Left side: Logo and navigation */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile menu */}
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[350px] p-0 overflow-hidden [&>button]:hidden"
              >
                <motion.nav
                  className="flex h-full flex-col gap-4 overflow-hidden"
                  aria-label="Mobile navigation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header with logo and close button */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <Link
                      to="/"
                      className="flex items-center gap-2 text-lg font-bold"
                      onClick={closeSidebar}
                    >
                      <Logo className="h-8 w-8" aria-hidden="true" />
                      <span>ByteForge</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeSidebar}
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Quick search for mobile sidebar */}
                  <div className="px-4" ref={sidebarSearchRef}>
                    <div className="relative flex-1 max-w-md">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search topics, courses, articles..."
                          className="pl-9"
                          value={searchQuery}
                          onChange={handleSearchQueryChange}
                          onFocus={() => setSidebarSearchOpen(true)}
                          onKeyDown={handleSearchKeyDown}
                        />
                        {searchQuery && (
                          <button
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setSearchQuery("")}
                            aria-label="Clear search"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {sidebarSearchOpen && (
                          <SearchResults
                            searchQuery={searchQuery}
                            searchSuggestions={searchSuggestions}
                            isLoadingSuggestions={isLoadingSuggestions}
                            selectedSuggestionIndex={selectedSuggestionIndex}
                            handleSuggestionClick={handleSuggestionClick}
                            handleViewAllResults={handleViewAllResults}
                            containerStyle="z-50"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Quick links */}
                  <div className="px-4 py-2">
                    <div className="grid grid-cols-2 gap-2">
                      {QUICK_LINKS.map((link) => (
                        <motion.div
                          key={link.to}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            to={link.to}
                            className="flex flex-col items-center justify-center gap-1 p-3 bg-accent/50 rounded-lg hover:bg-accent transition-colors text-center"
                            onClick={closeSidebar}
                          >
                            {link.icon}
                            <span className="text-sm font-medium">
                              {link.label}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Menu with collapsible sections */}
                  <div className="flex-1 overflow-y-auto px-4 py-2">
                    <CollapsibleSection
                      title="Learning"
                      icon={<BookOpen className="h-5 w-5" />}
                      defaultOpen={true}
                    >
                      <div className="flex flex-col gap-1">
                        {LEARNING_ITEMS.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
                            onClick={closeSidebar}
                          >
                            {item.icon}
                            <div>
                              <div className="text-sm font-medium">
                                {item.title}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CollapsibleSection>

                    <CollapsibleSection
                      title="Tools"
                      icon={<Code className="h-5 w-5" />}
                    >
                      <div className="flex flex-col gap-1">
                        {TOOL_ITEMS.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
                            onClick={closeSidebar}
                          >
                            {item.icon}
                            <div>
                              <div className="text-sm font-medium">
                                {item.title}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CollapsibleSection>

                    <div className="py-2">
                      <MobileNavLink
                        to="/about"
                        icon={<Info className="h-5 w-5" />}
                        onClick={closeSidebar}
                      >
                        About
                      </MobileNavLink>
                    </div>
                  </div>

                  {/* Authentication links */}
                  <div className="p-4 border-t flex gap-2">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    ) : isAuthenticated && user ? (
                      <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <div className="relative" ref={notificationRef}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setIsNotificationOpen(!isNotificationOpen)
                            }
                            aria-label="Notifications"
                            aria-expanded={isNotificationOpen}
                          >
                            <div className="relative">
                              <Bell className="h-5 w-5" />
                              {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                                  {unreadCount}
                                </span>
                              )}
                            </div>
                          </Button>
                          <AnimatePresence>
                            {isNotificationOpen && (
                              <NotificationDropdown
                                notifications={notifications}
                                handleNotificationClick={
                                  handleNotificationClick
                                }
                                handleMarkAllAsRead={handleMarkAllAsRead}
                              />
                            )}
                          </AnimatePresence>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center">
                          <UserProfileDropdown />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => navigate("/login")}
                        >
                          Log in
                        </Button>
                        <Button onClick={() => navigate("/signup")}>
                          Sign up
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                to="/"
                className="flex items-center gap-2"
                aria-label="ByteForge home"
              >
                <Logo className="h-9 w-9 md:block" aria-hidden="true" />
                <span className="text-xl font-bold">ByteForge</span>
              </Link>
            </motion.div>

            {/* Desktop navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {/* Learn dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="group">
                    <span>Learn</span>
                    <motion.div
                      animate={{ rotate: isSidebarOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-1"
                    >
                      {/* <ChevronDown className="h-4 w-4" /> */}
                    </motion.div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.ul
                      className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.li
                        className="row-span-3"
                        whileHover={{ scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                            to="/courses"
                          >
                            <BookOpen
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              Java Courses
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Comprehensive Java learning paths for all skill
                              levels
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </motion.li>

                      {LEARNING_ITEMS.map((item, index) => (
                        <motion.div
                          key={item.to}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <DropdownItem
                            to={item.to}
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                          />
                        </motion.div>
                      ))}
                    </motion.ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Tools dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="group">
                    <span>Tools</span>
                    <motion.div
                      animate={{ rotate: isSidebarOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-1"
                    >
                      {/* <ChevronDown className="h-4 w-4" /> */}
                    </motion.div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.ul
                      className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {TOOL_ITEMS.map((item, index) => (
                        <motion.div
                          key={item.to}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <DropdownItem
                            to={item.to}
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                          />
                        </motion.div>
                      ))}
                    </motion.ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Regular navigation links */}
                <NavigationMenuItem>
                  <Link to="/topics" className={navigationMenuTriggerStyle()}>
                    Topics
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about" className={navigationMenuTriggerStyle()}>
                    About
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side: Search, theme toggle, and auth buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Desktop Search Button and Dropdown */}
            <div className="hidden md:block relative" ref={desktopSearchRef}>
              {/* <Button
                variant="ghost"
                size="icon"
                className="flex items-center justify-center"
                onClick={() => setDesktopSearchOpen(!desktopSearchOpen)}
                aria-label="Toggle search"
              >
                <Search className="h-5 w-5" />
              </Button> */}
              <button
                // onClick={() => setShowSearchOverlay(true)}
                onClick={() => setShowSearch(!showSearch)}
                className={`p-2 rounded-md ${
                  theme === "dark"
                    ? "hover:bg-slate-800 text-slate-300"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* search results */}
              <AnimatePresence>
                {desktopSearchOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-80 bg-popover rounded-md shadow-lg border p-2 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                      <Input
                        ref={searchInputRef}
                        type="search"
                        placeholder="Search topics, courses, articles..."
                        className="pl-9 pr-8"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        onKeyDown={handleSearchKeyDown}
                      />
                      {searchQuery && (
                        <button
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() => setSearchQuery("")}
                          aria-label="Clear search"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {/* Show recent searches when no query */}
                    {!searchQuery.trim() && recentSearches.length > 0 && (
                      <div className="mt-2">
                        <h4 className="text-xs uppercase text-muted-foreground px-2 py-1 border-b">
                          Recent Searches
                        </h4>
                        <div className="p-1">
                          {recentSearches.map((search, index) => (
                            <div
                              key={`recent-${index}`}
                              className="p-2 hover:bg-accent rounded-md cursor-pointer flex items-center gap-2 transition-transform hover:translate-x-1"
                              onClick={() => {
                                setSearchQuery(search);
                              }}
                            >
                              <History className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{search}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <AnimatePresence>
                      {(searchQuery || isLoadingSuggestions) && (
                        <SearchResults
                          searchQuery={searchQuery}
                          searchSuggestions={searchSuggestions}
                          isLoadingSuggestions={isLoadingSuggestions}
                          selectedSuggestionIndex={selectedSuggestionIndex}
                          handleSuggestionClick={handleSuggestionClick}
                          handleViewAllResults={handleViewAllResults}
                          containerStyle="relative top-1 left-0 w-full"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Search Button and Popup */}
            <div className="md:hidden relative" ref={mobileSearchRef}>
              <Button
                variant="ghost"
                size="icon"
                className="flex items-center justify-center"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                aria-label="Toggle search"
              >
                <Search className="h-5 w-5" />
              </Button>
              <AnimatePresence>
                {mobileSearchOpen && (
                  <motion.div
                    className="fixed inset-0 z-[999] bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-full max-w-2xl">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search topics, lessons or concepts..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={`w-full p-4 pl-12 rounded-xl text-lg
                                  ${
                                    theme === "dark"
                                      ? "bg-slate-800 text-white border-slate-700 focus:border-blue-500"
                                      : "bg-white text-slate-900 border-slate-200 focus:border-blue-500"
                                  } 
                                  border-2 outline-none transition-colors`}
                          autoFocus
                        />
                        <Search
                          className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5
                                ${
                                  theme === "dark"
                                    ? "text-slate-400"
                                    : "text-slate-500"
                                }`}
                        />
                        <button
                          className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full
                                  ${
                                    theme === "dark"
                                      ? "text-slate-400 hover:bg-slate-700"
                                      : "text-slate-500 hover:bg-slate-100"
                                  }`}
                          onClick={() => setShowSearch(false)}
                        >
                          ✕
                        </button>
                      </div>

                      {searchQuery && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`mt-4 rounded-xl overflow-hidden
                                  ${
                                    theme === "dark"
                                      ? "bg-slate-800 border border-slate-700"
                                      : "bg-white shadow-lg"
                                  }`}
                        >
                          <div
                            className={`p-3
                                  ${
                                    theme === "dark"
                                      ? "border-b border-slate-700"
                                      : "border-b border-slate-100"
                                  }`}
                          >
                            <p
                              className={`text-sm
                                    ${
                                      theme === "dark"
                                        ? "text-slate-400"
                                        : "text-slate-500"
                                    }`}
                            >
                              Search results for "{searchQuery}"
                            </p>
                          </div>
                          <div className="p-1">
                            {topics
                              .filter(
                                (topic) =>
                                  topic.title
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()) ||
                                  topic.description
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()) ||
                                  topic.tags?.some((tag) =>
                                    tag
                                      .toLowerCase()
                                      .includes(searchQuery.toLowerCase())
                                  ) ||
                                  topic.topics?.some((t: string) =>
                                    t
                                      .toLowerCase()
                                      .includes(searchQuery.toLowerCase())
                                  )
                              )
                              .slice(0, 5)
                              .map((topic) => (
                                <button
                                  key={topic.id}
                                  className={`flex items-center w-full text-left p-3 rounded-lg
                                          ${
                                            theme === "dark"
                                              ? "hover:bg-slate-700"
                                              : "hover:bg-slate-50"
                                          }`}
                                  onClick={() => {
                                    navigate(`/topics/${topic.id}`);
                                    setShowSearch(false);
                                  }}
                                >
                                  <div
                                    className={`p-2 rounded-full mr-3
                                          ${
                                            theme === "dark"
                                              ? "bg-slate-700"
                                              : "bg-slate-100"
                                          }`}
                                  >
                                    <BookOpen
                                      className={`h-4 w-4
                                            ${
                                              theme === "dark"
                                                ? "text-blue-400"
                                                : "text-blue-500"
                                            }`}
                                    />
                                  </div>
                                  <div className="flex-grow">
                                    <h3
                                      className={`font-medium
                                            ${
                                              theme === "dark"
                                                ? "text-white"
                                                : "text-slate-900"
                                            }`}
                                    >
                                      {topic.title}
                                    </h3>
                                    <p
                                      className={`text-sm truncate
                                            ${
                                              theme === "dark"
                                                ? "text-slate-400"
                                                : "text-slate-500"
                                            }`}
                                    >
                                      {topic.description}
                                    </p>
                                  </div>
                                  <ChevronRight
                                    className={`h-4 w-4
                                          ${
                                            theme === "dark"
                                              ? "text-slate-500"
                                              : "text-slate-400"
                                          }`}
                                  />
                                </button>
                              ))}
                          </div>
                          <div
                            className={`p-3 text-center
                                  ${
                                    theme === "dark"
                                      ? "border-t border-slate-700"
                                      : "border-t border-slate-100"
                                  }`}
                          >
                            <button
                              className={`text-sm font-medium
                                      ${
                                        theme === "dark"
                                          ? "text-blue-400 hover:text-blue-300"
                                          : "text-blue-600 hover:text-blue-700"
                                      }`}
                              onClick={() => {
                                navigate(`/topics?q=${searchQuery}`);
                                setShowSearch(false);
                              }}
                            >
                              See all results
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notification buttons */}
            {isAuthenticated && user && (
              <>
                <div className="relative" ref={notificationRef}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex items-center justify-center"
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    aria-label="Notifications"
                    aria-expanded={isNotificationOpen}
                  >
                    <div className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </Button>
                  <AnimatePresence>
                    {isNotificationOpen && (
                      <NotificationDropdown
                        notifications={notifications}
                        handleNotificationClick={handleNotificationClick}
                        handleMarkAllAsRead={handleMarkAllAsRead}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* <div className="relative" ref={languageMenuRef}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                    aria-label="Language"
                    aria-expanded={isLanguageMenuOpen}
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                  <AnimatePresence>
                    {isLanguageMenuOpen && (
                      <LanguageMenu
                        activeLanguage={activeLanguage}
                        handleLanguageChange={handleLanguageChange}
                      />
                    )}
                  </AnimatePresence>
                </div> */}

                <div className="flex items-center">
                  <UserProfileDropdown />
                </div>
              </>
            )}

            {/* Add this right before the ModeToggle */}
            {!isAuthenticated && !isLoading && (
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="text-sm"
                >
                  Log in
                </Button>
                <Button onClick={() => navigate("/signup")} className="text-sm">
                  Sign up
                </Button>
              </div>
            )}
            <ModeToggle />
          </div>
        </div>
      </motion.header>

      {/* Search overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="fixed inset-0 z-[999] bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-full max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search topics, lessons or concepts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full p-4 pl-12 rounded-xl text-lg
                          ${
                            theme === "dark"
                              ? "bg-slate-800 text-white border-slate-700 focus:border-blue-500"
                              : "bg-white text-slate-900 border-slate-200 focus:border-blue-500"
                          } 
                          border-2 outline-none transition-colors`}
                  autoFocus
                />
                <Search
                  className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5
                        ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}
                />
                <button
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full
                          ${
                            theme === "dark"
                              ? "text-slate-400 hover:bg-slate-700"
                              : "text-slate-500 hover:bg-slate-100"
                          }`}
                  onClick={() => setShowSearch(false)}
                >
                  ✕
                </button>
              </div>

              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 rounded-xl overflow-hidden
                          ${
                            theme === "dark"
                              ? "bg-slate-800 border border-slate-700"
                              : "bg-white shadow-lg"
                          }`}
                >
                  <div
                    className={`p-3
                          ${
                            theme === "dark"
                              ? "border-b border-slate-700"
                              : "border-b border-slate-100"
                          }`}
                  >
                    <p
                      className={`text-sm
                            ${
                              theme === "dark"
                                ? "text-slate-400"
                                : "text-slate-500"
                            }`}
                    >
                      Search results for "{searchQuery}"
                    </p>
                  </div>
                  <div className="p-1">
                    {topics
                      .filter(
                        (topic) =>
                          topic.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          topic.description
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          topic.tags?.some((tag) =>
                            tag
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          ) ||
                          topic.topics?.some((t: string) =>
                            t.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                      )
                      .slice(0, 5)
                      .map((topic) => (
                        <button
                          key={topic.id}
                          className={`flex items-center w-full text-left p-3 rounded-lg
                                  ${
                                    theme === "dark"
                                      ? "hover:bg-slate-700"
                                      : "hover:bg-slate-50"
                                  }`}
                          onClick={() => {
                            navigate(`/topics/${topic.id}`);
                            setShowSearch(false);
                          }}
                        >
                          <div
                            className={`p-2 rounded-full mr-3
                                  ${
                                    theme === "dark"
                                      ? "bg-slate-700"
                                      : "bg-slate-100"
                                  }`}
                          >
                            <BookOpen
                              className={`h-4 w-4
                                    ${
                                      theme === "dark"
                                        ? "text-blue-400"
                                        : "text-blue-500"
                                    }`}
                            />
                          </div>
                          <div className="flex-grow">
                            <h3
                              className={`font-medium
                                    ${
                                      theme === "dark"
                                        ? "text-white"
                                        : "text-slate-900"
                                    }`}
                            >
                              {topic.title}
                            </h3>
                            <p
                              className={`text-sm truncate
                                    ${
                                      theme === "dark"
                                        ? "text-slate-400"
                                        : "text-slate-500"
                                    }`}
                            >
                              {topic.description}
                            </p>
                          </div>
                          <ChevronRight
                            className={`h-4 w-4
                                  ${
                                    theme === "dark"
                                      ? "text-slate-500"
                                      : "text-slate-400"
                                  }`}
                          />
                        </button>
                      ))}
                  </div>
                  <div
                    className={`p-3 text-center
                          ${
                            theme === "dark"
                              ? "border-t border-slate-700"
                              : "border-t border-slate-100"
                          }`}
                  >
                    <button
                      className={`text-sm font-medium
                              ${
                                theme === "dark"
                                  ? "text-blue-400 hover:text-blue-300"
                                  : "text-blue-600 hover:text-blue-700"
                              }`}
                      onClick={() => {
                        navigate(`/topics?q=${searchQuery}`);
                        setShowSearch(false);
                      }}
                    >
                      See all results
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
function getCompletionPercentage(id: string) {
  throw new Error("Function not implemented.");
}
