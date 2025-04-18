import { Code, MessageSquare, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/features/home/HeroSection";
import FeatureSection from "@/components/features/home/FeatureSection";
import JavaTopics from "@/components/features/home/JavaTopics";
import CallToAction from "@/components/landing/CallToAction";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <main className="flex-1">
        {/* Features Section */}
        <FeatureSection />

        {/* How it Works Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How ByteForge Works
                </h2>
                <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
                  Our platform is designed to make learning Java intuitive and
                  effective
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 pt-12">
              {[
                {
                  icon: <BookOpen className="h-8 w-8 text-primary" />,
                  title: "Learn",
                  description:
                    "Start with interactive lessons designed for all skill levels",
                },
                {
                  icon: <Code className="h-8 w-8 text-primary" />,
                  title: "Practice",
                  description:
                    "Apply your knowledge with our integrated Java compiler",
                },
                {
                  icon: <MessageSquare className="h-8 w-8 text-primary" />,
                  title: "Get Help",
                  description:
                    "Stuck? Our AI assistant is available 24/7 to answer your questions",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center space-y-2 rounded-lg border p-4 dark:border-slate-800 hover:shadow-lg transition-shadow"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-slate-500 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Java Topics Section */}
        <JavaTopics />

        {/* CTA Section */}
        {/* <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Your Java Journey?
                </h2>
                <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Sign up to access our interactive compiler, AI assistant, and
                  note-taking features
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-slate-100"
                >
                  <Link to="/signup">Create Free Account</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-black dark:border-slate-800 dark:text-slate-200 hover:bg-primary-foreground/10"
                >
                  <Link to="/topics">Browse Topics</Link>
                </Button>
              </div>
            </div>
          </div>
        </section> */}
        <CallToAction />
      </main>
    </div>
  );
};

export default HomePage;
