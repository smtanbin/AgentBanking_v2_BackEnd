import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [showBasic, setShowBasic] = useState(false)

  return (
    <header
      className="navbar p-2 bg-dark print-hide p-fixed"
      style={{ width: "100%", zIndex: 5 }}
    >
      <section className="navbar-section">
        <a
          className="off-canvas-toggle btn btn-link rounded"
          href="#sidebar-id"
        >
          <i className="icon icon-menu text-light"></i>
        </a>
        <Link className="btn btn-link text-light" to={`/`}>
          Home
        </Link>
        <a href="#" className="btn btn-link text-light">
          Docs
        </a>
      </section>
      <section className="navbar-center">
        {/* <!-- centered logo or brand --> */}
      </section>
      <section className="navbar-section">
        <a href="#" className="btn btn-link text-light">
          Twitter
        </a>
        <div className="dropdown dropdown-right">
          <a href="#" className="btn btn-link dropdown-toggle">
            <figure className="avatar bg-gray text-primary" data-initial="YZ">
              <i className="avatar-presence online "></i>
            </figure>
          </a>
          {/* <!-- menu component --> */}
          <ul className="menu">
            {/* <!-- menu header text --> */}
            <li className="divider" data-content="LINKS"></li>

            {/* <!-- menu item with badge --> */}
            <li className="menu-item text-primary">
              <a href="#">
                <i className="icon icon-link text-primary"></i> Logout
              </a>
              <div className="menu-badge">
                <label className="label label-primary">2</label>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </header>
  )
}
