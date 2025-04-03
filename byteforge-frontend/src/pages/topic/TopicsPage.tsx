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
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  BookOpen,
  Code,
  Sparkles,
  BarChart,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useProgress } from "@/context/ProgressContex";

import { topics } from "@/data/topics";
import { javaBasicsContent } from "@/data/javaBasicsContent";
import { codeExamples } from "@/data/codeExamples";
import type { Topic } from "@/types";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0 },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

// Simple placeholder components if they don't exist yet
interface MultiFormatContentProps {
  content: {
    title: string;
    content: string;
  };
  title: string;
}

const MultiFormatContent = ({ content, title }: MultiFormatContentProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">{title}</h3>
      <div className="prose dark:prose-invert max-w-none">
        {content.content.split("\n\n").map((paragraph, idx) => (
          <p key={idx} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
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
        <pre className="text-sm font-mono whitespace-pre-wrap">{code}</pre>
      </div>
      {output && (
        <div className="p-4 bg-black text-green-400 font-mono text-sm">
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

interface TopicCardProps {
  topic: Topic;
  onClick: () => void;
  progress: number;
}

const TopicCard = ({ topic, onClick, progress }: TopicCardProps) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300 cursor-pointer",
          "hover:shadow-lg dark:hover:shadow-slate-800/50"
        )}
        onClick={onClick}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="p-2 rounded-full bg-primary/10"
              >
                <BookOpen className="h-5 w-5 text-primary" />
              </motion.div>
              <CardTitle className="text-xl">{topic.title}</CardTitle>
            </div>
            <Badge variant="outline" className="border-primary/20 text-primary">
              {topic.level}
            </Badge>
          </div>
          <CardDescription>{topic.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Progress
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <Clock className="h-4 w-4" />
            <span>{topic.duration}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto group/button p-0 h-auto hover:bg-transparent"
          >
            <span className="inline-flex items-center gap-1 text-sm font-medium">
              Start learning
              <motion.span
                className="inline-block transition-transform group-hover/button:translate-x-1"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

interface SubtopicItemProps {
  subtopic: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const SubtopicItem = ({
  subtopic,
  isActive,
  isCompleted,
  onClick,
}: SubtopicItemProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "flex items-center justify-between w-full py-2 px-3 rounded-md text-left",
        "hover:bg-slate-100 dark:hover:bg-slate-800",
        "transition-colors duration-200",
        isActive && "bg-slate-100 dark:bg-slate-800"
      )}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-2">
        {isCompleted ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <div className="h-4 w-4 rounded-full border border-slate-300 dark:border-slate-700" />
        )}
        <span>{subtopic}</span>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-400" />
    </motion.button>
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

const TopicsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const location = useLocation();
  const navigate = useNavigate();

  const { progress, markSubtopicComplete, getCompletionPercentage } =
    useProgress();

  // Handle search from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("q");
    if (search) {
      setSearchQuery(search);
      // Find matching topic
      const matchingTopic = topics.find(
        (topic) =>
          topic.title.toLowerCase().includes(search.toLowerCase()) ||
          topic.description.toLowerCase().includes(search.toLowerCase()) ||
          topic.topics.some((subtopic) =>
            subtopic.toLowerCase().includes(search.toLowerCase())
          )
      );
      if (matchingTopic) {
        handleCardClick(matchingTopic);
      }
    }
  }, [location.search]);

  // Enhanced handleCardClick
  const handleCardClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(topic.topics[0]);
    setShowQuiz(false);
    setActiveTab("content");
    // Update URL without navigation
    window.history.pushState({}, "", `/topics/${topic.id}`);
  };

  // Enhanced handleBackClick
  const handleBackClick = () => {
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    setShowQuiz(false);
    // Update URL without navigation
    window.history.pushState({}, "", "/topics");
  };

  // Enhanced search filtering
  const filteredTopics = topics.filter((topic) => {
    const matchesSearch = searchQuery
      ? topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.topics.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true;

    const matchesLevel = levelFilter ? topic.level === levelFilter : true;

    return matchesSearch && matchesLevel;
  });

  // Handle subtopic selection
  const handleSubtopicClick = (subtopic: string) => {
    if (selectedTopic) {
      setSelectedSubtopic(subtopic);
      setShowQuiz(false);
      setActiveTab("content");
    }
  };

  // Handle quiz completion
  const handleQuizComplete = () => {
    setShowQuiz(false);
    if (selectedTopic && selectedSubtopic) {
      markSubtopicComplete(selectedTopic.id, selectedSubtopic);
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

  // Get the content data for the selected subtopic
  const getContentData = () => {
    if (!selectedTopic || !selectedSubtopic) return null;
    return (
      javaBasicsContent[selectedSubtopic as keyof typeof javaBasicsContent] ||
      null
    );
  };

  // Get the code example for the selected subtopic
  const getCodeExample = () => {
    if (!selectedTopic || !selectedSubtopic) return "";
    return (
      codeExamples[selectedSubtopic as keyof typeof codeExamples] ||
      "// No code example available"
    );
  };

  // Get the quiz questions for the selected subtopic
  const getQuizQuestions = () => {
    if (!selectedTopic || !selectedSubtopic) return [];
    return [
      {
        question: "What is a variable in Java?",
        options: [
          "A container for storing data values",
          "A method for performing calculations",
          "A type of loop",
          "A class definition",
        ],
        correctAnswer: 0,
        explanation:
          "A variable is a container for storing data values. In Java, variables must be declared with a specific data type.",
      },
      {
        question: "Which of the following is a primitive data type in Java?",
        options: ["String", "Array", "int", "Class"],
        correctAnswer: 2,
        explanation:
          "In Java, 'int' is a primitive data type, while String, Array, and Class are reference types.",
      },
    ];
  };

  // Get the content data
  const contentData = getContentData();
  const codeExample = getCodeExample();
  const quizQuestions = getQuizQuestions();

  return (
    <div className="container py-8">
      <AnimatePresence mode="wait">
        {!selectedTopic ? (
          <motion.div
            key="topics-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl font-bold">Java Learning Topics</h1>
              <p className="text-xl text-muted-foreground">
                Explore our comprehensive Java curriculum designed to take you
                from beginner to advanced.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    // Update URL with search query
                    const params = new URLSearchParams();
                    if (e.target.value) {
                      params.set("q", e.target.value);
                    }
                    navigate(`/topics?${params.toString()}`);
                  }}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                {["All", "Beginner", "Intermediate", "Advanced"].map(
                  (level) => (
                    <Button
                      key={level}
                      variant={levelFilter === level ? "default" : "outline"}
                      onClick={() =>
                        setLevelFilter(level === "All" ? null : level)
                      }
                      className="min-w-[100px]"
                    >
                      {level}
                    </Button>
                  )
                )}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredTopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  onClick={() => handleCardClick(topic)}
                  progress={getCompletionPercentage(topic.id)}
                />
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="topic-detail"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid gap-8 lg:grid-cols-[300px,1fr]"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Overall Progress
                      </span>
                      <span className="text-sm font-medium">
                        {getCompletionPercentage(selectedTopic.id)}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${getCompletionPercentage(
                            selectedTopic.id
                          )}%`,
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subtopics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedTopic.topics.map((subtopic) => (
                    <SubtopicItem
                      key={subtopic}
                      subtopic={subtopic}
                      isActive={selectedSubtopic === subtopic}
                      isCompleted={isSubtopicCompleted(
                        selectedTopic.id,
                        subtopic
                          .toLowerCase()
                          .replace(" & ", "-")
                          .replace(/\s+/g, "-")
                      )}
                      onClick={() => handleSubtopicClick(subtopic)}
                    />
                  ))}
                </CardContent>
              </Card>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleBackClick}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Topics
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{selectedSubtopic}</h2>
                  <p className="text-muted-foreground">
                    {selectedTopic.description}
                  </p>
                </div>
                <Button onClick={toggleQuiz}>
                  {showQuiz ? "Hide Quiz" : "Take Quiz"}
                </Button>
              </div>

              <Tabs defaultValue="content" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="code">Code Examples</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  {contentData ? (
                    <MultiFormatContent
                      content={contentData}
                      title={selectedSubtopic || ""}
                    />
                  ) : (
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-center text-muted-foreground">
                          Select a subtopic to view its content.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="code" className="space-y-4">
                  {codeExample ? (
                    <CodePlayground initialCode={codeExample} />
                  ) : (
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-center text-muted-foreground">
                          No code examples available for this topic.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="resources">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-center text-muted-foreground">
                        Additional resources coming soon.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {showQuiz && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <TopicQuiz
                    topicId={selectedTopic.id}
                    questions={quizQuestions}
                    onComplete={handleQuizComplete}
                  />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopicsPage;
