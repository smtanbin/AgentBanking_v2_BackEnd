/* Formatted on 4/4/2023 12:53:23 PM (QP5 v5.381) */
SELECT
    MPHONE,
 /* Agent name only*/
 --       NVL ((SELECT NAME
 --               FROM AGENT_BANKING.REGINFO
 --              WHERE MPHONE = R.PMPHONE),
 --            (SELECT NAME
 --               FROM AGENT_BANKING.REGINFO
 --              WHERE MPHONE = R.MPHONE))
 --           PMPHONE,

 /* Agent no only*/
    NVL (PMPHONE,
    MPHONE)                           PMPHONE,
    ACCOUNT_NAME,
    (
    SELECT
        P.ACC_TYPE_NAME
    FROM
        AGENT_BANKING.PRODUCT_SETUP P
    WHERE
        P.ACC_TYPE_CODE = R.AC_TYPE_CODE) TYPE,
        (
            SELECT
                ST.NAME
            FROM
                AGENT_BANKING.AC_STATUS ST
            WHERE
                ST.S_NAME = R.STATUS
        ) STATUS,
        TO_CHAR (REG_DATE,
        'MONTH dd, YYYY') REG_DATE,
        TO_CHAR (R.EMAIL) EMAIL,
        ROUND ((FUNC_GET_ACC_BALANCE (R.MPHONE,
        (TO_DATE ( :TODATE) - 1))),
        2) BALANCE,
        TO_CHAR (MATURITY_DATE,
        'MONTH dd, YYYY') MATURITY_DATE,
        CUST_ID,
        CON_MOB,
        PRE_VILLAGE
            || ', '
            || PRE_ROAD
            || ', '
            || PRE_POST
            || ', '
            || (
            SELECT
                NAME || ', ' || (
                SELECT
                    NAME || ', ' || (
                    SELECT
                        NAME || ', ' || (
                        SELECT
                            NAME
                        FROM
                            AGENT_BANKING.DISTHANA
                        WHERE
                            CODE = F.PARENT)
                        FROM
                            AGENT_BANKING.DISTHANA F
                        WHERE
                            CODE = E.PARENT)
                        FROM
                            AGENT_BANKING.DISTHANA E
                        WHERE
                            CODE = D.PARENT)
                        FROM
                            AGENT_BANKING.DISTHANA D
                        WHERE
                            CODE = (
                                SELECT
                                    SUBSTR (LOCATION_CODE,
                                    0,
                                    6)
                                FROM
                                    AGENT_BANKING.REGINFO
                                WHERE
                                    MPHONE = R.MPHONE
                            )
        ) ADDR
    FROM
        AGENT_BANKING.REGINFO R
    WHERE
        MPHONE = :MPHONE