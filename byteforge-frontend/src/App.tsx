// import { Routes, Route } from "react-router-dom";
// import Layout from "@/components/common/Layout";
// import HomePage from "@/pages/Home";
// import LoginPage from "@/pages/LoginPage";
// import SignupPage from "@/pages/SignupPage";
// import AboutPage from "@/pages/About";
// import TopicsPage from "@/pages/TopicsPage";
// import CodePlayground from "./pages/CodePlayGround";
// import NotFoundPage from "@/pages/NotFoundPage";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route index element={<HomePage />} />
//         <Route path="login" element={<LoginPage />} />
//         <Route path="signup" element={<SignupPage />} />
//         <Route path="about" element={<AboutPage />} />
//         <Route path="topics" element={<TopicsPage />} />
//         <Route path="codeplayground" element={<CodePlayground />} />
//         <Route path="*" element={<NotFoundPage />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import TopicsPage from "@/pages/TopicsPage";
import ChatbotPage from "@/pages/ChatbotPage";
import NotesPage from "@/pages/NotesPage";
import CodeCompilerPage from "@/pages/CodeCompilerPage";
import TopicDetailPage from "@/pages/TopicDetailPage";
import ProfilePage from "@/pages/ProfilePage";
// import ProgressPage from "@/pages";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:topicId" element={<TopicDetailPage />} />

          {/* Protected features (authentication check handled within components) */}
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/notes" element={<NotesPage />} />
          {/* <Route path="/progress" element={<ProgressPage />} /> */}
          <Route path="/playground" element={<CodeCompilerPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Redirect to home if no route matches */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
