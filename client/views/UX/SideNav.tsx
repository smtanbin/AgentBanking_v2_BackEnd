import React from "react"
import uuid from "react-uuid"
import { Link } from "react-router-dom"

export default function SideNav() {
  let _uuid = uuid()
  return (
    <div className="m-2 print-hide">
      <div className="hero hero-sm">
        <div className="hero-body">
          <h1>Menu</h1>
        </div>
      </div>

      <div className="accordion">
        <input type="checkbox" id={_uuid} name="accordion-checkbox" hidden />
        <label className="accordion-header" htmlFor={_uuid}>
          Customer Master
        </label>

        <div className="ml-2 accordion-body container">
          <div className="accordion">
            <input
              type="checkbox"
              id={(_uuid = uuid())}
              name="accordion-checkbox"
              hidden
            />
            <label className="accordion-header" htmlFor={_uuid}>
              <i className="icon icon-arrow-right mr-1"></i>
              Registration
            </label>
            <div className="ml-2 accordion-body container">
              <Link to={`customer_master/registration`}>Customer</Link>
            </div>
          </div>
          {/* Customer Report Container */}
          <div className="accordion">
            <input
              type="checkbox"
              id={(_uuid = uuid())}
              name="accordion-checkbox"
              hidden
            />
            <label className="accordion-header" htmlFor={_uuid}>
              <i className="icon icon-arrow-right mr-1"></i>
              Report
            </label>
            <div className="ml-2 accordion-body container">
              <Link to={`customer_master/statement`}>Statement</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion">
        <input
          type="checkbox"
          id={(_uuid = uuid())}
          name="accordion-checkbox"
          hidden
        />
        <label className="accordion-header" htmlFor={_uuid}>
          Reports
        </label>
        <div className="ml-2 accordion-body container">
          <div className="accordion">
            <input
              type="checkbox"
              id={(_uuid = uuid())}
              name="accordion-checkbox"
              hidden
            />
            <label className="accordion-header" htmlFor={_uuid}>
              <i className="icon icon-arrow-right mr-1"></i> Management
            </label>
            <div className="ml-2 accordion-body container">
              <Link to={`/reports/mis`}>Mis</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion">
        <input
          type="checkbox"
          id={(_uuid = uuid())}
          name="accordion-checkbox"
          hidden
        />
        <label className="accordion-header" htmlFor={_uuid}>
          Utilities
        </label>
        <div className="ml-2 accordion-body container">
          <div className="accordion">
            <input
              type="checkbox"
              id={(_uuid = uuid())}
              name="accordion-checkbox"
              hidden
            />
            <label className="accordion-header" htmlFor={_uuid}>
              <i className="icon icon-arrow-right mr-1"></i>
              Template
            </label>
            <div className="ml-2 accordion-body container">
              <Link to={`/utilities/template/letter_genarator`}>
                Letter Genarator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
