import React, { useState } from "react";
import { Play, RefreshCw, Copy, Check, Code as CodeIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";

interface CodePlaygroundProps {
  initialCode: string;
  language: string;
  expectedOutput?: string;
}

export const InteractiveCodePlayground = ({
  initialCode,
  language,
  expectedOutput,
}: CodePlaygroundProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "output">("code");
  const [isCopied, setIsCopied] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    try {
      // In a real implementation, this would send the code to a backend service
      // For now, we'll simulate an execution
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate output based on Java code
      if (language === "java") {
        setOutput(
          `Compiling Java code...\n> javac Main.java\n> java Main\n\n/* Execution output */\n${
            code.includes("System.out.println")
              ? "Hello, Java!"
              : "No output generated."
          }`
        );
      } else {
        setOutput(
          `Running ${language} code...\n\n/* Execution output */\nSimulated output for demonstration.`
        );
      }

      setActiveTab("output");
    } catch (error) {
      setOutput(
        `Error: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`
      );
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput("");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <div className="bg-muted p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CodeIcon className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-sm">
            {language.charAt(0).toUpperCase() + language.slice(1)} Playground
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5"
            onClick={copyCode}
          >
            {isCopied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{isCopied ? "Copied" : "Copy"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5"
            onClick={resetCode}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </Button>

          <Button
            variant="default"
            size="sm"
            className="h-8 gap-1.5"
            onClick={runCode}
            disabled={isRunning}
          >
            <Play className="h-3.5 w-3.5" />
            <span>{isRunning ? "Running..." : "Run"}</span>
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "code" | "output")}
      >
        <TabsList className="bg-muted/50 border-b rounded-none">
          <TabsTrigger value="code" className="rounded-none">
            Code
          </TabsTrigger>
          <TabsTrigger value="output" className="rounded-none">
            Output
          </TabsTrigger>
        </TabsList>

        <div className="min-h-[300px] max-h-[500px]">
          {activeTab === "code" ? (
            <Editor
              height="300px"
              language={language}
              value={code}
              onChange={(value: string | undefined) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
              }}
            />
          ) : (
            <div className="p-4 font-mono text-sm whitespace-pre-wrap h-[300px] overflow-auto bg-muted/20">
              {output ||
                'Click "Run" to execute the code and see the output here.'}
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};
