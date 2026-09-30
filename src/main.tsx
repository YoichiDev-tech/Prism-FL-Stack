import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
import { StackProvider } from "./context/StackContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StackProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StackProvider>  
  </React.StrictMode>
);
