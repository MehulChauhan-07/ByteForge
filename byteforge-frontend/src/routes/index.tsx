import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

// Page imports
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
// import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";

import HomePage from "@/pages/home/Home";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ProfilePage from "@/pages/ProfilePage";
import TopicsPage from "@/pages/topic/TopicsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import AboutPage from "@/pages/about/About";

// Protected feature pages
import CompilerPage from "@/pages/features/CompilePage";
import NotesPage from "@/pages/features/NotesPage";
import ChatbotPage from "@/pages/features/ChatbotPage";
import CommunityPage from "@/pages/features/CommunityPage";
import TutorialsPage from "@/pages/features/TutorialsPage";
import ExercisesPage from "@/pages/features/ExercisesPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes that don't require authentication */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Public routes that should redirect authenticated users */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
      </Route>

      {/* Protected routes - require authentication */}
      <Route element={<ProtectedRoute />}>
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Protected learning feature routes */}
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        {/* <Route path="/certification" element={<CertificationPage />} /> */}

        {/* Protected tool feature routes */}
        {/* <Route path="/compiler" element={<CompilerPage />} /> */}
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/assistant" element={<ChatbotPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Route>

      {/* Catch all route - 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
