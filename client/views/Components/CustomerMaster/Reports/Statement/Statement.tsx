import React, { useState } from "react"
import moment from "moment/moment"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
// Conponents
import "react-toastify/dist/ReactToastify.css"
// import logo from "../../../../../assets/img/Standardbankltd-color.svg"
import { formatDate, formatDateString } from "../../../../../app/Formater"
// import styles from "../../../../../../src/style/spectre.css"
// Icons
// import printerIcon from "../../../../../../src/assets/icons/printer.svg"
// import searchIcon from "../../../../../../src/assets/icons/search.svg"
export function Statement() {
  // States
  const [fromDate, setFromDate]: any = useState(undefined)
  const [toDate, setToDate]: any = useState(() => formatDate(new Date()))
  const [accountNo, setAccountNo]: any = useState()
  const [headerPayload, setHeaderPayload]: any = useState(undefined)
  const [bodyPayload, setBodyPayload]: any = useState(undefined)
  const [loadingState, setLoadingState]: any = useState(false)

  // Functions
  const checkAccountNumber = (str: any) => {
    const pattern = /^108\d{8}$/
    if (pattern.test(str)) {
      return str
    } else {
      toast("Please enter a valid account number")
      return ""
    }
  }

  /* Handeling Tools*/

  const handelPrint = () => {
    const printContent: any = document.querySelector("#document")
    const WinPrint: any = window.open("", "", "width=2480px,height=3508px")
    WinPrint.document.write(`
    <html>
      <head>
        <style>
        
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
        <script>
          document.querySelectorAll(".table-scroll").forEach(el => {
            el.classList.remove("table-scroll");
          });
          window.print();
        </script>
      </body>
    </html>
  `)
    WinPrint.document.close()
    WinPrint.focus()
  }

  const handelFromDate = (value: any) => {
    value = formatDateString(value)
    setFromDate(value)
  }

  const handelToDate = (value: any) => {
    value = formatDateString(value)
    setToDate(value)
  }

  const handleACNumber = (event: any) => {
    const value = event.target.value
    if (value) {
      const inputValue = value.trim()
      const newValue = checkAccountNumber(inputValue)
      setAccountNo(newValue)
    } else setAccountNo(undefined)
  }

  const handelSubmit = async () => {
    setLoadingState(true)

    setHeaderPayload(undefined)
    setBodyPayload(undefined)

    const baseurl = process.env.VITE_API_URL

    if (!accountNo) {
      toast("Account Number can't be empty")
    }
    try {
      const headerResponse = await axios.post(`${baseurl}/api/statementhead`, {
        acno: accountNo,
        date: fromDate,
      })

      const headerData = headerResponse.data[0]
      setHeaderPayload(headerData)
      if (!fromDate) {
        setFromDate(formatDate(headerData.REG_DATE))
      } else {
        setFromDate(fromDate)
      }
    } catch (error) {
      setLoadingState(false)
      console.error(error)
      toast("Error retrieving from data")
      return
    }

    try {
      const bodyResponse = await axios.post(`${baseurl}/api/statementbody`, {
        key: accountNo,
        fromdate: fromDate,
        todate: toDate,
      })
      setBodyPayload(bodyResponse.data)
      setLoadingState(false)
    } catch (error) {
      setLoadingState(false)
      console.error(error)
      // Show error message in UI or use react-toastify library
    }
  }

  let credit = 0
  let debit = 0
  let balance = headerPayload ? headerPayload.BALANCE : 0

  return (
    <>
      <ToastContainer />
      <section className="print-hide hero hero-sm">
        <div data-aos="zoom-out" className="hero-sm bg-white">
          <div className="hero-body">
            <h1 className="text-primary">Statement of Account</h1>
          </div>
        </div>
        <div className="container columns col-8 col-md-12 p-centered">
          <div className="ml-2">
            <div className="input-group">
              <span className="input-group-addon">From</span>
              <input
                type="date"
                className="form-input input-lg"
                onChange={(e) => handelFromDate(e.target.value)}
              />
              <span className="input-group-addon">To</span>
              <input
                type="date"
                onChange={(e) => handelToDate(e.target.value)}
                className="form-input input-lg"
              />
              <input
                className="form-input input-lg "
                placeholder="Type Account Number"
                type="text"
                onBlur={handleACNumber}
              />

              <button
                className={
                  loadingState
                    ? "ml-2 btn btn-lg btn-primary   loading"
                    : "ml-2 btn btn-lg btn-primary  "
                }
                onClick={handelSubmit}
              >
                {/* <img className="icon mr-2" src={searchIcon} /> */}
                Search
              </button>
              <button
                className={
                  loadingState
                    ? "ml-2 btn btn-lg btn-secondary   loading"
                    : "ml-2 btn btn-lg btn-secondary "
                }
                onClick={handelPrint}
              >
                {/* <img className="icon mr-2" src={printerIcon} /> */}
                Print
              </button>
            </div>
          </div>
        </div>
      </section>
      {bodyPayload ? (
        <section id="document">
          <div className="col-12 container m-2 p-2">
            <div className="px-2 w100 container">
              <div className="card  columns col-12 p-1 bg-gray">
                <div className="coloum print-show">
                  <div className="columns col-oneline mx-2 ">
                    {/* <img
                      src={logo}
                      className="column col-6 col-md-6 img-responsive img-fit-contain "
                    /> */}

                    <div
                      className="column col-4 col-md-4 col-ml-auto"
                      style={{ fontSize: ".5rem" }}
                    >
                      <strong>Agent Banking Division</strong>
                      <br />
                      Standard Bank Ltd, Head Office Islam Chamber Building (8th
                      Floor) 125/A Motijheel C/A, Dhaka-1000, Bangladesh
                      Tel:+8802-9578385, 9612316428 +8801709654772-3
                      Email:agentbanking@standardbankbd.com
                      www.standardbankbd.com
                    </div>
                  </div>
                </div>

                <h4 className="p-centered text-tiny text-bold h4 my-2">
                  Account Statement
                </h4>

                <div className="columns px-2">
                  <div className="column float-left text-tiny ">
                    <p>
                      <b>Titel : </b>
                      {!headerPayload ? "Unknown" : headerPayload.ACCOUNT_NAME}
                      <br />
                      <b>Account No: </b>
                      {accountNo} <br />
                      <b>Address : </b>
                      {!headerPayload ? "" : headerPayload.ADDR}
                      <br />
                      <b>Contact :</b>
                      {!headerPayload
                        ? "+8801XXXXXXXXX"
                        : "+88" + headerPayload.CON_MOB}
                      <br />
                      <b>Currency : </b>BDT
                      <br />
                      <b>Status : </b>
                      {!headerPayload ? "" : headerPayload.STATUS}
                    </p>
                  </div>
                  <div className="divider-vert"></div>
                  <div className="column float-right text-tiny">
                    <p>
                      <b>Branch: </b>Agent Banking
                      <br />
                      <b>Account Type:</b>
                      {!headerPayload ? "" : headerPayload.TYPE}
                      <br />
                      <b>Customer ID: </b>
                      {!headerPayload ? "" : headerPayload.CUST_ID}
                      <br />
                      <b>Opening Date: </b>
                      {!headerPayload ? "" : headerPayload.REG_DATE}
                      <br />
                      <b>Expiry Date: </b>
                      {!headerPayload ? "" : headerPayload.MATURITY_DATE}
                      <br />
                      <b>Agent: </b>
                      {!headerPayload ? "" : headerPayload.PMPHONE}
                    </p>
                  </div>
                </div>
                <div className="text-tiny">
                  Statement of Account for the Period:
                  {fromDate} <b> To </b>
                  {toDate}
                </div>
              </div>
              <div className="columns  p-1">
                <table className="table table-cluster">
                  <thead>
                    <tr className="column col-12 bg-secondary">
                      <th className="text-tiny">SL.</th>
                      <th className="text-tiny column col-3">Date</th>
                      <th className="text-tiny column col-1">
                        Trans. Code / Chq No
                      </th>
                      <th className="text-tiny text-right column col-1">
                        Debit Amount
                      </th>
                      <th className="text-tiny text-right column col-1">
                        Credit Amount
                      </th>
                      <th className="text-tiny text-right column col-1">
                        Balance
                      </th>
                      <th className="text-tiny column col-5">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="column col-12 active">
                      <td colSpan={5} className="text-tiny text-right">
                        Previous Balance
                      </td>
                      <td className="text-tiny text-bold text-right">
                        {!headerPayload
                          ? ""
                          : headerPayload.BALANCE
                            ? headerPayload.BALANCE.toLocaleString("en-BD", {
                              maximumFractionDigits: 2,
                            })
                            : 0}
                      </td>
                      <td colSpan={1}></td>
                    </tr>
                    {!bodyPayload || !Array.isArray(bodyPayload) ? (
                      <></>
                    ) : (
                      bodyPayload.map(
                        (
                          { TRANS_NO, TRANS_DATE, DR_AMT, CR_AMT, PARTICULAR },
                          index
                        ) => {
                          debit += DR_AMT
                          credit += CR_AMT
                          return (
                            <tr key={TRANS_NO} className="column col-12">
                              <td className="text-tiny">{index + 1}</td>
                              <td className="text-tiny  col-3">
                                {moment(TRANS_DATE).format("lll")}
                              </td>
                              <td className="text-tiny  col-1">{TRANS_NO}</td>
                              <td className="text-tiny text-right  col-1">
                                {DR_AMT.toLocaleString("en-BD", {
                                  maximumFractionDigits: 2,
                                })}
                              </td>
                              <td className="text-tiny text-right  col-1">
                                {CR_AMT.toLocaleString("en-BD", {
                                  maximumFractionDigits: 2,
                                })}
                              </td>
                              <td className="text-tiny text-right text-bold col-1">
                                {(balance += CR_AMT - DR_AMT).toLocaleString(
                                  "en-BD",
                                  {
                                    maximumFractionDigits: 2,
                                  }
                                )}
                              </td>
                              <td className="text-tiny pl-2 text-capitalize col-5">
                                {" "}
                                &nbsp;&nbsp;{PARTICULAR}
                              </td>
                            </tr>
                          )
                        }
                      )
                    )}
                    <tr className="active column col-12">
                      <td className="text-bold text-left  col-4" colSpan={3}>
                        Total
                      </td>
                      <td className="text-bold text-right text-tiny col-1">
                        {(debit ? debit : 0).toLocaleString("en-BD", {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="text-bold text-right text-tiny col-1">
                        {(credit ? credit : 0).toLocaleString("en-BD", {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="text-bold text-right text-tiny col-1">
                        {(balance ? balance : 0).toLocaleString("en-BD", {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="text-bold  col-5"></td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan={7}
                        className="text-bold text-tiny col-12 p-2"
                      >
                        This is an electronically generated report, hence does
                        not require a signature.
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <br />
              </div>
              <p className="p-centered mt-2 container ">
                <br />
                The Customer should examine promptly the statement received and
                notify the bank in writing within 15 calendar days after the
                statement is mailed, transmitted, or otherwise made available to
                customer of any errors, discrepancies or irregularities
                detected, failing which the statement will deem to be
                correct.This is an electronically generated report, hence does
                not require a signature.
              </p>
              <span className="print-show">
                Printed at {new Date().toLocaleString()}
              </span>
            </div>
          </div>
        </section>
      ) : (
        <div className="hero hero-lg">
          <div className="hero-body">
            <h3 className="text-center">
              This data may take some time to load, so please be patient.
            </h3>
          </div>
        </div>
      )}
    </>
  )
}
