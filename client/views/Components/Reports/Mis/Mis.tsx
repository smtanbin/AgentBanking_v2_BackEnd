import React, { useState } from "react"
import Filter from "./Filter"
import MisBody from "./MisBody"
import Picker from "./Picker"

const Mis = () => {
  // States
  const [date, setDate]: any = useState()
  const [address, setAddress]: any = useState(true)
  const [dateOfOpening, setDateOfOpening]: any = useState(true)
  // Accounts
  const [accounts, setAccounts]: any = useState(true)
  const [preAccounts, setPreAccounts]: any = useState(true)
  const [curAccounts, setCurAccounts]: any = useState(true)
  // Deposit
  const [deposit, setDeposit]: any = useState(true)
  const [preDeposit, setPreDeposit]: any = useState(true)
  const [curDeposit, setCurDeposit]: any = useState(true)
  // Remittance
  const [remittance, setRemittance]: any = useState(true)
  const [preRemittance, setPreRemittance]: any = useState(true)
  const [curRemittance, setCurRemittance]: any = useState(true)
  const [preNoOfRemittance, setPreNoOfRemittance]: any = useState(true)
  const [curNoOfRemittance, setCurNoOfRemittance]: any = useState(true)
  // Utility
  const [utility, setUtility]: any = useState(true)
  const [preUtility, setPreUtility]: any = useState(true)
  const [curUtility, setCurUtility]: any = useState(true)
  const [preNoOfUtility, setPreNoOfUtility]: any = useState(true)
  const [curNoOfUtility, setCurNoOfUtility]: any = useState(true)
  // Commision
  const [commision, setCommision]: any = useState(true)
  const [preCommision, setPreCommision]: any = useState(true)
  const [curCommision, setCurCommision]: any = useState(true)
  // Table Data
  const [lac, setLac]: any = useState(1)
  const [init, setInit]: any = useState(true)
  const [loading, setLoading]: any = useState(false)
  const [tableData, setTableData]: any = useState()

  // handeler
  const handelAddress = () => {
    setAddress(!address)
  }
  const handelLac = () => {
    setLac(!lac)
  }
  const handelDateOfOpening = () => {
    setDateOfOpening(!dateOfOpening)
  }
  const handelAccounts = (value: any) => {
    let bol: boolean
    value == false ? (bol = value) : (bol = !accounts)
    setAccounts(bol)
    setPreAccounts(bol)
    setCurAccounts(bol)
  }
  const handelDeposit = (value: any) => {
    let bol
    value == false ? (bol = value) : (bol = !deposit)
    setDeposit(bol)
    setPreDeposit(bol)
    setCurDeposit(bol)
  }
  const handelRemittance = (value: any) => {
    let bol
    value == false ? (bol = value) : (bol = !remittance)
    setRemittance(bol)
    setPreRemittance(bol)
    setCurRemittance(bol)
    setPreNoOfRemittance(bol)
    setCurNoOfRemittance(bol)
  }
  const handelUtility = (value: any) => {
    let bol
    value == false ? (bol = value) : (bol = !utility)
    setUtility(bol)
    setPreUtility(bol)
    setCurUtility(bol)
    setPreNoOfUtility(bol)
    setCurNoOfUtility(bol)
  }
  const handelCommision = (value: any) => {
    let bol
    value == false ? (bol = value) : (bol = !commision)
    setCommision(bol)
    setPreCommision(bol)
    setCurCommision(bol)
  }

  return (
    <>
      <div className="columns col-gapless">
        <div className="column col-2 col-md-4 col-sm-12 col-xs-12 print-hide">
          <Picker
            date={date}
            setDate={setDate}
            setTableData={setTableData}
            loading={loading}
            setLoading={setLoading}
            init={init}
            setInit={setInit}
          />
          {!init ? (
            <Filter
              address={address}

              lac={lac}
              handelLac={handelLac}
              dateOfOpening={dateOfOpening}
              handelDateOfOpening={handelDateOfOpening}
              /*accounts Variables*/
              accounts={accounts}
              preAccounts={preAccounts}
              curAccounts={curAccounts}
              setCurAccounts={setCurAccounts}
              setPreAccounts={setPreAccounts}
              handelAddress={handelAddress}
              handelAccounts={handelAccounts}
              /*deposit Variables*/
              deposit={deposit}
              preDeposit={preDeposit}
              curDeposit={curDeposit}
              handelDeposit={handelDeposit}
              setCurDeposit={setCurDeposit}
              setPreDeposit={setPreDeposit}
              /*remittance Variables*/
              remittance={remittance}
              preRemittance={preRemittance}
              curRemittance={curRemittance}
              preNoOfRemittance={preNoOfRemittance}
              curNoOfRemittance={curNoOfRemittance}
              handelRemittance={handelRemittance}
              setPreRemittance={setPreRemittance}
              setCurRemittance={setCurRemittance}
              setPreNoOfRemittance={setPreNoOfRemittance}
              setCurNoOfRemittance={setCurNoOfRemittance}
              // Utility variables
              utility={utility}
              preUtility={preUtility}
              curUtility={curUtility}
              preNoOfUtility={preNoOfUtility}
              curNoOfUtility={curNoOfUtility}
              // Utility Functions
              handelUtility={handelUtility}
              setPreUtility={setPreUtility}
              setCurUtility={setCurUtility}
              setPreNoOfUtility={setPreNoOfUtility}
              setCurNoOfUtility={setCurNoOfUtility}
              // Commision Functions
              commision={commision}
              curCommision={curCommision}
              preCommision={preCommision}
              handelCommision={handelCommision}
              setPreCommision={setPreCommision}
              setCurCommision={setCurCommision}
            />
          ) : (
            <></>
          )}
        </div>
        <div
          className="column col-10 col-md-8 col-sm-12 col-xs-12"
        //   style={{ overflowX: "scroll" }}
        >
          {init ? (
            <LandingPage />
          ) : loading ? (
            <LoadingBody />
          ) : (
            <MisBody
              date={date}
              dateOfOpening={dateOfOpening}
              accounts={accounts}
              address={address}
              lac={lac}
              /*Account Variables*/
              preAccounts={preAccounts}
              curAccounts={curAccounts}
              handelAccounts={handelAccounts}
              /*deposit Variables*/
              deposit={deposit}
              preDeposit={preDeposit}
              curDeposit={curDeposit}
              /*remittance Variables*/
              remittance={remittance}
              preRemittance={preRemittance}
              curRemittance={curRemittance}
              preNoOfRemittance={preNoOfRemittance}
              curNoOfRemittance={curNoOfRemittance}
              /*utility Variables*/
              utility={utility}
              preUtility={preUtility}
              curUtility={curUtility}
              preNoOfUtility={preNoOfUtility}
              curNoOfUtility={curNoOfUtility}
              // commision
              commision={commision}
              preCommision={preCommision}
              curCommision={curCommision}
              /*    Table Data Variables*/
              tableData={tableData}
            />
          )}
        </div>
      </div>
    </>
  )
}

const LandingPage = () => {
  return (
    <div className="hero hero-lg">
      <div className="hero-body">
        <h1>MIS Report</h1>
        <p>This data may take some time to load, so please be patient.</p>
      </div>
    </div>
  )
}

const LoadingBody = () => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "50%",
      }}
    >
      <div className="loading loading-lg p-2"></div>
    </section>
  )
}

export default Mis
