import React, { useEffect, useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Code, List, Text } from "lucide-react";

interface EditorProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

type BlockType = "text" | "todo" | "code";

interface Block {
  id: string;
  type: BlockType;
  content: string;
  completed?: boolean;
}

const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  placeholder,
  readOnly = false,
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  // Parse value when it changes - handle both JSON and plain text
  useEffect(() => {
    try {
      // Try to parse the value as JSON first
      const parsedBlocks = value ? JSON.parse(value) : [];
      setBlocks(parsedBlocks);
    } catch (error) {
      // If parsing fails, treat the value as plain text and create a single text block
      if (value && value.trim() !== "") {
        setBlocks([
          {
            id: "default-text",
            type: "text",
            content: value,
          },
        ]);
      } else {
        setBlocks([]);
      }
      console.log("Using plain text mode for editor content");
    }
  }, [value]);

  // Rest of your code remains the same
  const addBlock = (type: BlockType) => {
    if (readOnly) return;

    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: "",
      ...(type === "todo" && { completed: false }),
    };
    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);

    // Automatically save changes when adding blocks
    onChange?.(JSON.stringify(updatedBlocks));
  };

  // ...rest of your existing methods

  // Render blocks differently based on readOnly mode
  const renderBlock = (block: Block) => {
    switch (block.type) {
      case "text":
        return readOnly ? (
          <div>{block.content}</div>
        ) : (
          <Textarea 
            value={block.content} 
            onChange={(e) => updateBlockContent(block.id, e.target.value)} 
            placeholder="Type some text..."
          />
        );
      case "todo":
        return readOnly ? (
          <div className={block.completed ? "line-through" : ""}>
            {block.content}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Input 
              type="checkbox" 
              checked={block.completed} 
              onChange={() => toggleTodo(block.id)}
              className="w-4 h-4"
            />
            <Input 
              value={block.content} 
              onChange={(e) => updateBlockContent(block.id, e.target.value)} 
              placeholder="To-do item..."
            />
          </div>
        );
      case "code":
        return readOnly ? (
          <pre className="bg-gray-800 text-white p-2 rounded">{block.content}</pre>
        ) : (
          <Textarea 
            value={block.content} 
            onChange={(e) => updateBlockContent(block.id, e.target.value)} 
            placeholder="Code block..." 
            className="font-mono"
          />
        );
      default:
        return <div>{block.content}</div>;
    }
  };

  const updateBlockContent = (id: string, content: string) => {
    if (readOnly) return;
    
    const updatedBlocks = blocks.map(block => 
      block.id === id ? { ...block, content } : block
    );
    
    setBlocks(updatedBlocks);
    onChange?.(JSON.stringify(updatedBlocks));
  };
  
  const toggleTodo = (id: string) => {
    if (readOnly) return;
    
    const updatedBlocks = blocks.map(block => 
      block.id === id ? { ...block, completed: !block.completed } : block
    );
    
    setBlocks(updatedBlocks);
    onChange?.(JSON.stringify(updatedBlocks));
  };

  function handleSave(event: MouseEvent<HTMLButtonElement>): void {
    onChange?.(JSON.stringify(blocks));
  }

  return (
    <div className="space-y-4">
      {/* Only show toolbar in edit mode */}
      {!readOnly && (
        <div className="flex gap-2 mb-4">
          <Button variant="outline" onClick={() => addBlock("text")}>
            <Text className="mr-2 h-4 w-4" />
            Text
          </Button>
          <Button variant="outline" onClick={() => addBlock("todo")}>
            <List className="mr-2 h-4 w-4" />
            To-Do
          </Button>
          <Button variant="outline" onClick={() => addBlock("code")}>
            <Code className="mr-2 h-4 w-4" />
            Code
          </Button>
        </div>
      )}
      {/* Blocks */}
      <div className="space-y-2">
        {blocks.length > 0 ? (
          blocks.map((block) => (
            <div
              key={block.id}
              className={`p-3 border rounded-md ${
                readOnly ? "bg-transparent" : "bg-gray-100"
              }`}
            >
              {renderBlock(block)}
            </div>
          ))
        ) : (
          <div className="text-muted-foreground">
            {readOnly ? "No content" : "Add a block to get started"}
          </div>
        )}
      </div>
      {/* Only show save button in edit mode */}
      {!readOnly && onChange && <Button onClick={handleSave}>Save</Button>}{" "}
    </div>
  );
};

export default Editor;
