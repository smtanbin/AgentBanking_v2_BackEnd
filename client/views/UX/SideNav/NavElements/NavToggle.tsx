import React from "react";
import { Navbar, Nav } from "rsuite";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import { useAuth } from "../../../../Context/AuthProvider";

interface NavToggleProps {
  expand: boolean;
  onChange: () => void;
}

const NavToggle: React.FC<NavToggleProps> = ({ expand, onChange }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar className="nav-toggle">
      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: "center" }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default NavToggle;
