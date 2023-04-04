import * as fs from "fs"
import * as path from "path"
import moment from "moment"
import execute from "../../../model/oracleClient"

export default class TransactionModel {
  constructor() {}

  async head(mphone: string, todate: string) {
    const headSql: any = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "TransactionModels",
          "statmenthead.sql"
        )
      )
      .toString()

    const sql: string = headSql
    const bindParams = [mphone.toString(), todate.toString()]
    const payload = await execute(sql, bindParams)
    return payload.rows
  }

  async statment(mphone: string, fromdate: string, todate: string) {
    if (!fromdate) {
      fromdate = fs
        .readFileSync(
          path.join(
            __dirname,
            "src",
            "model",
            "Models",
            "TransactionModels",
            "getRegDate.sql"
          )
        )
        .toString()
    }

    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "TransactionModels",
          "statment.sql"
        )
      )
      .toString()
    const bindParams = [
      mphone.toString(),
      fromdate.toString(),
      todate.toString(),
    ]
    const payload = await execute(sql, bindParams)
    return payload.rows
  }

  async ministatment(mphone: string) {
    const _balance: any = await execute(
      `SELECT round(TANBIN.FUNC_GET_ACC_BALANCE(${mphone.toString()},TRUNC (SYSDATE) - INTERVAL '1' DAY),2)balance FROM dual`
    )
    let balance: number = 0

    balance = _balance.rows[0].BALANCE

    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "TransactionModels",
          "miniStatment.sql"
        )
      )
      .toString()
    const bindParams = [mphone.toString()]
    let payload: any = await execute(sql, bindParams)
    payload = payload.rows
    const result: any = []
    payload.map(
      (
        { CR_AMT, DR_AMT, TRANS_NO, TRANS_DATE, PARTICULAR }: any,
        index: number
      ) => {
        balance = balance - CR_AMT + DR_AMT
        const _date = moment(TRANS_DATE).format("lll")
        const obj = {
          SL: index + 1,
          CR_AMT: CR_AMT.toFixed(2),
          DR_AMT: DR_AMT.toFixed(2),
          BALANCE: balance.toFixed(2),
          TRANS_NO,
          TRANS_DATE: _date,
          PARTICULAR,
        }
        result.push(obj)
      }
    )
    return result
  }
}
