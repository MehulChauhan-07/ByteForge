import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import { useUser } from "@/contexts/UserContext";
import {
  ChevronRight,
  BookOpen,
  CheckCircle,
  Circle,
  FileText,
  Code,
} from "lucide-react";
import FeatureGuard from "@/components/FeatureGuard";

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: number; // in minutes
  isCompleted?: boolean;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  imageUrl: string;
}

const TopicDetailPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuthenticated } = useUser();

  useEffect(() => {
    // Simulate API call to fetch topic details
    setTimeout(() => {
      // Mock data for a Java topic
      const mockTopic: Topic = {
        id: topicId || "java-basics",
        title: "Java Basics",
        description:
          "Learn the fundamentals of Java programming, including syntax, variables, and control structures.",
        imageUrl: "/placeholder-topic.jpg",
        lessons: [
          {
            id: "lesson-1",
            title: "Introduction to Java",
            description:
              "Overview of Java programming language and its features",
            content: `
# Introduction to Java

Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.

## Key Features

- **Platform Independent**: Write once, run anywhere (WORA)
- **Object-Oriented**: Based on the concept of objects
- **Robust and Secure**: Strong memory management and runtime checking
- **Multithreaded**: Supports concurrent programming

## Hello World Program

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

This simple program displays "Hello, World!" on the screen.
            `,
            duration: 15,
            isCompleted: true,
          },
          {
            id: "lesson-2",
            title: "Variables and Data Types",
            description:
              "Understanding different data types and how to use variables in Java",
            content: `
# Variables and Data Types in Java

In Java, variables are containers for storing data values.

## Primitive Data Types

Java has eight primitive data types:

- **byte**: 8-bit integer (-128 to 127)
- **short**: 16-bit integer (-32,768 to 32,767)
- **int**: 32-bit integer (-2^31 to 2^31-1)
- **long**: 64-bit integer (-2^63 to 2^63-1)
- **float**: Single-precision 32-bit floating point
- **double**: Double-precision 64-bit floating point
- **boolean**: true or false
- **char**: Single 16-bit Unicode character

## Variable Declaration

\`\`\`java
// Declaration
int number;

// Declaration with initialization
int count = 10;
double price = 19.99;
boolean isActive = true;
char grade = 'A';
String name = "John"; // String is not a primitive type
\`\`\`
            `,
            duration: 20,
            isCompleted: true,
          },
          {
            id: "lesson-3",
            title: "Control Flow Statements",
            description: "Learn about conditional statements and loops in Java",
            content: `
# Control Flow Statements in Java

Control flow statements allow you to control the flow of your program's execution based on conditions.

## Conditional Statements

### If-Else Statement

\`\`\`java
int score = 85;

if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B");
} else if (score >= 70) {
    System.out.println("Grade: C");
} else {
    System.out.println("Grade: F");
}
\`\`\`

### Switch Statement

\`\`\`java
int day = 4;
String dayName;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    case 7:
        dayName = "Sunday";
        break;
    default:
        dayName = "Invalid day";
}
\`\`\`

## Loops

### For Loop

\`\`\`java
for (int i = 0; i < 5; i++) {
    System.out.println("Count: " + i);
}
\`\`\`

### While Loop

\`\`\`java
int i = 0;
while (i < 5) {
    System.out.println("Count: " + i);
    i++;
}
\`\`\`

### Do-While Loop

\`\`\`java
int i = 0;
do {
    System.out.println("Count: " + i);
    i++;
} while (i < 5);
\`\`\`
            `,
            duration: 25,
            isCompleted: false,
          },
          {
            id: "lesson-4",
            title: "Arrays in Java",
            description: "Working with arrays and collections",
            content: `
# Arrays in Java

An array is a container object that holds a fixed number of values of a single type.

## Array Declaration

\`\`\`java
// Declaration
int[] numbers;

// Declaration with initialization
int[] scores = {95, 85, 75, 90, 88};

// Alternative syntax
int scores[] = {95, 85, 75, 90, 88};

// Create array of specific size
int[] counts = new int[5]; // Creates array of 5 integers initialized to 0
\`\`\`

## Accessing Array Elements

Array indices start at 0.

\`\`\`java
int[] scores = {95, 85, 75, 90, 88};

// Access first element
int firstScore = scores[0]; // 95

// Access third element
int thirdScore = scores[2]; // 75

// Modify an element
scores[1] = 92; // Changes 85 to 92
\`\`\`

## Array Length

\`\`\`java
int[] scores = {95, 85, 75, 90, 88};
int length = scores.length; // 5
\`\`\`

## Iterating Through Arrays

\`\`\`java
// Using for loop
for (int i = 0; i < scores.length; i++) {
    System.out.println("Score " + i + ": " + scores[i]);
}

// Using enhanced for loop (for-each)
for (int score : scores) {
    System.out.println("Score: " + score);
}
\`\`\`
            `,
            duration: 20,
            isCompleted: false,
          },
        ],
      };

      setTopic(mockTopic);
      setSelectedLesson(mockTopic.lessons[0]);
      setLoading(false);
    }, 1000);
  }, [topicId]);

  const markLessonComplete = (lessonId: string) => {
    if (!isAuthenticated) return;

    setTopic((prevTopic) => {
      if (!prevTopic) return null;

      return {
        ...prevTopic,
        lessons: prevTopic.lessons.map((lesson) => {
          if (lesson.id === lessonId) {
            return { ...lesson, isCompleted: true };
          }
          return lesson;
        }),
      };
    });
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    // Scroll to top when switching lessons
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-12 px-4">
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </>
    );
  }

  if (!topic) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Topic Not Found
            </h2>
            <p className="mb-4">The requested topic could not be found.</p>
            <Link to="/topics">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded">
                Back to Topics
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/topics" className="hover:text-foreground">
            Topics
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{topic.title}</span>
        </div>

        {/* Topic Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
          <p className="text-muted-foreground">{topic.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Lesson List */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg overflow-hidden sticky top-20">
              <div className="bg-muted p-4 border-b">
                <h2 className="font-semibold">Lessons</h2>
              </div>
              <ul className="divide-y">
                {topic.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <button
                      className={`w-full text-left p-4 flex items-start gap-3 hover:bg-muted ${
                        selectedLesson?.id === lesson.id ? "bg-muted" : ""
                      }`}
                      onClick={() => handleLessonSelect(lesson)}
                    >
                      <div className="mt-1 flex-shrink-0">
                        {isAuthenticated && lesson.isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {lesson.duration} min
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content - Lesson */}
          <div className="lg:col-span-3">
            {selectedLesson && (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-4 border-b">
                  <h2 className="text-xl font-semibold">
                    {selectedLesson.title}
                  </h2>
                </div>
                <div className="p-6">
                  {/* Render lesson content as markdown */}
                  <div className="prose max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedLesson.content
                          .replace(/# (.*)/g, "<h1>$1</h1>")
                          .replace(/## (.*)/g, "<h2>$1</h2>")
                          .replace(/### (.*)/g, "<h3>$1</h3>")
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(
                            /```java\n([\s\S]*?)```/g,
                            '<pre><code class="language-java">$1</code></pre>'
                          )
                          .replace(
                            /```\n([\s\S]*?)```/g,
                            "<pre><code>$1</code></pre>"
                          )
                          .replace(/\n\n/g, "<br><br>"),
                      }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-wrap items-center gap-4 pt-6 border-t">
                    <FeatureGuard
                      featureName="Progress Tracking"
                      fallback={
                        <div className="text-sm text-muted-foreground">
                          <Link
                            to="/login"
                            className="text-primary hover:underline"
                          >
                            Login
                          </Link>{" "}
                          to track your progress
                        </div>
                      }
                    >
                      <button
                        className={`px-4 py-2 rounded-md ${
                          selectedLesson.isCompleted
                            ? "bg-green-100 text-green-800"
                            : "bg-primary text-primary-foreground"
                        }`}
                        onClick={() => markLessonComplete(selectedLesson.id)}
                        disabled={selectedLesson.isCompleted}
                      >
                        {selectedLesson.isCompleted ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            Completed
                          </span>
                        ) : (
                          "Mark as Complete"
                        )}
                      </button>
                    </FeatureGuard>

                    <Link to="/playground">
                      <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted">
                        <Code className="h-4 w-4" />
                        Practice in Playground
                      </button>
                    </Link>

                    <FeatureGuard featureName="Notes" fallback={null}>
                      <Link to="/notes">
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted">
                          <FileText className="h-4 w-4" />
                          Take Notes
                        </button>
                      </Link>
                    </FeatureGuard>
                  </div>

                  {/* Lesson Navigation */}
                  <div className="mt-8 flex justify-between">
                    {topic.lessons.findIndex(
                      (l) => l.id === selectedLesson.id
                    ) > 0 ? (
                      <button
                        className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-muted"
                        onClick={() => {
                          const currentIndex = topic.lessons.findIndex(
                            (l) => l.id === selectedLesson.id
                          );
                          if (currentIndex > 0) {
                            handleLessonSelect(topic.lessons[currentIndex - 1]);
                          }
                        }}
                      >
                        <ChevronRight className="h-4 w-4 rotate-180" />
                        Previous
                      </button>
                    ) : (
                      <div /> // Empty div to maintain flex spacing
                    )}

                    {topic.lessons.findIndex(
                      (l) => l.id === selectedLesson.id
                    ) <
                    topic.lessons.length - 1 ? (
                      <button
                        className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-muted"
                        onClick={() => {
                          const currentIndex = topic.lessons.findIndex(
                            (l) => l.id === selectedLesson.id
                          );
                          if (currentIndex < topic.lessons.length - 1) {
                            handleLessonSelect(topic.lessons[currentIndex + 1]);
                          }
                        }}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <div /> // Empty div to maintain flex spacing
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicDetailPage;
