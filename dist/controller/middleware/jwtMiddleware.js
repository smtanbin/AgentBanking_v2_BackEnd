"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var JWTVerifyToken = function (req, res, next) {
    var authHeader = req.headers["authorization"];
    var token = authHeader && authHeader.split(" ")[1];
    console.log("Access");
    if (!token) {
        return res.status(401).json({ message: "Access token not found" });
    }
    var configPath = path_1.default.join(__dirname, "../../", "config.json"); //config file
    var config = JSON.parse(fs_1.default.readFileSync(configPath, "utf8"));
    var jwtConfig = config.server.security;
    var jkey = jwtConfig.jkey || process.env.JKEY;
    jsonwebtoken_1.default.verify(token, jkey, function (err, user) {
        var _a;
        if (err) {
            console.log(err);
            if (err.name === "TokenExpiredError") {
                // const refreshToken = req.cookies.refreshToken
                var refreshToken = (_a = req.headers.refrash_key) === null || _a === void 0 ? void 0 : _a.toString();
                if (!refreshToken) {
                    return res.status(401).json({ message: "Refresh token not found" });
                }
                jsonwebtoken_1.default.verify(refreshToken, jwtConfig.refrash_key || process.env.JWT_REFRESH_SECRET, function (err, user) {
                    if (err) {
                        return res.status(403).json({ message: "Invalid refresh token" });
                    }
                    var newToken = jsonwebtoken_1.default.sign({ username: user.username }, jwtConfig.jkey || process.env.JWT_SECRET, {
                        expiresIn: jwtConfig.expires || process.env.JWT_EXPIRES_IN,
                    });
                    var newRefreshToken = jsonwebtoken_1.default.sign({ username: user.username }, jwtConfig.refrash_key || process.env.JWT_REFRESH_SECRET, {
                        expiresIn: jwtConfig.refrash_expires ||
                            process.env.JWT_REFRESH_EXPIRES_IN,
                    });
                    res.cookie("accessToken", newToken, { httpOnly: true });
                    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
                    req.user = user;
                    next();
                });
            }
            else {
                return res.status(403).json({ message: "Invalid access token" });
            }
        }
        else {
            req.user = user;
            next();
        }
    });
};
exports.default = JWTVerifyToken;
