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
var express_1 = __importDefault(require("express"));
var authModel_1 = __importDefault(require("./authModel"));
var authApplication_1 = __importDefault(require("./authApplication"));
var authRouter = express_1.default.Router();
var oauth = new authModel_1.default();
var authVerify = new authApplication_1.default();
/* This is an endpoint that listens to POST requests on the "/check" route. When a request is received, it first extracts the "username" parameter from the request body. It then performs some error handling and validation to ensure that the "username" parameter is not empty and is a string.

After validating the parameter, it calls the "check" function of the "oauth" object with the "username" parameter and waits for the function to return. The result returned from the function is then sent back as the response to the original request.

If an error occurs during the execution of the endpoint, it will be caught in the "catch" block, logged to the console, and an HTTP 500 response with an error message will be sent back to the client.*/
authRouter.post("/userCheck", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                username = req.body.username;
                /* error handling and validation to the request parameters*/
                if (!username) {
                    res.status(500).json("Error: User not found");
                }
                /* check to ensure that username is a string before passing it to oauth.get() function.*/
                if (typeof username !== "string") {
                    res.status(500).json("Error: Invalid parameters type must be a string");
                }
                return [4 /*yield*/, oauth.check(username)];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).json("Error: " + err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
authRouter.post("/auth", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, userCheck, verified, userInfo, _b, USERNAME, ROLEID, token, refreshToken, e_1, refresh_ststus, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 10, , 11]);
                _a = req.body, username = _a.username, password = _a.password;
                /* error handling and validation to the request parameters*/
                if (!username) {
                    res.status(500).json("Error: Username are required");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, oauth.check(username)];
            case 1:
                userCheck = _c.sent();
                if (!userCheck) {
                    res.status(500).json("Error: User not found");
                    return [2 /*return*/];
                }
                if (!password) {
                    res.status(500).json("Error: Password are required");
                    return [2 /*return*/];
                }
                /* check to ensure that username is a string before passing it to oauth.get() function.*/
                if (typeof username !== "string" && typeof password !== "string") {
                    res.status(500).json("Error: Invalid parameters type must be a string");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, oauth.verify(username, password)];
            case 2:
                verified = _c.sent();
                if (!verified) {
                    res.status(500).json("Error: password not match");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, oauth.user(username)];
            case 3:
                userInfo = _c.sent();
                _b = userInfo[0], USERNAME = _b.USERNAME, ROLEID = _b.ROLEID;
                token = "undefined";
                refreshToken = "undefined";
                _c.label = 4;
            case 4:
                _c.trys.push([4, 7, , 8]);
                return [4 /*yield*/, authVerify.IssueToken(USERNAME, ROLEID)];
            case 5:
                token = _c.sent();
                return [4 /*yield*/, authVerify.IssueRefrashToken(USERNAME)];
            case 6:
                refreshToken = _c.sent();
                return [3 /*break*/, 8];
            case 7:
                e_1 = _c.sent();
                return [2 /*return*/, e_1];
            case 8:
                if (token == "undefined" && refreshToken == "undefined")
                    return [2 /*return*/, "Reciving Empty Token String"
                        // Store refresh token in database or cache
                    ];
                return [4 /*yield*/, oauth.storeRefreshToken(refreshToken, username)];
            case 9:
                refresh_ststus = _c.sent();
                if (!refresh_ststus) {
                    res.status(500).json("Error: unable to store refresh token");
                    return [2 /*return*/];
                }
                // Send token and refresh token as response, along with a cookie
                res.cookie("auth_token", token, { httpOnly: true, secure: true });
                res.json({ token: token, refreshToken: refreshToken });
                return [3 /*break*/, 11];
            case 10:
                err_2 = _c.sent();
                console.error("Error: " + err_2);
                res.status(500).json("Error: " + err_2);
                return [2 /*return*/];
            case 11: return [2 /*return*/];
        }
    });
}); });
authRouter.post("/tokenValid", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, token, tokenStatus, err_3, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authHeader = req.headers["authorization"];
                token = authHeader && authHeader.split(" ")[1];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!token) {
                    res.status(404).json("Error: Token not found");
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, authVerify.TokenCheck(token)];
            case 3:
                tokenStatus = _a.sent();
                if (tokenStatus) {
                    res.status(200).json({ massage: tokenStatus });
                }
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                res.status(500).json({ massage: err_3 });
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_4 = _a.sent();
                console.error("Error in Token Verification: ", err_4);
                res.status(500).json("Error in Token Verification: " + err_4);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
authRouter.post("/refrashToken", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader, token, refreshToken, tokenStatus, err_5, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authHeader = req.headers["authorization"];
                token = authHeader && authHeader.split(" ")[1];
                refreshToken = req.body.refreshToken;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!refreshToken) {
                    res.status(404).json("Error: Token not found");
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, authVerify.RefrashTokenCheck(token, refreshToken)];
            case 3:
                tokenStatus = _a.sent();
                if (tokenStatus) {
                    res.status(200).json({ token: tokenStatus });
                }
                return [3 /*break*/, 5];
            case 4:
                err_5 = _a.sent();
                res.status(500).json({ massage: err_5 });
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_6 = _a.sent();
                console.error("Error in Token Verification: ", err_6);
                res.status(500).json("Error in Token Verification: " + err_6);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.default = authRouter;
