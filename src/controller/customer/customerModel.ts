import execute, { lob } from "../../model/oracleClient"

export default class Customer {
  async get(param: string) {
    const sql: string =
      "SELECT *  FROM AGENT_BANKING.CUSTIDINFO  c  LEFT JOIN AGENT_BANKING.REGINFO r ON c.CUST_ID = r.CUST_ID  WHERE    c.NID_NO = :item OR c.CON_MOB = :item OR r.MPHONE = :item OR r.CUST_ID = :item"
    const bindParams = [param.toString()]
    try {
      const payload = await execute(sql, bindParams)
      return payload.rows
    } catch (e) {
      throw new Error(`Error: Sql:${sql},bindParams:${bindParams} Error:` + e)
    }
  }

  async photo(param: string) {
    const sql: string =
      "SELECT TANBIN.BASE64ENCODE(ir.AC_IMG) IMG FROM AGENT_BANKING.IMAGE_REGINFO ir  WHERE ir.SL_NO = 1 and  AC_NO = :acno"
    const bindParams = [param]
    try {
      const payload = await lob(sql, bindParams)
      return payload
    } catch (e) {
      throw new Error(`Error: Sql:${sql},bindParams:${bindParams} Error:` + e)
    }
  }

  async imageData(param: string) {
    const sql: string =
      "SELECT id.SL_NO ,id.IMAGE_TYPE_ID, TANBIN.BASE64ENCODE(DATA) IMG FROM AGENT_BANKING.IMAGE_DATA id WHERE id.AC_NO = :accountNumber"
    const bindParams = [param]
    try {
      const payload = await lob(sql, bindParams)
      return payload
    } catch (e) {
      throw new Error(`Error: Sql:${sql},bindParams:${bindParams} Error:` + e)
    }
  }

  async search(param: string) {
    const sql: string = `SELECT c.CUST_ID,c.NAME,c.NID_NO,c.DOB,c.EMAIL,c.FATHER_NAME,c.MOTHER_NAME,c.SPOUSE_NAME,r.CON_MOB,c.REG_DATE,r.MPHONE,c.PMPHONE,r.REG_STATUS,r.STATUS,c.CUST_ID_TYPE  FROM AGENT_BANKING.CUSTIDINFO  c
       LEFT JOIN AGENT_BANKING.REGINFO r ON c.CUST_ID = r.CUST_ID
       WHERE    
       UPPER (c.NID_NO) LIKE UPPER (:item)
       OR UPPER (c.CON_MOB) LIKE UPPER (:item)
       OR UPPER (r.MPHONE) LIKE UPPER (:item)
       OR UPPER (r.CUST_ID) LIKE UPPER (:item)
       OR UPPER (c.NAME) LIKE UPPER (:item)
       FETCH FIRST 25 ROWS ONLY`
    const bindParams = [param]
    try {
      const payload = await execute(sql, bindParams)
      return payload.rows
    } catch (e) {
      throw new Error(`Error: Sql:${sql},bindParams:${bindParams} Error:` + e)
    }
  }
}
