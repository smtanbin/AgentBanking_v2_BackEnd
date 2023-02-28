import { useState } from "react"
import Filter from "./Filter"
import MisBody from "./MisBody"
import Picker from "./Picker"

const Mis = () => {
  // States
  const [date, setDate] = useState()
  const [address, setAddress] = useState(true)
  const [dateOfOpening, setDateOfOpening] = useState(true)
  // Accounts
  const [accounts, setAccounts] = useState(true)
  const [preAccounts, setPreAccounts] = useState(true)
  const [curAccounts, setCurAccounts] = useState(true)
  // Deposit
  const [deposit, setDeposit] = useState(true)
  const [preDeposit, setPreDeposit] = useState(true)
  const [curDeposit, setCurDeposit] = useState(true)
  // Remittance
  const [remittance, setRemittance] = useState(true)
  const [preRemittance, setPreRemittance] = useState(true)
  const [curRemittance, setCurRemittance] = useState(true)
  const [preNoOfRemittance, setPreNoOfRemittance] = useState(true)
  const [curNoOfRemittance, setCurNoOfRemittance] = useState(true)
  // Utility
  const [utility, setUtility] = useState(true)
  const [preUtility, setPreUtility] = useState(true)
  const [curUtility, setCurUtility] = useState(true)
  const [preNoOfUtility, setPreNoOfUtility] = useState(true)
  const [curNoOfUtility, setCurNoOfUtility] = useState(true)
  // Commision
  const [commision, setCommision] = useState(true)
  const [preCommision, setPreCommision] = useState(true)
  const [curCommision, setCurCommision] = useState(true)
  // Table Data
  const [lac, setLac] = useState(1)
  const [init, setInit] = useState(true)
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState()

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
  const handelAccounts = (value) => {
    let bol
    value == false ? (bol = value) : (bol = !accounts)
    setAccounts(bol)
    setPreAccounts(bol)
    setCurAccounts(bol)
  }
  const handelDeposit = (value) => {
    let bol
    value == false ? (bol = value) : (bol = !deposit)
    setDeposit(bol)
    setPreDeposit(bol)
    setCurDeposit(bol)
  }
  const handelRemittance = (value) => {
    let bol
    value == false ? (bol = value) : (bol = !remittance)
    setRemittance(bol)
    setPreRemittance(bol)
    setCurRemittance(bol)
    setPreNoOfRemittance(bol)
    setCurNoOfRemittance(bol)
  }
  const handelUtility = (value) => {
    let bol
    value == false ? (bol = value) : (bol = !utility)
    setUtility(bol)
    setPreUtility(bol)
    setCurUtility(bol)
    setPreNoOfUtility(bol)
    setCurNoOfUtility(bol)
  }
  const handelCommision = (value) => {
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
              handel={address}
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
