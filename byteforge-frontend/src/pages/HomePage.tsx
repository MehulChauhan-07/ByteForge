// import { Code, MessageSquare, BookOpen } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import Hero from "@/components/features/home/HeroSection";
// import FeatureSection from "@/components/features/home/FeatureSection";
// import JavaTopics from "@/components/features/home/JavaTopics";

// const HomePage = () => {
//   return (
//     <div className="flex flex-col min-h-screen ">
//       <Hero />

//       <main className="flex-1">
//         {/* Features Section */}
//         <FeatureSection />

//         {/* How it Works Section */}
//         <section className="py-16 bg-slate-50 dark:bg-slate-900 ">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                   How ByteForge Works
//                 </h2>
//                 <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
//                   Our platform is designed to make learning Java intuitive and
//                   effective
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 pt-12">
//               <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 dark:border-slate-800">
//                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
//                   <BookOpen className="h-8 w-8 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-bold">Learn</h3>
//                 <p className="text-center text-slate-500 dark:text-slate-400">
//                   Start with interactive lessons designed for all skill levels
//                 </p>
//               </div>
//               <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 dark:border-slate-800">
//                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
//                   <Code className="h-8 w-8 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-bold">Practice</h3>
//                 <p className="text-center text-slate-500 dark:text-slate-400">
//                   Apply your knowledge with our integrated Java compiler
//                 </p>
//               </div>
//               <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 dark:border-slate-800">
//                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
//                   <MessageSquare className="h-8 w-8 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-bold">Get Help</h3>
//                 <p className="text-center text-slate-500 dark:text-slate-400">
//                   Stuck? Our AI assistant is available 24/7 to answer your
//                   questions
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Java Topics Section */}
//         <JavaTopics />

//         {/* Testimonials */}
//         {/* <TestimonialSection /> */}

//         {/* CTA Section */}
//         <section className="py-16 bg-primary text-primary-foreground">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                   Ready to Start Your Java Journey?
//                 </h2>
//                 <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Sign up to access our interactive compiler, AI assistant, and
//                   note-taking features
//                 </p>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Button
//                   asChild
//                   size="lg"
//                   className="bg-white text-primary hover:bg-slate-100"
//                 >
//                   <Link to="/signup">Create Free Account</Link>
//                 </Button>
//                 <Button
//                   asChild
//                   variant="outline"
//                   size="lg"
//                   className="border-white text-black dark:border-slate-800 dark:text-slate-200 hover:bg-primary-foreground/10"
//                 >
//                   <Link to="/topics">Browse Topics</Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default HomePage;
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import { useUser } from "@/contexts/UserContext";
import {
  Code,
  BookOpen,
  MessageSquare,
  FileText,
  CheckCircle,
} from "lucide-react";

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useUser();

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <Code className="h-12 w-12 text-primary" />
              <span className="text-4xl font-bold">ByteForge</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Master Java Programming
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your complete learning environment for Java development with
            interactive lessons, coding playground, and personalized support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/topics">
              <button className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium">
                Explore Topics
              </button>
            </Link>
            {!isAuthenticated && (
              <Link to="/signup">
                <button className="px-6 py-3 rounded-md bg-secondary text-secondary-foreground font-medium">
                  Join Now
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Learn Java
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Comprehensive Topics
              </h3>
              <p className="text-muted-foreground">
                Explore structured Java lessons from basics to advanced
                concepts.
              </p>
            </div>

            <div className="border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Code Playground</h3>
              <p className="text-muted-foreground">
                Write, compile, and run Java code directly in your browser.
              </p>
            </div>

            <div className="border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
              <p className="text-muted-foreground">
                Get help from ByteBot, your personal Java learning assistant.
              </p>
            </div>

            <div className="border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Notes</h3>
              <p className="text-muted-foreground">
                Create and organize your notes as you learn Java concepts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Banner */}
      {!isAuthenticated && (
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Access All Features
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Sign up to unlock the code playground, AI assistant,
                note-taking, and progress tracking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <button className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium">
                    Create Account
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-6 py-3 rounded-md bg-secondary text-secondary-foreground font-medium">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Personalized Section for Logged In Users */}
      {isAuthenticated && (
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Welcome back, {user?.name}!
              </h2>
              <p className="text-muted-foreground mb-6">
                Continue your Java learning journey. Here's what you can do
                next:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/progress"
                  className="border bg-background rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">View Your Progress</h3>
                      <p className="text-sm text-muted-foreground">
                        Check your learning stats and achievements
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/playground"
                  className="border bg-background rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Code className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Code Playground</h3>
                      <p className="text-sm text-muted-foreground">
                        Practice your Java coding skills
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/chatbot"
                  className="border bg-background rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Ask ByteBot</h3>
                      <p className="text-sm text-muted-foreground">
                        Get help with your Java questions
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/notes"
                  className="border bg-background rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Your Notes</h3>
                      <p className="text-sm text-muted-foreground">
                        Access your learning notes
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Code className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ByteForge</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
              <Link
                to="/topics"
                className="text-muted-foreground hover:text-foreground"
              >
                Topics
              </Link>
              <Link
                to="/playground"
                className="text-muted-foreground hover:text-foreground"
              >
                Playground
              </Link>
              <Link
                to="/chatbot"
                className="text-muted-foreground hover:text-foreground"
              >
                Chatbot
              </Link>
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} ByteForge. All rights reserved.
            </p>
            <p className="mt-1">Last updated: March 26, 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;