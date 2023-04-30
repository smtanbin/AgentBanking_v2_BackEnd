<<<<<<< HEAD:src/model/eftModel/eftModel.ts
import fs from "fs"
import path from "path"
import execute from "../oracleClient"

export default class EftReportModel {
  async sum() {
    const sql: string = fs
      .readFileSync(
        path.join(__dirname, "src", "model", "eftModel", "eftSum.sql")
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

          "eftModel",
          "eftReturn.sql"
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
>>>>>>> bcc3b103a25ef8f5fa2d9e3957df0b66c19015a9:src/model/Models/eftModel/eftModel.ts
