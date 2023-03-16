import React from "react";
import { AuthProvider } from "./Context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import RootRouter from "./routes/RootRouter";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./Context/TheamProvider";
import { NetworkProvider } from "./Context/NetworkProvider";


const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <NetworkProvider>
        <BrowserRouter>
          <AuthProvider>
            <ThemeProvider>
              <RootRouter />
            </ThemeProvider>
          </AuthProvider>
        </BrowserRouter>
      </NetworkProvider>
    </>
  );
};

export default App;
