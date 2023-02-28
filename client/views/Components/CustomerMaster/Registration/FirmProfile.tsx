import { useState } from "react"
import Address from "./Address"



const FirmProfile = () => {


    return (<div className="column col-4">
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


    )
}


export default FirmProfile