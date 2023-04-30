import React, { useEffect } from "react";
import { Panel, Placeholder } from "rsuite";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const LoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth()

  useEffect(() => {
    console.log(token)
    if (token !== undefined || null) {
      const timeout = setTimeout(() => {
        console.log("Navigate to home");
        navigate("/");
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        console.log("Navigate to home");
        navigate("/login")
      }, 500);
      ;
    }
  }, []);

  return (
    <Panel header="Loading">
      <Placeholder.Paragraph />
    </Panel>
  );
};

export default LoadingPage;
