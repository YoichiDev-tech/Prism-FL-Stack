import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
import { StackProvider } from "./context/StackContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <StackProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StackProvider>
    </ThemeProvider>
  </React.StrictMode>
);