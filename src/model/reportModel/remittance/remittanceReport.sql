SELECT
    NAME_OF_MTC                  "NAME_OF_EXCHANGE_HOUSE",
    PIN_S_CODE                   "RefNo_TT_NO",
    TO_CHAR (AUTHO_DATE)         "DATE_OF_ORGINATING_REMITTANCE",
    BEN_NAME                     "NAME",
    (
    SELECT
        TYPE_NAME
    FROM
        AGENT_BANKING.PHOTO_ID_TYPE_LIST C
    WHERE
        C.ID = P.PHOTO_ID_TYPE_CODE) "DOCUMENT_TYPE",
        BEN_PHOTO_ID "NID_NO_PASSPORT_NO",
        SEN_NAME "SENDER_NAME",
        'NULL' AS OCCUPATION,
        SEN_COUNTRY_ORGIN "SOURCE_COUNTRY",
        SEN_REM_AMT "AMOUNT_REMITTED_BDT",
        CASE
            WHEN INCEN_AMT IS NULL THEN
                (
                    SELECT
                        AMT
                    FROM
                        (
                            SELECT
                                INCEN_AMT  "AMT",
                                PIN_S_CODE "PIN"
                            FROM
                                AGENT_BANKING.REMITTANCE_INFO_INC
                            WHERE
                                STATUS = 'P'
                        )
                    WHERE
                        P.PIN_S_CODE = PIN
                )
            WHEN INCEN_AMT IS NOT NULL THEN
                INCEN_AMT
        END "AMOUNT_OF_INCENTIVE_BDT",
        CASE
            WHEN INCEN_AMT IS NULL AND (
                SELECT
                    AMT
                FROM
                    (
                        SELECT
                            INCEN_AMT  "AMT",
                            PIN_S_CODE "PIN"
                        FROM
                            AGENT_BANKING.REMITTANCE_INFO_INC
                        WHERE
                            STATUS = 'P'
                    )
                WHERE
                    P.PIN_S_CODE = PIN
            ) IS NULL THEN
                ''
            WHEN INCEN_AMT IS NOT NULL THEN
                TO_CHAR (AUTHO_DATE)
        END "DATE_OF_PAYMENT_OF_INCENTIVE"
    FROM
        AGENT_BANKING.REMITTANCE_INFO P
    WHERE
        TRUNC (ENTRY_DATE) BETWEEN :FROMDATE
        AND :TODATE
        AND STATUS = 'A'
    ORDER BY
        NAME_OF_MTC,
        AUTHO_DATE DESC