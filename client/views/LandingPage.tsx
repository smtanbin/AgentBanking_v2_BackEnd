import React, { useState } from "react";
import { Container, Footer, Content } from "rsuite";
import SideNav from "./UX/SideNav/SideNav";
import AppBar from "./UX/Navbar/AppBar";
import Notification from "./UX/Notification/Notification";
import { Outlet } from "react-router-dom";


interface LandingPageProps {
  children: React.ReactNode;
}


const LandingPage: React.FC<LandingPageProps> = ({ children }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [openNotification, setOpenNotification] = useState<boolean>(false);

  return (
    <>
      <Container>
        <SideNav expand={expand} setExpand={setExpand} />

        <Container>
          <AppBar setOpenNotification={setOpenNotification} />
          <Notification open={openNotification} setOpen={setOpenNotification} />
          <Content>
            <Outlet />
          </Content>
          <Footer>Footer</Footer>
        </Container>
      </Container>
    </>
  );
};
export default LandingPage;
