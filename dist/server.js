"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv = __importStar(require("dotenv"));
const user_routes_1 = __importDefault(require("./components/user/user.routes"));
const product_routes_1 = __importDefault(require("./components/product/product.routes"));
const order_routes_1 = __importDefault(require("./components/order/order.routes"));
const payment_routes_1 = __importDefault(require("./components/payment/payment.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const db_1 = require("./config/db");
const auth_routes_1 = __importDefault(require("./components/auth/auth.routes"));
const auth_middleware_1 = require("./components/auth/auth.middleware");
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, db_1.c)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', auth_middleware_1.AuthMiddleware.verifyToken, user_routes_1.default);
app.use('/api/products', auth_middleware_1.AuthMiddleware.verifyToken, product_routes_1.default);
app.use('/api/orders', auth_middleware_1.AuthMiddleware.verifyToken, order_routes_1.default);
app.use('/api/payments', auth_middleware_1.AuthMiddleware.verifyToken, payment_routes_1.default);
// Error handling
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map