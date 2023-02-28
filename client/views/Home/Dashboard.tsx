import react, { useState, useEffect } from "react"
import { AccountStatus } from "./dashboard/AccountStatus"
import { Balance } from "./dashboard/Balance"
export function Dashboard() {
  return (
    <div>
      <section className="columns p-2 m-2 card">
        <div style={{ display: "flex" }}>
          <div className="column col-6">{/* <AccountStatus /> */}</div>
          <div className="column col-6">
            <Balance />
          </div>
        </div>
      </section>
      {/* <section className="columns p-2 m-2 card">
                <div style={{ display: 'flex' }}>
                    <div className="column col-6">
                        <AccountStatus />
                    </div>
                    <div className="column col-6">
                        <Balance />
                    </div>
                </div>
            </section> */}
    </div>
  )
}
