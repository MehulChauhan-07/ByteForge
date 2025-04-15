import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import MonacoEditor from "@monaco-editor/react";
import {
  executeCode,
  saveCode,
  getSavedCodes,
  deleteCode,
} from "@/services/codeEditorService";

const languages = [
  { value: "java", label: "Java" },
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "cpp", label: "C++" },
];

export default function CompilerPage() {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("java");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedCodes, setSavedCodes] = useState<
    Array<{ id: string; title: string; code: string }>
  >([]);

  useEffect(() => {
    loadSavedCodes();
  }, []);

  const loadSavedCodes = async () => {
    try {
      const codes = await getSavedCodes();
      setSavedCodes(codes);
    } catch (error) {
      toast.error("Failed to load saved codes");
    }
  };

  const handleExecute = async () => {
    setIsLoading(true);
    setError("");
    setOutput("");

    try {
      const result = await executeCode({ code, language, input });
      setOutput(result.output);
      if (result.error) {
        setError(result.error);
      }
    } catch (error) {
      toast.error("Failed to execute code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    const title = prompt("Enter a title for your code:");
    if (!title) return;

    try {
      await saveCode(code, title);
      toast.success("Code saved successfully");
      loadSavedCodes();
    } catch (error) {
      toast.error("Failed to save code");
    }
  };

  const handleLoadCode = (savedCode: string) => {
    setCode(savedCode);
  };

  const handleDeleteCode = async (id: string) => {
    try {
      await deleteCode(id);
      toast.success("Code deleted successfully");
      loadSavedCodes();
    } catch (error) {
      toast.error("Failed to delete code");
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Code Editor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded-md p-2"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <Button onClick={handleExecute} disabled={isLoading}>
              {isLoading ? "Executing..." : "Execute"}
            </Button>
            <Button variant="outline" onClick={handleSave}>
              Save Code
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Code</h3>
              <MonacoEditor
                height="400px"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  selectOnLineNumbers: true,
                  autoClosingBrackets: "always",
                  suggestOnTriggerCharacters: true,
                }}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Input</h3>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-2 h-[200px] border rounded-md"
                placeholder="Enter input here..."
              />
              <h3 className="text-lg font-semibold">Output</h3>
              <div className="h-[200px] p-2 border rounded-md bg-gray-50">
                <pre className="whitespace-pre-wrap">{output}</pre>
                {error && <pre className="text-red-500">{error}</pre>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saved Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedCodes.map((savedCode) => (
              <Card key={savedCode.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{savedCode.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => handleLoadCode(savedCode.code)}
                  >
                    Load
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteCode(savedCode.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
