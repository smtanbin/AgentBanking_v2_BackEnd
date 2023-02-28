import React from "react";
import uuid from "react-uuid"
import moment from "moment/moment"


const MisBody = ({
  date,
  dateOfOpening,
  address,
  lac,
  /*Account Variables*/
  accounts,
  preAccounts,
  curAccounts,
  /*deposit Variables*/
  deposit,
  preDeposit,
  curDeposit,
  /*remittance Variables*/
  remittance,
  preRemittance,
  curRemittance,
  preNoOfRemittance,
  curNoOfRemittance,
  /*utility  Variables*/
  utility,
  preUtility,
  curUtility,
  preNoOfUtility,
  curNoOfUtility,
  // Commision
  commision,
  preCommision,
  curCommision,
  /*Table Data  Variables*/
  handelAccounts,
  tableData,
}) => {
  // Counters
  // Currents
  let currentNoOfAccountCounter = 0
  let currentDepositCounter = 0
  let currentNoOfRemittanceAmountCounter = 0
  let currentRemittanceAmountCounter = 0
  let currentNoOfUtilityCounter = 0
  let currentUtilityAmountCounter = 0
  let currentCommisionCounter = 0
  // Precious
  let preciousNoOfAccountCounter = 0
  let preciousDepositCounter = 0
  let preciousNoOfRemittanceAmountCounter = 0
  let preciousRemittanceAmountCounter = 0
  let preciousNoOfUtilityCounter = 0
  let preciousUtilityAmountCounter = 0
  let preciousCommisionCounter = 0

  return (
    <section className="m-2" id="mis-body" style={{ width: "100%" }}>
      <style>{ }</style>
      <table className="table table-scroll">
        <thead>
          <tr key={uuid()}>
            <th colSpan={19} className="text-black text-center bg-none">
              <span className="mr-1">
                Agent Wise Comparative Business Performance for
              </span>
              {date ? moment(date.toString() + "-01").format("MMMM, YYYY") : ""}
            </th>
          </tr>
          {lac ? (
            <tr key={uuid()}>
              <th colSpan={31} className="text-small text-left">
                (Figure In Lac)
              </th>
            </tr>
          ) : (
            <></>
          )}
          <tr className="active bg-gray" key={uuid()}>
            <th rowSpan={2} className=" text-center text-small  bg-secondary">
              Sl
            </th>
            <th rowSpan={2} className=" text-small text-center bg-secondary">
              Name of Agent
            </th>
            {/* 
            //**Address Tab 
            */}
            {address ? (
              <th rowSpan={2} className=" text-small text-center bg-secondary">
                Address
              </th>
            ) : (
              <></>
            )}
            {/* 
            //** Opening Date Tab
            */}
            {dateOfOpening ? (
              <th
                rowSpan={2}
                className=" text-small text-center text-clip bg-secondary"
              >
                Date of Opening
              </th>
            ) : (
              <></>
            )}
            {/* 
            //** Account Tab 
            */}
            {accounts ? (
              <th
                colSpan={preAccounts && curAccounts ? 2 : 0}
                className=" text-small text-center bg-secondary"
              >
                Accounts
              </th>
            ) : (
              <></>
            )}
            {/* 
            //** Deposit Tab
             */}
            {deposit ? (
              <th
                colSpan={preDeposit && curDeposit ? 2 : 0}
                className=" text-small text-center bg-secondary"
              >
                Deposit
              </th>
            ) : (
              <></>
            )}
            {/* 
            //** remittance Tab 
            */}
            {remittance ? (
              <th
                colSpan={
                  preRemittance &&
                    curRemittance &&
                    preNoOfRemittance &&
                    curNoOfRemittance
                    ? 4
                    : (preRemittance && curRemittance && preNoOfRemittance) ||
                      (preRemittance && curRemittance && curNoOfRemittance) ||
                      (preRemittance &&
                        preNoOfRemittance &&
                        curNoOfRemittance) ||
                      (curRemittance && preNoOfRemittance && curNoOfRemittance)
                      ? 3
                      : (preRemittance && curRemittance) ||
                        (preNoOfRemittance && curNoOfRemittance)
                        ? 2
                        : 0
                }
                className=" text-small text-center bg-secondary"
              >
                Remittance
              </th>
            ) : (
              <></>
            )}

            {/* 
            //** Utility Tab 
            */}
            {utility ? (
              <th
                colSpan={
                  preUtility && curUtility && preNoOfUtility && curNoOfUtility
                    ? 4
                    : (preUtility && curUtility && preNoOfUtility) ||
                      (preUtility && curUtility && curNoOfUtility) ||
                      (preUtility && preNoOfUtility && curNoOfUtility) ||
                      (curUtility && preNoOfUtility && curNoOfUtility)
                      ? 3
                      : (preUtility && curUtility) ||
                        (preNoOfUtility && curNoOfUtility)
                        ? 2
                        : 0
                }
                className=" text-small text-center bg-secondary"
              >
                Utility Bill Collected
              </th>
            ) : (
              <></>
            )}

            {commision ? (
              <th colSpan={2} className="text-small text-center bg-secondary">
                Commision
              </th>
            ) : null}
            <th
              rowSpan={2}
              colSpan={3}
              className=" text-small text-left bg-secondary"
            >
              Remarks
            </th>
          </tr>
          <tr className="bg-gray">
            {accounts && preAccounts ? (
              <th className="text-tiny text-right col-1">Previous</th>
            ) : null}
            {accounts && curAccounts ? (
              <th className="text-tiny text-right col-1">Current</th>
            ) : null}
            {deposit && preDeposit ? (
              <th className="text-tiny text-right">Previous</th>
            ) : null}
            {deposit && curDeposit ? (
              <th className="text-tiny text-right">Current</th>
            ) : null}
            {/* Remittance */}
            {remittance && preNoOfRemittance ? (
              <th className="text-tiny text-center">
                Previous <br />
                Recived
              </th>
            ) : null}
            {remittance && curRemittance ? (
              <th className="text-tiny text-center">
                Recived
                <br />
                Current
              </th>
            ) : null}
            {remittance && preRemittance ? (
              <th className="text-tiny text-center">
                Previous
                <br /> Amount
              </th>
            ) : null}
            {remittance && curNoOfRemittance ? (
              <th className="text-tiny text-center">
                Current
                <br />
                Amount
              </th>
            ) : null}

            {/* NoOfUtility */}
            {utility && preNoOfUtility ? (
              <th className="text-tiny text-center">
                Previous
                <br /> No Of Bill
              </th>
            ) : null}
            {utility && curNoOfUtility ? (
              <th className="text-tiny text-center">
                Current <br />
                No Of Bill
              </th>
            ) : null}
            {/* utility */}
            {utility && preUtility ? (
              <th className="text-tiny text-center">
                Previous
                <br />
                Bill Amount
              </th>
            ) : null}
            {utility && curUtility ? (
              <th className="text-tiny text-center">
                Current <br />
                Bill Amount
              </th>
            ) : null}
            {/* commision */}
            {commision && preCommision ? (
              <th className="text-tiny text-center">Previous</th>
            ) : null}
            {commision && curCommision ? (
              <th className="text-tiny text-center">Current</th>
            ) : null}
          </tr>
        </thead>

        <tbody>
          {tableData ? (
            tableData.map(
              (
                {
                  AGENT,
                  ADDRESS,
                  OPENDATE,
                  PREVIOUSNOOFACCOUNT,
                  CURRENTNOOFACCOUNT,
                  PREVIOUSBALANCE,
                  CURRENTBALANCE,
                  CURRENTNOOFREMITTANCE,
                  CURRENTREMITTANCEAMOUNT,
                  PREVIOUSNOOFREMITTANCE,
                  PREVIOUSREMITTANCEAMOUNT,
                  PREVIOUSNOOFUTILITY,
                  CURRENTNOOFUTILITY,
                  PreviousUtilityAmount,
                  CURRENTUTILITYAMOUNT,
                  COMMISSIONTHISMONTH,
                  COMMISSIONPREVIOUSMONTH,
                },
                index
              ) => {
                currentNoOfAccountCounter += CURRENTNOOFACCOUNT
                currentDepositCounter += CURRENTBALANCE
                currentNoOfRemittanceAmountCounter += CURRENTREMITTANCEAMOUNT
                currentRemittanceAmountCounter += CURRENTREMITTANCEAMOUNT
                currentNoOfUtilityCounter += CURRENTNOOFUTILITY
                currentUtilityAmountCounter += 0
                currentCommisionCounter += 0
                // Precious
                preciousNoOfAccountCounter += PREVIOUSNOOFACCOUNT
                preciousDepositCounter += PREVIOUSBALANCE
                preciousNoOfRemittanceAmountCounter += PREVIOUSNOOFREMITTANCE
                preciousRemittanceAmountCounter += PREVIOUSREMITTANCEAMOUNT
                preciousNoOfUtilityCounter += PREVIOUSNOOFUTILITY
                preciousUtilityAmountCounter += 0
                preciousCommisionCounter += 0
                return (
                  <tr className="" key={uuid()}>
                    <td className="text-break text-tiny">{index + 1}</td>
                    <td className="break-after-4-words text-bold text-tiny">
                      {AGENT}
                    </td>
                    {address ? (
                      <td className="break-after-4-words  text-tiny">
                        {ADDRESS}
                      </td>
                    ) : null}
                    {dateOfOpening ? (
                      <td className="text-break text-tiny">
                        {OPENDATE
                          ? moment(OPENDATE).format("MMM Do YYYY")
                          : "Unknown"}
                      </td>
                    ) : null}
                    {accounts && preAccounts ? (
                      <td>{PREVIOUSNOOFACCOUNT}</td>
                    ) : null}
                    {accounts && curAccounts ? (
                      <td className="text-bold">{CURRENTNOOFACCOUNT}</td>
                    ) : null}
                    {deposit && preDeposit ? (
                      <td>
                        {PREVIOUSBALANCE && lac
                          ? (PREVIOUSBALANCE / 100000).toLocaleString("en-BD", {
                            maximumFractionDigits: 2,
                          })
                          : PREVIOUSBALANCE && !lac
                            ? PREVIOUSBALANCE.toLocaleString("en-BD", {
                              maximumFractionDigits: 2,
                            })
                            : "-"}
                      </td>
                    ) : null}
                    {deposit && curDeposit ? (
                      <td className="text-bold">
                        {CURRENTBALANCE && lac
                          ? (CURRENTBALANCE / 100000).toLocaleString("en-BD", {
                            maximumFractionDigits: 2,
                          })
                          : CURRENTBALANCE && !lac
                            ? CURRENTBALANCE.toLocaleString("en-BD", {
                              maximumFractionDigits: 2,
                            })
                            : "-"}
                      </td>
                    ) : null}

                    {/* Remittance */}

                    {remittance && preNoOfRemittance ? (
                      <td>{PREVIOUSNOOFREMITTANCE}</td>
                    ) : null}

                    {remittance && curNoOfRemittance ? (
                      <td className="text-bold">{CURRENTNOOFREMITTANCE}</td>
                    ) : null}

                    {remittance && preRemittance ? (
                      <td>
                        {PREVIOUSREMITTANCEAMOUNT && lac
                          ? (PREVIOUSREMITTANCEAMOUNT / 100000).toLocaleString(
                            "en-BD",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                          : PREVIOUSREMITTANCEAMOUNT && !lac
                            ? PREVIOUSREMITTANCEAMOUNT.toLocaleString("en-BD", {
                              maximumFractionDigits: 2,
                            })
                            : "-"}
                      </td>
                    ) : null}

                    {remittance && curRemittance ? (
                      <td className="text-bold">
                        {CURRENTREMITTANCEAMOUNT && lac
                          ? (CURRENTREMITTANCEAMOUNT / 100000).toLocaleString(
                            "en-BD",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                          : CURRENTREMITTANCEAMOUNT && !lac
                            ? CURRENTREMITTANCEAMOUNT.toLocaleString("en-BD", {
                              maximumFractionDigits: 2,
                            })
                            : "-"}
                      </td>
                    ) : null}

                    {/* utility */}

                    {utility && preUtility ? (
                      <td>{PREVIOUSNOOFUTILITY}</td>
                    ) : null}

                    {utility && curUtility ? (
                      <td className="text-bold">{CURRENTNOOFUTILITY}</td>
                    ) : null}

                    {utility && preNoOfUtility ? (
                      <td>
                        {PreviousUtilityAmount && lac
                          ? (PreviousUtilityAmount / 100000).toLocaleString(
                            "en-BD",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                          : PreviousUtilityAmount && !lac
                            ? PreviousUtilityAmount.toLocaleString("en-BD", {
                              maximumFractionDigits: 2,
                            })
                            : "-"}
                      </td>
                    ) : null}

                    {utility && curNoOfUtility ? (
                      <td className="text-bold">
                        {CURRENTUTILITYAMOUNT && lac
                          ? (CURRENTUTILITYAMOUNT / 100000).toLocaleString(
                            "en-BD",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                          : CURRENTUTILITYAMOUNT && !lac
                            ? CURRENTUTILITYAMOUNT.toLocaleString("en-BD", {
                              maximumFractionDigits: 2,
                            })
                            : "-"}
                      </td>
                    ) : null}

                    {/*  Commision */}
                    {commision && preCommision ? (
                      <td>
                        {COMMISSIONPREVIOUSMONTH && lac
                          ? (COMMISSIONPREVIOUSMONTH / 100000).toLocaleString(
                            "en-BD",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                          : COMMISSIONPREVIOUSMONTH && !lac
                            ? COMMISSIONPREVIOUSMONTH.toLocaleString("en-BD", {
                              maximumFractionDigits: 2,
                            })
                            : "-"}
                      </td>
                    ) : null}
                    {commision && curCommision ? (
                      <td>
                        {COMMISSIONTHISMONTH && lac
                          ? (COMMISSIONTHISMONTH / 100000).toLocaleString(
                            "en-BD",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                          : COMMISSIONTHISMONTH && !lac
                            ? COMMISSIONTHISMONTH.toLocaleString("en-BD", {
                              maximumFractionDigits: 2,
                            })
                            : "-"}
                      </td>
                    ) : null}

                    <td colSpan={2}></td>
                  </tr>
                )
              }
            )
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
          {/* <tr key={uuid()} className="active">
            <td className="text-bold" colSpan={4}>
              Total
            </td>
            <td className="text-bold">{currentNoOfAccountCounter}</td>
            <td className="text-bold">{preciousNoOfAccountCounter}</td>
            <td className="text-bold">{preciousDepositCounter}</td>
            <td className="text-bold">{currentDepositCounter}</td>

            <td className="text-bold">{preciousNoOfRemittanceAmountCounter}</td>
            <td className="text-bold">{preciousRemittanceAmountCounter}</td>
            <td className="text-bold">{currentNoOfRemittanceAmountCounter}</td>
            <td className="text-bold">{currentRemittanceAmountCounter}</td>

            <td className="text-bold">{preciousNoOfUtilityCounter}</td>
            <td className="text-bold">{preciousUtilityAmountCounter}</td>
            <td className="text-bold">{currentNoOfUtilityCounter}</td>
            <td className="text-bold">{currentUtilityAmountCounter}</td>
          </tr> */}
        </tbody>
      </table>
    </section>
  )
}
export default MisBody
