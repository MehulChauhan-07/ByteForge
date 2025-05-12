// src/pages/features/ChatbotPage.jsx
import { useState, useRef, useEffect } from "react";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I'm CodeBuddy, your programming assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();

    if (
      input.includes("hello") ||
      input.includes("hi") ||
      input.includes("hey")
    ) {
      return "Hello there! How can I assist with your coding questions today?";
    } else if (input.includes("javascript") || input.includes("js")) {
      return "JavaScript is a versatile programming language commonly used for web development. What specific aspect of JavaScript are you interested in learning about?";
    } else if (input.includes("react")) {
      return "React is a popular JavaScript library for building user interfaces. It uses a component-based architecture and virtual DOM for efficient rendering. Do you have a specific React question?";
    } else if (input.includes("css")) {
      return "CSS (Cascading Style Sheets) is used for styling web pages. Are you looking for help with layouts, animations, or something else?";
    } else if (input.includes("python")) {
      return "Python is known for its readability and versatility. It's great for beginners and also powerful enough for advanced applications like data science and machine learning.";
    } else if (input.includes("thank")) {
      return "You're welcome! Let me know if you have any other questions.";
    } else {
      return "That's an interesting question about programming. Could you provide more details so I can give you a more specific answer?";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">CodeBuddy AI Chatbot</h1>

      <div className="bg-gray-50 border rounded-md h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-3/4 rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="border-t p-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about programming..."
            className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Chatbot Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Get quick answers to programming questions</li>
          <li>Learn coding concepts through conversational AI</li>
          <li>Code suggestions and debugging help</li>
          <li>Personalized learning recommendations (premium feature)</li>
          <li>Access to enhanced AI capabilities (premium feature)</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatbotPage;
