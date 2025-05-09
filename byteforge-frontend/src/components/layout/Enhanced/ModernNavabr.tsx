import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Code,
  Users,
  Settings,
  Search,
  Github,
  LogIn,
} from "lucide-react";
import UnifiedSearch from "@/components/features/Java_Topics/Enhancedpage/UnifiedSearch";

// Define navigation items
const navItems = [
  {
    name: "Learn",
    path: "/topics",
    icon: <BookOpen className="h-4 w-4" />,
    submenu: [
      { name: "Java Fundamentals", path: "/topics/java-basics" },
      { name: "Object-Oriented Programming", path: "/topics/oop-java" },
      { name: "Data Structures", path: "/topics/java-collections" },
      { name: "All Topics", path: "/topics", highlight: true },
    ],
  },
  {
    name: "Practice",
    path: "/practice",
    icon: <Code className="h-4 w-4" />,
    submenu: [
      { name: "Coding Exercises", path: "/practice/exercises" },
      { name: "Projects", path: "/practice/projects" },
      { name: "Challenges", path: "/practice/challenges" },
    ],
  },
  {
    name: "Community",
    path: "/community",
    icon: <Users className="h-4 w-4" />,
  },
  {
    name: "About",
    path: "/about",
  },
];

const ModernNavbar = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);

  // Check if path is active
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Toggle submenu on desktop
  const toggleSubmenu = (name: string) => {
    if (activeSubmenu === name) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(name);
    }
  };

  // Handle search submit
  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      setShowSearchOverlay(false);
      navigate(`/topics?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? theme === "dark"
              ? "bg-slate-900/90 backdrop-blur-md border-b border-slate-800"
              : "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                <span className="font-bold text-lg">B</span>
              </div>
              <span
                className={`font-bold text-xl ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                ByteForge
              </span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <button
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors ${
                        isActive(item.path)
                          ? theme === "dark"
                            ? "bg-slate-800 text-white"
                            : "bg-slate-100 text-slate-900"
                          : theme === "dark"
                          ? "text-slate-200 hover:bg-slate-800 hover:text-white"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                      onClick={() => toggleSubmenu(item.name)}
                    >
                      {item.icon && <span className="mr-1">{item.icon}</span>}
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeSubmenu === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors ${
                        isActive(item.path)
                          ? theme === "dark"
                            ? "bg-slate-800 text-white"
                            : "bg-slate-100 text-slate-900"
                          : theme === "dark"
                          ? "text-slate-200 hover:bg-slate-800 hover:text-white"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {item.icon && <span>{item.icon}</span>}
                      {item.name}
                    </Link>
                  )}

                  {/* Submenu */}
                  {item.submenu && (
                    <AnimatePresence>
                      {activeSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-full left-0 mt-1 py-2 w-64 rounded-md shadow-lg z-10 ${
                            theme === "dark"
                              ? "bg-slate-800 border border-slate-700"
                              : "bg-white border border-slate-200"
                          }`}
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className={`block px-4 py-2 text-sm ${
                                subItem.highlight
                                  ? theme === "dark"
                                    ? "text-blue-400 font-medium"
                                    : "text-blue-600 font-medium"
                                  : theme === "dark"
                                  ? "text-slate-200 hover:bg-slate-700"
                                  : "text-slate-700 hover:bg-slate-50"
                              } ${
                                isActive(subItem.path)
                                  ? theme === "dark"
                                    ? "bg-slate-700"
                                    : "bg-slate-50"
                                  : ""
                              }`}
                              onClick={() => setActiveSubmenu(null)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Search */}
            <div className="hidden md:block">
              <UnifiedSearch
                variant="navbar"
                onSearch={handleSearchSubmit}
                placeholder="Search topics, courses, and more..."
              />
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <ModeToggle />
              </div>

              <a
                href="https://github.com/MehulChauhan-07/ByteForge"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-md hidden sm:flex items-center gap-1 ${
                  theme === "dark"
                    ? "hover:bg-slate-800 text-slate-300"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                <Github className="h-5 w-5" />
              </a>

              <div className="hidden sm:block h-6 w-px bg-slate-300 dark:bg-slate-700"></div>

              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={theme === "dark" ? "text-slate-300" : ""}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  className={
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : ""
                  }
                  onClick={() => navigate("/signup")}
                >
                  Sign up Free
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center gap-2 md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setShowSearchOverlay(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {showSearchOverlay && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setShowSearchOverlay(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 left-0 right-0 z-50 p-4 bg-background border-b"
            >
              <div className="relative">
                <UnifiedSearch
                  variant="mobile"
                  onSearch={handleSearchSubmit}
                  onClose={() => setShowSearchOverlay(false)}
                  placeholder="Search topics, courses, and more..."
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowSearchOverlay(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.2 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-background border-l z-50 md:hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <div className="space-y-1">
                        <button
                          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                          onClick={() => toggleSubmenu(item.name)}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon}
                            {item.name}
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              activeSubmenu === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeSubmenu === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-8 space-y-1"
                            >
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.path}
                                  className="block px-3 py-2 text-sm rounded-md hover:bg-muted"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernNavbar;
