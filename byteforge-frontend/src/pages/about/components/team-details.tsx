import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
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

const teamMembers = [
  {
    name: "Mehulsinh Chauhan",
    role: "Frontend Developer",
    bio: "Passionate React and TypeScript developer, building intuitive user experiences for ByteForge.",
    avatar: "/placeholder.svg?height=100&width=100",
    fallback: "MC",
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    name: "Akash Panchal",
    role: "Educational Content Designer",
    bio: "Crafting engaging study materials and presentations to simplify Java learning for beginners.",
    avatar: "/placeholder.svg?height=100&width=100",
    fallback: "AP",
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    name: "Rana Khunti",
    role: "Backend Developer",
    bio: "Spring Boot and Docker specialist, ensuring seamless and efficient backend operations.",
    avatar: "/placeholder.svg?height=100&width=100",
    fallback: "RK",
    color: "text-green-500",
    gradient: "from-green-500/20 to-green-500/5",
  },
];

const TeamMemberCard = ({ member }: { member: (typeof teamMembers)[0] }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={cn(
        "rounded-lg p-6 border border-slate-200 dark:border-slate-800",
        "group relative overflow-hidden transition-all duration-300",
        "hover:shadow-lg dark:hover:shadow-slate-800/50",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:opacity-0 before:transition-opacity",
        "hover:before:opacity-100",
        `before:${member.gradient}`
      )}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={cn(
            "h-20 w-20 rounded-full overflow-hidden border-2",
            member.color
          )}
        >
          <img
            src={member.avatar}
            alt={member.name}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold">{member.name}</h3>
          <p className={cn("text-sm font-medium", member.color)}>
            {member.role}
          </p>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
};

import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socialLinks = [
  {
    icon: <Github className="h-5 w-5" />,
    label: "GitHub",
    url: "https://github.com/MehulChauhan-07/ByteForge",
    color: "text-slate-700 dark:text-slate-300",
  },
  {
    icon: <Twitter className="h-5 w-5" />,
    label: "Twitter",
    url: "https://twitter.com/byteforge",
    color: "text-blue-400",
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    label: "LinkedIn",
    url: "https://linkedin.com/company/byteforge",
    color: "text-blue-600",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    url: "mailto:contact@byteforge.com",
    color: "text-red-500",
  },
];

export { teamMembers, TeamMemberCard, socialLinks };
