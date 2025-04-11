// src/pages/features/CompilerPage.jsx
import { SetStateAction, useState } from "react";

const CompilerPage = () => {
  const [code, setCode] = useState('console.log("Hello, world!");');
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isCompiling, setIsCompiling] = useState(false);

  const handleCodeChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setCode(e.target.value);
  };

  const handleLanguageChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setLanguage(e.target.value);
  };

  const handleRunCode = () => {
    setIsCompiling(true);
    // Simulate compilation/execution
    setTimeout(() => {
      try {
        if (language === "javascript") {
          // For demo purposes, we're using eval - in a real implementation,
          // you would use a secure sandbox or backend service
          let consoleOutput = "";
          const originalConsoleLog = console.log;

          // Override console.log to capture output
          console.log = (...args) => {
            consoleOutput += args.join(" ") + "\n";
          };

          // Execute code
          eval(code);

          // Restore console.log
          console.log = originalConsoleLog;

          setOutput(
            consoleOutput || "Code executed successfully with no output."
          );
        } else {
          setOutput(
            `Compilation for ${language} would be handled on the backend.`
          );
        }
      } catch (error) {
        setOutput(
          `Error: ${
            error instanceof Error ? error.message : "An unknown error occurred"
          }`
        );
      }
      setIsCompiling(false);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Code Compiler</h1>

      <div className="flex mb-4">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="px-4 py-2 border rounded-md mr-4"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>

        <button
          onClick={handleRunCode}
          disabled={isCompiling}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          {isCompiling ? "Running..." : "Run Code"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-md">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-t-md">
            Code Editor
          </div>
          <textarea
            value={code}
            onChange={handleCodeChange}
            className="w-full h-80 p-4 font-mono text-sm border-0 focus:ring-0"
            placeholder="Write your code here..."
          />
        </div>

        <div className="border rounded-md">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-t-md">
            Output
          </div>
          <div className="h-80 p-4 font-mono text-sm bg-gray-100 overflow-auto">
            {output || "Run your code to see output here..."}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Compiler Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Real-time syntax highlighting (not implemented in this demo)</li>
          <li>Multiple language support</li>
          <li>Error reporting</li>
          <li>Save and share your code snippets (premium feature)</li>
        </ul>
      </div>
    </div>
  );
};

export default CompilerPage;
