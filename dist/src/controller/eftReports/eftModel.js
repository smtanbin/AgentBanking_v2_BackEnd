"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var oracleClient_1 = __importDefault(require("../../model/oracleClient"));
var EftReportModel = /** @class */ (function () {
    function EftReportModel() {
    }
    EftReportModel.prototype.sum = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT AC_TYPE_CODE \"TYPE\", HONOURED, COUNT (ACTNUM) \"COUNT\",SUM (AMOUNT) \"SUM\"\n    FROM (  SELECT (CASE\n                        WHEN SUBSTR (ACTNUM, 0, 3) = 001\n                        THEN\n                            SUBSTR (ACTNUM, 3, 13)\n                        WHEN SUBSTR (ACTNUM, 0, 3) != 001\n                        THEN\n                            ACTNUM\n                    END)             \"ACTNUM\",\n                   HONOURED,\n                   (SELECT (SELECT P.ACC_TYPE_SHORT_NAME\n                              FROM AGENT_BANKING.PRODUCT_SETUP P\n                             WHERE P.ACC_TYPE_CODE = R1.AC_TYPE_CODE)\n                      FROM AGENT_BANKING.REGINFO R1\n                     WHERE MPHONE =\n                           (CASE\n                                WHEN SUBSTR (ACTNUM, 0, 3) = 001\n                                THEN\n                                    SUBSTR (ACTNUM, 3, 13)\n                                WHEN SUBSTR (ACTNUM, 0, 3) != 001\n                                THEN\n                                    ACTNUM\n                            END))    AC_TYPE_CODE,\n                   AMOUNT            \"AMOUNT\"\n              FROM BEFTN.BEFTN_PROCESS_INFO@SBL_DBL_IT\n             WHERE     LTRIM (ACTNUM, '0') LIKE '108%'\nAND TRUNC (SETTLEDATE) = TRUNC (SYSDATE)\n                   AND SESSION_NO =\n                       (CASE\n                            WHEN TO_CHAR (SYSDATE, 'HH24') < 14 THEN 2\n                            ELSE 1\n                        END)\n                   AND RETURNED IS NULL\n                 --  AND SYS_NO NOT IN\n                  --         (SELECT SYS_NO\n                  --            FROM AGENT_BANKING.BEFTN_PROCESS_INFO_IN\n                  --           WHERE     TRUNC (TIMSTAMP) = TRUNC (SYSDATE)\n                  --                 AND CHK_STATUS IS NULL\n                   --                AND NVL (SUB_TRTYPE, 'ICE') <> 'IRE')\n                   AND (CASE\n                            WHEN SUBSTR (ACTNUM, 0, 3) = 001\n                            THEN\n                                SUBSTR (ACTNUM, 3, 13)\n                            WHEN SUBSTR (ACTNUM, 0, 3) != 001\n                            THEN\n                                ACTNUM\n                        END) IN\n                           (SELECT MPHONE\n                              FROM AGENT_BANKING.REGINFO R\n                             WHERE R.REG_STATUS != 'R' AND STATUS != 'C')\n          ORDER BY ACTNUM ASC)\nGROUP BY AC_TYPE_CODE, HONOURED";
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql)];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, payload.rows];
                }
            });
        });
    };
    EftReportModel.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "/* Formatted on 10/31/2022 3:43:44 PM (QP5 v5.381) */\n  SELECT ACTNUM  \"ACTNUM\",\n\n  /* (CASE\n              WHEN SUBSTR (ACTNUM, 0, 3) = 001 THEN SUBSTR (ACTNUM, 3, 13)\n              WHEN SUBSTR (ACTNUM, 0, 3) != 001 THEN ACTNUM\n          END)                         \"ACTNUM\", */\n         nvl(INDIVIDUALNAME,RECEIVERNAME)                  RECIVER,\n           HONOURED,\n         NVL (\n             (SELECT R.ACCOUNT_NAME\n                FROM AGENT_BANKING.REGINFO R\n               WHERE     R.STATUS != 'C'\n                     AND R.REG_STATUS != 'R'\n                     AND MPHONE =\n                         (CASE\n                              WHEN SUBSTR (ACTNUM, 0, 3) = 001\n                              THEN\n                                  SUBSTR (ACTNUM, 3, 13)\n                              WHEN SUBSTR (ACTNUM, 0, 3) != 001\n                              THEN\n                                  ACTNUM\n                          END)),\n             'NOT FOUND')              \"ABS_AC_TITEL\",\n         AMOUNT                        \"AMOUNT\",\n         NVL ((SELECT BANKNM\n                 FROM BEFTN.EFT_BANK@SBL_DBL_IT\n                WHERE ROUTECODE = ORBANKRT),\n              NVL ((SELECT BANK\n                      FROM TANBIN.BANK_ROUTING\n                     WHERE ROUTING_NO = ORBANKRT || ORBANKCHECKDG),NVL ((SELECT BANK\n                           FROM TANBIN.BANK_ROUTING\n                          WHERE ROUTING_NO = ORBANKRT),\n                        ORBANKRT)))    \"ORIG_BANK_NAME\",\n         NVL ((SELECT BRNNAM\n                 FROM BEFTN.EFT_branch@SBL_DBL_IT\n                WHERE ROUTNO = ORBANKRT),\n              NVL ((SELECT BRANCH\n                      FROM TANBIN.BANK_ROUTING\n                     WHERE ROUTING_NO = ORBANKRT || ORBANKCHECKDG),\n                   ORBANKRT))          \"ORIG_BRANCH_NAME\",\n         COMPANYNAME                   \"SENDER\",\n         PAYMENTINFO                   \"NOTE\"\n    FROM BEFTN.BEFTN_PROCESS_INFO@SBL_DBL_IT\n   WHERE     LTRIM (ACTNUM, '0') LIKE '108%'\n         AND TRUNC (SETTLEDATE) = TRUNC (SYSDATE)\n         AND SESSION_NO =\n             (CASE WHEN TO_CHAR (SYSDATE, 'HH24') < 14 THEN 2 ELSE 1 END)\n         AND RETURNED IS NULL\n         AND (CASE\n                  WHEN SUBSTR (ACTNUM, 0, 3) = 001 THEN SUBSTR (ACTNUM, 3, 13)\n                  WHEN SUBSTR (ACTNUM, 0, 3) != 001 THEN ACTNUM\n              END) IN\n                 (SELECT MPHONE\n                    FROM AGENT_BANKING.REGINFO R\n                   WHERE R.REG_STATUS != 'R' AND STATUS != 'C')\nORDER BY ACTNUM ASC";
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql)];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, payload.rows];
                }
            });
        });
    };
    EftReportModel.prototype.return = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "/* Formatted on 11/15/2022 11:34:47 AM (QP5 v5.381) */\nSELECT (CASE\n            WHEN SUBSTR (ACTNUM, 0, 3) = 001 THEN SUBSTR (ACTNUM, 3, 13)\n            WHEN SUBSTR (ACTNUM, 0, 3) != 001 THEN ACTNUM\n        END)                         \"ACTNUM\",\n       --         nvl(INDIVIDUALNAME,RECEIVERNAME)                  RECIVER,ORBANKCHECKDG\n       RECEIVERNAME RECIVER,\n       HONOURED,\n       NVL (\n           (SELECT R.ACCOUNT_NAME\n              FROM AGENT_BANKING.REGINFO R\n             WHERE     R.STATUS != 'C'\n                   AND R.REG_STATUS != 'R'\n                   AND MPHONE =\n                       (CASE\n                            WHEN SUBSTR (ACTNUM, 0, 3) = 001\n                            THEN\n                                SUBSTR (ACTNUM, 3, 13)\n                            WHEN SUBSTR (ACTNUM, 0, 3) != 001\n                            THEN\n                                ACTNUM\n                        END)),\n           'NOT FOUND')              \"ABS_AC_TITEL\",\n       AMOUNT                        \"AMOUNT\",\n       NVL ((SELECT BANKNM\n               FROM BEFTN.EFT_BANK@SBL_DBL_IT\n              WHERE ROUTECODE = ORBANKRT),\n            NVL ((SELECT BANK FROM TANBIN.BANK_ROUTING\n                   WHERE ROUTING_NO = ORBANKRT || ORBANKCHECKDG),\n                 NVL ((SELECT BANK\n                         FROM TANBIN.BANK_ROUTING\n                        WHERE ROUTING_NO = ORBANKRT),\n                      ORBANKRT)))    \"ORIG_BANK_NAME\",\n       NVL ((SELECT BRNNAM\n               FROM BEFTN.EFT_BRANCH@SBL_DBL_IT\n              WHERE ROUTNO = ORBANKRT),\n            NVL ((SELECT BRANCH\n                    FROM TANBIN.BANK_ROUTING\n                   WHERE ROUTING_NO = ORBANKRT || ORBANKCHECKDG),\n                 ORBANKRT))          \"ORIG_BRANCH_NAME\"\n  FROM (SELECT COMPLETE,\n               CBS_STATUS,\n               HONOURED,\n               ST_DOCNUM,\n               ADRINDICATOR,\n               B.STATUS,\n               COMPANYDESCDATE,\n               ORBANKRT,\n               ORBANKCHECKDG,\n               REBANKRT,\n               REBANKCHECKDG,\n               FILEID,\n               ADDENDATYPECODE,\n               PBM_BATCH_NO,\n               REASON_ID,\n               RETURN_AMOUNT,\n               SUB_TRTYPE,\n               RETURNED,\n               ADDENDAINFORMATION,\n               ORIGINALTRACENUMBER,\n               ENTRYADDENDACOUNT,\n B.REF_SYS_NO,\n               B.SYS_NO,\n               AMOUNT,\n               E.TRANS_FROM                           ACTNUM,\n               DFIACCOUNTNUM,\n               TRACENUMBER,\n               NVL (INDIVIDUALNAME, RECEIVERNAME)     RECEIVERNAME,\n               TIMSTAMP\n          FROM AGENT_BANKING.EFT_INFO               E,\n               BEFTN.BEFTN_PROCESS_INFO@SBL_DBL_IT  B\n         WHERE     TRUNC (B.SETTLEDATE) = TRUNC (SYSDATE)\n               AND B.TRTYPE = 'OCE'\n               AND B.SUB_TRTYPE = 'IRE'\n                          AND b.st_docnum IS NULL\n               AND B.REF_SYS_NO = E.SYS_NO\n        MINUS\n        SELECT COMPLETE,\n               CBS_STATUS,\n               HONOURED,\n               ST_DOCNUM,\n               ADRINDICATOR,\n               B.STATUS,\n               COMPANYDESCDATE,\n               ORBANKRT,\n               ORBANKCHECKDG,\n               REBANKRT,\n               REBANKCHECKDG,\n               FILEID,\n               ADDENDATYPECODE,\n               PBM_BATCH_NO,\n               REASON_ID,\n               RETURN_AMOUNT,\n               SUB_TRTYPE,\n               RETURNED,\nADDENDAINFORMATION,\n               ORIGINALTRACENUMBER,\n               ENTRYADDENDACOUNT,\n               B.REF_SYS_NO,\n               B.SYS_NO,\n               AMOUNT,\n               ACTNUM,\n               DFIACCOUNTNUM,\n               TRACENUMBER,\n               NVL (INDIVIDUALNAME, RECEIVERNAME)     RECEIVERNAME,\n               TIMSTAMP\n          FROM AGENT_BANKING.BEFTN_PROCESS_INFO_IN B\n         WHERE CHK_STATUS IS NULL AND SUB_TRTYPE = 'IRE')";
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql)];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, payload.rows];
                }
            });
        });
    };
    return EftReportModel;
}());
exports.default = EftReportModel;
