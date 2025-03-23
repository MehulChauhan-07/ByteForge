import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/icons";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t">
      <div className="container px-6 py-10 md:py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-8 text-center ">
          {/* Brand Section */}
          <div className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl space-y-4">
            <Link to="/" className="flex flex-col items-center ">
              <Logo className="h-10 w-10" />
              <span className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-2">
                ByteForge
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              An intuitive platform for mastering Java programming with
              interactive lessons, an integrated compiler, and AI-powered
              assistance.
            </p>
            <div className="flex justify-center space-x-4">
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
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
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

            {/* Additional Sections */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">
                API Reference
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/react-api"
                    className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors"
                  >
                    React APIs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dom-api"
                    className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors"
                  >
                    React DOM APIs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-slate-200 dark:border-slate-800 pt-6">
          <div className="flex flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-4 text-center md:text-left">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} ByteForge. All rights reserved.
            </p>
            {/* <div className="flex space-x-4">
              {["Terms", "Privacy", "Cookies"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
