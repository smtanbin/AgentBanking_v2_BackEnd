WITH ALL_HOURS (HOUR) AS (
    SELECT
        TO_CHAR(TO_DATE('10:00',
        'HH24:MI'),
        'HH24') + LEVEL - 1
    FROM
        DUAL
    CONNECT BY
        LEVEL <= TO_CHAR(TO_DATE('18:00',
        'HH24:MI'),
        'HH24') - TO_CHAR(TO_DATE('10:00',
        'HH24:MI'),
        'HH24') + 1
)
SELECT
    ALL_HOURS.HOUR AS HOUR,
    NVL(SUM(DT.DR_AMT),
    0)             AS DR,
    NVL(SUM(DT.CR_AMT),
    0)             AS CR
FROM
    ALL_HOURS
    LEFT JOIN (
        SELECT
            BALANCE_MPHONE,
            CR_AMT,
            DR_AMT,
            TO_NUMBER(TO_CHAR(TRANS_DATE,
            'HH24')) AS CURRENT_HOUR
        FROM
            AGENT_BANKING.GL_TRANS_DTL_OLD
        WHERE
            BALANCE_MPHONE IS NOT NULL
            AND TRANS_DATE >= TRUNC((
                SELECT
                    TRANS_DATE
                FROM
                    (
                        SELECT
                            TRANS_DATE
                        FROM
                            AGENT_BANKING.GL_TRANS_DTL_OLD
                        WHERE
                            TRUNC(TRANS_DATE) != TRUNC(SYSDATE)
                        ORDER BY
                            TRANS_DATE DESC
                    )
                WHERE
                    ROWNUM = 1
            ))
    ) DT
    ON ALL_HOURS.HOUR = DT.CURRENT_HOUR
GROUP BY
    ALL_HOURS.HOUR
ORDER BY
    ALL_HOURS.HOUR