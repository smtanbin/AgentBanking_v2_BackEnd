/* Formatted on 4/4/2023 4:31:05 PM (QP5 v5.381) */
SELECT
    (
    SELECT
        ROUND (SUM (BALANCE),
        2)
    FROM
        AGENT_BANKING.DAILY_BALANCE_BAPPY_NEW
    WHERE
        TRUNC (BALANCE_DATE) = TRUNC ((
            SELECT
                BALANCE_DATE
            FROM
                AGENT_BANKING.DAILY_BALANCE_BAPPY_NEW
            GROUP BY
                BALANCE_DATE
            ORDER BY
                BALANCE_DATE DESC FETCH FIRST 1 ROWS ONLY
        ))) LAST_DAY_BALANCE,
        (
            SELECT
                ROUND (SUM (BALANCE_M),
                2)
            FROM
                AGENT_BANKING.REGINFO
        ) CURRENT_BALANCE
    FROM
        DUAL