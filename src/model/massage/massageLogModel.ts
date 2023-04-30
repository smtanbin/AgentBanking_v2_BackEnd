import fs from "fs"
import path from "path"
import execute from "../oracleClient"

export default class MassageLogModel {
  async list() {
    const sql: string = fs
      .readFileSync(path.join(__dirname, "src", "model", "massage", "list.sql"))
      .toString()
    const payload = await execute(sql)

    return payload.rows
  }

  async search(param: string) {
    const sql: string = fs
      .readFileSync(
        path.join(__dirname, "src", "model", "massage", "search.sql")
      )
      .toString()
    const bindParams = [param.toString()]
    try {
      const payload = await execute(sql, bindParams)
      return payload.rows
    } catch (e) {
      throw new Error(`Error: Sql:${sql},bindParams:${bindParams} Error:` + e)
    }
  }
}
