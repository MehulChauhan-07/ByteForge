// ExercisesPage.js
import React, { useState } from "react";
import {
  Dumbbell,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Trophy,
} from "lucide-react";

const ExercisesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const difficulties = ["All", "Easy", "Medium", "Hard", "Challenge"];

  const exercises = [
    {
      id: 1,
      title: "Build a Responsive Navigation Bar",
      description:
        "Create a mobile-friendly navigation bar using HTML, CSS, and JavaScript.",
      difficulty: "Easy",
      estimatedTime: "30 min",
      pointsValue: 50,
      completionRate: "87%",
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: 2,
      title: "Create a To-Do List Application",
      description:
        "Build a functional to-do list app with local storage integration.",
      difficulty: "Medium",
      estimatedTime: "45 min",
      pointsValue: 100,
      completionRate: "72%",
      tags: ["JavaScript", "DOM", "LocalStorage"],
    },
    {
      id: 3,
      title: "API Data Fetching and Display",
      description:
        "Fetch data from a public API and display it in a formatted table.",
      difficulty: "Medium",
      estimatedTime: "40 min",
      pointsValue: 100,
      completionRate: "68%",
      tags: ["API", "Fetch", "JavaScript"],
    },
    {
      id: 4,
      title: "Build a Calculator",
      description:
        "Create a functional calculator with basic arithmetic operations.",
      difficulty: "Medium",
      estimatedTime: "60 min",
      pointsValue: 125,
      completionRate: "58%",
      tags: ["JavaScript", "DOM", "Math"],
    },
    {
      id: 5,
      title: "Redux State Management Challenge",
      description:
        "Implement Redux for state management in a multi-component application.",
      difficulty: "Hard",
      estimatedTime: "90 min",
      pointsValue: 200,
      completionRate: "43%",
      tags: ["React", "Redux", "State Management"],
    },
    {
      id: 6,
      title: "Build a Weather Dashboard",
      description:
        "Create a weather dashboard using a weather API with location search.",
      difficulty: "Hard",
      estimatedTime: "75 min",
      pointsValue: 175,
      completionRate: "49%",
      tags: ["API", "JavaScript", "UI Design"],
    },
    {
      id: 7,
      title: "Coding Interview Challenge: Binary Search Tree",
      description:
        "Implement a binary search tree with insert, delete, and search operations.",
      difficulty: "Challenge",
      estimatedTime: "120 min",
      pointsValue: 300,
      completionRate: "32%",
      tags: ["Algorithms", "Data Structures", "JavaScript"],
    },
  ];

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesDifficulty =
      selectedDifficulty === "All" ||
      exercise.difficulty === selectedDifficulty;

    return matchesSearch && matchesDifficulty;
  });

  // Get a color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-orange-100 text-orange-800";
      case "Challenge":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Practice Exercises</h1>
        <p className="text-gray-600">
          Sharpen your skills with these hands-on coding exercises
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search exercises or tags..."
            className="w-full p-2 pl-10 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative w-full md:w-64">
          <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
          <select
            className="w-full p-2 pl-10 border rounded-lg appearance-none bg-white"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded ${getDifficultyColor(
                      exercise.difficulty
                    )}`}
                  >
                    {exercise.difficulty}
                  </span>
                  {exercise.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold">{exercise.title}</h3>
                <p className="text-gray-600 mt-1">{exercise.description}</p>
              </div>

              <div className="flex flex-row md:flex-col gap-4 md:w-48 md:text-right">
                <div className="flex items-center md:justify-end gap-1">
                  <Clock size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {exercise.estimatedTime}
                  </span>
                </div>
                <div className="flex items-center md:justify-end gap-1">
                  <Trophy size={16} className="text-yellow-500" />
                  <span className="text-sm text-gray-600">
                    {exercise.pointsValue} points
                  </span>
                </div>
                <div className="flex items-center md:justify-end gap-1">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-sm text-gray-600">
                    {exercise.completionRate} completion
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
                Start Exercise
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <Dumbbell size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No exercises found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default ExercisesPage;
