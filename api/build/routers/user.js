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
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const schema_1 = require("../utils/schema");
const UserRouter = (0, express_1.Router)();
UserRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    const parsedBody = schema_1.SignUpSchema.safeParse(requestBody);
    if (!parsedBody.success) {
        const fieldErrors = parsedBody.error.flatten().fieldErrors;
        const firstErrorMessage = Object.values(fieldErrors)[0][0];
        res.status(400).json({
            success: false,
            message: firstErrorMessage,
            data: fieldErrors,
        });
        return;
    }
    const { name, email, password } = parsedBody.data;
    const findUser = yield user_1.default.findOne({ email });
    if (findUser) {
        res.status(400).json({
            success: false,
            message: "User already exists",
            data: null,
        });
        return;
    }
    const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
    yield user_1.default.create({ name, email, password: hashedPassword });
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: null,
    });
}));
UserRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    const parsedBody = schema_1.LoginSchema.safeParse(requestBody);
    if (!parsedBody.success) {
        const fieldErrors = parsedBody.error.flatten().fieldErrors;
        const firstErrorMessage = Object.values(fieldErrors)[0][0];
        res.status(400).json({
            success: false,
            message: firstErrorMessage,
            data: fieldErrors,
        });
        return;
    }
    const { email, password } = parsedBody.data;
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        res.status(401).json({
            success: false,
            message: "Invalid email or password",
            data: null,
        });
        return;
    }
    const isPasswordValid = yield (0, bcrypt_1.comparePassword)(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({
            success: false,
            message: "Invalid email or password",
            data: null,
        });
        return;
    }
    const token = (0, jwt_1.generateToken)(user._id.toString());
    res
        .status(200)
        .json({ success: true, message: "Login successful", data: { token } });
}));
UserRouter.get("/profile", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    };
    res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        data: user,
    });
    return;
}));
exports.default = UserRouter;
