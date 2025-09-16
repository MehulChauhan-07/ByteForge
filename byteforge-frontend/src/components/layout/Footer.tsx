import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/icons";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/MehulChauhan-22/ByteForge",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      href: "https://twitter.com/byteforge",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com/company/byteforge",
    },
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:contact@byteforge.com",
    },
  ];

  const footerSections = [
    {
      title: "Learn",
      links: ["Courses", "Tutorials", "Exercises", "Certification"],
    },
    {
      title: "Tools",
      links: ["Compiler", "Assistant", "Notes", "Community"],
    },
    {
      title: "API Reference",
      links: [
        { text: "React APIs", href: "/react-api" },
        { text: "React DOM APIs", href: "/dom-api" },
      ],
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.footer
      className="bg-slate-50 dark:bg-slate-900 border-t"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container px-6 py-10 md:py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-8 text-center">
          {/* Brand Section */}
          <motion.div
            className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl space-y-4"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="flex flex-col items-center">
                <Logo className="h-10 w-10" />
                <span className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-2">
                  ByteForge
                </span>
              </Link>
            </motion.div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              An intuitive platform for mastering Java programming with
              interactive lessons, an integrated compiler, and AI-powered
              assistance.
            </p>
            <div className="flex justify-center space-x-4">
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
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12"
            variants={containerVariants}
          >
            {footerSections.map((section) => (
              <motion.div
                key={section.title}
                className="space-y-4"
                variants={itemVariants}
              >
                <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <motion.li
                      key={typeof link === "string" ? link : link.text}
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Link
                        to={
                          typeof link === "string"
                            ? `/${link.toLowerCase()}`
                            : link.href
                        }
                        className={cn(
                          "text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors",
                          "inline-flex items-center gap-1 group"
                        )}
                      >
                        {typeof link === "string" ? link : link.text}
                        <motion.span
                          className="inline-block opacity-0 group-hover:opacity-100"
                          initial={{ x: -5 }}
                          whileHover={{ x: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-10 border-t border-slate-200 dark:border-slate-800 pt-6"
          variants={itemVariants}
        >
          <div className="flex flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-4 text-center md:text-left">
            <motion.p
              className="text-sm text-slate-600 dark:text-slate-400"
              whileHover={{ scale: 1.02 }}
            >
              © {currentYear} ByteForge. All rights reserved.
            </motion.p>
            <motion.div className="flex space-x-4" variants={containerVariants}>
              {["Terms", "Privacy", "Cookies"].map((item, index) => (
                <motion.div
                  key={item}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
