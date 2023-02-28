import SideNav from "./UX/SideNav"
import Navbar from "./UX/Navbar/Navbar"
import { useLocation, Outlet } from "react-router-dom"
import Breadcrumb from "./UX/Navbar/Breadcrumb"
import { ToastContainer } from "react-toastify"
import React from "react"
export default function Container() {
  let location: any = useLocation()
  location = location.pathname.toString()
  location = location.replace("_", " ")
  location = location.split("/")

  return (
    <div>
      <Navbar />
      <div className="off-canvas ">
        <div id="sidebar-id" className="off-canvas-sidebar">
          <SideNav />
        </div>
        <a className="off-canvas-overlay" href="#close"></a>
      </div>
      <div id="detail">
        <Breadcrumb location={location} />
        <ToastContainer />
        <Outlet />
      </div>
    </div>
  )
}
