import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  BookOpen,
  Code,
  FileText,
  PlayCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Heart,
  Share2,
  BookmarkCheck,
  Bookmark,
  Copy,
  CheckSquare,
  PenSquare,
  Lightbulb,
  ExternalLink,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CodeEditor from "@/components/features/CodeEditor";
import type { Subtopic, ContentBlock } from "@/types";
import { useProgress } from "@/context/ProgressContext";

interface SubtopicContentProps {
  topicId: string;
  subtopic: Subtopic;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const subtopicAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const SubtopicContent: React.FC<SubtopicContentProps> = ({
  topicId,
  subtopic,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50));
  const [activeTab, setActiveTab] = useState<
    "content" | "code" | "resources" | "exercises"
  >("content");
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<
    { user: string; text: string; timestamp: Date }[]
  >([]);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const { isSubTopicComplete, toggleSubTopicCompletion } = useProgress();

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLikeToggle = () => {
    setLikes(likes + (likes % 2 === 0 ? 1 : -1));
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;

    const newComment = {
      user: "You",
      text: comment,
      timestamp: new Date(),
    };

    setComments([...comments, newComment]);
    setComment("");
  };

  const handleSaveNotes = () => {
    // Save notes to local storage or backend
    console.log("Notes saved:", notes);
    setNotesOpen(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // Could add a toast notification here
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.round((date.getTime() - Date.now()) / (1000 * 60)),
      "minute"
    );
  };

  return (
    <motion.div
      key={subtopic.id}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={subtopicAnimation}
      className="space-y-6"
    >
      {/* Main Content Card */}
      <AnimatePresence mode="wait">
        {activeTab === "content" && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={subtopicAnimation}
            key="content-tab"
          >
            <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              {/* Header */}
              <CardHeader className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {subtopic.estimatedTime || "10 min read"}
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                      {subtopic.title}
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`rounded-full ${
                        isSubTopicComplete(topicId, subtopic.id) &&
                        "border-green-500 text-green-500"
                      }`}
                      onClick={() =>
                        toggleSubTopicCompletion(topicId, subtopic.id)
                      }
                    >
                      {isSubTopicComplete(topicId, subtopic.id) ? (
                        <>
                          <CheckSquare className="h-3.5 w-3.5 mr-1.5" />
                          Completed
                        </>
                      ) : (
                        <>
                          <CheckSquare className="h-3.5 w-3.5 mr-1.5" />
                          Mark Complete
                        </>
                      )}
                    </Button>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                            onClick={handleBookmarkToggle}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="h-4 w-4 fill-primary text-primary" />
                            ) : (
                              <Bookmark className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {isBookmarked ? "Bookmarked" : "Bookmark"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                            onClick={handleLikeToggle}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                likes % 2 !== 0
                                  ? "fill-red-500 text-red-500"
                                  : ""
                              }`}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Like ({likes})</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                            onClick={() => setNotesOpen(true)}
                          >
                            <PenSquare className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Take Notes</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Share</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardHeader>

              {/* Main Content */}
              <CardContent className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none p-6">
                {subtopic.content.map((block: ContentBlock, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-8 last:mb-0"
                  >
                    {block.type === "text" && (
                      <div className="whitespace-pre-line">{block.content}</div>
                    )}
                    {block.type === "code" && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="bg-slate-50 dark:bg-slate-800/60 text-xs px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-medium flex items-center">
                              <Code className="h-3.5 w-3.5 mr-1.5 text-primary" />
                              {block.language || "java"}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5 py-0 h-4 rounded-full"
                            >
                              Example
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCopyCode(block.content)}
                              className="h-6 px-2 text-xs font-normal rounded-lg hover:bg-muted/80"
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </div>

                        <div className="code-container relative">
                          <CodeEditor
                            code={block.content}
                            language={block.language || "java"}
                            readOnly
                          />

                          <Button
                            variant="default"
                            size="sm"
                            className="absolute bottom-3 right-3 rounded-full px-3 gap-1.5 bg-primary/90 hover:bg-primary shadow-lg"
                          >
                            <PlayCircle className="h-4 w-4" />
                            Run Code
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </CardContent>

              {/* Footer */}
              <CardFooter className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="/images/instructor.jpg"
                      alt="Instructor"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">John Doe</div>
                    <div className="text-xs text-muted-foreground">
                      Senior Java Developer
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full gap-1.5"
                    onClick={() => setShowComments(!showComments)}
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    {showComments ? "Hide Comments" : "Comments"} (
                    {comments.length})
                  </Button>

                  {hasPrevious && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onPrevious}
                      className="rounded-full gap-1.5"
                    >
                      Previous
                    </Button>
                  )}

                  {hasNext && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={onNext}
                      className="rounded-full gap-1.5"
                    >
                      Continue
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  )}

                  {!hasNext && (
                    <Button
                      variant="default"
                      size="sm"
                      className="rounded-full gap-1.5"
                    >
                      Complete Topic
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>

            {/* Comments Section */}
            <AnimatePresence>
              {showComments && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="mt-4 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                    <CardHeader className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-4">
                      <h3 className="text-lg font-semibold">
                        Comments & Questions
                      </h3>
                    </CardHeader>

                    <CardContent className="p-4">
                      <div className="space-y-4 mb-6">
                        {comments.length > 0 ? (
                          comments.map((comment, index) => (
                            <div
                              key={index}
                              className="flex gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0"
                            >
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {comment.user[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">
                                    {comment.user}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimestamp(comment.timestamp)}
                                  </span>
                                </div>
                                <p className="text-sm mt-1">{comment.text}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6">
                            <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground opacity-50 mb-2" />
                            <p className="text-muted-foreground">
                              No comments yet. Be the first to comment!
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Add a comment or ask a question..."
                          className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm"
                        />
                        <Button
                          variant="default"
                          size="sm"
                          className="rounded-lg"
                          onClick={handleAddComment}
                        >
                          Post
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notes Modal */}
            <AnimatePresence>
              {notesOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                  onClick={() => setNotesOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg max-w-lg w-full max-h-[80vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <h3 className="font-semibold flex items-center gap-2">
                        <PenSquare className="h-4 w-4" />
                        Notes: {subtopic.title}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => setNotesOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="p-4">
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Write your notes here..."
                        className="w-full h-64 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm"
                      />

                      <div className="flex justify-end mt-4 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg"
                          onClick={() => setNotesOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="rounded-lg"
                          onClick={handleSaveNotes}
                        >
                          Save Notes
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === "code" && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={subtopicAnimation}
            key="code-tab"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {subtopic.codeExamples?.map((example: {title: string; description?: string; language?: string; code: string}, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-2xl h-full flex flex-col hover:shadow-md transition-shadow">
                  <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">{example.title}</h3>
                      <Badge variant="outline" className="text-xs px-2 py-0">
                        {example.language || "java"}
                      </Badge>
                    </div>
                    {example.description && (
                      <p className="text-muted-foreground text-sm">
                        {example.description}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="flex-grow p-0">
                    <div className="relative">
                      <CodeEditor
                        code={example.code}
                        language={example.language || "java"}
                        readOnly
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleCopyCode(example.code)}
                          className="h-7 px-2 text-xs font-normal bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-sm"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
                    <div className="flex items-center justify-between w-full">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20 rounded-full"
                      >
                        Example #{index + 1}
                      </Badge>
                      <Button
                        variant="default"
                        size="sm"
                        className="rounded-full gap-1"
                      >
                        <PlayCircle className="h-3.5 w-3.5 mr-1" />
                        Try it live
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}

            {(!subtopic.codeExamples || subtopic.codeExamples.length === 0) && (
              <div className="col-span-full flex flex-col items-center justify-center p-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <Code className="h-16 w-16 text-muted-foreground opacity-30 mb-4" />
                <h3 className="text-xl font-medium mb-2">No code examples</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  This subtopic doesn't have any code examples yet.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "resources" && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={subtopicAnimation}
            key="resources-tab"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {subtopic.resources?.map((resource: { title: string; description?: string; url: string }, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-md transition-all hover:-translate-y-1 h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {resource.title}
                        </h3>
                        {resource.description && (
                          <p className="text-muted-foreground text-sm">
                            {resource.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <div className="text-sm text-muted-foreground line-clamp-3">
                      This resource provides additional information about{" "}
                      {resource.title.toLowerCase()}. Click the button below to
                      access the content.
                    </div>
                  </CardContent>

                  <CardFooter className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
                    <Button
                      variant="outline"
                      className="w-full gap-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                      onClick={() => window.open(resource.url, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open Resource
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}

            {(!subtopic.resources || subtopic.resources.length === 0) && (
              <div className="col-span-full flex flex-col items-center justify-center p-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <FileText className="h-16 w-16 text-muted-foreground opacity-30 mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  No resources available
                </h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  This subtopic doesn't have any additional resources yet.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "exercises" && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={subtopicAnimation}
            key="exercises-tab"
          >
            {subtopic.exercises?.map((exercise: { title: string; description?: string; initialCode: string; language?: string }, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-6 last:mb-0"
              >
                <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-2xl">
                  <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Lightbulb className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">
                          {exercise.title}
                        </h3>
                      </div>
                      <Badge
                        variant="outline"
                        className="rounded-full px-3 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
                      >
                        Exercise
                      </Badge>
                    </div>
                    {exercise.description && (
                      <p className="text-muted-foreground mt-3 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                        {exercise.description}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="rounded-lg overflow-hidden">
                      <div className="bg-slate-100 dark:bg-slate-800 text-xs px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {exercise.language || "java"}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0 h-4 rounded-full bg-primary/10 text-primary border-primary/20"
                          >
                            Your Solution
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopyCode(exercise.initialCode)}
                            className="h-6 px-2 text-xs font-normal"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 text-xs font-normal"
                          >
                            Reset
                          </Button>
                        </div>
                      </div>
                      <div className="code-container relative">
                        <CodeEditor
                          code={exercise.initialCode}
                          language={exercise.language || "java"}
                        />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 flex flex-wrap justify-between gap-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        View Hints
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        View Solution
                      </Button>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="rounded-full gap-2"
                    >
                      <PlayCircle className="h-4 w-4 mr-1" />
                      Run & Submit
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}

            {(!subtopic.exercises || subtopic.exercises.length === 0) && (
              <div className="flex flex-col items-center justify-center p-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <Lightbulb className="h-16 w-16 text-muted-foreground opacity-30 mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  No exercises available
                </h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  This subtopic doesn't have any exercises yet.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab Navigation */}
      <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {(["content", "code", "resources", "exercises"] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            className={`flex-1 gap-2 rounded-xl capitalize ${
              activeTab === tab ? "shadow-sm" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "content" && <BookOpen className="h-4 w-4" />}
            {tab === "code" && <Code className="h-4 w-4" />}
            {tab === "resources" && <FileText className="h-4 w-4" />}
            {tab === "exercises" && <Lightbulb className="h-4 w-4" />}
            {tab}
          </Button>
        ))}
      </div>

      {/* Next/Previous Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          className={`gap-2 rounded-full ${!hasPrevious ? "invisible" : ""}`}
          onClick={onPrevious}
          disabled={!hasPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous Subtopic
        </Button>

        <Button
          variant={hasNext ? "default" : "outline"}
          className={`gap-2 rounded-full ${!hasNext ? "invisible" : ""}`}
          onClick={onNext}
          disabled={!hasNext}
        >
          Next Subtopic
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const X = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default SubtopicContent;
