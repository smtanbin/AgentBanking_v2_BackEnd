import React from "react"

const Filter = ({
  dateOfOpening,
  handelDateOfOpening,
  address,
  handelAddress,
  lac,
  handelLac,
  /*accounts Variables*/
  accounts,
  preAccounts,
  curAccounts,
  handelAccounts,
  setCurAccounts,
  setPreAccounts,
  /*deposit Variables*/
  deposit,
  preDeposit,
  curDeposit,
  setCurDeposit,
  setPreDeposit,
  handelDeposit,
  /*Remittance Variables*/
  remittance,
  preRemittance,
  curRemittance,
  preNoOfRemittance,
  curNoOfRemittance,
  // Remittance function
  setCurRemittance,
  setPreRemittance,
  setCurNoOfRemittance,
  setPreNoOfRemittance,
  handelRemittance,
  /*Utility Variables*/
  utility,
  preUtility,
  curUtility,
  preNoOfUtility,
  curNoOfUtility,
  // Utility function
  handelUtility,
  setCurUtility,
  setPreUtility,
  setCurNoOfUtility,
  setPreNoOfUtility,

  //  Commision
  commision,
  curCommision,
  preCommision,
  handelCommision,
  setPreCommision,
  setCurCommision,
}) => {
  // handeler

  const HandelPreAccounts = () => {
    if (!curAccounts && preAccounts) handelAccounts(false)
    setPreAccounts(!preAccounts)
  }
  const HandelCurdseAccounts = () => {
    if (curAccounts && !preAccounts) handelAccounts(false)
    setCurAccounts(!curAccounts)
  }
  const HandelPreDeposit = () => {
    if (!curDeposit && preDeposit) handelDeposit(false)
    setPreDeposit(!preDeposit)
  }
  const HandelCurDeposit = () => {
    if (curDeposit && !preDeposit) handelDeposit(false)
    setCurDeposit(!curDeposit)
  }

  const HandelPreRemittance = () => {
    if (
      !curRemittance &&
      preRemittance &&
      !curNoOfRemittance &&
      !preNoOfRemittance
    ) {
      handelRemittance(false)
    }
    setPreRemittance(!preRemittance)
  }
  const HandelCurRemittance = () => {
    if (
      curRemittance &&
      !preRemittance &&
      !curNoOfRemittance &&
      !preNoOfRemittance
    ) {
      handelRemittance(false)
    }
    setCurRemittance(!curRemittance)
  }
  const HandelPreNoOfRemittance = () => {
    if (
      !curRemittance &&
      !preRemittance &&
      !curNoOfRemittance &&
      preNoOfRemittance
    ) {
      handelRemittance(false)
    }
    setPreNoOfRemittance(!preNoOfRemittance)
  }
  const HandelCurNoOfRemittance = () => {
    if (
      !curRemittance &&
      !preRemittance &&
      curNoOfRemittance &&
      !preNoOfRemittance
    ) {
      handelRemittance(false)
    }
    setCurNoOfRemittance(!curNoOfRemittance)
  }
  const HandelReset = () => {
    handelLac(false)
    handelAddress(true)
    handelDateOfOpening(true)
    handelDeposit(true)
    handelAccounts(true)
    handelRemittance(true)
    handelUtility(true)
    handelCommision(true)
  }
  /*
    //** Utility
     
  */

  const HandelPreUtility = () => {
    if (preUtility && !curUtility && !preNoOfUtility && !curNoOfUtility) {
      handelUtility(false)
    }
    setPreUtility(!preUtility)
  }
  const HandelCurUtility = () => {
    if (!preUtility && curUtility && !preNoOfUtility && !curNoOfUtility) {
      handelUtility(false)
    }
    setCurUtility(!curUtility)
  }
  const HandelPreNoOfUtility = () => {
    if (!preUtility && !curUtility && preNoOfUtility && !curNoOfUtility) {
      handelUtility(false)
    }
    setPreNoOfUtility(!preNoOfUtility)
  }
  const HandelCurNoOfUtility = () => {
    if (!preUtility && !curUtility && !preNoOfUtility && curNoOfUtility) {
      handelUtility(false)
    }
    setCurNoOfUtility(!curNoOfUtility)
  }
  // commision

  const HandelCurCommision = () => {
    if (!preCommision && curCommision) {
      handelCommision(false)
    }
    setCurCommision(!curCommision)
  }
  const HandelPreCommision = () => {
    if (preCommision && !curCommision) {
      handelCommision(false)
    }
    setPreCommision(!preCommision)
  }

  const AccountFilter = () => {
    return (
      <div className="form-group mt-1">
        <label className="form-switch">
          <input type="checkbox" checked={accounts} onChange={handelAccounts} />
          <i className="form-icon"></i> Accounts
        </label>
        {accounts ? (
          <div className="ml-2 p-2 container">
            <label className="form-switch">
              <input
                type="checkbox"
                checked={preAccounts}
                onChange={HandelPreAccounts}
              />
              <i className="form-icon bg-secondary"></i> Previous
            </label>
            <label className="form-switch">
              <input
                type="checkbox"
                checked={curAccounts}
                onChange={HandelCurdseAccounts}
              />
              <i className="form-icon bg-secondary"></i> Current
            </label>
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  }
  const DepositFilter = () => {
    return (
      <div className="form-group mt-1">
        <label className="form-switch">
          <input type="checkbox" checked={deposit} onChange={handelDeposit} />
          <i className="form-icon"></i> Deposit
        </label>
        {deposit ? (
          <div className="ml-2 p-2 container">
            <label className="form-switch">
              <input
                type="checkbox"
                checked={preDeposit}
                onChange={HandelPreDeposit}
              />
              <i className="form-icon bg-secondary"></i> Previous
            </label>
            <label className="form-switch">
              <input
                type="checkbox"
                checked={curDeposit}
                onChange={HandelCurDeposit}
              />
              <i className="form-icon bg-secondary"></i> Current
            </label>
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  }
  const RemittanceFilter = () => {
    return (
      <div className="form-group mt-1">
        <label className="form-switch">
          <input
            type="checkbox"
            checked={remittance}
            onChange={handelRemittance}
          />
          <i className="form-icon"></i> Remittance
        </label>
        {remittance ? (
          <div className="ml-2 p-2 container">
            <label className="form-switch text-clip">
              <input
                type="checkbox"
                checked={preNoOfRemittance}
                onChange={HandelPreNoOfRemittance}
              />
              <i className="form-icon bg-secondary"></i> Recived Previous
            </label>
            <label className="form-switch text-clip">
              <input
                type="checkbox"
                checked={preRemittance}
                onChange={HandelPreRemittance}
              />
              <i className="form-icon bg-secondary"></i> Amount Previous
            </label>

            <label className="form-switch text-clip text-clip">
              <input
                type="checkbox"
                checked={curNoOfRemittance}
                onChange={HandelCurNoOfRemittance}
              />
              <i className="form-icon bg-secondary"></i> Recived Current
            </label>

            <label className="form-switch text-clip">
              <input
                type="checkbox"
                checked={curRemittance}
                onChange={HandelCurRemittance}
              />
              <i className="form-icon bg-secondary "></i> Amount Current
            </label>
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  }
  const UtilityFilter = () => {
    return (
      <div className="form-group mt-1">
        <label className="form-switch">
          <input type="checkbox" checked={utility} onChange={handelUtility} />
          <i className="form-icon"></i> Utility
        </label>
        {utility ? (
          <div className="ml-2 p-2 container">
            <label className="form-switch text-clip">
              <input
                type="checkbox"
                checked={preNoOfUtility}
                onChange={HandelPreNoOfUtility}
              />
              <i className="form-icon bg-secondary"></i> Collected Previous
            </label>
            <label className="form-switch text-clip">
              <input
                type="checkbox"
                checked={preUtility}
                onChange={HandelPreUtility}
              />
              <i className="form-icon bg-secondary"></i> Balance Previous
            </label>

            <label className="form-switch text-clip text-clip">
              <input
                type="checkbox"
                checked={curNoOfUtility}
                onChange={HandelCurNoOfUtility}
              />
              <i className="form-icon bg-secondary"></i> Collected Current
            </label>

            <label className="form-switch text-clip">
              <input
                type="checkbox"
                checked={curUtility}
                onChange={HandelCurUtility}
              />
              <i className="form-icon bg-secondary "></i> Balance Current
            </label>
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  }
  const CommisionFilter = () => {
    return (
      <div className="form-group mt-1">
        <label className="form-switch">
          <input
            type="checkbox"
            checked={commision}
            onChange={handelCommision}
          />
          <i className="form-icon"></i> Commision
        </label>
        {commision ? (
          <div className="ml-2 p-2 container">
            <label className="form-switch text-clip">
              <input
                type="checkbox"
                checked={preCommision}
                onChange={HandelPreCommision}
              />
              <i className="form-icon bg-secondary"></i> Collected Previous
            </label>
            <label className="form-switch text-clip">
              <input
                type="checkbox"
                checked={curCommision}
                onChange={HandelCurCommision}
              />
              <i className="form-icon bg-secondary "></i> Balance Current
            </label>
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  }

  return (
    <div className="card m-2">
      <div className="card-header">
        <div className="card-title h5">Filter</div>

        <div className="card-body">
          <div className="form-group">
            <label className="form-switch text-clip">
              <input type="checkbox" checked={lac} onChange={handelLac} />
              <i className="form-icon"></i> Figure In Lac
            </label>

            <label className="form-switch text-clip">
              <input
                type="checkbox"
                checked={address}
                onChange={handelAddress}
              />
              <i className="form-icon"></i> Address
            </label>
            <label className="form-switch text-clip">
              <input
                type="checkbox"
                checked={dateOfOpening}
                onChange={handelDateOfOpening}
              />
              <i className="form-icon "></i> Date of Opening
            </label>
            <AccountFilter />
            <DepositFilter />
            <RemittanceFilter />
            <UtilityFilter />
            <CommisionFilter />
          </div>
        </div>
      </div>
      <div className="card-footer p-centered">
        <button className="btn btn-error" onClick={HandelReset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default Filter
