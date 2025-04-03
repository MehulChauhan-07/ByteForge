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
  Home,
  Bookmark,
  Info,
  List,
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

//  make the small components reusable
import { CollapsibleSection } from "./CollapsibleSection";
import { MobileNavLink } from "./MobileNavLink";
import { DropdownItem } from "./DropdownItem";
import { learningItems, toolItems } from "./navbar-Items";
import { quickLinks } from "./mobile-navbar";

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 3)]);
      }

      // Navigate to search results
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };
  const popularSearches = [
    "Java basics",
    "OOP concepts",
    "Collections",
    "File handling",
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
                    />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>
                </div>

                {/* Quick links */}
                <div className="px-4 py-2">
                  <div className="grid grid-cols-2 gap-2">
                    {quickLinks.map((link) => (
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
                  {/* Learn section */}
                  <CollapsibleSection
                    title="Learning"
                    icon={<BookOpen className="h-5 w-5" />}
                    defaultOpen={true}
                  >
                    <div className="flex flex-col gap-1">
                      {learningItems.map((item) => (
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

                  {/* Tools section */}
                  <CollapsibleSection
                    title="Tools"
                    icon={<Code className="h-5 w-5" />}
                  >
                    <div className="flex flex-col gap-1">
                      {toolItems.map((item) => (
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
                  {/* Other links */}
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
                  ></motion.div>
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
                  ></motion.div>
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
            <form onSubmit={handleSearch}>
              <Button
                type={isSearchOpen ? "submit" : "button"}
                variant="ghost"
                size="icon"
                onClick={() => !isSearchOpen && setIsSearchOpen(true)}
                aria-label={isSearchOpen ? "Submit search" : "Open search"}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
              >
                {isSearchOpen ? (
                  <Search className="h-5 w-5" />
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSearchOpen) setIsSearchOpen(true);
                  }}
                />
              </motion.div>
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
                              onClick={() => {
                                setSearchQuery(term);
                                if (searchInputRef.current) {
                                  searchInputRef.current.focus();
                                }
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
                    )}

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Popular searches:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((term, index) => (
                          <motion.button
                            key={`popular-${term}`}
                            className="px-3 py-1 text-sm bg-accent rounded-full hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            onClick={() => {
                              setSearchQuery(term);
                              if (searchInputRef.current) {
                                searchInputRef.current.focus();
                              }
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
