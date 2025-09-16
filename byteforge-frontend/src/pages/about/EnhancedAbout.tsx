import React from "react";
import { motion, Variants } from "framer-motion";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const containerAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemAnimation: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const AboutPage = () => {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Interactive Learning",
      description:
        "Engage with interactive tutorials, code samples, and exercises designed to reinforce your Java programming skills",
    },
    {
      icon: <Code2 className="h-6 w-6 text-primary" />,
      title: "Built-in Compiler",
      description:
        "Write, edit, and run your Java code directly in the browser with our integrated compiler and execution environment",
    },
    {
      icon: <Rocket className="h-6 w-6 text-primary" />,
      title: "Progressive Learning Path",
      description:
        "Follow a structured curriculum that takes you from beginner to advanced Java concepts with practical examples",
    },
    // {
    //   icon: <Users className="h-6 w-6 text-primary" />,
    //   title: "Community Support",
    //   description:
    //     "Connect with other learners, ask questions, and share your progress with our supportive community",
    // },
    // {
    //   icon: <MessageSquare className="h-6 w-6 text-primary" />,
    //   title: "Discussion Forums",
    //   description:
    //     "Participate in topic-specific discussions to deepen your understanding and solve coding challenges",
    // },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: "Project-Based Learning",
      description:
        "Apply your knowledge by building real-world projects with guided instructions and feedback",
    },
  ];

  const team = [
    {
      name: "Rana khunti",
      role: "Founder & Lead Developer",
      image: "/images/team/rana.jpg",
      initial: "RK",
      github: "ranakhunti",
    },
    {
      name: "Mehulsinh Chauhan",
      role: "UI/UX Designer & Developer",
      image: "/images/team/mehul.jpg",
      initial: "MC",
      github: "MehulChauhan-07",
    },
    {
      name: "Akash Panchal",
      role: "Educational Content Designer",
      image: "/images/team/akash.jpg",
      initial: "AP",
      github: "akashpanchal",
    },
  ];

  const stats = [
    { value: "500+", label: "Learning Modules" },
    { value: "10,000+", label: "Active Learners" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support Available" },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900/30 min-h-screen pb-16">
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="mb-6 px-4 py-1.5 text-sm rounded-full bg-white dark:bg-slate-900 shadow-sm border-primary/20"
              >
                About ByteForge
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              A Modern Java Learning Environment
            </motion.h1>

            <motion.p
              className="text-xl text-slate-700 dark:text-slate-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              ByteForge is an interactive platform designed to make learning
              Java programming engaging, practical, and accessible to everyone
              from beginners to advanced developers.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button size="lg" className="rounded-full gap-2">
                <Rocket className="h-4 w-4" />
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full gap-2"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </Button>
            </motion.div>
          </div>

          {/* Statistics */}
          {/* <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
            variants={containerAnimation}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemAnimation}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-sm border border-slate-200 dark:border-slate-800"
              >
                <div className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div> */}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.section
        className="container mx-auto px-4 py-16"
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border-primary/20"
          >
            Features
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Why Choose ByteForge?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Our platform is designed with a focus on interactive learning,
            practical coding experience, and a supportive community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemAnimation}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Mission Statement */}
      <motion.section
        className="bg-white dark:bg-slate-900 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8 } }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/dot-pattern.svg')] opacity-5" />

              <div className="relative z-10">
                <Badge
                  variant="outline"
                  className="mb-4 px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-primary/20"
                >
                  Our Mission
                </Badge>

                <h2 className="text-3xl font-bold mb-4">
                  Making Java Learning Accessible to Everyone
                </h2>

                <p className="text-lg mb-6 text-slate-700 dark:text-slate-300">
                  We believe that learning to code should be engaging,
                  practical, and adaptable to different learning styles.
                  ByteForge was created to provide a platform where anyone can
                  master Java programming through interactive lessons, hands-on
                  coding, and community support.
                </p>

                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-medium">
                    Beginner-friendly yet comprehensive curriculum
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-medium">
                    Practical, industry-relevant coding examples
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-medium">
                    Supportive community and expert guidance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="container mx-auto px-4 py-16"
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border-primary/20"
          >
            Our Team
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            Meet the Minds Behind ByteForge
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Our diverse team of educators, developers, and designers are
            passionate about creating the best Java learning experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={itemAnimation}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
            >
              <div className="mb-4 relative mx-auto w-24 h-24">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback className="text-xl bg-primary/10 text-primary">
                    {member.initial}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-white dark:bg-slate-900 rounded-full p-1 border border-slate-200 dark:border-slate-800">
                  <Github className="h-5 w-5" />
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">
                {member.role}
              </p>

              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-full"
                onClick={() =>
                  window.open(`https://github.com/${member.github}`, "_blank")
                }
              >
                <Github className="h-4 w-4 mr-2" />@{member.github}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8 } }}
      >
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/10 dark:to-slate-900/50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-5" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Master Java Programming?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-slate-700 dark:text-slate-300">
              Join thousands of learners who are building their Java skills and
              advancing their careers with ByteForge.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/topics">
                <Button size="lg" className="rounded-full gap-2">
                  <Rocket className="h-5 w-5" />
                  Start Learning Now
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full gap-2"
              >
                <Coffee className="h-5 w-5" />
                Support the Project
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      {/* <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold">ByteForge</span>
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
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ExternalLink className="h-5 w-5" />
              </Button>
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
      </footer> */}
    </div>
  );
};

export default AboutPage;
