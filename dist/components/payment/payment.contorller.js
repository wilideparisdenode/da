"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundPayment = exports.processPayment = exports.getPaymentsByOrderId = exports.getPaymentById = exports.getAllPayments = exports.createPayment = void 0;
const payment_service_1 = __importDefault(require("./payment.service"));
const createPayment = async (req, res, next) => {
    try {
        const payment = await payment_service_1.default.createPayment(req.body);
        res.status(201).json({ success: true, data: payment });
    }
    catch (error) {
        next(error);
    }
};
exports.createPayment = createPayment;
const getAllPayments = async (_req, res, next) => {
    try {
        const payments = await payment_service_1.default.getAllPayments();
        res.status(200).json({ success: true, data: payments });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllPayments = getAllPayments;
const getPaymentById = async (req, res, next) => {
    try {
        const payment = await payment_service_1.default.getPaymentById(req.params.id);
        if (!payment) {
            res.status(404).json({ success: false, message: 'Payment not found' });
            return;
        }
        res.status(200).json({ success: true, data: payment });
    }
    catch (error) {
        next(error);
    }
};
exports.getPaymentById = getPaymentById;
const getPaymentsByOrderId = async (req, res, next) => {
    try {
        const payments = await payment_service_1.default.getPaymentsByOrderId(req.params.orderId);
        res.status(200).json({ success: true, data: payments });
    }
    catch (error) {
        next(error);
    }
};
exports.getPaymentsByOrderId = getPaymentsByOrderId;
const processPayment = async (req, res, next) => {
    try {
        const payment = await payment_service_1.default.processPayment(req.params.id);
        console.log(req.params.id);
        if (!payment) {
            res.status(404).json({ success: false, message: 'Payment not found' });
            return;
        }
        res.status(200).json({ success: true, data: payment });
    }
    catch (error) {
        next(error);
    }
};
exports.processPayment = processPayment;
const refundPayment = async (req, res, next) => {
    try {
        const payment = await payment_service_1.default.refundPayment(req.params.id);
        if (!payment) {
            res.status(404).json({ success: false, message: 'Payment not found' });
            return;
        }
        res.status(200).json({ success: true, data: payment });
    }
    catch (error) {
        next(error);
    }
};
exports.refundPayment = refundPayment;
//# sourceMappingURL=payment.contorller.js.map