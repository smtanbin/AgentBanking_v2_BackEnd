import { useState } from "react"
import Address from "./Address"
import React from "react"



const IndividualProfile = () => {

    const [maritalType, SetMaritalType] = useState("Single")

    function handleMaritalTypeChange(event) {
        SetMaritalType(event.target.value)
    }
    // function handleMaritalTypeChange(event) {
    //     SetMaritalType(event.target.value)
    // }






    return (<div className="columns col-12">
        <div className="column col-6 col-lg-4 col-md-8 col-sm-12 p-2">
            <div>
                <label className="form-label">Name <span className="text-error">*</span></label>
                <input
                    className="form-input"
                    type="text"
                    id="input-example-1"
                    placeholder="Name"
                />
                <label className="form-label">Date of Birth <span className="text-error">*</span></label>
                <input
                    className="form-input"
                    type="date"
                    id="input-example-1"
                    placeholder="Name"
                />
                <label className="form-label">Photo ID <span className="text-error">*</span></label>
                <div className="col-12" style={{ display: "flex" }}>
                    <input
                        className="form-input column col-8"
                        type="text"
                        id="input-example-1"
                        placeholder="Name"
                    />
                    <div className="form-group col-4">
                        <select className="form-select">
                            <option>Choose an option</option>
                        </select>
                    </div>
                </div>
                <div className="columns">
                    <div className="column col-6">
                        <label className="form-label">Issue Date</label>
                        <input
                            className="form-input"
                            type="date"
                            id="input-example-1"
                            placeholder="Name"
                        />
                    </div>
                    <div className="column col-6">
                        <label className="form-label">Expired </label>
                        <input
                            className="form-input"
                            type="date"
                            id="input-example-1"
                            placeholder="Name"
                        />
                    </div>
                </div>
                <div className="columns">
                    <div className="column col-6">
                        <label className="form-label">Gender</label>
                        <div className="form-group">
                            <select className="form-select">
                                <option>Other</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Treans Gender</option>
                            </select>
                        </div>
                    </div>
                    <div className="column col-6">
                        <label className="form-label">Religion</label>
                        <div className="form-group">
                            <select className="form-select">
                                <option>Islam</option>
                                <option>Hindu</option>
                                <option>Widow</option>
                                <option>Divorced</option>
                            </select>
                        </div>
                    </div>
                </div>
                <label className="form-label">TIN</label>
                <input
                    className="form-input"
                    type="text"
                    placeholder="000-0000-0000"
                />

                <div className="form-group">
                    <label className="form-switch">
                        <input type="checkbox" />
                        <i className="form-icon"></i> Foreign Account Tax Compliance
                        Act
                    </label>
                </div>
                <label className="form-label">Primery Contact Number</label>
                <div className="input-group">
                    <span className="input-group-addon">+88</span>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="1600000000"
                    />
                </div>
                <label className="form-label">Primery Email</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="example@automatafactory.com"
                />
            </div>
        </div>
        <div className="column col-6 col-lg-4 col-md-8 col-sm-12 p-2">
            <label className="form-label">Father's Name</label>
            <input className="form-input" type="text" placeholder="..." />
            <label className="form-label">Mother's Name</label>
            <input className="form-input" type="text" placeholder="..." />
            <label className="form-label">Mother's Name</label>
            <input className="form-input" type="text" placeholder="..." />
            <label className="form-label">Marital Status</label>
            <div className="columns ">
                <div className="form-group column col-4">
                    <select
                        className="form-select"
                        onChange={handleMaritalTypeChange}
                    >
                        <option>Single</option>
                        <option>Married</option>
                        <option>Widow</option>
                        <option>Divorced</option>
                    </select>
                </div>
                <div className="column col-8">
                    {maritalType === "Single" ? (
                        <input
                            className="form-input"
                            disabled
                            type="text"
                            placeholder="Spouse Name"
                        />
                    ) : (
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Spouse Name"
                        />
                    )}
                </div>
            </div>
            <label className="form-label">Nationality</label>
            <input className="form-input" type="text" placeholder="..." />

            <div className="columns">
                <div className="column col-6">
                    <label className="form-label">Blood Group</label>
                    <div className="form-group">
                        <select className="form-select">
                            <option>Undefined</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>O+</option>
                            <option>O-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                        </select>
                    </div>
                </div>
                <div className="column col-6">
                    <label className="form-label">Education </label>
                    <div className="form-group">
                        <select className="form-select">
                            <option>None</option>
                            <option>Primary</option>
                            <option>Secendery</option>
                            <option>Graduate</option>
                            <option>Post Graduate</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="columns">
                <div className="column col-6">
                    <label className="form-label">Occupation </label>
                    <div className="form-group">
                        <select className="form-select">
                            <option>Undefined</option>
                        </select>
                    </div>
                </div>
                <div className="column col-6">
                    <label className="form-label">Residence Status</label>
                    <div className="form-group">
                        <select className="form-select">
                            <option>Undefined</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label className="form-switch">
                    <input type="checkbox" />
                    <i className="form-icon"></i> Car Ownership
                </label>
            </div>
        </div>

    </div>)
}
export default IndividualProfile