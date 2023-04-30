import React from "react";
import { Sidebar, Sidenav, Nav, Toggle } from "rsuite";
import { Icon } from "@rsuite/icons";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import SearchIcon from '@rsuite/icons/Search'

import logo from "../../../assets/img/logo.svg";

import { Link } from "react-router-dom";
import NavToggle from "./NavElements/NavToggle";
import ReportNav from "./NavElements/ReportNav";
import ApplicationNav from "./NavElements/ApplicationNav";
import NavLink from "./NavLink";



const headerStyles: any = {
  sidenav: {
    position: "relative",

    display: "fixed",
    height: "100%",
    flexDirection: "column",
  },
  logo: {
    padding: 30,
    marginBottom: 20,
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
    height: 50,
  },
}


interface SideNavProps {
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  modelHandleOpen: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ expand, setExpand, modelHandleOpen }) => {
  return (
    <Sidebar width={expand ? 200 : 56} collapsible>
      <Sidenav expanded={expand} defaultOpenKeys={["3"]} style={headerStyles.sidenav} >

        <Sidenav.Body>
          <Sidenav.Header>
            <div style={headerStyles.logo}>
              <a href="/">
                <img src={logo} style={headerStyles.img} alt="Logo" />
              </a>
            </div>
          </Sidenav.Header>

          <Nav>
            {/* <Nav.Item
              eventKey="1"
              as={NavLink}
              icon={<DashboardIcon />}
              to="/"
              active
            >
              <img src={logo} style={headerStyles.img} alt="Logo" />
            </Nav.Item> */}
            <Nav.Item
              eventKey="1"
              icon={<SearchIcon />}
              onClick={modelHandleOpen}

            >
              Search
            </Nav.Item>

            <Nav.Menu
              eventKey="2"
              trigger="hover"
              title="Registration"
              icon={<GroupIcon />}
              placement="rightStart"
            >
              <Nav.Item eventKey="3-1">
                <Link to={`/registration/customer`}>Customer</Link>
              </Nav.Item>
            </Nav.Menu>

            <ApplicationNav />
            <ReportNav />
            {/* <Toggle
              checked={expand}
              onChange={() => setExpand(!expand)}
              checkedChildren="Expand"
              unCheckedChildren="Collapse"
            /> */}
            <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
          </Nav>
        </Sidenav.Body>
      </Sidenav>

    </Sidebar>
  );
};

export default SideNav;
