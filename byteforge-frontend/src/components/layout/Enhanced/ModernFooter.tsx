import { Link } from "react-router-dom";
import { useTheme } from "@/components/layout/ThemeProvider";
import {
  Github,
  Heart,
  Code2,
  Users,
  Rocket,
  BookOpen,
  MessageSquare,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Star,
  Coffee,
  ExternalLink,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/icons";

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

const socialLinks = [
  {
    name: "GitHub",
    icon: <Github className="h-5 w-5" />,
    href: "https://github.com/MehulChauhan-22/ByteForge",
  },
  {
    name: "Email",
    icon: <Mail className="h-5 w-5" />,
    href: "mailto:contact@byteforge.com",
  },
  {
    name: "ExternalLink",
    icon: <ExternalLink className="h-5 w-5" />,
    href: "http://localhost:5173/",
  },
];

const ModernFooter = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            {/* old style  */}
            {/* <div className="bg-primary/10 p-2 rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold">ByteForge</span> */}

            {/* new style */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="flex p-2">
                <Logo className="h-10 w-10" />
                <span className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-2">
                  ByteForge
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="flex gap-6">
            <Button variant="ghost" size="sm" className="rounded-full">
              About
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              Features
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              Team
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              Contact
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.div
                key={social.name}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  asChild
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.icon}
                    <span className="sr-only">{social.name}</span>
                  </a>
                </Button>
              </motion.div>
            ))}
            {/* <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ExternalLink className="h-5 w-5" />
            </Button> */}
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-8 pt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} ByteForge. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500" /> by the
            ByteForge Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
