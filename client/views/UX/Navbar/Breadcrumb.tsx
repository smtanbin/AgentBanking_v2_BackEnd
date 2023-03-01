import React from "react"
import uuid from "react-uuid"
import { Link } from "react-router-dom"
const Breadcrumb = ({ location }: any) => {
  return (
    <section className="m-2 print-hide">
      <ul className="breadcrumb ml-2" style={{ marginTop: "2.5rem" }}>
        <li className="breadcrumb-item" key={uuid()}>
          <Link to={`/ `}>
            <span className="text-primary text-bold">Home</span>
          </Link>
        </li>
        {location.map((routName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) =>
          routName ? (
            <li className="breadcrumb-item" key={uuid()}>
              <span className="text-capitalize">{routName}</span>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </section>
  )
}
export default Breadcrumb
