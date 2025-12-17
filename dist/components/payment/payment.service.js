"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payment_dto_1 = require("./payment.dto");
const payment_model_1 = require("./payment.model");
const uuid_1 = require("uuid");
const mongoose_1 = require("mongoose");
class PaymentService {
    async createPayment(data) {
        const paymentData = {
            orderId: new mongoose_1.Types.ObjectId(data.orderId),
            userId: new mongoose_1.Types.ObjectId(data.userId),
            amount: data.amount,
            method: data.method,
            status: payment_dto_1.PaymentStatus.PENDING,
            transactionId: `TXN-${(0, uuid_1.v4)().slice(0, 8)}`,
        };
        const newPayment = await new payment_model_1.PaymentModel(paymentData).save();
        return newPayment.toObject();
    }
    async getAllPayments() {
        return payment_model_1.PaymentModel.find().lean();
    }
    async getPaymentById(id) {
        const payment = await payment_model_1.PaymentModel.findById(id).lean();
        return payment;
    }
    async getPaymentsByOrderId(orderId) {
        const payments = await payment_model_1.PaymentModel.find({
            orderId: new mongoose_1.Types.ObjectId(orderId),
        }).lean();
        return payments;
    }
    async getPaymentsByUserId(userId) {
        const payments = await payment_model_1.PaymentModel.find({
            userId: new mongoose_1.Types.ObjectId(userId),
        }).lean();
        return payments;
    }
    async updatePaymentStatus(id, status) {
        const payment = await payment_model_1.PaymentModel.findByIdAndUpdate(id, { status }, { new: true }).lean();
        return payment;
    }
    async processPayment(id) {
        // step 1
        await payment_model_1.PaymentModel.findByIdAndUpdate(id, {
            status: payment_dto_1.PaymentStatus.PROCESSING,
        });
        // step 2
        const finalPayment = await payment_model_1.PaymentModel.findByIdAndUpdate(id, { status: payment_dto_1.PaymentStatus.COMPLETED }, { new: true }).lean();
        return finalPayment;
    }
    async refundPayment(id) {
        const refund = await payment_model_1.PaymentModel.findByIdAndUpdate(id, { status: payment_dto_1.PaymentStatus.REFUNDED }, { new: true }).lean();
        return refund;
    }
}
exports.default = new PaymentService();
//# sourceMappingURL=payment.service.js.map