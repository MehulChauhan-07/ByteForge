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
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchOverlay(false);
      navigate(`/topics?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
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

            {/* Right side buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSearchOverlay(true)}
                className={`p-2 rounded-md ${
                  theme === "dark"
                    ? "hover:bg-slate-800 text-slate-300"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

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

              {/* Mobile menu button */}
              <button
                className={`p-2 rounded-md md:hidden ${
                  theme === "dark"
                    ? "text-slate-300 hover:bg-slate-800"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`fixed top-16 left-0 right-0 z-40 overflow-hidden shadow-lg ${
              theme === "dark"
                ? "bg-slate-900 border-b border-slate-800"
                : "bg-white border-b border-slate-200"
            }`}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <>
                        <button
                          className={`px-4 py-3 rounded-md text-sm font-medium flex items-center justify-between ${
                            isActive(item.path)
                              ? theme === "dark"
                                ? "bg-slate-800 text-white"
                                : "bg-slate-100 text-slate-900"
                              : theme === "dark"
                              ? "text-slate-200"
                              : "text-slate-800"
                          }`}
                          onClick={() =>
                            toggleSubmenu(
                              activeSubmenu === item.name ? "" : item.name
                            )
                          }
                        >
                          <span className="flex items-center">
                            {item.icon && (
                              <span className="mr-2">{item.icon}</span>
                            )}
                            {item.name}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              activeSubmenu === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {activeSubmenu === item.name && (
                          <div
                            className={`mt-1 ml-4 pl-4 border-l ${
                              theme === "dark"
                                ? "border-slate-700"
                                : "border-slate-200"
                            }`}
                          >
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className={`block px-4 py-2 text-sm rounded-md ${
                                  subItem.highlight
                                    ? theme === "dark"
                                      ? "text-blue-400 font-medium"
                                      : "text-blue-600 font-medium"
                                    : theme === "dark"
                                    ? "text-slate-300 hover:bg-slate-800"
                                    : "text-slate-700 hover:bg-slate-100"
                                } ${
                                  isActive(subItem.path)
                                    ? theme === "dark"
                                      ? "bg-slate-800"
                                      : "bg-slate-100"
                                    : ""
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className={`px-4 py-3 rounded-md text-sm font-medium flex items-center ${
                          isActive(item.path)
                            ? theme === "dark"
                              ? "bg-slate-800 text-white"
                              : "bg-slate-100 text-slate-900"
                            : theme === "dark"
                            ? "text-slate-200"
                            : "text-slate-800"
                        }`}
                      >
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile menu footer */}
              <div className="mt-6 pt-6 border-t flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`text-sm ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Switch theme
                  </div>
                  <ModeToggle />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <Button
                    variant="outline"
                    className={`w-full ${
                      theme === "dark" ? "border-slate-700 text-slate-300" : ""
                    }`}
                    onClick={() => navigate("/login")}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    className={`w-full ${
                      theme === "dark"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : ""
                    }`}
                    onClick={() => navigate("/signup")}
                  >
                    Sign up Free
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {showSearchOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 p-4 sm:p-6 md:p-20 flex items-start justify-center ${
              theme === "dark"
                ? "bg-slate-900/95 backdrop-blur-sm"
                : "bg-slate-100/95 backdrop-blur-sm"
            }`}
          >
            <div
              className="fixed inset-0 bg-transparent"
              onClick={() => setShowSearchOverlay(false)}
            ></div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`relative w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden ${
                theme === "dark"
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-white border border-slate-200"
              }`}
            >
              <form onSubmit={handleSearchSubmit}>
                <div className="flex items-center px-4 py-3 border-b">
                  <Search
                    className={`h-5 w-5 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Search topics, lessons, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full ml-3 bg-transparent border-none outline-none ${
                      theme === "dark"
                        ? "text-white placeholder:text-slate-400"
                        : "text-slate-900 placeholder:text-slate-500"
                    }`}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowSearchOverlay(false)}
                    className={`p-1 rounded-full ${
                      theme === "dark"
                        ? "hover:bg-slate-700 text-slate-400"
                        : "hover:bg-slate-200 text-slate-500"
                    }`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </form>

              <div
                className={`p-4 max-h-[60vh] overflow-y-auto ${
                  theme === "dark" ? "bg-slate-800" : "bg-white"
                }`}
              >
                <div className="space-y-2">
                  <div
                    className={`px-3 py-1 text-xs font-medium ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Popular searches
                  </div>
                  {[
                    "Java Basics",
                    "Object-Oriented Programming",
                    "Data Structures",
                    "Exception Handling",
                  ].map((term) => (
                    <div
                      key={term}
                      className={`px-3 py-2 rounded-md cursor-pointer flex items-center gap-3 ${
                        theme === "dark"
                          ? "hover:bg-slate-700 text-slate-200"
                          : "hover:bg-slate-100 text-slate-800"
                      }`}
                      onClick={() => {
                        setShowSearchOverlay(false);
                        navigate(`/search?q=${encodeURIComponent(term)}`);
                      }}
                    >
                      <Search className="h-4 w-4 flex-shrink-0" />
                      <span>{term}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div
                    className={`px-3 py-1 text-xs font-medium ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Quick links
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {[
                      {
                        name: "All Topics",
                        path: "/topics",
                        icon: <BookOpen className="h-4 w-4" />,
                      },
                      {
                        name: "Practice",
                        path: "/practice",
                        icon: <Code className="h-4 w-4" />,
                      },
                      {
                        name: "Community",
                        path: "/community",
                        icon: <Users className="h-4 w-4" />,
                      },
                      {
                        name: "Account Settings",
                        path: "/settings",
                        icon: <Settings className="h-4 w-4" />,
                      },
                    ].map((link) => (
                      <div
                        key={link.name}
                        className={`px-3 py-2 rounded-md cursor-pointer flex items-center gap-3 ${
                          theme === "dark"
                            ? "hover:bg-slate-700 text-slate-200"
                            : "hover:bg-slate-100 text-slate-800"
                        }`}
                        onClick={() => {
                          setShowSearchOverlay(false);
                          navigate(link.path);
                        }}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernNavbar;
