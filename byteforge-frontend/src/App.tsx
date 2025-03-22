import { Route, Routes } from "react-router-dom";

import TopicPage from "@/pages/topics";
import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import FeaturePage from "@/pages/features";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<TopicPage />} path="/topics/" />
      <Route element={<FeaturePage />} path="/features" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<BlogPage />} path="/blog" />
    </Routes>
  );
}

export default App;
