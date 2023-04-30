<<<<<<< HEAD:src/model/dashboardModel/FunChart.ts
import fs from "fs"
import path from "path"
import execute from "../oracleClient"

export default class ChartsData {
  async TotalDebitCreditCurrent() {
    try {
      const count_sql = fs
        .readFileSync(
          path.join(
            __dirname,
            "src",
            "model",
            "dashboardModel",
            "quarry",
            "glDataCount.sql"
          )
        )
        .toString()
      const count: any = await execute(count_sql)

      let sql: any = null

      if (count.rows[0].COUNT > 0) {
        sql = fs
          .readFileSync(
            path.join(
              __dirname,
              "src",
              "model",
              "dashboardModel",
              "quarry",
              "totalDebitCredit",
              "totalDeCrCurNoRow.sql"
            )
          )
          .toString()
      } else {
        sql = fs
          .readFileSync(
            path.join(
              __dirname,
              "src",
              "model",

              "dashboardModel",
              "quarry",
              "totalDebitCredit",
              "totalDeCrCur.sql"
            )
          )
          .toString()
      }
      const bindParams: never[] = []
      const payload = await execute(sql, bindParams)
      return payload.rows
    } catch (e) {
      console.log(e)
    }
  }

  async TotalDebitCreditPrevious() {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",

          "dashboardModel",
          "quarry",
          "totalDebitCredit",
          "TotalDeCrPrev.sql"
        )
      )
      .toString()

    const bindParams: never[] = []
    const payload = await execute(sql, bindParams)
    return payload.rows
  }

  async balanceChart() {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",

          "dashboardModel",
          "quarry",
          "balanceChart.sql"
        )
      )
      .toString()
    const bindParams: never[] = []
    const payload = await execute(sql, bindParams)
    return payload.rows
  }
  async balanceDifference() {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",

          "dashboardModel",
          "quarry",
          "balanceDifference.sql"
        )
      )
      .toString()
    const bindParams: never[] = []
    const payload = await execute(sql, bindParams)
    return payload.rows
  }
}
=======
import fs from "fs"
import path from "path"
import execute from "../../oracleClient"

export default class ChartsData {
  async TotalDebitCreditCurrent() {
    try {
      const count_sql = fs
        .readFileSync(
          path.join(
            __dirname,
            "src",
            "model",
            "Models",
            "DashboardModel",
            "quarry",
            "glDataCount.sql"
          )
        )
        .toString()
      const count: any = await execute(count_sql)

      let sql: any = null

      if (count.rows[0].COUNT > 0) {
        sql = fs
          .readFileSync(
            path.join(
              __dirname,
              "src",
              "model",
              "Models",
              "DashboardModel",
              "quarry",
              "totalDebitCredit",
              "totalDeCrCurNoRow.sql"
            )
          )
          .toString()
      } else {
        sql = fs
          .readFileSync(
            path.join(
              __dirname,
              "src",
              "model",
              "Models",
              "DashboardModel",
              "quarry",
              "totalDebitCredit",
              "totalDeCrCur.sql"
            )
          )
          .toString()
      }
      const bindParams: never[] = []
      const payload = await execute(sql, bindParams)
      return payload.rows
    } catch (e) {
      console.log(e)
    }
  }

  async TotalDebitCreditPrevious() {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "DashboardModel",
          "quarry",
          "totalDebitCredit",
          "TotalDeCrPrev.sql"
        )
      )
      .toString()

    const bindParams: never[] = []
    const payload = await execute(sql, bindParams)
    return payload.rows
  }

  async balanceChart() {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "DashboardModel",
          "quarry",
          "balanceChart.sql"
        )
      )
      .toString()
    const bindParams: never[] = []
    const payload = await execute(sql, bindParams)
    return payload.rows
  }
  async balanceDifference() {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "DashboardModel",
          "quarry",
          "balanceDifference.sql"
        )
      )
      .toString()
    const bindParams: never[] = []
    const payload = await execute(sql, bindParams)
    return payload.rows
  }
}
>>>>>>> bcc3b103a25ef8f5fa2d9e3957df0b66c19015a9:src/model/Models/DashboardModel/FunChart.ts
