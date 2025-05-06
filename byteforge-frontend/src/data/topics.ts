import {
  Topic,
  Category,
  SubTopic,
  ContentBlock,
  CodeExample,
  Resource,
  QuizQuestion,
  Exercise,
} from "../types";

// Categories definition
export const categories: Category[] = [
  {
    id: "java-fundamentals",
    title: "Java Fundamentals",
    description: "Learn the basics of Java programming language",
    icon: "java",
    topics: ["java-basics", "oop", "collections", "exceptions"],
    order: 1,
    color: "#007396",
  },
  {
    id: "advanced-java",
    title: "Advanced Java",
    description: "Advanced Java concepts and features",
    icon: "code",
    topics: ["multithreading", "streams", "reflection", "annotations"],
    order: 2,
    color: "#B07219",
  },
  {
    id: "object-oriented",
    title: "Object-Oriented Programming",
    description: "OOP concepts implementation in Java",
    icon: "Code",
    topics: ["oop-java"],
  },
  {
    id: "data-structures",
    title: "Data Structures",
    description: "Built-in data structures in Java",
    icon: "Database",
    topics: ["java-collections"],
  },
  {
    id: "error-handling",
    title: "Exception Handling",
    description: "Error management in Java applications",
    icon: "AlertTriangle",
    topics: ["exception-handling"],
  },
  {
    id: "io-files",
    title: "I/O & Files",
    description: "File operations and I/O streams in Java",
    icon: "File",
    topics: ["java-io"],
  },
  {
    id: "concurrency",
    title: "Multithreading",
    description: "Concurrent programming in Java",
    icon: "Network",
    topics: ["multithreading"],
  },
];

// Enhanced topics with improved structure
export const topics: Topic[] = [
  {
    id: "java-basics",
    title: "Java Basics",
    description: "Introduction to Java programming language",
    level: "Beginner",
    duration: "2 hours",
    category: "java-fundamentals",
    prerequisites: [],
    tags: ["java", "basics", "programming"],
    image: "/images/java-basics.jpg",
    updatedAt: "2024-03-20",
    subtopics: [
      {
        id: "introduction",
        title: "Introduction to Java: Why It Matters", // Slightly updated title
        description:
          "Understand why Java exists, its core principles like 'Write Once, Run Anywhere', and overcome common beginner hurdles.", // Updated description
        estimatedTime: "45 minutes", // Adjusted time estimate
        content: [
          {
            type: "text",
            content:
              "Imagine You Want to Build Something\n\nYou’ve decided to build your first app — maybe a simple calculator. You open your laptop, excited, and then… You realize you have no idea how to make the computer understand what you want.\n\nYou try typing 'Add 2 and 3' somewhere, but computers don’t speak English. They need very precise instructions written in a language they understand.\n\nYou need a programming language.",
          },
          {
            type: "text",
            content:
              "Now comes the real question: which one?\n\nYou hear about Python, C++, Java… and Java stands out. People say it's powerful, it's everywhere, it’s solid.\nBut you also hear it can feel a little heavy for beginners. Is it the right choice?\nLet’s walk through this properly.",
          },
          {
            type: "text",
            content:
              "Trying Without Java\n\nSuppose you somehow build a basic calculator manually — adding numbers with simple instructions written in Word or Notepad.\nBut when you try to run it? Nothing happens.\nWhy? Because the computer doesn’t 'see' your logic. You didn’t write it in a language the machine understands.\nYou realize you need a proper tool — a real programming language that can turn your ideas into running programs.\n\nThis is the moment Java steps in.",
          },
          {
            type: "text",
            content:
              'How Java Solves This Problem\n\nJava was built with one big goal:\n"Write Once, Run Anywhere."\n\nYou write your program once, and it runs on any computer — Windows, Mac, Linux, Android — without needing to rewrite it.\nThis is possible because of the Java Virtual Machine (JVM), which acts like a translator between your code and the machine.\n\nThis was a game-changer when Java launched, and it’s still a major reason why huge companies (banks, airlines, even Android apps) trust Java today.\nIt doesn’t matter if you’re building small apps or giant systems — Java scales with you.',
          },
          {
            type: "text",
            content:
              'But Isn\'t Java Hard?\n\nAt first glance, Java can look complicated. Even a simple program to print "Hello, World!" requires some setup (see the code example below).\n\nYou might think: "Wow, that’s a lot just to print one line!"\nTrue — Java asks you to set up some structure first. But this structure makes your programs organized, clean, and ready to grow.\n\nIt’s like learning to build with blueprints, not just piling up blocks randomly.\nEarly on, it feels slow.\nLater, when your projects get bigger, you’ll be thankful you learned the right way.',
          },
          {
            type: "text",
            content:
              "Real-World Use Case:\n• Every Android app you use? Built on Java (or very closely related technologies like Kotlin).\n• Major banks, airlines, insurance companies? Their backend systems often rely heavily on Java because of its security, performance, and long-term stability.\n\nIn short, Java isn't just about learning to code. It's about learning to build things that last.",
          },
          {
            type: "text",
            content:
              'Common Beginner Struggles (and How to Beat Them):\n\n✅ Java looks "wordy" compared to languages like Python.\nThat’s true. But all that structure teaches you discipline — something you’ll appreciate when your apps grow beyond a few hundred lines.\n\n✅ Too many new words — classes, objects, methods...\nDon\'t rush to memorize everything. Focus on building small, working programs. Understanding will come naturally as you practice.\n\n✅ Error messages seem confusing.\nAt first, Java’s errors will feel scary. But they’re actually like a treasure map — they tell you exactly what and where something went wrong. You’ll get good at reading them over time.',
          },
        ],
        codeExamples: [
          {
            title: "Basic 'Hello, World!' Program",
            code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
            language: "java",
            description:
              "Illustrates the basic structure of a Java program needed even for simple output. Notice the class and main method definition.",
          },
        ],
        resources: [
          {
            title: "Java Documentation",
            url: "https://docs.oracle.com/javase/tutorial/",
            type: "documentation",
            description: "Official Java documentation",
            level: "beginner",
          },
        ],
        quizQuestions: [
          {
            question: "Which company developed Java?",
            options: ["Microsoft", "Oracle", "Sun Microsystems", "IBM"],
            correctAnswer: 2,
            explanation:
              "Java was developed by Sun Microsystems, which was later acquired by Oracle.",
            difficulty: "easy",
            timeLimit: 30,
          },
        ],
      },
      {
        id: "variables",
        title: "Variables and Data Types",
        description: "Learn about Java variables and data types",
        estimatedTime: "30 minutes",
        content: [
          {
            type: "text",
            content:
              "Variables in Java are containers that hold data values. Before using a variable, you must declare it with a specific data type.",
          },
          {
            type: "text",
            content:
              "Primitive Data Types:\n• byte: 8-bit integer (-128 to 127)\n• short: 16-bit integer (-32,768 to 32,767)\n• int: 32-bit integer (-2^31 to 2^31-1)\n• long: 64-bit integer (-2^63 to 2^63-1)\n• float: 32-bit floating-point\n• double: 64-bit floating-point\n• boolean: true/false\n• char: 16-bit Unicode character",
          },
          {
            type: "code",
            content:
              "int age = 25;\ndouble salary = 50000.50;\nchar grade = 'A';\nboolean isActive = true;\nString name = \"John\"; // String is a reference type, not primitive",
            language: "java",
          }, 
        ],
        codeExamples: [
          {
            title: "Variable Declaration",
            code: 'int number = 10;\ndouble pi = 3.14159;\nString message = "Hello, World!";',
            language: "java",
            description: "Basic variable declarations in Java",
          },
        ],
        resources: [
          {
            title: "Java Variables Tutorial",
            url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html",
            type: "documentation",
            description: "Official Java documentation on variables",
            level: "beginner",
          },
        ],
        quizQuestions: [
          {
            question: "Which of the following is a valid variable declaration?",
            options: [
              "int 1number = 10;",
              "int number1 = 10;",
              "int number-1 = 10;",
              "int number.1 = 10;",
            ],
            correctAnswer: 1,
            explanation:
              "Variable names cannot start with numbers or contain special characters except underscore.",
            difficulty: "easy",
            timeLimit: 30,
          },
        ],
        exercises: [
          {
            title: "Variable Practice",
            description:
              "Create a program that declares and uses different types of variables",
            starterCode:
              "public class VariablePractice {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}",
            solution:
              'public class VariablePractice {\n    public static void main(String[] args) {\n        int age = 25;\n        double height = 1.75;\n        String name = "John";\n        System.out.println("Name: " + name);\n        System.out.println("Age: " + age);\n        System.out.println("Height: " + height);\n    }\n}',
            testCases: [
              {
                input: "",
                expectedOutput: "Name: John\nAge: 25\nHeight: 1.75",
                explanation:
                  "The program should print the values of the variables",
              },
            ],
            difficulty: "easy",
            estimatedTime: "15 minutes",
            points: 10,
          },
        ],
      },
      {
        id: "operators",
        title: "Operators",
        description:
          "Using operators to perform operations on variables and values",
        estimatedTime: "30 minutes",
        content: [
          {
            type: "text",
            content:
              "Java provides a rich set of operators to manipulate variables:\n\nArithmetic Operators:\n• + (addition)\n• - (subtraction)\n• * (multiplication)\n• / (division)\n• % (modulus)\n• ++ (increment)\n• -- (decrement)\n\nRelational Operators:\n• == (equal to)\n• != (not equal to)\n• > (greater than)\n• < (less than)\n• >= (greater than or equal to)\n• <= (less than or equal to)\n\nLogical Operators:\n• && (logical AND)\n• || (logical OR)\n• ! (logical NOT)\n\nAssignment Operators:\n• = (simple assignment)\n• +=, -=, *=, /=, %= (compound assignment)",
          },
        ],
        codeExamples: [
          {
            title: "Java Operators",
            code: "int a = 10, b = 5;\nint sum = a + b;      // 15\nboolean isGreater = a > b;  // true",
            language: "java",
            description: "Examples of operators in Java",
          },
        ],
        resources: [
          {
            title: "Java Operators Tutorial",
            url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html",
            type: "documentation",
            description: "Official Java documentation on operators",
            level: "beginner",
          },
        ],
        quizQuestions: [],
      },
      {
        id: "control-flow",
        title: "Control Flow",
        description: "Learn about control flow statements in Java",
        estimatedTime: "30 minutes",
        content: [
          {
            type: "text",
            content:
              "Control flow statements allow you to control the execution flow of your program:\n\nConditional Statements:\n• if-else: Execute a block of code if a specified condition is true\n• switch: Select one of many code blocks to be executed\n\nLoop Statements:\n• for: Execute a block of code a specified number of times\n• while: Execute a block of code while a condition is true\n• do-while: Execute a block of code once, then repeat while a condition is true",
          },
        ],
        codeExamples: [
          {
            title: "If-else Example",
            code: 'int score = 85;\n\nif (score >= 90) {\n    System.out.println("Grade: A");\n} else if (score >= 80) {\n    System.out.println("Grade: B");\n} else if (score >= 70) {\n    System.out.println("Grade: C");\n} else {\n    System.out.println("Grade: F");\n}',
            language: "java",
            description: "Example of if-else statement",
          },
          {
            title: "For Loop Example",
            code: 'for (int i = 1; i <= 5; i++) {\n    System.out.println("Count: " + i);\n}',
            language: "java",
            description: "Example of for loop",
          },
        ],
        resources: [],
        quizQuestions: [],
      },
      {
        id: "arrays",
        title: "Arrays",
        description: "Learn about arrays in Java",
        estimatedTime: "30 minutes",
        content: [
          {
            type: "text",
            content:
              "Arrays in Java are objects that store multiple variables of the same type. The elements in an array are stored in contiguous memory locations.",
          },
        ],
        codeExamples: [
          {
            title: "Array Declaration and Usage",
            code: "// Declaration\nint[] numbers;\n\n// Initialization\nnumbers = new int[5];  // Creates an array of 5 integers\n\n// Declaration and initialization\nint[] values = {10, 20, 30, 40, 50};\n\n// Accessing elements\nint firstElement = values[0];  // 10\nvalues[2] = 35;                // Modifying the third element\nint arrayLength = values.length;  // Getting the array length",
            language: "java",
            description: "Examples of array operations",
          },
          {
            title: "Multidimensional Arrays",
            code: "int[][] matrix = {\n    {1, 2, 3},\n    {4, 5, 6},\n    {7, 8, 9}\n};\n\nint value = matrix[1][2];  // Accesses value 6",
            language: "java",
            description: "Example of multidimensional array",
          },
        ],
        resources: [],
        quizQuestions: [],
      },
    ],
  },
  {
    id: "oop-java",
    title: "Object-Oriented Programming",
    description: "Master object-oriented programming concepts in Java",
    level: "Intermediate",
    duration: "6 hours",
    category: "object-oriented",
    prerequisites: ["java-basics"],
    tags: ["oop", "classes", "inheritance", "polymorphism"],
    image: "/images/oop-java.jpg",
    updatedAt: "2024-03-20",
    subtopics: [
      {
        id: "classes-objects",
        title: "Classes and Objects",
        description: "Learn about classes and objects in Java",
        estimatedTime: "60 minutes",
        content: [
          {
            type: "text",
            content:
              "A class is a blueprint for creating objects. Objects are instances of classes that contain both data (attributes) and code (methods). Classes are fundamental to object-oriented programming in Java.",
          },
          {
            type: "text",
            content:
              "Key concepts:\n• Class members (fields and methods)\n• Constructors\n• Access modifiers (public, private, protected)\n• Instance vs Static members\n• Object creation and initialization",
          },
        ],
        codeExamples: [
          {
            title: "Creating a Simple Class",
            code: 'public class Car {\n    // Fields\n    private String brand;\n    private String model;\n    private int year;\n\n    // Constructor\n    public Car(String brand, String model, int year) {\n        this.brand = brand;\n        this.model = model;\n        this.year = year;\n    }\n\n    // Methods\n    public void startEngine() {\n        System.out.println("The " + brand + " " + model + " is starting...");\n    }\n\n    // Getters and Setters\n    public String getBrand() { return brand; }\n    public void setBrand(String brand) { this.brand = brand; }\n}',
            language: "java",
            description:
              "Example of a Car class with fields, constructor, and methods",
          },
        ],
        resources: [
          {
            title: "Java Classes and Objects",
            url: "https://docs.oracle.com/javase/tutorial/java/javaOO/classes.html",
            type: "documentation",
            description: "Official Java documentation on classes and objects",
            level: "beginner",
          },
        ],
        quizQuestions: [
          {
            question: "What is the purpose of a constructor in Java?",
            options: [
              "To destroy objects",
              "To initialize object attributes",
              "To declare class variables",
              "To define class methods",
            ],
            correctAnswer: 1,
            explanation:
              "Constructors are used to initialize the attributes of an object when it is created.",
            difficulty: "easy",
            timeLimit: 30,
          },
        ],
      },
      {
        id: "inheritance",
        title: "Inheritance",
        description: "Understanding inheritance and class hierarchies",
        estimatedTime: "60 minutes",
        content: [
          {
            type: "text",
            content:
              "Inheritance is a mechanism that allows a class to inherit attributes and methods from another class. The class that inherits is called the subclass (or derived class), and the class being inherited from is called the superclass (or base class).",
          },
          {
            type: "text",
            content:
              "Key concepts of inheritance:\n• extends keyword\n• Method overriding\n• super keyword\n• Protected access modifier\n• IS-A relationship",
          },
        ],
        codeExamples: [
          {
            title: "Inheritance Example",
            code: '// Parent class\npublic class Animal {\n    protected String name;\n    \n    public Animal(String name) {\n        this.name = name;\n    }\n    \n    public void makeSound() {\n        System.out.println("Some sound");\n    }\n}\n\n// Child class\npublic class Dog extends Animal {\n    public Dog(String name) {\n        super(name);\n    }\n    \n    @Override\n    public void makeSound() {\n        System.out.println("Woof!");\n    }\n}',
            language: "java",
            description: "Example of inheritance with Animal and Dog classes",
          },
        ],
        resources: [
          {
            title: "Java Inheritance Documentation",
            url: "https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html",
            type: "documentation",
            description: "Official Java documentation on inheritance",
            level: "intermediate",
          },
        ],
        quizQuestions: [
          {
            question: "What keyword is used to inherit from a class in Java?",
            options: ["extends", "implements", "inherits", "super"],
            correctAnswer: 0,
            explanation:
              "The 'extends' keyword is used to create a subclass that inherits from another class.",
            difficulty: "easy",
            timeLimit: 30,
          },
        ],
      },
      {
        id: "polymorphism",
        title: "Polymorphism",
        description: "Understanding polymorphic behavior in Java",
        estimatedTime: "60 minutes",
        content: [
          {
            type: "text",
            content:
              "Polymorphism means 'many forms' and occurs when we have many classes that are related to each other by inheritance. It allows us to perform a single action in different ways.",
          },
        ],
        codeExamples: [
          {
            title: "Polymorphism Example",
            code: "public class Shape {\n    public double getArea() {\n        return 0;\n    }\n}\n\npublic class Circle extends Shape {\n    private double radius;\n    \n    public Circle(double radius) {\n        this.radius = radius;\n    }\n    \n    @Override\n    public double getArea() {\n        return Math.PI * radius * radius;\n    }\n}\n\npublic class Rectangle extends Shape {\n    private double width;\n    private double height;\n    \n    public Rectangle(double width, double height) {\n        this.width = width;\n        this.height = height;\n    }\n    \n    @Override\n    public double getArea() {\n        return width * height;\n    }\n}",
            language: "java",
            description: "Example of polymorphism with Shape classes",
          },
        ],
        resources: [
          {
            title: "Java Polymorphism Tutorial",
            url: "https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html",
            type: "documentation",
            description: "Official Java documentation on polymorphism",
            level: "intermediate",
          },
        ],
        quizQuestions: [
          {
            question: "What is method overriding?",
            options: [
              "Creating multiple methods with the same name but different parameters",
              "Providing a different implementation for a method defined in a parent class",
              "Creating a new method in a subclass",
              "Using the super keyword to call parent methods",
            ],
            correctAnswer: 1,
            explanation:
              "Method overriding occurs when a subclass provides a specific implementation for a method that is already defined in its parent class.",
            difficulty: "medium",
            timeLimit: 45,
          },
        ],
      },
      {
        id: "encapsulation",
        title: "Encapsulation",
        description: "Learn about data hiding and access control",
        estimatedTime: "45 minutes",
        content: [
          {
            type: "text",
            content:
              "Encapsulation is the bundling of data and the methods that operate on that data within a single unit or object, hiding the internal details and providing an interface to interact with the object.",
          },
          {
            type: "text",
            content:
              "Key concepts:\n• Access modifiers (public, private, protected)\n• Getter and setter methods\n• Data hiding\n• Package access",
          },
        ],
        codeExamples: [
          {
            title: "Encapsulation Example",
            code: "public class BankAccount {\n    private double balance;\n    private String accountNumber;\n    \n    public BankAccount(String accountNumber, double initialBalance) {\n        this.accountNumber = accountNumber;\n        this.balance = initialBalance;\n    }\n    \n    public double getBalance() {\n        return balance;\n    }\n    \n    public void deposit(double amount) {\n        if (amount > 0) {\n            balance += amount;\n        }\n    }\n    \n    public boolean withdraw(double amount) {\n        if (amount > 0 && balance >= amount) {\n            balance -= amount;\n            return true;\n        }\n        return false;\n    }\n}",
            language: "java",
            description: "Example of encapsulation in a bank account class",
          },
        ],
        resources: [
          {
            title: "Java Encapsulation Guide",
            url: "https://docs.oracle.com/javase/tutorial/java/javaOO/encapsulation.html",
            type: "documentation",
            description: "Official Java documentation on encapsulation",
            level: "intermediate",
          },
        ],
        quizQuestions: [
          {
            question: "What is the main purpose of encapsulation?",
            options: [
              "To make code run faster",
              "To hide internal details and protect data integrity",
              "To create multiple instances of a class",
              "To inherit from other classes",
            ],
            correctAnswer: 1,
            explanation:
              "Encapsulation is used to hide the internal details of an object and protect its data integrity through access control.",
            difficulty: "medium",
            timeLimit: 30,
          },
        ],
      },
    ],
  },
  {
    id: "java-collections",
    title: "Java Collections Framework",
    description: "Learn about Java's built-in data structures",
    level: "Intermediate",
    duration: "4 hours",
    category: "data-structures",
    prerequisites: ["java-basics", "oop-java"],
    tags: ["collections", "data-structures", "lists", "sets", "maps"],
    image: "/images/collections.jpg",
    updatedAt: "2024-03-20",
    subtopics: [
      {
        id: "lists",
        title: "Lists and ArrayList",
        description: "Working with dynamic arrays in Java",
        estimatedTime: "45 minutes",
        content: [
          {
            type: "text",
            content:
              "Lists are ordered collections that allow duplicate elements. ArrayList is the most commonly used implementation of the List interface, providing dynamic array functionality.",
          },
          {
            type: "text",
            content:
              "Key features:\n• Dynamic sizing\n• Index-based access\n• Ordered elements\n• Allows duplicates\n• Null elements allowed",
          },
        ],
        codeExamples: [
          {
            title: "ArrayList Usage",
            code: 'import java.util.ArrayList;\n\nArrayList<String> names = new ArrayList<>();\n\n// Adding elements\nnames.add("Alice");\nnames.add("Bob");\nnames.add("Charlie");\n\n// Accessing elements\nSystem.out.println(names.get(0));  // Prints: Alice\n\n// Removing elements\nnames.remove(1);  // Removes Bob\n\n// Checking size\nSystem.out.println(names.size());  // Prints: 2\n\n// Iterating\nfor (String name : names) {\n    System.out.println(name);\n}',
            language: "java",
            description: "Basic ArrayList operations",
          },
        ],
        resources: [
          {
            title: "Java ArrayList Documentation",
            url: "https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html",
            type: "documentation",
            description: "Official Java documentation for ArrayList",
            level: "intermediate",
          },
        ],
        quizQuestions: [
          {
            question: "Which interface does ArrayList implement?",
            options: ["List", "Set", "Map", "Queue"],
            correctAnswer: 0,
            explanation:
              "ArrayList implements the List interface, which provides ordered collection functionality.",
            difficulty: "easy",
            timeLimit: 30,
          },
        ],
      },
    ],
  },
  {
    id: "exception-handling",
    title: "Exception Handling",
    description: "Learn how to handle errors and exceptions in Java",
    level: "Intermediate",
    duration: "3 hours",
    category: "error-handling",
    prerequisites: ["java-basics"],
    tags: ["exceptions", "try-catch", "error-handling"],
    image: "/images/exceptions.jpg",
    updatedAt: "2024-03-20",
    subtopics: [
      {
        id: "try-catch",
        title: "Try-Catch Blocks",
        description: "Basic exception handling with try-catch",
        estimatedTime: "45 minutes",
        content: [
          {
            type: "text",
            content:
              "Exception handling in Java is done using try-catch blocks. The try block contains code that might throw an exception, and the catch block handles the exception if it occurs.",
          },
        ],
        codeExamples: [
          {
            title: "Basic Exception Handling",
            code: 'try {\n    int result = 10 / 0;  // This will throw ArithmeticException\n    System.out.println(result);\n} catch (ArithmeticException e) {\n    System.out.println("Cannot divide by zero!");\n} finally {\n    System.out.println("This always executes");\n}',
            language: "java",
            description: "Example of try-catch-finally block",
          },
        ],
        resources: [
          {
            title: "Java Exception Handling",
            url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/",
            type: "documentation",
            description: "Official Java documentation on exception handling",
            level: "intermediate",
          },
        ],
        quizQuestions: [
          {
            question:
              "Which block is always executed in a try-catch statement?",
            options: [
              "try block",
              "catch block",
              "finally block",
              "throw block",
            ],
            correctAnswer: 2,
            explanation:
              "The finally block is always executed, whether an exception occurs or not.",
            difficulty: "easy",
            timeLimit: 30,
          },
        ],
      },
    ],
  },
];
