<<<<<<< HEAD
import React, { useState } from "react";
import { Container, Footer, Content, FlexboxGrid, Panel } from "rsuite";
import { Outlet } from "react-router-dom";
// @ts-ignore
import packageJson from '/package.json';

// context
import { useTheme } from "../Context/TheamProvider";

// Components
import SideNav from "./UX/SideNav/SideNav";
import AppBar from "./UX/Navbar/AppBar";
import NotificationPanal from "./UX/Notification/Notification";
import Search from "./Components/Search";
// image
import haxeriB from "../assets/img/haxeriB.svg"
import haxeriL from "../assets/img/haxeriL.svg"


interface LandingPageProps {
    children: React.ReactNode;
}


const LandingPage: React.FC<LandingPageProps> = ({ children }) => {

    const { theme } = useTheme();
    // SideNav
    const [expand, setExpand] = useState<boolean>(false);
    // Notification
    const [notificationCount, setNotificationCount] = useState<number>(0);
    const [openNotification, setOpenNotification] = useState<boolean>(false);

    // Model
    const [modelOpen, setModelOpen] = useState<boolean>(false);
    const modelHandleOpen = () => setModelOpen(true);
    const modelHandleClose = () => setModelOpen(false);


    return (
        <>
            <Container>
                <SideNav expand={expand} setExpand={setExpand} modelHandleOpen={modelHandleOpen} />
                <Search modelOpen={modelOpen} modelHandleClose={modelHandleClose} />
                <Container>
                    <AppBar notificationCount={notificationCount} setOpenNotification={setOpenNotification} />
                    <NotificationPanal open={openNotification} setOpen={setOpenNotification} notificationCount={notificationCount} setNotificationCount={setNotificationCount} />
                    <Content>
                        <Outlet />
                    </Content>
                    <Footer>
                        <br />
                        <Panel>
                            <FlexboxGrid
                                justify={'center'}
                                align={'middle'}
                            >
                                <p style={{ marginRight: 5 }}>Power by</p>
                                {theme != "light" ? <img src={haxeriL} height={20} /> : <img src={haxeriB} height={20} />}
                                <a style={{ marginLeft: 5 }} href="http://www.haxeri.com/">haxeri.com</a>
                            </FlexboxGrid>
                            <hr />
                            <h6> Version</h6>
                            <p>
                                <br />
                                Pakage: {packageJson.version}
                                <br />
                                React: {packageJson.dependencies.react}   <br />
                                Axios: {packageJson.dependencies.axios}   <br />
                                Rsuite: {packageJson.dependencies.rsuite}
                                <br />
                                Vite: {packageJson.devDependencies.vite}

                                <br />
                                Typescript: {packageJson.devDependencies.typescript}
                            </p>
                        </Panel>
                    </Footer>
                </Container>
            </Container>
        </>
    );
};
export default LandingPage;
=======
import React, { useState } from "react";
import { Container, Footer, Content, FlexboxGrid, Panel } from "rsuite";
import { Outlet } from "react-router-dom";
// @ts-ignore
import packageJson from '/package.json';

// context
import { useTheme } from "../Context/TheamProvider";

// Components
import SideNav from "./UX/SideNav/SideNav";
import AppBar from "./UX/Navbar/AppBar";
import NotificationPanal from "./UX/Notification/Notification";
import Search from "./Components/Search";
// image
import haxeriB from "../assets/img/haxeriB.svg"
import haxeriL from "../assets/img/haxeriL.svg"


interface LandingPageProps {
  children: React.ReactNode;
}


const LandingPage: React.FC<LandingPageProps> = ({ children }) => {

  const { theme } = useTheme();
  // SideNav
  const [expand, setExpand] = useState<boolean>(false);
  // Notification
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [openNotification, setOpenNotification] = useState<boolean>(false);

  // Model
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const modelHandleOpen = () => setModelOpen(true);
  const modelHandleClose = () => setModelOpen(false);


  return (
    <>
      <Container>
        <SideNav expand={expand} setExpand={setExpand} modelHandleOpen={modelHandleOpen} />
        <Search modelOpen={modelOpen} modelHandleClose={modelHandleClose} />
        <Container>
          <AppBar notificationCount={notificationCount} setOpenNotification={setOpenNotification} />
          <NotificationPanal open={openNotification} setOpen={setOpenNotification} notificationCount={notificationCount} setNotificationCount={setNotificationCount} />
          <Content>
            <Outlet />
          </Content>
          <Footer>
            <br />
            <Panel>
              <FlexboxGrid
                justify={'center'}
                align={'middle'}
              >
                <p style={{ marginRight: 5 }}>Power by</p>
                {theme != "light" ? <img src={haxeriL} height={20} /> : <img src={haxeriB} height={20} />}
                <a style={{ marginLeft: 5 }} href="http://www.haxeri.com/">haxeri.com</a>
              </FlexboxGrid>
              <hr />
              <p>
                <h6> Version</h6>
                <br />
                Pakage: {packageJson.version}
                <br />
                React: {packageJson.dependencies.react}   <br />
                Axios: {packageJson.dependencies.axios}   <br />
                Rsuite: {packageJson.dependencies.rsuite}
                <br />
                Vite: {packageJson.devDependencies.vite}

                <br />
                Typescript: {packageJson.devDependencies.typescript}
              </p>
            </Panel>
          </Footer>
        </Container>
      </Container>
    </>
  );
};
export default LandingPage;
>>>>>>> 1f6de8d40a045e02159cbb47d8c4198fffa9cd84
