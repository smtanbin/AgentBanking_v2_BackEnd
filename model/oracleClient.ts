// base on https://stackoverflow.com/questions/35172767/db-query-is-returning-undefined-value-in-node-js-with-oracledb

// import oracledb from "oracledb"
// import path from "path"
// import fs from "fs"

// export async function createClient() {
//   try {
//     const configPath = path.join(__dirname, "../config.json")
//     const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
//     if (!config || !config.database) {
//       console.log("config.json file not found.")
//       return undefined
//     } else {
//       const client = await oracledb.getConnection(config.database)
//       return client
//     }
//   } catch (e) {
//     console.log("Error in 'oracleClient' function createClient ", e)
//     return undefined
//   }
// }

// interface QueryResult<T> {
//   rows: T[]
//   metaData: any
// }

// export default async function execute<T>(
//   sql: string,
//   bindParams: any = []
// ): Promise<QueryResult<T>> {
//   const client = await createClient()
//   if (!client) {
//     throw new Error("Failed to create database client")
//   }
//   try {
//     const result = await client.execute(sql, bindParams, {
//       outFormat: oracledb.OUT_FORMAT_OBJECT,
//     })
//     return result as QueryResult<T>
//   } catch (err) {
//     console.error("Error in oracledb client execute", err)
//     throw err
//   } finally {
//     await client.close()
//   }
// }

// original

import oracledb, { Connection, ResultSet } from "oracledb"
import path from "path"
import fs from "fs"

export async function createClient() {
  try {
    const configPath = path.join(__dirname, "../config.json")
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
    if (!config && !config.database) {
      console.log("config.json file not found.")
      return undefined
    } else {
      const client = await oracledb.getConnection(config.database)
      return client
    }
  } catch (e) {
    console.log("Error orgin 'oracleClient' function createClient ", e)
  }
}

interface QueryResult<T> {
  rows: T[]
  metaData: any
}

async function execute<T>(
  sql: string,
  bindParams: any = []
): Promise<QueryResult<T>> {
  const client = await createClient()
  if (!client) {
    throw new Error("Failed to create database client")
  }
  try {
    const result = await client.execute(sql, bindParams, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    })
    return result as QueryResult<T>
  } catch (err) {
    console.error("Error in oracledb client execute", err)
    throw err
  } finally {
    await client.close()
  }
}

export default execute
