import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, LightbulbIcon } from "lucide-react";

const ModernCallToAction = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <section
      className={`py-16 md:py-24 relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-blue-100 to-slate-50"
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {theme === "dark" ? (
          <>
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>

            {/* Code patterns in background */}
            <div className="absolute inset-0 opacity-[0.015]">
              <pre className="text-[10px] md:text-xs text-left overflow-hidden whitespace-pre-wrap break-all">
                {Array(20)
                  .fill(
                    `import java.util.*;
                  
public class LearnJava {
    public static void main(String[] args) {
        System.out.println("Welcome to ByteForge!");
        
        // Start your coding journey today
        List<String> skills = new ArrayList<>();
        skills.add("Java Fundamentals");
        skills.add("Object-Oriented Programming");
        skills.add("Data Structures");
        
        for (String skill : skills) {
            System.out.println("Learning: " + skill);
        }
    }
}`
                  )
                  .join("")}
              </pre>
            </div>
          </>
        ) : (
          <>
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl"></div>
          </>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div
            className={`rounded-2xl overflow-hidden ${
              theme === "dark"
                ? "bg-slate-800/60 backdrop-blur-sm border border-slate-700"
                : "bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* CTA Content */}
              <motion.div
                className="p-8 md:p-12"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mb-6 ${
                    theme === "dark"
                      ? "bg-blue-900/30 text-blue-400"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  <LightbulbIcon className="h-4 w-4" />
                  <span>Start Learning Today</span>
                </div>

                <h2
                  className={`text-3xl md:text-4xl font-bold mb-6 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  Ready to Begin Your Java Programming Journey?
                </h2>

                <p
                  className={`text-lg mb-8 ${
                    theme === "dark" ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Join thousands of learners who have mastered Java programming
                  with ByteForge. Start your learning journey today and build
                  the skills for tomorrow's opportunities.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Self-paced interactive lessons",
                    "Hands-on coding exercises",
                    "Project-based learning",
                    "Certificate of completion",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle
                        className={`h-5 w-5 flex-shrink-0 ${
                          theme === "dark" ? "text-green-400" : "text-green-500"
                        }`}
                      />
                      <span
                        className={
                          theme === "dark" ? "text-slate-300" : "text-slate-700"
                        }
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className={`${
                      theme === "dark"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0"
                        : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0"
                    }`}
                    onClick={() => navigate("/signup")}
                  >
                    Create Free Account
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className={`${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                    onClick={() => navigate("/topics")}
                  >
                    Explore Topics
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <p
                  className={`mt-6 text-sm ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  No credit card required. Start learning immediately.
                </p>
              </motion.div>

              {/* Image/Feature Section */}
              <motion.div
                className={`relative ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-slate-900 to-blue-900/40"
                    : "bg-gradient-to-br from-blue-50 to-cyan-50"
                } p-8 md:p-12 flex flex-col justify-center`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4">
                  <div
                    className={`w-24 h-24 rotate-12 rounded-lg ${
                      theme === "dark" ? "bg-blue-500/10" : "bg-blue-100"
                    }`}
                  ></div>
                </div>
                <div className="absolute bottom-0 left-0 -mb-8 -ml-8">
                  <div
                    className={`w-32 h-32 -rotate-12 rounded-lg ${
                      theme === "dark" ? "bg-cyan-500/10" : "bg-cyan-100"
                    }`}
                  ></div>
                </div>

                {/* CTA Stats */}
                <div className="relative z-10 space-y-8">
                  <div>
                    <h3
                      className={`text-xl font-bold mb-6 ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Why students choose ByteForge
                    </h3>

                    <div className="grid grid-cols-2 gap-6">
                      <div
                        className={`p-4 rounded-lg ${
                          theme === "dark"
                            ? "bg-slate-800/50 border border-slate-700"
                            : "bg-white border border-slate-200"
                        }`}
                      >
                        <div
                          className={`text-2xl font-bold mb-1 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          94%
                        </div>
                        <div
                          className={`text-sm ${
                            theme === "dark"
                              ? "text-slate-400"
                              : "text-slate-600"
                          }`}
                        >
                          Completion rate
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-lg ${
                          theme === "dark"
                            ? "bg-slate-800/50 border border-slate-700"
                            : "bg-white border border-slate-200"
                        }`}
                      >
                        <div
                          className={`text-2xl font-bold mb-1 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          4.9
                        </div>
                        <div
                          className={`text-sm ${
                            theme === "dark"
                              ? "text-slate-400"
                              : "text-slate-600"
                          }`}
                        >
                          Average rating
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-lg ${
                          theme === "dark"
                            ? "bg-slate-800/50 border border-slate-700"
                            : "bg-white border border-slate-200"
                        }`}
                      >
                        <div
                          className={`text-2xl font-bold mb-1 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          89%
                        </div>
                        <div
                          className={`text-sm ${
                            theme === "dark"
                              ? "text-slate-400"
                              : "text-slate-600"
                          }`}
                        >
                          Learning Rate
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-lg ${
                          theme === "dark"
                            ? "bg-slate-800/50 border border-slate-700"
                            : "bg-white border border-slate-200"
                        }`}
                      >
                        <div
                          className={`text-2xl font-bold mb-1 ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          3+
                        </div>
                        <div
                          className={`text-sm ${
                            theme === "dark"
                              ? "text-slate-400"
                              : "text-slate-600"
                          }`}
                        >
                          Active students
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg border ${
                      theme === "dark"
                        ? "bg-slate-800/30 border-slate-700"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"
                        }`}
                      >
                        <svg
                          className={`h-5 w-5 ${
                            theme === "dark" ? "text-blue-400" : "text-blue-600"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <div
                          className={`font-medium ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          Guarantee 
                        </div>
                        <div
                          className={`text-sm ${
                            theme === "dark"
                              ? "text-slate-400"
                              : "text-slate-600"
                          }`}
                        >
                          30-day satisfaction
                          {/* guarantee or your money back.
                          30-day satisfaction guarantee or your money back. */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCallToAction;
