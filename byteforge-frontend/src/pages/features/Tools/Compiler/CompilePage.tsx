"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Code2,
  FileText,
  Share2,
  RefreshCw,
  Copy,
  Settings,
  Loader2,
  CheckCircle2,
  XCircle,
  Maximize2,
  Minimize2,
  Info,
  Coffee,
  Clock,
  PlayCircle,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import MonacoEditor from "@monaco-editor/react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

// Sample code for demo
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
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStats, setExecutionStats] = useState({
    startTime: 0,
    endTime: 0,
    executionTime: 0,
    executionTimeInSeconds: 0,
  });
  const [activeTab, setActiveTab] = useState("input");
  const [theme, setTheme] = useState("vs-dark");
  const [showExamples, setShowExamples] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState("14");
  const [autoComplete, setAutoComplete] = useState(true);
  const [currentFileName, setCurrentFileName] = useState("Main.java");

  const handleExecute = async () => {
    if (!user) {
      toast.error("Please log in to execute code");
      return;
    }
    const startTime = Date.now();
    setIsExecuting(true);
    setError("");
    setOutput("");
    setActiveTab("output");

    try {
      const result = await codeEditorService.executeCode({ code, input });
      const endTime = Date.now();
      const executionTime = endTime - startTime;

      setExecutionStats({
        startTime,
        endTime,
        executionTime,
        executionTimeInSeconds: executionTime / 1000,
      });

      setOutput(result.output);

      if (result.error) {
        setError(result.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to execute code");
      }
    } finally {
      toast.success("Code executed successfully");

      setIsExecuting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const handleShareCode = () => {
    const encodedCode = encodeURIComponent(code);
    const url = `${window.location.origin}/compiler?code=${encodedCode}`;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied to clipboard");
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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const formatExecutionTime = (seconds: number) => {
    if (seconds < 1) return `${(seconds * 1000).toFixed(0)}ms`;
    return `${seconds.toFixed(2)}s`;
  };

  return (
    <div
      className={`container mx-auto px-3 py-5 md:px-6 lg:px-8 max-w-7xl ${
        isFullscreen ? "fixed inset-0 z-50 bg-background" : ""
      }`}
    >
      <div className="flex flex-col gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-2"
        >
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
            <Coffee className="h-8 w-8 text-blue-600" /> Java Code Compiler
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
            className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200 text-blue-700 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800"
          >
            <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
            <span>Examples</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleThemeToggle}
            className="bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border-slate-200 text-slate-700 dark:from-slate-900/50 dark:to-slate-800/50 dark:border-slate-700"
          >
            <span>{theme === "vs-dark" ? "Light Theme" : "Dark Theme"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleResetCode}
            className="bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border-slate-200 text-slate-700 dark:from-slate-900/50 dark:to-slate-800/50 dark:border-slate-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            <span>Reset Code</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border-slate-200 text-slate-700 dark:from-slate-900/50 dark:to-slate-800/50 dark:border-slate-700"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-4 w-4 mr-2" />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4 mr-2" />
                <span>Fullscreen</span>
              </>
            )}
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
                    <Code2 className="h-4 w-4 mr-2 text-blue-500" />
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="xl:col-span-8 flex flex-col"
          >
            <Card className="flex-1 overflow-hidden border-slate-200 dark:border-slate-700 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-4 px-6 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-blue-400" />
                  <CardTitle className="flex items-center gap-2">
                    <span>{currentFileName}</span>
                    <Badge
                      variant="outline"
                      className="ml-2 text-xs font-normal"
                    >
                      Java
                    </Badge>
                  </CardTitle>
                </div>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={handleExecute}
                          disabled={isExecuting}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          size="sm"
                        >
                          {isExecuting ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Running...</span>
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
                        <p>Compile and execute Java code</p>
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

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleShareCode}
                          className="bg-transparent border-slate-500 text-white hover:bg-slate-600"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share code</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-slate-500 text-white hover:bg-slate-600"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="p-2">
                        <h4 className="mb-2 text-sm font-medium">
                          Editor Settings
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="fontsize" className="text-xs">
                              Font Size
                            </Label>
                            <Select
                              defaultValue={fontSize}
                              onValueChange={setFontSize}
                            >
                              <SelectTrigger className="h-8 w-20">
                                <SelectValue placeholder="Size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="12">12px</SelectItem>
                                <SelectItem value="14">14px</SelectItem>
                                <SelectItem value="16">16px</SelectItem>
                                <SelectItem value="18">18px</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="autocomplete" className="text-xs">
                              Auto Complete
                            </Label>
                            <Switch
                              id="autocomplete"
                              checked={autoComplete}
                              onCheckedChange={setAutoComplete}
                            />
                          </div>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleThemeToggle}>
                        {theme === "vs-dark" ? "Light Theme" : "Dark Theme"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              {/* monaco editor */}
              <CardContent className="p-0 h-[500px] relative">
                <MonacoEditor
                  height="100%"
                  language="java"
                  theme={theme}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    selectOnLineNumbers: true,
                    autoClosingBrackets: "always",
                    suggestOnTriggerCharacters: autoComplete,
                    minimap: { enabled: true },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    fontSize: parseInt(fontSize),
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="xl:col-span-4 flex flex-col gap-6"
          >
            {/* Input/Output Tabs */}
            <Card className="border-slate-200 dark:border-slate-700 shadow-md">
              <Tabs
                defaultValue="input"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-t-md">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger
                      value="input"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900"
                    >
                      <Terminal className="h-4 w-4 mr-2" />
                      Input
                    </TabsTrigger>
                    <TabsTrigger
                      value="output"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900"
                    >
                      <Code2 className="h-4 w-4 mr-2" />
                      Output
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="input" className="m-0">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-3 h-[350px] font-mono text-sm border-0 focus:ring-0 focus:outline-none resize-none bg-white dark:bg-slate-900"
                    placeholder="Enter program input here..."
                  />
                </TabsContent>
                <TabsContent value="output" className="m-0">
                  <div className="p-4 h-[350px] overflow-auto bg-white dark:bg-slate-900">
                    {isExecuting ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                          <span className="text-sm text-slate-500">
                            Compiling and executing...
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {!output && !error ? (
                          <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <PlayCircle className="h-12 w-12 mb-2 opacity-30" />
                            <p className="text-sm">
                              Run your code to see the output here
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3">
                            {/* execution time */}
                            {executionStats.executionTime > 0 && (
                              <div className="flex items-center justify-end mb-2 gap-1">
                                <Clock className="h-3 w-3 text-slate-400" />
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  Execution time:{" "}
                                  {formatExecutionTime(
                                    executionStats.executionTimeInSeconds
                                  )}
                                </span>
                              </div>
                            )}
                            {/* output of codes */}
                            {output && (
                              <div className="rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                                    Standard Output
                                  </span>
                                </div>
                                <pre className="whitespace-pre-wrap overflow-x-auto font-mono text-sm text-slate-800 dark:text-slate-200 max-h-[200px] overflow-y-auto">
                                  {output}
                                </pre>
                              </div>
                            )}
                            {error && (
                              <div className="rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <XCircle className="h-4 w-4 text-red-500" />
                                  <span className="text-xs font-medium text-red-700 dark:text-red-300">
                                    Compilation/Runtime Error
                                  </span>
                                </div>
                                <pre className="whitespace-pre-wrap break-words overflow-x-auto font-mono text-sm text-red-700 dark:text-red-300 max-h-[200px] overflow-y-auto">
                                  {error}
                                </pre>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Help & Tips Card */}
            <Card className="border-slate-200 dark:border-slate-700 shadow-md">
              <CardHeader className="bg-slate-100 dark:bg-slate-800 py-3 px-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  Tips & Shortcuts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">
                    Run Code
                  </span>
                  <Badge variant="outline" className="font-mono">
                    Ctrl + Enter
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">
                    Format Code
                  </span>
                  <Badge variant="outline" className="font-mono">
                    Shift + Alt + F
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">
                    Search
                  </span>
                  <Badge variant="outline" className="font-mono">
                    Ctrl + F
                  </Badge>
                </div>
                <div className="pt-2 text-slate-500 dark:text-slate-400 text-xs">
                  <p>
                    <span className="font-semibold">Tip:</span> Use
                    "System.out.println()" for printing output to the console.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
