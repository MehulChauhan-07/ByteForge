import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/home/Home";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import AboutPage from "@/pages/about/About";
import TopicsPage from "@/pages/topic/TopicsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { AnimatedRoute } from "@/components/layout/motion-layout";
function App() {
  ``;
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="topics" element={<TopicsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
