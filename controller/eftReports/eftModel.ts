import execute from "../../model/oracleClient"

export default class eftReportModel {
  async sum() {
    const sql: string = `SELECT AC_TYPE_CODE "TYPE", HONOURED, COUNT (ACTNUM) "COUNT",SUM (AMOUNT) "SUM"
    FROM (  SELECT (CASE
                        WHEN SUBSTR (ACTNUM, 0, 3) = 001
                        THEN
                            SUBSTR (ACTNUM, 3, 13)
                        WHEN SUBSTR (ACTNUM, 0, 3) != 001
                        THEN
                            ACTNUM
                    END)             "ACTNUM",
                   HONOURED,
                   (SELECT (SELECT P.ACC_TYPE_SHORT_NAME
                              FROM AGENT_BANKING.PRODUCT_SETUP P
                             WHERE P.ACC_TYPE_CODE = R1.AC_TYPE_CODE)
                      FROM AGENT_BANKING.REGINFO R1
                     WHERE MPHONE =
                           (CASE
                                WHEN SUBSTR (ACTNUM, 0, 3) = 001
                                THEN
                                    SUBSTR (ACTNUM, 3, 13)
                                WHEN SUBSTR (ACTNUM, 0, 3) != 001
                                THEN
                                    ACTNUM
                            END))    AC_TYPE_CODE,
                   AMOUNT            "AMOUNT"
              FROM BEFTN.BEFTN_PROCESS_INFO@SBL_DBL_IT
             WHERE     LTRIM (ACTNUM, '0') LIKE '108%'
AND TRUNC (SETTLEDATE) = TRUNC (SYSDATE)
                   AND SESSION_NO =
                       (CASE
                            WHEN TO_CHAR (SYSDATE, 'HH24') < 14 THEN 2
                            ELSE 1
                        END)
                   AND RETURNED IS NULL
                 --  AND SYS_NO NOT IN
                  --         (SELECT SYS_NO
                  --            FROM AGENT_BANKING.BEFTN_PROCESS_INFO_IN
                  --           WHERE     TRUNC (TIMSTAMP) = TRUNC (SYSDATE)
                  --                 AND CHK_STATUS IS NULL
                   --                AND NVL (SUB_TRTYPE, 'ICE') <> 'IRE')
                   AND (CASE
                            WHEN SUBSTR (ACTNUM, 0, 3) = 001
                            THEN
                                SUBSTR (ACTNUM, 3, 13)
                            WHEN SUBSTR (ACTNUM, 0, 3) != 001
                            THEN
                                ACTNUM
                        END) IN
                           (SELECT MPHONE
                              FROM AGENT_BANKING.REGINFO R
                             WHERE R.REG_STATUS != 'R' AND STATUS != 'C')
          ORDER BY ACTNUM ASC)
GROUP BY AC_TYPE_CODE, HONOURED`
    const payload = await execute(sql)
    return payload.rows
  }
  async list() {
    const sql: string = `/* Formatted on 10/31/2022 3:43:44 PM (QP5 v5.381) */
  SELECT ACTNUM  "ACTNUM",

  /* (CASE
              WHEN SUBSTR (ACTNUM, 0, 3) = 001 THEN SUBSTR (ACTNUM, 3, 13)
              WHEN SUBSTR (ACTNUM, 0, 3) != 001 THEN ACTNUM
          END)                         "ACTNUM", */
         nvl(INDIVIDUALNAME,RECEIVERNAME)                  RECIVER,
           HONOURED,
         NVL (
             (SELECT R.ACCOUNT_NAME
                FROM AGENT_BANKING.REGINFO R
               WHERE     R.STATUS != 'C'
                     AND R.REG_STATUS != 'R'
                     AND MPHONE =
                         (CASE
                              WHEN SUBSTR (ACTNUM, 0, 3) = 001
                              THEN
                                  SUBSTR (ACTNUM, 3, 13)
                              WHEN SUBSTR (ACTNUM, 0, 3) != 001
                              THEN
                                  ACTNUM
                          END)),
             'NOT FOUND')              "ABS_AC_TITEL",
         AMOUNT                        "AMOUNT",
         NVL ((SELECT BANKNM
                 FROM BEFTN.EFT_BANK@SBL_DBL_IT
                WHERE ROUTECODE = ORBANKRT),
              NVL ((SELECT BANK
                      FROM TANBIN.BANK_ROUTING
                     WHERE ROUTING_NO = ORBANKRT || ORBANKCHECKDG),NVL ((SELECT BANK
                           FROM TANBIN.BANK_ROUTING
                          WHERE ROUTING_NO = ORBANKRT),
                        ORBANKRT)))    "ORIG_BANK_NAME",
         NVL ((SELECT BRNNAM
                 FROM BEFTN.EFT_branch@SBL_DBL_IT
                WHERE ROUTNO = ORBANKRT),
              NVL ((SELECT BRANCH
                      FROM TANBIN.BANK_ROUTING
                     WHERE ROUTING_NO = ORBANKRT || ORBANKCHECKDG),
                   ORBANKRT))          "ORIG_BRANCH_NAME",
         COMPANYNAME                   "SENDER",
         PAYMENTINFO                   "NOTE"
    FROM BEFTN.BEFTN_PROCESS_INFO@SBL_DBL_IT
   WHERE     LTRIM (ACTNUM, '0') LIKE '108%'
         AND TRUNC (SETTLEDATE) = TRUNC (SYSDATE)
         AND SESSION_NO =
             (CASE WHEN TO_CHAR (SYSDATE, 'HH24') < 14 THEN 2 ELSE 1 END)
         AND RETURNED IS NULL
         AND (CASE
                  WHEN SUBSTR (ACTNUM, 0, 3) = 001 THEN SUBSTR (ACTNUM, 3, 13)
                  WHEN SUBSTR (ACTNUM, 0, 3) != 001 THEN ACTNUM
              END) IN
                 (SELECT MPHONE
                    FROM AGENT_BANKING.REGINFO R
                   WHERE R.REG_STATUS != 'R' AND STATUS != 'C')
ORDER BY ACTNUM ASC`
    const payload = await execute(sql)
    return payload.rows
  }
  async return() {
    const sql: string = `/* Formatted on 11/15/2022 11:34:47 AM (QP5 v5.381) */
SELECT (CASE
            WHEN SUBSTR (ACTNUM, 0, 3) = 001 THEN SUBSTR (ACTNUM, 3, 13)
            WHEN SUBSTR (ACTNUM, 0, 3) != 001 THEN ACTNUM
        END)                         "ACTNUM",
       --         nvl(INDIVIDUALNAME,RECEIVERNAME)                  RECIVER,ORBANKCHECKDG
       RECEIVERNAME RECIVER,
       HONOURED,
       NVL (
           (SELECT R.ACCOUNT_NAME
              FROM AGENT_BANKING.REGINFO R
             WHERE     R.STATUS != 'C'
                   AND R.REG_STATUS != 'R'
                   AND MPHONE =
                       (CASE
                            WHEN SUBSTR (ACTNUM, 0, 3) = 001
                            THEN
                                SUBSTR (ACTNUM, 3, 13)
                            WHEN SUBSTR (ACTNUM, 0, 3) != 001
                            THEN
                                ACTNUM
                        END)),
           'NOT FOUND')              "ABS_AC_TITEL",
       AMOUNT                        "AMOUNT",
       NVL ((SELECT BANKNM
               FROM BEFTN.EFT_BANK@SBL_DBL_IT
              WHERE ROUTECODE = ORBANKRT),
            NVL ((SELECT BANK FROM TANBIN.BANK_ROUTING
                   WHERE ROUTING_NO = ORBANKRT || ORBANKCHECKDG),
                 NVL ((SELECT BANK
                         FROM TANBIN.BANK_ROUTING
                        WHERE ROUTING_NO = ORBANKRT),
                      ORBANKRT)))    "ORIG_BANK_NAME",
       NVL ((SELECT BRNNAM
               FROM BEFTN.EFT_BRANCH@SBL_DBL_IT
              WHERE ROUTNO = ORBANKRT),
            NVL ((SELECT BRANCH
                    FROM TANBIN.BANK_ROUTING
                   WHERE ROUTING_NO = ORBANKRT || ORBANKCHECKDG),
                 ORBANKRT))          "ORIG_BRANCH_NAME"
  FROM (SELECT COMPLETE,
               CBS_STATUS,
               HONOURED,
               ST_DOCNUM,
               ADRINDICATOR,
               B.STATUS,
               COMPANYDESCDATE,
               ORBANKRT,
               ORBANKCHECKDG,
               REBANKRT,
               REBANKCHECKDG,
               FILEID,
               ADDENDATYPECODE,
               PBM_BATCH_NO,
               REASON_ID,
               RETURN_AMOUNT,
               SUB_TRTYPE,
               RETURNED,
               ADDENDAINFORMATION,
               ORIGINALTRACENUMBER,
               ENTRYADDENDACOUNT,
 B.REF_SYS_NO,
               B.SYS_NO,
               AMOUNT,
               E.TRANS_FROM                           ACTNUM,
               DFIACCOUNTNUM,
               TRACENUMBER,
               NVL (INDIVIDUALNAME, RECEIVERNAME)     RECEIVERNAME,
               TIMSTAMP
          FROM AGENT_BANKING.EFT_INFO               E,
               BEFTN.BEFTN_PROCESS_INFO@SBL_DBL_IT  B
         WHERE     TRUNC (B.SETTLEDATE) = TRUNC (SYSDATE)
               AND B.TRTYPE = 'OCE'
               AND B.SUB_TRTYPE = 'IRE'
                          AND b.st_docnum IS NULL
               AND B.REF_SYS_NO = E.SYS_NO
        MINUS
        SELECT COMPLETE,
               CBS_STATUS,
               HONOURED,
               ST_DOCNUM,
               ADRINDICATOR,
               B.STATUS,
               COMPANYDESCDATE,
               ORBANKRT,
               ORBANKCHECKDG,
               REBANKRT,
               REBANKCHECKDG,
               FILEID,
               ADDENDATYPECODE,
               PBM_BATCH_NO,
               REASON_ID,
               RETURN_AMOUNT,
               SUB_TRTYPE,
               RETURNED,
ADDENDAINFORMATION,
               ORIGINALTRACENUMBER,
               ENTRYADDENDACOUNT,
               B.REF_SYS_NO,
               B.SYS_NO,
               AMOUNT,
               ACTNUM,
               DFIACCOUNTNUM,
               TRACENUMBER,
               NVL (INDIVIDUALNAME, RECEIVERNAME)     RECEIVERNAME,
               TIMSTAMP
          FROM AGENT_BANKING.BEFTN_PROCESS_INFO_IN B
         WHERE CHK_STATUS IS NULL AND SUB_TRTYPE = 'IRE')`
    const payload = await execute(sql)
    return payload.rows
  }
}
