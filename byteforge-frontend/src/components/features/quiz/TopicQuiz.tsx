import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProgress } from "@/context/ProgressContext";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface TopicQuizProps {
  topicId: string;
  questions: QuizQuestion[];
  onComplete: () => void;
}

const TopicQuiz: React.FC<TopicQuizProps> = ({
  topicId,
  questions,
  onComplete,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { updateQuizScore } = useProgress();

  const handleOptionSelect = (index: number) => {
    if (showExplanation) return; // Prevent changing after submission
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    if (!showExplanation) {
      setShowExplanation(true);
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
    } else {
      // Move to next question or finish quiz
      setShowExplanation(false);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      } else {
        setQuizCompleted(true);
        const finalScore =
          selectedOption === questions[currentQuestion].correctAnswer
            ? score + 1
            : score;
        const percentage = Math.round((finalScore / questions.length) * 100);
        updateQuizScore?.(topicId, percentage);
      }
    }
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold mb-4">{percentage}%</h2>
            <p className="mb-6">
              You scored {score} out of {questions.length} questions correctly.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            {percentage >= 70 ? (
              <p className="text-green-600 dark:text-green-400 font-medium">
                Great job! You've mastered this topic.
              </p>
            ) : (
              <p className="text-amber-600 dark:text-amber-400 font-medium">
                You might want to review this topic again.
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onComplete} className="w-full">
            Continue
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Your Knowledge</CardTitle>
        <div className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-3">{currentQ.question}</h3>
          <div className="space-y-2">
            {currentQ.options.map((option, index) => (
              <div
                key={index}
                className={`p-3 border rounded-md cursor-pointer transition-colors
                  ${
                    selectedOption === index
                      ? showExplanation
                        ? index === currentQ.correctAnswer
                          ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-600"
                          : "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-600"
                        : "bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-600"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {showExplanation && (
          <div
            className={`p-4 rounded-md mt-4 ${
              selectedOption === currentQ.correctAnswer
                ? "bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900"
                : "bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900"
            }`}
          >
            <h4
              className={`font-medium mb-2 ${
                selectedOption === currentQ.correctAnswer
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-700 dark:text-red-400"
              }`}
            >
              {selectedOption === currentQ.correctAnswer
                ? "Correct!"
                : "Incorrect"}
            </h4>
            <p>{currentQ.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleSubmitAnswer}
          disabled={selectedOption === null}
        >
          {showExplanation ? "Next Question" : "Check Answer"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TopicQuiz;
