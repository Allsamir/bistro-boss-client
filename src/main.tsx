import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import { ParallaxProvider } from "react-scroll-parallax";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ParallaxProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </ParallaxProvider>
  </React.StrictMode>,
);
