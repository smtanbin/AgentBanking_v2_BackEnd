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
var auth = /** @class */ (function () {
    function auth() {
    }
    // username check
    auth.prototype.check = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, bindParams, payload, temp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT COUNT (*) COUNT FROM AGENT_BANKING.USER_INFO u WHERE     u.PSTATUS = 'Y' AND (u.USTATUS = 'U' OR u.USTATUS IS NULL) AND u.USERID = UPPER ( :username)";
                        bindParams = [username.toString()];
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql, bindParams)];
                    case 1:
                        payload = _a.sent();
                        temp = payload.rows;
                        return [2 /*return*/, temp[0].COUNT === 0 ? false : true];
                }
            });
        });
    };
    //   retrieves roles
    auth.prototype.user = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, bindParams, payload, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = "SELECT USERNAME,ROLEID FROM AGENT_BANKING.USER_INFO u WHERE u.PSTATUS = 'Y' AND (u.USTATUS = 'U' OR u.USTATUS IS NULL) AND u.USERID = UPPER(:username)";
                        bindParams = [username.toUpperCase()];
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql, bindParams)
                            // Return the rows from the payload as the result
                        ];
                    case 1:
                        payload = _a.sent();
                        // Return the rows from the payload as the result
                        return [2 /*return*/, payload.rows];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error fetching user info for ".concat(username, ": ").concat(error_1));
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Verify username and password
    auth.prototype.verify = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, bindParams, payload, temp, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = "SELECT COUNT (*) COUNT  FROM AGENT_BANKING.USER_INFO u WHERE u.PSTATUS = 'Y' AND (u.USTATUS = 'U' OR u.USTATUS IS NULL) AND u.USERID = UPPER ( :username)  AND TANBIN.FUNC_GET_PIN (u.UPASS) = :password";
                        bindParams = [username.toString(), password.toString()];
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql, bindParams)];
                    case 1:
                        payload = _a.sent();
                        temp = payload.rows;
                        return [2 /*return*/, temp[0].COUNT == "0" ? false : true];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        throw new Error("Unable to verify user");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Refresh
    auth.prototype.lookRefreshToken = function (username, token_value) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, bindParams, payload, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = "SELECT STATUS FROM TANBIN.JWT_TOKEN WHERE \"USER\" = :username_value and \"TOKEN\" = :token_value)";
                        bindParams = [token_value.toString(), username.toString()];
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql, bindParams)];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, payload.rows];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3);
                        throw new Error("Unable to store refresh token");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Refresh Token
    auth.prototype.storeRefreshToken = function (username, token_value) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, bindParams, payload, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = "INSERT INTO TANBIN.JWT_TOKEN (TOKEN, \"USER\", STATUS, GEN_DATE) VALUES(:token_value, :user_value, 'A', SYSDATE)";
                        bindParams = [username.toString(), token_value.toString()];
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql, bindParams)];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, !payload.lastRowid ? false : true];
                    case 2:
                        error_4 = _a.sent();
                        console.error(error_4);
                        throw new Error("Unable to store refresh token");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update Token
    auth.prototype.updateRefreshToken = function (username, token_value) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, bindParams, payload, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = "UPDATE TANBIN.JWT_TOKEN SET STATUS='E',EXP_DATE=SYSDATE WHERE \"USER\" = :username_value and \"TOKEN\" = :token_value";
                        bindParams = [token_value.toString(), username.toString()];
                        return [4 /*yield*/, (0, oracleClient_1.default)(sql, bindParams)];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, !payload.lastRowid ? false : true];
                    case 2:
                        error_5 = _a.sent();
                        console.error(error_5);
                        throw new Error("Unable to store refresh token");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return auth;
}());
exports.default = auth;
