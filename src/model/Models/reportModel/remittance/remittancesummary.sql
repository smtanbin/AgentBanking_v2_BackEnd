SELECT
    MPHONE "PMPHONE",
    NAME,
    NVL ( (
    SELECT
        ROUND (SUM (SEN_REM_AMT),
        2)
    FROM
        AGENT_BANKING.REMITTANCE_INFO AR
    WHERE
        TRUNC (ENTRY_DATE) BETWEEN :FROMDATE
        AND :TODATE
        AND STATUS = 'A'
        AND REC_AGENT_ACC = R.MPHONE ),
        0) "REMITTANCE",
        NVL ( (
            SELECT
                COUNT (REM_ID)
            FROM
                AGENT_BANKING.REMITTANCE_INFO AR
            WHERE
                TRUNC (ENTRY_DATE) BETWEEN :FROMDATE
                AND :TODATE
                AND STATUS = 'A'
                AND REC_AGENT_ACC = R.MPHONE
        ),
        0) "REMINO",
        NVL ( (
            SELECT
                ROUND (SUM (INCEN_AMT),
                2)
            FROM
                AGENT_BANKING.REMITTANCE_INFO AR
            WHERE
                TRUNC (ENTRY_DATE) BETWEEN :FROMDATE
                AND :TODATE
                AND STATUS = 'A'
                AND REC_AGENT_ACC = R.MPHONE
        ),
        0) "INCE",
        NVL ( (
            SELECT
                COUNT (INCEN_AMT)
            FROM
                AGENT_BANKING.REMITTANCE_INFO AR
            WHERE
                TRUNC (ENTRY_DATE) BETWEEN :FROMDATE
                AND :TODATE
                AND STATUS = 'A'
                AND REC_AGENT_ACC = R.MPHONE
        ),
        0) "INCNO"
    FROM
        AGENT_BANKING.REGINFO R
    WHERE
        CAT_ID = 'D'
        AND STATUS != 'C'