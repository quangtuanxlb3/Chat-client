import { initThemeMode } from "flowbite-react";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeInit } from "../.flowbite-react/init";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <React.Fragment>
    <ThemeInit />
    <App />
  </React.Fragment>,
  // </StrictMode>,
);

initThemeMode();
