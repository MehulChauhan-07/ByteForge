import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./index.css";
import { ProgressProvider } from "./context/ProgressContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="byteforge-theme">
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </ThemeProvider>
  </React.StrictMode>
);
