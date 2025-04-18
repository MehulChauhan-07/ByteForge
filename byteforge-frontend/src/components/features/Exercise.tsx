import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Exercise, TestCase } from "../../types";
import CodeEditor from "./CodeEditor";
import { toast } from "sonner";

interface ExerciseComponentProps {
  exercise: Exercise;
  onComplete: (passed: boolean) => void;
}

const ExerciseComponent: React.FC<ExerciseComponentProps> = ({
  exercise,
  onComplete,
}) => {
  const [code, setCode] = useState(exercise.starterCode);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  const runTestCases = async () => {
    setIsRunning(true);
    try {
      let allPassed = true;
      const results: string[] = [];

      for (const testCase of exercise.testCases) {
        // Here you would typically send the code to your backend for execution
        // For now, we'll simulate the execution
        const result = await simulateExecution(code, testCase);
        results.push(result);

        if (result !== testCase.expectedOutput) {
          allPassed = false;
        }
      }

      setOutput(results.join("\n"));
      onComplete(allPassed);

      if (allPassed) {
        toast.success("All test cases passed!");
      } else {
        toast.error("Some test cases failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error running test cases");
      console.error(error);
    } finally {
      setIsRunning(false);
    }
  };

  const simulateExecution = async (
    code: string,
    testCase: TestCase
  ): Promise<string> => {
    // Simulate execution delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return testCase.expectedOutput;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{exercise.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{exercise.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Your Code</h3>
            <CodeEditor
              code={code}
              language="java"
              onCodeChange={setCode}
              className="mb-4"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Test Cases</h3>
            <div className="space-y-2">
              {exercise.testCases.map((testCase, index) => (
                <div key={index} className="p-3 border rounded">
                  <p className="font-medium">Test Case {index + 1}</p>
                  <p className="text-sm text-gray-600">
                    Input: {testCase.input}
                  </p>
                  <p className="text-sm text-gray-600">
                    Expected Output: {testCase.expectedOutput}
                  </p>
                  {testCase.explanation && (
                    <p className="text-sm text-gray-500 mt-1">
                      {testCase.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Output</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
              {output || "No output yet"}
            </pre>
          </div>

          <Button
            onClick={runTestCases}
            disabled={isRunning}
            className="w-full"
          >
            {isRunning ? "Running..." : "Run Test Cases"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseComponent;
