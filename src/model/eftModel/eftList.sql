/* Formatted on 10/31/2022 3:43:44 PM (QP5 v5.381) */
SELECT
    ACTNUM        "ACTNUM",
 /* (CASE
              WHEN SUBSTR (ACTNUM, 0, 3) = 001 THEN SUBSTR (ACTNUM, 3, 13)
              WHEN SUBSTR (ACTNUM, 0, 3) != 001 THEN ACTNUM
          END)                         "ACTNUM", */
    NVL(INDIVIDUALNAME,
    RECEIVERNAME) RECIVER,
    HONOURED,
    NVL ( (
    SELECT
        R.ACCOUNT_NAME
    FROM
        AGENT_BANKING.REGINFO R
    WHERE
        R.STATUS != 'C'
        AND R.REG_STATUS != 'R'
        AND MPHONE = (
            CASE
                WHEN SUBSTR (ACTNUM, 0, 3) = 001 THEN
                    SUBSTR (ACTNUM, 3, 13)
                WHEN SUBSTR (ACTNUM, 0, 3) != 001 THEN
                    ACTNUM
            END)),
        'NOT FOUND') "ABS_AC_TITEL",
        AMOUNT "AMOUNT",
        NVL ((
            SELECT
                BANKNM
            FROM
                BEFTN.EFT_BANK@SBL_DBL_IT
            WHERE
                ROUTECODE = ORBANKRT
        ),
        NVL ((
            SELECT
                BANK
            FROM
                TANBIN.BANK_ROUTING
            WHERE
                ROUTING_NO = ORBANKRT
                    || ORBANKCHECKDG
        ),
        NVL ((
            SELECT
                BANK
            FROM
                TANBIN.BANK_ROUTING
            WHERE
                ROUTING_NO = ORBANKRT
        ),
        ORBANKRT))) "ORIG_BANK_NAME",
        NVL ((
            SELECT
                BRNNAM
            FROM
                BEFTN.EFT_BRANCH@SBL_DBL_IT
            WHERE
                ROUTNO = ORBANKRT
        ),
        NVL ((
            SELECT
                BRANCH
            FROM
                TANBIN.BANK_ROUTING
            WHERE
                ROUTING_NO = ORBANKRT
                    || ORBANKCHECKDG
        ),
        ORBANKRT)) "ORIG_BRANCH_NAME",
        COMPANYNAME "SENDER",
        PAYMENTINFO "NOTE"
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
        ACTNUM ASC