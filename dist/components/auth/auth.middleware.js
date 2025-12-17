"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Strongly type env values for jsonwebtoken
const JWT_SECRET = process.env.JWT_SECRET ?? 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d';
class AuthMiddleware {
    // Generate JWT token
    static generateToken(userId, email, role) {
        return jsonwebtoken_1.default.sign({ userId, email, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }
    // Verify JWT token middleware
    static verifyToken(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'No token provided or invalid format',
            });
            return;
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                res.status(401).json({
                    success: false,
                    message: 'Token expired',
                });
                return;
            }
            res.status(401).json({
                success: false,
                message: 'Invalid token',
            });
        }
    }
    // Role-based authorization middleware
    static authorize(...allowedRoles) {
        return (req, res, next) => {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated',
                });
                return;
            }
            if (!allowedRoles.includes(req.user.role)) {
                res.status(403).json({
                    success: false,
                    message: 'Insufficient permissions',
                });
                return;
            }
            next();
        };
    }
    // Optional authentication middleware
    static optionalAuth(req, _res, next) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            try {
                const token = authHeader.split(' ')[1];
                const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
                req.user = decoded;
            }
            catch {
                // silently ignore invalid token
            }
        }
        next();
    }
}
exports.AuthMiddleware = AuthMiddleware;
// Alias for verifyToken - more concise name
AuthMiddleware.protect = AuthMiddleware.verifyToken;
//# sourceMappingURL=auth.middleware.js.map