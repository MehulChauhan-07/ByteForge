
// Sample content for Java basics topics
export const javaBasicsContent = {
  introduction: { 
    title: "Introduction to Java",
    content: `Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. 
    
    Developed by Sun Microsystems (now owned by Oracle), Java was first released in 1995 and has since become one of the most popular programming languages in the world.
    
    Key features of Java include:
    • Platform independence ("Write Once, Run Anywhere")
    • Object-oriented design
    • Automatic memory management
    • Strong type-checking
    • Extensive standard library`
  },
  variables: {
    title: "Variables & Data Types",
    content: `Variables in Java are containers that hold data values. Before using a variable, you must declare it with a specific data type.

    Primitive Data Types:
    • byte: 8-bit integer (-128 to 127)
    • short: 16-bit integer (-32,768 to 32,767)
    • int: 32-bit integer (-2^31 to 2^31-1)
    • long: 64-bit integer (-2^63 to 2^63-1)
    • float: 32-bit floating-point
    • double: 64-bit floating-point
    • boolean: true/false
    • char: 16-bit Unicode character

    Example:
    \`\`\`java
    int age = 25;
    double salary = 50000.50;
    char grade = 'A';
    boolean isActive = true;
    String name = "John"; // String is a reference type, not primitive
    \`\`\`
    
    Variable naming rules:
    • Can contain letters, digits, underscores, and dollar signs
    • Must begin with a letter, $ or _
    • Case-sensitive
    • Cannot use reserved keywords`
  },
  operators: {
    title: "Operators",
    content: `Java provides a rich set of operators to manipulate variables:

    Arithmetic Operators:
    • + (addition)
    • - (subtraction)
    • * (multiplication)
    • / (division)
    • % (modulus)
    • ++ (increment)
    • -- (decrement)

    Relational Operators:
    • == (equal to)
    • != (not equal to)
    • > (greater than)
    • < (less than)
    • >= (greater than or equal to)
    • <= (less than or equal to)

    Logical Operators:
    • && (logical AND)
    • || (logical OR)
    • ! (logical NOT)

    Assignment Operators:
    • = (simple assignment)
    • +=, -=, *=, /=, %= (compound assignment)

    Example:
    \`\`\`java
    int a = 10, b = 5;
    int sum = a + b;      // 15
    boolean isGreater = a > b;  // true
    \`\`\``
  },
  controlFlow: {
    title: "Control Flow",
    content: `Control flow statements allow you to control the execution flow of your program:

    Conditional Statements:
    • if-else: Execute a block of code if a specified condition is true
    • switch: Select one of many code blocks to be executed

    Loop Statements:
    • for: Execute a block of code a specified number of times
    • while: Execute a block of code while a condition is true
    • do-while: Execute a block of code once, then repeat while a condition is true
    
    Example of if-else:
    \`\`\`java
    int score = 85;
    
    if (score >= 90) {
        System.out.println("Grade: A");
    } else if (score >= 80) {
        System.out.println("Grade: B");
    } else if (score >= 70) {
        System.out.println("Grade: C");
    } else {
        System.out.println("Grade: F");
    }
    \`\`\`
    
    Example of for loop:
    \`\`\`java
    for (int i = 1; i <= 5; i++) {
        System.out.println("Count: " + i);
    }
    \`\`\``
  },
  arrays: {
    title: "Arrays",
    content: `Arrays in Java are objects that store multiple variables of the same type. The elements in an array are stored in contiguous memory locations.

    Array Declaration:
    \`\`\`java
    // Declaration
    int[] numbers;
    
    // Initialization
    numbers = new int[5];  // Creates an array of 5 integers
    
    // Declaration and initialization
    int[] values = {10, 20, 30, 40, 50};
    \`\`\`
    
    Accessing Array Elements:
    \`\`\`java
    int firstElement = values[0];  // Accessing the first element (10)
    values[2] = 35;                // Modifying the third element
    int arrayLength = values.length;  // Getting the array length
    \`\`\`
    
    Multidimensional Arrays:
    \`\`\`java
    int[][] matrix = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    int value = matrix[1][2];  // Accesses value 6
    \`\`\`
    
    Common Array Operations:
    • Iteration: Use loops to process array elements
    • Sorting: Use Arrays.sort() to sort array elements
    • Searching: Use Arrays.binarySearch() for sorted arrays`
  }
};
