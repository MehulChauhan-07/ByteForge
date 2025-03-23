import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import type { Topic } from "@/types";

const topics: Topic[] = [
  {
    id: "java-basics",
    title: "Java Basics",
    description: "Learn the fundamentals of Java programming language",
    level: "Beginner",
    duration: "4 hours",
    topics: ["Variables & Data Types", "Operators", "Control Flow", "Arrays"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "oop-java",
    title: "Object-Oriented Programming",
    description: "Master object-oriented programming concepts in Java",
    level: "Intermediate",
    duration: "6 hours",
    topics: [
      "Classes & Objects",
      "Inheritance",
      "Polymorphism",
      "Encapsulation",
    ],
    image: "/placeholder.svg?height=200&width=400",
  },
  // {
  //   id: "java-collections",
  //   title: "Java Collections Framework",
  //   description: "Explore Java's built-in data structures",
  //   level: "Intermediate",
  //   duration: "5 hours",
  //   topics: ["Lists", "Sets", "Maps", "Queues"],
  //   image: "/placeholder.svg?height=200&width=400",
  // },
  {
    id: "exception-handling",
    title: "Exception Handling",
    description: "Learn how to handle errors and exceptions in Java",
    level: "Intermediate",
    duration: "3 hours",
    topics: [
      "Try-Catch Blocks",
      "Checked vs Unchecked",
      "Custom Exceptions",
      "Best Practices",
    ],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "java-io",
    title: "Java I/O & Files",
    description: "Work with files and I/O streams in Java",
    level: "Intermediate",
    duration: "4 hours",
    topics: ["File Handling", "Streams", "Readers & Writers", "NIO"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "multithreading",
    title: "Multithreading & Concurrency",
    description: "Build concurrent applications with Java threads",
    level: "Advanced",
    duration: "8 hours",
    topics: [
      "Threads",
      "Synchronization",
      "Executors",
      "Concurrent Collections",
    ],
    image: "/placeholder.svg?height=200&width=400",
  },
];

const JavaTopics = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Explore Java Topics
            </h2>
            <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
              Browse our comprehensive collection of Java learning materials
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
          {topics.map((topic) => (
            <Card key={topic.id} className="overflow-hidden">
              {/* <div className="aspect-video w-full overflow-hidden">
                <img
                  src={topic.image || "/placeholder.svg"}
                  alt={topic.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div> */}
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Badge
                    variant={
                      topic.level === "Beginner"
                        ? "default"
                        : topic.level === "Intermediate"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {topic.level}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {topic.duration}
                  </div>
                </div>
                <CardTitle className="mt-2">{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {topic.topics.map((subtopic) => (
                    <Badge key={subtopic} variant="outline">
                      {subtopic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/topics/${topic.id}`}>
                    Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link to="/topics">View All Topics</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JavaTopics;
