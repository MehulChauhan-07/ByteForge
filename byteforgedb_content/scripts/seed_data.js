const mongoose = require("mongoose");
const Topic = require("../models/topic_Schema");
const SubTopic = require("../models/subtopic_Schema");
const Category = require("../models/category_Schema");

const MONGODB_URI = "mongodb://localhost:27017/byteforgedb";

const categories = [
  {
    id: "programming",
    title: "Programming",
    description: "Learn programming fundamentals and advanced concepts",
    icon: "code",
    color: "#007396",
    order: 1,
    topics: ["java-intro", "java-oop", "java-collections"],
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Master modern web development technologies",
    icon: "globe",
    color: "#61DAFB",
    order: 2,
    topics: ["react-basics", "node-express"],
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Explore data analysis and machine learning",
    icon: "chart-bar",
    color: "#FF6B6B",
    order: 3,
    topics: ["python-ml", "data-analysis"],
  },
  {
    id: "mobile-dev",
    title: "Mobile Development",
    description: "Build mobile applications for iOS and Android",
    icon: "smartphone",
    color: "#34C759",
    order: 4,
    topics: ["android-dev", "ios-dev"],
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    description: "Learn cloud platforms and deployment strategies",
    icon: "cloud",
    color: "#FF9500",
    order: 5,
    topics: ["aws-cloud"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Master security concepts and best practices",
    icon: "shield",
    color: "#FF2D55",
    order: 6,
    topics: ["network-security"],
  },
  {
    id: "database",
    title: "Database Management",
    description: "Learn database design, SQL, and NoSQL technologies",
    icon: "database",
    color: "#5856D6",
    order: 7,
    topics: ["sql-mastery"],
  },
  {
    id: "devops",
    title: "DevOps",
    description: "Master CI/CD, containerization, and automation",
    icon: "settings",
    color: "#007AFF",
    order: 8,
    topics: ["docker-k8s"],
  },
];

const topics = [
  {
    id: "java-intro",
    title: "Introduction to Java Programming",
    description:
      "Learn the fundamentals of Java programming language, from basic syntax to object-oriented concepts.",
    level: "Beginner",
    duration: "8 weeks",
    category: "java",
    prerequisites: [],
    tags: ["java", "programming", "basics", "fundamentals"],
    image: "https://example.com/java.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "java-oop",
    title: "Object-Oriented Programming in Java",
    description:
      "Master object-oriented programming concepts in Java including classes, objects, inheritance, and polymorphism.",
    level: "Intermediate",
    duration: "6 weeks",
    category: "java",
    prerequisites: ["java-intro"],
    tags: ["java", "oop", "classes", "objects", "inheritance"],
    image: "https://example.com/java-oop.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "java-collections",
    title: "Java Collections Framework",
    description:
      "Explore Java's Collections Framework and learn how to effectively use Lists, Sets, Maps, and other collection types.",
    level: "Intermediate",
    duration: "4 weeks",
    category: "java",
    prerequisites: ["java-intro", "java-oop"],
    tags: ["java", "collections", "data-structures", "lists", "maps"],
    image: "https://example.com/java-collections.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "react-basics",
    title: "React Fundamentals",
    description:
      "Learn the basics of React.js, including components, props, state, and hooks.",
    level: "Beginner",
    duration: "6 weeks",
    category: "web-dev",
    prerequisites: [],
    tags: ["react", "javascript", "frontend", "web-development"],
    image: "https://example.com/react.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "node-express",
    title: "Node.js and Express.js",
    description:
      "Build scalable backend applications using Node.js and Express.js framework.",
    level: "Intermediate",
    duration: "8 weeks",
    category: "web-dev",
    prerequisites: ["react-basics"],
    tags: ["nodejs", "express", "backend", "api", "javascript"],
    image: "https://example.com/node-express.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "python-ml",
    title: "Machine Learning with Python",
    description:
      "Introduction to machine learning concepts and implementation using Python.",
    level: "Intermediate",
    duration: "10 weeks",
    category: "data-science",
    prerequisites: [],
    tags: ["python", "machine-learning", "data-science", "ai"],
    image: "https://example.com/python-ml.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "data-analysis",
    title: "Data Analysis with Python",
    description:
      "Learn data analysis techniques using Python libraries like Pandas, NumPy, and Matplotlib.",
    level: "Beginner",
    duration: "6 weeks",
    category: "data-science",
    prerequisites: [],
    tags: ["python", "data-analysis", "pandas", "numpy", "matplotlib"],
    image: "https://example.com/data-analysis.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "android-dev",
    title: "Android App Development",
    description:
      "Build native Android applications using Kotlin and Android Studio.",
    level: "Intermediate",
    duration: "12 weeks",
    category: "mobile-dev",
    prerequisites: [],
    tags: ["android", "kotlin", "mobile", "app-development"],
    image: "https://example.com/android-dev.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ios-dev",
    title: "iOS App Development",
    description: "Create iOS applications using Swift and Xcode.",
    level: "Intermediate",
    duration: "12 weeks",
    category: "mobile-dev",
    prerequisites: [],
    tags: ["ios", "swift", "mobile", "app-development"],
    image: "https://example.com/ios-dev.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "aws-cloud",
    title: "AWS Cloud Practitioner",
    description:
      "Learn AWS cloud services and best practices for cloud deployment.",
    level: "Beginner",
    duration: "8 weeks",
    category: "cloud-computing",
    prerequisites: [],
    tags: ["aws", "cloud", "devops", "infrastructure"],
    image: "https://example.com/aws-cloud.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "network-security",
    title: "Network Security Fundamentals",
    description:
      "Understand network security concepts and implement security measures.",
    level: "Intermediate",
    duration: "10 weeks",
    category: "cybersecurity",
    prerequisites: [],
    tags: ["security", "networking", "cybersecurity", "infrastructure"],
    image: "https://example.com/network-security.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sql-mastery",
    title: "SQL Database Mastery",
    description: "Master SQL database design, optimization, and management.",
    level: "Intermediate",
    duration: "8 weeks",
    category: "database",
    prerequisites: [],
    tags: ["sql", "database", "data-management", "optimization"],
    image: "https://example.com/sql-mastery.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "docker-k8s",
    title: "Docker and Kubernetes",
    description:
      "Learn containerization with Docker and orchestration with Kubernetes.",
    level: "Intermediate",
    duration: "8 weeks",
    category: "devops",
    prerequisites: [],
    tags: ["docker", "kubernetes", "containers", "devops"],
    image: "https://example.com/docker-k8s.jpg",
    updatedAt: new Date().toISOString(),
  },
];

const subtopics = [
  {
    subtopicId: "java-intro-1",
    topicId: "java-intro",
    title: "Getting Started with Java",
    description: "Learn about Java basics and setup",
    estimatedTime: "2 hours",
    content: [
      {
        type: "text",
        content: "Introduction to Java programming language and its features",
      },
      {
        type: "text",
        content: "Setting up Java Development Environment (JDK, IDE)",
      },
    ],
    codeExamples: [
      {
        title: "Hello World",
        code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
        language: "java",
        description: "A simple Java program that prints 'Hello, World!'",
      },
      {
        title: "Variables and Data Types",
        code: 'public class Variables {\n    public static void main(String[] args) {\n        int number = 42;\n        String text = "Hello";\n        boolean flag = true;\n        System.out.println("Number: " + number);\n        System.out.println("Text: " + text);\n        System.out.println("Flag: " + flag);\n    }\n}',
        language: "java",
        description: "Example of different variable types in Java",
      },
    ],
    resources: [
      {
        title: "Java Documentation",
        url: "https://docs.oracle.com/javase/tutorial/",
        type: "documentation",
        description: "Official Java documentation",
      },
      {
        title: "Java Installation Guide",
        url: "https://docs.oracle.com/javase/install/",
        type: "guide",
        description: "Step-by-step guide for installing Java",
      },
    ],
    quizQuestions: [
      {
        question: "What is the main method in Java?",
        options: [
          "A method that runs when the program starts",
          "A method that runs when the program ends",
          "A method that runs when an error occurs",
          "A method that runs when the program is paused",
        ],
        correctAnswer: 0,
        explanation: "The main method is the entry point of a Java program",
        difficulty: "easy",
        timeLimit: 30,
      },
      {
        question:
          "Which of the following is a valid Java variable declaration?",
        options: [
          "int 123number = 42;",
          "String my-text = 'Hello';",
          "boolean is_valid = true;",
          "double 3.14 = pi;",
        ],
        correctAnswer: 2,
        explanation:
          "Variable names in Java can contain letters, numbers, and underscores, but cannot start with a number",
        difficulty: "medium",
        timeLimit: 45,
      },
    ],
  },
  {
    subtopicId: "react-basics-1",
    topicId: "react-basics",
    title: "Introduction to React Components",
    description: "Learn about React components and their lifecycle",
    estimatedTime: "3 hours",
    content: [
      {
        type: "text",
        content: "Understanding React components and their importance",
      },
      {
        type: "text",
        content: "Component lifecycle methods and hooks",
      },
    ],
    codeExamples: [
      {
        title: "Basic React Component",
        code: 'import React from "react";\n\nfunction Welcome(props) {\n    return <h1>Hello, {props.name}</h1>;\n}\n\nexport default Welcome;',
        language: "jsx",
        description: "A simple React functional component",
      },
      {
        title: "Component with State",
        code: 'import React, { useState } from "react";\n\nfunction Counter() {\n    const [count, setCount] = useState(0);\n\n    return (\n        <div>\n            <p>Count: {count}</p>\n            <button onClick={() => setCount(count + 1)}>\n                Increment\n            </button>\n        </div>\n    );\n}\n\nexport default Counter;',
        language: "jsx",
        description: "A React component using the useState hook",
      },
    ],
    resources: [
      {
        title: "React Documentation",
        url: "https://reactjs.org/docs/getting-started.html",
        type: "documentation",
        description: "Official React documentation",
      },
      {
        title: "React Hooks Guide",
        url: "https://reactjs.org/docs/hooks-intro.html",
        type: "guide",
        description: "Comprehensive guide to React Hooks",
      },
    ],
    quizQuestions: [
      {
        question: "What is a React component?",
        options: [
          "A JavaScript function that returns HTML",
          "A CSS class for styling",
          "A database table",
          "A server-side script",
        ],
        correctAnswer: 0,
        explanation:
          "React components are JavaScript functions that return HTML-like JSX",
        difficulty: "easy",
        timeLimit: 30,
      },
      {
        question:
          "Which hook is used to manage state in functional components?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1,
        explanation:
          "useState is the hook used to add state to functional components",
        difficulty: "medium",
        timeLimit: 45,
      },
    ],
  },
];

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to MongoDB successfully");

    // Clear existing data
    await Promise.all([
      Topic.deleteMany({}),
      SubTopic.deleteMany({}),
      Category.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log("Inserted categories");

    // Insert topics
    const createdTopics = await Topic.insertMany(topics);
    console.log("Inserted topics");

    // Insert subtopics
    const createdSubtopics = await SubTopic.insertMany(subtopics);
    console.log("Inserted subtopics");

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

seedData();
