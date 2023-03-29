import execute from "../../model/oracleClient"

export default class Report {
  async mis(startingDate: string) {
    const sql: string = `SELECT REG.NAME AS "AGENT",A.OFF_ADDR AS "ADDRESS", REG.REG_DATE AS "OPENDATE",     PREVIOUS_BALANCE.TOTAL + 1 AS "PREVIOUSNOOFACCOUNT", CURRNET_BALANCE.TOTAL + 1 AS "CURRENTNOOFACCOUNT",
           TANBIN.GETBALANCE (REG.MPHONE, TO_DATE(:startingDate, 'DD/MM/RRRR'))
         + COALESCE (PREVIOUS_BALANCE.AMT, 0)
             AS "PREVIOUSBALANCE",
           TANBIN.GETBALANCE (REG.MPHONE, TO_DATE(:startingDate, 'DD/MM/RRRR'))
         + COALESCE (CURRNET_BALANCE.AMT, 0)
             AS "CURRENTBALANCE",
         COALESCE (REMITTANCE_PREVIOUS_MONTH.TOTAL, 0)
             AS "PREVIOUSNOOFREMITTANCE",
         COALESCE (REMITTANCE_PREVIOUS_MONTH.AMT, 0)
             AS "PREVIOUSREMITTANCEAMOUNT",
         COALESCE (REMITTANCE_CURRENT_MONTH.TOTAL, 0)
             AS "CURRENTNOOFREMITTANCE",
         COALESCE (REMITTANCE_CURRENT_MONTH.AMT, 0)
             AS "CURRENTREMITTANCEAMOUNT",
         COALESCE (UP.TOTAL, 0)
             AS "PREVIOUSNOOFUTILITY",
         COALESCE (UP.AMT, 0)
             AS "PREVIOUSUTILITYAMOUNT",
         COALESCE (UC.TOTAL, 0)
             AS "CURRENTNOOFUTILITY",
         COALESCE (UC.AMT, 0)
             AS "CURRENTUTILITYAMOUNT",
         COALESCE (PRE_COM.COMMISSION, 0)
             AS "COMMISSIONPREVIOUSMONTH",
         COALESCE (COM.COMMISSION, 0)
             AS "COMMISSIONTHISMONTH"
    FROM AGENT_BANKING.REGINFO REG
         JOIN AGENT_BANKING.AGENT_INFO A ON REG.DIST_CODE = A.MPHONE
         -- Deposit Previous Month
         JOIN
         (  SELECT PMPHONE, COUNT (*) TOTAL, SUM (BALANCE) AMT
              FROM (SELECT MPHONE,
                           PMPHONE,
                           TANBIN.FUNC_GET_ACC_BALANCE (
                               MPHONE,
                               ADD_MONTHS (
                                   TRUNC (TO_DATE(:startingDate, 'DD/MM/RRRR'),
                                          'MONTH'),
                                   -1))    BALANCE
                      FROM AGENT_BANKING.REGINFO R
                           LEFT JOIN AGENT_BANKING.ACC_CLOSING C
                               ON     R.MPHONE = C.AC_NO
                                  AND C.STATUS = 'S'
                                  AND TRUNC (C.CREATE_DATE) <=
                                      ADD_MONTHS (
                                          TRUNC (TO_DATE(:startingDate, 'DD/MM/RRRR'),
                                                 'MONTH'),
                                          -1)
                     WHERE     TRUNC (REG_DATE) <=
                               ADD_MONTHS (
                                   TRUNC (TO_DATE(:startingDate, 'DD/MM/RRRR'),
                                          'MONTH'),
                                   -1)
                           AND REG_STATUS <> 'R'
                           AND CAT_ID <> 'D'
                           AND C.AC_NO IS NULL) PC
          GROUP BY PMPHONE) PREVIOUS_BALANCE
             ON REG.MPHONE = PREVIOUS_BALANCE.PMPHONE
         -- Deposit cURRENT Month
         JOIN
         (  SELECT PMPHONE, COUNT (*) AS TOTAL, SUM (BALANCE) AS AMT
              FROM (SELECT MPHONE,
                           PMPHONE,
                           TANBIN.GETBALANCE (R.MPHONE,
                                              TO_DATE(:startingDate, 'DD/MM/RRRR'))    AS BALANCE
                      FROM AGENT_BANKING.REGINFO R
                     WHERE     TRUNC (REG_DATE) <= TO_DATE ( :startingDate, 'DD/MM/RRRR')
                           AND REG_STATUS <> 'R'
                           AND CAT_ID <> 'REG'
                           AND R.MPHONE NOT IN
                                   (SELECT AC_NO
                                      FROM AGENT_BANKING.ACC_CLOSING
                                     WHERE     STATUS = 'S'
                                           AND TRUNC (CREATE_DATE) <=
                                               TO_DATE ( :startingDate, 'DD/MM/RRRR')))
          GROUP BY PMPHONE) CURRNET_BALANCE
             ON REG.MPHONE = CURRNET_BALANCE.PMPHONE
         /* --------------------------

                                Remittance

                    ------------------------------ */
         -- Remittance Previous Month
         LEFT JOIN
         (  SELECT REC_AGENT_ACC, COUNT (*) AS TOTAL, SUM (SEN_REM_AMT) AS AMT
              FROM AGENT_BANKING.REMITTANCE_INFO R
             WHERE     STATUS = 'A'
                   AND TRUNC (ENTRY_DATE) BETWEEN TRUNC (
                                                      ADD_MONTHS (
                                                          TRUNC (
                                                              TO_DATE (
                                                                  :startingDate,
                                                                  'DD/MM/RRRR'),
                                                              'MM'),
                                                          -1),
                                                      'MM')
                                              AND LAST_DAY (
                                                      ADD_MONTHS (
                                                          TRUNC (
                                                              TO_DATE (
                                                                  :startingDate,
                                                                  'DD/MM/RRRR'),
                                                              'MM'),
                                                          -1))
          GROUP BY REC_AGENT_ACC) REMITTANCE_PREVIOUS_MONTH
             -- << REMITTANCE PREVIOUS
             ON REG.MPHONE = REMITTANCE_PREVIOUS_MONTH.REC_AGENT_ACC
         -- Remittance Current Month
         LEFT JOIN
         (  SELECT REC_AGENT_ACC, COUNT (*) AS TOTAL, SUM (SEN_REM_AMT) AS AMT
              FROM AGENT_BANKING.REMITTANCE_INFO R
             WHERE     STATUS = 'A'
                   AND TRUNC (ENTRY_DATE) BETWEEN TRUNC (
                                                      TO_DATE(:startingDate,
                                                               'DD/MM/RRRR'),
                                                      'YEAR')
                                              AND TO_DATE(:startingDate, 'DD/MM/RRRR')
          GROUP BY REC_AGENT_ACC) REMITTANCE_CURRENT_MONTH
             -- << REMITTANCE CURRENT
             ON REG.MPHONE = REMITTANCE_CURRENT_MONTH.REC_AGENT_ACC
         /* --------------------------

                                Utility

                    ------------------------------ */
         -- Utility Previous Month
         LEFT JOIN
         (  SELECT ENTRY_BY, COUNT (*) TOTAL, SUM (TRANS_AMT) AMT
              FROM AGENT_BANKING.UTILITY_PAYMENT_INFO
             WHERE     STATUS = 'S'
                   AND TRUNC (ENTRY_DATE) BETWEEN TRUNC (
                                                      ADD_MONTHS (
                                                          TRUNC(
                                                              TO_DATE (
                                                                  :startingDate,
                                                                  'DD/MM/RRRR'),
                                                              'MM'),
                                                          -1),
                                                      'MM')
                                              AND LAST_DAY (
                                                      ADD_MONTHS (
                                                          TRUNC (
                                                              TO_DATE (
                                                                  :startingDate,
                                                                  'DD/MM/RRRR'),
                                                              'MM'),
                                                          -1))
          GROUP BY ENTRY_BY) UP
             ON REG.MPHONE = UP.ENTRY_BY
         -- Utility Current Month
         LEFT JOIN
         (  SELECT ENTRY_BY, COUNT (*) TOTAL, SUM (TRANS_AMT) AMT
              FROM AGENT_BANKING.UTILITY_PAYMENT_INFO
             WHERE     STATUS = 'S'
                   AND TRUNC (ENTRY_DATE) BETWEEN TO_DATE (
                                                      TRUNC (
                                                          TO_DATE ( :startingDate,
                                                                   'DD/MM/RRRR'),
                                                          'YEAR'),
                                                      'DD/MM/RRRR')
                                              AND TO_DATE ( :startingDate, 'DD/MM/RRRR')
          GROUP BY ENTRY_BY) UC
             ON REG.MPHONE = UC.ENTRY_BY
         -- COMMISSION previous Month
         LEFT JOIN
         (  SELECT TRANS_TO, ROUND (SUM (PAY_AMT), 2) COMMISSION
              FROM AGENT_BANKING.GL_TRANS_MST_OLD D
             WHERE     TRUNC (ENTRY_DATE) BETWEEN TRUNC (
                                                      ADD_MONTHS (
                                                          TRUNC (
                                                              TO_DATE (
                                                                  :startingDate,
                                                                  'DD/MM/RRRR'),
                                                              'MM'),
                                                          -1),
                                                      'MM')
                                              AND LAST_DAY (
                                                      ADD_MONTHS (
                                                          TRUNC (
                                                              TO_DATE (
                                                                  :startingDate,
                                                                  'DD/MM/RRRR'),
                                                              'MM'),
                                                          -1))
                   AND HOTKEY IN ('COMMISSION', 'FLOAT_SHARES')
          GROUP BY TRANS_TO) PRE_COM
             ON REG.MPHONE = PRE_COM.TRANS_TO
         -- COMMISSION Current Month
         LEFT JOIN
         (  SELECT TRANS_TO, ROUND (SUM (PAY_AMT), 2) COMMISSION
              FROM AGENT_BANKING.GL_TRANS_MST_OLD D
             WHERE     TRUNC (ENTRY_DATE) BETWEEN TO_DATE (
                                                      TRUNC (
                                                          TO_DATE ( :startingDate,
                                                                   'DD/MM/RRRR'),
                                                          'YEAR'),
                                                      'DD/MM/RRRR')
                                              AND TO_DATE ( :startingDate, 'DD/MM/RRRR')
                   AND HOTKEY IN ('COMMISSION', 'FLOAT_SHARES')
          GROUP BY TRANS_TO) COM
             ON     REG.MPHONE = COM.TRANS_TO
                AND TRUNC (REG.REG_DATE) <= TO_DATE ( :startingDate, 'DD/MM/RRRR')
ORDER BY REG.MPHONE`
    const bindParams = [startingDate.toString()]

    const payload = await execute(sql, bindParams)
    return payload.rows
  }
}
