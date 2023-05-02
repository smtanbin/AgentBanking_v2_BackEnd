import fs from "fs"
import path from "path"
import execute from "../oracleClient"

export default class Notification {
  async maturity() {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "notificationModel",
          "maturity.sql"
        )
      )
      .toString()
    const payload = await execute(sql)
    return payload.rows
  }
}
