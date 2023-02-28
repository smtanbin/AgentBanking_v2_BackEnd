import React, { createContext } from "react"
import ReactDOM from "react-dom/client"
import RootRouter from "./routes/routers"
import AuthProvider from "./Context/AuthContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RootRouter />
    </AuthProvider>
  </React.StrictMode>
)
