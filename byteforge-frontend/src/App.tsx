import { BrowserRouter, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@context/AuthContext";
import AppRoutes from "./routes";
import MainLayout from "./components/layout/Enhanced/MainLayout";
function App() {
  ``;
  return (
    <AuthProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
