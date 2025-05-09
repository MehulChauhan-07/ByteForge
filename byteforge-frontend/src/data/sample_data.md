# Byte Forge

java topics

# 1. Introduction to Java

## Imagine You Want to Build Something

You’ve decided to build your first app — maybe a simple calculator. You open your laptop, excited, and then…

You realize you have no idea how to make the computer understand what you want.

You try typing "Add 2 and 3" somewhere, but computers don’t speak English. They need very precise instructions written in a language they understand.

You need a programming language.

Now comes the real question: which one?

You hear about Python, C++, Java… and Java stands out. People say it's powerful, it's everywhere, it’s solid.

But you also hear it can feel a little heavy for beginners. Is it the right choice?

Let’s walk through this properly.

## Trying Without Java

Suppose you somehow build a basic calculator manually — adding numbers with simple instructions written in Word or Notepad.

But when you try to run it? Nothing happens.

Why? Because the computer doesn’t "see" your logic. You didn’t write it in a language the machine understands.

You realize you need a proper tool — a real programming language that can turn your ideas into running programs.

This is the moment Java steps in.

## How Java Solves This Problem

Java was built with one big goal:

> "Write Once, Run Anywhere."
> 

You write your program once, and it runs on any computer — Windows, Mac, Linux, Android — without needing to rewrite it.

This is possible because of the Java Virtual Machine (JVM), which acts like a translator between your code and the machine.

This was a game-changer when Java launched, and it’s still a major reason why huge companies (banks, airlines, even Android apps) trust Java today.

It doesn’t matter if you’re building small apps or giant systems — Java scales with you.

## But Isn't Java Hard?

At first glance, Java can look complicated.

Even a simple program to print "Hello, World!" looks like this:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

You might think: "Wow, that’s a lot just to print one line!"

True — Java asks you to set up some structure first. But this structure makes your programs organized, clean, and ready to grow.

It’s like learning to build with blueprints, not just piling up blocks randomly.

Early on, it feels slow.

Later, when your projects get bigger, you’ll be thankful you learned the right way.

## Real-World Use Case

- Every Android app you use? Built on Java (or very closely related technologies like Kotlin).
- Major banks, airlines, insurance companies? Their backend systems often rely heavily on Java because of its security, performance, and long-term stability.

In short, Java isn't just about learning to code. It's about learning to build things that last.

## Common Beginner Struggles (and How to Beat Them)

✅ Java looks "wordy" compared to languages like Python.

That’s true. But all that structure teaches you discipline — something you’ll appreciate when your apps grow beyond a few hundred lines.

✅ Too many new words — classes, objects, methods...

Don't rush to memorize everything. Focus on building small, working programs. Understanding will come naturally as you practice.

✅ Error messages seem confusing.

At first, Java’s errors will feel scary. But they’re actually like a treasure map — they tell you exactly what and where something went wrong. You’ll get good at reading them over time.

# 2. History and Features of Java

## Imagine You’re in 1990…

You’re a software developer in the early ’90s. Computers are starting to pop up everywhere. There’s Windows, Mac, IBM, Sun Microsystems machines — but the problem is:

**Every machine speaks a different language!**

If you build an application for Windows, it won’t run on Mac.

If you make it for IBM machines, forget about using it on anything else.

You’re stuck rewriting the same program over and over for different systems.

Frustrating, right?

Developers needed a way out — a way to write one program and have it run everywhere.

They tried using C and C++, but those languages were deeply tied to specific hardware and operating systems. Every time you switched systems, you had to tweak (or sometimes totally rewrite) the code.

It was a giant mess.

There had to be a better way.

## How We Were Stuck Before Java

Suppose you built a simple weather app for your IBM desktop.

You spend weeks coding, testing, and finally get it working.

Now your friend with a Mac says, "Hey, can you send me your app?"

You do — and guess what?

It doesn’t run.

Your app depends heavily on IBM’s hardware and operating system quirks. To make it work on Mac, you’d have to modify (or totally rebuild) the entire app.

Developers around the world were exhausted doing this again and again.

A new solution was desperately needed.

## Enter Java: The Game-Changer

In 1991, a small team at Sun Microsystems, led by James Gosling, started a secret project called the "**Green Project**."

They weren’t building Java at first — they were trying to create software for tiny devices like set-top boxes (those cable TV control boxes).

But they quickly realized they needed a new kind of programming language:

- Something **small** (so it could run on limited hardware)
- Something **portable** (so it could run anywhere)
- Something **reliable** (so it wouldn’t crash easily)

By 1995, their language was ready — and they named it Java.

(Java was named after coffee — because the team drank LOTS of coffee while building it!)

The biggest promise of Java was simple:

> "Write Once, Run Anywhere."
> 

Meaning you could write your Java code once, and it would run on ANY machine that had a Java Virtual Machine (JVM).

No more endless rewrites.

It was a revolution.

## Core Features of Java (Why Developers Fell in Love)

Let’s look at the major features that made Java so special:

🔹 **Platform Independent**

Thanks to the JVM, Java code doesn’t depend on hardware. You write once, and it runs everywhere.

🔹 **Object-Oriented**

Java is based on objects — things that combine data (attributes) and actions (methods). This makes big programs easier to manage and extend.

🔹 **Simple and Familiar**

Java’s syntax feels a lot like C/C++, but without the messy, dangerous parts like direct memory access. Easier to learn, safer to use.

🔹 **Secure**

Java was designed with security in mind. It runs code inside a "sandbox," so malicious code can’t easily harm the host machine.

🔹 **Robust**

Java checks your code carefully both when you write it (compile-time) and when you run it (runtime). This double-checking makes Java programs strong and less likely to crash.

🔹 **Multithreaded**

Java lets you run multiple tasks at the same time — like downloading a file while playing a video — without writing crazy complex code.

🔹 **Automatic Memory Management**

No need to manually clean up memory (like in C++). Java has Garbage Collection that handles it for you.

These features made Java a language that was fast, safe, and future-proof.

## Real-World Example

- Android apps are mostly written in Java. Your favorite mobile games, banking apps, even delivery apps? Java inside.
- Big websites like LinkedIn and Netflix still use Java behind the scenes for heavy-duty server operations.

Java became the "language of the internet" in the late ’90s — and it never left.

Even today, Java powers banking systems, huge corporate apps, scientific research, and much more.

## Future Problems You Might Face (and How to Handle Them)

✅ Problem 1: "Java feels outdated compared to newer, shinier languages like Python or JavaScript."

Truth: newer languages are easier for quick tasks, but when it comes to large, scalable, long-running systems, Java still wins. It’s trusted for projects that NEED stability for years.

✅ Problem 2: "Java can seem verbose."

Yes, Java requires you to write a bit more code. But this verbosity brings clarity and strong error checking, which are life-saving in large applications.

✅ Problem 3: "Learning about JVM, Garbage Collection, Threads, etc. feels overwhelming."

Solution: Learn one piece at a time. You don't need to master everything at once. Build small projects — each project will teach you a new part naturally.

# 3. Java Installation and Setup

## Imagine You Want to Start Building Apps

You’re excited. You’ve heard Java is powerful. You’ve read about its history and awesome features.

Now you’re ready to dive in and write your first Java program.

You open your computer and think:

> "Alright, let’s start coding!"
> 

Maybe you open Notepad (Windows) or TextEdit (Mac), type a few lines like:

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

You save it.

But now you wonder...

**"How do I actually run this?"**

You double-click the file.

Nothing happens.

You realize: **your computer doesn’t understand Java code yet.**

It’s like trying to watch a movie without a video player installed.

You need the right setup first.

## Why We Get Stuck Without Setup

Computers don't "speak" Java out of the box.

They need:

- A tool to **translate** your Java code into something they can understand (this is called the **compiler**).
- And an environment to **run** your Java programs (this is the **JVM** — Java Virtual Machine).

If you don’t have these installed, your computer just stares blankly at your code.

No matter how perfectly you write Java programs, without the right tools, nothing will happen.

This is why installing Java properly is the very first step.

## Introducing: Java Development Kit (JDK)

When we talk about "installing Java," what we really mean is installing the **JDK** — the Java Development Kit.

The JDK is like a full toolbox:

- It gives you the **compiler** (turns your Java code into bytecode).
- It gives you the **JVM** (runs your compiled bytecode).
- It even includes useful extra tools (like debuggers and libraries) to make development easier.

In simple words:

> JDK = Everything you need to write and run Java programs.
> 

Without the JDK, you’re just writing letters that nobody can read.

## Step-by-Step: Installing Java

Here's the basic flow to set yourself up:

1. **Download the JDK**
    
    Go to the official website (like Oracle’s Java site or OpenJDK builds) and download the latest stable JDK version for your system (Windows, Mac, or Linux).
    
2. **Install the JDK**
    
    Follow the simple installer wizard.
    
    (Just like installing any regular software.)
    
3. **Set Up the PATH (Optional but Important)**
    
    After installing, you should tell your computer where to find the Java tools.
    
    This is done by setting the `PATH` environment variable.
    
    (Don't worry — it’s usually just copying and pasting a folder path.)
    
    Why?
    
    So you can open your terminal or command prompt and just type `javac` or `java` without needing to specify the full folder path every time.
    
4. **Test Your Installation**
    
    Open your command prompt (or terminal) and type:
    
    ```
    java -version
    ```
    

 ****

# 4. Components of JDK

You have installed the Java Development Kit (JDK). Before jumping into writing code, it is important to understand what exactly you installed. Without knowing your tools, you cannot use them correctly.

The JDK is a bundle that contains everything you need to create and run Java programs. Let’s break down its main components.

## Components of JDK

- **Compiler (`javac`)**
    
    When you write Java code in a `.java` file, it is just plain text.
    
    The compiler translates this text into bytecode, which is stored in a `.class` file.
    
    Bytecode is a special format that can be understood by the Java Virtual Machine (JVM).
    
- **Java Virtual Machine (JVM)**
    
    The JVM is a program that reads the bytecode and translates it into machine-specific instructions.
    
    It allows your Java programs to run on different types of computers without changing the code.
    
- **Java Runtime Environment (JRE)**
    
    The JRE includes the JVM and a set of libraries that Java programs need when they run.
    
    Without the JRE, the JVM would not have the resources like input/output classes, networking classes, and many others.
    
- **Development Tools**
    
    The JDK also provides tools like the Java Debugger (`jdb`) for finding problems and JavaDoc for generating documentation automatically.
    

In short, if you want to develop and run Java programs, you need the JDK. If you only want to run Java programs without developing, the JRE is enough.

## A Slightly Deeper Look at JVM and JRE

When you compile your code, you get a `.class` file. But your computer does not understand this file directly.

- The JVM steps in and reads this bytecode.
- It translates the bytecode into instructions specific to your operating system.
- This translation happens at runtime, allowing Java to achieve its famous "Write Once, Run Anywhere" ability.

The JVM also handles memory management, error handling, and security during program execution.

The JRE is the environment that supports the JVM.

It provides the standard libraries and other resources your program might need while running.

You can think of the JRE as a furnished apartment where the JVM lives and works.

Without furniture (libraries and resources), the JVM would have a hard time running your program.

# 5. Your First Java Program

Let us move to writing a simple Java program.

Suppose you want your computer to print "Hello, World!" on the screen.

You will write the following code:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

Let’s understand this line-by-line:

- **`public class HelloWorld {`**
    
    This line declares a class named `HelloWorld`.
    
    In Java, everything must be inside a class.
    
    Also, the filename must match the class name exactly. So the file must be saved as `HelloWorld.java`.
    
- **`public static void main(String[] args) {`**
    
    This defines the main method. It is the entry point of any Java program.
    
    When you run your program, the Java system calls this method first.
    
    - `public` means it can be accessed from anywhere.
    - `static` means it belongs to the class itself and not to an instance.
    - `void` means it does not return any value.
    - `main` is the recognized name for the starting method.
    - `String[] args` is a way for the program to receive input from the command line.
- **`System.out.println("Hello, World!");`**
    
    This line prints the message to the console.
    
    `System` is a built-in class, `out` is an output stream, and `println` is the method that prints text followed by a new line.
    
- **Braces `{ }`**
    
    Curly braces define the start and end of a block of code.
    
    Every opening brace `{` must have a closing brace `}`.
    

## Steps to Run the Program

1. Save the file as `HelloWorld.java`.
2. Open your terminal or command prompt.
3. Compile the code using:
    
    ```
    javac HelloWorld.java
    ```
    
- This creates `HelloWorld.class`.
1. Run the program using:
    
    ```
    java HelloWorld
    ```
    
2. You will see:

```
Hello, World!
```

## Common Beginner Mistakes

- **Filename mismatch**
    
    If the filename does not match the class name, you will get an error.
    
- **Missing or misplaced braces**
    
    Java needs matching opening and closing braces `{}`. Forgetting them will cause compilation errors.
    
- **Case sensitivity**
    
    Java is case-sensitive. `System` must be written exactly with a capital S, not `system` or `SYSTEM`.
    
- **Incorrect method signature**
    
    The main method must be exactly:
    
    ```
    public static void main(String[] args)
    ```
    

Now you have built and run your very first Java program. This basic structure will remain similar even when you start writing much bigger and more complex programs later.

# 6. Java Variables and Data Types

Now that we have learned about variables, it’s time to dive deeper into what kind of data they can hold. Data in Java is classified into two main categories: **Primitive Data Types** and **Non-Primitive Data Types**.

## 1. Primitive Data Types

Primitive data types are the most basic types of data that Java provides. They are used to store simple values, such as numbers, characters, or true/false values. These types are built-in and are not objects. They are much faster and more memory-efficient compared to non-primitive types.

### Characteristics of Primitive Data Types:

- **Hold only one value** (not multiple values).
- **Not objects**, just raw values stored directly in memory.
- **No methods** associated with them.
- **Built-in and predefined** in Java.

There are **8 primitive data types** in Java:

- **`int`**
    - Stores whole numbers.
    - **Size**: 4 bytes.
    - **Range**: -2,147,483,648 to 2,147,483,647.
    - **Use**: Common for counting, amounts, or quantities.
    - **Example**: `int age = 25;`
- **`byte`**
    - Stores very small whole numbers.
    - **Size**: 1 byte (8 bits).
    - **Range**: -128 to 127.
    - **Use**: When memory savings are critical (like storing small numbers such as age or flags).
    - **Example**: `byte level = 5;`
- **`short`**
    - Stores small whole numbers.
    - **Size**: 2 bytes.
    - **Range**: -32,768 to 32,767.
    - **Use**: Slightly larger numbers than `byte` but still memory-efficient.
    - **Example**: `short temperature = 22;`
- **`long`**
    - Stores very large whole numbers.
    - **Size**: 8 bytes.
    - **Range**: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807.
    - **Use**: When numbers are too large for `int` (e.g., large populations or distances).
    - **Example**: `long population = 1400000000L;` (Note: Add `L` at the end to indicate a `long` value)
- **`float`**
    - Stores decimal numbers with less precision.
    - **Size**: 4 bytes.
    - **Range**: 1.40239846e-45f to 3.40282347e+38f.
    - **Use**: When you need to store decimal values with less precision (e.g., temperature, simple measurements).
    - **Example**: `float amount = 12.5f;` (Note: Add `f` at the end to indicate a `float` value)
- **`char`**
    - Stores a single character.
    - **Size**: 2 bytes.
    - **Range**: 0 to 65,535.
    - **Use**: For storing individual characters (e.g., letters, digits, symbols).
    - **Example**: `char grade = 'A';`
- **`double`**
    - Stores decimal numbers with more precision.
    - **Size**: 8 bytes.
    - **Range**: 4.94065645841246544e-324d to 1.79769313486231570e+308d.
    - **Use**: For more accurate decimal values (e.g., financial calculations, measurements).
    - **Example**: `double price = 19.99;`
- **`boolean`**
    - Stores only two values: `true` or `false`.
    - **Size**: 1 bit.
    - **Use**: For logical conditions (e.g., checking if something is true or false).
    - **Example**: `boolean isLoggedIn = true;`

## 2. Non-Primitive Data Types

Non-primitive data types, also known as **reference types**, are more complex than primitive types. They are used to store groups of values or more complex structures.

### Characteristics of Non-Primitive Data Types:

- **Hold multiple values** or even **functions**.
- **Objects** or created from objects.
- **Have methods** associated with them.
- **Do not have fixed sizes**; their size depends on the data stored.

The most commonly used non-primitive data types are:

- **`String`**
    - Stores a sequence of characters (text).
    - **Use**: When you need to store text, names, sentences.
    - **Example**: `String name = "Alice";`
- **`Array`**
    - Stores a fixed group of values of the same type.
    - **Use**: When you need a list of items (e.g., list of marks, prices, or names).
    - **Example**: `int[] marks = {80, 90, 75};`
    
    Arrays are particularly useful for organizing data that you want to access by index.
    

## How to Choose Between Primitive and Non-Primitive Types

- If you need to store **simple values** like numbers or true/false conditions, use **primitive types**. They are faster and more memory-efficient.
- If you need to store more **complex data** or work with a collection of items, use **non-primitive types** like arrays or strings.

## Common Mistakes with Data Types

- **Mixing up primitive and non-primitive types**:
    
    For example, `String` is a non-primitive type, but beginners sometimes confuse it with a primitive type. Always remember that `String` is an object, not a basic data type.
    
- **Assigning incompatible values**:
    
    You cannot store a non-integer value (e.g., a decimal number) in an `int` variable. Ensure the data type matches the value being stored.
    
- **Forgetting the suffix** for `long` and `float` values:
    
    Java requires you to use `L` for `long` values and `f` for `float` values to distinguish them from other data types.
    

Example:

```
int population = 7000000000; // Error: Too large for int, use long
long population = 7000000000L; // Correct: Use L for long
```

By understanding the distinction between primitive and non-primitive types, you’ll be able to make the right choices for your variables and improve the structure and performance of your programs.

# 7. Java Operators

After understanding how variables hold values, the next question is: how do we make them interact?

For example:

- Add two numbers
- Check if a user has passed an exam
- Multiply a salary by a bonus

Java gives you a toolbox called **operators** to handle these actions.

Operators are special symbols or keywords that perform operations on variables and values.

---

## Why Operators?

Imagine you have:

```
int x = 10;
int y = 5;
```

You want to find their sum.

Without an operator, there's no way to tell Java "add x and y".

Using `+` operator:

```
int sum = x + y;  // sum will be 15
```

Operators **bridge the gap** between values and actions.

## Types of Operators in Java

Let’s see the main categories and **individual examples** for each operator.

### 1. Arithmetic Operators

These are used to perform basic math.

**Addition `+`**

- Adds two numbers.
- Example:
    
    ```
    int sum = 7 + 3; // 10
    ```
    

**Subtraction `-`**

- Subtracts the second number from the first.
- Example:
    
    ```
    int difference = 7 - 3; // 4
    ```
    

**Multiplication `*`**

- Multiplies two numbers.
- Example:
    
    ```
    int product = 7 * 3; // 21
    ```
    

**Division `/`**

- Divides the first number by the second.
- Example:
    
    ```
    int quotient = 7 / 3; // 2
    ```
    

**Modulus `%`**

- Gives the remainder of division.
- Example:
    
    ```
    int remainder = 7 % 3; // 1
    ```
    

### 2. Relational (Comparison) Operators

These are used to compare two values.

The result is always `true` or `false`.

**Equal to `==`**

- Checks if two values are equal.
    
    Example:
    

```
boolean isEqual = (5 == 5); // true
```

**Not Equal to `!=`**

- Checks if two values are not equal.
    
    Example:
    
    ```
    boolean notEqual = (5 != 3); // true
    ```
    

**Greater than `>`**

- Checks if the first value is greater than the second.
    
    Example:
    
    ```
    boolean isGreater = (5 > 3); // true
    ```
    

**Less than `<`**

- Checks if the first value is less than the second.
    
    Example:
    
    ```
    boolean isLesser = (3 < 5); // true
    ```
    

**Greater than or equal to `>=`**

- Checks if the first value is greater than or equal to the second.
    
    Example:
    
    ```
    boolean isGreaterOrEqual = (5 >= 5); // true
    ```
    

**Less than or equal to `<=`**

- Checks if the first value is less than or equal to the second.
    
    Example:
    
    ```
    boolean isLesserOrEqual = (3 <= 5); // true
    ```
    

### 3. Logical Operators

These are used to combine multiple conditions.

**AND `&&`**

- Returns true if both conditions are true.
    
    Example:
    
    ```
    boolean result = (5 > 3) && (8 > 5); // true
    ```
    

**OR `||`**

- Returns true if at least one condition is true.
    
    Example:
    
    ```
    boolean result = (5 < 3) || (8 > 5); // true
    ```
    

**NOT `!`**

- Reverses the condition.
    
    Example:
    
    ```
    boolean result = !(5 > 3); // false
    ```
    

### 4. Assignment Operators

Used to assign or modify values stored in variables.

**Simple Assignment `=`**

- Assigns the right-side value to the left-side variable.
    
    Example:
    
    ```
    int a = 10;
    ```
    

**Add and Assign `+=`**

- Adds right-side value to the left-side variable and stores the result back.
    
    Example:
    
    ```
    int a = 5;
    a += 3; // a = 8
    ```
    

**Subtract and Assign `-=`**

- Subtracts right-side value and stores the result back.
    
    Example:
    
    ```
    int a = 5;
    a -= 2; // a = 3
    ```
    

**Multiply and Assign `*=`**

- Multiplies and stores the result back.
    
    Example:
    
    ```
    int a = 5;
    a *= 2; // a = 10
    ```
    

**Divide and Assign `/=**

- Divides and stores the result back.

Example:

```
int a = 10;
a /= 2; // a = 5
```

## Real World Usage of Operators

- In games, to calculate scores and health (`+`, ).
- In websites, to check login success (`==`, `!=`).
- In banking apps, to update account balance (`+=`, `=`).

## Common Mistakes

Using `=` instead of `==` for comparison:

```
if (a = b)  // wrong
if (a == b) // correct
```

Expecting decimal results from integer division:

```
int result = 5 / 2; // result is 2, not 2.5
```

- Solution: use `double` if you want decimals.

Forgetting about operator precedence:

```
int result = 2 + 3 * 4; // 14, not 20
```

Use parentheses to control the flow:

```
int result = (2 + 3) * 4; // 20
```

# 8. Input and Output in Java (Using Scanner Class)

In any real-world program, you usually don't just work with fixed values.

You want the user to give input at runtime — like typing their name, age, or selecting an option.

Java gives you a tool for that: the **Scanner class**.

It lets your program **take input** from the user easily.

## Why Input is Needed?

Example:

Imagine you build a calculator app.

You cannot just hard-code two numbers every time.

Instead, you need the user to enter two numbers.

Only then can your app calculate the result based on the user’s needs.

## How to Get Input in Java?

To take input, you need:

- Import the Scanner class.
- Create an object of Scanner.
- Use its methods like `nextInt()`, `nextLine()`, `nextDouble()` etc. to read user input.

## Steps to Use Scanner

- **Step 1: Import Scanner Class**

```
import java.util.Scanner;
```

Java keeps Scanner inside the `java.util` package, so you must import it first.

- **Step 2: Create Scanner Object**

```
Scanner sc = new Scanner(System.in);
```

Here, `sc` is just a variable name (you can name it anything).

`System.in` tells Scanner to read from the keyboard.

- **Step 3: Use Scanner Methods to Read Input**
    
    Some common Scanner methods:
    
    - `nextInt()` → Reads an integer
    - `nextFloat()` → Reads a float
    - `nextDouble()` → Reads a double
    - `nextLine()` → Reads an entire line (including spaces)
    - `next()` → Reads one word (up to space)
    - `nextBoolean()` → Reads true/false value

## Example: Taking User Input

Let’s say you want to ask the user their name and age.

```
import java.util.Scanner;

public class UserInputExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = sc.nextLine(); // reading a full line

        System.out.print("Enter your age: ");
        int age = sc.nextInt(); // reading an integer

        System.out.println("Hello " + name + ", you are " + age + " years old.");

        sc.close(); // closing the scanner
    }
}
```

## Why Closing Scanner is Important?

After you finish taking input, you should always close the Scanner using:

```
sc.close();
```

It frees up memory and resources that Scanner was using internally.

## Some Important Points to Remember

- If you use `nextInt()` and then `nextLine()`, you might face problems because `nextInt()` doesn't consume the newline character.
    
    Example Problem:
    
    ```
    int age = sc.nextInt();
    String name = sc.nextLine(); // This might not work as expected
    ```
    

- Solution:
    
    Add an extra `sc.nextLine();` after `nextInt();` to consume the leftover newline.
    
- Always display a clear message before asking for input.
    
    Example: `System.out.print("Enter your age: ");`
    
    Otherwise, users might not know what to type.
    

## Real World Use of Scanner

- Taking login credentials (username, password)
- Asking user preferences (language, theme)
- Filling registration forms (name, email, phone)
- Interactive games (asking user moves)

## Problems You May Face with Scanner

- Mixing different input types (like reading `int` and `String` together) can cause confusion.
- Forgetting to close Scanner can lead to memory leaks in big applications.
- Using `next()` when you actually needed `nextLine()` (which reads whole line).

Always test input carefully to make sure Scanner reads exactly what you expect.

# 9. Control Statements in Java (if, if-else, switch)

Until now, your Java programs have probably run from top to bottom, line by line.

But real-world problems are never so straightforward.

You often need to **make decisions** in your programs.

For example:

- If a user enters the correct password, log them in.
- If a number is positive, negative, or zero, respond accordingly.
- Depending on the user’s choice, perform a different task.

Java gives us **control statements** to handle these kinds of decision-making situations.

## 1. if Statement

The `if` statement tests a condition.

If the condition is true, it runs the block of code inside.

If it is false, it simply skips that block.

**Syntax:**

```
if (condition) {
    // code to execute if condition is true
}
```

**Example:**

```
int age = 18;
if (age >= 18) {
    System.out.println("You are eligible to vote.");
}
```

In this example, if age is 18 or more, the message will be printed.

If not, nothing happens.

## 2. if-else Statement

Sometimes, you want one thing to happen if the condition is true and another thing if it is false.

This is where `if-else` comes in.

**Syntax:**

```
if (condition) {
    // code to execute if condition is true
} else {
    // code to execute if condition is false
}
```

**Example:**

```
int marks = 45;
if (marks >= 50) {
    System.out.println("You passed.");
} else {
    System.out.println("You failed.");
}
```

Here:

- If `marks` are 50 or more, it prints "You passed."
- Otherwise, it prints "You failed."

## 3. if-else-if Ladder

When you have multiple conditions to test, you use `if-else-if`.

**Syntax:**

```
if (condition1) {
    // code
} else if (condition2) {
    // code
} else if (condition3) {
    // code
} else {
    // default code
}
```

**Example:**

```
int score = 85;
if (score >= 90) {
    System.out.println("Grade A");
} else if (score >= 75) {
    System.out.println("Grade B");
} else if (score >= 60) {
    System.out.println("Grade C");
} else {
    System.out.println("Fail");
}
```

This way you can check many conditions in order.

## 4. switch Statement

When you have many options based on the **same variable**, writing many `if-else` statements can look messy.

The `switch` statement is a cleaner way to select among many choices.

**Syntax:**

```
switch (expression) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    ...
    default:
        // code
}
```

- `expression` is evaluated once.
- It is compared with each `case`.
- If a match is found, corresponding code runs.
- `break` stops further checking.
- `default` runs if no cases match.

**Example:**

```
int day = 3;

switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    case 4:
        System.out.println("Thursday");
        break;
    default:
        System.out.println("Invalid day");
}
```

Since `day` is 3, output will be:

```
Wednesday
```

## Important Points to Remember

- In `if`, the condition must be a Boolean (true or false).
- In `switch`, the expression can be `int`, `char`, `String`, or `enum` type (not `float`, `double`, `long`).
- Always use `break` inside each `case` to prevent falling through to next cases.
- `default` is optional but recommended.

## Where Control Statements Are Used in Real Life Projects

- Login systems (checking username/password)
- Online forms (validating user input)
- Games (player’s choice or move selection)
- Menus (user selecting an option)

## Common Mistakes Beginners Make

- Forgetting to use `break` in `switch`, causing multiple cases to run.
- Putting a semicolon immediately after `if(condition);` which terminates the block.
- Comparing wrong types inside `switch`, like using a `float` which is not allowed.

# 10. Looping Statements in Java (for, while, do-while)

Many times, in real-world programs, you need to repeat a task multiple times.

Instead of writing the same code again and again, Java gives you **loops** to make repetition easy.

With loops, you can:

- Print a message 100 times
- Process each item in a list
- Keep asking the user until they give a valid input

Java provides three main types of loops:

- for loop
- while loop
- do-while loop

## 1. for Loop

When you know **how many times** you want to repeat something, use a `for` loop.

**Syntax:**

```
for (initialization; condition; update) {
    // code to repeat
}
```

- **Initialization:** Runs once before the loop starts (example: `int i = 0`)
- **Condition:** Checked before each repetition. If true, loop continues.
- **Update:** Changes the variable after each loop (example: `i++`)

**Example:**

```
for (int i = 1; i <= 5; i++) {
    System.out.println("Hello World");
}
```

This prints "Hello World" five times.

## 2. while Loop

When you **do not know exactly** how many times you want to repeat something, and it depends on a condition, use a `while` loop.

**Syntax:**

```
while (condition) {
    // code to repeat
}
```

- The condition is checked **before** each repetition.
- If the condition is false from the beginning, the loop may not run at all.

**Example:**

```
int i = 1;
while (i <= 5) {
    System.out.println("Hello World");
    i++;
}
```

Here, the loop will run five times because `i` starts at 1 and goes up to 5.

## 3. do-while Loop

Sometimes, you want the code to **run at least once**, even if the condition is false.

In that case, you use a `do-while` loop.

**Syntax:**

```
do {
    // code to repeat
} while (condition);
```

- The code inside `do` block runs **first**.
- Then the condition is checked.
- If true, the loop continues.

**Example:**

```
int i = 1;
do {
    System.out.println("Hello World");
    i++;
} while (i <= 5);
```

Even if the condition was false at the start, the code would have run at least once.

Differences Between for, while, and do-while

| Feature | for Loop | while Loop | do-while Loop |
| --- | --- | --- | --- |
| Initialization | Inside the loop statement | Before the loop | Before the loop |
| Condition Check | Before running the block | Before running the block | After running the block |
| Runs Minimum | 0 times (if condition false) | 0 times (if condition false) | 1 time (even if false) |

## Real-World Uses of Loops

- Repeating a menu until the user chooses exit
- Displaying all items in a shopping cart
- Sending emails to a list of users
- Running a game until the player wins or loses

## Common Mistakes Beginners Make

- Forgetting to update the loop variable (causes infinite loop)
- Using `while (true)` without a proper exit condition
- Misplacing the semicolon `;` accidentally after `for` or `while`

Example of wrong code:

```
while (i <= 5); // wrong semicolon
{
    System.out.println("Hello World"); 
    i++;
}
```

This will not behave like a loop at all.

Always be careful about:

- Correct condition
- Proper updating of variables
- Not placing semicolon right after loop header

# 11. Break and Continue Statements in Java

When you are working with loops, sometimes you need more control:

- You may want to **stop** a loop in the middle.
- You may want to **skip** a part of the loop but not stop it completely.

Java gives two special keywords to control loop execution:

- `break`
- `continue`

Let’s understand them in detail.

---

## 1. break Statement

The `break` statement is used to **immediately stop** a loop or switch statement.

When `break` is executed inside a loop:

- The loop ends right away.
- The program control moves to the next statement after the loop.

**Example inside a loop:**

```
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;
    }
    System.out.println(i);
}
```

**Output:**

```
1
2
3
4
```

- When `i` becomes 5, the `break` statement stops the loop immediately.
- So only 1 to 4 are printed.

**Where break is used:**

- Exiting a loop early when a certain condition is met.
- Exiting a `switch` case after the matching block is executed.

## 2. continue Statement

The `continue` statement is used to **skip** the current iteration of a loop and move to the next one.

When `continue` is executed:

- It jumps to the next iteration of the loop immediately.
- The remaining code inside the loop for that particular cycle is skipped.

**Example inside a loop:**

```
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;
    }
    System.out.println(i);
}
```

**Output:**

```
1
2
4
5
```

- When `i` becomes 3, `continue` skips printing 3.
- The loop still runs for all other values.

Important Differences

| Feature | break | continue |
| --- | --- | --- |
| What it does | Stops the loop completely | Skips to next iteration |
| After effect | Goes to the next line after loop | Continues looping |

## Real World Use Cases

- `break`:
    - Searching for an item in a list and stopping when found.
    - Quitting a game when the player loses.
- `continue`:
    - Skipping invalid entries in a user input list.
    - Ignoring weekends in a daily work schedule loop.

## Common Mistakes Beginners Make

- Using `break` when they actually needed `continue`, which stops the loop earlier than needed.
- Forgetting that `continue` only skips the current loop cycle, it does not stop the loop.
- Placing `break` or `continue` outside a loop or switch block, which causes compile-time errors.

# Quick Summary

- **break** = Stop the entire loop immediately.
- **continue** = Skip the current cycle and move to the next one.