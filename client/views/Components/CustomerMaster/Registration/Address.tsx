import { useState } from "react"

const Address = () => {

    const [permanentAddr, SetPermanentAddrType] = useState(false)
    const [mailAddr, SetMailAddrType] = useState(false)


    function handlePermanentAddrChange() {
        SetPermanentAddrType(!permanentAddr)
    }
    function handleMailAddrChange() {
        SetMailAddrType(!mailAddr)
    }


    return (


        <div className="columns col-12 m-2">

            <div className="column col-4 col-lg-4 col-md-8 col-sm-12 p-2">
                <div className="columns">
                    <h5 className="h5">Present Address</h5>

                    <div className="input-group column col-12">
                        <span className="input-group-addon col-4">Village/House</span>
                        <input
                            type="text"
                            className="form-input col-8"
                            placeholder="..."
                        />
                    </div>
                    <div className="input-group column col-12">
                        <span className="input-group-addon col-4">Road/Sector</span>
                        <input
                            type="text"
                            className="form-input col-8"
                            placeholder="..."
                        />
                    </div>
                    <div className="input-group column col-12">
                        <span className="input-group-addon col-4">Post Office</span>
                        <input
                            type="text"
                            className="form-input col-8"
                            placeholder="..."
                        />
                    </div>
                    <div className="input-group column col-12">
                        <span className="input-group-addon input-lg col-4">
                            Division
                        </span>
                        <div className="form-group input-lg">
                            <select className="form-select">
                                <option>None</option>
                                <option>Primary</option>
                                <option>Secendery</option>
                                <option>Graduate</option>
                                <option>Post Graduate</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-group column col-12">
                        <span className="input-group-addon input-lg col-4">
                            District
                        </span>
                        <div className="form-group input-lg col-8">
                            <select className="form-select">
                                <option>None</option>
                                <option>Primary</option>
                                <option>Secendery</option>
                                <option>Graduate</option>
                                <option>Post Graduate</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-group column col-12">
                        <span className="input-group-addon  col-4">Thana</span>
                        <div className="form-group input-lg col-8">
                            <select className="form-select input-lg">
                                <option>None</option>
                                <option>Primary</option>
                                <option>Secendery</option>
                                <option>Graduate</option>
                                <option>Post Graduate</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column col-4 col-lg-4 col-md-8 col-sm-12 p-2">
                <div className="columns">
                    <div className="column col-12 p-2">
                        <h5 className="h5 column">Permanent Address</h5>
                        <div className="form-group">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    onClick={handlePermanentAddrChange}
                                />
                                <i className="form-icon"></i> Same As Present address
                            </label>
                        </div>
                    </div>
                    {!permanentAddr ? <div>
                        <div className="input-group column col-12">
                            <span className="input-group-addon col-4">Village/House</span>
                            <input
                                type="text"
                                className="form-input col-8"
                                placeholder="..."
                            />
                        </div>
                        <div className="input-group column col-12">
                            <span className="input-group-addon col-4">Road/Sector</span>
                            <input
                                type="text"
                                className="form-input col-8"
                                placeholder="..."
                            />
                        </div>
                        <div className="input-group column col-12">
                            <span className="input-group-addon col-4">Post Office</span>
                            <input
                                type="text"
                                className="form-input col-8"
                                placeholder="..."
                            />
                        </div>
                        <div className="input-group column col-12">
                            <span className="input-group-addon col-4">Division</span>
                            <div className="form-group col-8">
                                <select className="form-select">
                                    <option>None</option>
                                    <option>Primary</option>
                                    <option>Secendery</option>
                                    <option>Graduate</option>
                                    <option>Post Graduate</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-group column col-12">
                            <span className="input-group-addon col-4">District</span>
                            <div className="form-group col-8">
                                <select className="form-select">
                                    <option>None</option>
                                    <option>Primary</option>
                                    <option>Secendery</option>
                                    <option>Graduate</option>
                                    <option>Post Graduate</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-group column col-12">
                            <span className="input-group-addon col-4">Thana</span>
                            <div className="form-group col-8">
                                <select className="form-select">
                                    <option>None</option>
                                    <option>Primary</option>
                                    <option>Secendery</option>
                                    <option>Graduate</option>
                                    <option>Post Graduate</option>
                                </select>
                            </div>
                        </div>
                    </div> : <></>}
                </div>
            </div>

            <div className="column col-4 col-lg-4 col-md-8 col-sm-12 p-2">
                <div className="column col-12 p-2">
                    <h5 className="h5 column">Business/Mailing Address</h5>
                    <div className="form-group">
                        <label className="form-switch ">
                            <input
                                type="checkbox"
                                onClick={handleMailAddrChange}
                            />
                            <i className="form-icon"></i> Same As Present address
                        </label>
                        {/* <label className="form-checkbox ">
                                                <input
                                                    type="checkbox"
                                                    onClick={handleMailAddrChange}
                                                />
                                                <i className="form-icon"></i> Same As Permanent address
                                            </label> */}
                    </div>
                </div>

                {!mailAddr ? <div>
                    <div className="input-group column col-12">
                        <span className="input-group-addon col-4">Village/House</span>
                        <input
                            type="text"
                            className="form-input col-8"
                            placeholder="..."
                        />
                    </div>
                    <div className="input-group column col-12">
                        <span className="input-group-addon col-4">Road/Sector</span>
                        <input
                            type="text"
                            className="form-input col-8"
                            placeholder="..."
                        />
                    </div>
                    <div className="input-group column col-12">
                        <span className="input-group-addon col-4">Post Office</span>
                        <input
                            type="text"
                            className="form-input col-8"
                            placeholder="..."
                        />
                    </div>
                    <div className="input-group column col-12">
                        <span className="input-group-addon col-4">Division</span>
                        <div className="form-group col-8">
                            <select className="form-select">
                                <option>None</option>
                                <option>Primary</option>
                                <option>Secendery</option>
                                <option>Graduate</option>
                                <option>Post Graduate</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-group column col-12">
                        <span className="input-group-addon col-4">District</span>
                        <div className="form-group col-8">
                            <select className="form-select">
                                <option>None</option>
                                <option>Primary</option>
                                <option>Secendery</option>
                                <option>Graduate</option>
                                <option>Post Graduate</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-group column col-12">
                        <span className="input-group-addon col-4">Thana</span>
                        <div className="form-group col-8">
                            <select className="form-select">
                                <option>None</option>
                                <option>Primary</option>
                                <option>Secendery</option>
                                <option>Graduate</option>
                                <option>Post Graduate</option>
                            </select>
                        </div>
                    </div>
                </div> : <></>}
            </div>
        </div>

    )
}


export default Address