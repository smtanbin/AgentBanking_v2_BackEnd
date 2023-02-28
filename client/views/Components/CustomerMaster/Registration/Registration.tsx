import React, { useState } from "react"
import IndividualProfile from "./IndividualProfile"
import CompanyProfile from "./CompanyProfile"
import Address from "./Address"
import FirmProfile from "./FirmProfile"

export const Registration = () => {
    const [custType, SetCustType] = useState("Individual")
    function handlecustTypeChange(event) {
        SetCustType(event.target.value)
    }


    return (
        <section className="p-2 m-2">
            <div className="hero hero-sm">
                <div className="hero-body">
                    <h1 className="text-primary">Customer Registration</h1>
                    {/* <div className="form-group col-3">
                        <label className="form-label">Customer Type</label>
                        <select className="form-select" onChange={handlecustTypeChange}>
                            <option>Individual</option>
                            <option>Company</option>
                            <option>Firm</option>
                        </select>
                    </div> */}
                </div>
            </div>

            <div className="container card m-2 ">
                <div className="card-header columns bg-primary material-shadow-v2 p-5x">
                    <h1 className=" h1 column col-9">{custType}</h1>

                    <div className="form-group col-3">
                        <label className="form-label">Customer Type</label>
                        <select className="rounded text-primary form-select" onChange={handlecustTypeChange}>
                            <option>Individual</option>
                            <option>Company</option>
                            <option>Firm</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container card m-2 rounded p-5x">
                <div className="card-header">
                    <h3 className="text-primary h3 column col-10">Information</h3>
                </div>
                <div className="card-body columns m-2">
                    {custType === "Individual" ? (
                        <IndividualProfile />
                    ) : custType === "Company" ? (
                        <CompanyProfile />
                    ) : (
                        <FirmProfile />
                    )}
                </div>
            </div>

            <div className="container card m-2 rounded  p-5x">
                <div className="card-header">
                    <h3 className="text-primary h3 column col-10">Address</h3>
                </div>
                <div className="card-body">
                    <Address />
                </div>
                <div className="card-footer">
                    <br />
                    <br />
                    <div className="columns m-2 p-2">
                        <div className="column col-10">
                            <div className="form-group">
                                <label className="form-checkbox">
                                    <input type="checkbox" />
                                    <i className="form-icon"></i>
                                    <h5>
                                        I confirm that I have entered all information currently. I also read the Anti money laundering (AML) Policy.</h5>
                                </label>
                            </div>
                        </div>
                        <div className="column col-2" >
                            <button className="rounded btn btn-primary shadow-25" style={{ width: '100%' }}>
                                <i className="icon icon-download mr-2"></i>
                                Save</button>
                        </div>
                    </div>


                </div>
            </div>


            <div className="hero hero-lg">
            </div>
        </section >
    )
}



