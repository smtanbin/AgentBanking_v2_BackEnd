import React from "react";
import { Nav } from "rsuite";
import TableIcon from "@rsuite/icons/Table";
import NavLink from "../NavLink";

const ReportNav = () => {
  return (
    <Nav.Menu
      trigger="hover"
      title="Reports"
      icon={<TableIcon />}
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

export default ReportNav;
