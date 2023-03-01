import React, { useState, useMemo, useEffect, useRef } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import uuid from "react-uuid"

import { ExportToExcel } from "./ExportToExcel"
// vaerables
// Icons
// import microsoftExcel from "../../../../../assets/icons/microsoftExcel.svg"
// import searchIcon from "../../../../../assets/icons/search.svg"
import "./assets/index-c7273dbf.css"
import Letter from "./Letters"

const LatterGenarator = () => {
  const baseurl = ""
  const [loading, setLoading] = useState(false)
  const [bulkData, setBulkData] = useState(null)
  const [agentNumber, setAgentNumber] = useState()
  const [agentList, setAgentList] = useState([])
  const [zeroBalance, setZeroBalance] = useState(false)
  const [date, setDate] = useState(new Date().toDateString())
  const [outlet, setOutlet] = useState("চরপাড়া")
  const [closeDate, setCloseDate] = useState("১৫ই মার্চ ২০২৩")
  const [branch, setBranch] = useState("ঝিনাইদহ ")

  const handelOutlet = (e: any) => {
    setOutlet(e.target.value)
  }
  const handelCloseDate = (e: any) => {
    setCloseDate(e.target.value)
  }
  const handelBranch = (e: any) => {
    setBranch(e.target.value)
  }
  const handelDate = (e: any) => {
    const _date = new Date(e.target.value).toDateString()
    setDate(_date)
  }
  const handelAgent = (e: any) => {
    setAgentNumber(e.target.value)
  }
  const handelZeroBalance = () => {
    zeroBalance
      ? toast("Showing with zero balance")
      : toast("Showing with out zero balance")
    setZeroBalance(!zeroBalance)
  }

  const handelSubmit = async () => {
    setLoading(true)
    const baseurl = ""
    try {
      const bodyResponse = await axios.post(`${baseurl}/api/accountList`, {
        agentNumber: agentNumber,
      })
      setLoading(false)
      setBulkData(bodyResponse.data)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const handelExcel = async () => {
    try {
      await ExportToExcel(bulkData)
    } catch (error) {
      console.error(error)
    }
  }

  // Function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/listOfAgent`)
        setAgentList(response.data)
        setAgentNumber(response.data[0].ACCOUNTNO)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="p-2 card print-hide">
        <h3 className="h3">Parameters</h3> <br />
        <div className="columns">
          <div className="column col-lg-6 col-sm-12">
            <div className="btn-group btn-group-block">
              <div className="input-group">
                <div className="form-group ">
                  <select
                    className="form-select"
                    value={agentNumber}
                    onChange={handelAgent}
                  >
                    {agentList.map(({ NAME, ACCOUNTNO }) => (
                      <option key={uuid()} value={ACCOUNTNO}>
                        {NAME}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className={
                    loading ? "btn btn-primary loading" : "btn btn-primary"
                  }
                  onClick={handelSubmit}
                >
                  {/* <img className="icon mr-2" src={searchIcon} /> */}
                  Generator
                </button>
              </div>
              {bulkData ? (
                <>
                  <br />
                  <button
                    className="btn btn-link-primary"
                    onClick={handelSubmit}
                  >
                    {/* <img className="icon mr-2" src={microsoftExcel} /> */}
                    Download as Excel
                  </button>
                </>
              ) : null}
            </div>
          </div>
          {bulkData ? (
            <>
              <div className="divider-vert"></div>
              <div className="column col-lg-6 col-sm-12">
                <div className="form-group">
                  <label className="form-label ">Outlet</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="চরপাড়া"
                    onChange={handelOutlet}
                  />
                  <label className="form-label ">Link Branch</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="ঝিনাইদহ"
                    onChange={handelBranch}
                  />
                  <label className="form-label ">Closing Date</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="১৫ই মার্চ ২০২৩"
                    onChange={handelCloseDate}
                  />
                  <label className="form-label ">Letter Date</label>
                  <input
                    className="form-input"
                    type="date"
                    placeholder="date"
                    onChange={handelDate}
                  />
                </div>

                <br />
                <div className="input-group col-lg-6 col-md-12">
                  <label className="form-checkbox form-inline">
                    <input
                      type="checkbox"
                      checked={zeroBalance}
                      onChange={handelZeroBalance}
                    />
                    <i className="form-icon"></i> Zero Balance
                  </label>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <Letter
        zeroBalance={zeroBalance}
        bulkData={bulkData}
        date={date}
        outlet={outlet}
        closeDate={closeDate}
        branch={branch}
      />
    </>
  )
}

export default LatterGenarator
