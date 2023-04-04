WITH all_hours (hour) AS (
  SELECT TO_CHAR(TO_DATE('09:00', 'HH24:MI'), 'HH24') + LEVEL - 1
  FROM DUAL
  CONNECT BY LEVEL <= TO_CHAR(TO_DATE('18:00', 'HH24:MI'), 'HH24') - TO_CHAR(TO_DATE('09:00', 'HH24:MI'), 'HH24') + 1
)
SELECT all_hours.hour AS HOUR, NVL(SUM(dt.DR_AMT), 0) AS DR, NVL(SUM(dt.CR_AMT), 0) AS CR
FROM all_hours
LEFT JOIN (
  SELECT BALANCE_MPHONE, CR_AMT, DR_AMT, TO_NUMBER(TO_CHAR(TRANS_DATE, 'HH24')) AS CURRENT_HOUR
 FROM AGENT_BANKING.GL_TRANS_DTL
  WHERE BALANCE_MPHONE IS NOT NULL AND TRANS_DATE >= TRUNC(SYSDATE)
) dt ON all_hours.hour = dt.CURRENT_HOUR
GROUP BY all_hours.hour
ORDER BY all_hours.hour