"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = require("mongoose");
// Payment schema
const paymentSchema = new mongoose_1.Schema({
    orderId: { type: mongoose_1.Types.ObjectId, ref: 'Order', required: true },
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    method: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    transactionId: String
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});
// Create and export model
exports.PaymentModel = (0, mongoose_1.model)('Payment', paymentSchema);
//# sourceMappingURL=payment.model.js.map