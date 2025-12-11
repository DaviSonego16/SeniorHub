import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";

import { AuthProvider } from "./context/AuthProvider";

// Importa todo o sistema de estilos novo
import "./styles/index.css";

// Ativa o tema global daisyUI "anime"
document.documentElement.setAttribute("data-theme", "anime");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
