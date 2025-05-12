// Page imports
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import TestLoginPage from "@/pages/auth/TestLoginPage";
import HomePage from "@/pages/home/Home";
// import DashboardPage from "@/pages/dashboard/DashboardPage";
import TopicsPage from "@/pages/topic/TopicsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import AboutPage from "@/pages/about/About";

// enhanced imports
import DashboardPage from "@/pages/DashboardPage";
import DashboardPagev2 from "@/pages/EnhancedDash/DashboardPagev2";
import ProfilePage from "@/pages/ProfilePage";
import ProfilePagev2 from "@/pages/EnhancedDash/ProfilePagev2";

// Protected feature pages
import NotesPage_v0 from "@/pages/features/Tools/Notes/NotesPage_v0";
import NotesPage from "@/pages/features/Tools/Notes/NotesPage";
import ChatbotPage from "@/pages/features/Tools/ChatbotPage";
import CommunityPage from "@/pages/features/Tools/CommunityPage";
import TutorialsPage from "@/pages/features/TutorialsPage";
import ExercisesPage from "@/pages/features/ExercisesPage";

import CompilerPage from "@/pages/features/Tools/Compiler/CompilePage";
import CompilerPage_v1 from "@/pages/features/Tools/Compiler/CompilerPage_v2";
import CompilerPage_v2 from "@/pages/features/Tools/Compiler/CompilerPage_v2";

// testing imports
import Old_CompilerPage from "@/pages/features/old_folder/old_compilepage";
import ComplexNavbar from "@/components/layout/old_files/old_navbar";
// import EnhancedTopicsPage from "@/pages/topic/EnhancedTopicPage";
import EnhancedTopicsPage from "@/pages/features/Topic/EnhancedTopicsPage";
import EnhancedHome from "@/pages/home/EnhancedHome";
import ModernEnhancedHome from "@/pages/home/ModernEnhancedHome";
import EnhancedAbout from "@/pages/about/EnhancedAbout";
import UrlManager from "@/pages/UrlManager";

// import Layout from "@/components/layout/Layout";

// Route configurations
export const routes = {
  public: [
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/url", element: <UrlManager /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    // { path: '/forgot-password', element: <ForgotPasswordPage /> },
    { path: "/topics", element: <EnhancedTopicsPage /> },
    { path: "/topics/:topicId", element: <EnhancedTopicsPage /> },
    { path: "/topics/:topicId/:subtopicId", element: <EnhancedTopicsPage /> },
    {
      path: "/topics/:topicId/subtopics/:subtopicId",
      element: <EnhancedTopicsPage />,
    },

    // testing routes
    { path: "/testing", element: <TestLoginPage /> },
    // { path: "/testing/home1", element: <EnhancedHome /> },
    { path: "/testing/home2", element: <ModernEnhancedHome /> },
    { path: "/testing/compiler", element: <Old_CompilerPage /> },
    { path: "/testing/about", element: <EnhancedAbout /> },
    { path: "/testing/navbar", element: <ComplexNavbar /> },
    // { path: "/topics", element: <TopicsPage /> },
  ],
  protected: [
    { path: "/dashboard", element: <DashboardPage /> },
    { path: "/testing/dashboard", element: <DashboardPagev2 /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/testing/profile", element: <ProfilePagev2 /> },
    // notes
    // { path: "/tools/notes", element: <NotesPage /> },
    { path: "/tools/notes", element: <NotesPage /> },
    { path: "/tools/note", element: <NotesPage_v0 /> },
    { path: "/tools/compiler", element: <CompilerPage /> },
    { path: "/tools/compilerv1", element: <CompilerPage_v1 /> },
    { path: "/tools/compilerv2", element: <CompilerPage_v2 /> },
    { path: "/tools/assistant", element: <ChatbotPage /> },
    { path: "/community", element: <CommunityPage /> },
    { path: "/exercises", element: <ExercisesPage /> },
    { path: "/tutorials", element: <TutorialsPage /> },
  ],
  redirects: [
    // Define redirects here
    { from: "/compiler", to: "/tools/compiler" },
    { from: "/assistant", to: "/tools/assistant" },
    { from: "/notes", to: "/tools/notes" },
    { from: "/search/:topicId", to: "/topics/:topicId" },
    {
      from: "/search/:topicId/:subtopicId",
      to: "/topics/:topicId/:subtopicId",
    },
  ],
};
