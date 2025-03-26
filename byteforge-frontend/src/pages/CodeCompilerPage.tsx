import React, { useState } from "react";
import Navbar from "@/components/common/Navbar";
import FeatureGuard from "@/components/FeatureGuard";
import { Play, Download, Copy, Check, ChevronDown } from "lucide-react";

const defaultJavaCode = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, ByteForge!");
    }
}`;

const CodeCompilerPage: React.FC = () => {
  const [code, setCode] = useState(defaultJavaCode);
  const [output, setOutput] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCompile = () => {
    setIsCompiling(true);
    setOutput("");

    // Simulate API call to compile service
    setTimeout(() => {
      setOutput("Hello, ByteForge!\n\nProcess finished with exit code 0");
      setIsCompiling(false);
    }, 1500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `byteforge_code.${
      selectedLanguage === "java" ? "java" : "txt"
    }`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Content for non-authenticated users
  const nonAuthContent = (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold mb-4">Java Code Compiler</h2>
        <p className="mb-6">
          Write, compile, and run Java code directly in your browser. Perfect
          for practice and testing your knowledge.
        </p>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium">Features:</h3>
            <ul className="mt-2 space-y-2 text-left">
              <li>• Syntax highlighting</li>
              <li>• Real-time compilation</li>
              <li>• Save and share your code</li>
              <li>• Multiple Java versions support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6">Code Playground</h1>

        <FeatureGuard featureName="Code Compiler" fallback={nonAuthContent}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Code Editor */}
            <div className="border rounded-lg overflow-hidden flex flex-col">
              <div className="bg-muted p-2 border-b flex items-center justify-between">
                <div className="relative">
                  <button
                    className="flex items-center gap-1 text-sm px-2 py-1 rounded hover:bg-background"
                    onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  >
                    {selectedLanguage === "java" ? "Java" : "Java"}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {languageMenuOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-background border rounded-md shadow-md z-10">
                      <button
                        className="block w-full text-left px-3 py-2 hover:bg-muted text-sm"
                        onClick={() => {
                          setSelectedLanguage("java");
                          setLanguageMenuOpen(false);
                        }}
                      >
                        Java
                      </button>
                      <button
                        className="block w-full text-left px-3 py-2 hover:bg-muted text-sm opacity-50"
                        disabled
                      >
                        Python (Coming Soon)
                      </button>
                      <button
                        className="block w-full text-left px-3 py-2 hover:bg-muted text-sm opacity-50"
                        disabled
                      >
                        JavaScript (Coming Soon)
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="text-sm p-1 rounded hover:bg-background"
                    onClick={handleCopyCode}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    className="text-sm p-1 rounded hover:bg-background"
                    onClick={handleDownloadCode}
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <textarea
                className="flex-1 p-4 font-mono text-sm resize-none w-full focus:outline-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                style={{ minHeight: "400px" }}
              />
              <div className="bg-muted p-2 border-t flex justify-end">
                <button
                  className="bg-primary text-primary-foreground px-3 py-1 rounded flex items-center gap-1 text-sm"
                  onClick={handleCompile}
                  disabled={isCompiling}
                >
                  <Play className="h-4 w-4" />
                  {isCompiling ? "Compiling..." : "Run"}
                </button>
              </div>
            </div>

            {/* Output Console */}
            <div className="border rounded-lg overflow-hidden flex flex-col">
              <div className="bg-muted p-2 border-b">
                <h2 className="font-medium">Output</h2>
              </div>
              <div
                className="flex-1 p-4 font-mono text-sm bg-gray-900 text-gray-100 overflow-auto"
                style={{ minHeight: "400px" }}
              >
                {isCompiling ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Compiling...</span>
                  </div>
                ) : output ? (
                  <pre>{output}</pre>
                ) : (
                  <span className="text-gray-500">
                    Run your code to see the output here
                  </span>
                )}
              </div>
            </div>
          </div>
        </FeatureGuard>
      </div>
    </>
  );
};

export default CodeCompilerPage;
