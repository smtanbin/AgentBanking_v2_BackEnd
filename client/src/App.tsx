import React from "react";
import { AuthProvider } from "./Context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import RootRouter from "./routes/RootRouter";
import { ThemeProvider } from "./Context/TheamProvider";
import { Notification, Placeholder } from 'rsuite';
import ToasterProvider from "./Context/ToasterProvider";


const App: React.FC = () => {




  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ToasterProvider>
            <RootRouter />
          </ToasterProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
