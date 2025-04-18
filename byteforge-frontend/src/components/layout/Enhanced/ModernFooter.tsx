import { Link } from "react-router-dom";
import { useTheme } from "@/components/layout/ThemeProvider";
import {
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Mail,
  ChevronRight,
} from "lucide-react";

const footerLinks = [
  {
    title: "Learn",
    links: [
      { name: "Topics", href: "/topics" },
      { name: "Java Basics", href: "/topics/java-basics" },
      { name: "Object-Oriented Programming", href: "/topics/oop-java" },
      { name: "Java Collections", href: "/topics/java-collections" },
      { name: "Learning Path", href: "/roadmap" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Blog", href: "/blog" },
      { name: "Tutorials", href: "/tutorials" },
      { name: "Downloads", href: "/downloads" },
      { name: "Cheat Sheets", href: "/resources/cheat-sheets" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Forums", href: "/community" },
      { name: "Discord", href: "https://discord.gg/example" },
      { name: "GitHub", href: "https://github.com/MehulChauhan-07/ByteForge" },
      { name: "Contributing", href: "/contribute" },
      { name: "Code of Conduct", href: "/code-of-conduct" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
];

const ModernFooter = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`pt-16 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top section with logo and newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12 border-b border-slate-800 dark:border-slate-200/10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div
                className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                <span className="font-bold text-xl">B</span>
              </div>
              <span className="font-bold text-2xl">ByteForge</span>
            </Link>

            <p
              className={`mt-4 mb-6 max-w-md ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Interactive Java programming tutorials, hands-on coding exercises,
              and a comprehensive learning path to help you become a skilled
              developer.
            </p>

            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${
                  theme === "dark"
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                }`}
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/MehulChauhan-07/ByteForge"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${
                  theme === "dark"
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                }`}
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${
                  theme === "dark"
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${
                  theme === "dark"
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                }`}
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p
              className={`mb-4 max-w-md ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Subscribe to our newsletter for the latest tutorials, updates, and
              special offers.
            </p>

            <form className="flex gap-2">
              <div className="relative flex-grow">
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:ring-blue-600"
                      : "bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:ring-blue-500"
                  }`}
                  required
                />
              </div>
              <button
                type="submit"
                className={`px-5 py-2 font-medium rounded-lg ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Subscribe
              </button>
            </form>
            <p
              className={`mt-3 text-sm ${
                theme === "dark" ? "text-slate-400" : "text-slate-500"
              }`}
            >
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Middle section with link groups */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className={`inline-flex items-center hover:underline ${
                        theme === "dark"
                          ? "text-slate-300 hover:text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <ChevronRight className="h-3 w-3 mr-1" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section with copyright and extra links */}
        <div
          className={`py-6 flex flex-col md:flex-row justify-between items-center border-t ${
            theme === "dark" ? "border-slate-800" : "border-slate-200"
          }`}
        >
          <div
            className={`text-sm mb-4 md:mb-0 ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            &copy; {currentYear} ByteForge. All rights reserved.
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              to="/privacy"
              className={
                theme === "dark"
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-500 hover:text-slate-700"
              }
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className={
                theme === "dark"
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-500 hover:text-slate-700"
              }
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className={
                theme === "dark"
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-500 hover:text-slate-700"
              }
            >
              Cookie Policy
            </Link>
            <Link
              to="/sitemap"
              className={
                theme === "dark"
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-500 hover:text-slate-700"
              }
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
