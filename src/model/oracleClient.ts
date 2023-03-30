import oracledb from "oracledb"
import path from "path"
import fs from "fs"

export async function createClient() {
  try {
    const configPath = path.join(__dirname, "./config.json")
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
    if (!config && !config.database) {
      throw new Error("config.json file not found.")
      return undefined
    } else {
      return await oracledb.getConnection(config.database)
    }
  } catch (e) {
    console.log("Error at 'oracleClient' function createClient ", e)
  }
}

interface QueryResult<T> {
  [x: string]: any
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

export async function lob<T>(sql: string, bindParams: any = []): Promise<any> {
  const client = await createClient()

  if (!client) {
    const client = await createClient()
    throw new Error("Failed to create database client")
  }

  try {
    oracledb.fetchAsString = [oracledb.CLOB]
    const result: any = await client.execute(sql, bindParams, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    })

    if (result.rows.length === 0) console.error("No results")
    else {
      return result.rows
    }
  } catch (err) {
    console.error("Error in oracledb client execute", err)
    throw err
  } finally {
    await client.close()
  }
}

export default execute
