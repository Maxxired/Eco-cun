import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/router/AppRoutes";
import ScrollToTop from "./app/Components/ScrollToTop.tsx";
import PWABadge from "./app/pwa/PWABadge.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
        <ScrollToTop/>
      <AppRoutes />
    </BrowserRouter>
      <PWABadge/>
  </StrictMode>
);
