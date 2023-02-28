import execute from "../../model/oracleClient"

export default class customer {
  async get(param: string) {
    const sql: string =
      "SELECT *  FROM AGENT_BANKING.CUSTIDINFO  c  LEFT JOIN AGENT_BANKING.REGINFO r ON c.CUST_ID = r.CUST_ID  WHERE    c.NID_NO = :item OR c.CON_MOB = :item OR r.MPHONE = :item OR r.CUST_ID = :item"
    const bindParams = [param.toString()]

    const payload = await execute(sql, bindParams)
    return payload.rows
  }
}
