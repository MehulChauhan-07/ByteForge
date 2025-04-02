"use client";

import { useState, useRef, useEffect } from "react";
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
} from "../ui/navigation-menu";
import { Logo } from "@/components/ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Types for reusable components
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

// Reusable components
const MobileNavLink: React.FC<NavLinkProps> = ({
  to,
  icon,
  children,
  onClick,
  className,
}) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary group",
      className
    )}
    onClick={onClick}
  >
    {icon}
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
);

const DropdownItem: React.FC<DropdownItemProps> = ({
  to,
  title,
  description,
  icon,
}) => (
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
);

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Monitor scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Monitor location changes to close sidebar on navigation
  useEffect(() => {
    setIsSidebarOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Close search and sidebar on escape key press
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
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      // For desktop search
      if (
        isSearchOpen &&
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(e.target as Node) &&
        // Make sure we're not closing when clicking the search button itself
        !(e.target as Element).closest('button[aria-label*="search" i]')
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isSearchOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle closing the sidebar
  const closeSidebar = () => setIsSidebarOpen(false);

  // Handle closing the search
  const closeSearch = () => setIsSearchOpen(false);

  // Menu items for reuse
  const mobileMenuItems = [
    {
      to: "/courses",
      label: "Courses",
      icon: <BookOpen className="h-5 w-5" />,
    },
    { to: "/compiler", label: "Compiler", icon: <Code className="h-5 w-5" /> },
    {
      to: "/assistant",
      label: "AI Assistant",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    { to: "/notes", label: "My Notes", icon: <Save className="h-5 w-5" /> },
  ];

  // Popular search suggestions
  const popularSearches = [
    "Java basics",
    "OOP concepts",
    "Collections",
    "File handling",
  ];

  // Learning dropdown items
  const learningItems = [
    {
      to: "/tutorials",
      title: "Tutorials",
      description: "Step-by-step guides for specific Java topics",
    },
    {
      to: "/exercises",
      title: "Exercises",
      description: "Practice with coding challenges and projects",
    },
    {
      to: "/certification",
      title: "Certification",
      description: "Earn certificates to showcase your Java skills",
    },
  ];

  // Tools dropdown items
  const toolItems = [
    {
      to: "/compiler",
      title: "Java Compiler",
      description: "Write, compile, and run Java code in your browser",
      icon: <Code className="h-4 w-4" />,
    },
    {
      to: "/assistant",
      title: "AI Assistant",
      description: "Get help with coding problems and concepts",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      to: "/notes",
      title: "Note Taking",
      description: "Save and organize important concepts and code snippets",
      icon: <Save className="h-4 w-4" />,
    },
    {
      to: "/community",
      title: "Community",
      description: "Connect with other learners and Java experts",
      icon: <Users className="h-4 w-4" />,
    },
  ];

  return (
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
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
              <motion.nav
                className="flex h-full flex-col gap-6 p-6 overflow-auto"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to="/"
                  className="flex items-center gap-2 text-lg font-bold"
                  onClick={closeSidebar}
                >
                  <Logo className="h-10 w-10 md:block" aria-hidden="true" />
                  <span>ByteForge</span>
                </Link>

                {/* Mobile menu links */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Main Menu
                  </h3>
                  <div className="flex flex-col gap-3">
                    {mobileMenuItems.map((item, index) => (
                      <motion.div
                        key={item.to}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <MobileNavLink
                          to={item.to}
                          icon={item.icon}
                          onClick={closeSidebar}
                        >
                          {item.label}
                        </MobileNavLink>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Authentication links */}
                <div className="flex flex-col gap-4 mt-auto">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Account
                  </h3>
                  <div className="flex flex-col gap-3">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <MobileNavLink to="/login" onClick={closeSidebar}>
                        Log In
                      </MobileNavLink>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <MobileNavLink to="/signup" onClick={closeSidebar}>
                        Sign Up
                      </MobileNavLink>
                    </motion.div>
                  </div>
                </div>

                {/* Close button (additional way to close) */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={closeSidebar}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
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

                    {/* Map learning dropdown items */}
                    {learningItems.map((item, index) => (
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
                    {/* Map tool dropdown items */}
                    {toolItems.map((item, index) => (
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label={isSearchOpen ? "Close search" : "Open search"}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
            >
              {isSearchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
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
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
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
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the search box
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex items-center gap-2">
                    <Input
                      ref={searchInputRef}
                      type="search"
                      placeholder="Search ByteForge..."
                      className="flex-1"
                      aria-label="Search"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeSearch}
                      aria-label="Close search"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Quick suggestion links */}
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Popular searches:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term, index) => (
                        <motion.button
                          key={term}
                          className="px-3 py-1 text-sm bg-accent rounded-full hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          onClick={() => {
                            // Logic to handle search for this term
                            console.log(`Searching for ${term}`);
                            // You can implement the search logic here
                            // For example, update input value or navigate to search results
                            closeSearch(); // Close search after selecting a suggestion
                          }}
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
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <ModeToggle />

          <div className="hidden md:flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" asChild>
                <Link to="/login">Log In</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
