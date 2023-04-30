/* Formatted on 11/15/2022 11:34:47 AM (QP5 v5.381) */
SELECT
    (CASE
        WHEN SUBSTR (ACTNUM, 0, 3) = 001 THEN
            SUBSTR (ACTNUM, 3, 13)
        WHEN SUBSTR (ACTNUM, 0, 3) != 001 THEN
            ACTNUM
    END)         "ACTNUM",
 --         nvl(INDIVIDUALNAME,RECEIVERNAME)                  RECIVER,ORBANKCHECKDG
    RECEIVERNAME RECIVER,
    HONOURED,
    NVL ( (
    SELECT
        R.ACCOUNT_NAME
    FROM
        AGENT_BANKING.REGINFO R
    WHERE
        R.STATUS != 'C'
        AND R.REG_STATUS != 'R'
        AND MPHONE = (
            CASE
                WHEN SUBSTR (ACTNUM, 0, 3) = 001 THEN
                    SUBSTR (ACTNUM, 3, 13)
                WHEN SUBSTR (ACTNUM, 0, 3) != 001 THEN
                    ACTNUM
            END)),
        'NOT FOUND') "ABS_AC_TITEL",
        AMOUNT "AMOUNT",
        NVL ((
            SELECT
                BANKNM
            FROM
                BEFTN.EFT_BANK@SBL_DBL_IT
            WHERE
                ROUTECODE = ORBANKRT
        ),
        NVL ((
            SELECT
                BANK
            FROM
                TANBIN.BANK_ROUTING
            WHERE
                ROUTING_NO = ORBANKRT
                    || ORBANKCHECKDG
        ),
        NVL ((
            SELECT
                BANK
            FROM
                TANBIN.BANK_ROUTING
            WHERE
                ROUTING_NO = ORBANKRT
        ),
        ORBANKRT))) "ORIG_BANK_NAME",
        NVL ((
            SELECT
                BRNNAM
            FROM
                BEFTN.EFT_BRANCH@SBL_DBL_IT
            WHERE
                ROUTNO = ORBANKRT
        ),
        NVL ((
            SELECT
                BRANCH
            FROM
                TANBIN.BANK_ROUTING
            WHERE
                ROUTING_NO = ORBANKRT
                    || ORBANKCHECKDG
        ),
        ORBANKRT)) "ORIG_BRANCH_NAME"
    FROM
        (
            SELECT
                COMPLETE,
                CBS_STATUS,
                HONOURED,
                ST_DOCNUM,
                ADRINDICATOR,
                B.STATUS,
                COMPANYDESCDATE,
                ORBANKRT,
                ORBANKCHECKDG,
                REBANKRT,
                REBANKCHECKDG,
                FILEID,
                ADDENDATYPECODE,
                PBM_BATCH_NO,
                REASON_ID,
                RETURN_AMOUNT,
                SUB_TRTYPE,
                RETURNED,
                ADDENDAINFORMATION,
                ORIGINALTRACENUMBER,
                ENTRYADDENDACOUNT,
                B.REF_SYS_NO,
                B.SYS_NO,
                AMOUNT,
                E.TRANS_FROM  ACTNUM,
                DFIACCOUNTNUM,
                TRACENUMBER,
                NVL (INDIVIDUALNAME,
                RECEIVERNAME) RECEIVERNAME,
                TIMSTAMP
            FROM
                AGENT_BANKING.EFT_INFO              E,
                BEFTN.BEFTN_PROCESS_INFO@SBL_DBL_IT            B
            WHERE
                TRUNC (B.SETTLEDATE) = TRUNC (SYSDATE)
                AND B.TRTYPE = 'OCE'
                AND B.SUB_TRTYPE = 'IRE'
                AND B.ST_DOCNUM IS NULL
                AND B.REF_SYS_NO = E.SYS_NO MINUS
                SELECT
                    COMPLETE,
                    CBS_STATUS,
                    HONOURED,
                    ST_DOCNUM,
                    ADRINDICATOR,
                    B.STATUS,
                    COMPANYDESCDATE,
                    ORBANKRT,
                    ORBANKCHECKDG,
                    REBANKRT,
                    REBANKCHECKDG,
                    FILEID,
                    ADDENDATYPECODE,
                    PBM_BATCH_NO,
                    REASON_ID,
                    RETURN_AMOUNT,
                    SUB_TRTYPE,
                    RETURNED,
                    ADDENDAINFORMATION,
                    ORIGINALTRACENUMBER,
                    ENTRYADDENDACOUNT,
                    B.REF_SYS_NO,
                    B.SYS_NO,
                    AMOUNT,
                    ACTNUM,
                    DFIACCOUNTNUM,
                    TRACENUMBER,
                    NVL (INDIVIDUALNAME,
                    RECEIVERNAME) RECEIVERNAME,
                    TIMSTAMP
                FROM
                    AGENT_BANKING.BEFTN_PROCESS_INFO_IN B
                WHERE
                    CHK_STATUS IS NULL
                    AND SUB_TRTYPE = 'IRE'
        )