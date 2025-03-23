import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Code,
  MessageSquare,
  BookOpen,
  Save,
  Laptop,
  Users,
} from "lucide-react";

const FeatureSection = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Key Features of ByteForge
            </h2>
            <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
              Everything you need to master Java programming in one place
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
          <Card>
            <CardHeader className="pb-2">
              <Code className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Integrated Java Compiler</CardTitle>
              <CardDescription>
                Write, compile, and run Java code directly in your browser
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Our compiler supports the latest Java features and provides
                real-time error checking and suggestions. Sign in required to
                save your code.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <MessageSquare className="h-6 w-6 text-primary mb-2" />
              <CardTitle>AI-Powered Assistant</CardTitle>
              <CardDescription>
                Get instant help with coding problems and concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Our intelligent chatbot provides personalized guidance, explains
                complex topics, and helps debug your code. Sign in required to
                access this feature.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Save className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Smart Note-Taking</CardTitle>
              <CardDescription>
                Save important concepts and code snippets for later review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Organize your learning journey with our powerful note-taking
                system that integrates with lessons and exercises. Sign in
                required to save notes.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <BookOpen className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Structured Learning Path</CardTitle>
              <CardDescription>
                Follow a clear progression from basics to advanced topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Our curriculum is designed by Java experts to ensure you build a
                solid foundation and progress logically.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Laptop className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Interactive Exercises</CardTitle>
              <CardDescription>
                Practice with hands-on coding challenges and projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Reinforce your learning with practical exercises that test your
                understanding and build real-world skills.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Users className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Community Support</CardTitle>
              <CardDescription>
                Connect with other learners and Java experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Join our active community to share knowledge, collaborate on
                projects, and get additional help when needed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
