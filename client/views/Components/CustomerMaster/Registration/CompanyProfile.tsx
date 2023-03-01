import React, { useState } from "react"




const CompanyProfile = () => {

    const [maritalType, SetMaritalType]: any = useState("Single")
    const [permanentAddr, SetPermanentAddrType]: any = useState(false)
    const [mailAddr, SetMailAddrType]: any = useState(false)

    const handleMaritalTypeChange = (event: any) => {
        SetMaritalType(event.target.value)
    }
    const handlePermanentAddrChange = () => {
        SetPermanentAddrType(!permanentAddr)
    }
    const handleMailAddrChange = () => {
        SetMailAddrType(!mailAddr)
    }


    return (<div className="columns col-12">
        <div className="column col-4 col-lg-4 col-md-8 col-sm-12 p-2">
            <label className="form-label">Sub Type</label>
            <div className="form-group">
                <select className="form-select">
                    <option>Public Limited</option>
                    <option>Private Limited</option>
                    <option>Club / Society</option>
                </select>
            </div>
            <label className="form-label">Company Name</label>
            <input
                className="form-input"
                type="text"
                id="input-example-1"
                placeholder="Name"
            />
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

        <div className="column col-4 col-lg-4 col-md-8 col-sm-12 p-2">
            <label className="form-label">License</label>
            <input
                className="form-input"
                type="text"
                id="input-example-1"
                placeholder="License No"
            />

            <label className="form-label">TIN/BIN</label>
            <input
                className="form-input"
                type="text"
                id="input-example-1"
                placeholder="Name"
            />

            <label className="form-label">Issue Date</label>
            <input
                className="form-input"
                type="date"
                id="input-example-1"
                placeholder="Name"
            />

            <label className="form-label">Expired Date</label>
            <input
                className="form-input"
                type="date"
                id="input-example-1"
                placeholder="Name"
            />
        </div>

    </div>


    )
}














export default CompanyProfile