<<<<<<< HEAD
import React from "react";
import { Nav } from "rsuite";
import MagicIcon from "@rsuite/icons/legacy/Magic"
import NavLink from "../NavLink";

const ApplicationNav = () => {
    return (
        <Nav.Menu
            trigger="hover"
            title="Applications"
            icon={<MagicIcon />}
            placement="rightStart"
        >
            <Nav.Item as={NavLink} to="/MassageLog">
                Massage Log
            </Nav.Item>

        </Nav.Menu>
    );
};

export default ApplicationNav;
=======
import React from "react";
import { Nav } from "rsuite";
import MagicIcon from "@rsuite/icons/legacy/Magic"
import NavLink from "../NavLink";

const ApplicationNav = () => {
  return (
    <Nav.Menu
      trigger="hover"
      title="Applications"
      icon={<MagicIcon />}
      placement="rightStart"
    >
      <Nav.Item as={NavLink} to="/Reports/EftList">
        Pending EFT
      </Nav.Item>
      <Nav.Item as={NavLink} to="/Reports/EftList">
        Statement
      </Nav.Item>
    </Nav.Menu>
  );
};

export default ApplicationNav;
>>>>>>> 1f6de8d40a045e02159cbb47d8c4198fffa9cd84
