"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Share2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const JAVA_TEMPLATE = `public class Main {
    public static void main(String[] args) {
        // Your Java code here
        System.out.println("Hello, ByteForge!");
    }
}`;

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

  useEffect(() => {
    if (user) {
      loadSavedCodes();
    }
  }, [user]);

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

    try {
      const result = await codeEditorService.executeCode({ code, input });
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

  const handleShareCode = () => {
    const encodedCode = encodeURIComponent(code);
    const url = `${window.location.origin}/compiler?code=${encodedCode}`;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied to clipboard");
  };

  return (
    <div className="container mx-auto px-3 py-5 md:px-6 lg:px-8 max-w-7xl">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
            <Coffee className="h-8 w-8 text-blue-600" /> Java Code Compiler
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Write, compile, and execute Java code in your browser
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Editor Section */}
          <div className="xl:col-span-8 flex flex-col">
            <Card className="flex-1 overflow-hidden border-slate-200 dark:border-slate-700 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-4 px-6 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-blue-400" />
                  <CardTitle>Java Editor</CardTitle>
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
              <CardContent className="p-0 h-[500px]">
                <MonacoEditor
                  height="100%"
                  language="java"
                  theme="vs-dark"
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
                  }}
                  loading={<Skeleton className="h-full w-full" />}
                />
              </CardContent>
            </Card>
          </div>

          {/* Input/Output Section */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            {/* Input Section */}
            <Card className="border-slate-200 dark:border-slate-700 shadow-md">
              <CardHeader className="bg-slate-100 dark:bg-slate-800 py-3 px-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  Program Input
                </CardTitle>
                <CardDescription className="text-xs">
                  Provide input for your Java program
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-3 h-[150px] font-mono text-sm border-0 focus:ring-0 focus:outline-none resize-none bg-white dark:bg-slate-900"
                  placeholder="Enter program input here..."
                />
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="border-slate-200 dark:border-slate-700 shadow-md">
              <CardHeader className="bg-slate-100 dark:bg-slate-800 py-3 px-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Code className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  Execution Results
                </CardTitle>
                <CardDescription className="text-xs">
                  Standard output and error messages
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 h-[280px] overflow-auto bg-white dark:bg-slate-900">
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
              </CardContent>
            </Card>
          </div>
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
