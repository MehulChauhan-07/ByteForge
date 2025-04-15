import { BrowserRouter } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@context/AuthContext";
import AppRoutes from "./routes";
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
