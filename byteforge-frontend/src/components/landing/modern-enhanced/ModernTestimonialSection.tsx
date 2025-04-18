import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  LinkedinIcon,
  GithubIcon,
} from "lucide-react";

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    company: "Google",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "ByteForge completely transformed my understanding of Java. The structured approach and interactive exercises helped me build a solid foundation that I use every day as a professional developer.",
    rating: 5,
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Full Stack Developer",
    company: "Microsoft",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "I tried many Java learning platforms before finding ByteForge, and none of them compared. The interactive code examples and practical projects made all the difference in my learning journey.",
    rating: 5,
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Computer Science Student",
    company: "Stanford University",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    quote:
      "As a computer science student, ByteForge gave me the edge I needed to excel in my Java courses. The curriculum perfectly complemented my university studies and helped me stand out in class projects.",
    rating: 4,
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 4,
    name: "David Kim",
    role: "Android Developer",
    company: "Spotify",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "The Android development section on ByteForge was instrumental in helping me land my dream job. The platform's focus on practical applications of Java concepts made all the difference.",
    rating: 5,
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
];

const ModernTestimonialSection = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      className={`py-20 ${
        theme === "dark"
          ? "bg-gradient-to-b from-slate-900 to-slate-950"
          : "bg-gradient-to-b from-white to-slate-50"
      }`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            What Our Students Say
          </h2>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Join thousands of satisfied learners who have accelerated their Java
            programming skills with ByteForge.
          </p>
        </motion.div>

        {/* Testimonial cards with navigation */}
        <div className="relative max-w-5xl mx-auto">
          {/* Quote decoration */}
          <div className="absolute -z-10 opacity-5">
            <Quote className="w-40 h-40" />
          </div>

          {/* Testimonial slider */}
          <div className="relative px-4">
            <div
              className={`overflow-hidden rounded-2xl ${
                theme === "dark"
                  ? "bg-slate-800/50 border border-slate-700"
                  : "bg-white border border-slate-200 shadow-lg"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Avatar and info section */}
                <div
                  className={`p-6 md:p-8 flex flex-col items-center justify-center text-center ${
                    theme === "dark"
                      ? "bg-slate-800 border-r border-slate-700"
                      : "bg-slate-50 border-r border-slate-100"
                  }`}
                >
                  <motion.div
                    key={`avatar-${testimonials[activeIndex].id}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="mb-4"
                  >
                    <img
                      src={testimonials[activeIndex].avatar}
                      alt={testimonials[activeIndex].name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-md"
                    />
                  </motion.div>

                  <motion.h3
                    key={`name-${testimonials[activeIndex].id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`text-xl font-bold ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {testimonials[activeIndex].name}
                  </motion.h3>

                  <motion.p
                    key={`role-${testimonials[activeIndex].id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`text-sm ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {testimonials[activeIndex].role}
                  </motion.p>

                  <motion.div
                    key={`company-${testimonials[activeIndex].id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`text-sm font-medium mt-1 ${
                      theme === "dark" ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {testimonials[activeIndex].company}
                  </motion.div>

                  <div className="flex mt-4 gap-2">
                    {[...Array(testimonials[activeIndex].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 fill-current ${
                            theme === "dark"
                              ? "text-amber-400"
                              : "text-amber-500"
                          }`}
                        />
                      )
                    )}
                  </div>

                  <div className="flex gap-3 mt-4">
                    <a
                      href={testimonials[activeIndex].social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full ${
                        theme === "dark"
                          ? "bg-slate-700 text-blue-400 hover:bg-slate-600"
                          : "bg-slate-200 text-blue-600 hover:bg-slate-300"
                      }`}
                    >
                      <LinkedinIcon size={16} />
                    </a>
                    <a
                      href={testimonials[activeIndex].social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full ${
                        theme === "dark"
                          ? "bg-slate-700 text-white hover:bg-slate-600"
                          : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                      }`}
                    >
                      <GithubIcon size={16} />
                    </a>
                  </div>
                </div>

                {/* Quote section */}
                <div className="p-6 md:p-8 col-span-1 md:col-span-2 flex items-center">
                  <div className="h-full flex flex-col justify-between">
                    <motion.div
                      key={`quote-${testimonials[activeIndex].id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-6 flex-grow"
                    >
                      <Quote
                        className={`h-8 w-8 mb-4 ${
                          theme === "dark" ? "text-blue-400" : "text-blue-500"
                        }`}
                      />
                      <p
                        className={`text-lg md:text-xl leading-relaxed italic ${
                          theme === "dark" ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        "{testimonials[activeIndex].quote}"
                      </p>
                    </motion.div>

                    {/* Navigation controls */}
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              index === activeIndex
                                ? theme === "dark"
                                  ? "bg-blue-500 scale-110"
                                  : "bg-blue-600 scale-110"
                                : theme === "dark"
                                ? "bg-slate-700 hover:bg-slate-600"
                                : "bg-slate-300 hover:bg-slate-400"
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                          />
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={prevTestimonial}
                          className={`p-2 rounded-full ${
                            theme === "dark"
                              ? "bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                          aria-label="Previous testimonial"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          onClick={nextTestimonial}
                          className={`p-2 rounded-full ${
                            theme === "dark"
                              ? "bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                          aria-label="Next testimonial"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional testimonials indicators */}
          <div className="mt-8 flex justify-center">
            <div
              className={`flex gap-4 px-8 py-3 rounded-full ${
                theme === "dark"
                  ? "bg-slate-800/50 text-slate-300"
                  : "bg-white text-slate-600 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-1">
                <Star
                  className={`h-4 w-4 ${
                    theme === "dark" ? "text-amber-400" : "text-amber-500"
                  }`}
                />
                <span className="text-sm font-medium">4.9/5.0</span>
              </div>
              <div
                className={
                  theme === "dark" ? "text-slate-600" : "text-slate-300"
                }
              >
                |
              </div>
              <div className="text-sm">Based on 1,200+ student reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernTestimonialSection;
