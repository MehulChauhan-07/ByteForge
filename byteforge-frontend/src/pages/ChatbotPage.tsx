import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import Navbar from "@/components/common/Navbar";
import FeatureGuard from "@/components/FeatureGuard";
import { Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm ByteBot. How can I help you with your Java learning journey today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Simulating API call to chatbot service
      // In a real implementation, you would call your backend API
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: `I'll help you with "${inputValue}". This is a placeholder response. In a real implementation, this would be a response from your Java-specialized AI assistant.`,
          isBot: true,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Content for non-authenticated users
  const nonAuthContent = (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Meet ByteBot: Your Java Learning Assistant
        </h2>
        <p className="mb-6">
          Get personalized help with Java concepts, debug your code, and receive
          guided explanations tailored to your learning level.
        </p>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium">Features:</h3>
            <ul className="mt-2 space-y-2 text-left">
              <li>• Ask questions about Java concepts</li>
              <li>• Get help debugging your code</li>
              <li>• Learn best practices and coding patterns</li>
              <li>• Receive personalized learning recommendations</li>
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
        <h1 className="text-3xl font-bold mb-6">Java Learning Assistant</h1>

        <FeatureGuard featureName="ByteBot Chatbot" fallback={nonAuthContent}>
          <div className="border rounded-lg overflow-hidden h-[70vh] flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      message.isBot
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] px-4 py-2 rounded-lg bg-muted">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <textarea
                  className="flex-1 min-h-[40px] max-h-[120px] px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ask a question about Java..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                />
                <button
                  className="bg-primary text-primary-foreground p-2 rounded-md"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send, Shift+Enter for a new line
              </p>
            </div>
          </div>
        </FeatureGuard>
      </div>
    </>
  );
};

export default ChatbotPage;
