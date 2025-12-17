"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.cancelOrder = exports.updateOrderStatus = exports.getOrdersByUserId = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const order_service_1 = __importDefault(require("./order.service"));
// import { OrderModel } from './order.model';
const createOrder = async (req, res, next) => {
    try {
        const order = await order_service_1.default.createOrder(req.body, req.user?.userId);
        res.status(201).json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
exports.createOrder = createOrder;
const getAllOrders = async (_req, res, next) => {
    try {
        const orders = await order_service_1.default.getAllOrders();
        res.status(200).json({ success: true, data: orders });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllOrders = getAllOrders;
const getOrderById = async (req, res, next) => {
    try {
        const order = await order_service_1.default.getOrderById(req.params.id);
        if (!order) {
            res.status(404).json({ success: false, message: 'Order not found' });
            return;
        }
        res.status(200).json({ success: true, data: order });
        console.log({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
exports.getOrderById = getOrderById;
const getOrdersByUserId = async (req, res, next) => {
    try {
        const orders = await order_service_1.default.getOrdersByUserId(req.params.userId);
        res.status(200).json({ success: true, data: orders });
    }
    catch (error) {
        next(error);
    }
};
exports.getOrdersByUserId = getOrdersByUserId;
const updateOrderStatus = async (req, res, next) => {
    try {
        const order = await order_service_1.default.updateOrderStatus(req.params.id, req.body.status);
        if (!order) {
            res.status(404).json({ success: false, message: 'Order not found' });
            return;
        }
        res.status(200).json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
exports.updateOrderStatus = updateOrderStatus;
const cancelOrder = async (req, res, next) => {
    try {
        const order = await order_service_1.default.cancelOrder(req.params.id);
        if (!order) {
            res.status(404).json({ success: false, message: 'Order not found' });
            return;
        }
        res.status(200).json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
exports.cancelOrder = cancelOrder;
const deleteOrder = async (req, res, next) => {
    try {
        const order = await order_service_1.default.deleteOrder(req.params.id);
        if (!order) {
            res.status(404).json({ success: false, message: 'Order not found' });
            return;
        }
        res.status(200).json({ success: true, message: "product was succefully deleted" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=order.contorller.js.map