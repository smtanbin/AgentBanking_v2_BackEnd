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
var moment_1 = __importDefault(require("moment"));
var oracleClient_1 = __importDefault(require("../../model/oracleClient"));
var TransactionModel = /** @class */ (function () {
    function TransactionModel() {
    }
    TransactionModel.prototype.statment = function (mphone, fromdate, todate) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, bindParams, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fromdate) {
                            fromdate = "SELECT REG_DATE FROM AGENT_BANKING.REGINFO WHERE MPHONE = :mphone";
                        }
                        sql = "* Formatted on 5/30/2022 4:21:37 PM (QP5 v5.381) */ SELECT ROW_NUMBER() OVER (ORDER BY P.TRANS_NO ASC) AS \"SL\", NVL (P.CR_AMT,0) CR_AMT,NVL (P.DR_AMT,0) DR_AMT, P.TRANS_NO, P.TRANS_DATE, (CASE WHEN CODE = 'RTGSC' THEN NVL ((SELECT 'RTGS Recived with Document ID '|| C.MSGID || ' and ' || NVL (C.INSTRFORNXTAGT,'null') || 'as note' FROM AGENT_BANKING.ABS_RTGS_TRANSACTION_DST C WHERE C.ST_DOCNUM = P.TRANS_NO), 'RTGS Recived From a Unknown Bank') WHEN CODE = 'DS' THEN NVL (( SELECT 'Refund to Bank. Remarks: \"' || REMARKS || '\"' FROM AGENT_BANKING.TBL_BD_STATUS TBL WHERE TBL.TRANNO = P.TRANS_NO), 'Refund to Bank') WHEN CODE = 'EFTC' THEN NVL (( SELECT 'Eft Recived From Bank ' || ( SELECT BANK || ' ' || BRANCH FROM tanbin.BANK_ROUTING WHERE ROUTING_NO = ORBANKRT) || '(' || ORBANKRT || ')' FROM AGENT_BANKING.BEFTN_PROCESS_INFO_IN C WHERE C.TR_NO = P.TRANS_NO), 'Eft Recived From a Unknown Bank') WHEN CODE = 'CEFT' THEN NVL (( SELECT 'Eft Send To Bank ' || ( SELECT BANK || ' ' || BRANCH FROM tanbin.BANK_ROUTING WHERE ROUTING_NO = C.ROUTING_NO) || '(' || ROUTING_NO || ')' || ' Account No ' || TRANS_TO || '(' || NAME_TO || ')' FROM AGENT_BANKING.EFT_INFO C WHERE C.TRANS_NO = P.TRANS_NO), 'Eft Send To A Unknown Bank') WHEN CODE = 'CC' THEN NVL ( (CASE WHEN ( SELECT cc.HOTKEY FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cc WHERE cc.TRANS_NO = P.TRANS_NO) = 'INSTALLMENT' AND ( SELECT cd.TRANS_FROM FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cd WHERE cd.TRANS_NO = P.TRANS_NO) = P.BALANCE_MPHONE THEN ( SELECT 'Premium for Scheam account ' || TRANS_TO FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) WHERE TRANS_NO = P.TRANS_NO) WHEN ( SELECT cc.HOTKEY FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cc WHERE cc.TRANS_NO = P.TRANS_NO) = 'INSTALLMENT' AND ( SELECT cd.TRANS_TO FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cd WHERE cd.TRANS_NO = P.TRANS_NO) = P.BALANCE_MPHONE THEN ( SELECT 'Premium Recived from ' || TRANS_FROM FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old)) WHEN ( SELECT cc.HOTKEY FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cc WHERE cc.TRANS_NO = P.TRANS_NO) = 'MT' AND ( SELECT cd.TRANS_FROM FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cd WHERE cd.TRANS_NO = P.TRANS_NO) = P.BALANCE_MPHONE THEN ( SELECT 'Fund Transfer to account ' || TRANS_TO FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) WHERE TRANS_NO = P.TRANS_NO) WHEN (SELECT cc.HOTKEY FROM (SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cc WHERE cc.TRANS_NO = P.TRANS_NO) = 'MT' AND (SELECT cd.TRANS_TO FROM (SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cd WHERE cd.TRANS_NO = P.TRANS_NO) = P.BALANCE_MPHONE THEN (SELECT 'Fund Recived from ' || TRANS_FROM FROM (SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) WHERE TRANS_NO = P.TRANS_NO) END), P.PARTICULAR) WHEN CODE NOT IN ('EFTC','CEFT','RTGSC','CC') THEN P.PARTICULAR WHEN CODE IS NULL THEN P.PARTICULAR END) PARTICULAR FROM (SELECT * FROM AGENT_BANKING.GL_TRANS_DTL UNION SELECT * FROM AGENT_BANKING.GL_TRANS_DTL_OLD) P WHERE BALANCE_MPHONE = TO_CHAR(:mphone) AND TRUNC (TRANS_DATE) BETWEEN :fromdate AND TO_DATE(:to date) ORDER BY TRANS_NO ASC";
                        bindParams = [
                            mphone.toString(),
                            fromdate.toString(),
                            todate.toString(),
                        ];
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql, bindParams)];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, payload.rows];
                }
            });
        });
    };
    TransactionModel.prototype.ministatment = function (mphone) {
        return __awaiter(this, void 0, void 0, function () {
            var _balance, balance, sql, bindParams, payload, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, oracleClient_1.default)("SELECT round(TANBIN.FUNC_GET_ACC_BALANCE(".concat(mphone.toString(), ",TRUNC (SYSDATE) - INTERVAL '1' DAY),2)balance FROM dual"))];
                    case 1:
                        _balance = _a.sent();
                        balance = 0;
                        balance = _balance.rows[0].BALANCE;
                        sql = "SELECT NVL (P.CR_AMT,0) CR_AMT,NVL (P.DR_AMT,0) DR_AMT, P.TRANS_NO, to_date(P.TRANS_DATE), (CASE WHEN CODE = 'RTGSC' THEN NVL ((SELECT 'RTGS Recived with Document ID '|| C.MSGID || ' and ' || NVL (C.INSTRFORNXTAGT,'null') || 'as note' FROM AGENT_BANKING.ABS_RTGS_TRANSACTION_DST C WHERE C.ST_DOCNUM = P.TRANS_NO), 'RTGS Recived From a Unknown Bank') WHEN CODE = 'DS' THEN NVL (( SELECT 'Refund to Bank. Remarks: \"' || REMARKS || '\"' FROM AGENT_BANKING.TBL_BD_STATUS TBL WHERE TBL.TRANNO = P.TRANS_NO), 'Refund to Bank') WHEN CODE = 'EFTC' THEN NVL (( SELECT 'Eft Recived From Bank ' || ( SELECT BANK || ' ' || BRANCH FROM tanbin.BANK_ROUTING WHERE ROUTING_NO = ORBANKRT) || '(' || ORBANKRT || ')' FROM AGENT_BANKING.BEFTN_PROCESS_INFO_IN C WHERE C.TR_NO = P.TRANS_NO), 'Eft Recived From a Unknown Bank') WHEN CODE = 'CEFT' THEN NVL (( SELECT 'Eft Send To Bank ' || ( SELECT BANK || ' ' || BRANCH FROM tanbin.BANK_ROUTING WHERE ROUTING_NO = C.ROUTING_NO) || '(' || ROUTING_NO || ')' || ' Account No ' || TRANS_TO || '(' || NAME_TO || ')' FROM AGENT_BANKING.EFT_INFO C WHERE C.TRANS_NO = P.TRANS_NO), 'Eft Send To A Unknown Bank') WHEN CODE = 'CC' THEN NVL ( (CASE WHEN ( SELECT cc.HOTKEY FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cc WHERE cc.TRANS_NO = P.TRANS_NO) = 'INSTALLMENT' AND ( SELECT cd.TRANS_FROM FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cd WHERE cd.TRANS_NO = P.TRANS_NO) = P.BALANCE_MPHONE THEN ( SELECT 'Premium for Scheam account ' || TRANS_TO FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) WHERE TRANS_NO = P.TRANS_NO) WHEN ( SELECT cc.HOTKEY FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cc WHERE cc.TRANS_NO = P.TRANS_NO) = 'INSTALLMENT' AND ( SELECT cd.TRANS_TO FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cd WHERE cd.TRANS_NO = P.TRANS_NO) = P.BALANCE_MPHONE THEN ( SELECT 'Premium Recived from ' || TRANS_FROM FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old)) WHEN ( SELECT cc.HOTKEY FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cc WHERE cc.TRANS_NO = P.TRANS_NO) = 'MT' AND ( SELECT cd.TRANS_FROM FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cd WHERE cd.TRANS_NO = P.TRANS_NO) = P.BALANCE_MPHONE THEN ( SELECT 'Fund Transfer to account ' || TRANS_TO FROM ( SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) WHERE TRANS_NO = P.TRANS_NO) WHEN (SELECT cc.HOTKEY FROM (SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cc WHERE cc.TRANS_NO = P.TRANS_NO) = 'MT' AND (SELECT cd.TRANS_TO FROM (SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) cd WHERE cd.TRANS_NO = P.TRANS_NO) = P.BALANCE_MPHONE THEN (SELECT 'Fund Recived from ' || TRANS_FROM FROM (SELECT * FROM AGENT_BANKING.GL_TRANS_MST UNION SELECT * FROM AGENT_BANKING.GL_TRANS_MST_old) WHERE TRANS_NO = P.TRANS_NO) END), P.PARTICULAR) WHEN CODE NOT IN ('EFTC','CEFT','RTGSC','CC') THEN P.PARTICULAR WHEN CODE IS NULL THEN P.PARTICULAR END) PARTICULAR FROM (SELECT * FROM AGENT_BANKING.GL_TRANS_DTL UNION SELECT * FROM AGENT_BANKING.GL_TRANS_DTL_OLD) P WHERE BALANCE_MPHONE = TO_CHAR(:mphone) AND TRUNC (TRANS_DATE) BETWEEN (SELECT REG_DATE FROM AGENT_BANKING.REGINFO WHERE MPHONE = :mphone) AND TO_DATE(SYSDATE) ORDER BY TRANS_NO DESC FETCH FIRST 25 ROWS ONLY";
                        bindParams = [mphone.toString()];
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql, bindParams)];
                    case 2:
                        payload = _a.sent();
                        payload = payload.rows;
                        result = [];
                        payload.map(function (_a, index) {
                            var CR_AMT = _a.CR_AMT, DR_AMT = _a.DR_AMT, TRANS_NO = _a.TRANS_NO, TRANS_DATE = _a.TRANS_DATE, PARTICULAR = _a.PARTICULAR;
                            balance = balance - CR_AMT + DR_AMT;
                            var _date = (0, moment_1.default)(TRANS_DATE).format("lll");
                            var obj = {
                                SL: index + 1,
                                CR_AMT: CR_AMT.toFixed(2),
                                DR_AMT: DR_AMT.toFixed(2),
                                BALANCE: balance.toFixed(2),
                                TRANS_NO: TRANS_NO,
                                TRANS_DATE: _date,
                                PARTICULAR: PARTICULAR,
                            };
                            result.push(obj);
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return TransactionModel;
}());
exports.default = TransactionModel;
