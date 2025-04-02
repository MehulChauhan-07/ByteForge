import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Save, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface CodePlaygroundProps {
  initialCode: string;
  readOnly?: boolean;
  height?: string;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode,
  readOnly = false,
  height = "300px",
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("code");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle tab key in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + "    " + code.substring(end);
      setCode(newCode);
      // Set cursor position after the inserted tab
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
          start + 4;
      }, 0);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [code]);

  const runCode = async () => {
    setIsLoading(true);
    setCurrentTab("output");

    try {
      setOutput("Compiling code...\n");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (code.includes("System.out.println")) {
        const regex = /System\.out\.println\("(.+?)"\)/g;
        const matches = [...code.matchAll(regex)];

        let simulatedOutput = "";
        for (const match of matches) {
          simulatedOutput += match[1] + "\n";
        }

        setOutput(simulatedOutput || "Program executed successfully!");
      } else {
        setOutput(
          "Program executed without output.\nTip: Use System.out.println() to see output."
        );
      }
    } catch (error) {
      setOutput(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  const handleSave = () => {
    // In a real app, this would save to a backend
    setSaved(true);
    toast.success("Code saved successfully!");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      className="border rounded-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-slate-100 dark:bg-slate-800 p-2 border-b flex justify-between items-center">
        <h3 className="text-sm font-medium">Interactive Code Playground</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCode(initialCode)}
            className="flex items-center gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="flex items-center gap-1"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleSave}
            className="flex items-center gap-1"
          >
            {saved ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saved ? "Saved!" : "Save"}
          </Button>
          <Button
            size="sm"
            onClick={runCode}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <Play className="w-4 h-4" />
            {isLoading ? "Running..." : "Run Code"}
          </Button>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="bg-slate-50 dark:bg-slate-900 p-0 border-b">
          <TabsTrigger value="code" className="rounded-none">
            Code
          </TabsTrigger>
          <TabsTrigger value="output" className="rounded-none">
            Output
          </TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="p-0 m-0">
          <div className="p-0 bg-slate-50 dark:bg-slate-900 relative">
            {/* Line numbers */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-100 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-2 select-none">
              {code.split("\n").map((_, i) => (
                <div
                  key={i}
                  className="text-xs text-slate-500 dark:text-slate-400 text-right"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="font-mono text-sm p-4 w-full bg-transparent outline-none resize-none pl-16"
              style={{ height, minHeight: "200px" }}
              readOnly={readOnly}
              spellCheck={false}
            />
          </div>
        </TabsContent>
        <TabsContent value="output" className="p-0 m-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={output}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-black text-green-400 font-mono text-sm"
              style={{ height, minHeight: "200px", overflowY: "auto" }}
            >
              <pre>{output}</pre>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default CodePlayground;
