SELECT
    RIM.NAME_OF_MTC,
    RIM.REM_TT_NO,
    RIM.REM_ID,
    BEN_NAME,
    ENTRY_DATE,
    SEN_REM_AMT,
    (CASE
        WHEN STATUS = 'P' THEN
            'Ready for payment'
        WHEN STATUS = 'M' THEN
            'Waiting fot correction'
        WHEN STATUS IS NULL THEN
            'Pending Request'
    END)                    COMMENTS,
    AUTHO_DATE,
    (
    SELECT
        NAME
    FROM
        AGENT_BANKING.REGINFO
    WHERE
        MPHONE = REC_AGENT_ACC) REC_AGENT_ACC,
        STATUS
    FROM
        AGENT_BANKING.REMITTANCE_INFO RIM
    WHERE
        STATUS IS NULL
        OR STATUS IN ('P',
        'M')