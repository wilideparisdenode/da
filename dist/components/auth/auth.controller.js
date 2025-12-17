"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_middleware_1 = require("./auth.middleware");
class AuthController {
    async register(req, res) {
        try {
            const userData = req.body;
            // Basic validation
            if (!userData.email || !userData.password || !userData.name) {
                return res.status(400).json({
                    success: false,
                    message: 'Email, password, and name are required'
                });
            }
            const result = await auth_service_1.default.register(userData);
            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || 'Registration failed'
            });
        }
    }
    async login(req, res) {
        try {
            const loginData = req.body;
            // Basic validation
            if (!loginData.email || !loginData.password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }
            const result = await auth_service_1.default.login(loginData);
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
            });
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message || 'Login failed'
            });
        }
    }
    async getProfile(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authenticated'
                });
            }
            const user = await auth_service_1.default.getProfile(req.user.userId);
            return res.status(200).json({
                success: true,
                data: user
            });
        }
        catch (error) {
            return res.status(404).json({
                success: false,
                message: error.message || 'User not found'
            });
        }
    }
    async changePassword(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authenticated'
                });
            }
            const { currentPassword, newPassword } = req.body;
            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Current password and new password are required'
                });
            }
            if (newPassword.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'New password must be at least 6 characters long'
                });
            }
            const result = await auth_service_1.default.changePassword(req.user.userId, currentPassword, newPassword);
            if (!result) {
                return res.status(400).json({
                    success: false,
                    message: 'Password change not successful'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Password changed successfully'
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || 'Failed to change password'
            });
        }
    }
    async refreshToken(req, res) {
        try {
            // Get user from request (set by auth middleware)
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authenticated'
                });
            }
            // Generate new token
            const token = auth_middleware_1.AuthMiddleware.generateToken(req.user.userId, req.user.email, req.user.role);
            // Get user profile
            const user = await auth_service_1.default.getProfile(req.user.userId);
            return res.status(200).json({
                success: true,
                data: {
                    user,
                    token
                }
            });
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message || 'Token refresh failed'
            });
        }
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map