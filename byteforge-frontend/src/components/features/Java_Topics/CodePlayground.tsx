import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodePlaygroundProps {
  initialCode: string;
  readOnly?: boolean;
  height?: string;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode,
  readOnly = false,
  height = "300px"
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("code");

  const runCode = async () => {
    setIsLoading(true);
    setCurrentTab("output");

    try {
      // For now, we'll simulate execution since we don't have a backend
      // In a real implementation, you would send the code to a backend service
      setOutput("Compiling code...\n");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (code.includes("System.out.println")) {
        // Extract the text inside println
        const regex = /System\.out\.println\("(.+?)"\)/g;
        const matches = [...code.matchAll(regex)];
        
        let simulatedOutput = "";
        for (const match of matches) {
          simulatedOutput += match[1] + "\n";
        }
        
        setOutput(simulatedOutput || "Program executed successfully!");
      } else {
        setOutput("Program executed without output.\nTip: Use System.out.println() to see output.");
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-slate-100 dark:bg-slate-800 p-2 border-b flex justify-between items-center">
        <h3 className="text-sm font-medium">Interactive Code Playground</h3>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setCode(initialCode)}
          >
            Reset
          </Button>
          <Button 
            size="sm" 
            onClick={runCode} 
            disabled={isLoading}
          >
            {isLoading ? "Running..." : "Run Code"}
          </Button>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="bg-slate-50 dark:bg-slate-900 p-0 border-b">
          <TabsTrigger value="code" className="rounded-none">Code</TabsTrigger>
          <TabsTrigger value="output" className="rounded-none">Output</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="p-0 m-0">
          <div className="p-0 bg-slate-50 dark:bg-slate-900">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-sm p-4 w-full bg-transparent outline-none resize-none"
              style={{ height, minHeight: "200px" }}
              readOnly={readOnly}
            />
          </div>
        </TabsContent>
        <TabsContent value="output" className="p-0 m-0">
          <div className="p-4 bg-black text-green-400 font-mono text-sm" style={{ height, minHeight: "200px", overflowY: "auto" }}>
            <pre>{output}</pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodePlayground;