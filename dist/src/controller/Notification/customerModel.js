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
var customer = /** @class */ (function () {
    function customer() {
    }
    customer.prototype.get = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, bindParams, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT *  FROM AGENT_BANKING.CUSTIDINFO  c  LEFT JOIN AGENT_BANKING.REGINFO r ON c.CUST_ID = r.CUST_ID  WHERE    c.NID_NO = :item OR c.CON_MOB = :item OR r.MPHONE = :item OR r.CUST_ID = :item";
                        bindParams = [param.toString()];
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql, bindParams)];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, payload.rows];
                }
            });
        });
    };
    customer.prototype.search = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, bindParams, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT c.CUST_ID,c.NAME,c.NID_NO,c.DOB,c.EMAIL,c.FATHER_NAME,c.MOTHER_NAME,c.POUSE_NAME,r.CON_MOB,c.REG_DATE,r.MPHONE,c.PMPHONE,r.REG_STATUS,r.STATUS,c.CUST_ID_TYPE  FROM AGENT_BANKING.CUSTIDINFO  c\n       LEFT JOIN AGENT_BANKING.REGINFO r ON c.CUST_ID = r.CUST_ID\n       WHERE    \n       UPPER (c.NID_NO) LIKE UPPER (%:item%)\n       OR UPPER (c.CON_MOB) LIKE UPPER (%:item%)\n       OR UPPER (r.MPHONE) LIKE UPPER (%:item%)\n       OR UPPER (r.CUST_ID) LIKE UPPER (%:item%)\n       OR UPPER (c.NAME) LIKE UPPER (%:item%)";
                        bindParams = [param.toString()];
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql, bindParams)];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, payload.rows];
                }
            });
        });
    };
    return customer;
}());
exports.default = customer;
