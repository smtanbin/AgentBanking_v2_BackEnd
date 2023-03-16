import { Navbar, Nav, Avatar, AutoComplete, InputGroup, Badge } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import NoticeIcon from "@rsuite/icons/Notice";
import { useAuth } from "../../../Context/AuthProvider";
import React from "react";

const data = [
  "Eugenia",
  "Bryan",
  "Linda",
  "Nancy",
  "Lloyd",
  "Alice",
  "Julia",
  "Albert",
  "Louisa",
  "Lester",
  "Lola",
  "Lydia",
  "Hal",
  "Hannah",
  "Harriet",
  "Hattie",
  "Hazel",
  "Hilda",
];

type AppBarProps = {
  setOpenNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppBar: React.FC<AppBarProps> = ({ setOpenNotification }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleNotification = () => {
    setOpenNotification(true);
  };

  return (
    <Navbar appearance="subtle">
      <Nav>
        <Nav.Item>
          <InputGroup>
            <AutoComplete data={data} />
            <InputGroup.Button tabIndex={-1}>
              <SearchIcon />
            </InputGroup.Button>
          </InputGroup>
        </Nav.Item>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={handleNotification}>
          <Badge content={0}>
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
