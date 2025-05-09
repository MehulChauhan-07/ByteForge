import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { topics } from "@/data/topics";
import { useProgress } from "@/context/ProgressContext";
import CodeEditor from "@/components/features/CodeEditor";
import type { Topic, SubTopic } from "@/types";

const SubtopicPage = () => {
  const navigate = useNavigate();
  const { topicId, subtopicId } = useParams();
  const [activeTab, setActiveTab] = useState("content");
  const [topic, setTopic] = useState<Topic | null>(null);
  const [subtopic, setSubtopic] = useState<SubTopic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isSubTopicComplete, toggleSubTopicCompletion } = useProgress();

  useEffect(() => {
    const loadTopicData = () => {
      setIsLoading(true);
      const foundTopic = topics.find((t) => t.id === topicId);
      if (foundTopic) {
        setTopic(foundTopic);
        const foundSubtopic = foundTopic.subtopics.find(
          (s) => s.id === subtopicId
        );
        if (foundSubtopic) {
          setSubtopic(foundSubtopic);
        } else {
          // If subtopic not found, redirect to topic page
          navigate(`/topics/${topicId}`);
        }
      } else {
        // If topic not found, redirect to topics list
        navigate("/topics");
      }
      setIsLoading(false);
    };

    loadTopicData();
  }, [topicId, subtopicId, navigate]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-4 w-96 bg-muted rounded" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!topic || !subtopic) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Topic or Subtopic not found
          </h1>
          <Button onClick={() => navigate("/topics")}>Back to Topics</Button>
        </div>
      </div>
    );
  }

  const currentSubtopicIndex = topic.subtopics.findIndex(
    (s) => s.id === subtopicId
  );
  const totalSubtopics = topic.subtopics.length;

  const handleNextSubtopic = () => {
    if (currentSubtopicIndex < totalSubtopics - 1) {
      const nextSubtopic = topic.subtopics[currentSubtopicIndex + 1];
      navigate(`/topics/${topicId}/${nextSubtopic.id}`);
    }
  };

  const handlePreviousSubtopic = () => {
    if (currentSubtopicIndex > 0) {
      const prevSubtopic = topic.subtopics[currentSubtopicIndex - 1];
      navigate(`/topics/${topicId}/${prevSubtopic.id}`);
    }
  };

  const handleMarkComplete = () => {
    toggleSubTopicCompletion(topic.id, subtopic.id);
  };

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            onClick={() => navigate(`/topics/${topicId}`)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Topic
          </Button>

          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Progress: {currentSubtopicIndex + 1} of {totalSubtopics}
            </div>
            <Progress
              value={((currentSubtopicIndex + 1) / totalSubtopics) * 100}
              className="w-32"
            />
          </div>
        </div>

        {/* Subtopic Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{subtopic.title}</h1>
            <Badge
              variant={topic.level === "Beginner" ? "default" : "secondary"}
            >
              {topic.level}
            </Badge>
          </div>
          {subtopic.description && (
            <p className="text-lg text-muted-foreground">
              {subtopic.description}
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousSubtopic}
            disabled={currentSubtopicIndex === 0}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            onClick={handleNextSubtopic}
            disabled={currentSubtopicIndex === totalSubtopics - 1}
          >
            Next
          </Button>
        </div>

        {/* Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold">{subtopic.title}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkComplete}
                  className={cn(
                    "gap-2",
                    isSubTopicComplete(topic.id, subtopic.id) &&
                      "text-green-500"
                  )}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {isSubTopicComplete(topic.id, subtopic.id)
                    ? "Completed"
                    : "Mark Complete"}
                </Button>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
                {subtopic.content.map((block, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    {block.type === "text" && (
                      <div className="whitespace-pre-line">{block.content}</div>
                    )}
                    {block.type === "code" && (
                      <CodeEditor
                        code={block.content}
                        language={block.language || "java"}
                        readOnly
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            {subtopic.codeExamples?.map((example, index) => (
              <Card key={index}>
                <CardHeader>
                  <h3 className="text-lg font-semibold">{example.title}</h3>
                  {example.description && (
                    <p className="text-muted-foreground">
                      {example.description}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <CodeEditor
                    code={example.code}
                    language={example.language || "java"}
                    readOnly
                  />
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            {subtopic.resources?.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <h3 className="text-lg font-semibold">{resource.title}</h3>
                  {resource.description && (
                    <p className="text-muted-foreground">
                      {resource.description}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {resource.url}
                  </a>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="exercises" className="space-y-4">
            {subtopic.exercises?.map((exercise, index) => (
              <Card key={index}>
                <CardHeader>
                  <h3 className="text-lg font-semibold">{exercise.title}</h3>
                  {exercise.description && (
                    <p className="text-muted-foreground">
                      {exercise.description}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <CodeEditor
                    code={exercise.initialCode}
                    language={exercise.language || "java"}
                  />
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default SubtopicPage;
