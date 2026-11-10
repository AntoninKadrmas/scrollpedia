import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./index.scss";
import { Providers } from "./Providers";
import {
  createHashHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const hashHistory = createHashHistory();

export const API_PATH = "https://www.edgechat.ai/";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  history: hashHistory,
  scrollRestoration: true,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
);
