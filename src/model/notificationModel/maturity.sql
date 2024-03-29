SELECT
    MPHONE,
    'DEMAND'    ID,
    'MATURE'    MODEL
FROM
    AGENT_BANKING.REGINFO R
WHERE
    AC_TYPE_CODE = 4
    AND REG_STATUS = 'P'
    AND STATUS <> 'C'
    AND NVL (RENWAL_PRINCIPLE,
    'N') <> 'Y'
    AND NVL (RENWL_WIT,
    'N') <> 'Y'
    AND R.MATURITY_DATE <= TRUNC (SYSDATE) UNION ALL
    SELECT
        MPHONE,
        'DEMAND'    ID,
        'MATURE'    MODEL
    FROM
        AGENT_BANKING.REGINFO R
    WHERE
        AC_TYPE_CODE = 4
        AND REG_STATUS = 'P'
        AND STATUS <> 'C'
        AND NVL (RENWAL_PRINCIPLE,
        'N') = 'N'
        AND NVL (RENWL_WIT,
        'N') = 'Y'
        AND NVL (MATURITY_AMT,
        0) > 5000000
        AND R.MATURITY_DATE <= TRUNC (SYSDATE) UNION ALL
        SELECT
            MPHONE,
            'RECURRING' ID,
            'MATURE'    MODEL
        FROM
            AGENT_BANKING.REGINFO R
        WHERE
            AC_TYPE_CODE IN (
                SELECT
                    ACC_TYPE_CODE
                FROM
                    AGENT_BANKING.PRODUCT_SETUP
                WHERE
                    MODULE_TYPE_CODE = 20
            )
            AND REG_STATUS = 'P'
            AND STATUS NOT IN ('F',
            'C')
            AND R.MATURITY_DATE <= SYSDATE