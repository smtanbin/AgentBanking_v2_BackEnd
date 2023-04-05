SELECT
    AC_TYPE_CODE   "TYPE",
    HONOURED,
    COUNT (ACTNUM) "COUNT",
    SUM (AMOUNT)   "SUM"
FROM
    (
        SELECT
            (CASE
                WHEN SUBSTR (ACTNUM, 0, 3) = 001 THEN
                    SUBSTR (ACTNUM, 3, 13)
                WHEN SUBSTR (ACTNUM, 0, 3) != 001 THEN
                    ACTNUM
            END)   "ACTNUM",
            HONOURED,
            (
            SELECT
                (
                SELECT
                    P.ACC_TYPE_SHORT_NAME
                FROM
                    AGENT_BANKING.PRODUCT_SETUP P
                WHERE
                    P.ACC_TYPE_CODE = R1.AC_TYPE_CODE)
                FROM
                    AGENT_BANKING.REGINFO       R1
                WHERE
                    MPHONE = (
                        CASE
                            WHEN SUBSTR (ACTNUM, 0, 3) = 001 THEN
                                SUBSTR (ACTNUM, 3, 13)
                            WHEN SUBSTR (ACTNUM, 0, 3) != 001 THEN
                                ACTNUM
                        END)) AC_TYPE_CODE,
                    AMOUNT "AMOUNT"
                FROM
                    BEFTN.BEFTN_PROCESS_INFO@SBL_DBL_IT
                WHERE
                    LTRIM (ACTNUM,
                    '0') LIKE '108%'
                    AND TRUNC (SETTLEDATE) = TRUNC (SYSDATE)
                    AND SESSION_NO = (
                        CASE
                            WHEN TO_CHAR (SYSDATE, 'HH24') < 14 THEN
                                2
                            ELSE
                                1
                        END)
                    AND RETURNED IS NULL
 --  AND SYS_NO NOT IN
 --         (SELECT SYS_NO
 --            FROM AGENT_BANKING.BEFTN_PROCESS_INFO_IN
 --           WHERE     TRUNC (TIMSTAMP) = TRUNC (SYSDATE)
 --                 AND CHK_STATUS IS NULL
 --                AND NVL (SUB_TRTYPE, 'ICE') <> 'IRE')
                    AND (
                        CASE
                            WHEN SUBSTR (ACTNUM, 0, 3) = 001 THEN
                                SUBSTR (ACTNUM, 3, 13)
                            WHEN SUBSTR (ACTNUM, 0, 3) != 001 THEN
                                ACTNUM
                        END) IN (
                        SELECT
                            MPHONE
                        FROM
                            AGENT_BANKING.REGINFO R
                        WHERE
                            R.REG_STATUS != 'R'
                            AND STATUS != 'C'
                    )
                ORDER BY
                    ACTNUM
    )
GROUP BY
    AC_TYPE_CODE,
    HONOURED