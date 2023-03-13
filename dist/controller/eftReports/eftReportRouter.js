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
var eftModel_1 = __importDefault(require("./eftModel"));
var eftApp_1 = require("./eftApp");
var eftApp_2 = require("./eftApp");
var pdf = require("html-pdf");
var eftReportRouter = express_1.default.Router();
var eft = new eftModel_1.default();
eftReportRouter.get("/summery", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, eft.sum()];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).send("Error: " + err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// eftReportRouter.get("/list", async (req, res) => {
//   try {
//     const result = await eft.list()
//     res.send(result)
//   } catch (err) {
//     console.error(err)
//     res.status(500).send("Error: " + err)
//   }
// })
eftReportRouter.get("/list", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, indexedResult, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, eft.list()];
            case 1:
                result = _a.sent();
                indexedResult = result.map(function (row, index) {
                    var ABS_AC_TITEL = row.ABS_AC_TITEL, ACTNUM = row.ACTNUM, AMOUNT = row.AMOUNT, HONOURED = row.HONOURED, NOTE = row.NOTE, ORIG_BANK_NAME = row.ORIG_BANK_NAME, ORIG_BRANCH_NAME = row.ORIG_BRANCH_NAME, RECIVER = row.RECIVER, SENDER = row.SENDER;
                    return {
                        ABS_AC_TITEL: ABS_AC_TITEL,
                        ACTNUM: ACTNUM,
                        AMOUNT: AMOUNT,
                        HONOURED: HONOURED,
                        NOTE: NOTE,
                        ORIG_BANK_NAME: ORIG_BANK_NAME,
                        ORIG_BRANCH_NAME: ORIG_BRANCH_NAME,
                        RECIVER: RECIVER,
                        SENDER: SENDER,
                        index: index + 1,
                        match: (0, eftApp_2.compareNames)(row.ABS_AC_TITEL, row.RECIVER),
                    };
                });
                res.send(indexedResult);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).send("Error: " + err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
eftReportRouter.get("/return", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, eft.return()];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error(err_3);
                res.status(500).send("Error: " + err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
eftReportRouter.get("/report.pdf", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var html, options, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, eftApp_1.eftReportApp)()];
            case 1:
                html = _a.sent();
                options = {
                    format: "A4",
                    margin: {
                        top: "2cm",
                        right: "2cm",
                        bottom: "2cm",
                        left: "2cm",
                    },
                };
                pdf.create(html, options).toStream(function (err, stream) {
                    if (err)
                        return res.send(err);
                    res.type("pdf");
                    stream.pipe(res);
                });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.error(err_4);
                res.status(500).send("Error: " + err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = eftReportRouter;
