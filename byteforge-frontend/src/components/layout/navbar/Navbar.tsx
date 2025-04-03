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
            {/* <ChevronDown className="h-5 w-5" /> */}
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
                <AvatarImage src={user.avatar} />
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

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<
    SearchSuggestion[]
  >([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("en");
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const notificationRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  // Close search and sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch search suggestions
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      setIsLoadingSuggestions(true);
      // Simulate API call
      setTimeout(() => {
        setSearchSuggestions(
          POPULAR_SEARCHES.map((item) => ({
            id: item,
            title: item,
            type: "topic" as const,
            url: `/search?q=${encodeURIComponent(item)}`,
          })).slice(0, 5)
        );
        setIsLoadingSuggestions(false);
      }, 500);
    } else {
      setSearchSuggestions([]);
    }
  }, [debouncedSearchQuery]);

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSearchOpen) setIsSearchOpen(false);
        if (isSidebarOpen) setIsSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isSearchOpen, isSidebarOpen]);

  // Close search when clicking outside
  useOnClickOutside(desktopSearchRef, () => {
    if (isSearchOpen) setIsSearchOpen(false);
  });

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const handleSearch = async (query: string) => {
    try {
      // Simulate API call - replace with actual API call
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchSuggestions(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    navigate(suggestion.url);
    setSearchQuery("");
    setSearchSuggestions([]);
    setIsSearchOpen(false);
  };

  const handleLogout = useCallback(() => {
    logout();
    closeSidebar();
  }, [logout, closeSidebar]);

  // Skip to content link for accessibility
  const SkipToContentLink = () => (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-background focus:px-4 focus:py-2 focus:rounded focus:ring-2 focus:ring-primary"
    >
      Skip to content
    </a>
  );

  // Add these new effects
  useEffect(() => {
    // Load notifications from localStorage or API
    const loadNotifications = async () => {
      try {
        const storedNotifications = localStorage.getItem("notifications");
        if (storedNotifications) {
          const parsedNotifications = JSON.parse(storedNotifications);
          setNotifications(parsedNotifications);
          setUnreadCount(
            parsedNotifications.filter((n: Notification) => !n.read).length
          );
        }
      } catch (err) {
        console.error("Error loading notifications:", err);
      }
    };

    loadNotifications();
  }, []);

  // Add these new handlers
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

  const handleLanguageChange = (language: string) => {
    setActiveLanguage(language);
    setIsLanguageMenuOpen(false);
    // Here you would typically update the app's language
    // and save the preference
    localStorage.setItem("language", language);
  };

  // Add these new components
  const NotificationDropdown = () => (
    <motion.div
      ref={notificationRef}
      className="absolute right-0 mt-2 w-80 bg-popover rounded-md shadow-lg border z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="p-2 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Notifications</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const allRead = notifications.map((n) => ({ ...n, read: true }));
              setNotifications(allRead);
              setUnreadCount(0);
              localStorage.setItem("notifications", JSON.stringify(allRead));
            }}
          >
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

  const LanguageMenu = () => (
    <motion.div
      ref={languageMenuRef}
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

  const SearchResults = () => {
    if (!searchQuery) return null;

    return (
      <motion.div
        className="absolute top-full left-0 w-full bg-popover rounded-md shadow-lg border mt-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        {searchSuggestions.length > 0 ? (
          <div className="p-2">
            {searchSuggestions.map((suggestion) => (
              <motion.div
                key={suggestion.id}
                className="p-2 hover:bg-accent rounded-md cursor-pointer"
                whileHover={{ x: 5 }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">{suggestion.title}</div>
                  <Badge>{suggestion.type}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No results found
          </div>
        )}
      </motion.div>
    );
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

                  {/* Quick search for mobile */}
                  <div className="px-4">
                    <div className="relative flex-1 max-w-md">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search topics, courses, articles..."
                          className="pl-9"
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (e.target.value.length > 2) {
                              handleSearch(e.target.value);
                            } else {
                              setSearchSuggestions([]);
                            }
                          }}
                          onFocus={() => setIsSearchOpen(true)}
                        />
                      </div>
                      <AnimatePresence>
                        {isSearchOpen && <SearchResults />}
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
                    {user ? (
                      <>
                        <Button variant="outline" className="flex-1" asChild>
                          <Link to="/profile" onClick={closeSidebar}>
                            <User className="h-4 w-4 mr-2" />
                            Profile
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          className="flex-1"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" className="flex-1" asChild>
                          <Link to="/login" onClick={closeSidebar}>
                            Log In
                          </Link>
                        </Button>
                        <Button className="flex-1" asChild>
                          <Link to="/signup" onClick={closeSidebar}>
                            Sign Up
                          </Link>
                        </Button>
                      </>
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
          <div className="flex items-center gap-2">
            {/* Desktop Search */}
            <div className="hidden md:block relative" ref={desktopSearchRef}>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle search"
              >
                <Search className="h-5 w-5" />
              </Button>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    className="absolute right-0 top-0 w-80 bg-popover rounded-md shadow-lg border p-2"
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
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          if (e.target.value.length > 2) {
                            handleSearch(e.target.value);
                          } else {
                            setSearchSuggestions([]);
                          }
                        }}
                      />
                    </div>
                    <AnimatePresence>
                      {searchQuery && <SearchResults />}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Notification and language buttons */}
            {user && (
              <>
                <div className="relative">
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
                    {isNotificationOpen && <NotificationDropdown />}
                  </AnimatePresence>
                </div>

                <div className="relative">
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
                    {isLanguageMenuOpen && <LanguageMenu />}
                  </AnimatePresence>
                </div>
              </>
            )}

            <ModeToggle />

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex gap-2">
              {user ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" asChild>
                      <Link to="/profile">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" onClick={handleLogout}>
                      Logout
                    </Button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" asChild>
                      <Link to="/login">Log In</Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild>
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
