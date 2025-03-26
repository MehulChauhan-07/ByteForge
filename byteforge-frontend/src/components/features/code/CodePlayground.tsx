// "use client";

// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { PlayIcon, CopyIcon, RefreshCwIcon } from "lucide-react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// interface CodePlaygroundProps {
//   initialCode: string;
//   defaultOutput?: string;
//   language?: string;
// }

// const CodePlayground: React.FC<CodePlaygroundProps> = ({
//   initialCode,
//   defaultOutput = "// Output will appear here",
//   language = "java",
// }) => {
//   const [code, setCode] = useState(initialCode);
//   const [output, setOutput] = useState(defaultOutput);
//   const [isRunning, setIsRunning] = useState(false);

//   // Reset code to initial state
//   const handleReset = () => {
//     setCode(initialCode);
//     setOutput(defaultOutput);
//   };

//   // Copy code to clipboard
//   const handleCopy = () => {
//     navigator.clipboard.writeText(code);
//   };

//   // Simulated code execution
//   const runCode = () => {
//     setIsRunning(true);
//     setOutput("Running code...");

//     setTimeout(() => {
//       try {
//         // This is a simplified simulation of Java code execution
//         // In a real implementation, you'd want to send the code to a backend service
//         const result = simulateJavaExecution(code);
//         setOutput(result);
//       } catch (error) {
//         setOutput(
//           `Error: ${error instanceof Error ? error.message : String(error)}`
//         );
//       } finally {
//         setIsRunning(false);
//       }
//     }, 1000);
//   };

//   // Simple simulation of Java code execution
//   // Note: This is just a basic simulation with predefined outputs for demo purposes
//   const simulateJavaExecution = (javaCode: string): string => {
//     // Check for print statements
//     const printMatches = javaCode.match(/System\.out\.println\("(.+?)"\)/g);
//     if (printMatches) {
//       return printMatches
//         .map((match) => {
//           const content = match.match(/System\.out\.println\("(.+?)"\)/);
//           return content ? content[1] : "";
//         })
//         .join("\n");
//     }

//     // Check for variable declarations
//     if (
//       javaCode.includes("int") ||
//       javaCode.includes("String") ||
//       javaCode.includes("double")
//     ) {
//       return "Variables declared successfully!";
//     }

//     // Check for if statements
//     if (javaCode.includes("if") && javaCode.includes("else")) {
//       return "Conditional logic evaluated!";
//     }

//     // Check for loops
//     if (javaCode.includes("for") || javaCode.includes("while")) {
//       return "Loop executed successfully!";
//     }

//     // Default response
//     return "Code executed successfully!";
//   };

//   return (
//     <div className="border rounded-md overflow-hidden bg-slate-50 dark:bg-slate-900">
//       <Tabs defaultValue="code">
//         <div className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-800 border-b">
//           <TabsList>
//             <TabsTrigger value="code">Code</TabsTrigger>
//             <TabsTrigger value="output">Output</TabsTrigger>
//           </TabsList>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleCopy}
//               title="Copy code"
//             >
//               <CopyIcon className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleReset}
//               title="Reset code"
//             >
//               <RefreshCwIcon className="h-4 w-4" />
//             </Button>
//             <Button
//               size="sm"
//               onClick={runCode}
//               disabled={isRunning}
//               className="flex items-center gap-1"
//             >
//               <PlayIcon className="h-4 w-4" />
//               Run
//             </Button>
//           </div>
//         </div>

//         <TabsContent value="code" className="m-0">
//           <div className="relative min-h-[200px]">
//             <textarea
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//               className="w-full min-h-[200px] p-4 font-mono text-sm focus:outline-none bg-slate-50 dark:bg-slate-900 resize-y"
//               spellCheck="false"
//             />
//           </div>
//         </TabsContent>

//         <TabsContent value="output" className="m-0">
//           <div className="p-4 font-mono text-sm min-h-[200px] bg-slate-50 dark:bg-slate-900 whitespace-pre-wrap">
//             {output}
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default CodePlayground;
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
  height = "300px",
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

      await new Promise((resolve) => setTimeout(resolve, 1000));

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
          <Button size="sm" onClick={runCode} disabled={isLoading}>
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
          <div
            className="p-4 bg-black text-green-400 font-mono text-sm"
            style={{ height, minHeight: "200px", overflowY: "auto" }}
          >
            <pre>{output}</pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodePlayground;
