import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Save,
  Code2,
  FileText,
  Share2,
  PanelLeft,
  TerminalSquare,
  List,
  RefreshCw,
  Download,
  Copy,
  Settings,
  MoreVertical,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Trash2,
  PenLine,
  Folder,
  ChevronDown,
  ArrowUpRight,
  XCircle,
  Maximize2,
  Minimize2,
  PlusCircle,
  Info,
  RotateCw,
  Coffee,
  Clock,
  PlayCircle,
  Bookmark,
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
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import MonacoEditor from "@monaco-editor/react";
import codeEditorService, { SavedCode } from "@/services/codeEditorService";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

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

// Mock file system
const mockFiles = [
  {
    id: 1,
    name: "Main.java",
    type: "java",
    lastModified: "2025-05-09T14:30:00Z",
    current: true,
  },
  {
    id: 2,
    name: "Calculator.java",
    type: "java",
    lastModified: "2025-05-07T10:15:00Z",
    current: false,
  },
  {
    id: 3,
    name: "README.md",
    type: "markdown",
    lastModified: "2025-05-05T09:30:00Z",
    current: false,
  },
  {
    id: 4,
    name: "config.properties",
    type: "properties",
    lastModified: "2025-05-03T16:45:00Z",
    current: false,
  },
];

// Mock projects
const mockProjects = [
  { id: 1, name: "Java Basics", files: 4, current: true },
  { id: 2, name: "OOP Examples", files: 7, current: false },
  { id: 3, name: "Algorithm Practice", files: 12, current: false },
];

export default function CompilerPage_v1() {
  const { user } = useAuth();
  const [code, setCode] = useState(JAVA_TEMPLATE);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [executionStats, setExecutionStats] = useState({
    startTime: 0,
    endTime: 0,
    executionTime: 0,
    executionTimeInSeconds: 0,
  });
  const [activeTab, setActiveTab] = useState("input");
  const [theme, setTheme] = useState("vs-dark");
  const [showExamples, setShowExamples] = useState(false);
  const [showFilePanel, setShowFilePanel] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState("14");
  const [showSettings, setShowSettings] = useState(false);
  const [autoComplete, setAutoComplete] = useState(true);
  const [formatOnSave, setFormatOnSave] = useState(true);
  const [files, setFiles] = useState(mockFiles);
  const [projects, setProjects] = useState(mockProjects);
  const [currentFileName, setCurrentFileName] = useState("Main.java");
  const [savedCodes, setSavedCodes] = useState<SavedCode[]>([]);
  const [isCodeSaving, setIsCodeSaving] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [codeTitle, setCodeTitle] = useState("");

  const executionAbortController = useRef<AbortController | null>(null);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "java":
        return <Code2 className="h-4 w-4 text-orange-500" />;
      case "markdown":
        return <FileText className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedCodes();
    }
  }, [user]);

  const fetchSavedCodes = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const codes = await codeEditorService.getSavedCodes();
      setSavedCodes(codes);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to fetch saved codes");
      }
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSaveCode = async () => {
    if (!user) {
      toast.error("Please log in to save code");
      return;
    }

    try {
      setIsCodeSaving(true);
      await codeEditorService.saveCode(code, codeTitle || currentFileName);
      setShowSaveDialog(false);
      setCodeTitle("");
      await fetchSavedCodes();
      toast.success("Code saved successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to save code");
      }
    } finally {
      setIsCodeSaving(false);
    }
  };

  const handleDeleteCode = async (id: string) => {
    if (!user) return;

    try {
      await codeEditorService.deleteCode(id);
      await fetchSavedCodes();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete code");
      }
    }
  };

  const handleLoadSavedCode = (savedCode: SavedCode) => {
    setCode(savedCode.code);
    setCurrentFileName(savedCode.title);
    toast.success(`Loaded: ${savedCode.title}`);
  };

  const toggleFilePanel = () => {
    setShowFilePanel(!showFilePanel);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const formatExecutionTime = (seconds: number) => {
    if (seconds < 1) return `${(seconds * 1000).toFixed(0)}ms`;
    return `${seconds.toFixed(2)}s`;
  };

  const switchFile = (fileId: number) => {
    const updatedFiles = files.map((file) => ({
      ...file,
      current: file.id === fileId,
    }));

    const selectedFile = files.find((file) => file.id === fileId);
    if (selectedFile) {
      setCurrentFileName(selectedFile.name);
    }

    setFiles(updatedFiles);
  };

  const switchProject = (projectId: number) => {
    const updatedProjects = projects.map((project) => ({
      ...project,
      current: project.id === projectId,
    }));
    setProjects(updatedProjects);
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
            onClick={toggleFilePanel}
            className="bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border-slate-200 text-slate-700 dark:from-slate-900/50 dark:to-slate-800/50 dark:border-slate-700"
          >
            <PanelLeft
              className={`h-4 w-4 mr-2 ${!showFilePanel ? "rotate-180" : ""}`}
            />
            <span>{showFilePanel ? "Hide Files" : "Show Files"}</span>
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
          {/* File Explorer (Optional) */}
          {showFilePanel && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:col-span-2 flex flex-col gap-4"
            >
              {/* Projects Section */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Folder className="h-4 w-4 text-blue-500" />
                      <span>Projects</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-2 py-1">
                  <ul className="space-y-1">
                    {projects.map((project) => (
                      <li key={project.id}>
                        <button
                          onClick={() => switchProject(project.id)}
                          className={`w-full text-left px-2 py-1.5 rounded-md text-sm flex items-center justify-between ${
                            project.current
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800/50"
                          }`}
                        >
                          <span className="truncate">{project.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {project.files}
                          </Badge>
                        </button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Files Section */}
              <Card className="border-slate-200 dark:border-slate-700 flex-1">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-orange-500" />
                      <span>Files</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-2 py-1">
                  <ul className="space-y-1">
                    {files.map((file) => (
                      <li key={file.id}>
                        <button
                          onClick={() => switchFile(file.id)}
                          className={`w-full text-left px-2 py-1.5 rounded-md text-sm flex items-center justify-between ${
                            file.current
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800/50"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {getFileIcon(file.type)}
                            <span className="truncate">{file.name}</span>
                          </div>
                          <span className="text-xs text-slate-400">
                            {formatDate(file.lastModified).split(",")[0]}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Saved Code Section */}
              {user && (
                <Card className="border-slate-200 dark:border-slate-700">
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bookmark className="h-4 w-4 text-purple-500" />
                        <span>Saved Code</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => fetchSavedCodes()}
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-2 py-1">
                    {isLoading ? (
                      <div className="space-y-2 py-1">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                      </div>
                    ) : savedCodes.length === 0 ? (
                      <div className="text-center py-4 text-sm text-slate-500">
                        No saved code found
                      </div>
                    ) : (
                      <ul className="space-y-1">
                        {savedCodes.map((savedCode) => (
                          <li key={savedCode.id}>
                            <div className="w-full text-left px-2 py-1.5 rounded-md text-sm flex items-center justify-between group hover:bg-slate-100 dark:hover:bg-slate-800/50">
                              <button
                                onClick={() => handleLoadSavedCode(savedCode)}
                                className="flex-1 flex items-center gap-2 truncate text-left"
                              >
                                <Code2 className="h-4 w-4 text-blue-500" />
                                <span className="truncate">
                                  {savedCode.title}
                                </span>
                              </button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleDeleteCode(savedCode.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5 text-red-500" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {/* Editor Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${
              showFilePanel ? "xl:col-span-6" : "xl:col-span-8"
            } flex flex-col`}
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
                          onClick={() => setShowSaveDialog(true)}
                          disabled={!user}
                          className="bg-transparent border-slate-500 text-white hover:bg-slate-600"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Save code to your account</p>
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
                          <div className="flex items-center justify-between">
                            <Label htmlFor="formatOnSave" className="text-xs">
                              Format on Save
                            </Label>
                            <Switch
                              id="formatOnSave"
                              checked={formatOnSave}
                              onCheckedChange={setFormatOnSave}
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

            {/* Save Dialog */}
            <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Code</DialogTitle>
                  <DialogDescription>
                    Give your code snippet a title to save it to your account.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., Fibonacci Sequence"
                      className="col-span-3"
                      value={codeTitle}
                      onChange={(e) => setCodeTitle(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowSaveDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveCode} disabled={isCodeSaving}>
                    {isCodeSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">
                    Save
                  </span>
                  <Badge variant="outline" className="font-mono">
                    Ctrl + S
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
