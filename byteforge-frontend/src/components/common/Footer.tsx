import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/icons";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              {/* <Code className="h-6 w-6" /> */}
              <Logo className=" h-10 w-10 md:block" />

              <span className="text-xl font-bold">ByteForge</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              An intuitive platform for mastering Java programming with
              interactive lessons, integrated compiler, and AI-powered
              assistance.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/MehulChauhan-22/ByteForge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Learn</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/courses"
                  className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/tutorials"
                  className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  to="/exercises"
                  className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  Exercises
                </Link>
              </li>
              <li>
                <Link
                  to="/certification"
                  className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  Certification
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/compiler"
                  className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  Java Compiler
                </Link>
              </li>
              <li>
                <Link
                  to="/assistant"
                  className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link
                  to="/notes"
                  className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  Note Taking
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2025 ByteForge. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link
                to="/terms"
                className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
              >
                Privacy
              </Link>
              <Link
                to="/cookies"
                className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
