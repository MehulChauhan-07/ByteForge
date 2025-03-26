import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Volume2, Pause } from "lucide-react";

interface ContentFormats {
  text: string;
  videoUrl?: string;
  audioUrl?: string;
  pdfUrl?: string;
}

interface MultiFormatContentProps {
  content: ContentFormats;
  title: string;
}

const MultiFormatContent: React.FC<MultiFormatContentProps> = ({ content, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { text, videoUrl, audioUrl, pdfUrl } = content;

  // For a real implementation, you would use the Web Speech API
  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
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

  return (
    <div className="mb-8">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex gap-2">
          {audioUrl && (
            <Button variant="outline" size="sm" onClick={speakText}>
              {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Volume2 className="h-4 w-4 mr-1" />}
              {isPlaying ? "Stop" : "Listen"}
            </Button>
          )}
          {pdfUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={pdfUrl} download>
                <Download className="h-4 w-4 mr-1" />
                Cheat Sheet
              </a>
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList>
          <TabsTrigger value="text">Text</TabsTrigger>
          {videoUrl && <TabsTrigger value="video">Video</TabsTrigger>}
          {audioUrl && <TabsTrigger value="audio">Audio</TabsTrigger>}
        </TabsList>
        <TabsContent value="text" className="p-4 border rounded-md mt-2">
          <div className="prose dark:prose-invert max-w-none">
            {text.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        </TabsContent>
        {videoUrl && (
          <TabsContent value="video" className="p-4 border rounded-md mt-2">
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src={videoUrl} 
                allowFullScreen 
                className="w-full h-full rounded-md"
                style={{ minHeight: "315px" }}
              ></iframe>
            </div>
          </TabsContent>
        )}
        {audioUrl && (
          <TabsContent value="audio" className="p-4 border rounded-md mt-2">
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default MultiFormatContent;