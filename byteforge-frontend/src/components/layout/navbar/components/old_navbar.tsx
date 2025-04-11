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
  ChevronDown,
  ChevronRight,
  Home,
  Bookmark,
  Info,
  List,
  User as UserIcon,
  Bell,
  Globe,
  Loader2,
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
import { useDebounce } from "@/hooks/useDebounce";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
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

interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
}

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
      >
        <ChevronRight className="h-4 w-4" />
      </motion.div>
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

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

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
          POPULAR_SEARCHES.filter((item) =>
            item.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
          ).slice(0, 5)
        );
        setIsLoadingSuggestions(false);
      }, 300);
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

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (searchQuery.trim()) {
        // Add to recent searches if not already there
        if (!recentSearches.includes(searchQuery)) {
          setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 3)]);
        }

        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchSuggestions([]);
      }
    },
    [searchQuery, recentSearches, navigate]
  );

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setSearchQuery(suggestion);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    closeSidebar();
    navigate("/login");
  }, [logout, closeSidebar, navigate]);

  // Skip to content link for accessibility
  const SkipToContentLink = () => (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-background focus:px-4 focus:py-2 focus:rounded focus:ring-2 focus:ring-primary"
    >
      Skip to content
    </a>
  );

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
                    <form onSubmit={handleSearch} className="relative">
                      <Input
                        type="search"
                        placeholder="Search ByteForge..."
                        className="pr-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search"
                      />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        aria-label="Search"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
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
                            <UserIcon className="h-4 w-4 mr-2" />
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
            {/* Desktop Inline Search */}
            <div className="hidden md:block relative" ref={desktopSearchRef}>
              <form onSubmit={handleSearch}>
                <Button
                  type={isSearchOpen ? "submit" : "button"}
                  variant="ghost"
                  size="icon"
                  onClick={() => !isSearchOpen && setIsSearchOpen(true)}
                  aria-label={isSearchOpen ? "Submit search" : "Open search"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                >
                  <Search className="h-5 w-5" />
                </Button>

                <motion.div
                  className="overflow-hidden"
                  initial={{ width: "40px", opacity: 0 }}
                  animate={{
                    width: isSearchOpen ? "300px" : "40px",
                    opacity: isSearchOpen ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search ByteForge..."
                    className={`pr-10 ${isSearchOpen ? "" : "cursor-pointer"}`}
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isSearchOpen) setIsSearchOpen(true);
                    }}
                  />
                </motion.div>

                {/* Search suggestions dropdown */}
                {isSearchOpen && searchQuery && (
                  <motion.div
                    className="absolute z-50 mt-1 w-full bg-popover shadow-lg rounded-md border"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {isLoadingSuggestions ? (
                      <div className="p-4 flex justify-center">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    ) : searchSuggestions.length > 0 ? (
                      <ul>
                        {searchSuggestions.map((suggestion, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                          >
                            <button
                              className="w-full text-left p-3 hover:bg-accent"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-3 text-sm text-muted-foreground">
                        No suggestions found
                      </div>
                    )}
                  </motion.div>
                )}
              </form>
            </div>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
              className="md:hidden"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile Search Modal */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  className="md:hidden fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm pt-16 px-4"
                  onClick={() => setIsSearchOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="w-full max-w-md bg-background rounded-lg shadow-lg border p-4"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <form onSubmit={handleSearch}>
                      <div className="flex items-center gap-2">
                        <Input
                          ref={searchInputRef}
                          type="search"
                          placeholder="Search ByteForge..."
                          className="flex-1"
                          aria-label="Search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button
                          type="submit"
                          variant="default"
                          size="icon"
                          aria-label="Search"
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={closeSearch}
                          aria-label="Close search"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </form>

                    {/* Recent & Popular searches */}
                    <div className="mt-4 space-y-3">
                      {recentSearches.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">
                            Recent searches:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.map((term, index) => (
                              <motion.button
                                key={`recent-${term}`}
                                className="px-3 py-1 text-sm bg-secondary rounded-full hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center gap-1"
                                onClick={() => handleSuggestionClick(term)}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {term}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Popular searches:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {POPULAR_SEARCHES.map((term, index) => (
                            <motion.button
                              key={`popular-${term}`}
                              className="px-3 py-1 text-sm bg-accent rounded-full hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
                              onClick={() => handleSuggestionClick(term)}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {term}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notification and language buttons */}
            {user && (
              <>
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <div className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      3
                    </span>
                  </div>
                </Button>
                <Button variant="ghost" size="icon" aria-label="Language">
                  <Globe className="h-5 w-5" />
                </Button>
              </>
            )}

            <ModeToggle />

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">
                        <UserIcon className="mr-2 h-4 w-4" />
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
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/login">Log In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
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
