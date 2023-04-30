WITH ALL_HOURS (HOUR) AS (
  SELECT
    TO_CHAR(TO_DATE('09:00',
    'HH24:MI'),
    'HH24') + LEVEL - 1
  FROM
    DUAL
  CONNECT BY
    LEVEL <= TO_CHAR(TO_DATE('18:00',
    'HH24:MI'),
    'HH24') - TO_CHAR(TO_DATE('09:00',
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
      AGENT_BANKING.GL_TRANS_DTL
    WHERE
      BALANCE_MPHONE IS NOT NULL
      AND TRANS_DATE >= TRUNC(SYSDATE)
  ) DT
  ON ALL_HOURS.HOUR = DT.CURRENT_HOUR
GROUP BY
  ALL_HOURS.HOUR
ORDER BY
  ALL_HOURS.HOUR