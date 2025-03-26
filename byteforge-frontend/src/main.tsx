import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import "@/index.css";

import { ProgressProvider } from "./contexts/ProgressContex";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProgressProvider>
        <ThemeProvider defaultTheme="system" storageKey="byteforge-theme">
          <App />
        </ThemeProvider>
      </ProgressProvider>
    </BrowserRouter>
  </React.StrictMode>
);
