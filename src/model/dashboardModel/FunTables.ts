import fs from "fs"
import path from "path"
import execute from "../../model/oracleClient"

export default class FunTables {
  async PendingEvent() {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "dashboardModel",
          "quarry",
          "pendingEvent.sql"
        )
      )
      .toString()
    const bindParams: never[] = []
    const payload = await execute(sql, bindParams)
    return payload.rows
  }

  async TransductionEvents() {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "dashboardModel",
          "quarry",
          "transductionEvents.sql"
        )
      )
      .toString()

    const payload = await execute(sql)
    return payload.rows
  }
}
