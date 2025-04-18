import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { QuizQuestion } from "../../types";

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const score = calculateScore();
      setShowResults(true);
      onComplete(score);
    }
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return (
        score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0)
      );
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Your Score: {score}/{questions.length}
            </h2>
            <p className="text-lg mb-4">{percentage}%</p>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="p-4 border rounded">
                  <p className="font-semibold mb-2">{question.question}</p>
                  <p className="text-sm text-gray-600">
                    Your answer: {question.options[selectedAnswers[index]]}
                  </p>
                  <p className="text-sm text-gray-600">
                    Correct answer: {question.options[question.correctAnswer]}
                  </p>
                  <p className="text-sm mt-2">{question.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Question {currentQuestionIndex + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-lg font-medium">{currentQuestion.question}</p>
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  selectedAnswers[currentQuestionIndex] === index
                    ? "default"
                    : "outline"
                }
                className="w-full justify-start"
                onClick={() => handleAnswerSelect(index)}
              >
                {option}
              </Button>
            ))}
          </div>
          <Button
            className="w-full mt-4"
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestionIndex] === undefined}
          >
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Quiz;
