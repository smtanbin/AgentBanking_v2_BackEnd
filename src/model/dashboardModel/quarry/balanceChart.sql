SELECT
    ROUND (SUM (R.BALANCE_M),
    2)                                BALANCE,
    (
    SELECT
        P.ACC_TYPE_SHORT_NAME
    FROM
        AGENT_BANKING.PRODUCT_SETUP P
    WHERE
        P.ACC_TYPE_CODE = R.AC_TYPE_CODE) TYPE
    FROM
        AGENT_BANKING.REGINFO R
    GROUP BY
        AC_TYPE_CODE
    ORDER BY
        BALANCE