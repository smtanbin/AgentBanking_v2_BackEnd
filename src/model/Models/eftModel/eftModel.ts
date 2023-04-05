import fs from "fs"
import path from "path"
import execute from "../../oracleClient"

export default class EftReportModel {
  async sum() {
    const sql: string = fs
      .readFileSync(
        path.join(__dirname, "src", "model", "Models", "eftModel", "eftSum.sql")
      )
      .toString()
    const payload = await execute(sql)
    return payload.rows
  }
  async list() {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "eftModel",
          "eftList.sql"
        )
      )
      .toString()
    const payload = await execute(sql)
    return payload.rows
  }
  async return() {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "eftModel",
          "eftReturn.sql"
        )
      )
      .toString()
    const payload = await execute(sql)
    return payload.rows
  }
}
