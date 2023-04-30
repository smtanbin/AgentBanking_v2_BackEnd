import { Navbar, Nav, Avatar, AutoComplete, InputGroup, Badge, IconButton, Toggle, Button } from "rsuite";
import NoticeIcon from "@rsuite/icons/Notice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../../Context/TheamProvider";
import { useAuth } from "../../../Context/AuthProvider";
import React, { useState } from "react";
import SentToUserIcon from '@rsuite/icons/SentToUser'


type AppBarProps = {
  notificationCount: number;
  setOpenNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppBar: React.FC<AppBarProps> = ({ notificationCount, setOpenNotification }) => {

  const { logout } = useAuth();
  const { theme, setMode } = useTheme();
  const handleLogout = () => {
    logout();
  };

  const handleNotification = () => {
    setOpenNotification(true);
  };

  return (
    <Navbar
      appearance="subtle"

    >
      <Nav>
        <Nav.Item
          icon={<SentToUserIcon />}
          href="http://10.140.8.127"
          active>
          Old Server
        </Nav.Item>
      </Nav>

      <Nav pullRight>

        <Nav.Item onClick={setMode}>
          <Toggle
            arial-label="Switch"
            checked={theme !== 'light' ? true : false}
            size="lg"

            unCheckedChildren={<FontAwesomeIcon icon={faSun} />}
            checkedChildren={<FontAwesomeIcon icon={faMoon} />}
          />
        </Nav.Item>
        <Nav.Item onClick={handleNotification}>
          <Badge content={notificationCount}>
            <NoticeIcon style={{ width: 20, height: 20 }} />
          </Badge>
        </Nav.Item>
        <Nav.Menu
          title={
            <Avatar
              circle
              src="https://avatars.githubusercontent.com/u/8225666"
              alt="@superman66"
            />
          }
        >
          <Nav.Item onClick={handleLogout}>Sign out</Nav.Item>

          {/* <Nav.Menu title="Contact">
            <Nav.Item>Via email</Nav.Item>
            <Nav.Item>Via telephone</Nav.Item>
          </Nav.Menu> */}
        </Nav.Menu>
      </Nav>
    </Navbar>
  );
};

export default AppBar;
