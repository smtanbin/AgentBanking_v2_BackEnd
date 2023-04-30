<<<<<<< HEAD:src/model/notificationModel/notificationModel.ts
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
=======
import fs from "fs"
import path from "path"
import execute from "../../oracleClient"

export default class Notification {
  async maturity() {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "notificationModel",
          "maturity.sql"
        )
      )
      .toString()
    const payload = await execute(sql)
    return payload.rows
  }
}
>>>>>>> bcc3b103a25ef8f5fa2d9e3957df0b66c19015a9:src/model/Models/notificationModel/notificationModel.ts
