<<<<<<< HEAD:src/model/reportModel/remittance/remittanceModel.ts
import fs from "fs"
import path from "path"
import execute from "../../oracleClient"

export default class Remittance {
  remittancehouselist = async () => {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "reportModel",
          "remittance",
          "remittancehouselist.sql"
        )
      )
      .toString()
    const payload = await execute(sql)
    return payload.rows
  }
  remittanceReport = async (fromdate: string, todate: string) => {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "reportModel",
          "remittance",
          "remittanceReport.sql"
        )
      )
      .toString()
    const bindParams = [fromdate, todate]
    const payload = await execute(sql, bindParams)
    return payload.rows
  }
  remittancesummary = async (fromdate: string, todate: string) => {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",

          "reportModel",
          "remittance",
          "remittancesummary.sql"
        )
      )
      .toString()
    const bindParams = [fromdate, todate]
    const payload = await execute(sql, bindParams)
    return payload.rows
  }

  remittanceRequestList = async () => {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",

          "reportModel",
          "remittance",
          "remittanceRequestList.sql"
        )
      )
      .toString()
    const payload = await execute(sql)
    return payload.rows
  }
}
=======
import fs from "fs"
import path from "path"
import execute from "../../../oracleClient"

export default class Remittance {
  remittancehouselist = async () => {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "reportModel",
          "remittance",
          "remittancehouselist.sql"
        )
      )
      .toString()
    const payload = await execute(sql)
    return payload.rows
  }
  remittanceReport = async (fromdate: string, todate: string) => {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "reportModel",
          "remittance",
          "remittanceReport.sql"
        )
      )
      .toString()
    const bindParams = [fromdate, todate]
    const payload = await execute(sql, bindParams)
    return payload.rows
  }
  remittancesummary = async (fromdate: string, todate: string) => {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "reportModel",
          "remittance",
          "remittancesummary.sql"
        )
      )
      .toString()
    const bindParams = [fromdate, todate]
    const payload = await execute(sql, bindParams)
    return payload.rows
  }

  remittanceRequestList = async () => {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "reportModel",
          "remittance",
          "remittanceRequestList.sql"
        )
      )
      .toString()
    const payload = await execute(sql)
    return payload.rows
  }
}
>>>>>>> bcc3b103a25ef8f5fa2d9e3957df0b66c19015a9:src/model/Models/reportModel/remittance/remittanceModel.ts
