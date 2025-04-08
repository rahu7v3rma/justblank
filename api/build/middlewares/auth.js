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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const user_1 = __importDefault(require("../models/user"));
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        res
            .status(401)
            .json({ success: false, message: "Unauthorized", data: null });
        return;
    }
    const decodedToken = (0, jwt_1.verifyToken)(token);
    if (!decodedToken) {
        res
            .status(401)
            .json({ success: false, message: "Unauthorized", data: null });
        return;
    }
    console.log({ decodedToken });
    const user = yield user_1.default.findById(decodedToken);
    if (!user) {
        res
            .status(401)
            .json({ success: false, message: "Unauthorized", data: null });
        return;
    }
    req.user = user;
    next();
});
exports.authMiddleware = authMiddleware;
