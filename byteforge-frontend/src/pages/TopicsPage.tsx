// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Link } from "react-router-dom";
// import { ArrowRight, Clock, Search } from "lucide-react";
// import { topics } from "@/data/topics"; // Import from the data file
// import Sidebar from "@/components/features/Java_Topics/Sidebar"; // Import the Sidebar component

// const TopicsPage = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [levelFilter, setLevelFilter] = useState<string | null>(null);

//   const filteredTopics = topics.filter((topic) => {
//     const matchesSearch =
//       topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       topic.topics.some((t) =>
//         t.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//     const matchesLevel = levelFilter ? topic.level === levelFilter : true;

//     return matchesSearch && matchesLevel;
//   });

//   return (
//     <div className="container py-12 flex">
//       {/* Sidebar */}
//       <div className="w-1/4">
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="w-3/4 pl-8">
//         <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
//           <div className="space-y-2">
//             <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//               Java Learning Topics
//             </h1>
//             <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
//               Browse our comprehensive collection of Java learning materials
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="relative flex-1">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search topics..."
//               className="pl-8"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant={levelFilter === null ? "default" : "outline"}
//               onClick={() => setLevelFilter(null)}
//             >
//               All
//             </Button>
//             <Button
//               variant={levelFilter === "Beginner" ? "default" : "outline"}
//               onClick={() => setLevelFilter("Beginner")}
//             >
//               Beginner
//             </Button>
//             <Button
//               variant={levelFilter === "Intermediate" ? "default" : "outline"}
//               onClick={() => setLevelFilter("Intermediate")}
//             >
//               Intermediate
//             </Button>
//             <Button
//               variant={levelFilter === "Advanced" ? "default" : "outline"}
//               onClick={() => setLevelFilter("Advanced")}
//             >
//               Advanced
//             </Button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTopics.map((topic) => (
//             <Card key={topic.id} className="overflow-hidden">
//               <CardHeader className="pb-2">
//                 <div className="flex justify-between items-center">
//                   <Badge
//                     variant={
//                       topic.level === "Beginner"
//                         ? "default"
//                         : topic.level === "Intermediate"
//                         ? "secondary"
//                         : "outline"
//                     }
//                   >
//                     {topic.level}
//                   </Badge>
//                   <div className="flex items-center text-sm text-muted-foreground">
//                     <Clock className="mr-1 h-3 w-3" />
//                     {topic.duration}
//                   </div>
//                 </div>
//                 <CardTitle className="mt-2">{topic.title}</CardTitle>
//                 <CardDescription>{topic.description}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-wrap gap-2">
//                   {topic.topics.map((subtopic) => (
//                     <Badge key={subtopic} variant="outline">
//                       {subtopic}
//                     </Badge>
//                   ))}
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Button asChild className="w-full">
//                   <Link to={`/topics/${topic.id}`}>
//                     Start Learning <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>

//         {filteredTopics.length === 0 && (
//           <div className="text-center py-12">
//             <h3 className="text-xl font-medium mb-2">No topics found</h3>
//             <p className="text-muted-foreground">
//               Try adjusting your search or filters
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TopicsPage;

// ! this is the  original navigation bar
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Search,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { topics } from "@/data/topics"; // Import from the data file

import { javaBasicsContent } from "@/data/javaBasicsContent"; // Import Java basics content

// Sample code examples
import { codeExamples } from "@/data/codeExamples"; // Import code examples

const TopicsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [inDetailView, setInDetailView] = useState(false);
  const [codeOutput, setCodeOutput] = useState<string>("");

  // Handle card click
  const handleCardClick = (topicId: string) => {
    setSelectedTopic(topicId);
    setInDetailView(true);

    // For Java basics, default to the introduction subtopic
    if (topicId === "java-basics") {
      setSelectedSubtopic("introduction");
    } else {
      setSelectedSubtopic(null);
    }
  };

  // Handle subtopic selection
  const handleSubtopicClick = (topicId: string, subtopic: string) => {
    setSelectedTopic(topicId);
    setSelectedSubtopic(
      subtopic.toLowerCase().replace(" & ", "-").replace(/\s+/g, "-")
    );
  };

  // Return to the list view
  const handleBackClick = () => {
    setInDetailView(false);
    setSelectedTopic(null);
    setSelectedSubtopic(null);
  };

  // Simple code execution simulation
  const runCode = () => {
    setCodeOutput("Code executed successfully!\n\nOutput:\nHello, ByteForge!");
  };

  const filteredTopics = topics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.topics.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesLevel = levelFilter ? topic.level === levelFilter : true;

    return matchesSearch && matchesLevel;
  });

  // Find the selected topic object
  const activeTopic = selectedTopic
    ? topics.find((topic) => topic.id === selectedTopic)
    : null;

  // Get the appropriate code example for the selected subtopic
  const getCodeExample = () => {
    if (!selectedSubtopic) return codeExamples.introduction;
    return (
      codeExamples[selectedSubtopic as keyof typeof codeExamples] ||
      codeExamples.introduction
    );
  };

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Java Learning Topics
          </h1>
          <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
            Browse our comprehensive collection of Java learning materials
          </p>
        </div>
      </div>

      {!inDetailView && (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search topics..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={levelFilter === null ? "default" : "outline"}
              onClick={() => setLevelFilter(null)}
            >
              All
            </Button>
            <Button
              variant={levelFilter === "Beginner" ? "default" : "outline"}
              onClick={() => setLevelFilter("Beginner")}
            >
              Beginner
            </Button>
            <Button
              variant={levelFilter === "Intermediate" ? "default" : "outline"}
              onClick={() => setLevelFilter("Intermediate")}
            >
              Intermediate
            </Button>
            <Button
              variant={levelFilter === "Advanced" ? "default" : "outline"}
              onClick={() => setLevelFilter("Advanced")}
            >
              Advanced
            </Button>
          </div>
        </div>
      )}

      {inDetailView ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Back button for mobile */}
          <Button
            variant="outline"
            className="mb-4 lg:hidden"
            onClick={handleBackClick}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
          </Button>

          {/* Sidebar */}
          <div className="w-full lg:w-1/4 shrink-0">
            <Card className="sticky top-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{activeTopic?.title || "Topic"}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden lg:flex items-center"
                    onClick={handleBackClick}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                </div>
                <CardDescription>{activeTopic?.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <nav className="space-y-2">
                  {activeTopic && (
                    <div className="space-y-1 mt-1">
                      {activeTopic.topics.map((subtopic) => (
                        <div
                          key={subtopic}
                          className={`py-2 px-3 rounded-md cursor-pointer ${
                            selectedSubtopic ===
                            subtopic
                              .toLowerCase()
                              .replace(" & ", "-")
                              .replace(/\s+/g, "-")
                              ? "bg-slate-200 dark:bg-slate-700 font-medium"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                          onClick={() =>
                            handleSubtopicClick(activeTopic.id, subtopic)
                          }
                        >
                          {subtopic}
                        </div>
                      ))}
                    </div>
                  )}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content area */}
          <div className="flex-1">
            {selectedTopic === "java-basics" &&
              selectedSubtopic &&
              javaBasicsContent[
                selectedSubtopic as keyof typeof javaBasicsContent
              ] && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {
                        javaBasicsContent[
                          selectedSubtopic as keyof typeof javaBasicsContent
                        ].title
                      }
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      {javaBasicsContent[
                        selectedSubtopic as keyof typeof javaBasicsContent
                      ].content
                        .split("\n\n")
                        .map((paragraph, idx) => (
                          <p key={idx} className="whitespace-pre-line">
                            {paragraph}
                          </p>
                        ))}
                    </div>

                    {/* Simple Interactive Code Playground */}
                    <div className="mt-6 border rounded-md overflow-hidden">
                      <div className="bg-slate-100 dark:bg-slate-800 p-2 border-b flex justify-between items-center">
                        <h3 className="text-sm font-medium">
                          Interactive Code Playground
                        </h3>
                        <Button size="sm" onClick={runCode}>
                          Run Code
                        </Button>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-900">
                        <pre className="text-sm font-mono whitespace-pre-wrap">
                          {getCodeExample()}
                        </pre>
                      </div>
                      {codeOutput && (
                        <div className="p-4 bg-black text-green-400 font-mono text-sm">
                          <pre>{codeOutput}</pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between w-full">
                      <Button variant="outline" onClick={handleBackClick}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
                      </Button>
                      <Button asChild>
                        <Link to={`/topics/${selectedTopic}`}>
                          Full Course <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )}
          </div>
        </div>
      ) : (
        // Topic cards grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <Card
              key={topic.id}
              className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg"
              onClick={() => handleCardClick(topic.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Badge
                    variant={
                      topic.level === "Beginner"
                        ? "default"
                        : topic.level === "Intermediate"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {topic.level}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {topic.duration}
                  </div>
                </div>
                <CardTitle className="mt-2">{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {topic.topics.map((subtopic) => (
                    <Badge key={subtopic} variant="outline">
                      {subtopic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Explore Topic <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!inDetailView && filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No topics found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default TopicsPage;

// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Link } from "react-router-dom";
// import {
//   ArrowRight,
//   Clock,
//   Search,
//   ChevronDown,
//   ChevronRight,
//   ArrowLeft,
// } from "lucide-react";
// import { topics } from "@/data/topics"; // Import from the data file

// import { javaBasicsContent } from "@/data/javaBasicsContent"; // Import Java basics content

// // Sample code examples
// import { codeExamples } from "@/data/codeExamples"; // Import code examples

// const TopicsPage = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [levelFilter, setLevelFilter] = useState<string | null>(null);
//   const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
//   const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
//   const [inDetailView, setInDetailView] = useState(false);
//   const [codeOutput, setCodeOutput] = useState<string>("");

//   // Handle card click
//   const handleCardClick = (topicId: string) => {
//     setSelectedTopic(topicId);
//     setInDetailView(true);

//     // For Java basics, default to the introduction subtopic
//     if (topicId === "java-basics") {
//       setSelectedSubtopic("introduction");
//     } else {
//       setSelectedSubtopic(null);
//     }
//   };

//   // Handle subtopic selection
//   const handleSubtopicClick = (topicId: string, subtopic: string) => {
//     setSelectedTopic(topicId);
//     setSelectedSubtopic(
//       subtopic.toLowerCase().replace(" & ", "-").replace(/\s+/g, "-")
//     );
//   };

//   // Return to the list view
//   const handleBackClick = () => {
//     setInDetailView(false);
//     setSelectedTopic(null);
//     setSelectedSubtopic(null);
//   };


//   // Handle sidebar topic expansion toggle
//   const toggleExpand = (topicId: string) => {
//     setExpandedSubtopics((prev) => ({
//       ...prev,
//       [topicId]: !prev[topicId],
//     }));
//   };

//   // Handle quiz completion
//   const handleQuizComplete = () => {
//     setShowQuiz(false);
//     if (selectedTopic && selectedSubtopic) {
//       isSubtopicCompleted(selectedTopic, selectedSubtopic);
//     }
//   };

//   // Check if subtopic is completed
//   const isSubtopicCompleted = (topicId: string, subtopicId: string) => {
//     return progress[topicId]?.subtopics[subtopicId] || false;
//   };

//   // Toggle quiz view
//   const toggleQuiz = () => {
//     setShowQuiz((prev) => !prev);
//   };

//   // Simple code execution simulation
//   const runCode = (code: string) => {
//     setCodeOutput("Code executed successfully!\n\nOutput:\nHello, ByteForge!");
//   };

//   // Filter topics based on search and level
//   const filteredTopics = topics.filter((topic) => {
//     const matchesSearch =
//       topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       topic.topics.some((t) =>
//         t.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//     const matchesLevel = levelFilter ? topic.level === levelFilter : true;

//     return matchesSearch && matchesLevel;
//   });

//   // Find the selected topic object
//   const activeTopic = selectedTopic
//     ? topics.find((topic) => topic.id === selectedTopic)
//     : null;

//   // Get the appropriate code example for the selected subtopic
//   const getCodeExample = () => {
//     if (!selectedSubtopic) return codeExamples.introduction;
//     return (
//       codeExamples[selectedSubtopic as keyof typeof codeExamples] ||
//       codeExamples.introduction
//     );
//   };

//   const getCompletionPercentage = (selectedTopic: string): number => {
//     // Implement your logic to calculate the completion percentage
//     // For now, returning a dummy value
//     return 75; // Example: 75% complete
//   };

//   return (
//     <div className="container py-12">
//       <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
//         <div className="space-y-2">
//           <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//             Java Learning Topics
//           </h1>
//           <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
//             Browse our comprehensive collection of Java learning materials
//           </p>
//         </div>
//       </div>

//       {!inDetailView && (
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="relative flex-1">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search topics..."
//               className="pl-8"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant={levelFilter === null ? "default" : "outline"}
//               onClick={() => setLevelFilter(null)}
//             >
//               All
//             </Button>
//             <Button
//               variant={levelFilter === "Beginner" ? "default" : "outline"}
//               onClick={() => setLevelFilter("Beginner")}
//             >
//               Beginner
//             </Button>
//             <Button
//               variant={levelFilter === "Intermediate" ? "default" : "outline"}
//               onClick={() => setLevelFilter("Intermediate")}
//             >
//               Intermediate
//             </Button>
//             <Button
//               variant={levelFilter === "Advanced" ? "default" : "outline"}
//               onClick={() => setLevelFilter("Advanced")}
//             >
//               Advanced
//             </Button>
//           </div>
//         </div>
//       )}

//       {inDetailView ? (
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Back button for mobile */}
//           <Button
//             variant="outline"
//             className="mb-4 lg:hidden"
//             onClick={handleBackClick}
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
//           </Button>

//           {/* Sidebar */}
//           <div className="w-full lg:w-1/4 shrink-0">
//             <Card className="sticky top-4">
//               <CardHeader className="pb-2">
//                 <div className="flex justify-between items-center">
//                   <CardTitle>{activeTopic?.title || "Topic"}</CardTitle>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="hidden lg:flex items-center"
//                     onClick={handleBackClick}
//                   >
//                     <ArrowLeft className="mr-2 h-4 w-4" /> Back
//                   </Button>
//                 </div>
//                 <CardDescription>{activeTopic?.description}</CardDescription>
//               </CardHeader>
//               <CardContent className="pb-6">
//                 <nav className="space-y-2">
//                   {activeTopic && (
//                     <div className="space-y-1 mt-1">
//                       {activeTopic.topics.map((subtopic) => (
//                         <div
//                           key={subtopic}
//                           className={`py-2 px-3 rounded-md cursor-pointer ${
//                             selectedSubtopic ===
//                             subtopic
//                               .toLowerCase()
//                               .replace(" & ", "-")
//                               .replace(/\s+/g, "-")
//                               ? "bg-slate-200 dark:bg-slate-700 font-medium"
//                               : "hover:bg-slate-100 dark:hover:bg-slate-800"
//                           }`}
//                           onClick={() =>
//                             handleSubtopicClick(activeTopic.id, subtopic)
//                           }
//                         >
//                           {subtopic}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </nav>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Content area */}
//           <div className="flex-1">
//             {selectedTopic === "java-basics" &&
//               selectedSubtopic &&
//               javaBasicsContent[
//                 selectedSubtopic as keyof typeof javaBasicsContent
//               ] && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>
//                       {
//                         javaBasicsContent[
//                           selectedSubtopic as keyof typeof javaBasicsContent
//                         ].title
//                       }
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="prose dark:prose-invert max-w-none">
//                       {javaBasicsContent[
//                         selectedSubtopic as keyof typeof javaBasicsContent
//                       ].content
//                         .split("\n\n")
//                         .map((paragraph, idx) => (
//                           <p key={idx} className="whitespace-pre-line">
//                             {paragraph}
//                           </p>
//                         ))}
//                     </div>

//                     {/* Simple Interactive Code Playground */}
//                     <div className="mt-6 border rounded-md overflow-hidden">
//                       <div className="bg-slate-100 dark:bg-slate-800 p-2 border-b flex justify-between items-center">
//                         <h3 className="text-sm font-medium">
//                           Interactive Code Playground
//                         </h3>
//                         <Button size="sm" onClick={runCode}>
//                           Run Code
//                         </Button>
//                       </div>
//                       <div className="p-4 bg-slate-50 dark:bg-slate-900">
//                         <pre className="text-sm font-mono whitespace-pre-wrap">
//                           {getCodeExample()}
//                         </pre>
//                       </div>
//                       {codeOutput && (
//                         <div className="p-4 bg-black text-green-400 font-mono text-sm">
//                           <pre>{codeOutput}</pre>
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                   <CardFooter>
//                     <div className="flex justify-between w-full">
//                       <Button variant="outline" onClick={handleBackClick}>
//                         <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
//                       </Button>
//                       <Button asChild>
//                         <Link to={`/topics/${selectedTopic}`}>
//                           Full Course <ArrowRight className="ml-2 h-4 w-4" />
//                         </Link>
//                       </Button>
//                     </div>
//                   </CardFooter>
//                 </Card>
//               )}
//           </div>
//         </div>
//       ) : (
//         // Topic cards grid
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTopics.map((topic) => (
//             <Card
//               key={topic.id}
//               className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg"
//               onClick={() => handleCardClick(topic.id)}
//             >
//               <CardHeader className="pb-2">
//                 <div className="flex justify-between items-center">
//                   <CardTitle>{activeTopic?.title || "Topic"}</CardTitle>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="hidden lg:flex items-center"
//                     onClick={handleBackClick}
//                   >
//                     <ArrowLeft className="mr-2 h-4 w-4" /> Back
//                   </Button>
//                 </div>
//                 <CardDescription>{activeTopic?.description}</CardDescription>
//                 {selectedTopic && (
//                   <div className="mt-2">
//                     <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
//                       <div
//                         className="bg-blue-600 h-2 rounded-full"
//                         style={{
//                           width: `${getCompletionPercentage(selectedTopic)}%`,
//                         }}
//                       ></div>
//                     </div>
//                     <p className="text-xs text-right mt-1 text-muted-foreground">
//                       {getCompletionPercentage(selectedTopic)}% complete
//                     </p>
//                   </div>
//                 )}
//               </CardHeader>
//               <CardContent className="pb-6">
//                 <nav className="space-y-2">
//                   {activeTopic && (
//                     <div className="space-y-1 mt-1">
//                       {activeTopic.topics.map((subtopic) => {
//                         const subtopicId = subtopic
//                           .toLowerCase()
//                           .replace(" & ", "-")
//                           .replace(/\s+/g, "-");
//                         const isCompleted = selectedTopic
//                           ? isSubtopicCompleted(selectedTopic, subtopicId)
//                           : false;

//                         return (
//                           <div
//                             key={subtopic}
//                             className={`py-2 px-3 rounded-md cursor-pointer flex justify-between items-center ${
//                               selectedSubtopic === subtopicId
//                                 ? "bg-slate-200 dark:bg-slate-700 font-medium"
//                                 : "hover:bg-slate-100 dark:hover:bg-slate-800"
//                             }`}
//                             onClick={() =>
//                               handleSubtopicClick(activeTopic.id, subtopic)
//                             }
//                           >
//                             <span>{subtopic}</span>
//                             {isCompleted && (
//                               <CheckCircle className="h-4 w-4 text-green-500" />
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </nav>
//               </CardContent>
//               <CardFooter>
//                 <Button className="w-full">
//                   Explore Topic <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </CardFooter>
//             </Card>
//           </div>

//           {/* Content area */}
//           <div className="flex-1">
//             {selectedTopic &&
//               selectedSubtopic &&
//               !showQuiz &&
//               getContentData() && (
//                 <Card>
//                   <CardHeader>
//                     <div className="flex justify-between items-center">
//                       <CardTitle>{getContentData()?.title}</CardTitle>
//                       <div className="flex items-center gap-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={toggleQuiz}
//                         >
//                           Take Quiz
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() =>
//                             markSubtopicComplete(
//                               selectedTopic,
//                               selectedSubtopic
//                             )
//                           }
//                         >
//                           Mark Complete
//                         </Button>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     {/* Multi-format content */}
//                     <MultiFormatContent
//                       content={{
//                         text: getContentData()?.content || "",
//                         // In a real implementation, you would add real URLs here
//                         videoUrl:
//                           selectedSubtopic === "introduction"
//                             ? "https://www.youtube.com/embed/eIrMbAQSU34"
//                             : undefined,
//                         pdfUrl:
//                           selectedSubtopic === "introduction"
//                             ? "/cheatsheets/java-intro.pdf"
//                             : undefined,
//                       }}
//                       title="Learn"
//                     />

//                     {/* Interactive diagram for variables topic */}
//                     {selectedSubtopic === "variables" && (
//                       <div className="mt-6">
//                         <MemoryAllocationDiagram title="Memory Allocation Visualization" />
//                       </div>
//                     )}

//                     {/* Interactive code playground */}
//                     <div className="mt-6">
//                       <CodePlayground
//                         initialCode={
//                           codeExamples[
//                             selectedSubtopic as keyof typeof codeExamples
//                           ] || codeExamples.introduction
//                         }
//                         height="250px"
//                       />
//                     </div>

//                     {/* Comments section */}
//                     <CommentsSection
//                       content={{
//                         text: `Comments for ${selectedSubtopic}`,
//                       }}
//                       title="Discussion"
//                     />
//                   </CardContent>
//                   <CardFooter>
//                     <div className="flex justify-between w-full">
//                       <Button variant="outline" onClick={handleBackClick}>
//                         <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
//                       </Button>
//                       <Button asChild>
//                         <Link to={`/topics/${selectedTopic}`}>
//                           Full Course <ArrowRight className="ml-2 h-4 w-4" />
//                         </Link>
//                       </Button>
//                     </div>
//                   </CardFooter>
//                 </Card>
//               )}

//             {/* Quiz view */}
//             {selectedTopic && selectedSubtopic && showQuiz && (
//               <TopicQuiz
//                 topicId={selectedTopic}
//                 questions={getQuizQuestions()}
//                 onComplete={handleQuizComplete}
//               />
//             )}
//           </div>
//         </div>
//       ) : (
//         // Topic cards grid
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTopics.map((topic) => {
//             const completionPercentage = getCompletionPercentage(topic.id);

//             return (
//               <Card
//                 key={topic.id}
//                 className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg"
//                 onClick={() => handleCardClick(topic.id)}
//               >
//                 <CardHeader className="pb-2">
//                   <div className="flex justify-between items-center">
//                     <Badge
//                       variant={
//                         topic.level === "Beginner"
//                           ? "default"
//                           : topic.level === "Intermediate"
//                           ? "secondary"
//                           : "outline"
//                       }
//                     >
//                       {topic.level}
//                     </Badge>
//                     <div className="flex items-center text-sm text-muted-foreground">
//                       <Clock className="mr-1 h-3 w-3" />
//                       {topic.duration}
//                     </div>
//                   </div>
//                   <CardTitle className="mt-2">{topic.title}</CardTitle>
//                   <CardDescription>{topic.description}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="mb-4">
//                     <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
//                       <div
//                         className="bg-blue-600 h-2 rounded-full"
//                         style={{ width: `${completionPercentage}%` }}
//                       ></div>
//                     </div>
//                     <p className="text-xs text-right mt-1 text-muted-foreground">
//                       {completionPercentage}% complete
//                     </p>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {topic.topics.map((subtopic) => (
//                       <Badge key={subtopic} variant="outline">
//                         {subtopic}
//                       </Badge>
//                     ))}
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button className="w-full">
//                     Explore Topic <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </CardFooter>
//               </Card>
//             );
//           })}
//         </div>
//       )}

//       {!inDetailView && filteredTopics.length === 0 && (
//         <div className="text-center py-12">
//           <h3 className="text-xl font-medium mb-2">No topics found</h3>
//           <p className="text-muted-foreground">
//             Try adjusting your search or filters
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TopicsPage;
// function setShowQuiz(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }

