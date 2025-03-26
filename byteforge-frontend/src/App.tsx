import { Routes, Route } from "react-router-dom";
import Layout from "@/components/common/Layout";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import AboutPage from "@/pages/About";
import TopicsPage from "@/pages/TopicsPage";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {
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
