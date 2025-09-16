// About.tsx by Me
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedRoute } from "@/components/layout/motion-layout";
import { motion, Variants } from "framer-motion";
import {
  Code,
  BookOpen,
  MessageSquare,
  Users,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Animation variants
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

// Team members data
import {
  TeamMemberCard,
  teamMembers,
  socialLinks,
} from "./components/team-details";
// Feature highlights
import { features, FeatureCard } from "./components/features";


const AboutPage = () => {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl space-y-12">
        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About ByteForge
          </h1>
          <p className="text-slate-500 md:text-xl dark:text-slate-400">
            Empowering Beginners to Master Java
          </p>
        </motion.div>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="space-y-4">
            <motion.h2
              className="text-2xl font-bold flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Sparkles className="h-6 w-6 text-yellow-500" />
              Our Mission
            </motion.h2>
            <motion.p
              className="text-slate-500 dark:text-slate-400 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              At ByteForge, we believe that learning Java should be accessible,
              engaging, and effective for everyone. Whether you're taking your
              first steps into programming or refining your skills, ByteForge is
              here to guide you every step of the way.
            </motion.p>
            <motion.p
              className="text-slate-500 dark:text-slate-400 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Our mission is simple: to make Java programming approachable and
              fun while equipping learners with the skills they need to succeed
              in the real world.
            </motion.p>
          </div>

          <div className="space-y-4">
            <motion.h2
              className="text-2xl font-bold flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <CheckCircle className="h-6 w-6 text-green-500" />
              Why ByteForge?
            </motion.h2>
            <motion.p
              className="text-slate-500 dark:text-slate-400 text-lg mt-4 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              ByteForge isn't just another coding platform—it's a complete Java
              learning ecosystem. Here's what sets us apart:
            </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
            >
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.h2
              className="text-2xl font-bold flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Users className="h-6 w-6 text-blue-500" />
              Accessible Learning for Everyone
            </motion.h2>
            <motion.p
              className="text-slate-500 dark:text-slate-400 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              We believe education should be accessible to all. ByteForge
              offers:
            </motion.p>
            <motion.ul
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-2 text-slate-500 dark:text-slate-400"
              >
                <span className="text-green-500 font-bold">✓</span>
                <span>
                  <strong>Free Learning Content:</strong> All our learning
                  content is available without paywalls or hidden fees.
                </span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-2 text-slate-500 dark:text-slate-400"
              >
                <span className="text-green-500 font-bold">✓</span>
                <span>
                  <strong>Free Sign-Up:</strong> Save your progress, notes, and
                  code snippets with a free account.
                </span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-2 text-slate-500 dark:text-slate-400"
              >
                <span className="text-green-500 font-bold">✓</span>
                <span>
                  <strong>Community Resources:</strong> Access forums,
                  tutorials, and additional materials to enhance your learning
                  experience.
                </span>
              </motion.li>
            </motion.ul>
          </div>

          <div className="space-y-4">
            <motion.h2
              className="text-2xl font-bold flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <Users className="h-6 w-6 text-purple-500" />
              Our Team
            </motion.h2>
            <motion.p
              className="text-slate-500 dark:text-slate-400 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              ByteForge is built by a dedicated team of software engineers,
              educators, and designers, committed to providing the best Java
              learning experience. Our content is crafted by experienced Java
              professionals and is regularly updated to ensure it reflects the
              latest industry best practices and Java language updates.
            </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
            >
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.h2
              className="text-2xl font-bold flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <Sparkles className="h-6 w-6 text-yellow-500" />
              Join the ByteForge Community!
            </motion.h2>
            <motion.p
              className="text-slate-500 dark:text-slate-400 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              ByteForge isn't just a platform - it's your gateway to mastering
              Java. Whether you're just starting or looking to refine your
              skills, we're here to help you code with confidence. Start your
              Java journey today and become a part of the ByteForge community!
              🚀
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mt-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full",
                    "border border-slate-200 dark:border-slate-800",
                    "hover:bg-slate-100 dark:hover:bg-slate-800",
                    "transition-colors duration-200",
                    link.color
                  )}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <Button asChild size="lg" className="group">
            <Link to="/signup" className="flex items-center gap-2">
              Join ByteForge Today
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
