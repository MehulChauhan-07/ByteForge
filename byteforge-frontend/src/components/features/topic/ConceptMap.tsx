import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ForceGraph2D from "react-force-graph-2d";
import { Topic } from "@/types";

interface ConceptMapProps {
  topics: Topic[];
  activeTopic?: Topic | null;
}

interface GraphNode {
  id: string;
  name: string;
  val: number;
  color: string;
  group: string;
}

interface GraphLink {
  source: string;
  target: string;
  value: number;
}

export const ConceptMap = ({ topics, activeTopic }: ConceptMapProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Create graph data from topics
  const graphData = {
    nodes: [] as GraphNode[],
    links: [] as GraphLink[],
  };

  // Add topics as nodes
  topics.forEach((topic) => {
    graphData.nodes.push({
      id: topic.id,
      name: topic.title,
      val: 10,
      color: topic.id === activeTopic?.id ? "#0091ff" : "#4a5568",
      group: topic.category,
    });

    // Add links based on prerequisites
    if (topic.prerequisites) {
      topic.prerequisites.forEach((prereq: any) => {
        // Find the prerequisite topic
        const prereqTopic = topics.find((t) => t.title === prereq);
        if (prereqTopic) {
          graphData.links.push({
            source: prereqTopic.id,
            target: topic.id,
            value: 1,
          });
        }
      });
    }
  });

  useEffect(() => {
    // Resize graph on window resize
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        // Update graph dimensions if needed
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[400px] border rounded-lg overflow-hidden bg-white dark:bg-slate-950"
    >
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="name"
        nodeColor="color"
        nodeVal="val"
        linkDirectionalArrowLength={3}
        linkDirectionalArrowRelPos={1}
        linkWidth={1}
        linkColor={() => "#cbd5e0"}
        onNodeClick={(node: { id: any; }) => {
          // Navigate to topic page when node is clicked
          navigate(`/topics/${node.id}`);
        }}
        cooldownTicks={100}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.1}
      />
    </div>
  );
};
