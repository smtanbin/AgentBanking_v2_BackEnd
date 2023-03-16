import React, { useEffect } from "react";
import { Panel, Placeholder } from "rsuite";
import { useNavigate } from "react-router-dom";

const LoadingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Navigate to home");
      navigate("/");
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Panel header="Loading">
      <Placeholder.Paragraph />
    </Panel>
  );
};

export default LoadingPage;
