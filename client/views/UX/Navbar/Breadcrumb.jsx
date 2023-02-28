import uuid from "react-uuid"
import { Link } from "react-router-dom"
const Breadcrumb = ({ location }) => {
  return (
    <section className="m-2 print-hide">
      <ul className="breadcrumb ml-2" style={{ marginTop: "2.5rem" }}>
        <li className="breadcrumb-item" key={uuid()}>
          <Link to={`/ `}>
            <span className="text-primary text-bold">Home</span>
          </Link>
        </li>
        {location.map((routName) =>
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
