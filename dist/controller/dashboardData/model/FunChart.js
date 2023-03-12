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
var oracleClient_1 = __importDefault(require("../../../model/oracleClient"));
var ChartsData = /** @class */ (function () {
    function ChartsData() {
    }
    ChartsData.prototype.TotalDebitCreditCurrent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var count, sql, bindParams, payload, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, oracleClient_1.default)("SELECT count(*) AS COUNT FROM AGENT_BANKING.GL_TRANS_DTL")];
                    case 1:
                        count = _a.sent();
                        sql = null;
                        if (count.rows[0].COUNT !== 0) {
                            sql = "WITH all_hours (hour) AS (\n  SELECT TO_CHAR(TO_DATE('09:00', 'HH24:MI'), 'HH24') + LEVEL - 1\n  FROM DUAL\n  CONNECT BY LEVEL <= TO_CHAR(TO_DATE('18:00', 'HH24:MI'), 'HH24') - TO_CHAR(TO_DATE('09:00', 'HH24:MI'), 'HH24') + 1\n)\nSELECT all_hours.hour AS HOUR, NVL(SUM(dt.DR_AMT), 0) AS DR, NVL(SUM(dt.CR_AMT), 0) AS CR\nFROM all_hours\nLEFT JOIN (\n  SELECT BALANCE_MPHONE, CR_AMT, DR_AMT, TO_NUMBER(TO_CHAR(TRANS_DATE, 'HH24')) AS CURRENT_HOUR\n  FROM AGENT_BANKING\n  WHERE BALANCE_MPHONE IS NOT NULL AND TRANS_DATE >= TRUNC(SYSDATE)\n) dt ON all_hours.hour = dt.CURRENT_HOUR\nGROUP BY all_hours.hour\nORDER BY all_hours.hour";
                        }
                        else {
                            sql = "WITH all_hours (hour) AS (\n  SELECT TO_CHAR(TO_DATE('09:00', 'HH24:MI'), 'HH24') + LEVEL - 1\n  FROM DUAL\n  CONNECT BY LEVEL <= TO_CHAR(TO_DATE('18:00', 'HH24:MI'), 'HH24') - TO_CHAR(TO_DATE('09:00', 'HH24:MI'), 'HH24') + 1\n)\nSELECT all_hours.hour AS HOUR, NVL(SUM(dt.DR_AMT), 0) AS DR, NVL(SUM(dt.CR_AMT), 0) AS CR\nFROM all_hours\nLEFT JOIN (\n  SELECT BALANCE_MPHONE, CR_AMT, DR_AMT, TO_NUMBER(TO_CHAR(TRANS_DATE, 'HH24')) AS CURRENT_HOUR\n  FROM AGENT_BANKING.GL_TRANS_DTL_OLD\n  WHERE BALANCE_MPHONE IS NOT NULL AND TRANS_DATE >= TRUNC(SYSDATE)\n) dt ON all_hours.hour = dt.CURRENT_HOUR\nGROUP BY all_hours.hour\nORDER BY all_hours.hour";
                        }
                        bindParams = [];
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql, bindParams)];
                    case 2:
                        payload = _a.sent();
                        return [2 /*return*/, payload.rows];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ChartsData.prototype.TotalDebitCreditPrevious = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, bindParams, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "WITH all_hours (hour) AS (\n  SELECT TO_CHAR(TO_DATE('09:00', 'HH24:MI'), 'HH24') + LEVEL - 1\n  FROM DUAL\n  CONNECT BY LEVEL <= TO_CHAR(TO_DATE('18:00', 'HH24:MI'), 'HH24') - TO_CHAR(TO_DATE('09:00', 'HH24:MI'), 'HH24') + 1\n)\nSELECT all_hours.hour AS HOUR, NVL(SUM(dt.DR_AMT), 0) AS DR, NVL(SUM(dt.CR_AMT), 0) AS CR\nFROM all_hours\nLEFT JOIN (\n  SELECT BALANCE_MPHONE, CR_AMT, DR_AMT, TO_NUMBER(TO_CHAR(TRANS_DATE, 'HH24')) AS CURRENT_HOUR\n  FROM AGENT_BANKING.GL_TRANS_DTL_OLD\n  WHERE BALANCE_MPHONE IS NOT NULL AND TRANS_DATE >= TRUNC((SELECT TRANS_DATE FROM (SELECT TRANS_DATE FROM AGENT_BANKING.GL_TRANS_DTL_OLD WHERE TRUNC(TRANS_DATE) != TRUNC(SYSDATE) ORDER BY TRANS_DATE DESC) WHERE ROWNUM = 1))\n) dt ON all_hours.hour = dt.CURRENT_HOUR\nGROUP BY all_hours.hour\nORDER BY all_hours.hour";
                        bindParams = [];
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql, bindParams)];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, payload.rows];
                }
            });
        });
    };
    ChartsData.prototype.balanceChart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, bindParams, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT ROUND (SUM (R.BALANCE_M), 2) BALANCE, (SELECT P.ACC_TYPE_SHORT_NAME  FROM AGENT_BANKING.PRODUCT_SETUP P WHERE P.ACC_TYPE_CODE = R.AC_TYPE_CODE) TYPE FROM AGENT_BANKING.REGINFO R GROUP BY AC_TYPE_CODE ORDER BY BALANCE";
                        bindParams = [];
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql, bindParams)];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, payload.rows];
                }
            });
        });
    };
    return ChartsData;
}());
exports.default = ChartsData;
