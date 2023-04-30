<<<<<<< HEAD:src/model/dashboardModel/FunTables.ts
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
=======
import fs from "fs"
import path from "path"
import execute from "../../../model/oracleClient"

export default class FunTables {
  async PendingEvent() {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "DashboardModel",
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
          "Models",
          "DashboardModel",
          "quarry",
          "transductionEvents.sql"
        )
      )
      .toString()

    const payload = await execute(sql)
    return payload.rows
  }
}
>>>>>>> bcc3b103a25ef8f5fa2d9e3957df0b66c19015a9:src/model/Models/DashboardModel/FunTables.ts
