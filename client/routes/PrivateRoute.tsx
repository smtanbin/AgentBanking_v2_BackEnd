import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import LandingPage from "../views/LandingPage";
import ErrorPage from "../views/error-page";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  if (token) {
    if (token.refreshToken !== null && token.token !== null) {
      console.log("Auth Valid");
      return <LandingPage>{children}</LandingPage>;
    }
  } else {
    console.log("Auth invalid");
    return <Navigate to="/login" replace />;
  }

  // Always return a valid ReactElement, such as by wrapping in a fragment
  return <ErrorPage />;
};


export default PrivateRoute;
