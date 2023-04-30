/* Formatted on 4/27/2023 10:32:09 AM (QP5 v5.381) */
SELECT
    MPHONE,
    OUT_MSG,
    IN_TIME,
    NVL (SSL_REF_NUM,
    'PENDING') AS STATUS
FROM
    AGENT_BANKING.OUTBOX
WHERE
    STATUS = 'Y'
ORDER BY
    IN_TIME DESC FETCH FIRST 100 ROWS ONLY