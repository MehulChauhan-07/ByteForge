import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { javaBasicsContent } from "@/data/javaBasicsContent";
import { codeExamples } from "@/data/codeExamples";
import { useProgress } from "@/context/ProgressContext";
import type { Topic } from "@/types";

import MultiFormatContent from "@/components/features/Java_Topics/MultiFormatContent";
import CodePlayground from "@/components/features/Java_Topics/CodePlayground";
import TopicQuiz from "@/components/features/quiz/TopicQuiz";

interface TopicDetailsProps {
  topic: Topic;
  onBack: () => void;
}

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
      className={`flex items-center justify-between w-full py-2 px-3 rounded-md text-left 
        hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200
        ${isActive ? "bg-slate-100 dark:bg-slate-800" : ""}`}
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
      <svg
        className="h-4 w-4 text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </motion.button>
  );
};

const TopicDetails = ({ topic, onBack }: TopicDetailsProps) => {
  // Safety check - if topic is undefined, return early with a loading state
  if (!topic || !topic.topics || !topic.topics.length) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading topic...</p>
        </div>
      </div>
    );
  }

  const [selectedSubtopic, setSelectedSubtopic] = useState<string>(
    topic.topics[0]
  );
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  const { progress, markSubtopicComplete, getCompletionPercentage } =
    useProgress();

  // Handle subtopic selection
  const handleSubtopicClick = (subtopic: string) => {
    setSelectedSubtopic(subtopic);
    setShowQuiz(false);
    setActiveTab("content");
  };

  // Toggle quiz view
  const toggleQuiz = () => {
    setShowQuiz((prev) => !prev);
  };

  // Handle quiz completion
  const handleQuizComplete = () => {
    setShowQuiz(false);
    markSubtopicComplete(topic.id, selectedSubtopic);
  };

  // Check if subtopic is completed
  const isSubtopicCompleted = (topicId: string, subtopicId: string) => {
    return progress[topicId]?.subtopics[subtopicId] || false;
  };

  // Get the content data for the selected subtopic
  const getContentData = () => {
    const normalizedSubtopic = selectedSubtopic
      .toLowerCase()
      .replace(" & ", "")
      .replace(/\s+/g, "");

    return (
      javaBasicsContent[normalizedSubtopic as keyof typeof javaBasicsContent] ||
      null
    );
  };

  // Get the code example for the selected subtopic
  const getCodeExample = () => {
    const normalizedSubtopic = selectedSubtopic
      .toLowerCase()
      .replace(" & ", "")
      .replace(/\s+/g, "");

    return (
      codeExamples[normalizedSubtopic as keyof typeof codeExamples] ||
      "// No code example available"
    );
  };

  // Get mock quiz questions
  const getQuizQuestions = () => {
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

  // Get content data, code examples and quiz questions
  const contentData = getContentData();
  const codeExample = getCodeExample();
  const quizQuestions = getQuizQuestions();

  return (
    <div className="grid gap-8 md:grid-cols-[280px,1fr]">
      {/* Left sidebar - Topic navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        {/* Topic info card */}
        <div className="bg-white dark:bg-slate-950 border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">{topic.title}</h2>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline">{topic.level}</Badge>
            <div className="flex items-center text-sm text-slate-500">
              <Clock className="h-4 w-4 mr-1" />
              {topic.duration}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {topic.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Progress
              </span>
              <span className="font-medium">
                {getCompletionPercentage(topic.id)}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${getCompletionPercentage(topic.id)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Subtopics navigation */}
        <div className="bg-white dark:bg-slate-950 border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Topics</h3>
          <div className="space-y-1">
            {topic.topics.map((subtopic) => (
              <SubtopicItem
                key={subtopic}
                subtopic={subtopic}
                isActive={selectedSubtopic === subtopic}
                isCompleted={isSubtopicCompleted(
                  topic.id,
                  subtopic
                    .toLowerCase()
                    .replace(" & ", "-")
                    .replace(/\s+/g, "-")
                )}
                onClick={() => handleSubtopicClick(subtopic)}
              />
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topics
        </Button>
      </motion.div>

      {/* Main content area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">{selectedSubtopic}</h2>
          <Button onClick={toggleQuiz}>
            {showQuiz ? "Back to Content" : "Take Quiz"}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {showQuiz ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <TopicQuiz
                topicId={topic.id}
                questions={quizQuestions}
                onComplete={handleQuizComplete}
              />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Tabs
                defaultValue="content"
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-6"
              >
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
                    <div className="border rounded-md p-6 text-center">
                      <p className="text-muted-foreground">
                        Select a subtopic to view its content.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="code" className="space-y-4">
                  {codeExample ? (
                    <CodePlayground initialCode={codeExample} />
                  ) : (
                    <div className="border rounded-md p-6 text-center">
                      <p className="text-muted-foreground">
                        No code examples available for this topic.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="resources">
                  <div className="border rounded-md p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Additional Resources
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a
                          href="https://docs.oracle.com/javase/tutorial/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center gap-1"
                        >
                          Oracle Java Tutorials
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.w3schools.com/java/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center gap-1"
                        >
                          W3Schools Java Tutorial
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.javatpoint.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center gap-1"
                        >
                          JavaTpoint
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TopicDetails;
