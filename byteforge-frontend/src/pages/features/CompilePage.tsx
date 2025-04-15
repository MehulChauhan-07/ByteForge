"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import MonacoEditor from "@monaco-editor/react";
import codeEditorService, { SavedCode } from "@/services/codeEditorService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Coffee,
  PlayCircle,
  Save,
  Trash2,
  Download,
  Code,
  Terminal,
  CheckCircle2,
  XCircle,
  Loader2,
  Copy,
  StopCircle,
  Sparkles,
  RefreshCw,
  Bookmark,
  GripHorizontal,
  Info,
  Clock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const JAVA_TEMPLATE = `public class Main {
    public static void main(String[] args) {
        // Your Java code here
        System.out.println("Hello, ByteForge!");
    }
}`;

const EXAMPLE_PROGRAMS = [
  {
    title: "Hello World",
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, ByteForge!");
    }
}`,
  },
  {
    title: "Fibonacci Series",
    code: `public class Main {
    public static void main(String[] args) {
        int n = 10;
        System.out.println("Fibonacci Series up to " + n + " terms:");

        int firstTerm = 0, secondTerm = 1;
        
        for (int i = 1; i <= n; ++i) {
            System.out.print(firstTerm + " ");

            int nextTerm = firstTerm + secondTerm;
            firstTerm = secondTerm;
            secondTerm = nextTerm;
        }
    }
}`,
  },
  {
    title: "Prime Number Check",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number to check if it's prime: ");
        int num = scanner.nextInt();
        
        boolean isPrime = true;
        if (num <= 1) {
            isPrime = false;
        } else {
            for (int i = 2; i <= Math.sqrt(num); i++) {
                if (num % i == 0) {
                    isPrime = false;
                    break;
                }
            }
        }
        
        if (isPrime) {
            System.out.println(num + " is a prime number.");
        } else {
            System.out.println(num + " is not a prime number.");
        }
    }
}`,
  },
];

export default function CompilerPage() {
  const { user } = useAuth();
  const [code, setCode] = useState(JAVA_TEMPLATE);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [saveTitle, setSaveTitle] = useState("");
  const [savedCodes, setSavedCodes] = useState<SavedCode[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStats, setExecutionStats] = useState({
    startTime: 0,
    endTime: 0,
    executionTime: 0,
  });
  const [activeTab, setActiveTab] = useState("input");
  const [theme, setTheme] = useState("vs-dark");
  const [showExamples, setShowExamples] = useState(false);
  const executionAbortController = useRef<AbortController | null>(null);

  useEffect(() => {
    if (user) {
      loadSavedCodes();
    }
  }, [user]);

  useEffect(() => {
    // If there's execution output or error, switch to output tab
    if (output || error) {
      setActiveTab("output");
    }
  }, [output, error]);

  const loadSavedCodes = async () => {
    if (!user) return;
    setLoadingSaved(true);
    try {
      const codes = await codeEditorService.getSavedCodes();
      setSavedCodes(codes);
    } catch (error) {
      toast.error("Failed to load saved codes");
    } finally {
      setLoadingSaved(false);
    }
  };

  const handleExecute = async () => {
    if (!user) {
      toast.error("Please log in to execute code");
      return;
    }

    setIsExecuting(true);
    setError("");
    setOutput("");
    setExecutionStats({
      startTime: Date.now(),
      endTime: 0,
      executionTime: 0,
    });

    try {
      executionAbortController.current = new AbortController();
      const result = await codeEditorService.executeCode({
        code,
        input,
        signal: executionAbortController.current.signal,
      });

      const endTime = Date.now();
      setOutput(result.output);
      setExecutionStats({
        startTime: executionStats.startTime,
        endTime,
        executionTime: endTime - executionStats.startTime,
      });

      if (result.error) {
        setError(result.error);
      } else {
        toast.success("Code executed successfully");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        toast.info("Execution stopped by user");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to execute code");
      }
    } finally {
      setIsExecuting(false);
      executionAbortController.current = null;
    }
  };

  const handleStopExecution = () => {
    if (executionAbortController.current) {
      executionAbortController.current.abort();
      setIsExecuting(false);
      toast.info("Execution stopped");
    }
  };

  const handleSave = async (closeDialog: () => void) => {
    if (!user) {
      toast.error("Please log in to save code");
      return;
    }

    if (!saveTitle.trim()) {
      toast.error("Please enter a title for your code");
      return;
    }

    try {
      await codeEditorService.saveCode(code, saveTitle);
      loadSavedCodes();
      setSaveTitle("");
      closeDialog();
      toast.success("Code saved successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to save code");
      }
    }
  };

  const handleLoadCode = (savedCode: string) => {
    setCode(savedCode);
    toast.success("Code loaded successfully");
  };

  const handleDeleteCode = async (id: string) => {
    if (!user) {
      toast.error("Please log in to delete code");
      return;
    }

    try {
      await codeEditorService.deleteCode(id);
      loadSavedCodes();
      toast.success("Code deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete code");
      }
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const handleThemeToggle = () => {
    setTheme(theme === "vs-dark" ? "light" : "vs-dark");
  };

  const handleResetCode = () => {
    setCode(JAVA_TEMPLATE);
    toast.info("Code reset to template");
  };

  const handleLoadExample = (exampleCode: string) => {
    setCode(exampleCode);
    setShowExamples(false);
    toast.success("Example loaded");
  };

  const formatExecutionTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="container mx-auto px-3 py-5 md:px-6 lg:px-8 max-w-7xl">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-2"
        >
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
            <Coffee className="h-8 w-8 text-blue-600" />
            <span>ByteForge</span>
            <Badge
              variant="outline"
              className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700"
            >
              Java Compiler
            </Badge>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Write, compile, and execute Java code in your browser
          </p>
        </motion.div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowExamples(!showExamples)}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200 text-blue-700 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800 dark:text-blue-300 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30"
          >
            <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
            <span>Examples</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleThemeToggle}
            className="bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border-slate-200 text-slate-700 dark:from-slate-900/50 dark:to-slate-800/50 dark:border-slate-700 dark:text-slate-300 dark:hover:from-slate-900/70 dark:hover:to-slate-800/70"
          >
            <span>{theme === "vs-dark" ? "Light Theme" : "Dark Theme"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleResetCode}
            className="bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border-slate-200 text-slate-700 dark:from-slate-900/50 dark:to-slate-800/50 dark:border-slate-700 dark:text-slate-300 dark:hover:from-slate-900/70 dark:hover:to-slate-800/70"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            <span>Reset Code</span>
          </Button>
        </motion.div>

        {/* Example Programs Dropdown */}
        {showExamples && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {EXAMPLE_PROGRAMS.map((example, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer border-blue-100 dark:border-blue-900"
                onClick={() => handleLoadExample(example.code)}
              >
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3">
                  <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center">
                    <Bookmark className="h-4 w-4 mr-2 text-blue-500" />
                    {example.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 bg-slate-50 dark:bg-slate-900/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                    {example.code.split("\n")[0]}
                    {example.code.split("\n")[1] ? "..." : ""}
                  </p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Editor Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="xl:col-span-8 flex flex-col"
          >
            <Card className="flex-1 overflow-hidden border-slate-200 dark:border-slate-700 shadow-lg">
              <CardHeader className="relative bg-gradient-to-r from-slate-800 to-slate-700 text-white py-4 px-6 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-blue-400" />
                  <CardTitle>Java Editor</CardTitle>
                </div>

                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={
                            isExecuting ? handleStopExecution : handleExecute
                          }
                          className={
                            isExecuting
                              ? "bg-red-600 hover:bg-red-700 text-white"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }
                          size="sm"
                        >
                          {isExecuting ? (
                            <div className="flex items-center gap-2">
                              <StopCircle className="h-4 w-4" />
                              <span>Stop</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <PlayCircle className="h-4 w-4" />
                              <span>Run Code</span>
                            </div>
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {isExecuting
                            ? "Stop execution"
                            : "Compile and execute Java code"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopyCode}
                          className="bg-transparent border-slate-500 text-white hover:bg-slate-600"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy code to clipboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {user && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent border-slate-500 text-white hover:bg-slate-600"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          <span>Save</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Save Your Java Code</DialogTitle>
                          <DialogDescription>
                            Enter a title to save your current code snippet.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                              Title
                            </Label>
                            <Input
                              id="title"
                              value={saveTitle}
                              onChange={(e) => setSaveTitle(e.target.value)}
                              className="col-span-3"
                              placeholder="My Java Program"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={() => handleSave(() => {})}>
                              Save Code
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0 h-[500px] relative">
                {isExecuting && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge
                      variant="outline"
                      className="bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-300 animate-pulse"
                    >
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      Executing...
                    </Badge>
                  </div>
                )}
                <MonacoEditor
                  height="100%"
                  language="java"
                  theme={theme}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    selectOnLineNumbers: true,
                    autoClosingBrackets: "always",
                    suggestOnTriggerCharacters: true,
                    minimap: { enabled: true },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', monospace",
                    renderLineHighlight: "all",
                    padding: { top: 10 },
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                  }}
                  loading={<Skeleton className="h-full w-full" />}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Input/Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="xl:col-span-4 flex flex-col gap-6"
          >
            <Card className="border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
              <Tabs
                defaultValue="input"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <TabsList className="w-full bg-transparent h-12 justify-start p-0 rounded-none border-b border-slate-200 dark:border-slate-700">
                    <TabsTrigger
                      value="input"
                      className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none"
                    >
                      <Terminal className="h-4 w-4 mr-2" />
                      Input
                    </TabsTrigger>
                    <TabsTrigger
                      value="output"
                      className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none relative"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Output
                      {(output || error) && activeTab !== "output" && (
                        <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="input" className="m-0">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Program Input
                    </span>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <Info className="h-4 w-4 text-slate-400" />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">
                            About Program Input
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            This is where you can provide input for your Java
                            program. It's used when your code reads from
                            System.in, such as with Scanner.
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-4 h-[350px] font-mono text-sm border-0 focus:ring-0 focus:outline-none resize-none bg-white dark:bg-slate-900"
                    placeholder="Enter program input here..."
                  />
                </TabsContent>

                <TabsContent
                  value="output"
                  className="m-0 h-[400px] overflow-auto bg-white dark:bg-slate-900"
                >
                  {isExecuting ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Coffee className="h-6 w-6 text-blue-500" />
                          </div>
                        </div>
                        <span className="text-sm text-slate-500">
                          Compiling and executing...
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {!output && !error ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                          <div className="relative bg-slate-100 dark:bg-slate-800 rounded-full p-4">
                            <PlayCircle className="h-12 w-12 opacity-30" />
                            <Coffee className="h-6 w-6 absolute inset-0 m-auto text-blue-500" />
                          </div>
                          <p className="text-sm mt-4">
                            Run your code to see the output here
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col p-4 gap-3">
                          {executionStats.executionTime > 0 && (
                            <div className="flex items-center justify-end mb-2 gap-1">
                              <Clock className="h-3 w-3 text-slate-400" />
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                Execution time:{" "}
                                {formatExecutionTime(
                                  executionStats.executionTime
                                )}
                              </span>
                            </div>
                          )}

                          {output && (
                            <div className="rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 transition-all hover:shadow-md">
                              <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                                  Standard Output
                                </span>
                              </div>
                              <pre className="whitespace-pre-wrap overflow-x-auto font-mono text-sm text-slate-800 dark:text-slate-200 max-h-[300px] overflow-y-auto p-2 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                                {output}
                              </pre>
                            </div>
                          )}

                          {error && (
                            <div className="rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 transition-all hover:shadow-md">
                              <div className="flex items-center gap-2 mb-2">
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span className="text-xs font-medium text-red-700 dark:text-red-300">
                                  Compilation/Runtime Error
                                </span>
                              </div>
                              <pre className="whitespace-pre-wrap break-words overflow-x-auto font-mono text-sm text-red-700 dark:text-red-300 max-h-[300px] overflow-y-auto p-2 bg-red-50/50 dark:bg-red-900/30 rounded border border-red-100 dark:border-red-900/50">
                                {error}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>

        {/* Saved Codes Section */}
        {user && (
          <Card className="border-slate-200 dark:border-slate-700 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4">
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" /> Saved Java Projects
              </CardTitle>
              <CardDescription className="text-blue-100">
                Your previously saved Java code snippets
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {loadingSaved ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-lg" />
                  ))}
                </div>
              ) : savedCodes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {savedCodes.map((savedCode) => (
                    <Card
                      key={savedCode.id}
                      className="overflow-hidden hover:shadow-lg transition-all duration-200 border border-slate-200 dark:border-slate-700"
                    >
                      <CardHeader className="bg-blue-50 dark:bg-blue-900/20 p-4 border-b border-slate-200 dark:border-slate-700">
                        <CardTitle
                          className="text-base truncate"
                          title={savedCode.title}
                        >
                          {savedCode.title}
                        </CardTitle>
                        <CardDescription className="text-xs truncate">
                          Last updated:{" "}
                          {new Date(savedCode.updatedAt).toLocaleString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleLoadCode(savedCode.code)}
                            className="w-full sm:flex-1 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-900/20"
                          >
                            <Code className="h-4 w-4 mr-2" /> Load
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleDeleteCode(savedCode.id)}
                            className="w-full sm:flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 px-4">
                  <div className="bg-blue-50 dark:bg-blue-900/10 inline-flex items-center justify-center p-4 rounded-full mb-4">
                    <Save className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-1">
                    No Saved Projects
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Your saved Java projects will appear here. Click the "Save"
                    button to store your current code.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
