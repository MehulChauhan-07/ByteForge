import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Search,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  Volume2,
  Download,
  ThumbsUp,
} from "lucide-react";

import { topics } from "@/data/topics"; // Import from the data file
import { javaBasicsContent } from "@/data/javaBasicsContent"; // Import Java basics content
import { codeExamples } from "@/data/codeExamples"; // Import code examples
import React from "react";

// Create a simple progress context if the real one doesn't exist yet
// Remove this if you already have a ProgressContext implemented

type Progress = {
  [topicId: string]: {
    subtopics: {
      [subtopicId: string]: boolean;
    };
  };
};

const useProgress = () => {
  const [progress, setProgress] = useState<Progress>({});

  const markSubtopicComplete = (topicId: string | number, subtopicId: any) => {
    setProgress((prev) => ({
      ...prev,
      [topicId]: {
        ...prev[topicId],
        subtopics: {
          ...(prev[topicId]?.subtopics || {}),
          [subtopicId]: true,
        },
      },
    }));
  };

  const getCompletionPercentage = (topicId: string) => {
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) return 0;

    const subtopicsInTopic = topic.topics.map((subtopic) =>
      subtopic.toLowerCase().replace(" & ", "-").replace(/\s+/g, "-")
    );

    const completedSubtopics = progress[topicId]?.subtopics || {};
    const completedCount = subtopicsInTopic.filter(
      (subtopicId) => completedSubtopics[subtopicId]
    ).length;

    return Math.round((completedCount / subtopicsInTopic.length) * 100) || 0;
  };

  return { progress, markSubtopicComplete, getCompletionPercentage };
};

// Simple placeholder components if they don't exist yet
interface MultiFormatContentProps {
  content: {
    text: string;
    videoUrl?: string;
    pdfUrl?: string;
  };
  title: string;
}

const MultiFormatContent = ({ content, title }: MultiFormatContentProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">{title}</h3>
      <div className="prose dark:prose-invert max-w-none">
        {content.text.split("\n\n").map((paragraph, idx) => (
          <p key={idx} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      {content.videoUrl && (
        <div className="mt-6">
          <h4 className="text-lg font-medium mb-2">Video Tutorial</h4>
          <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
            <Volume2 className="h-10 w-10 text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">
              Video tutorial would display here
            </span>
          </div>
        </div>
      )}

      {content.pdfUrl && (
        <div className="mt-6">
          <h4 className="text-lg font-medium mb-2">Documentation</h4>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      )}
    </div>
  );
};

interface CodePlaygroundProps {
  initialCode: string;
  height?: string;
}

const CodePlayground = ({ initialCode, height }: CodePlaygroundProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");

  const runCode = () => {
    setOutput("Code executed successfully!\n\nOutput:\nHello, ByteForge!");
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-slate-100 dark:bg-slate-800 p-2 border-b flex justify-between items-center">
        <h3 className="text-sm font-medium">Interactive Code Playground</h3>
        <Button size="sm" onClick={runCode}>
          Run Code
        </Button>
      </div>
      <div
        className="p-4 bg-slate-50 dark:bg-slate-900"
        style={{ minHeight: height || "200px" }}
      >
        <pre className="text-sm font-mono whitespace-pre-wrap">
          {initialCode}
        </pre>
      </div>
      {output && (
        <div className="p-4 bg-black text-green-400 font-mono text-sm">
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

const MemoryAllocationDiagram = ({ title }: { title: string }) => {
  return (
    <div className="border rounded-md p-4 bg-slate-50 dark:bg-slate-900">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="flex gap-4">
        <div className="flex-1 border rounded p-2">
          <h4 className="text-sm font-medium mb-2">Stack Memory</h4>
          <div className="border-t border-b py-1 px-2 mb-1 bg-blue-50 dark:bg-blue-900/20">
            int x = 10;
          </div>
          <div className="border-t border-b py-1 px-2 mb-1 bg-blue-50 dark:bg-blue-900/20">
            boolean isActive = true;
          </div>
        </div>
        <div className="flex-1 border rounded p-2">
          <h4 className="text-sm font-medium mb-2">Heap Memory</h4>
          <div className="border-t border-b py-1 px-2 mb-1 bg-green-50 dark:bg-green-900/20">
            String name = "Java";
          </div>
          <div className="border-t border-b py-1 px-2 mb-1 bg-green-50 dark:bg-green-900/20">
            Object[] items = new Object[3];
          </div>
        </div>
      </div>
    </div>
  );
};

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface TopicQuizProps {
  topicId: string;
  questions: Question[];
  onComplete: () => void;
}

const TopicQuiz = ({ questions, onComplete }: TopicQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  if (!questions || questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No quiz questions available for this topic.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={onComplete}>Return to Content</Button>
        </CardFooter>
      </Card>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-5xl font-bold mb-4">{percentage}%</div>
            <p className="text-lg">
              {score} out of {questions.length} correct
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onComplete} className="w-full">
            Complete and Return to Topic
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Quiz: Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-lg font-medium">{question.question}</div>
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`p-3 border rounded-md cursor-pointer ${
                  answers[currentQuestion] === index
                    ? "bg-slate-200 dark:bg-slate-700 border-blue-500"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
                onClick={() => handleAnswer(index)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={nextQuestion}
          className="w-full"
          disabled={answers[currentQuestion] === undefined}
        >
          {currentQuestion < questions.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Create mappings for each topic's content
const topicContent = {
  "java-basics": javaBasicsContent,
  // Add other topic content mappings here as you develop them
};

// Sample quiz questions for Java topics
const topicQuizQuestions = {
  "java-basics": {
    introduction: [
      {
        question: "Which company originally developed Java?",
        options: ["Microsoft", "Sun Microsystems", "Oracle", "IBM"],
        correctAnswer: 1,
        explanation:
          "Java was originally developed by Sun Microsystems (now owned by Oracle) in 1995.",
      },
      {
        question:
          "What is a key feature of Java that allows it to run on different platforms?",
        options: [
          "Platform independence",
          "Strong typing",
          "Automatic memory management",
          "Object-oriented design",
        ],
        correctAnswer: 0,
        explanation:
          "Java's platform independence, often referred to as 'Write Once, Run Anywhere', allows Java applications to run on any device with a Java Virtual Machine.",
      },
    ],
    variables: [
      {
        question: "Which of the following is a primitive data type in Java?",
        options: ["String", "Array", "int", "Class"],
        correctAnswer: 2,
        explanation:
          "In Java, 'int' is a primitive data type, while String, Array, and Class are reference types.",
      },
    ],
    // Add more subtopics and questions as needed
  },
};

const TopicsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [expandedSubtopics, setExpandedSubtopics] = useState<
    Record<string, boolean>
  >({});
  const [inDetailView, setInDetailView] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [codeOutput, setCodeOutput] = useState<string>("");

  // Use the progress hook directly here for simplicity
  // In a real app you'd want to move this to a context provider
  const { progress, markSubtopicComplete, getCompletionPercentage } =
    useProgress();

  // Handle sidebar topic expansion toggle

  // Handle card click
  const handleCardClick = (topicId: string) => {
    setSelectedTopic(topicId);
    setExpandedSubtopics({
      [topicId]: true,
    });
    setInDetailView(true);
    setShowQuiz(false);

    // For Java basics, default to the introduction subtopic
    if (topicId === "java-basics") {
      setSelectedSubtopic("introduction");
    } else {
      setSelectedSubtopic(null);
    }
  };

  // Handle subtopic selection
  const handleSubtopicClick = (topicId: string, subtopic: string) => {
    setSelectedTopic(topicId);
    setSelectedSubtopic(
      subtopic.toLowerCase().replace(" & ", "-").replace(/\s+/g, "-")
    );
    setShowQuiz(false);
  };

  // Return to the list view
  const handleBackClick = () => {
    setInDetailView(false);
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    setShowQuiz(false);
  };

  // Handle quiz completion
  const handleQuizComplete = () => {
    setShowQuiz(false);
    if (selectedTopic && selectedSubtopic) {
      markSubtopicComplete(selectedTopic, selectedSubtopic);
    }
  };

  // Check if subtopic is completed
  const isSubtopicCompleted = (topicId: string, subtopicId: string) => {
    return progress[topicId]?.subtopics[subtopicId] || false;
  };

  // Toggle quiz view
  const toggleQuiz = () => {
    setShowQuiz((prev) => !prev);
  };

  // Simple code execution simulation

  // Filter topics based on search and level
  const filteredTopics = topics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.topics.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesLevel = levelFilter ? topic.level === levelFilter : true;

    return matchesSearch && matchesLevel;
  });

  // Find the selected topic object
  const activeTopic = selectedTopic
    ? topics.find((topic) => topic.id === selectedTopic)
    : null;

  // Get the appropriate quiz questions for the selected subtopic
  const getQuizQuestions = () => {
    if (!selectedTopic || !selectedSubtopic) return [];

    const topicQuestions =
      topicQuizQuestions[selectedTopic as keyof typeof topicQuizQuestions];
    if (!topicQuestions) return [];

    return (
      topicQuestions[selectedSubtopic as keyof typeof topicQuestions] || []
    );
  };

  // Get content for the selected subtopic
  const getContentData = () => {
    if (!selectedTopic || !selectedSubtopic) return null;

    const content = topicContent[selectedTopic as keyof typeof topicContent];
    if (!content) return null;

    return content[selectedSubtopic as keyof typeof content] || null;
  };

  // Debug values
  console.log("Rendering TopicsPage", {
    selectedTopic,
    selectedSubtopic,
    inDetailView,
    showQuiz,
    contentData: getContentData(),
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

      {!inDetailView && (
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
      )}

      {inDetailView ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Back button */}
          <Button
            variant="outline"
            className="mb-4 lg:hidden"
            onClick={handleBackClick}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
          </Button>

          {/* Sidebar */}
          <div className="w-full lg:w-1/4 shrink-0">
            <Card className="sticky top-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{activeTopic?.title || "Topic"}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden lg:flex items-center"
                    onClick={handleBackClick}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                </div>
                <CardDescription>{activeTopic?.description}</CardDescription>
                {selectedTopic && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${getCompletionPercentage(selectedTopic)}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-muted-foreground">
                      {getCompletionPercentage(selectedTopic)}% complete
                    </p>
                  </div>
                )}
              </CardHeader>
              <CardContent className="pb-6">
                <nav className="space-y-2">
                  {activeTopic && (
                    <div className="space-y-1 mt-1">
                      {activeTopic.topics.map((subtopic) => {
                        const subtopicId = subtopic
                          .toLowerCase()
                          .replace(" & ", "-")
                          .replace(/\s+/g, "-");
                        const isCompleted = selectedTopic
                          ? isSubtopicCompleted(selectedTopic, subtopicId)
                          : false;

                        return (
                          <div
                            key={subtopic}
                            className={`py-2 px-3 rounded-md cursor-pointer flex justify-between items-center ${
                              selectedSubtopic === subtopicId
                                ? "bg-slate-200 dark:bg-slate-700 font-medium"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                            onClick={() =>
                              handleSubtopicClick(activeTopic.id, subtopic)
                            }
                          >
                            <span>{subtopic}</span>
                            {isCompleted && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content area */}
          <div className="flex-1">
            {selectedTopic &&
              selectedSubtopic &&
              !showQuiz &&
              getContentData() && (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{getContentData()?.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={toggleQuiz}
                        >
                          Take Quiz
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            markSubtopicComplete(
                              selectedTopic,
                              selectedSubtopic
                            )
                          }
                        >
                          Mark Complete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Multi-format content */}
                    <MultiFormatContent
                      content={{
                        text: getContentData()?.content || "",
                        // In a real implementation, you would add real URLs here
                        videoUrl:
                          selectedSubtopic === "introduction"
                            ? "https://www.youtube.com/embed/eIrMbAQSU34"
                            : undefined,
                        pdfUrl:
                          selectedSubtopic === "introduction"
                            ? "/cheatsheets/java-intro.pdf"
                            : undefined,
                      }}
                      title="Learn"
                    />

                    {/* Interactive diagram for variables topic */}
                    {selectedSubtopic === "variables" && (
                      <div className="mt-6">
                        <MemoryAllocationDiagram title="Memory Allocation Visualization" />
                      </div>
                    )}

                    {/* Interactive code playground */}
                    <div className="mt-6">
                      <CodePlayground
                        initialCode={
                          codeExamples[
                            selectedSubtopic as keyof typeof codeExamples
                          ] || codeExamples.introduction
                        }
                        height="250px"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between w-full">
                      <Button variant="outline" onClick={handleBackClick}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
                      </Button>
                      <Button asChild>
                        <Link to={`/topics/${selectedTopic}`}>
                          Full Course <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )}

            {/* Quiz view */}
            {selectedTopic && selectedSubtopic && showQuiz && (
              <TopicQuiz
                topicId={selectedTopic}
                questions={getQuizQuestions()}
                onComplete={handleQuizComplete}
              />
            )}
          </div>
        </div>
      ) : (
        // Topic cards grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => {
            const completionPercentage = getCompletionPercentage(topic.id);

            return (
              <Card
                key={topic.id}
                className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg"
                onClick={() => handleCardClick(topic.id)}
              >
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
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-muted-foreground">
                      {completionPercentage}% complete
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topic.topics.map((subtopic) => (
                      <Badge key={subtopic} variant="outline">
                        {subtopic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Explore Topic <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {!inDetailView && filteredTopics.length === 0 && (
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

// ! this is the  original navigation bar
// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Link } from "react-router-dom";
// import {
//   ArrowRight,
//   Clock,
//   Search,
//   ChevronDown,
//   ChevronRight,
//   ArrowLeft,
// } from "lucide-react";
// import { topics } from "@/data/topics"; // Import from the data file

// import { javaBasicsContent } from "@/data/javaBasicsContent"; // Import Java basics content

// // Sample code examples
// import { codeExamples } from "@/data/codeExamples"; // Import code examples

// const TopicsPage = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [levelFilter, setLevelFilter] = useState<string | null>(null);
//   const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
//   const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
//   const [inDetailView, setInDetailView] = useState(false);
//   const [codeOutput, setCodeOutput] = useState<string>("");

//   // Handle card click
//   const handleCardClick = (topicId: string) => {
//     setSelectedTopic(topicId);
//     setInDetailView(true);

//     // For Java basics, default to the introduction subtopic
//     if (topicId === "java-basics") {
//       setSelectedSubtopic("introduction");
//     } else {
//       setSelectedSubtopic(null);
//     }
//   };

//   // Handle subtopic selection
//   const handleSubtopicClick = (topicId: string, subtopic: string) => {
//     setSelectedTopic(topicId);
//     setSelectedSubtopic(
//       subtopic.toLowerCase().replace(" & ", "-").replace(/\s+/g, "-")
//     );
//   };

//   // Return to the list view
//   const handleBackClick = () => {
//     setInDetailView(false);
//     setSelectedTopic(null);
//     setSelectedSubtopic(null);
//   };

//   // Simple code execution simulation
//   const runCode = () => {
//     setCodeOutput("Code executed successfully!\n\nOutput:\nHello, ByteForge!");
//   };

//   const filteredTopics = topics.filter((topic) => {
//     const matchesSearch =
//       topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       topic.topics.some((t) =>
//         t.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//     const matchesLevel = levelFilter ? topic.level === levelFilter : true;

//     return matchesSearch && matchesLevel;
//   });

//   // Find the selected topic object
//   const activeTopic = selectedTopic
//     ? topics.find((topic) => topic.id === selectedTopic)
//     : null;

//   // Get the appropriate code example for the selected subtopic
//   const getCodeExample = () => {
//     if (!selectedSubtopic) return codeExamples.introduction;
//     return (
//       codeExamples[selectedSubtopic as keyof typeof codeExamples] ||
//       codeExamples.introduction
//     );
//   };

//   return (
//     <div className="container py-12">
//       <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
//         <div className="space-y-2">
//           <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//             Java Learning Topics
//           </h1>
//           <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
//             Browse our comprehensive collection of Java learning materials
//           </p>
//         </div>
//       </div>

//       {!inDetailView && (
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="relative flex-1">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search topics..."
//               className="pl-8"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant={levelFilter === null ? "default" : "outline"}
//               onClick={() => setLevelFilter(null)}
//             >
//               All
//             </Button>
//             <Button
//               variant={levelFilter === "Beginner" ? "default" : "outline"}
//               onClick={() => setLevelFilter("Beginner")}
//             >
//               Beginner
//             </Button>
//             <Button
//               variant={levelFilter === "Intermediate" ? "default" : "outline"}
//               onClick={() => setLevelFilter("Intermediate")}
//             >
//               Intermediate
//             </Button>
//             <Button
//               variant={levelFilter === "Advanced" ? "default" : "outline"}
//               onClick={() => setLevelFilter("Advanced")}
//             >
//               Advanced
//             </Button>
//           </div>
//         </div>
//       )}

//       {inDetailView ? (
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Back button for mobile */}
//           <Button
//             variant="outline"
//             className="mb-4 lg:hidden"
//             onClick={handleBackClick}
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
//           </Button>

//           {/* Sidebar */}
//           <div className="w-full lg:w-1/4 shrink-0">
//             <Card className="sticky top-4">
//               <CardHeader className="pb-2">
//                 <div className="flex justify-between items-center">
//                   <CardTitle>{activeTopic?.title || "Topic"}</CardTitle>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="hidden lg:flex items-center"
//                     onClick={handleBackClick}
//                   >
//                     <ArrowLeft className="mr-2 h-4 w-4" /> Back
//                   </Button>
//                 </div>
//                 <CardDescription>{activeTopic?.description}</CardDescription>
//               </CardHeader>
//               <CardContent className="pb-6">
//                 <nav className="space-y-2">
//                   {activeTopic && (
//                     <div className="space-y-1 mt-1">
//                       {activeTopic.topics.map((subtopic) => (
//                         <div
//                           key={subtopic}
//                           className={`py-2 px-3 rounded-md cursor-pointer ${
//                             selectedSubtopic ===
//                             subtopic
//                               .toLowerCase()
//                               .replace(" & ", "-")
//                               .replace(/\s+/g, "-")
//                               ? "bg-slate-200 dark:bg-slate-700 font-medium"
//                               : "hover:bg-slate-100 dark:hover:bg-slate-800"
//                           }`}
//                           onClick={() =>
//                             handleSubtopicClick(activeTopic.id, subtopic)
//                           }
//                         >
//                           {subtopic}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </nav>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Content area */}
//           <div className="flex-1">
//             {selectedTopic === "java-basics" &&
//               selectedSubtopic &&
//               javaBasicsContent[
//                 selectedSubtopic as keyof typeof javaBasicsContent
//               ] && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>
//                       {
//                         javaBasicsContent[
//                           selectedSubtopic as keyof typeof javaBasicsContent
//                         ].title
//                       }
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="prose dark:prose-invert max-w-none">
//                       {javaBasicsContent[
//                         selectedSubtopic as keyof typeof javaBasicsContent
//                       ].content
//                         .split("\n\n")
//                         .map((paragraph, idx) => (
//                           <p key={idx} className="whitespace-pre-line">
//                             {paragraph}
//                           </p>
//                         ))}
//                     </div>

//                     {/* Simple Interactive Code Playground */}
//                     <div className="mt-6 border rounded-md overflow-hidden">
//                       <div className="bg-slate-100 dark:bg-slate-800 p-2 border-b flex justify-between items-center">
//                         <h3 className="text-sm font-medium">
//                           Interactive Code Playground
//                         </h3>
//                         <Button size="sm" onClick={runCode}>
//                           Run Code
//                         </Button>
//                       </div>
//                       <div className="p-4 bg-slate-50 dark:bg-slate-900">
//                         <pre className="text-sm font-mono whitespace-pre-wrap">
//                           {getCodeExample()}
//                         </pre>
//                       </div>
//                       {codeOutput && (
//                         <div className="p-4 bg-black text-green-400 font-mono text-sm">
//                           <pre>{codeOutput}</pre>
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                   <CardFooter>
//                     <div className="flex justify-between w-full">
//                       <Button variant="outline" onClick={handleBackClick}>
//                         <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
//                       </Button>
//                       <Button asChild>
//                         <Link to={`/topics/${selectedTopic}`}>
//                           Full Course <ArrowRight className="ml-2 h-4 w-4" />
//                         </Link>
//                       </Button>
//                     </div>
//                   </CardFooter>
//                 </Card>
//               )}
//           </div>
//         </div>
//       ) : (
//         // Topic cards grid
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTopics.map((topic) => (
//             <Card
//               key={topic.id}
//               className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg"
//               onClick={() => handleCardClick(topic.id)}
//             >
//               <CardHeader className="pb-2">
//                 <div className="flex justify-between items-center">
//                   <Badge
//                     variant={
//                       topic.level === "Beginner"
//                         ? "default"
//                         : topic.level === "Intermediate"
//                         ? "secondary"
//                         : "outline"
//                     }
//                   >
//                     {topic.level}
//                   </Badge>
//                   <div className="flex items-center text-sm text-muted-foreground">
//                     <Clock className="mr-1 h-3 w-3" />
//                     {topic.duration}
//                   </div>
//                 </div>
//                 <CardTitle className="mt-2">{topic.title}</CardTitle>
//                 <CardDescription>{topic.description}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-wrap gap-2">
//                   {topic.topics.map((subtopic) => (
//                     <Badge key={subtopic} variant="outline">
//                       {subtopic}
//                     </Badge>
//                   ))}
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Button className="w-full">
//                   Explore Topic <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}

//       {!inDetailView && filteredTopics.length === 0 && (
//         <div className="text-center py-12">
//           <h3 className="text-xl font-medium mb-2">No topics found</h3>
//           <p className="text-muted-foreground">
//             Try adjusting your search or filters
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TopicsPage;

// ! 3nd code
// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Link } from "react-router-dom";
// import {
//   ArrowRight,
//   Clock,
//   Search,
//   ChevronDown,
//   ChevronRight,
//   ArrowLeft,
//   CheckCircle,
//   Volume2,
//   Download,
//   ThumbsUp,
// } from "lucide-react";

// import { topics } from "@/data/topics"; // Import from the data file
// import { javaBasicsContent } from "@/data/javaBasicsContent"; // Import Java basics content
// import { codeExamples } from "@/data/codeExamples"; // Import code examples
// import { useProgress } from "@/context/ProgressContex"; // Import progress context
// import CodePlayground from "@/components/features/code/CodePlayground";
// import MultiFormatContent from "@/components/MultiFormatContent";
// import MemoryAllocationDiagram from "@/components/diagrams/MemoryAllocationDiagram";
// import TopicQuiz from "@/components/features/quiz/TopicQuiz";

// // Create mappings for each topic's content
// const topicContent = {
//   "java-basics": javaBasicsContent,
//   // Add other topic content mappings here as you develop them
// };

// // Sample quiz questions for Java topics
// const topicQuizQuestions = {
//   "java-basics": {
//     introduction: [
//       {
//         question: "Which company originally developed Java?",
//         options: ["Microsoft", "Sun Microsystems", "Oracle", "IBM"],
//         correctAnswer: 1,
//         explanation:
//           "Java was originally developed by Sun Microsystems (now owned by Oracle) in 1995.",
//       },
//       {
//         question:
//           "What is a key feature of Java that allows it to run on different platforms?",
//         options: [
//           "Platform independence",
//           "Strong typing",
//           "Automatic memory management",
//           "Object-oriented design",
//         ],
//         correctAnswer: 0,
//         explanation:
//           "Java's platform independence, often referred to as 'Write Once, Run Anywhere', allows Java applications to run on any device with a Java Virtual Machine.",
//       },
//     ],
//     variables: [
//       {
//         question: "Which of the following is a primitive data type in Java?",
//         options: ["String", "Array", "int", "Class"],
//         correctAnswer: 2,
//         explanation:
//           "In Java, 'int' is a primitive data type, while String, Array, and Class are reference types.",
//       },
//       {
//         question: "What is the default value of an int variable in Java?",
//         options: ["0", "null", "undefined", "1"],
//         correctAnswer: 0,
//         explanation: "The default value for an int variable in Java is 0.",
//       },
//     ],
//     operators: [
//       {
//         question: "What does the '%' operator do in Java?",
//         options: [
//           "Performs division",
//           "Returns the remainder of division",
//           "Calculates percentage",
//           "Performs multiplication",
//         ],
//         correctAnswer: 1,
//         explanation:
//           "The '%' (modulus) operator returns the remainder of a division operation.",
//       },
//     ],
//     controlFlow: [
//       {
//         question: "Which of the following is NOT a loop structure in Java?",
//         options: ["for", "while", "do-while", "repeat-until"],
//         correctAnswer: 3,
//         explanation:
//           "Java has for, while, and do-while loops, but does not have a repeat-until loop structure.",
//       },
//     ],
//     arrays: [
//       {
//         question: "How do you declare an array of integers in Java?",
//         options: [
//           "int numbers[];",
//           "int[] numbers;",
//           "Both A and B are correct",
//           "array int[] numbers;",
//         ],
//         correctAnswer: 2,
//         explanation:
//           "In Java, you can declare an array using either 'int numbers[]' or 'int[] numbers' syntax.",
//       },
//     ],
//   },
//   // Add quiz questions for other topics as you develop them
// };

// const TopicsPage = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [levelFilter, setLevelFilter] = useState<string | null>(null);
//   const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
//   const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
//   const [expandedSubtopics, setExpandedSubtopics] = useState<
//     Record<string, boolean>
//   >({});
//   const [inDetailView, setInDetailView] = useState(false);
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [codeOutput, setCodeOutput] = useState<string>("");
//   const { progress, markSubtopicComplete, getCompletionPercentage } =
//     useProgress();

//   // Handle sidebar topic expansion toggle
//   const toggleExpand = (topicId: string) => {
//     setExpandedSubtopics((prev) => ({
//       ...prev,
//       [topicId]: !prev[topicId],
//     }));
//   };

//   // Handle card click
//   const handleCardClick = (topicId: string) => {
//     setSelectedTopic(topicId);
//     setExpandedSubtopics({
//       [topicId]: true,
//     });
//     setInDetailView(true);
//     setShowQuiz(false);

//     // For Java basics, default to the introduction subtopic
//     if (topicId === "java-basics") {
//       setSelectedSubtopic("introduction");
//     } else {
//       setSelectedSubtopic(null);
//     }
//   };

//   // Handle subtopic selection
//   const handleSubtopicClick = (topicId: string, subtopic: string) => {
//     setSelectedTopic(topicId);
//     setSelectedSubtopic(
//       subtopic.toLowerCase().replace(" & ", "-").replace(/\s+/g, "-")
//     );
//     setShowQuiz(false);
//   };

//   // Return to the list view
//   const handleBackClick = () => {
//     setInDetailView(false);
//     setSelectedTopic(null);
//     setSelectedSubtopic(null);
//     setShowQuiz(false);
//   };

//   // Handle quiz completion
//   const handleQuizComplete = () => {
//     setShowQuiz(false);
//     if (selectedTopic && selectedSubtopic) {
//       markSubtopicComplete(selectedTopic, selectedSubtopic);
//     }
//   };

//   // Check if subtopic is completed
//   const isSubtopicCompleted = (topicId: string, subtopicId: string) => {
//     return progress[topicId]?.subtopics[subtopicId] || false;
//   };

//   // Toggle quiz view
//   const toggleQuiz = () => {
//     setShowQuiz((prev) => !prev);
//   };

//   // Simple code execution simulation
//   const runCode = (code: string) => {
//     setCodeOutput("Code executed successfully!\n\nOutput:\nHello, ByteForge!");
//   };

//   // Filter topics based on search and level
//   const filteredTopics = topics.filter((topic) => {
//     const matchesSearch =
//       topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       topic.topics.some((t) =>
//         t.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//     const matchesLevel = levelFilter ? topic.level === levelFilter : true;

//     return matchesSearch && matchesLevel;
//   });

//   // Find the selected topic object
//   const activeTopic = selectedTopic
//     ? topics.find((topic) => topic.id === selectedTopic)
//     : null;

//   // Get the appropriate quiz questions for the selected subtopic
//   const getQuizQuestions = () => {
//     if (!selectedTopic || !selectedSubtopic) return [];

//     const topicQuestions =
//       topicQuizQuestions[selectedTopic as keyof typeof topicQuizQuestions];
//     if (!topicQuestions) return [];

//     return (
//       topicQuestions[selectedSubtopic as keyof typeof topicQuestions] || []
//     );
//   };

//   // Get content for the selected subtopic
//   const getContentData = () => {
//     if (!selectedTopic || !selectedSubtopic) return null;

//     const content = topicContent[selectedTopic as keyof typeof topicContent];
//     if (!content) return null;

//     return content[selectedSubtopic as keyof typeof content] || null;
//   };

//   return (
//     <div className="container py-12">
//       <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
//         <div className="space-y-2">
//           <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//             Java Learning Topics
//           </h1>
//           <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
//             Browse our comprehensive collection of Java learning materials
//           </p>
//         </div>
//       </div>

//       {!inDetailView && (
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="relative flex-1">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search topics..."
//               className="pl-8"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant={levelFilter === null ? "default" : "outline"}
//               onClick={() => setLevelFilter(null)}
//             >
//               All
//             </Button>
//             <Button
//               variant={levelFilter === "Beginner" ? "default" : "outline"}
//               onClick={() => setLevelFilter("Beginner")}
//             >
//               Beginner
//             </Button>
//             <Button
//               variant={levelFilter === "Intermediate" ? "default" : "outline"}
//               onClick={() => setLevelFilter("Intermediate")}
//             >
//               Intermediate
//             </Button>
//             <Button
//               variant={levelFilter === "Advanced" ? "default" : "outline"}
//               onClick={() => setLevelFilter("Advanced")}
//             >
//               Advanced
//             </Button>
//           </div>
//         </div>
//       )}

//       {inDetailView ? (
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Back button */}
//           <Button
//             variant="outline"
//             className="mb-4 lg:hidden"
//             onClick={handleBackClick}
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
//           </Button>

//           {/* Sidebar */}
//           <div className="w-full lg:w-1/4 shrink-0">
//             <Card className="sticky top-4">
//               <CardHeader className="pb-2">
//                 <div className="flex justify-between items-center">
//                   <CardTitle>{activeTopic?.title || "Topic"}</CardTitle>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="hidden lg:flex items-center"
//                     onClick={handleBackClick}
//                   >
//                     <ArrowLeft className="mr-2 h-4 w-4" /> Back
//                   </Button>
//                 </div>
//                 <CardDescription>{activeTopic?.description}</CardDescription>
//                 {selectedTopic && (
//                   <div className="mt-2">
//                     <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
//                       <div
//                         className="bg-blue-600 h-2 rounded-full"
//                         style={{
//                           width: `${getCompletionPercentage(selectedTopic)}%`,
//                         }}
//                       ></div>
//                     </div>
//                     <p className="text-xs text-right mt-1 text-muted-foreground">
//                       {getCompletionPercentage(selectedTopic)}% complete
//                     </p>
//                   </div>
//                 )}
//               </CardHeader>
//               <CardContent className="pb-6">
//                 <nav className="space-y-2">
//                   {activeTopic && (
//                     <div className="space-y-1 mt-1">
//                       {activeTopic.topics.map((subtopic) => {
//                         const subtopicId = subtopic
//                           .toLowerCase()
//                           .replace(" & ", "-")
//                           .replace(/\s+/g, "-");
//                         const isCompleted = selectedTopic
//                           ? isSubtopicCompleted(selectedTopic, subtopicId)
//                           : false;

//                         return (
//                           <div
//                             key={subtopic}
//                             className={`py-2 px-3 rounded-md cursor-pointer flex justify-between items-center ${
//                               selectedSubtopic === subtopicId
//                                 ? "bg-slate-200 dark:bg-slate-700 font-medium"
//                                 : "hover:bg-slate-100 dark:hover:bg-slate-800"
//                             }`}
//                             onClick={() =>
//                               handleSubtopicClick(activeTopic.id, subtopic)
//                             }
//                           >
//                             <span>{subtopic}</span>
//                             {isCompleted && (
//                               <CheckCircle className="h-4 w-4 text-green-500" />
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </nav>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Content area */}
//           <div className="flex-1">
//             {selectedTopic &&
//               selectedSubtopic &&
//               !showQuiz &&
//               getContentData() && (
//                 <Card>
//                   <CardHeader>
//                     <div className="flex justify-between items-center">
//                       <CardTitle>{getContentData()?.title}</CardTitle>
//                       <div className="flex items-center gap-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={toggleQuiz}
//                         >
//                           Take Quiz
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() =>
//                             markSubtopicComplete(
//                               selectedTopic,
//                               selectedSubtopic
//                             )
//                           }
//                         >
//                           Mark Complete
//                         </Button>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     {/* Multi-format content */}
//                     <MultiFormatContent
//                       content={{
//                         text: getContentData()?.content || "",
//                         // In a real implementation, you would add real URLs here
//                         videoUrl:
//                           selectedSubtopic === "introduction"
//                             ? "https://www.youtube.com/embed/eIrMbAQSU34"
//                             : undefined,
//                         pdfUrl:
//                           selectedSubtopic === "introduction"
//                             ? "/cheatsheets/java-intro.pdf"
//                             : undefined,
//                       }}
//                       title="Learn"
//                     />

//                     {/* Interactive diagram for variables topic */}
//                     {selectedSubtopic === "variables" && (
//                       <div className="mt-6">
//                         <MemoryAllocationDiagram title="Memory Allocation Visualization" />
//                       </div>
//                     )}

//                     {/* Interactive code playground */}
//                     <div className="mt-6">
//                       <CodePlayground
//                         initialCode={
//                           codeExamples[
//                             selectedSubtopic as keyof typeof codeExamples
//                           ] || codeExamples.introduction
//                         }
//                         height="250px"
//                       />
//                     </div>

//                   </CardContent>
//                   <CardFooter>
//                     <div className="flex justify-between w-full">
//                       <Button variant="outline" onClick={handleBackClick}>
//                         <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
//                       </Button>
//                       <Button asChild>
//                         <Link to={`/topics/${selectedTopic}`}>
//                           Full Course <ArrowRight className="ml-2 h-4 w-4" />
//                         </Link>
//                       </Button>
//                     </div>
//                   </CardFooter>
//                 </Card>
//               )}

//             {/* Quiz view */}
//             {selectedTopic && selectedSubtopic && showQuiz && (
//               <TopicQuiz
//                 topicId={selectedTopic}
//                 questions={getQuizQuestions()}
//                 onComplete={handleQuizComplete}
//               />
//             )}
//           </div>
//         </div>
//       ) : (
//         // Topic cards grid
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTopics.map((topic) => {
//             const completionPercentage = getCompletionPercentage(topic.id);

//             return (
//               <Card
//                 key={topic.id}
//                 className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg"
//                 onClick={() => handleCardClick(topic.id)}
//               >
//                 <CardHeader className="pb-2">
//                   <div className="flex justify-between items-center">
//                     <Badge
//                       variant={
//                         topic.level === "Beginner"
//                           ? "default"
//                           : topic.level === "Intermediate"
//                           ? "secondary"
//                           : "outline"
//                       }
//                     >
//                       {topic.level}
//                     </Badge>
//                     <div className="flex items-center text-sm text-muted-foreground">
//                       <Clock className="mr-1 h-3 w-3" />
//                       {topic.duration}
//                     </div>
//                   </div>
//                   <CardTitle className="mt-2">{topic.title}</CardTitle>
//                   <CardDescription>{topic.description}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="mb-4">
//                     <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
//                       <div
//                         className="bg-blue-600 h-2 rounded-full"
//                         style={{ width: `${completionPercentage}%` }}
//                       ></div>
//                     </div>
//                     <p className="text-xs text-right mt-1 text-muted-foreground">
//                       {completionPercentage}% complete
//                     </p>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {topic.topics.map((subtopic) => (
//                       <Badge key={subtopic} variant="outline">
//                         {subtopic}
//                       </Badge>
//                     ))}
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button className="w-full">
//                     Explore Topic <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </CardFooter>
//               </Card>
//             );
//           })}
//         </div>
//       )}

//       {!inDetailView && filteredTopics.length === 0 && (
//         <div className="text-center py-12">
//           <h3 className="text-xl font-medium mb-2">No topics found</h3>
//           <p className="text-muted-foreground">
//             Try adjusting your search or filters
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TopicsPage;
