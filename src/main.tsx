import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/router/AppRoutes";
import ScrollToTop from "./app/Components/ScrollToTop.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
        <ScrollToTop/>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
