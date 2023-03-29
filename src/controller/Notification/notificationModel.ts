import execute from "../../model/oracleClient"

export default class customer {
  async get(param: string) {
    const sql: string =
      "SELECT *  FROM AGENT_BANKING.CUSTIDINFO  c  LEFT JOIN AGENT_BANKING.REGINFO r ON c.CUST_ID = r.CUST_ID  WHERE    c.NID_NO = :item OR c.CON_MOB = :item OR r.MPHONE = :item OR r.CUST_ID = :item"
    const bindParams = [param.toString()]

    const payload = await execute(sql, bindParams)
    return payload.rows
  }
  async search(param: string) {
    const sql: string = `SELECT c.CUST_ID,c.NAME,c.NID_NO,c.DOB,c.EMAIL,c.FATHER_NAME,c.MOTHER_NAME,c.POUSE_NAME,r.CON_MOB,c.REG_DATE,r.MPHONE,c.PMPHONE,r.REG_STATUS,r.STATUS,c.CUST_ID_TYPE  FROM AGENT_BANKING.CUSTIDINFO  c
       LEFT JOIN AGENT_BANKING.REGINFO r ON c.CUST_ID = r.CUST_ID
       WHERE    
       UPPER (c.NID_NO) LIKE UPPER (%:item%)
       OR UPPER (c.CON_MOB) LIKE UPPER (%:item%)
       OR UPPER (r.MPHONE) LIKE UPPER (%:item%)
       OR UPPER (r.CUST_ID) LIKE UPPER (%:item%)
       OR UPPER (c.NAME) LIKE UPPER (%:item%)`
    const bindParams = [param.toString()]
    const payload = await execute(sql, bindParams)
    return payload.rows
  }
}
