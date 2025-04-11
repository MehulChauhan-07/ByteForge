import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/home/Home";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import AboutPage from "@/pages/about/About";
import TopicsPage from "@/pages/topic/TopicsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { AnimatedRoute } from "@/components/layout/motion-layout";
import Navbar from "@components/layout/navbar/components/old_navbar";
import { AuthProvider } from "@context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoutes";
import AppRoutes from "./routes";
function App() {
  ``;
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
