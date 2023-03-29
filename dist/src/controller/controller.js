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
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
// Other controllers
var authRouter_1 = __importDefault(require("./auth/authRouter"));
var jwtMiddleware_1 = __importDefault(require("./middleware/jwtMiddleware"));
var chartRouter_1 = __importDefault(require("./dashboardData/chartRouter"));
var tableDataRouter_1 = __importDefault(require("./dashboardData/tableDataRouter"));
var customerRouter_1 = __importDefault(require("./customer/customerRouter"));
var eftReportRouter_1 = __importDefault(require("./eftReports/eftReportRouter"));
var reportRouter_1 = __importDefault(require("./reports/reportRouter"));
var notificationRouter_1 = __importDefault(require("./Notification/notificationRouter"));
var transactionReportRoute_1 = __importDefault(require("./Transaction/transactionReportRoute"));
var controller = express_1.default.Router(); // create an instance of express controller
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
controller.use((0, cors_1.default)(corsOptions));
controller.use(body_parser_1.default.json());
// middleware
controller.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", ["GET", "POST", "PATCH", "DELETE"]);
    next();
});
controller.use("*", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log();
        // console.log("Authorization: ", req.headers.authorization)
        console.log(req.baseUrl + " Body: ", req.body);
        next();
        return [2 /*return*/];
    });
}); });
controller.use("/login", authRouter_1.default);
controller.use("*", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("Route Requested: ", req.baseUrl);
        next();
        return [2 /*return*/];
    });
}); });
controller.use("*", jwtMiddleware_1.default);
// Dashboard
controller.use("/dashboard/charts", chartRouter_1.default);
controller.use("/dashboard/tables", tableDataRouter_1.default);
// Routers
controller.use("/trReportRoute", transactionReportRoute_1.default);
controller.use("/notification", notificationRouter_1.default);
controller.use("/customer", customerRouter_1.default);
controller.use("/reports", reportRouter_1.default);
controller.use("/eft", eftReportRouter_1.default);
controller.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var date;
    return __generator(this, function (_a) {
        date = new Date(Date.now());
        res.send("Server Time" + date);
        return [2 /*return*/];
    });
}); });
controller.use("/*", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(404).json({ Error: "Invalid Address" });
        return [2 /*return*/];
    });
}); });
exports.default = controller;
