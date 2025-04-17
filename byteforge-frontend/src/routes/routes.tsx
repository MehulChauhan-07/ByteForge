// Page imports
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import TestLoginPage from "@/pages/auth/TestLoginPage";
import HomePage from "@/pages/home/Home";
import DashboardPage from "@/pages/DashboardPage";
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

// testing imports
import Old_CompilerPage from "@/pages/features/old_folder/old_compilepage";
import ComplexNavbar from "@/components/layout/old_files/old_navbar";
import EnhancedTopicsPage from "@/pages/topic/EnhancedTopicPage";
// import Layout from "@/components/layout/Layout";

// Route configurations
export const routes = {
  public: [
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    // { path: '/forgot-password', element: <ForgotPasswordPage /> },
    // tools
    { path: "/testing", element: <TestLoginPage /> },
    { path: "/testing/compiler", element: <Old_CompilerPage /> },
    { path: "/testing/navbar", element: <ComplexNavbar /> },
    { path: "/topics", element: <EnhancedTopicsPage /> },
    { path: "/topics/:topicId", element: <EnhancedTopicsPage /> },
    // { path: "/topics", element: <TopicsPage /> },
  ],
  protected: [
    { path: "/dashboard", element: <DashboardPage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/tools/notes", element: <NotesPage /> },
    { path: "/tools/compiler", element: <CompilerPage /> },
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
  ],
};
