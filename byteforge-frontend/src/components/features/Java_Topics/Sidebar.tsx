import { useState } from "react";
import { Link } from "react-router-dom";
import { topics } from "@/data/topics";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const Sidebar = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  return (
    <div className="flex flex-col w-full h-full border-r p-4 space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Topics</h2>
        <ul className="space-y-1">
          {topics.map((topic) => (
            <li key={topic.id}>
              <Button
                variant="ghost"
                size="sm"
                className={`w-full text-left ${
                  selectedTopic.id === topic.id ? "text-primary" : ""
                }`}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic.title}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle>{selectedTopic.title}</CardTitle>
            <CardDescription>{selectedTopic.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedTopic.id === "java-basics" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Introduction to Java</h3>
                <p>
                  Java is a high-level, class-based, object-oriented programming
                  language that is designed to have as few implementation
                  dependencies as possible. It is a general-purpose programming
                  language intended to let application developers write once,
                  run anywhere (WORA), meaning that compiled Java code can run
                  on all platforms that support Java without the need for
                  recompilation.
                </p>
                <h3 className="text-lg font-semibold">Variables</h3>
                <p>
                  Variables are containers for storing data values. In Java,
                  each variable must be declared with a data type that specifies
                  the type of data it can store.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>int:</strong> Stores integers (whole numbers),
                    without decimals, such as 123 or -123.
                  </li>
                  <li>
                    <strong>float:</strong> Stores floating-point numbers, with
                    decimals, such as 19.99 or -19.99.
                  </li>
                  <li>
                    <strong>char:</strong> Stores single characters, such as 'a'
                    or 'B'. Char values are surrounded by single quotes.
                  </li>
                  <li>
                    <strong>String:</strong> Stores text, such as "Hello".
                    String values are surrounded by double quotes.
                  </li>
                </ul>
              </div>
            )}
            {/* Add more detailed content for other topics as needed */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sidebar;
