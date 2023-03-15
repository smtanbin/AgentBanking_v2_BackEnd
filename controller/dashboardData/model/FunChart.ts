import execute from "../../../model/oracleClient"

export default class ChartsData {
  async TotalDebitCreditCurrent() {
    try {
      const count: any = await execute(
        "SELECT count(*) AS COUNT FROM AGENT_BANKING.GL_TRANS_DTL"
      )

      let sql: any = null

      if (count.rows[0].COUNT > 0) {
        sql = `WITH all_hours (hour) AS (
  SELECT TO_CHAR(TO_DATE('09:00', 'HH24:MI'), 'HH24') + LEVEL - 1
  FROM DUAL
  CONNECT BY LEVEL <= TO_CHAR(TO_DATE('18:00', 'HH24:MI'), 'HH24') - TO_CHAR(TO_DATE('09:00', 'HH24:MI'), 'HH24') + 1
)
SELECT all_hours.hour AS HOUR, NVL(SUM(dt.DR_AMT), 0) AS DR, NVL(SUM(dt.CR_AMT), 0) AS CR
FROM all_hours
LEFT JOIN (
  SELECT BALANCE_MPHONE, CR_AMT, DR_AMT, TO_NUMBER(TO_CHAR(TRANS_DATE, 'HH24')) AS CURRENT_HOUR
 FROM AGENT_BANKING.GL_TRANS_DTL
  WHERE BALANCE_MPHONE IS NOT NULL AND TRANS_DATE >= TRUNC(SYSDATE)
) dt ON all_hours.hour = dt.CURRENT_HOUR
GROUP BY all_hours.hour
ORDER BY all_hours.hour`
      } else {
        sql = `WITH all_hours (hour) AS (
  SELECT TO_CHAR(TO_DATE('09:00', 'HH24:MI'), 'HH24') + LEVEL - 1
  FROM DUAL
  CONNECT BY LEVEL <= TO_CHAR(TO_DATE('18:00', 'HH24:MI'), 'HH24') - TO_CHAR(TO_DATE('09:00', 'HH24:MI'), 'HH24') + 1
)
SELECT all_hours.hour AS HOUR, NVL(SUM(dt.DR_AMT), 0) AS DR, NVL(SUM(dt.CR_AMT), 0) AS CR
FROM all_hours
LEFT JOIN (
  SELECT BALANCE_MPHONE, CR_AMT, DR_AMT, TO_NUMBER(TO_CHAR(TRANS_DATE, 'HH24')) AS CURRENT_HOUR
  FROM AGENT_BANKING.GL_TRANS_DTL_OLD
  WHERE BALANCE_MPHONE IS NOT NULL AND TRANS_DATE >= TRUNC(SYSDATE)
) dt ON all_hours.hour = dt.CURRENT_HOUR
GROUP BY all_hours.hour
ORDER BY all_hours.hour`
      }
      const bindParams: never[] = []
      const payload = await execute(sql, bindParams)
      return payload.rows
    } catch (e) {
      console.log(e)
    }
  }
  async TotalDebitCreditPrevious() {
    const sql: string = `WITH all_hours (hour) AS (
  SELECT TO_CHAR(TO_DATE('09:00', 'HH24:MI'), 'HH24') + LEVEL - 1
  FROM DUAL
  CONNECT BY LEVEL <= TO_CHAR(TO_DATE('18:00', 'HH24:MI'), 'HH24') - TO_CHAR(TO_DATE('09:00', 'HH24:MI'), 'HH24') + 1
)
SELECT all_hours.hour AS HOUR, NVL(SUM(dt.DR_AMT), 0) AS DR, NVL(SUM(dt.CR_AMT), 0) AS CR
FROM all_hours
LEFT JOIN (
  SELECT BALANCE_MPHONE, CR_AMT, DR_AMT, TO_NUMBER(TO_CHAR(TRANS_DATE, 'HH24')) AS CURRENT_HOUR
  FROM AGENT_BANKING.GL_TRANS_DTL_OLD
  WHERE BALANCE_MPHONE IS NOT NULL AND TRANS_DATE >= TRUNC((SELECT TRANS_DATE FROM (SELECT TRANS_DATE FROM AGENT_BANKING.GL_TRANS_DTL_OLD WHERE TRUNC(TRANS_DATE) != TRUNC(SYSDATE) ORDER BY TRANS_DATE DESC) WHERE ROWNUM = 1))
) dt ON all_hours.hour = dt.CURRENT_HOUR
GROUP BY all_hours.hour
ORDER BY all_hours.hour`

    const bindParams: never[] = []
    const payload = await execute(sql, bindParams)
    return payload.rows
  }
  async balanceChart() {
    const sql: string = `SELECT ROUND (SUM (R.BALANCE_M), 2) BALANCE, (SELECT P.ACC_TYPE_SHORT_NAME  FROM AGENT_BANKING.PRODUCT_SETUP P WHERE P.ACC_TYPE_CODE = R.AC_TYPE_CODE) TYPE FROM AGENT_BANKING.REGINFO R GROUP BY AC_TYPE_CODE ORDER BY BALANCE`
    const bindParams: never[] = []
    const payload = await execute(sql, bindParams)
    return payload.rows
  }
}
