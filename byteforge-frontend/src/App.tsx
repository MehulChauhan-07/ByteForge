import { BrowserRouter } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@context/AuthContext";
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
