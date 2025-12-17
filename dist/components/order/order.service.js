"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_dto_1 = require("./order.dto");
const order_model_1 = require("./order.model");
const product_service_1 = __importDefault(require("../product/product.service"));
const payment_service_1 = __importDefault(require("../payment/payment.service"));
const payment_dto_1 = require("../payment/payment.dto");
class OrderService {
    async createOrder(data, userId) {
        // 1. Calculate total amount
        const totalAmount = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        // 2. Create order object
        const order = {
            ...data,
            totalAmount,
            status: order_dto_1.OrderStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        // 3. Save order
        const savedOrder = await new order_model_1.OrderModel(order).save();
        console.log(data);
        // 4. Update product stock
        for (const item of data.items) {
            const r = await product_service_1.default.updateStock(item.productId, item.quantity);
            if (r)
                console.log(r);
        }
        // 5. Automatically create PENDING payment
        await payment_service_1.default.createPayment({
            orderId: savedOrder._id.toString(),
            userId: userId.toString(),
            amount: totalAmount,
            method: data.method,
            status: payment_dto_1.PaymentStatus.PENDING
        });
        const orderObject = savedOrder.toObject();
        return orderObject;
    }
    async getAllOrders() {
        return await order_model_1.OrderModel.find();
    }
    async getOrderById(id) {
        return order_model_1.OrderModel.findById(id);
    }
    async getOrdersByUserId(userId) {
        return await order_model_1.OrderModel.find({ userId });
    }
    async updateOrderStatus(id, status) {
        const order = await order_model_1.OrderModel.findByIdAndUpdate(id, { status, updatedAt: new Date() }, { new: true }).lean().exec();
        return order;
    }
    async cancelOrder(id) {
        return await order_model_1.OrderModel.findByIdAndUpdate(id, { status: "Cancelled" }, { new: true }).lean().exec();
    }
    async deleteOrder(id) {
        return await order_model_1.OrderModel.findByIdAndDelete(id).lean().exec();
    }
}
exports.default = new OrderService();
//# sourceMappingURL=order.service.js.map