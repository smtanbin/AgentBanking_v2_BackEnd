import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

/*  Routers */
import Container from "../views/Container";
import ErrorPage from "../views/error-page";
import { Registration } from "../views/Components/CustomerMaster/Registration/Registration";
import { Statement } from "../views/Components/CustomerMaster/Reports/Statement/Statement";
import LatterGenarator from "../views/Components/App/Template/LatterGenarator/index";
import LoginUI from "../views/Login/Login";
import Home from "../views/Home/Home";
import Mis from "../views/Components/Reports/Mis/Mis";

export default function RootRouter(): JSX.Element {
  const authInfo: any = useContext(AuthContext);
  const { token, validitations } = authInfo.auth;
  const { updateAuth } = authInfo;
  console.log("==>", authInfo);
  useEffect(() => {
    updateAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!token && !validitations ? (
          <Route path="/" element={<LoginUI />}>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        ) : (
          <Route path="/" element={<Container />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/customer_master/registration"
              element={<Registration />}
            />
            <Route path="/reports/mis" element={<Mis />} />
            <Route path="/customer_master/statement" element={<Statement />} />
            <Route
              path="/utilities/template/letter_genarator"
              element={<LatterGenarator />}
            />
            <Route path="/*" element={<ErrorPage />} />
          </Route>
        )}

        {/* <Route exact path="/Login" element={<LoginUI />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

interface ProtectedRouteProps {
  token: string;
  children: React.ReactNode;
}

const ProtectedRoute = ({ token, children }: ProtectedRouteProps): JSX.Element => {
  console.log("ProtectedRoute =>", token);
  return !token ? <Navigate to="/Login" replace /> : <>{children}</>;
};
