import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/icons";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Logo className="h-10 w-10" />
              <span className="text-xl font-bold text-slate-800 dark:text-slate-200">
                ByteForge
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              An intuitive platform for mastering Java programming with
              interactive lessons, integrated compiler, and AI-powered
              assistance.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                asChild
              >
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

          {/* Learn Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Learn
            </h3>
            <ul className="space-y-2">
              {["Courses", "Tutorials", "Exercises", "Certification"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Tools Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Tools
            </h3>
            <ul className="space-y-2">
              {["Compiler", "Assistant", "Notes", "Community"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Support
            </h3>
            <ul className="space-y-2">
              {["Help Center", "Contact Us", "FAQs"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} ByteForge. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {["Terms", "Privacy", "Cookies"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
