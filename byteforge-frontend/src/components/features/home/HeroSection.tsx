import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Code, BookOpen, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

// Import the topics directly from the TopicsPage file
// This assumes the topics array is exported from that file
import { topics } from "@/data/topics"; // Adjust the import path as necessary
import { AnimatedRoute } from "@/components/common/motion-layout";
const Hero = () => {
  // Use state for topic count in case it needs to load asynchronously
  const [topicCount, setTopicCount] = useState(0);

  useEffect(() => {
    // Set the topic count from the imported array
    // If topics is not exported from the correct file, you'll need to modify this approach
    if (topics) {
      setTopicCount(topics.length);
    }
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-100 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden relative transition-colors duration-100 ease-in-out">
      {/* Background pattern/decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -right-20 -top-20 w-[40rem] h-[40rem] rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute -left-20 top-1/2 w-[30rem] h-[30rem] rounded-full bg-blue-400/10 blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <AnimatedRoute
            animationType="slide"
            element={
              <>
                <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                  <div className="inline-flex items-center rounded-lg bg-blue-50 dark:bg-slate-800/60 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 max-w-fit">
                    <span className="animate-pulse mr-1">•</span> New!
                    Interactive Java lessons available
                  </div>

                  {/* <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600 dark:from-white dark:to-blue-400">
                Master Java Programming with ByteForge
              </h1>
              <p className="max-w-[600px] text-slate-600 text-lg md:text-xl dark:text-slate-300">
                An intuitive learning platform designed to help you become a
                Java expert through interactive lessons, real-time coding, and
                AI-powered assistance.
              </p>
            </div> */}

                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600 dark:from-white dark:to-blue-400">
                      Master Java Programming with ByteForge
                    </h1>
                    <p className="max-w-[600px] text-slate-600 text-lg md:text-xl dark:text-slate-300 leading-relaxed sm:leading-loose transition-colors duration-300 ease-in-out">
                      An intuitive learning platform designed to help you become
                      a Java expert through interactive lessons, real-time
                      coding, and AI-powered assistance.
                    </p>
                  </div>

                  {/* Feature highlights - Dynamic topic count */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Live Compiler</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">
                        {topicCount}+ Tutorials
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">AI Assistant</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 min-[400px]:flex-row">
                    <Button
                      asChild
                      size="lg"
                      className="bg-primary hover:bg-primary/90 transition-all duration-100 shadow-lg hover:shadow-xl hover:shadow-primary/20"
                    >
                      <Link to="/topics">
                        Start Learning Now{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="transition-all duration-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Link to="/login">Log In</Link>
                    </Button>
                  </div>
                </div>
              </>
            }
          />

          {/* Right Column - Image/Illustration */}
          <AnimatedRoute
            animationType="flip"
            element={
              <>
                <div className="hidden lg:flex items-center justify-center">
                  <div className="relative w-full max-w-lg">
                    {/* Code Editor Preview */}
                    <div className="rounded-lg shadow-2xl dark:shadow-blue-900/20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden relative">
                      <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <div className="ml-4 text-xs font-mono text-slate-600 dark:text-slate-400">
                          ByteForge Editor
                        </div>
                      </div>
                      <div className="p-4 font-mono text-sm">
                        <pre className="text-slate-700 dark:text-slate-300">
                          <code>
                            <span className="text-blue-600 dark:text-blue-400">
                              public class
                            </span>{" "}
                            <span className="text-green-600 dark:text-green-400">
                              HelloWorld
                            </span>{" "}
                            {`{`}
                          </code>
                        </pre>
                        <pre className="text-slate-700 dark:text-slate-300">
                          <code>
                            {" "}
                            <span className="text-blue-600 dark:text-blue-400">
                              public static void
                            </span>{" "}
                            <span className="text-purple-600 dark:text-purple-400">
                              main
                            </span>
                            (String[] args) {`{`}
                          </code>
                        </pre>
                        <pre className="text-slate-700 dark:text-slate-300">
                          <code>
                            {" "}
                            System.
                            <span className="text-purple-600 dark:text-purple-400">
                              out
                            </span>
                            .println(
                            <span className="text-yellow-600 dark:text-yellow-400">
                              "Hello, ByteForge!"
                            </span>
                            );
                          </code>
                        </pre>
                        <pre className="text-slate-700 dark:text-slate-300">
                          <code> {`}`}</code>
                        </pre>
                        <pre className="text-slate-700 dark:text-slate-300">
                          <code>{`}`}</code>
                        </pre>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-2 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-xs text-green-600 dark:text-green-400 font-mono">
                          → Hello, ByteForge!
                        </div>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-lg rotate-6 -z-10"></div>
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg -rotate-6 -z-10"></div>
                  </div>
                </div>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
