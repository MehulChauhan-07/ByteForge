export const codeExamples = {
  introduction: `// Welcome to Java!
// This is a simple Hello World program

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, ByteForge!");
    }
}`,
  variables: `// Java Variables Example

// Primitive data types
int age = 25;
double salary = 50000.50;
char grade = 'A';
boolean isActive = true;

// Reference data type
String name = "John Doe";

System.out.println("Name: " + name);
System.out.println("Age: " + age);`,
  operators: `// Java Operators Example

int a = 10;
int b = 5;

// Arithmetic Operators
int sum = a + b;      // 15
int diff = a - b;     // 5
int product = a * b;  // 50
int quotient = a / b; // 2
int remainder = a % b; // 0

// Relational Operators
boolean isEqual = (a == b);     // false
boolean isGreater = (a > b);    // true

System.out.println("Sum: " + sum);
System.out.println("Is a greater than b? " + isGreater);`,
  controlFlow: `// Java Control Flow Example

int score = 85;

// If-else statement
if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B");
} else if (score >= 70) {
    System.out.println("Grade: C");
} else {
    System.out.println("Grade: F");
}

// For loop
for (int i = 1; i <= 3; i++) {
    System.out.println("Count: " + i);
}`,
  arrays: `// Java Arrays Example

// Declaration and initialization
int[] numbers = {10, 20, 30, 40, 50};

// Accessing array elements
int firstElement = numbers[0];  // 10
int thirdElement = numbers[2];  // 30

// Array length
int arrayLength = numbers.length;  // 5

// Iterating through array
for (int i = 0; i < numbers.length; i++) {
    System.out.println("Element " + i + ": " + numbers[i]);
}`,
};