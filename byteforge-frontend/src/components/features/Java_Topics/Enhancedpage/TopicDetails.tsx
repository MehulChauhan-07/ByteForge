import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Code,
  FileText,
  Lightbulb,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Topic } from "@/types";
import { useProgress } from "@/context/ProgressContext";
import CodeEditor from "@/components/features/CodeEditor";

interface TopicDetailsProps {
  topic: Topic;
  onBack: () => void;
}

const TopicDetails: React.FC<TopicDetailsProps> = ({ topic, onBack }) => {
  const navigate = useNavigate();
  const { subtopicId } = useParams();
  const [activeTab, setActiveTab] = useState("content");
  const [activeSubtopicId, setActiveSubtopicId] = useState<string | null>(
    subtopicId || null
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const { isSubTopicComplete, toggleSubTopicCompletion } = useProgress();

  useEffect(() => {
    if (!activeSubtopicId && topic.subtopics.length > 0) {
      setActiveSubtopicId(topic.subtopics[0].id);
    }
  }, [topic, activeSubtopicId]);

  const currentSubtopicIndex = topic.subtopics.findIndex(
    (s) => s.id === activeSubtopicId
  );

  const handleNextSubtopic = () => {
    if (currentSubtopicIndex < topic.subtopics.length - 1) {
      const nextSubtopic = topic.subtopics[currentSubtopicIndex + 1];
      setActiveSubtopicId(nextSubtopic.id);
      navigate(`/topics/${topic.id}/${nextSubtopic.id}`);
    }
  };

  const handlePreviousSubtopic = () => {
    if (currentSubtopicIndex > 0) {
      const prevSubtopic = topic.subtopics[currentSubtopicIndex - 1];
      setActiveSubtopicId(prevSubtopic.id);
      navigate(`/topics/${topic.id}/${prevSubtopic.id}`);
    }
  };

  const activeSubtopic = topic.subtopics.find((s) => s.id === activeSubtopicId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-primary group"
          onClick={onBack}
        >
          <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Topics
        </Button>

        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Progress:{" "}
            {
              topic.subtopics.filter((s) => isSubTopicComplete(topic.id, s.id))
                .length
            }{" "}
            / {topic.subtopics.length}
          </div>
          <Progress
            value={
              (topic.subtopics.filter((s) => isSubTopicComplete(topic.id, s.id))
                .length /
                topic.subtopics.length) *
              100
            }
            className="w-32"
          />
        </div>
      </div>

      {/* Topic Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {topic.title}
          </h1>
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              topic.level === "Beginner"
                ? "bg-green-500/10 text-green-500 border-green-500/20"
                : topic.level === "Intermediate"
                ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                : "bg-purple-500/10 text-purple-500 border-purple-500/20"
            )}
          >
            {topic.level}
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">{topic.description}</p>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between bg-muted/30 rounded-lg p-4"
      >
        <Button
          variant="ghost"
          onClick={handlePreviousSubtopic}
          disabled={currentSubtopicIndex === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          {currentSubtopicIndex + 1} of {topic.subtopics.length}
        </div>

        <Button
          variant="ghost"
          onClick={handleNextSubtopic}
          disabled={currentSubtopicIndex === topic.subtopics.length - 1}
          className="gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1 rounded-lg">
          <TabsTrigger
            value="content"
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <BookOpen className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Code className="h-4 w-4" />
            Code
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <FileText className="h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger
            value="exercises"
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Lightbulb className="h-4 w-4" />
            Exercises
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="content" className="mt-0">
            {activeSubtopic && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <Card className="border-none shadow-none">
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold">
                        {activeSubtopic.title}
                      </h2>
                      {activeSubtopic.estimatedTime && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {activeSubtopic.estimatedTime}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        toggleSubTopicCompletion(topic.id, activeSubtopic.id)
                      }
                      className={cn(
                        "gap-2",
                        isSubTopicComplete(topic.id, activeSubtopic.id) &&
                          "text-green-500"
                      )}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {isSubTopicComplete(topic.id, activeSubtopic.id)
                        ? "Completed"
                        : "Mark Complete"}
                    </Button>
                  </CardHeader>
                  <CardContent className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
                    {activeSubtopic.content.map((block, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="mb-6 last:mb-0"
                      >
                        {block.type === "text" && (
                          <div className="whitespace-pre-line">
                            {block.content}
                          </div>
                        )}
                        {block.type === "code" && (
                          <div className="rounded-lg overflow-hidden border border-border/40">
                            <div className="bg-muted/80 text-xs px-4 py-1.5 border-b border-border/40 flex justify-between items-center">
                              <span className="font-medium">
                                {block.language || "java"}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  navigator.clipboard.writeText(block.content)
                                }
                                className="h-6 px-2 text-xs font-normal"
                              >
                                Copy Code
                              </Button>
                            </div>
                            <CodeEditor
                              code={block.content}
                              language={block.language || "java"}
                              readOnly
                            />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="code" className="mt-0">
            {activeSubtopic?.codeExamples?.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="mb-6 last:mb-0"
              >
                <Card className="border-none shadow-none">
                  <CardHeader>
                    <h3 className="text-xl font-semibold">{example.title}</h3>
                    {example.description && (
                      <p className="text-muted-foreground">
                        {example.description}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg overflow-hidden border border-border/40">
                      <div className="bg-muted/80 text-xs px-4 py-1.5 border-b border-border/40 flex justify-between items-center">
                        <span className="font-medium">
                          {example.language || "java"}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            navigator.clipboard.writeText(example.code)
                          }
                          className="h-6 px-2 text-xs font-normal"
                        >
                          Copy Code
                        </Button>
                      </div>
                      <CodeEditor
                        code={example.code}
                        language={example.language || "java"}
                        readOnly
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="resources" className="mt-0">
            {activeSubtopic?.resources?.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="mb-6 last:mb-0"
              >
                <Card className="border-none shadow-none hover:bg-muted/30 transition-colors">
                  <CardHeader>
                    <h3 className="text-xl font-semibold">{resource.title}</h3>
                    {resource.description && (
                      <p className="text-muted-foreground">
                        {resource.description}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => window.open(resource.url, "_blank")}
                    >
                      Open Resource
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="exercises" className="mt-0">
            {activeSubtopic?.exercises?.map((exercise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="mb-6 last:mb-0"
              >
                <Card className="border-none shadow-none">
                  <CardHeader>
                    <h3 className="text-xl font-semibold">{exercise.title}</h3>
                    {exercise.description && (
                      <p className="text-muted-foreground">
                        {exercise.description}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg overflow-hidden border border-border/40">
                      <div className="bg-muted/80 text-xs px-4 py-1.5 border-b border-border/40 flex justify-between items-center">
                        <span className="font-medium">
                          {exercise.language || "java"}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            navigator.clipboard.writeText(exercise.initialCode)
                          }
                          className="h-6 px-2 text-xs font-normal"
                        >
                          Copy Code
                        </Button>
                      </div>
                      <CodeEditor
                        code={exercise.initialCode}
                        language={exercise.language || "java"}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default TopicDetails;
