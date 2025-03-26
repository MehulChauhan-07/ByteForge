import { useEffect, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";

interface MemoryAllocationDiagramProps {
  title: string;
}

const MemoryAllocationDiagram: React.FC<MemoryAllocationDiagramProps> = ({
  title,
}) => {
  const [step, setStep] = useState(0);

  // Define memory allocation steps
  const steps = [
    {
      description: "Variable declaration: int x;",
      nodes: [
        {
          id: "1",
          data: { label: "Stack Memory" },
          position: { x: 100, y: 50 },
          style: {
            width: 180,
            height: 40,
            backgroundColor: "#f0f4f8",
            borderColor: "#cbd5e1",
          },
        },
        {
          id: "2",
          data: { label: "x (not initialized)" },
          position: { x: 100, y: 150 },
          style: {
            width: 180,
            padding: "10px",
            backgroundColor: "#fef3c7",
            borderColor: "#fbbf24",
          },
        },
        {
          id: "3",
          data: { label: "Heap Memory" },
          position: { x: 400, y: 50 },
          style: {
            width: 180,
            height: 40,
            backgroundColor: "#f0f4f8",
            borderColor: "#cbd5e1",
          },
        },
      ] as Node[],
      edges: [] as Edge[],
    },
    {
      description: "Variable assignment: x = 42;",
      nodes: [
        {
          id: "1",
          data: { label: "Stack Memory" },
          position: { x: 100, y: 50 },
          style: {
            width: 180,
            height: 40,
            backgroundColor: "#f0f4f8",
            borderColor: "#cbd5e1",
          },
        },
        {
          id: "2",
          data: { label: "x = 42" },
          position: { x: 100, y: 150 },
          style: {
            width: 180,
            padding: "10px",
            backgroundColor: "#dcfce7",
            borderColor: "#86efac",
          },
        },
        {
          id: "3",
          data: { label: "Heap Memory" },
          position: { x: 400, y: 50 },
          style: {
            width: 180,
            height: 40,
            backgroundColor: "#f0f4f8",
            borderColor: "#cbd5e1",
          },
        },
      ] as Node[],
      edges: [] as Edge[],
    },
    {
      description: 'Object creation: String name = "Java";',
      nodes: [
        {
          id: "1",
          data: { label: "Stack Memory" },
          position: { x: 100, y: 50 },
          style: {
            width: 180,
            height: 40,
            backgroundColor: "#f0f4f8",
            borderColor: "#cbd5e1",
          },
        },
        {
          id: "2",
          data: { label: "x = 42" },
          position: { x: 100, y: 150 },
          style: {
            width: 180,
            padding: "10px",
            backgroundColor: "#dcfce7",
            borderColor: "#86efac",
          },
        },
        {
          id: "3",
          data: { label: "Heap Memory" },
          position: { x: 400, y: 50 },
          style: {
            width: 180,
            height: 40,
            backgroundColor: "#f0f4f8",
            borderColor: "#cbd5e1",
          },
        },
        {
          id: "4",
          data: { label: "name (reference)" },
          position: { x: 100, y: 220 },
          style: {
            width: 180,
            padding: "10px",
            backgroundColor: "#dbeafe",
            borderColor: "#93c5fd",
          },
        },
        {
          id: "5",
          data: { label: 'String object: "Java"' },
          position: { x: 400, y: 150 },
          style: {
            width: 180,
            padding: "10px",
            backgroundColor: "#dbeafe",
            borderColor: "#93c5fd",
          },
        },
      ] as Node[],
      edges: [
        { id: "e1-5", source: "4", target: "5", animated: true } as Edge,
      ] as Edge[],
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(steps[step].nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(steps[step].edges);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Update nodes and edges when step changes
  useEffect(() => {
    if (steps[step]) {
      setNodes(steps[step].nodes);
      setEdges(steps[step].edges);
    }
  }, [step, setNodes, setEdges]);

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-slate-100 dark:bg-slate-800 p-2 border-b flex justify-between items-center">
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className="p-4 bg-white dark:bg-slate-900">
        <div className="mb-4">
          <p className="text-sm font-medium">{steps[step].description}</p>
        </div>
        <div style={{ height: 300 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext} disabled={step === steps.length - 1}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemoryAllocationDiagram;
