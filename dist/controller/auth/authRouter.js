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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authFunction_1 = __importDefault(require("./authFunction"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var authRouter = express_1.default.Router();
var oauth = new authFunction_1.default();
/* This is an endpoint that listens to POST requests on the "/check" route. When a request is received, it first extracts the "username" parameter from the request body. It then performs some error handling and validation to ensure that the "username" parameter is not empty and is a string.

After validating the parameter, it calls the "check" function of the "oauth" object with the "username" parameter and waits for the function to return. The result returned from the function is then sent back as the response to the original request.

If an error occurs during the execution of the endpoint, it will be caught in the "catch" block, logged to the console, and an HTTP 500 response with an error message will be sent back to the client.*/
authRouter.post("/check", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
// authRouter.post("/auth", async (req, res) => {
//   try {
//     const { username, password } = req.body
//     /* error handling and validation to the request parameters*/
//     if (!username) {
//       res.status(500).json("Error: Username are required")
//       return
//     }
//     const userCheck: boolean = await oauth.check(username)
//     if (!userCheck) {
//       res.status(500).json("Error: User not found")
//       return
//     }
//     if (!password) {
//       res.status(500).json("Error: Password are required")
//       return
//     }
//     /* check to ensure that username is a string before passing it to oauth.get() function.*/
//     if (typeof username !== "string" && typeof password !== "string") {
//       res.status(500).json("Error: Invalid parameters type must be a string")
//       return
//     }
//     const verified: boolean = await oauth.verify(username, password)
//     if (!verified) {
//       res.status(500).json("Error: password not match")
//       return
//     }
//     const userInfo: any = await oauth.user(username)
//     const { USERNAME, ROLEID }: any = userInfo[0]
//     const configPath = path.join(__dirname, "../../", "config.json") //config file
//     const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
//     const _tokenKey = config.server.security.jkey || process.env.JKEY
//     // Generate JWT token
//     const token = jwt.sign({ username: USERNAME, roll: ROLEID }, _tokenKey)
//     // Send token as response
//     res.json({ token })
//   } catch (err) {
//     console.error("Error: " + err)
//     res.status(500).json("Error: " + err)
//     return
//   }
// })
authRouter.post("/auth", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, userCheck, verified, userInfo, _b, USERNAME, ROLEID, configPath, config, _tokenKey, token, refreshToken, refresh_ststus, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
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
                configPath = path_1.default.join(__dirname, "../../", "config.json") //config file
                ;
                config = JSON.parse(fs_1.default.readFileSync(configPath, "utf8"));
                _tokenKey = config.server.security.jkey || process.env.JKEY;
                token = jsonwebtoken_1.default.sign({ username: USERNAME, roll: ROLEID, refresh: true }, _tokenKey, { expiresIn: "15m" });
                refreshToken = jsonwebtoken_1.default.sign({ username: USERNAME, roll: ROLEID, refresh: true }, _tokenKey, { expiresIn: "7d" });
                return [4 /*yield*/, oauth.storeRefreshToken(refreshToken, username)];
            case 4:
                refresh_ststus = _c.sent();
                if (!refresh_ststus) {
                    res.status(500).json("Error: unable to store refresh token");
                    return [2 /*return*/];
                }
                // Send token and refresh token as response
                res.json({ token: token, refreshToken: refreshToken });
                return [3 /*break*/, 6];
            case 5:
                err_2 = _c.sent();
                console.error("Error: " + err_2);
                res.status(500).json("Error: " + err_2);
                return [2 /*return*/];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.default = authRouter;
