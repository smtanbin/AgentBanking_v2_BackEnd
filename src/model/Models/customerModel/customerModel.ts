import fs from "fs"
import path from "path"
import execute, { lob } from "../../oracleClient"

export default class Customer {
  async get(param: string) {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "customerModel",
          "getCustomer.sql"
        )
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

  async photo(param: string) {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "customerModel",
          "photoSearch.sql"
        )
      )
      .toString()
    const bindParams = [param]
    try {
      const payload = await lob(sql, bindParams)
      return payload
    } catch (e) {
      throw new Error(`Error: Sql:${sql},bindParams:${bindParams} Error:` + e)
    }
  }

  async imageData(param: string) {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "customerModel",
          "searchImageData.sql"
        )
      )
      .toString()
    const bindParams = [param]
    try {
      const payload = await lob(sql, bindParams)
      return payload
    } catch (e) {
      throw new Error(`Error: Sql:${sql},bindParams:${bindParams} Error:` + e)
    }
  }

  async search(param: string) {
    const sql: string = fs
      .readFileSync(
        path.join(
          __dirname,
          "src",
          "model",
          "Models",
          "customerModel",
          "search.sql"
        )
      )
      .toString()
    const bindParams = [param]
    try {
      const payload = await execute(sql, bindParams)
      return payload.rows
    } catch (e) {
      throw new Error(`Error: Sql:${sql},bindParams:${bindParams} Error:` + e)
    }
  }
}
