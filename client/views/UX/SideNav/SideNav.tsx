import React from "react";
import { Sidebar, Sidenav, Nav } from "rsuite";
import { Icon } from "@rsuite/icons";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
// import logo from "../../../assets/icons/logo.png";

import { Link } from "react-router-dom";
import NavToggle from "./NavElements/NavToggle";
import ReportNav from "./NavElements/ReportNAv";
import ApplicationNav from "./NavElements/ApplicationNav";
import NavLink from "./NavLink";

interface SideNavProps {
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}


const headerStyles: any = {
  sidenav: {
    position: "relative",
    display: "flex",
    height: "100vh",
    flexDirection: "column",
  },
  logo: {
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
    color: " #fff",
    whiteSpace: "nowrap",
  },
  img: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
    height: 30,
  },
}



const SideNav: React.FC<SideNavProps> = ({ expand, setExpand }) => {
  return (
    <Sidebar style={headerStyles.sidenav} width={expand ? 200 : 56} collapsible>
      <Sidenav.Header>
        <div style={headerStyles.logo}>
          <span style={{ marginLeft: 12 }}>
            {/* <img src={logo} style={headerStyles.img} alt="Logo" /> */}
          </span>
        </div>
      </Sidenav.Header>

      <Sidenav expanded={expand} defaultOpenKeys={["3"]} appearance="subtle">
        <Sidenav.Body>
          <Nav>
            <Nav.Item
              eventKey="1"
              as={NavLink}
              icon={<DashboardIcon />}
              to="/"
              active
            >
              Home
            </Nav.Item>

            <Nav.Menu
              eventKey="2"
              trigger="hover"
              title="Registration"
              icon={<GroupIcon />}
              placement="rightStart"
            >
              <Nav.Item eventKey="3-1">
                <Link to={`/customer_master/registration`}>Customer</Link>
              </Nav.Item>
            </Nav.Menu>

            <ApplicationNav />
            <ReportNav />
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
    </Sidebar>
  );
};

export default SideNav;
