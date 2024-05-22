import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import { ParallaxProvider } from "react-scroll-parallax";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./provider/AuthProvider.tsx";
export const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ParallaxProvider>
          <HelmetProvider>
            <RouterProvider router={router} />
          </HelmetProvider>
        </ParallaxProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
