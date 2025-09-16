export interface Topic {
  topics: any;
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  category: string;
  prerequisites: string[];
  tags: string[];
  image?: string;
  updatedAt: string;
  subtopics?: Subtopic[];
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

export interface Subtopic {
  subtopicId: string;
  topicId: string;
  title: string;
  description: string;
  estimatedTime: string;
  content: {
    type: string;
    content: string;
  }[];
  codeExamples: {
    title: string;
    code: string;
    language: string;
    description: string;
  }[];
  resources: {
    title: string;
    url: string;
    type: string;
    description: string;
    level?: string;
  }[];
  quizQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: string;
    timeLimit: number;
  }[];
}

export interface CodeExample {
  title: string;
  description?: string;
  code: string;
  language?: string;
}

export interface Resource {
  title: string;
  description?: string;
  url: string;
  type: "tutorial" | "documentation" | "video" | "article" | "book";
  level?: "beginner" | "intermediate" | "advanced";
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Exercise {
  title: string;
  description?: string;
  initialCode: string;
  language?: string;
  solution?: string;
  hints?: string[];
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
