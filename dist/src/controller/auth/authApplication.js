"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var authApplication = /** @class */ (function () {
    function authApplication() {
    }
    authApplication.prototype.IssueToken = function (USERNAME, ROLEID) {
        return new Promise(function (resolve, reject) {
            var configPath = path_1.default.join(__dirname, "config.json"); //config file
            var config = JSON.parse(fs_1.default.readFileSync(configPath, "utf8"));
            var jwtConfig = config.server.security;
            var jkey = jwtConfig.jkey || process.env.JKEY;
            try {
                var token = jsonwebtoken_1.default.sign({ username: USERNAME, roll: ROLEID, refresh: true }, jkey
                // {
                //   expiresIn: 3000,
                // }
                );
                resolve(token);
            }
            catch (e) {
                reject({ error: e });
            }
        });
    };
    authApplication.prototype.IssueRefrashToken = function (USERNAME) {
        return new Promise(function (resolve, reject) {
            var configPath = path_1.default.join(__dirname, "config.json"); //config file
            var config = JSON.parse(fs_1.default.readFileSync(configPath, "utf8"));
            var jwtConfig = config.server.security;
            try {
                var token = jsonwebtoken_1.default.sign({ username: USERNAME }, jwtConfig.rkey || process.env.RKEY
                // {
                //   expiresIn: jwtConfig.refrash_expires || process.env.RKEY_EXPIRES!,
                // }
                );
                resolve(token);
            }
            catch (e) {
                reject({ error: e });
            }
        });
    };
    authApplication.prototype.TokenCheck = function (token) {
        return new Promise(function (resolve, reject) {
            var configPath = path_1.default.join(__dirname, "config.json"); //config file
            var config = JSON.parse(fs_1.default.readFileSync(configPath, "utf8"));
            var jwtConfig = config.server.security;
            var jkey = jwtConfig.jkey || process.env.JKEY;
            jsonwebtoken_1.default.verify(token, jkey, function (err, user) {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        reject(false);
                    }
                    console.error("user :", user, "error :", err.message);
                    reject(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    authApplication.prototype.RefrashTokenCheck = function (token, refreshToken) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var configPath = path_1.default.join(__dirname, "config.json"); //config file
            var config = JSON.parse(fs_1.default.readFileSync(configPath, "utf8"));
            var jwtConfig = config.server.security;
            var jkey = jwtConfig.rkey || process.env.RKEY;
            var _token = jsonwebtoken_1.default.decode(token);
            jsonwebtoken_1.default.verify(refreshToken, jkey, function (err, user) {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        reject("Token_Expired");
                    }
                    reject("Token Error");
                }
                else {
                    try {
                        var newToken = _this.IssueToken(_token.username, _token.roll);
                        resolve(newToken);
                    }
                    catch (e) {
                        reject(e);
                    }
                }
            });
        });
    };
    return authApplication;
}());
exports.default = authApplication;
