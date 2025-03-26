import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import "@/index.css";
<<<<<<< HEAD
=======
import { ProgressProvider } from "./contexts/ProgressContex";
>>>>>>> 4cb0dc4 (try to protect fearture from unauthorized user)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="byteforge-theme">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
