import React from "react";
import { createRoot } from 'react-dom/client';
import ErrorBoundary from "./ErrorBoundary";
import App from "./app";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
