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
} from "lucide-react";
import { ModeToggle } from "@/components/common/ModeToggle";
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
}) => (
  <Link
    to={to}
    className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary"
    onClick={onClick}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

const DropdownItem: React.FC<DropdownItemProps> = ({
  to,
  title,
  description,
  icon,
}) => (
  <li>
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
  </li>
);

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
              <nav
                className="flex h-full flex-col gap-6 p-6 overflow-auto"
                aria-label="Mobile navigation"
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
                    {mobileMenuItems.map((item) => (
                      <MobileNavLink
                        key={item.to}
                        to={item.to}
                        icon={item.icon}
                        onClick={closeSidebar}
                      >
                        {item.label}
                      </MobileNavLink>
                    ))}
                  </div>
                </div>

                {/* Authentication links */}
                <div className="flex flex-col gap-4 mt-auto">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Account
                  </h3>
                  <div className="flex flex-col gap-3">
                    <MobileNavLink to="/login" onClick={closeSidebar}>
                      Log In
                    </MobileNavLink>
                    <MobileNavLink to="/signup" onClick={closeSidebar}>
                      Sign Up
                    </MobileNavLink>
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
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="ByteForge home"
          >
            <Logo className="h-9 w-9 md:block" aria-hidden="true" />
            <span className="text-xl font-bold">ByteForge</span>
          </Link>

          {/* Desktop navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {/* Learn dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
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
                    </li>

                    {/* Map learning dropdown items */}
                    {learningItems.map((item) => (
                      <DropdownItem
                        key={item.to}
                        to={item.to}
                        title={item.title}
                        description={item.description}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Tools dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {/* Map tool dropdown items */}
                    {toolItems.map((item) => (
                      <DropdownItem
                        key={item.to}
                        to={item.to}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                      />
                    ))}
                  </ul>
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

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isSearchOpen
                  ? "w-[300px] opacity-100"
                  : "w-10 opacity-0 pointer-events-none"
              }`}
            >
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Search ByteForge..."
                className={`pr-10 ${isSearchOpen ? "" : "cursor-pointer"}`}
                aria-label="Search"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
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
          {isSearchOpen && (
            <div
              className="md:hidden fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm pt-16 px-4"
              onClick={() => setIsSearchOpen(false)}
            >
              <div
                className="w-full max-w-md bg-background rounded-lg shadow-lg border p-4 animate-in slide-in-from-top"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the search box
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
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        className="px-3 py-1 text-sm bg-accent rounded-full hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        onClick={() => {
                          // Logic to handle search for this term
                          console.log(`Searching for ${term}`);
                          // You can implement the search logic here
                          // For example, update input value or navigate to search results
                          closeSearch(); // Close search after selecting a suggestion
                        }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <ModeToggle />

          <div className="hidden md:flex gap-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// "use client";

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//   Menu,
//   X,
//   Search,
//   Code,
//   BookOpen,
//   MessageSquare,
//   Save,
//   Users,
// } from "lucide-react";
// import { ModeToggle } from "@/components/common/ModeToggle";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "../ui/navigation-menu";
// import { Logo } from "@/components/ui/icons";

// const Navbar = () => {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between">
//         <div className="flex items-center gap-2 md:gap-4">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="md:hidden">
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Toggle menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="w-[300px] sm:w-[400px]">
//               <nav className="flex flex-col gap-6">
//                 <Link
//                   to="/"
//                   className="flex items-center gap-2 text-lg font-bold"
//                 >
//                   <Logo className=" h-10 w-10 md:block" />
//                   <span>ByteForge</span>
//                 </Link>
//                 <div className="flex flex-col gap-2">
//                   <Link
//                     to="/courses"
//                     className="flex items-center gap-2 text-lg font-medium"
//                   >
//                     <BookOpen className="h-5 w-5" />
//                     <span>Courses</span>
//                   </Link>
//                   <Link
//                     to="/compiler"
//                     className="flex items-center gap-2 text-lg font-medium"
//                   >
//                     <Code className="h-5 w-5" />
//                     <span>Compiler</span>
//                   </Link>
//                   <Link
//                     to="/assistant"
//                     className="flex items-center gap-2 text-lg font-medium"
//                   >
//                     <MessageSquare className="h-5 w-5" />
//                     <span>AI Assistant</span>
//                   </Link>
//                   <Link
//                     to="/notes"
//                     className="flex items-center gap-2 text-lg font-medium"
//                   >
//                     <Save className="h-5 w-5" />
//                     <span>My Notes</span>
//                   </Link>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <Link
//                     to="/login"
//                     className="flex items-center gap-2 text-lg font-medium"
//                   >
//                     Log In
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="flex items-center gap-2 text-lg font-medium"
//                   >
//                     Sign Up
//                   </Link>
//                 </div>
//               </nav>
//             </SheetContent>
//           </Sheet>
//           <Link to="/" className="flex items-center gap-2">
//             {/* <Code className="h-6 w-6" /> */}
//             <Logo className=" h-9 w-9 md:block" />
//             <span className="text-xl font-bold">ByteForge</span>
//           </Link>
//           <NavigationMenu className="hidden md:flex">
//             <NavigationMenuList>
//               <NavigationMenuItem>
//                 <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                   <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
//                     <li className="row-span-3">
//                       <NavigationMenuLink asChild>
//                         <Link
//                           className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
//                           to="/courses"
//                         >
//                           <BookOpen className="h-6 w-6 text-white" />
//                           <div className="mb-2 mt-4 text-lg font-medium text-white">
//                             Java Courses
//                           </div>
//                           <p className="text-sm leading-tight text-white/90">
//                             Comprehensive Java learning paths for all skill
//                             levels
//                           </p>
//                         </Link>
//                       </NavigationMenuLink>
//                     </li>
//                     <li>
//                       <NavigationMenuLink asChild>
//                         <Link
//                           className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//                           to="/tutorials"
//                         >
//                           <div className="text-sm font-medium leading-none">
//                             Tutorials
//                           </div>
//                           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                             Step-by-step guides for specific Java topics
//                           </p>
//                         </Link>
//                       </NavigationMenuLink>
//                     </li>
//                     <li>
//                       <NavigationMenuLink asChild>
//                         <Link
//                           className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//                           to="/exercises"
//                         >
//                           <div className="text-sm font-medium leading-none">
//                             Exercises
//                           </div>
//                           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                             Practice with coding challenges and projects
//                           </p>
//                         </Link>
//                       </NavigationMenuLink>
//                     </li>
//                     <li>
//                       <NavigationMenuLink asChild>
//                         <Link
//                           className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//                           to="/certification"
//                         >
//                           <div className="text-sm font-medium leading-none">
//                             Certification
//                           </div>
//                           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                             Earn certificates to showcase your Java skills
//                           </p>
//                         </Link>
//                       </NavigationMenuLink>
//                     </li>
//                   </ul>
//                 </NavigationMenuContent>
//               </NavigationMenuItem>
//               <NavigationMenuItem>
//                 <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                   <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//                     <li>
//                       <NavigationMenuLink asChild>
//                         <Link
//                           className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//                           to="/compiler"
//                         >
//                           <div className="flex items-center gap-2">
//                             <Code className="h-4 w-4" />
//                             <div className="text-sm font-medium leading-none">
//                               Java Compiler
//                             </div>
//                           </div>
//                           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                             Write, compile, and run Java code in your browser
//                           </p>
//                         </Link>
//                       </NavigationMenuLink>
//                     </li>
//                     <li>
//                       <NavigationMenuLink asChild>
//                         <Link
//                           className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//                           to="/assistant"
//                         >
//                           <div className="flex items-center gap-2">
//                             <MessageSquare className="h-4 w-4" />
//                             <div className="text-sm font-medium leading-none">
//                               AI Assistant
//                             </div>
//                           </div>
//                           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                             Get help with coding problems and concepts
//                           </p>
//                         </Link>
//                       </NavigationMenuLink>
//                     </li>
//                     <li>
//                       <NavigationMenuLink asChild>
//                         <Link
//                           className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//                           to="/notes"
//                         >
//                           <div className="flex items-center gap-2">
//                             <Save className="h-4 w-4" />
//                             <div className="text-sm font-medium leading-none">
//                               Note Taking
//                             </div>
//                           </div>
//                           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                             Save and organize important concepts and code
//                             snippets
//                           </p>
//                         </Link>
//                       </NavigationMenuLink>
//                     </li>
//                     <li>
//                       <NavigationMenuLink asChild>
//                         <Link
//                           className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//                           to="/community"
//                         >
//                           <div className="flex items-center gap-2">
//                             <Users className="h-4 w-4" />
//                             <div className="text-sm font-medium leading-none">
//                               Community
//                             </div>
//                           </div>
//                           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                             Connect with other learners and Java experts
//                           </p>
//                         </Link>
//                       </NavigationMenuLink>
//                     </li>
//                   </ul>
//                 </NavigationMenuContent>
//               </NavigationMenuItem>
//               <NavigationMenuItem>
//                 <Link to="/topics" className={navigationMenuTriggerStyle()}>
//                   Topics
//                 </Link>
//               </NavigationMenuItem>
//               <NavigationMenuItem>
//                 <Link to="/about" className={navigationMenuTriggerStyle()}>
//                   About
//                 </Link>
//               </NavigationMenuItem>
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>
//         <div className="flex items-center gap-2">
//           {isSearchOpen ? (
//             <div className="flex items-center">
//               <Input
//                 type="search"
//                 placeholder="Search..."
//                 className="w-[200px] md:w-[300px]"
//                 autoFocus
//               />
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setIsSearchOpen(false)}
//               >
//                 <X className="h-5 w-5" />
//                 <span className="sr-only">Close search</span>
//               </Button>
//             </div>
//           ) : (
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsSearchOpen(true)}
//             >
//               <Search className="h-5 w-5" />
//               <span className="sr-only">Search</span>
//             </Button>
//           )}
//           <ModeToggle />
//           <div className="hidden md:flex gap-2">
//             <Button variant="ghost" asChild>
//               <Link to="/login">Log In</Link>
//             </Button>
//             <Button asChild>
//               <Link to="/signup">Sign Up</Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
