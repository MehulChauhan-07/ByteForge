import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface CodeEditorProps {
  code: string;
  language?: string;
  readOnly?: boolean;
  className?: string;
  onCodeChange?: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language = "java",
  readOnly = false,
  className = "",
  onCodeChange,
}) => {
  const [editorCode, setEditorCode] = useState(code);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorCode(value);
      if (onCodeChange) {
        onCodeChange(value);
      }
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Code Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] border rounded-md overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage={language}
            value={editorCode}
            onChange={handleEditorChange}
            options={{
              readOnly,
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
