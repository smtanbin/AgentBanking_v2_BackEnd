SELECT
    NVL (P.CR_AMT,
    0)                                                               CR_AMT,
    NVL (P.DR_AMT,
    0)                                                               DR_AMT,
    P.TRANS_NO,
    TO_DATE(P.TRANS_DATE),
    (CASE
        WHEN CODE = 'RTGSC' THEN
            NVL ((
                SELECT
                    'RTGS Recived with Document ID '|| C.MSGID || ' and ' || NVL (C.INSTRFORNXTAGT,
                    'null') || 'as note'
                FROM
                    AGENT_BANKING.ABS_RTGS_TRANSACTION_DST C
                WHERE
                    C.ST_DOCNUM = P.TRANS_NO
            ), 'RTGS Recived From a Unknown Bank')
        WHEN CODE = 'DS' THEN
            NVL ((
                SELECT
                    'Refund to Bank. Remarks: "' || REMARKS || '"'
                FROM
                    AGENT_BANKING.TBL_BD_STATUS TBL
                WHERE
                    TBL.TRANNO = P.TRANS_NO
            ), 'Refund to Bank')
        WHEN CODE = 'EFTC' THEN
            NVL ((
                SELECT
                    'Eft Recived From Bank ' || (
                    SELECT
                        BANK || ' ' || BRANCH
                    FROM
                        TANBIN.BANK_ROUTING
                    WHERE
                        ROUTING_NO = ORBANKRT)
                            || '('
                            || ORBANKRT
                            || ')'
                    FROM
                        AGENT_BANKING.BEFTN_PROCESS_INFO_IN C
                    WHERE
                        C.TR_NO = P.TRANS_NO
            ), 'Eft Recived From a Unknown Bank')
        WHEN CODE = 'CEFT' THEN
            NVL ((
                SELECT
                    'Eft Send To Bank ' || (
                    SELECT
                        BANK || ' ' || BRANCH
                    FROM
                        TANBIN.BANK_ROUTING
                    WHERE
                        ROUTING_NO = C.ROUTING_NO)
                            || '('
                            || ROUTING_NO
                            || ')'
                            || ' Account No '
                            || TRANS_TO
                            || '('
                            || NAME_TO
                            || ')'
                    FROM
                        AGENT_BANKING.EFT_INFO C
                    WHERE
                        C.TRANS_NO = P.TRANS_NO
            ), 'Eft Send To A Unknown Bank')
        WHEN CODE = 'CC' THEN
            NVL ( (
                CASE
                    WHEN (
                        SELECT
                            CC.HOTKEY
                        FROM
                            (
                                SELECT
                                    *
                                FROM
                                    AGENT_BANKING.GL_TRANS_MST UNION
                                    SELECT
                                        *
                                    FROM
                                        AGENT_BANKING.GL_TRANS_MST_OLD
                            ) CC
                        WHERE
                            CC.TRANS_NO = P.TRANS_NO
                    ) = 'INSTALLMENT' AND (
                        SELECT
                            CD.TRANS_FROM
                        FROM
                            (
                                SELECT
                                    *
                                FROM
                                    AGENT_BANKING.GL_TRANS_MST UNION
                                    SELECT
                                        *
                                    FROM
                                        AGENT_BANKING.GL_TRANS_MST_OLD
                            ) CD
                        WHERE
                            CD.TRANS_NO = P.TRANS_NO
                    ) = P.BALANCE_MPHONE THEN
                        (
                            SELECT
                                'Premium for Scheam account ' || TRANS_TO
                            FROM
                                (
                                    SELECT
                                        *
                                    FROM
                                        AGENT_BANKING.GL_TRANS_MST UNION
                                        SELECT
                                            *
                                        FROM
                                            AGENT_BANKING.GL_TRANS_MST_OLD
                                )
                            WHERE
                                TRANS_NO = P.TRANS_NO
                        )
                    WHEN (
                        SELECT
                            CC.HOTKEY
                        FROM
                            (
                                SELECT
                                    *
                                FROM
                                    AGENT_BANKING.GL_TRANS_MST UNION
                                    SELECT
                                        *
                                    FROM
                                        AGENT_BANKING.GL_TRANS_MST_OLD
                            ) CC
                        WHERE
                            CC.TRANS_NO = P.TRANS_NO
                    ) = 'INSTALLMENT' AND (
                        SELECT
                            CD.TRANS_TO
                        FROM
                            (
                                SELECT
                                    *
                                FROM
                                    AGENT_BANKING.GL_TRANS_MST UNION
                                    SELECT
                                        *
                                    FROM
                                        AGENT_BANKING.GL_TRANS_MST_OLD
                            ) CD
                        WHERE
                            CD.TRANS_NO = P.TRANS_NO
                    ) = P.BALANCE_MPHONE THEN
                        (
                            SELECT
                                'Premium Recived from ' || TRANS_FROM
                            FROM
                                (
                                    SELECT
                                        *
                                    FROM
                                        AGENT_BANKING.GL_TRANS_MST UNION
                                        SELECT
                                            *
                                        FROM
                                            AGENT_BANKING.GL_TRANS_MST_OLD
                                )
                        )
                    WHEN (
                        SELECT
                            CC.HOTKEY
                        FROM
                            (
                                SELECT
                                    *
                                FROM
                                    AGENT_BANKING.GL_TRANS_MST UNION
                                    SELECT
                                        *
                                    FROM
                                        AGENT_BANKING.GL_TRANS_MST_OLD
                            ) CC
                        WHERE
                            CC.TRANS_NO = P.TRANS_NO
                    ) = 'MT' AND (
                        SELECT
                            CD.TRANS_FROM
                        FROM
                            (
                                SELECT
                                    *
                                FROM
                                    AGENT_BANKING.GL_TRANS_MST UNION
                                    SELECT
                                        *
                                    FROM
                                        AGENT_BANKING.GL_TRANS_MST_OLD
                            ) CD
                        WHERE
                            CD.TRANS_NO = P.TRANS_NO
                    ) = P.BALANCE_MPHONE THEN
                        (
                            SELECT
                                'Fund Transfer to account ' || TRANS_TO
                            FROM
                                (
                                    SELECT
                                        *
                                    FROM
                                        AGENT_BANKING.GL_TRANS_MST UNION
                                        SELECT
                                            *
                                        FROM
                                            AGENT_BANKING.GL_TRANS_MST_OLD
                                )
                            WHERE
                                TRANS_NO = P.TRANS_NO
                        )
                    WHEN (
                        SELECT
                            CC.HOTKEY
                        FROM
                            (
                                SELECT
                                    *
                                FROM
                                    AGENT_BANKING.GL_TRANS_MST UNION
                                    SELECT
                                        *
                                    FROM
                                        AGENT_BANKING.GL_TRANS_MST_OLD
                            ) CC
                        WHERE
                            CC.TRANS_NO = P.TRANS_NO
                    ) = 'MT' AND (
                        SELECT
                            CD.TRANS_TO
                        FROM
                            (
                                SELECT
                                    *
                                FROM
                                    AGENT_BANKING.GL_TRANS_MST UNION
                                    SELECT
                                        *
                                    FROM
                                        AGENT_BANKING.GL_TRANS_MST_OLD
                            ) CD
                        WHERE
                            CD.TRANS_NO = P.TRANS_NO
                    ) = P.BALANCE_MPHONE THEN
                        (
                            SELECT
                                'Fund Recived from ' || TRANS_FROM
                            FROM
                                (
                                    SELECT
                                        *
                                    FROM
                                        AGENT_BANKING.GL_TRANS_MST UNION
                                        SELECT
                                            *
                                        FROM
                                            AGENT_BANKING.GL_TRANS_MST_OLD
                                )
                            WHERE
                                TRANS_NO = P.TRANS_NO
                        )
                END), P.PARTICULAR) WHEN CODE NOT IN ('EFTC',
    'CEFT',
    'RTGSC',
    'CC') THEN P.PARTICULAR WHEN CODE IS NULL THEN P.PARTICULAR END) PARTICULAR
FROM
    (
        SELECT
            *
        FROM
            AGENT_BANKING.GL_TRANS_DTL UNION
            SELECT
                *
            FROM
                AGENT_BANKING.GL_TRANS_DTL_OLD
    ) P
WHERE
    BALANCE_MPHONE = TO_CHAR(:MPHONE)
    AND TRUNC (TRANS_DATE) BETWEEN (
        SELECT
            REG_DATE
        FROM
            AGENT_BANKING.REGINFO
        WHERE
            MPHONE = :MPHONE
    )
    AND TO_DATE(SYSDATE)
ORDER BY
    TRANS_NO ASC FETCH FIRST 25 ROWS ONLY