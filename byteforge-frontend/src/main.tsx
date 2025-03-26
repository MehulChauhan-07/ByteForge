import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import "@/index.css";
import { ProgressProvider } from "./context/ProgressContex";

import { ProgressProvider } from "./contexts/ProgressContex";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
<<<<<<< Updated upstream
      <ProgressProvider>
        <ThemeProvider defaultTheme="system" storageKey="byteforge-theme">
          <App />
        </ThemeProvider>
      </ProgressProvider>
=======
      <ThemeProvider defaultTheme="system" storageKey="byteforge-theme">
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </ThemeProvider>
>>>>>>> Stashed changes
    </BrowserRouter>
  </React.StrictMode>
);
