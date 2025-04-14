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

const UserProfileDropdown = ({ isOpen, onClose }: UserProfileDropdownProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                  )}&background=random`}
                  alt={user.name}
                />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="p-2">
            <DropdownMenu>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/saved")}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  Saved Items
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/history")}>
                  <History className="mr-2 h-4 w-4" />
                  History
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/help")}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
  const { user, logout, isAuthenticated, isLoading } = useAuth();

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
                className="w-[300px] sm:w-[350px] p-0 overflow-hidden"
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="relative h-8 w-8 rounded-full"
                              >
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                      user?.name || "User"
                                    )}&background=random`}
                                    alt={user?.name || "User"}
                                  />
                                  <AvatarFallback>
                                    {getInitials(user?.name || "User")}
                                  </AvatarFallback>
                                </Avatar>
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              className="w-56"
                              align="end"
                              forceMount
                            >
                              <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                  <p className="text-sm font-medium leading-none">
                                    {user?.name || "User"}
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
                      <ChevronDown className="h-4 w-4" />
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
                      <ChevronDown className="h-4 w-4" />
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
          <div className="flex items-center gap-4">
            {/* Desktop Search Button and Dropdown */}
            <div className="hidden md:block relative" ref={desktopSearchRef}>
              <Button
                variant="ghost"
                size="icon"
                className="block"
                onClick={() => setDesktopSearchOpen(!desktopSearchOpen)}
                aria-label="Toggle search"
              >
                <Search className="h-5 w-5" />
              </Button>
              <AnimatePresence>
                {desktopSearchOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-80 bg-popover rounded-md shadow-lg border p-2 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
                className="block"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                aria-label="Toggle search"
              >
                <Search className="h-5 w-5" />
              </Button>
              <AnimatePresence>
                {mobileSearchOpen && (
                  <motion.div
                    className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 p-4 flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-2 pb-4 border-b">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileSearchOpen(false)}
                        aria-label="Close search"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                      <h2 className="text-lg font-medium">Search</h2>
                    </div>

                    <div className="relative my-4">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search topics, courses, articles..."
                        className="pl-9 pr-8"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        onKeyDown={handleSearchKeyDown}
                        autoFocus
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

                    <div className="flex-1 overflow-y-auto">
                      {!searchQuery.trim() && (
                        <>
                          {/* Recent searches */}
                          {recentSearches.length > 0 && (
                            <div className="mb-4">
                              <h3 className="text-sm font-medium mb-2">
                                Recent Searches
                              </h3>
                              <div className="space-y-2">
                                {recentSearches.map((search, index) => (
                                  <motion.div
                                    key={`recent-${index}`}
                                    className="p-3 bg-accent/30 rounded-md cursor-pointer flex items-center gap-2"
                                    whileHover={{ x: 5 }}
                                    onClick={() => {
                                      setSearchQuery(search);
                                    }}
                                  >
                                    <History className="h-4 w-4 text-muted-foreground" />
                                    <span>{search}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Popular categories */}
                          <div>
                            <h3 className="text-sm font-medium mb-2">
                              Popular Categories
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                "Java Basics",
                                "OOP",
                                "Collections",
                                "Multithreading",
                                "IO",
                                "Exceptions",
                              ].map((category) => (
                                <motion.div
                                  key={category}
                                  className="p-3 bg-accent/30 rounded-md cursor-pointer flex flex-col items-center justify-center"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => {
                                    setSearchQuery(category);
                                  }}
                                >
                                  <span className="text-sm font-medium">
                                    {category}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {/* Search results */}
                      {(searchQuery.trim() || isLoadingSuggestions) && (
                        <div className="mt-2">
                          {isLoadingSuggestions ? (
                            <div className="py-8 flex flex-col items-center justify-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              >
                                <Loader2 className="h-8 w-8 text-primary" />
                              </motion.div>
                              <span className="mt-4 text-muted-foreground">
                                Searching...
                              </span>
                            </div>
                          ) : searchSuggestions.length > 0 ? (
                            <div className="space-y-4">
                              {/* Group by type */}
                              {(["topic", "course", "article"] as const).map(
                                (type) => {
                                  const items = searchSuggestions.filter(
                                    (s) => s.type === type
                                  );
                                  if (!items.length) return null;

                                  return (
                                    <div key={type}>
                                      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                                        {getSuggestionIcon(type)}
                                        {type.charAt(0).toUpperCase() +
                                          type.slice(1)}
                                        s
                                      </h3>
                                      <div className="space-y-2">
                                        {items.map((suggestion, index) => (
                                          <motion.div
                                            key={suggestion.id}
                                            className={`p-3 bg-accent/30 rounded-md cursor-pointer ${
                                              selectedSuggestionIndex ===
                                              searchSuggestions.indexOf(
                                                suggestion
                                              )
                                                ? "bg-accent"
                                                : ""
                                            }`}
                                            whileHover={{ x: 5 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() =>
                                              handleSuggestionClick(suggestion)
                                            }
                                          >
                                            <div className="font-medium">
                                              {suggestion.title}
                                            </div>
                                          </motion.div>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            <div className="py-8 text-center">
                              <p className="text-muted-foreground">
                                No results found for "{searchQuery}"
                              </p>
                              <p className="text-sm text-muted-foreground mt-2">
                                Try a different search term or browse topics
                              </p>
                              <Button
                                className="mt-4"
                                onClick={handleViewAllResults}
                              >
                                Browse Topics
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notification and language buttons */}
            {isAuthenticated && user && (
              <>
                <div className="relative" ref={notificationRef}>
                  <Button
                    variant="ghost"
                    size="icon"
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

                <div className="relative" ref={languageMenuRef}>
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
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user?.name || "User"
                            )}&background=random`}
                            alt={user?.name || "User"}
                          />
                          <AvatarFallback>
                            {getInitials(user?.name || "User")}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user?.name || "User"}
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
              </>
            )}

            <ModeToggle />
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
