import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Pause } from "lucide-react";

interface MultiFormatContentProps {
  content: {
    title: string;
    content: string;
  };
  title?: string; // Make title optional as it's included in content
}

const MultiFormatContent: React.FC<MultiFormatContentProps> = ({ content }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { title, content: textContent } = content;

  // For a real implementation, you would use the Web Speech API
  const speakText = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(textContent);
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);

        utterance.onend = () => {
          setIsPlaying(false);
        };
      }
    }
  };

  // This function processes text to handle code blocks which are wrapped in ```
  const renderFormattedContent = () => {
    if (!textContent) return null;

    // Split by code blocks
    const parts = textContent.split("```");

    return parts.map((part, index) => {
      // Even indices are regular text, odd indices are code blocks
      if (index % 2 === 0) {
        return (
          <div key={index} className="mb-4">
            {part.split("\n\n").map((paragraph, pIdx) => (
              <p key={`p-${index}-${pIdx}`} className="mb-4">
                {paragraph.split("\n").map((line, lIdx) => (
                  <span key={`l-${index}-${pIdx}-${lIdx}`}>
                    {line}
                    {lIdx < paragraph.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </p>
            ))}
          </div>
        );
      } else {
        // This is a code block
        const lines = part.split("\n");
        const language = lines[0] || "text";
        const code = lines.slice(1).join("\n");

        return (
          <div key={index} className="mb-6">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-t-md px-4 py-2 text-xs font-mono">
              {language}
            </div>
            <pre className="bg-slate-50 dark:bg-slate-900 p-4 rounded-b-md overflow-x-auto">
              <code className="text-sm font-mono whitespace-pre-wrap">
                {code}
              </code>
            </pre>
          </div>
        );
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium">{title}</h3>

        <Button
          variant="outline"
          size="sm"
          onClick={speakText}
          className="flex items-center gap-1"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 mr-1" />
          ) : (
            <Volume2 className="h-4 w-4 mr-1" />
          )}
          {isPlaying ? "Stop" : "Listen"}
        </Button>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        {renderFormattedContent()}
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border mt-8">
        <h4 className="font-semibold mb-2">Key Takeaways</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Java is strongly typed, requiring explicit variable declarations.
          </li>
          <li>
            Java is platform-independent with its "write once, run anywhere"
            capability.
          </li>
          <li>
            Java is object-oriented with automatic memory management via garbage
            collection.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MultiFormatContent;
