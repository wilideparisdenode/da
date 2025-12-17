"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_middleware_1 = require("./auth.middleware");
const router = (0, express_1.Router)();
// Public routes
router.post('/register', auth_controller_1.default.register);
router.post('/login', auth_controller_1.default.login);
// Protected routes
router.get('/profile', auth_middleware_1.AuthMiddleware.verifyToken, auth_controller_1.default.getProfile);
router.post('/change-password', auth_middleware_1.AuthMiddleware.verifyToken, auth_controller_1.default.changePassword);
router.post('/refresh-token', auth_middleware_1.AuthMiddleware.verifyToken, auth_controller_1.default.refreshToken);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map