"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Search } from "lucide-react";
import type { Topic } from "@/types";

const allTopics: Topic[] = [
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
  {
    id: "java-collections",
    title: "Java Collections Framework",
    description: "Explore Java's built-in data structures",
    level: "Intermediate",
    duration: "5 hours",
    topics: ["Lists", "Sets", "Maps", "Queues"],
    image: "/placeholder.svg?height=200&width=400",
  },
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
  {
    id: "java-generics",
    title: "Java Generics",
    description: "Understand and use generic types in Java",
    level: "Intermediate",
    duration: "3 hours",
    topics: ["Generic Classes", "Generic Methods", "Wildcards", "Type Erasure"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "java-lambdas",
    title: "Lambda Expressions & Streams",
    description: "Modern Java functional programming features",
    level: "Intermediate",
    duration: "5 hours",
    topics: [
      "Lambda Syntax",
      "Functional Interfaces",
      "Stream API",
      "Collectors",
    ],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "design-patterns",
    title: "Design Patterns in Java",
    description: "Implement common design patterns using Java",
    level: "Advanced",
    duration: "10 hours",
    topics: [
      "Creational Patterns",
      "Structural Patterns",
      "Behavioral Patterns",
      "Anti-patterns",
    ],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "spring-boot",
    title: "Spring Boot Fundamentals",
    description: "Build web applications with Spring Boot",
    level: "Advanced",
    duration: "12 hours",
    topics: ["Spring Core", "Spring MVC", "Spring Data", "RESTful APIs"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "java-testing",
    title: "Testing in Java",
    description: "Learn how to test Java applications effectively",
    level: "Intermediate",
    duration: "6 hours",
    topics: [
      "JUnit",
      "Mockito",
      "Test-Driven Development",
      "Integration Testing",
    ],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "java-data-structures",
    title: "Data Structures in Java",
    description: "Implement and use common data structures",
    level: "Intermediate",
    duration: "7 hours",
    topics: ["Linked Lists", "Trees", "Graphs", "Hash Tables"],
    image: "/placeholder.svg?height=200&width=400",
  },
];

const TopicsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>(null);

  const filteredTopics = allTopics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.topics.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesLevel = levelFilter ? topic.level === levelFilter : true;

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Java Learning Topics
          </h1>
          <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
            Browse our comprehensive collection of Java learning materials
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search topics..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={levelFilter === null ? "default" : "outline"}
            onClick={() => setLevelFilter(null)}
          >
            All
          </Button>
          <Button
            variant={levelFilter === "Beginner" ? "default" : "outline"}
            onClick={() => setLevelFilter("Beginner")}
          >
            Beginner
          </Button>
          <Button
            variant={levelFilter === "Intermediate" ? "default" : "outline"}
            onClick={() => setLevelFilter("Intermediate")}
          >
            Intermediate
          </Button>
          <Button
            variant={levelFilter === "Advanced" ? "default" : "outline"}
            onClick={() => setLevelFilter("Advanced")}
          >
            Advanced
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => (
          <Card key={topic.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={topic.image || "/placeholder.svg"}
                alt={topic.title}
                className="object-cover w-full h-full transition-transform hover:scale-105"
              />
            </div>
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

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No topics found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default TopicsPage;
