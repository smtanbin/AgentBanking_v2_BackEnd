import React from "react";
import ReactDOM from "react-dom";
import RootRouter from "./routes/routers";
import AuthProvider from "./Context/AuthContext";


const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <AuthProvider>
        <RootRouter />
      </AuthProvider>
    </React.StrictMode>,
    rootElement
  );
} else {
  console.error("Could not find root element in HTML");
}
