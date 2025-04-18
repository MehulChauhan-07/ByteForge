export interface Topic {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  category: string;
  prerequisites: string[];
  tags: string[];
  image: string;
  updatedAt: string;
  subtopics: SubTopic[];
  progress?: {
    completed: boolean;
    lastAccessed: string;
    score?: number;
  };
}

import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ContentBlock {
  type: "text" | "code" | "image" | "video";
  content: string;
  language?: string;
  url?: string;
  alt?: string;
  title?: string;
  caption?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
  difficulty?: "easy" | "medium" | "hard";
}

export interface SubTopic {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  content: ContentBlock[];
  codeExamples: CodeExample[];
  resources: Resource[];
  quizQuestions: QuizQuestion[];
  exercises?: Exercise[];
}

export interface CodeExample {
  title: string;
  code: string;
  language: string;
  description: string;
  output?: string;
  explanation?: string;
}

export interface Resource {
  title: string;
  url: string;
  type: "tutorial" | "documentation" | "video" | "article" | "book";
  description: string;
  level?: "beginner" | "intermediate" | "advanced";
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimit?: number;
}

export interface Exercise {
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  difficulty: "easy" | "medium" | "hard";
  estimatedTime: string;
  points: number;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: string[];
  order?: number;
  color?: string;
}
